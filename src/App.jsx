import React, { useEffect, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Discover from './components/Discover';
import About from './components/About';
import Entrance from './components/Entrance';
import WhoWeAre from './components/WhoWeAre';
import Updates from './components/Updates';
import Contact from './components/Contact';
import ScrollAnimations from './components/ScrollAnimations';
import Navbar from './components/Navbar';
import Loader from './components/Loader'; // <-- import Loader

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Collect all image/video/audio/font URLs
    const assetUrls = [
      // Images
      "/img/stones.webp", "/img/about.webp","/img/zentry-symbol-white.png",
      // Videos
      "/videos/hero-1.mp4", "/videos/hero-2.mp4", "/videos/hero-3.mp4", "/videos/hero-4.mp4",
      // Audio
      "/audio/loop.mp3",
      // Fonts (optional, usually browser handles)
      "/fonts/robert-medium.woff2", "/fonts/zentry-regular.woff2", "/fonts/robert-regular.woff2", "/fonts/general.woff2", "/fonts/circularweb-book.woff2"
    ];

    let loadedCount = 0;
    const total = assetUrls.length;

    function checkDone() {
      loadedCount++;
      setProgress(Math.round((loadedCount / total) * 100));
      if (loadedCount >= total) setLoaded(true);
    }

    assetUrls.forEach(url => {
      if (url.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = url;
        video.oncanplaythrough = checkDone;
        video.onerror = checkDone;
      } else if (url.endsWith('.webp') || url.endsWith('.png') || url.endsWith('.jpg')) {
        const img = new window.Image();
        img.src = url;
        img.onload = checkDone;
        img.onerror = checkDone;
      } else if (url.endsWith('.mp3')) {
        const audio = document.createElement('audio');
        audio.src = url;
        audio.oncanplaythrough = checkDone;
        audio.onerror = checkDone;
      } else if (url.endsWith('.woff2')) {
        // Font loading (optional)
        document.fonts.load(`1em "zentry"`).then(checkDone).catch(checkDone);
      } else {
        checkDone();
      }
    });
  }, []);

  useEffect(() => {
    window.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      window.lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (window.lenis) {
        window.lenis.destroy();
        gsap.ticker.remove(window.lenis.raf);
        window.lenis = null;
      }
    };
  }, []);

  return (
    <div className='bg-#dfdff0 relative'>
      <Loader progress={progress} />
      <Navbar />
      <ScrollAnimations />
      <div id="hero-section">
        <Hero /> 
      </div>
      <div id="discover-section">
        <Discover /> 
      </div>
      <div id="about">
        <About />  
      </div>
      <div id="entrance-section">
        <Entrance /> 
      </div>
      <div id="whoweare-section">
        <WhoWeAre /> 
      </div>
      <div id="updates-section">
        <Updates /> 
      </div>
      <div id="contact">
        <Contact /> 
      </div>
    </div>
  )
}

export default App
