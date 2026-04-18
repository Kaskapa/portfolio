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

  return <primitive ref={ref} object={scene} scale={40} rotation={[Math.PI / 2, 0, 0]} />;
}

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <main className="w-full h-screen bg-black relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[10, 5, 5]} intensity={1000.5} color="#E47025" />
        <pointLight position={[-10, 5, 5]} intensity={1000.5} color="#E47025" />
        <Suspense fallback={null}>
          <CassetteModel isFlipped={isFlipped} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </Suspense>
        <Environment preset="city" />
      </Canvas>

      {!isFlipped && (
        <div
          className="absolute"
          style={{ top: "26%", left: "28%", width: "44%", height: "38%" }}
        >
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="cassette-label-mask">
                <rect width="300" height="100" fill="white" />
                <rect x="55" y="40" width="189" height="34" rx="17" ry="17" fill="black" />
              </mask>
            </defs>
            <rect width="300" height="100" rx="4" ry="4" fill="white" mask="url(#cassette-label-mask)" />
          </svg>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#1a0a00", margin: 0 }}>
              MY TITLE
            </p>
            <p style={{ fontSize: "0.6rem", fontStyle: "italic", color: "#1a0a00", margin: 0 }}>
              My Artist
            </p>
          </div>
        </div>
      )}

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
