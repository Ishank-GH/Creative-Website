import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const ScrollAnimations = () => {
  useEffect(() => {
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, p');
    headings.forEach(heading => {
      gsap.fromTo(heading,
        { 
          y: 50, 
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

 
    const cards = document.querySelectorAll('.story-img-mask, .mb-16, .hover-box');
    gsap.fromTo(cards,
      { 
        y: 80, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        }
      }
    );


    const backgrounds = document.querySelectorAll('.main-container, .updates-container');
    backgrounds.forEach(bg => {
      gsap.to(bg, {
        backgroundPosition: "50% 20%",
        ease: "none",
        scrollTrigger: {
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null; 
};

export default ScrollAnimations; 