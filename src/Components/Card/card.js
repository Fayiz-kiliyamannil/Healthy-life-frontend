import React from 'react'
import { Link } from 'react-router-dom';



function card(props) {
  return (
    <>
      <div className="mx-auto max-w-2xl px-3 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-[#898989] text-xs text-center font-sans">FEATURES</h1>
        <h1 className="text-[#898989] text-4xl text-center font-sans font-bold">{props.tittle}</h1>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {props.product.map((obj, index) => (
            <div key={index} className="group">
              <div className="overflow-hidden rounded-md lg:h-80" style={{ background: `url(${obj.image})`, backgroundSize: 'cover' }}>
                <div className=" h-5.6  p-3 mt-[70%] botton-0 bg-gradient-to-b from-transparent via-rgba(37, 37, 37,) to-black">
                  <h1 className="text-5xl  font-bold font-sans text-white">{obj.progress}</h1>
                  <h6 className="text-md mb-7 font-sans text-gray-300">{obj.pros}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default card