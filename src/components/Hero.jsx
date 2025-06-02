import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState({});
  const nextVid = useRef(null);
  const videoFrameRef = useRef(null);
  const previewCardRef = useRef(null);
  const expandingVideoRef = useRef(null);
  const expandingVideoContainerRef = useRef(null);
  const totalVideos = 4;
  const lastTextRef = useRef(null);
  const lastTextRef2 = useRef(null);
  const mainVideoRef = useRef(null);

  const bottomTexts = ['gaming', 'future', 'metaverse', 'reality'];

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  // Video loading effect
  useEffect(() => {
    const loadVideo = async (index) => {
      const src = getVideoSrc(index);
      if (!videosLoaded[src]) {
        try {
          const response = await fetch(src);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideosLoaded(prev => ({ ...prev, [src]: url }));
        } catch (error) {
          console.error(`Error loading video ${index}:`, error);
        }
      }
    };

    // Load first video immediately
    loadVideo(currentIndex);

    // Load next video
    const nextIndex = (currentIndex % totalVideos) + 1;
    loadVideo(nextIndex);

    // Cleanup function
    return () => {
      Object.values(videosLoaded).forEach(url => URL.revokeObjectURL(url));
    };
  }, [currentIndex]);



  // Initial setup
  useEffect(() => {
    if (mainVideoRef.current) {
      const src = videosLoaded[getVideoSrc(currentIndex)] || getVideoSrc(currentIndex);
      mainVideoRef.current.src = src;
      mainVideoRef.current.load();
      
      // Play when metadata is loaded
      mainVideoRef.current.onloadedmetadata = () => {
        mainVideoRef.current.play().catch(error => {
          console.warn("Video autoplay was prevented:", error);
        });
      };
    }

    // Hide expanding video container initially
    gsap.set(expandingVideoContainerRef.current, {
      opacity: 0,
      scale: 0,
      width: '12rem',
      height: '16rem',
      borderRadius: '0.5rem',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      visibility: 'hidden'
    });
  }, [currentIndex, videosLoaded]);

  useGSAP(() => {
    gsap.set(videoFrameRef.current, {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from(videoFrameRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: 1,
      },
    });

    gsap.set(previewCardRef.current, {
      opacity: 0,
      scale: 0.5,
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50     
    });

    const handleMouseEnter = () => {
      gsap.to(previewCardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(previewCardRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });
    };

    const handleClick = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      gsap.to([lastTextRef.current, lastTextRef2.current], {
        opacity: 0,
        y: 130,
        duration: 0.6
      });

      const nextIndex = (currentIndex % totalVideos) + 1;
      const nextSrc = videosLoaded[getVideoSrc(nextIndex)] || getVideoSrc(nextIndex);

      if (nextVid.current) {
        nextVid.current.src = nextSrc;
        nextVid.current.load();
      }

      if (expandingVideoRef.current) {
        expandingVideoRef.current.src = nextSrc;
        expandingVideoRef.current.load();
      }

      // Show and position the expanding video container at the card's position
      gsap.set(expandingVideoContainerRef.current, {
        opacity: 1,
        scale: 1,
        visibility: 'visible',
        width: '12rem',
        height: '16rem',
        borderRadius: '0.5rem',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50
      });

      // Expand the container
      gsap.to(expandingVideoContainerRef.current, {
        width: '100vw',
        height: '110vh',
        borderRadius: 0,
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => {
          // Start playing the expanding video only after expansion
          if (expandingVideoRef.current) {
            expandingVideoRef.current.play().catch(error => {
              console.warn("Video play prevented:", error);
            });
          }

          // Update the main video source to match the next index
          if (mainVideoRef.current) {
            mainVideoRef.current.src = getVideoSrc(nextIndex);
            mainVideoRef.current.load();
            mainVideoRef.current.play().catch(error => {
              console.warn("Video play prevented:", error);
            });
          }

          // Update state and hide expanding video
          setCurrentIndex(nextIndex);
          setIsTransitioning(false);

          gsap.to(expandingVideoContainerRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.set(expandingVideoContainerRef.current, {
                visibility: 'hidden',
                width: '12rem',
                height: '16rem',
                borderRadius: '0.5rem'
              });
            }
          });

          gsap.fromTo([lastTextRef.current, lastTextRef2.current],
            { opacity: 0, y: -50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5
            }
          );

          if (lastTextRef.current && lastTextRef2.current) {
            const newText = bottomTexts[(nextIndex - 1) % bottomTexts.length];
            lastTextRef.current.innerHTML = `${newText.slice(0, -3)}<b>${newText.slice(-3)}</b>`;
            lastTextRef2.current.innerHTML = `${newText.slice(0, -3)}<b>${newText.slice(-3)}</b>`;
          }
        }
      });
    };

    const card = previewCardRef.current;
    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('click', handleClick);

      if (nextVid.current) {
        nextVid.current.src = getVideoSrc(getNextVideoNumber());
        nextVid.current.load();
      }

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('click', handleClick);
      };
    }
  }, [currentIndex, isTransitioning]);

  const preloadVideo = (index) => {
    const src = getVideoSrc(index);
    if (!videosLoaded[src]) {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.muted = true;
      video.load();
      setVideosLoaded(prev => ({ ...prev, [src]: true }));
    }
  };

  useEffect(() => {
    // Preload the next video after currentIndex changes
    const nextIndex = (currentIndex % totalVideos) + 1;
    preloadVideo(nextIndex);
  }, [currentIndex]);

  const getNextVideoNumber = () => {
    return (currentIndex % totalVideos) + 1;
  };

  return (
    <div id="hero-section" className="relative h-dvh w-screen overflow-x-hidden bg-#dfdff0 pointer-events-none">
      <div
        ref={videoFrameRef}
        id="video-frame"
        className="absolute inset-0 z-10 h-dvh w-screen overflow-hidden"
      >
        <div>
          <video
            ref={mainVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute left-0 top-0 size-full object-cover object-center"
            src={videosLoaded[getVideoSrc(currentIndex)] || getVideoSrc(currentIndex)}
          />
        </div>
        <div className="z-20 mt-5 absolute w-screen h-screen inset-0 p-5 pointer-events-auto">
          <h1 className="z-50 uppercase special-font absolute top-5 text-[11vw] text-blue-100 zentry">
            REDEFI<b>N</b>E
          </h1>
          <p className="top-54 z-50 mt-3 absolute robert-medium leading-none text-lg text-white">
            Enter the Metagame <br /> Unleash the Play Economy
          </p>
          <button className="top-70 z-50 flex-center absolute bg-yellow-300 uppercase text-black py-2.5 px-5 rounded-full general text-xs font-semibold">
            <i className="ri-arrow-drop-right-line text-2xl leading-none mr-2"></i>Watch Trailer
          </button>
          
          {/* Preview card that doesn't expand */}
          <div 
            ref={previewCardRef}
            className="absolute w-48 h-64 rounded-lg cursor-pointer shadow-xl overflow-hidden pointer-events-auto z-50"
          >
            <video
              ref={nextVid}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Separate expanding video container */}
          <div
            ref={expandingVideoContainerRef}
            className="absolute rounded-lg overflow-hidden shadow-xl z-40 pointer-events-none"
          >
            <video
              ref={expandingVideoRef}
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>

          <h1 ref={lastTextRef} 
              className="z-50 uppercase special-font absolute bottom-[-12px] right-10 text-[11vw] text-blue-100 mix-blend-difference zentry">
            g<b>a</b>ming
          </h1>
        </div>
      </div>

      <div>
        <h1 ref={lastTextRef2}
            className="uppercase special-font absolute bottom-[-12px] right-10 text-[11vw] text-white mix-blend-difference zentry">
          g<b>a</b>ming
        </h1>
      </div>
    </div>
  );
};

export default Hero;