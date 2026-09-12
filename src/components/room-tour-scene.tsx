import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { PhotoRef } from "./photo";

export type SceneProps = {
  photos: PhotoRef[];
  index: number;
  zoom: boolean;
  reduced: boolean;
  onFail: () => void;
  onReady: () => void;
};

/** Client-only, demand-rendered WebGL photo theatre, NOT a scan of the property. */
export default function RoomTourScene({
  photos,
  index,
  zoom,
  reduced,
  onFail,
  onReady,
}: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const input = useRef({ index, zoom, reduced });
  const callbacks = useRef({ onFail, onReady });
  const wake = useRef<() => void>(() => {});
  useEffect(() => {
    callbacks.current = { onFail, onReady };
  }, [onFail, onReady]);
  useEffect(() => {
    input.current = { index, zoom, reduced };
    wake.current();
  }, [index, zoom, reduced]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio < 2,
        alpha: false,
        powerPreference: "low-power",
      });
    } catch {
      callbacks.current.onFail();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.3 : 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#10261e");
    scene.fog = new THREE.Fog("#10261e", 17, 40);
    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 70);
    camera.position.set(0, 0.5, 10.5);
    scene.add(new THREE.HemisphereLight(0xebf3e7, 0x20372b, 3));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-3, 8, 6);
    scene.add(light);
    const rim = new THREE.PointLight(0xc4dbc0, 55, 25);
    rim.position.set(3, 3, 4);
    scene.add(rim);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];
    const geo = <T extends THREE.BufferGeometry>(item: T) => {
      geometries.push(item);
      return item;
    };
    const mat = <T extends THREE.Material>(item: T) => {
      materials.push(item);
      return item;
    };
    const floor = new THREE.Mesh(
      geo(new THREE.PlaneGeometry(100, 100)),
      mat(new THREE.MeshStandardMaterial({ color: "#233d30", roughness: 0.4, metalness: 0.28 })),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.9;
    scene.add(floor);

    const loader = new THREE.TextureLoader();
    let loaded = 0;
    let frame = 0;
    let framesLeft = 0;
    let visible = true;
    let px = 0;
    let py = 0;
    let cx = 0;
    let cy = 0;
    let distance = 10.5;
    let width = 1;
    let height = 1;
    const groups = photos.map((photo, n) => {
      const ratio = photo.width / photo.height;
      const h = 4.2;
      const w = Math.min(h * ratio, 6.4);
      const group = new THREE.Group();
      const frameMesh = new THREE.Mesh(
        geo(new THREE.BoxGeometry(w + 0.14, h + 0.14, 0.1)),
        mat(new THREE.MeshStandardMaterial({ color: "#7e9684", roughness: 0.3, metalness: 0.65 })),
      );
      group.add(frameMesh);
      const pictureMat = mat(new THREE.MeshBasicMaterial({ color: "#657565", toneMapped: false }));
      const picture = new THREE.Mesh(geo(new THREE.PlaneGeometry(w, h)), pictureMat);
      picture.position.z = 0.06;
      group.add(picture);
      const texture = loader.load(
        `/photos/${photo.id}-800.webp`,
        () => {
          if (disposed) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
          pictureMat.map = texture;
          pictureMat.color.set("white");
          pictureMat.needsUpdate = true;
          loaded++;
          if (loaded === 1) callbacks.current.onReady();
          wake.current();
        },
        undefined,
        () => {
          if (!disposed) callbacks.current.onFail();
        },
      );
      textures.push(texture);
      group.position.set(
        (n - input.current.index) * 7.1,
        0,
        -Math.abs(n - input.current.index) * 2.7,
      );
      scene.add(group);
      return group;
    });

    // Decorative real 3D orbit, clearly part of the gallery, not a floor plan.
    const orbit = new THREE.Mesh(
      geo(new THREE.TorusGeometry(4.25, 0.012, 6, 120)),
      mat(new THREE.MeshStandardMaterial({ color: "#a4bca7", roughness: 0.3, metalness: 0.8 })),
    );
    orbit.rotation.x = Math.PI / 2;
    orbit.position.y = -2.85;
    scene.add(orbit);

    const draw = () => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const state = input.current;
      const ease = state.reduced ? 1 : 0.115;
      const portrait = width / height < 0.95;
      const goalDistance = portrait ? (state.zoom ? 11 : 14.8) : state.zoom ? 7.2 : 10.5;
      distance += (goalDistance - distance) * ease;
      cx += ((state.reduced ? 0 : px * 0.85) - cx) * ease;
      cy += ((state.reduced ? 0 : py * 0.4) - cy) * ease;
      camera.position.set(cx, 0.35 + cy, distance);
      camera.lookAt(0, -0.08, 0);
      groups.forEach((group, n) => {
        let offset = (n - state.index + photos.length) % photos.length;
        if (offset > photos.length / 2) offset -= photos.length;
        const targetX = offset * 7.1;
        const targetZ = -Math.abs(offset) * 2.7;
        group.position.x += (targetX - group.position.x) * ease;
        group.position.z += (targetZ - group.position.z) * ease;
        group.rotation.y += (-offset * 0.27 - group.rotation.y) * ease;
        group.visible = Math.abs(offset) <= 2 || Math.abs(group.position.x) < 15;
      });
      renderer.render(scene, camera);
      framesLeft--;
      if (framesLeft > 0) frame = requestAnimationFrame(draw);
    };
    const invalidate = () => {
      if (disposed) return;
      framesLeft = input.current.reduced ? 1 : 80;
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    wake.current = invalidate;
    const resize = () => {
      width = element.clientWidth;
      height = element.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      invalidate();
    };
    const move = (event: PointerEvent) => {
      if (input.current.reduced || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      px = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      py = (0.5 - (event.clientY - bounds.top) / bounds.height) * 2;
      invalidate();
    };
    const leave = () => {
      px = 0;
      py = 0;
      invalidate();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      callbacks.current.onFail();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) invalidate();
    });
    intersection.observe(element);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", invalidate);
    resize();
    return () => {
      disposed = true;
      wake.current = () => {};
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", invalidate);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      textures.forEach((texture) => texture.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [photos]);
  return <div ref={host} className="rt-webgl" />;
}
