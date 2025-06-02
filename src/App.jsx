import React, { useEffect, useState, useMemo } from 'react'
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

  // Organize assets by priority
  const assets = useMemo(() => ({
    critical: [
      "/videos/hero-1.mp4",
      "/img/stones.webp",
      "/img/about.webp",
      "/img/zentry-symbol-white.png"
    ],
    important: [
      "/videos/hero-2.mp4",
      "/audio/loop.mp3"
    ],
    nonCritical: [
      "/videos/hero-3.mp4",
      "/videos/hero-4.mp4",
      "/fonts/robert-medium.woff2",
      "/fonts/zentry-regular.woff2",
      "/fonts/robert-regular.woff2",
      "/fonts/general.woff2",
      "/fonts/circularweb-book.woff2"
    ]
  }), []);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = [...assets.critical, ...assets.important, ...assets.nonCritical];
    const total = totalAssets.length;

    const updateProgress = (increment = 1) => {
      loadedCount += increment;
      const percentage = Math.round((loadedCount / total) * 100);
      setProgress(percentage);
      if (percentage >= 100) setLoaded(true);
    };

    const loadAsset = (url) => {
      // Ensure URL is valid
      if (!url || typeof url !== 'string') {
        return Promise.reject(new Error('Invalid URL'));
      }

      // Remove any leading/trailing whitespace and ensure proper path
      const cleanUrl = url.trim().startsWith('/') ? url.trim() : `/${url.trim()}`;
      
      return new Promise((resolve, reject) => {
        if (url.endsWith('.mp4')) {
          const video = document.createElement('video');
          video.crossOrigin = 'anonymous';
          video.preload = 'metadata';
          
          // First try direct loading
          const tryLoad = () => {
            video.src = url;
            video.load();
            
            return new Promise((res, rej) => {
              video.onloadedmetadata = () => res();
              video.onerror = () => rej();
              
              // Timeout after 5 seconds
              setTimeout(() => rej('Timeout'), 5000);
            });
          };
          
          tryLoad()
            .then(() => resolve())
            .catch(() => {
              // If direct loading fails, try fetch
              fetch(url)
                .then(response => {
                  if (!response.ok) throw new Error('Network response not ok');
                  return response.blob();
                })
                .then(blob => {
                  video.src = URL.createObjectURL(blob);
                  video.onloadedmetadata = () => {
                    URL.revokeObjectURL(video.src);
                    resolve();
                  };
                })
                .catch(reject);
            });
        } else if (url.endsWith('.webp') || url.endsWith('.png')) {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        } else if (url.endsWith('.mp3')) {
          fetch(url)
            .then(response => response.blob())
            .then(blob => {
              const audio = new Audio();
              audio.src = URL.createObjectURL(blob);
              audio.oncanplaythrough = () => {
                URL.revokeObjectURL(audio.src);
                resolve();
              };
              audio.onerror = reject;
            })
            .catch(() => {
              // If fetch fails, try direct loading as fallback
              const audio = new Audio();
              audio.src = url;
              audio.oncanplaythrough = resolve;
              audio.onerror = reject;
            });
        } else if (url.endsWith('.woff2')) {
          // Load fonts in parallel without blocking
          resolve();
        }
      });
    };

    // Load assets in priority order
    const loadAssets = async () => {
      try {
        // Load critical assets first
        await Promise.all(assets.critical.map(url => 
          loadAsset(url).then(() => updateProgress())
        ));

        // Load important assets
        Promise.all(assets.important.map(url => 
          loadAsset(url).then(() => updateProgress())
        ));

        // Load non-critical assets in background
        assets.nonCritical.forEach(url => {
          loadAsset(url).then(() => updateProgress());
        });

      } catch (error) {
        console.error('Error loading assets:', error);
        // Continue loading even if some assets fail
        updateProgress();
      }
    };

    loadAssets();

    // Preload fonts in parallel
    const fontUrls = totalAssets.filter(url => url.endsWith('.woff2'));
    Promise.all(
      fontUrls.map(url => {
        const fontName = url.split('/').pop().split('.')[0];
        return document.fonts.load(`1em "${fontName}"`);
      })
    ).catch(error => console.error('Font loading error:', error));
  }, [assets]);

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
