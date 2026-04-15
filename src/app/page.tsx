"use client";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function CassetteModel({ isFlipped }: { isFlipped: boolean }) {
  const { scene } = useGLTF("/cassette.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const target = isFlipped ? Math.PI : 0;
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, target, 0.08);
  });

  return <primitive ref={ref} object={scene} scale={30} rotation={[Math.PI / 2, 0, 0]} />;
}

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <main className="w-full h-screen bg-black relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[10, 5, 5]} intensity={1000.5} color="#E47025" />
        <Suspense fallback={null}>
          <CassetteModel isFlipped={isFlipped} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </Suspense>
        <Environment preset="city" />
      </Canvas>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-6 py-2 bg-white text-black font-mono text-sm rounded-full hover:bg-zinc-200 transition-colors"
        >
          {isFlipped ? "SIDE A" : "SIDE B"}
        </button>
      </div>
    </main>
  );
}

useGLTF.preload("/cassette.glb");
