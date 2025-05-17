import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const boxImages = [
    "/img/entry-1.webp",
    "/img/entry-2.webp", 
    "/img/entry-3.webp"
  ];

  const sectionRef = useRef(null);
  const textElementsRef = useRef([]);

  textElementsRef.current = [];
  const addTextElement = (el) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const boxes = document.querySelectorAll('.hover-box');
    
    boxes.forEach((box, index) => {
      const boxElement = box.querySelector('div:first-child');
      const imageContainer = box.querySelector('.image-container');
      
      gsap.set(imageContainer, {
        width: "45px",
        height: "45px",
        opacity: 0,
        pointerEvents: "none"
      });

      if (index === 2) {
        gsap.set(imageContainer, { zIndex: 150 });
      }
      
      const pulseAnimation = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: true
      });
      
      pulseAnimation.to(boxElement, {
        scale: 1.15,
        duration: 0.8,
        ease: "power1.inOut"
      });
      
      
      pulseAnimation.play();

      const handleImageMouseMove = (e) => {
        const container = imageContainer;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((yPos - centerY) / centerY) * -6;
        const rotateY = ((xPos - centerX) / centerX) * 6;
        
        gsap.to(container, {
          duration: 0.3,
          rotateX,
          rotateY,
          transformPerspective: 1000,
          ease: "power1.inOut",
        });
      };
      
      const handleImageMouseLeave = () => {
        gsap.to(imageContainer, {
          duration: 0.3,
          rotateX: 0,
          rotateY: 0,
          ease: "power1.inOut",
        });
      };
      
      box.addEventListener('mouseenter', () => {
        pulseAnimation.pause();
        
       
        gsap.to(boxElement, {
          scale: 1,
          duration: 0.3
        });
        
       
        gsap.to(imageContainer, {
          width: "250px",
          height: "250px",
          opacity: 1,
          pointerEvents: "auto", 
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
             
            imageContainer.addEventListener('mousemove', handleImageMouseMove);
            imageContainer.addEventListener('mouseleave', handleImageMouseLeave);
          }
        });
      });
      
      box.addEventListener('mouseleave', (e) => {
        const relatedTarget = e.relatedTarget;
        if (imageContainer.contains(relatedTarget)) {
          return; 
        }
        
        
        imageContainer.removeEventListener('mousemove', handleImageMouseMove);
        imageContainer.removeEventListener('mouseleave', handleImageMouseLeave);
        
        gsap.to(imageContainer, {
          width: "45px",
          height: "45px",
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(imageContainer, { rotateX: 0, rotateY: 0 });
          }
        });
        
      
        setTimeout(() => {
          pulseAnimation.play();
        }, 300);
      });
    });

      
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { backgroundColor: 'black' });
      textElementsRef.current.forEach(el => gsap.set(el, { color: 'white' }));
      
      
      ScrollTrigger.create({
        trigger: document.getElementById('entrance-section'),
        start: "bottom-=15% bottom",
        end: "bottom bottom-=13%",
        onEnter: () => {
          gsap.to(sectionRef.current, { backgroundColor: '#dfdff0', duration: 0.25 });
          textElementsRef.current.forEach(el => gsap.to(el, { color: 'black', duration: 0.25 }));
        },
        onLeaveBack: () => {
          gsap.to(sectionRef.current, { backgroundColor: 'black', duration: 0.25 });
          textElementsRef.current.forEach(el => gsap.to(el, { color: 'white', duration: 0.25 }));
        }
      });
    }
  }, []);

  return (
    <div  id="whoweare-section" ref={sectionRef} className="h-[170vh] w-screen relative transition-colors duration-500 bg-black">
      <div className="flex-center h-screen w-screen text-white text-center transition-colors duration-500">
        <h5 ref={addTextElement} className="top-40 uppercase general text-xs absolute transition-colors duration-500">
          who we are
        </h5>
        <p ref={addTextElement} className="uppercase special-font top-47 mt-5 text-[101px] leading-none absolute special-font zentry transition-colors duration-500 z-10">
          We're b<b>u</b>ilding <br /> a new
          <span className="relative inline-block hover-box">
            <div className="inline-block w-[45px] h-[45px] bg-black ml-8 mr-6  rounded-sm cursor-pointer relative top-[-15px]" />
            <div className="image-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden pointer-events-none border-2 border-black">
              <img 
                src={boxImages[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </span> realit<b>y</b> <br />
          that rew<b>a</b>rds <br /> play<b>e</b>rs
          <span className="relative inline-block hover-box">
            <div className="inline-block w-[45px] h-[45px] bg-black ml-8 mr-6 rounded-sm cursor-pointer relative top-[-15px]" />
            <div className="image-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden pointer-events-none border-2 border-black">
              <img 
                src={boxImages[1]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </span> and <br />
          e<b>m</b>powers <br />
          hu<b>m</b>ans & AI <br /> to
          <span className="relative inline-block hover-box z-100">
            <div className="inline-block w-[45px] h-[45px] bg-black ml-8 mr-6   rounded-sm cursor-pointer relative top-[-15px]" />
            <div className="image-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden pointer-events-none border-2 border-black">
              <img 
                src={boxImages[2]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </span> thri<b>v</b>e
        </p>

        
      </div>
      <h2 ref={addTextElement} className="bottom-40 left-127 text-center uppercase general text-sm absolute transition-colors duration-500">
        Zentry envisions a future where players, emerging tech, <br /> and a new economy unite at the convergence of gaming and AI.
        </h2>
    </div>
  );
};

export default WhoWeAre;
