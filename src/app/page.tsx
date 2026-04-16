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
        <pointLight position={[-10, 5, 5]} intensity={1000.5} color="#E47025" />
        <Suspense fallback={null}>
          <CassetteModel isFlipped={isFlipped} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        </Suspense>
        <Environment preset="city" />
      </Canvas>

      {!isFlipped && (
        <div className="absolute pointer-events-none" style={{ top: "32.5%", left: "33.9%", width: "32%", height: "28%" }}>
          
          {/* Top strip */}
          <div className="absolute left-0 top-0 w-full h-[40%]" style={{
            background: "#ffffff",
            borderRadius: "4px 4px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#1a0a00", margin: 0 }}>MY TITLE</p>
            <p style={{ fontSize: "0.6rem", fontStyle: "italic", color: "#1a0a00", margin: 0 }}>My Artist</p>
          </div>

          {/* Left side part */}
          <div style={{
            position: "absolute",
            left: 0, top: "40%",
            width: "17%", height: "35%", // Shortened to make room for bottom strip
            background: "#ffffff",
          }} />

          {/* Right side part */}
          <div style={{
            position: "absolute",
            right: 0, top: "40%",
            width: "17.5%", height: "35%",
            background: "#ffffff",
          }} />

          {/* Bottom strip */}
          <div style={{
            position: "absolute",
            left: 0, bottom: 0,
            width: "100%", height: "25.6%",
            background: "#ffffff",
            borderRadius: "0 0 4px 4px",
          }} />

          {/* Top Left Corner */}
          <div style={{
            position: "absolute", left: "17%", top: "40%", width: "7.3%", height: "15%",
            background: "radial-gradient(circle at 100% 100%, transparent 73%, #ffffff 74%)"
          }} />
          
          {/* Top Right Corner */}
          <div style={{
            position: "absolute", right: "17%", top: "40%", width: "7.7%", height: "13%",
            background: "radial-gradient(circle at 0% 100%, transparent 73%, #ffffff 74%)"
          }} />

          {/* Bottom Left Corner */}
          <div style={{
            position: "absolute", left: "17%", bottom: "25.6%", width: "8.6%", height: "18%",
            background: "radial-gradient(circle at 100% 0%, transparent 73%, #ffffff 74%)"
          }} />

          {/* Bottom Right Corner */}
          <div style={{
            position: "absolute", right: "17%", bottom: "25.6%", width: "8.7%", height: "13%",
            background: "radial-gradient(circle at 0% 0%, transparent 73%, #ffffff 74%)"
          }} />

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
