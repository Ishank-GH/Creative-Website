import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Updates = () => {
  useGSAP(() => {
    const updatesWrapper = document.querySelector(".updates-content-wrapper");
    const rightSide = document.querySelector(".right-side");

    if (updatesWrapper && rightSide) {
      ScrollTrigger.create({
        trigger: updatesWrapper,
        pin: ".left-side",
        start: "top top",
        end: () => "+=" + (rightSide.offsetHeight - window.innerHeight + (window.innerHeight * 0.1)), // Adjust 0.1 for bottom padding if left side is not full height
        
      });
    }

  }, []);

  return (
    <div id="updates-section" className="min-h-screen w-screen relative flex updates-container">
      <div className="updates-content-wrapper flex w-full">
        <div className="left-side text-black w-[45vw] h-screen p-10 sticky top-0">
          <div className="relative h-full flex flex-col justify-center">
            <h1 className="uppercase text-8xl special-font zentry leading-none absolute top-13">
              lat<b>e</b>st <br /> <b>u</b>pdates
            </h1>
            <p className="robert-regular text-sm absolute top-61">
              Stay updated with the latest news, events, <br /> and updates in out
              ecosystem. Be part of <br />
              our universe's growth and evolution.
            </p>
          </div>
        </div>

        <div className="right-side w-[55vw] flex flex-col items-center p-10 pt-40">
          <div className="w-full max-w-[35vw]">
            <div className="mb-16">
              <div className="w-full overflow-hidden rounded-md border-1 border-black">
                <img src="/img/gallery-2.webp" alt=""
                className="w-full" />
              </div>
              <div className="flex mt-4 gap-5">
                  <p className="text-xs general mt-1">09.05.2024</p>
                  <p className="ml-4 text-sm robert-regular "> Nexus Zentry's Metagame Portal <br /> Bridging Human & AI in the Global <br />Play Economy.</p>
              </div>
            </div>

            <div className="mb-16">
              <div className="w-full overflow-hidden rounded-md mt-10 border-1 border-black">
                <img src="/img/gallery-3.webp" alt=""
                className="w-full" />
              </div>
              <div className="flex mt-4 gap-5">
                  <p className="text-xs general mt-1">22.11.2024</p>
                  <p className="ml-4 text-sm robert-regular "> Zentry Whitepaper. The Blueprint to <br />the Metagame.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
