


function SpinnerColors() {
  return (
    <>

      <div className="absolute right-1/2 bottom-1/2  h-screen w-screen bg-black bg-opacity-90 flex justify-center items-center  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent   border-solid animate-spin  rounded-full border-[#FA2A55] border-4 w-[40px] h-[40px] "></div>
      </div>


    </>
  );
}

export default SpinnerColors;