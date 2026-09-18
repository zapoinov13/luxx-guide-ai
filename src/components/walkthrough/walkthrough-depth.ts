export type DepthAnchor = {
  focus: [number, number];
  rear: { left: number; right: number; top: number; bottom: number };
};

export type Crop = { left: number; right: number; top: number; bottom: number };
export type Surface = { positions: number[]; uvs: number[]; indices: number[] };

export const DEPTH_ANCHORS: Record<string, DepthAnchor> = {
  "02": { focus: [0.16, 0.52], rear: { left: 0.1, right: 0.24, top: 0.43, bottom: 0.56 } },
  "03": { focus: [0.17, 0.5], rear: { left: 0.03, right: 0.3, top: 0.2, bottom: 0.78 } },
  "04": { focus: [0.1, 0.48], rear: { left: 0.02, right: 0.2, top: 0.2, bottom: 0.76 } },
  "11": { focus: [0.42, 0.48], rear: { left: 0.2, right: 0.7, top: 0.18, bottom: 0.74 } },
  "17": { focus: [0.18, 0.45], rear: { left: 0.03, right: 0.38, top: 0.18, bottom: 0.7 } },
  "18": { focus: [0.52, 0.46], rear: { left: 0.3, right: 0.76, top: 0.16, bottom: 0.7 } },
  "28": { focus: [0.67, 0.48], rear: { left: 0.42, right: 0.9, top: 0.2, bottom: 0.72 } },
  "01": { focus: [0.5, 0.47], rear: { left: 0.28, right: 0.72, top: 0.2, bottom: 0.7 } },
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function coverCrop(
  imageAspect: number,
  viewportAspect: number,
  focus: [number, number],
): Crop {
  if (viewportAspect > imageAspect) {
    const visible = imageAspect / viewportAspect;
    const top = clamp(focus[1] - visible / 2, 0, 1 - visible);
    return { left: 0, right: 1, top, bottom: top + visible };
  }
  const visible = viewportAspect / imageAspect;
  const left = clamp(focus[0] - visible / 2, 0, 1 - visible);
  return { left, right: left + visible, top: 0, bottom: 1 };
}

function worldPoint(
  u: number,
  v: number,
  depth: number,
  crop: Crop,
  viewportAspect: number,
  verticalFov: number,
) {
  const screenU = (u - crop.left) / (crop.right - crop.left);
  const screenV = (v - crop.top) / (crop.bottom - crop.top);
  const halfHeight = Math.tan((verticalFov * Math.PI) / 360) * depth;
  return [
    (screenU - 0.5) * 2 * halfHeight * viewportAspect,
    (0.5 - screenV) * 2 * halfHeight,
    -depth,
  ];
}

/** Build four converging surfaces and a rear plane from one photographed view. */
export function buildDepthSurfaces(
  anchor: DepthAnchor,
  imageAspect: number,
  viewportAspect: number,
  verticalFov = 52,
  nearDepth = 0.72,
  rearDepth = 5.5,
): Surface[] {
  const crop = coverCrop(imageAspect, viewportAspect, anchor.focus);
  const rear = {
    left: clamp(anchor.rear.left, crop.left + 0.01, crop.right - 0.03),
    right: clamp(anchor.rear.right, crop.left + 0.03, crop.right - 0.01),
    top: clamp(anchor.rear.top, crop.top + 0.01, crop.bottom - 0.03),
    bottom: clamp(anchor.rear.bottom, crop.top + 0.03, crop.bottom - 0.01),
  };
  if (rear.left >= rear.right)
    [rear.left, rear.right] = [
      crop.left + 0.3 * (crop.right - crop.left),
      crop.left + 0.7 * (crop.right - crop.left),
    ];
  if (rear.top >= rear.bottom)
    [rear.top, rear.bottom] = [
      crop.top + 0.3 * (crop.bottom - crop.top),
      crop.top + 0.7 * (crop.bottom - crop.top),
    ];
  const point = (u: number, v: number, depth: number) =>
    worldPoint(u, v, depth, crop, viewportAspect, verticalFov);
  const quad = (corners: number[][], uv: number[][]): Surface => ({
    positions: corners.flat(),
    uvs: uv.flatMap(([u, v]) => [u!, 1 - v!]),
    indices: [0, 1, 2, 0, 2, 3],
  });
  const c = crop,
    r = rear;
  return [
    quad(
      [
        point(c.left, c.top, nearDepth),
        point(r.left, r.top, rearDepth),
        point(r.left, r.bottom, rearDepth),
        point(c.left, c.bottom, nearDepth),
      ],
      [
        [c.left, c.top],
        [r.left, r.top],
        [r.left, r.bottom],
        [c.left, c.bottom],
      ],
    ),
    quad(
      [
        point(r.right, r.top, rearDepth),
        point(c.right, c.top, nearDepth),
        point(c.right, c.bottom, nearDepth),
        point(r.right, r.bottom, rearDepth),
      ],
      [
        [r.right, r.top],
        [c.right, c.top],
        [c.right, c.bottom],
        [r.right, r.bottom],
      ],
    ),
    quad(
      [
        point(c.left, c.top, nearDepth),
        point(c.right, c.top, nearDepth),
        point(r.right, r.top, rearDepth),
        point(r.left, r.top, rearDepth),
      ],
      [
        [c.left, c.top],
        [c.right, c.top],
        [r.right, r.top],
        [r.left, r.top],
      ],
    ),
    quad(
      [
        point(r.left, r.bottom, rearDepth),
        point(r.right, r.bottom, rearDepth),
        point(c.right, c.bottom, nearDepth),
        point(c.left, c.bottom, nearDepth),
      ],
      [
        [r.left, r.bottom],
        [r.right, r.bottom],
        [c.right, c.bottom],
        [c.left, c.bottom],
      ],
    ),
    quad(
      [
        point(r.left, r.top, rearDepth),
        point(r.right, r.top, rearDepth),
        point(r.right, r.bottom, rearDepth),
        point(r.left, r.bottom, rearDepth),
      ],
      [
        [r.left, r.top],
        [r.right, r.top],
        [r.right, r.bottom],
        [r.left, r.bottom],
      ],
    ),
  ];
}

export function segmentMotion(progress: number, count: number) {
  const scaled = Math.max(0, Math.min(1, progress)) * Math.max(1, count - 1);
  const index = Math.min(count - 1, Math.floor(scaled));
  const phase = index === count - 1 ? 0 : scaled - index;
  const rawBlend = Math.max(0, Math.min(1, (phase - 0.82) / 0.18));
  const travel = Math.min(1, phase / 0.88);
  return {
    index,
    phase,
    blend: rawBlend * rawBlend * (3 - 2 * rawBlend),
    dolly: travel * travel * (3 - 2 * travel) * 1.75,
  };
}
