import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type PlanetConfig = {
  name: string;
  radius: number;
  orbit: number;
  color: string;
  accent: string;
  tilt: number;
  speed: number;
};

const PLANETS: PlanetConfig[] = [
  { name: "Merkurius", radius: 0.11, orbit: 0.72, color: "#a6a0a0", accent: "#ded8c8", tilt: 0.03, speed: 1.55 },
  { name: "Venus", radius: 0.16, orbit: 0.98, color: "#d9a441", accent: "#f5df9a", tilt: 177.4 * Math.PI / 180, speed: 1.18 },
  { name: "Bumi", radius: 0.17, orbit: 1.24, color: "#2f78bd", accent: "#70b86c", tilt: 23.44 * Math.PI / 180, speed: 0.98 },
  { name: "Mars", radius: 0.14, orbit: 1.52, color: "#b94e32", accent: "#ef9a62", tilt: 25.19 * Math.PI / 180, speed: 0.82 },
  { name: "Jupiter", radius: 0.34, orbit: 1.92, color: "#d1a66f", accent: "#7f4d31", tilt: 3.13 * Math.PI / 180, speed: 0.42 },
  { name: "Saturnus", radius: 0.29, orbit: 2.32, color: "#d6bd7e", accent: "#f3dea1", tilt: 26.73 * Math.PI / 180, speed: 0.34 },
  { name: "Uranus", radius: 0.22, orbit: 2.68, color: "#72bdc8", accent: "#b9eef0", tilt: 97.77 * Math.PI / 180, speed: 0.25 },
  { name: "Neptunus", radius: 0.21, orbit: 3.02, color: "#3e63b8", accent: "#79a8ff", tilt: 28.32 * Math.PI / 180, speed: 0.21 },
];

function makePlanetTexture(color: string, accent: string, seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 12; i++) {
    const y = (i * 7 + seed * 5) % 64;
    ctx.globalAlpha = 0.18 + (i % 3) * 0.08;
    ctx.fillStyle = i % 2 === 0 ? accent : "#ffffff";
    ctx.fillRect(0, y, 128, 2 + (i % 4));
  }
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#2b1d40";
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc((i * 31 + seed * 11) % 128, (i * 19 + seed * 7) % 64, 2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

interface Props {
  transitionStarted: boolean;
}

export default function WelcomeSolarSystem({ transitionStarted }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef(transitionStarted);
  transitionRef.current = transitionStarted;
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const textures = useMemo(
    () => PLANETS.map((planet, index) => makePlanetTexture(planet.color, planet.accent, index + 1)),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2.25, 7.1);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = -0.12;
    scene.add(root);

    scene.add(new THREE.AmbientLight(0x5f6d94, 1.4));
    const sunLight = new THREE.PointLight(0xffe7a6, 42, 18, 1.2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const sunTextureCanvas = document.createElement("canvas");
    sunTextureCanvas.width = sunTextureCanvas.height = 128;
    const sunCtx = sunTextureCanvas.getContext("2d");
    if (sunCtx) {
      const gradient = sunCtx.createRadialGradient(64, 58, 8, 64, 64, 64);
      gradient.addColorStop(0, "#fff8c7");
      gradient.addColorStop(0.28, "#ffd54a");
      gradient.addColorStop(0.65, "#ff9f1c");
      gradient.addColorStop(1, "#ef5b17");
      sunCtx.fillStyle = gradient;
      sunCtx.fillRect(0, 0, 128, 128);
    }
    const sunTexture = new THREE.CanvasTexture(sunTextureCanvas);
    sunTexture.colorSpace = THREE.SRGBColorSpace;
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 48, 48),
      new THREE.MeshBasicMaterial({ map: sunTexture }),
    );
    root.add(sun);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: sunTexture,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.scale.set(1.55, 1.55, 1);
    root.add(glow);

    const planetMeshes: THREE.Mesh[] = [];
    PLANETS.forEach((planet, index) => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.z = planet.tilt;
      root.add(orbitGroup);

      const orbitPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(angle) * planet.orbit, 0, Math.sin(angle) * planet.orbit));
      }
      const orbitLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(orbitPoints),
        new THREE.LineBasicMaterial({ color: 0x77b8da, transparent: true, opacity: 0.13 }),
      );
      orbitGroup.add(orbitLine);

      const pivot = new THREE.Group();
      orbitGroup.add(pivot);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(planet.radius, 32, 32),
        new THREE.MeshStandardMaterial({
          map: textures[index],
          roughness: 0.68,
          metalness: 0.05,
        }),
      );
      mesh.position.x = planet.orbit;
      pivot.add(mesh);
      pivot.userData.speed = planet.speed;
      planetMeshes.push(mesh);

      if (planet.name === "Saturnus") {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(planet.radius * 1.32, planet.radius * 1.95, 48),
          new THREE.MeshBasicMaterial({ color: 0xe2c98c, transparent: true, opacity: 0.72, side: THREE.DoubleSide }),
        );
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = -0.18;
        mesh.add(ring);
      }
    });

    const asteroidCount = window.matchMedia("(max-width: 859px)").matches ? 180 : 320;
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.7 + (Math.random() - 0.5) * 0.18;
      asteroidPositions[i * 3] = Math.cos(angle) * radius;
      asteroidPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      asteroidPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const asteroidGeometry = new THREE.BufferGeometry();
    asteroidGeometry.setAttribute("position", new THREE.BufferAttribute(asteroidPositions, 3));
    const asteroidField = new THREE.Points(
      asteroidGeometry,
      new THREE.PointsMaterial({ color: 0xc0b6a4, size: 0.025, sizeAttenuation: true }),
    );
    root.add(asteroidField);

    const starCount = window.matchMedia("(max-width: 859px)").matches ? 420 : 720;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 16;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xd8efff,
      size: 0.018,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.18;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.12;
    };
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null) pointerX = THREE.MathUtils.clamp(event.gamma / 45, -0.18, 0.18);
      if (event.beta !== null) pointerY = THREE.MathUtils.clamp((event.beta - 45) / 45, -0.12, 0.12);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("deviceorientation", onOrientation, true);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let elapsed = 0;
    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (transitionRef.current) {
        elapsed = Math.min(elapsed + delta, 1.9);
      } else {
        elapsed = 0;
      }

      if (!reducedMotion) {
        root.children.forEach((child) => {
          if (child instanceof THREE.Group && child.children.length) {
            const pivot = child.children.find((item) => item instanceof THREE.Group) as THREE.Group | undefined;
            if (pivot && typeof pivot.userData.speed === "number") {
              pivot.rotation.y += delta * pivot.userData.speed * 0.42;
            }
          }
        });
        planetMeshes.forEach((mesh, index) => {
          mesh.rotation.y += delta * (0.18 + index * 0.035);
        });
        asteroidField.rotation.y += delta * 0.025;
        stars.rotation.y += delta * 0.002;
      }

      if (!reducedMotion) {
        root.rotation.y += (pointerX - root.rotation.y) * 0.04;
        root.rotation.x += (-0.12 + pointerY - root.rotation.x) * 0.04;
      }

      if (transitionRef.current) {
        const progress = Math.min(elapsed / 1.9, 1);
        camera.position.z = 7.1 - progress * 5.4;
        camera.position.y = 2.25 - progress * 1.2;
        starMaterial.size = 0.018 + progress * 0.34;
        starMaterial.opacity = 0.9 - progress * 0.35;
        const starArray = starGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < starArray.length; i += 3) {
          starArray[i] *= 1 + progress * 0.018;
          starArray[i + 1] *= 1 + progress * 0.018;
          starArray[i + 2] -= delta * (4 + progress * 18);
          if (starArray[i + 2] < -8) starArray[i + 2] = 4;
        }
        starGeometry.attributes.position.needsUpdate = true;
      }

      sun.rotation.y += reducedMotion ? 0 : delta * 0.08;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onOrientation);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      textures.forEach((texture) => texture?.dispose());
      sunTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, [reducedMotion, textures]);

  return <div ref={hostRef} className="welcome-solar-system" aria-hidden="true" />;
}
