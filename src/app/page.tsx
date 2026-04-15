"use client";

import { useState } from "react";

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <main className="relative flex items-center justify-center min-h-screen w-full bg-black overflow-hidden p-4">
      <div className="relative w-full max-w-[95rem] h-fit [perspective:2000px]">
        
        {/* THE FLIPPING CARD */}
        <div 
          className={`relative w-full transition-all duration-1000 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          
          {/* --- SIDE A (FRONT) --- */}
          <div className={`relative w-full h-full [backface-visibility:hidden] ${isFlipped ? "z-0" : "z-10"}`}>
            <video
              src="/background.mp4"
              autoPlay loop muted playsInline
              className="w-full h-auto block"
            />
            
            <div className="absolute inset-0 z-10">
              <div className="absolute top-[24%] left-[24%] w-[51.5%] h-[16.7%]">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 975 171" fill="none" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                    <path d="M9.00002 171C4.02946 171 0 166.971 0 162V33.6389C0 31.3047 0.906827 29.0619 2.5291 27.3837L26.3467 2.7448C28.0424 0.990577 30.3777 0 32.8176 0H940.361C942.695 0 944.938 0.906827 946.616 2.5291L971.282 26.3726C973.02 28.0531 974.01 30.3624 974.027 32.7802L974.936 161.937C974.971 166.932 970.932 171 965.936 171H9.00002Z" fill="#DEDBD2"/>
                  </svg>
                  <div className="relative z-20 flex flex-col justify-between h-full px-[3%] py-[1%] font-mono">
                    <header className="flex justify-between w-full items-center">
                      <p className="font-light text-[clamp(10px,1.2vw,15px)]"><span className="font-normal">SIDE A:</span> Hero</p>
                      <button onClick={() => setIsFlipped(true)} className="font-light text-[clamp(10px,1.2vw,15px)] hover:text-red-600 cursor-pointer">
                        <span className="font-normal">SIDE B:</span> About me 
                      </button>
                    </header>
                    <h1 className="text-center text-[clamp(18px,2.5vw,30px)] font-extralight tracking-tighter">kristijans_vēveris</h1>
                    <div className="flex justify-between items-end text-[clamp(8px,1vw,13px)]">
                      <div className="font-light leading-tight">
                        <p>Junior software engineer</p>
                        <p>Archive_01 | Volume_01</p>
                        <p>Riga, Latvia</p>
                      </div>
                      <div className="underline font-light leading-tight text-right opacity-60">
                        <p>Projects</p><p>Experience</p><p>Contact Me</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- SIDE B (BACK) --- */}
          <div 
            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] ${isFlipped ? "z-10" : "z-0"}`}
          >
            {/* Added a filter to Side B video so you can tell it's the back */}
            <video
              src="/background.mp4" 
              autoPlay loop muted playsInline
              className="w-full h-auto block" 
            />

            <div className="absolute inset-0 z-10">
              <div className="absolute top-[24%] left-[24%] w-[51.5%] h-[40%]">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 975 424" fill="none" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                    <path d="M9.00002 424C4.02946 424 0 419.971 0 415V33.6389C0 31.3047 0.906827 29.0619 2.5291 27.3837L26.3467 2.7448C28.0424 0.990577 30.3777 0 32.8176 0H940.358C942.694 0 944.938 0.908168 946.617 2.53258L972.259 27.3472C974.011 29.0427 975 31.3765 975 33.8146V415C975 419.971 970.971 424 966 424H9.00002Z" fill="#DEDBD2"/>
                  </svg>
                  <div className="relative z-20 flex flex-col justify-between h-full px-[3%] py-[1%] font-mono text-black">
                    <header className="flex justify-between w-full items-center">
                      <button onClick={() => setIsFlipped(false)} className="font-light text-[clamp(10px,1.2vw,15px)] hover:text-red-600 cursor-pointer">
                        <span className="font-normal">SIDE A:</span> Hero 
                      </button>
                      <p className="font-light text-[clamp(10px,1.2vw,15px)]"><span className="font-normal">SIDE B:</span> About Me</p>
                    </header>
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <p className="text-[clamp(10px,1.4vw,18px)] leading-tight max-w-[90%]">
                        I am a Junior Software Engineer based in Riga, Latvia.
                      </p>
                      <p className="text-[clamp(8px,1.2vw,14px)] mt-1 opacity-80">
                        Focused on creating interactive digital experiences.
                      </p>
                    </div>
                    <footer className="w-full text-[8px] opacity-40 text-right uppercase">Track 02: Bio</footer>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
