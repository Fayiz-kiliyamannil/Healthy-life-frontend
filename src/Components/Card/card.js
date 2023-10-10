import React from 'react'




function card(props) {
console.log(props);
  return (
 <>
 <div className="mx-auto max-w-2xl px-3 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <h1 className="text-[#898989] text-sm text-center font-sans">Pro</h1>
  <h1 className="text-[#898989] text-4xl text-center font-sans font-bold">{props.tittle}</h1>
  <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {props.product.map((obj, index) => (
      <div key={index} className="group">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative ">
          <img src={obj.image} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          <div className="absolute bottom-0 left-0 right-0 p-4 h-5.6 bg-gradient-to-b from-transparent via-rgba(37, 37, 37,) to-black">
            <h1 className="text-5xl  p-2 font-bold text-white">{obj.progress}</h1>
            <h6 className="text-lg  text-gray-300">{obj.pros}</h6>
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