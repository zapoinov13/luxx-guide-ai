import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STOPS, clampProgress } from "./walkthrough-data";
import { DEPTH_ANCHORS, buildDepthSurfaces, segmentMotion } from "./walkthrough-depth";

const DEFAULT_ANCHOR = {
  focus: [0.5, 0.48] as [number, number],
  rear: { left: 0.27, right: 0.73, top: 0.2, bottom: 0.72 },
};
type PhotoRoom = {
  group: THREE.Group;
  material: THREE.MeshBasicMaterial;
  meshes: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>[];
  loaded: boolean;
  imageAspect: number;
};

const compositeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;
const compositeFragment = /* glsl */ `
  uniform sampler2D fromTexture;
  uniform sampler2D toTexture;
  uniform float blend;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(mix(texture2D(fromTexture, vUv).rgb, texture2D(toTexture, vUv).rgb, blend), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function geometryFromSurface(surface: ReturnType<typeof buildDepthSurfaces>[number]) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(surface.positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(surface.uvs, 2));
  geometry.setIndex(surface.indices);
  geometry.computeBoundingSphere();
  return geometry;
}

/**
 * Each photograph is projected over a rear plane plus four converging planes.
 * The reference view reconstructs the photo, while a bounded forward dolly
 * creates differential parallax across floor, ceiling and side surfaces.
 */
export default function WalkthroughScene({
  progress,
  onReady,
  onFail,
}: {
  progress: number;
  onReady: () => void;
  onFail: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const callbacks = useRef({ onReady, onFail });
  const stateRef = useRef<{ render: () => void; ensureTexture: (index: number) => void } | null>(
    null,
  );
  callbacks.current = { onReady, onFail };

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let ready = false;
    let failed = false;
    const roomScene = new THREE.Scene();
    roomScene.background = new THREE.Color(0x0b1712);
    const camera = new THREE.PerspectiveCamera(52, 1, 0.06, 20);
    const placeholder = new THREE.DataTexture(
      new Uint8Array([11, 23, 18, 255]),
      1,
      1,
      THREE.RGBAFormat,
    );
    placeholder.colorSpace = THREE.SRGBColorSpace;
    placeholder.needsUpdate = true;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      callbacks.current.onFail();
      placeholder.dispose();
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.dataset["cameraPosition"] = "0.00,0.00,0.00";
    element.append(renderer.domElement);

    const rooms: PhotoRoom[] = STOPS.map((stop) => {
      const material = new THREE.MeshBasicMaterial({ map: placeholder, side: THREE.DoubleSide });
      const group = new THREE.Group();
      group.visible = false;
      roomScene.add(group);
      return {
        group,
        material,
        meshes: [],
        loaded: false,
        imageAspect: stop.photo.width / stop.photo.height,
      };
    });
    const targetA = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true });
    const targetB = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true });
    const compositeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        fromTexture: { value: targetA.texture },
        toTexture: { value: targetB.texture },
        blend: { value: 0 },
      },
      vertexShader: compositeVertex,
      fragmentShader: compositeFragment,
      depthTest: false,
      depthWrite: false,
      toneMapped: true,
    });
    const compositeScene = new THREE.Scene();
    const compositeCamera = new THREE.Camera();
    const compositeGeometry = new THREE.PlaneGeometry(2, 2);
    compositeScene.add(new THREE.Mesh(compositeGeometry, compositeMaterial));

    const rebuildRoom = (index: number) => {
      const room = rooms[index],
        stop = STOPS[index];
      if (!room || !stop) return;
      room.meshes.forEach((mesh) => {
        room.group.remove(mesh);
        mesh.geometry.dispose();
      });
      const anchor = DEPTH_ANCHORS[stop.photo.id] ?? DEFAULT_ANCHOR;
      room.meshes = buildDepthSurfaces(anchor, room.imageAspect, camera.aspect, camera.fov).map(
        (surface) => {
          const mesh = new THREE.Mesh(geometryFromSurface(surface), room.material);
          mesh.frustumCulled = false;
          room.group.add(mesh);
          return mesh;
        },
      );
    };

    const loader = new THREE.TextureLoader();
    const loading = new Set<number>();
    const ensureTexture = (index: number) => {
      const room = rooms[index],
        stop = STOPS[index];
      if (!room || !stop || room.loaded || loading.has(index) || disposed) return;
      loading.add(index);
      loader.load(
        `/photos/${stop.photo.id}-1600.webp`,
        (texture) => {
          loading.delete(index);
          if (disposed) return texture.dispose();
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
          const image = texture.image as { width?: number; height?: number };
          if (image.width && image.height) room.imageAspect = image.width / image.height;
          room.material.map = texture;
          room.material.needsUpdate = true;
          room.loaded = true;
          rebuildRoom(index);
          const active = segmentMotion(progressRef.current, STOPS.length).index;
          if (index === active && !ready) {
            ready = true;
            callbacks.current.onReady();
          }
          stateRef.current?.render();
        },
        undefined,
        () => {
          loading.delete(index);
          if (disposed || failed) return;
          failed = true;
          callbacks.current.onFail();
        },
      );
    };

    const renderRoom = (index: number, dolly: number, target: THREE.WebGLRenderTarget) => {
      rooms.forEach((room, roomIndex) => (room.group.visible = roomIndex === index));
      camera.position.set(0, 0, -dolly);
      const stop = STOPS[index];
      const focus = stop
        ? (DEPTH_ANCHORS[stop.photo.id] ?? DEFAULT_ANCHOR).focus
        : DEFAULT_ANCHOR.focus;
      camera.lookAt((focus[0] - 0.5) * 0.12 * dolly, (0.5 - focus[1]) * 0.08 * dolly, -5.5);
      renderer.setRenderTarget(target);
      renderer.clear();
      renderer.render(roomScene, camera);
    };
    const render = () => {
      const motion = segmentMotion(clampProgress(progressRef.current), STOPS.length);
      const nextIndex = Math.min(STOPS.length - 1, motion.index + 1);
      renderRoom(motion.index, motion.dolly, targetA);
      renderRoom(nextIndex, motion.blend * 0.18, targetB);
      compositeMaterial.uniforms["blend"]!.value = motion.blend;
      renderer.setRenderTarget(null);
      renderer.render(compositeScene, compositeCamera);
      renderer.domElement.dataset["cameraPosition"] =
        `0.00,0.00,${-(motion.index * 12 + motion.dolly).toFixed(2)}`;
    };
    const resize = () => {
      const width = Math.max(1, element.clientWidth),
        height = Math.max(1, element.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      const bufferSize = renderer.getDrawingBufferSize(new THREE.Vector2());
      targetA.setSize(bufferSize.x, bufferSize.y);
      targetB.setSize(bufferSize.x, bufferSize.y);
      rooms.forEach((_, index) => rebuildRoom(index));
      if (!document.hidden) render();
    };

    const current = segmentMotion(progressRef.current, STOPS.length).index;
    stateRef.current = { render, ensureTexture };
    ensureTexture(current);
    ensureTexture(current + 1);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    resize();
    const visibility = () => {
      if (!document.hidden) render();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      if (!failed) {
        failed = true;
        callbacks.current.onFail();
      }
    };
    document.addEventListener("visibilitychange", visibility);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);

    return () => {
      disposed = true;
      stateRef.current = null;
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      rooms.forEach((room) => {
        room.meshes.forEach((mesh) => mesh.geometry.dispose());
        if (room.material.map !== placeholder) room.material.map?.dispose();
        room.material.dispose();
      });
      targetA.dispose();
      targetB.dispose();
      compositeGeometry.dispose();
      compositeMaterial.dispose();
      placeholder.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
    const state = stateRef.current;
    if (!state) return;
    const current = segmentMotion(progress, STOPS.length).index;
    state.ensureTexture(current);
    state.ensureTexture(current + 1);
    state.render();
  }, [progress]);

  return <div ref={host} className="wt-portal-scene" />;
}
