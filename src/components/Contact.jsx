import React from 'react'
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";

const Contact = () => {
  return (
    <div  id="contact" className='h-screen w-screen relative flex-center'>
      <div className='w-[95vw] h-[90vh] z-50 bg-black relative overflow-hidden'>
        <div className='flex-center text-white'>
          <p className="top-25 general uppercase text-xs absolute">
            join zentry
          </p>
          <h1 className="uppercase text-center top-30 mt-5 text-8xl absolute special-font zentry leading-20">
            let's b<b>u</b>ild the <br /> new era of g<b>a</b>ming <br /> t<b>o</b>gether.
          </h1>
            <Button
              id="contact-button"
              title="Contact Us"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 absolute top-103 md:flex hidden items-center justify-center gap-1"
            />
         
        </div>
        
       
        <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
          <img src="/img/swordman.webp" alt="" 
            className='w-[17vw] h-[70vh] scale-[1.3] contact-2 object-cover absolute right-10 top-0'/>
          <img src="/img/contact-1.webp" alt="" 
            className='w-[15vw] h-[33vh] contact-1 object-cover absolute left-20 -top-3'/>
          <img src="/img/contact-2.webp" alt="" 
            className='w-[15vw] h-[33vh] contact-3 object-cover absolute left-20 -bottom-5'/>
        </div>
      </div>
      

      <img src="/img/swordman-partial.webp" alt="" 
        className='w-[25vw] h-[70vh] scale-[1.3] contact-2 object-cover absolute right-4 top-[33px] z-60'/>
    </div>
  )
}

export default Contact