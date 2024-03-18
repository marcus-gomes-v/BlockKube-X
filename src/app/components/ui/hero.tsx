'use client';

import { useEffect, useState } from 'react';
import { SparklesCore } from "./sparkles";
import { TypewriterEffect } from "./typewriter-effect";

export default function Hero() {
  const isDarkTheme = useThemeDetector();

  return (
    <main>
      <div className="w-full dark:transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 mb-3">
          <TypewriterEffect words={[{ text: "Block"}, { text: "Kube" }, { text: "X" }]} className='font-mono'  cursorClassName="hidden" />
        </h1>
        <div className="w-[40rem] h-40 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"></div>
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"></div>
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"></div>
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"></div>
          <div className="opacity-1 w-full h-full">
            <div id="tsparticles" className="h-full w-full">
             <SparklesCore background="transparent" maxSize={1.3} minSize={0.6} particleDensity={369} particleColor={isDarkTheme ? "#FFF" : "#0369a1"}  />
            </div>
            <div className="absolute inset-0 w-full h-full bg-transparent dark:bg-gray-900 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </div>
    </main>
  );
}


function useThemeDetector() {
    const [isDarkTheme, setIsDarkTheme] = useState(false); // Default to false

    useEffect(() => {
        // Ensure window is defined
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => setIsDarkTheme(mediaQuery.matches);
            handleChange(); // Call it to set the initial theme

            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    return isDarkTheme;
}