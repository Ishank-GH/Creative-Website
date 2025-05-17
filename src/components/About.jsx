import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15 
        }
      );

      const content = card.querySelector('.card-content');
      if (content) {
        gsap.fromTo(
          content,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15 + 0.3 
          }
        );
      }
    });
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen relative bg-black">
      <div className=" w-screen">
        <div className="text-white robert-regular font-bold py-5 px-15 ">
          <p className="text-xl mt-10">Explore the Zentry Universe</p>
          <p className="opacity-50 mask-radial-from-75%">
            Immerse yourself in an IP-rich product universe where <br />
            players, agentic AI and blockchain lead the new <br /> economic
            paradigm.
          </p>
        </div>

        <div className="w-screen p-10 gap-5 flex-center flex-col">
          <div 
            ref={addCardRef} 
            className="w-[80vw] h-[84vh] relative border-2 border-gray-800 rounded-xl overflow-hidden"
          >
            <div className="card-content absolute p-5 z-10">
              <h1 className="zentry uppercase special-font text-white text-8xl">Radia<b>n</b>t</h1>
              <p className="robert-regular text-white mt-2">
                The game of games app <br /> transforming moments across <br />
                Web2 & Web3 titles into rewards
              </p>
            </div>
            <video
              src="/videos/feature-1.mp4"
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex-center gap-10 mt-10">
            <div 
              ref={addCardRef} 
              className="w-[43vw] h-[115vh] relative border-2 border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="card-content absolute p-3 z-10">
                <h1 className="zentry uppercase special-font text-white text-5xl">
                  zig<b>m</b>a
                </h1>
                <p className="robert-regular text-white text-xs mt-2 ">
                  <p>
                    The NFT collection merging <br /> Zentry's IP, AI, and
                    gaming- <br />
                    pushing the boundaries of NFT <br />
                    innovations.
                  </p>
                </p>
              </div>
              <video
                src="/videos/feature-2.mp4"
                autoPlay
                loop
                muted
                className="absolute top-0 left-0  object-contain"
              />
            </div>

            <div className="flex-center flex-col gap-5">
              <div 
                ref={addCardRef} 
                className="w-[40vw] h-[55vh] relative border-2 border-gray-800 rounded-xl overflow-hidden"
              >
                <div className="card-content absolute p-3 z-10">
                  <h1 className="zentry uppercase special-font text-white text-5xl">
                    n<b>e</b>xus
                  </h1>
                  <p className="robert-regular text-white text-sm mt-2 ">
                    <p>
                      The metagame portal uniting <br /> humans & AI to play,
                      compete and <br /> earn.
                    </p>
                  </p>
                </div>
                <video
                  src="/videos/feature-3.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute top-0 left-0 w-full h-full object-contain scale-[1.7] object-[67%]"
                />
              </div>

              <div 
                ref={addCardRef} 
                className="w-[40vw] h-[55vh] relative border-2 border-gray-800 rounded-xl overflow-hidden"
              >
                <div className="card-content absolute p-3 z-10">
                  <h1 className="zentry uppercase special-font text-white text-5xl">
                    az<b>u</b>l
                  </h1>
                  <p className="robert-regular text-white text-sm mt-2 ">
                    <p>
                      The agent of agents elevating <br /> agentic AI experience
                      to be <br />
                      more fun and production.
                    </p>
                  </p>
                </div>
                <video
                  src="/videos/feature-4.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute top-0 left-0 w-full h-full object-cover scale-[1] object-[90%]"
                />
              </div>
            </div>
          </div>
          <div className="flex-center gap-5 mt-5">
            <div 
              ref={addCardRef} 
              className="w-[43vw] h-[55vh] bg-violet-300 relative border-2 border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="card-content absolute p-3 z-10">
                <h1 className="zentry uppercase special-font text-black text-6xl">
                  m<b>o</b>re <br />
                  co<b>m</b>ing <br />s<b>o</b>on
                </h1>
              </div>
            </div>

            <div 
              ref={addCardRef} 
              className="w-[43vw] h-[55vh] relative border-2 border-gray-800 rounded-xl overflow-hidden"
            >
              <video
                src="/videos/feature-5.mp4"
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
