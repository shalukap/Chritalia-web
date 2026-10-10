import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LiquidImageProps {
  images: string[];
  /** Index of the image to show; changing it plays a liquid transition. */
  index?: number;
  alt: string;
  className?: string;
  /** Strength of the cursor lens (0 disables it). */
  lens?: number;
}

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex0;
  uniform sampler2D uTex1;
  uniform vec2 uImg0;
  uniform vec2 uImg1;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uProgress;
  uniform float uTime;
  uniform float uLens;
  varying vec2 vUv;

  // Ashima simplex noise
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // object-fit: cover
  vec2 cover(vec2 uv, vec2 img) {
    float rs = uRes.x / uRes.y;
    float ri = img.x / img.y;
    vec2 scale = rs < ri ? vec2(rs / ri, 1.0) : vec2(1.0, ri / rs);
    return (uv - 0.5) * scale + 0.5;
  }

  vec3 sampleRGB(sampler2D tex, vec2 uv, vec2 img, vec2 shift) {
    vec2 c = cover(uv, img);
    return vec3(
      texture2D(tex, c + shift).r,
      texture2D(tex, c).g,
      texture2D(tex, c - shift).b
    );
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);

    // Liquid lens around the cursor
    vec2 toMouse = (uv - uMouse) * aspect;
    float dist = length(toMouse);
    float lens = uHover * uLens * smoothstep(0.42, 0.0, dist);
    float wobble = snoise(uv * 4.0 + uTime * 0.35) * 0.5 + 0.5;
    uv -= normalize(toMouse + 1e-5) / aspect * lens * (0.03 + 0.02 * wobble);

    // Gentle parallax + zoom so edges never show
    uv += (uMouse - 0.5) * 0.02 * uHover;
    uv = (uv - 0.5) / (1.06 + uHover * 0.02) + 0.5;

    // Noise wipe between images
    float n = snoise(vUv * 2.2 + uTime * 0.05);
    float edge = vUv.x * 0.75 + vUv.y * 0.1 + n * 0.15;
    float mask = smoothstep(edge - 0.12, edge + 0.12, uProgress * 1.35 - 0.12);
    float swirl = mask * (1.0 - mask);

    vec2 uv0 = uv - vec2(0.14 * mask, 0.02 * n * mask);
    vec2 uv1 = uv + vec2(0.14 * (1.0 - mask), 0.02 * n * (1.0 - mask));
    vec2 shift = vec2(lens * 0.004 + swirl * 0.012, 0.0);

    vec3 a = sampleRGB(uTex0, uv0, uImg0, shift);
    vec3 b = sampleRGB(uTex1, uv1, uImg1, shift);
    vec3 color = mix(a, b, mask);

    // Soft light sweep along the transition front
    color += swirl * 0.18;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Real photo rendered through WebGL: a liquid lens follows the cursor and
// slides change with a noisy displacement wipe. Falls back to a plain <img>.
const LiquidImage: React.FC<LiquidImageProps> = ({ images, index = 0, alt, className = '', lens = 1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const goTo = useRef<(i: number) => void>(() => {});
  const [ready, setReady] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(index);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return; // WebGL unavailable: the <img> fallback stays visible
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      opacity: '0',
      transition: 'opacity 0.8s ease',
    });
    container.appendChild(renderer.domElement);

    const blank = new THREE.DataTexture(new Uint8Array([228, 225, 216, 255]), 1, 1);
    blank.needsUpdate = true;
    const uniforms = {
      uTex0: { value: blank as THREE.Texture },
      uTex1: { value: blank as THREE.Texture },
      uImg0: { value: new THREE.Vector2(1, 1) },
      uImg1: { value: new THREE.Vector2(1, 1) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uLens: { value: reduced ? 0 : lens },
    };
    const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(geometry, material));
    const camera = new THREE.Camera();

    const textures: THREE.Texture[] = [];
    const sizes: THREE.Vector2[] = [];
    const loader = new THREE.TextureLoader();
    let current = index;
    let target = index;
    let transitionStart = -1;
    const duration = reduced ? 1 : 1600;

    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    Promise.all(
      images.map(
        (src, i) =>
          new Promise<void>((resolve) => {
            loader.load(
              src,
              (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                tex.minFilter = THREE.LinearFilter;
                tex.generateMipmaps = false;
                textures[i] = tex;
                const img = tex.image as HTMLImageElement;
                sizes[i] = new THREE.Vector2(img.naturalWidth || img.width, img.naturalHeight || img.height);
                resolve();
              },
              undefined,
              () => resolve()
            );
          })
      )
    ).then(() => {
      if (!textures[current]) return;
      uniforms.uTex0.value = textures[current];
      uniforms.uImg0.value = sizes[current];
      uniforms.uTex1.value = textures[current];
      uniforms.uImg1.value = sizes[current];
      renderer.domElement.style.opacity = '1';
      setReady(true);
    });

    goTo.current = (i: number) => {
      if (!textures[i] || i === target) return;
      // Finish any running transition instantly before starting a new one.
      if (transitionStart >= 0) {
        uniforms.uTex0.value = textures[target];
        uniforms.uImg0.value = sizes[target];
        current = target;
      }
      target = i;
      uniforms.uTex1.value = textures[i];
      uniforms.uImg1.value = sizes[i];
      uniforms.uProgress.value = 0;
      transitionStart = performance.now();
    };

    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    let hoverTarget = 0;
    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      mouseTarget.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      hoverTarget = e.pointerType === 'mouse' ? 1 : 0;
    };
    const onLeave = () => (hoverTarget = 0);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(container);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      uniforms.uTime.value = (now - start) / 1000;
      uniforms.uMouse.value.lerp(mouseTarget, 0.08);
      uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.06;
      if (transitionStart >= 0) {
        const p = Math.min(1, (now - transitionStart) / duration);
        uniforms.uProgress.value = easeInOut(p);
        if (p >= 1) {
          uniforms.uTex0.value = textures[target];
          uniforms.uImg0.value = sizes[target];
          uniforms.uProgress.value = 0;
          current = target;
          transitionStart = -1;
        }
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      textures.forEach((t) => t?.dispose());
      blank.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      goTo.current = () => {};
    };
    // Images are fixed for the lifetime of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    goTo.current(index);
    setFallbackIndex(index);
  }, [index]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-paper-3 ${className}`}>
      <img
        src={images[fallbackIndex]}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default LiquidImage;
