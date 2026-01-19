import React, { useState, useEffect } from "react";
import "./loaderStyles.css";
import PixelBlast from "./PixelBlast";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const intervalDuration = 1000 / 60;

  useEffect(() => {
    const increment = 100 / (1.5 * 60);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="diamond"
          pixelSize={5}
          color="#a3d9f0"
          patternScale={3}
          patternDensity={0.7}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.2}
          transparent
        />
      </div>

      {/* Foreground UI */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-10 pointer-events-none">

        {/* Loader Animation */}
        <div className="w-24 h-24 flex items-center justify-center scale-110">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-[300px] h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-300 transition-all"
            style={{
              width: `${progress}%`,
              transitionDuration: `${intervalDuration}ms`,
            }}
          />
        </div>

      </div>

    </div>
  );
};

export default Loader;
