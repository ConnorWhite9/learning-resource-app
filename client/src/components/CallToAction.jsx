import React from 'react';
import {Link} from "react-router-dom";

function CallToAction() {
  return (
    <section className="flex justify-center items-center h-[18.75re,] font-custom text-white">
      <div className='w-[33.75rem] h-[60%] flex flex-col items-center justify-between'>
        <h2 className='font-bold text-5xl text-center'>Start Your Learning Adventure with AI</h2>
        <Link to="/register" className="mt-[3rem]"><button className='font-bold italic text-lg bg-[#1A5BFF] px-4 py-2'>Sign Up</button></Link>
      </div>
    </section>
  )
}

export default CallToAction
