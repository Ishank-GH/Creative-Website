import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Discover = () => {
  useGSAP(() => {
    const main = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=600px",
        pin: ".main-container",
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        onLeave: () => {
          ScrollTrigger.refresh();
        },
      },
    });

    main.to([".clip-border-container", ".clip-container"], {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      x: (i, target) => {
        const element = target || {};
        const className = element.className || '';
        return className.includes("clip-border-container") ? "-5px" : "0px";
      },
      ease: "power1.inOut",
    }, 0);

    main.to([".clip-border-container", ".clip-container"], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.inOut",
    }, 0);

    main.to(".clip-container img", {
      scale: 1,
      ease: "power1.inOut",
    }, 0);
    
    gsap.set([".clip-border-container", ".clip-container", ".clip-container img"], {
      borderRadius: "0.75rem",
    });
  });

  return (
    <div id="discover-section" className="main-container relative min-h-screen w-screen overflow-hidden">
      <div className="flex-center h-[48vh] w-screen">
        <h5 className="top-15 uppercase general text-sm absolute ">
          welcome to zentry
        </h5>
        <p className="uppercase top-20 mt-5 text-8xl absolute special-font zentry ">
          disc<b>o</b>ver the world's
        </p>
        <p className="uppercase top-41 mt-5 text-8xl absolute special-font zentry ">
          largest shared <b>a</b>dventure
        </p>
      </div>

      <div className="w-screen h-screen relative">
        <div className="flex-center flex-col absolute bottom-3 right-112">
          <p className="general font-semibold">
            The Metagame begins-your life, now an epic MMORPG
          </p>
          <p className="general font-light leading-none text-md">
            Zentry the unified play layer driving attention and contribution
          </p>
          <p id="last-text" className="general leading-none text-md">
            through cross-world AI gamification.
          </p>
        </div>

        <div className="flex-center flex-col h-screen relative" id="clip">
          <img
            src="/img/stones.webp"
            alt=""
            className="absolute w-screen h-screen scale-[1.3] object-cover z-[99]"
          />
          <div className="clip-border-container discover-path bg-black absolute left-1/2 top-1/2 z-[98] -translate-x-1/2 -translate-y-1/2 w-[calc(25vw+4px)] h-[calc(75vh+4px)] rounded-xl">
            <div 
              className="clip-container discover-path h-[75vh] w-[25vw] overflow-hidden absolute top-[2px] left-[2px] z-[1] rounded-xl"
            >
              <img
                src="/img/about.webp"
                alt="About Zentry"
                className="clip absolute w-screen h-screen object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
