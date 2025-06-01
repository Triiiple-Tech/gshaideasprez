import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleProps {
  count: number;
  mouse: { x: number; y: number };
  intensity: number;
}

function Particles({ count, mouse, intensity }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Position
      temp[i3] = (Math.random() - 0.5) * viewport.width * 2;
      temp[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;

      // Colors - embers and sparks
      const isEmber = Math.random() > 0.7;
      if (isEmber) {
        colors[i3] = 1.0; // Red
        colors[i3 + 1] = 0.4; // Green
        colors[i3 + 2] = 0.0; // Blue
      } else {
        colors[i3] = 1.0; // White sparks
        colors[i3 + 1] = 1.0;
        colors[i3 + 2] = 0.8;
      }
    }

    return { positions: temp, colors };
  }, [count, viewport]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;
    const colors = mesh.current.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Drift upward
      positions[i3 + 1] += 0.005 * intensity;

      // Mouse attraction
      const mouseInfluence = 0.02 * intensity;
      const dx = mouse.x * viewport.width - positions[i3];
      const dy = mouse.y * viewport.height - positions[i3 + 1];

      positions[i3] += dx * mouseInfluence * 0.001;
      positions[i3 + 1] += dy * mouseInfluence * 0.001;

      // Reset particles that drift too far
      if (positions[i3 + 1] > viewport.height) {
        positions[i3 + 1] = -viewport.height;
        positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      }

      // Flicker effect for embers
      if (colors[i3] > 0.9) {
        // Ember particles
        const flicker = 0.8 + Math.sin(state.clock.elapsedTime * 10 + i) * 0.2;
        colors[i3 + 1] = 0.4 * flicker; // Vary green component
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
}

function HeatHaze() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.material.uniforms.time.value = state.clock.elapsedTime;
  });

  const shader = useMemo(
    () => ({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.1 },
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform float time;
      uniform float opacity;
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return sin(p.x * 10.0 + time) * sin(p.y * 10.0 + time * 0.5) * 0.5 + 0.5;
      }
      
      void main() {
        float n = noise(vUv * 5.0 + time * 0.1);
        float distortion = sin(vUv.y * 20.0 + time) * 0.02;
        vec2 distortedUv = vUv + vec2(distortion, 0.0);
        
        float alpha = opacity * n * (1.0 - distance(distortedUv, vec2(0.5, 0.5)));
        gl_FragColor = vec4(1.0, 0.5, 0.0, alpha);
      }
    `,
    }),
    [],
  );

  return (
    <mesh ref={mesh} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial {...shader} transparent />
    </mesh>
  );
}

interface ParticleBackgroundProps {
  intensity?: number;
  className?: string;
}

export default function ParticleBackground({
  intensity = 1,
  className = "",
}: ParticleBackgroundProps) {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        setMouse({
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <HeatHaze />
        <Particles count={150} mouse={mouse} intensity={intensity} />
      </Canvas>
    </div>
  );
}
