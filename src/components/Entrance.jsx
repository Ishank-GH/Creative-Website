import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Entrance = () => {
    const frameRef = useRef(null);
    const mainContainerRef = useRef(null);
    const textElementsRef = useRef([]);

    textElementsRef.current = [];
    const addTextElement = (el) => {
        if (el && !textElementsRef.current.includes(el)) {
            textElementsRef.current.push(el);
        }
    };

    useGSAP(() => {
        const card = frameRef.current;
        const mainContainer = mainContainerRef.current;

        if(!card || !mainContainer) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const xPos = clientX - rect.left;
            const yPos = clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((yPos - centerY) / centerY) * -6;
            const rotateY = ((xPos - centerX) / centerX) * 6;
            gsap.to(card, {
                duration: 0.5,
                rotateX,
                rotateY,
                transformPerspective: 2200,
                ease: "power1.out",
            });
        };

        const handleMouseLeave = () => {
            if (card) {
                gsap.to(card, {
                    duration: 0.5,
                    rotateX: 0,
                    rotateY: 0,
                    ease: "power1.out",
                });
            }
        };

        if (card && mainContainer) {
            mainContainer.addEventListener('mousemove', handleMouseMove);
            mainContainer.addEventListener('mouseleave', handleMouseLeave);
        }

        if (mainContainerRef.current) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: mainContainerRef.current,
                    start: "bottom-=6% bottom",
                    end: "bottom bottom-=4%",
                    pin: true,
                    scrub: true,
                    onEnter: () => {
                        gsap.to(mainContainerRef.current, { backgroundColor: '#dfdff0', duration: 0.25});
                        textElementsRef.current.forEach(el => gsap.to(el, { color: 'black', duration: 0.25}));
                    },
                    onLeaveBack: () => {
                        gsap.to(mainContainerRef.current, { backgroundColor: 'black', duration: 0.25});
                        textElementsRef.current.forEach(el => gsap.to(el, { color: '#dfdff0', duration: 0.25}));
                    },
                }
            });
        }

        return () => {
            if (card && mainContainer) {
                mainContainer.removeEventListener('mousemove', handleMouseMove);
                mainContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);


    return (
        <div id="entrance-section" ref={mainContainerRef} className='h-[165vh] w-screen relative bg-black transition-colors duration-500'>
            <div ref={addTextElement} className="flex-center h-[48vh] w-screen text-white transition-colors duration-500">
                <h5 ref={addTextElement} className="top-15 uppercase general text-sm absolute ">
                    the open ip universe
                </h5>
                <p ref={addTextElement} className="uppercase top-20 mt-5 text-8xl absolute special-font zentry ">
                    the st<b>o</b>ry of
                </p>
                <p ref={addTextElement} className="z-70 uppercase mix-blend-difference top-41 mt-5 text-8xl absolute special-font zentry ">
                    a hidden real<b>m</b>
                </p>
            </div>

            <div className="story-img-container flex-center ml-30 scale-[1.1]">
                <div className="story-img-border-wrapper bg-black rounded-lg">
                    <div className="story-img-mask relative rounded-lg cursor-pointer" ref={frameRef}>
                        <div className="story-img-content transition-transform duration-300">
                            <img
                                src="/img/entrance.webp"
                                alt="entrance.webp"
                                className="object-cover display-block w-full rounded-2xl h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div ref={addTextElement} className="text-white robert-regular font-bold absolute bottom-20 right-30 transition-colors duration-500">
                <p ref={addTextElement} className="opacity-90 mask-radial-from-75% mb-20">
                    Where realms converge, lies Zentry and the<br />
                    boundless pillar. Discover its secrets and shape  <br />
                    your fate amidst infinite opportunities.
                </p>
            </div>
        </div>
    )
}

export default Entrance