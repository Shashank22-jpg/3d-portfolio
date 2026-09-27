import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

export const Global3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseState = useMousePosition(0.04);
  const mouseRef = useRef(mouseState);

  // Sync ref without triggering re-renders
  useEffect(() => {
    mouseRef.current = mouseState;
  }, [mouseState]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // 3. LIGHTS
    const ambientLight = new THREE.AmbientLight(0x161224, 2.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xbbccd7, 3);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Cursor PointLight following mouse in 3D
    const cursorLight = new THREE.PointLight(0xb600a8, 12, 25);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);

    const secondaryCursorLight = new THREE.PointLight(0x7621b0, 8, 20);
    secondaryCursorLight.position.set(0, 0, 3);
    scene.add(secondaryCursorLight);

    // 4. MATERIALS
    const metallicMat = new THREE.MeshStandardMaterial({
      color: 0x646973,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });

    const wireframeMat = new THREE.MeshStandardMaterial({
      color: 0xbbccd7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xb600a8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: 0.6,
    });

    const purpleGlowMat = new THREE.MeshStandardMaterial({
      color: 0x7621b0,
      emissive: 0x3d0b60,
      roughness: 0.3,
      metalness: 0.5,
    });

    // 5. HERO CENTERPIECE (Abstract 3D Structure replacing the face)
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);

    // Outer Geodesic / Wireframe Icosahedron
    const outerIcoGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const outerIcoMesh = new THREE.Mesh(outerIcoGeo, wireframeMat);
    heroGroup.add(outerIcoMesh);

    // Inner Metallic Torus Knot
    const innerKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    const innerKnotMesh = new THREE.Mesh(innerKnotGeo, metallicMat);
    heroGroup.add(innerKnotMesh);

    // Floating Orbit Glass Ring 1
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.05, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeo1, glassMat);
    ringMesh1.rotation.x = Math.PI / 3;
    heroGroup.add(ringMesh1);

    // Floating Orbit Glass Ring 2
    const ringGeo2 = new THREE.TorusGeometry(4.2, 0.04, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeo2, wireframeMat);
    ringMesh2.rotation.y = Math.PI / 4;
    heroGroup.add(ringMesh2);

    scene.add(heroGroup);

    // 6. GLOBAL FLOATING 3D OBJECTS ACROSS SECTIONS
    interface FloatingObject {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      floatSpeed: number;
      floatOffset: number;
    }

    const floatingObjects: FloatingObject[] = [];

    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1.0, 0),
      new THREE.TorusGeometry(0.9, 0.3, 16, 60),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.TetrahedronGeometry(1.1, 0),
      new THREE.DodecahedronGeometry(1.0, 0),
    ];

    const materials = [metallicMat, wireframeMat, glassMat, purpleGlowMat];

    // Coordinates spanning sections from Y = 5 down to Y = -80
    const positions = [
      // Hero area decorative shapes
      { x: -7, y: 3, z: -2 },
      { x: 7, y: -2, z: -3 },
      { x: -5, y: -4, z: -1 },
      // About area shapes (Y ~ -15..-25)
      { x: -8, y: -16, z: -2 },
      { x: 8, y: -20, z: -4 },
      { x: -6, y: -25, z: -1 },
      { x: 7, y: -28, z: -3 },
      // Skills area shapes (Y ~ -35..-45)
      { x: -7, y: -38, z: -2 },
      { x: 8, y: -42, z: -3 },
      { x: -6, y: -48, z: -1 },
      // Projects area shapes (Y ~ -55..-70)
      { x: -8, y: -58, z: -3 },
      { x: 8, y: -64, z: -2 },
      { x: -7, y: -70, z: -4 },
      // Contact area shapes (Y ~ -80..-90)
      { x: -6, y: -82, z: -2 },
      { x: 6, y: -86, z: -3 },
    ];

    positions.forEach((pos, idx) => {
      const geo = geometries[idx % geometries.length];
      const mat = materials[idx % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(pos.x, pos.y, pos.z);

      floatingObjects.push({
        mesh,
        baseX: pos.x,
        baseY: pos.y,
        baseZ: pos.z,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.8 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
      });

      scene.add(mesh);
    });

    // 7. BACKGROUND 3D PARTICLE SYSTEM
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 50;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 110 - 35; // Expand down document length
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      particleScales[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    // Particle Texture Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(215, 226, 234, 1)');
      grad.addColorStop(0.5, 'rgba(182, 0, 168, 0.4)');
      grad.addColorStop(1, 'rgba(12, 12, 12, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. RESIZE HANDLER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP (Using requestAnimationFrame)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const mState = mouseRef.current;

      // Current normalized mouse coords (-1 to +1)
      const lerpX = reducedMotion ? 0 : mState.lerpX;
      const lerpY = reducedMotion ? 0 : mState.lerpY;
      const scrollProg = mState.scrollProgress;

      // Scroll Y positioning: maps scrollProgress (0..1) to world Y (0..-85)
      const targetWorldY = -scrollProg * 85;

      // Smooth Camera Movement (Cursor Inertia + Scroll Depth)
      camera.position.x = lerpX * 1.5;
      camera.position.y = targetWorldY + lerpY * 1.2;
      camera.rotation.y = lerpX * 0.05;
      camera.rotation.x = -lerpY * 0.05;

      // Update Cursor PointLight Position in 3D World Space
      cursorLight.position.x = lerpX * 14;
      cursorLight.position.y = targetWorldY + lerpY * 9;
      secondaryCursorLight.position.x = -lerpX * 10;
      secondaryCursorLight.position.y = targetWorldY - lerpY * 7;

      // Rotate Hero Centerpiece Structure
      if (heroGroup) {
        outerIcoMesh.rotation.x = elapsedTime * 0.2;
        outerIcoMesh.rotation.y = elapsedTime * 0.25;

        innerKnotMesh.rotation.x = elapsedTime * -0.3;
        innerKnotMesh.rotation.z = elapsedTime * 0.2;

        ringMesh1.rotation.z = elapsedTime * 0.15 + lerpX * 0.5;
        ringMesh2.rotation.x = elapsedTime * -0.1 + lerpY * 0.5;

        // Hero centerpiece responds to cursor physics
        heroGroup.rotation.y = lerpX * 0.4;
        heroGroup.rotation.x = -lerpY * 0.4;
      }

      // Rotate & Float Global 3D Objects
      floatingObjects.forEach((obj) => {
        if (!reducedMotion) {
          obj.mesh.rotation.x += obj.rotSpeedX;
          obj.mesh.rotation.y += obj.rotSpeedY;

          // Float offset
          const floatY = Math.sin(elapsedTime * obj.floatSpeed + obj.floatOffset) * 0.4;
          obj.mesh.position.y = obj.baseY + floatY;

          // Parallax shift based on depth (Z)
          const parallaxFactor = (10 - obj.baseZ) * 0.03;
          obj.mesh.position.x = obj.baseX + lerpX * parallaxFactor;
        }
      });

      // Slowly float particle system & react to cursor
      if (particles) {
        particles.rotation.y = elapsedTime * 0.02 + lerpX * 0.05;
        particles.rotation.x = lerpY * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 10. CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default Global3DCanvas;
