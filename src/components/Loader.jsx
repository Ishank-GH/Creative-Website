import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ progress }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (progress >= 100) {
      gsap.to(loaderRef.current, {
        y: "-100vh",
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        }
      });
    }
  }, [progress]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#dfdff0] transition-all"
      style={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center">
        <div className="loader-spinner mb-4 w-16 h-16 border-4 border-violet-300 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xl font-bold zentry text-black mb-2">{progress}%</span>
        <span className=" text-3xl zentry text-black"><b>Loading...</b></span>
      </div>
    </div>
  );
};

export default Loader;