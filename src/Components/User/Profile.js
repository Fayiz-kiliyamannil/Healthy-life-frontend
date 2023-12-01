import React from "react";


function Profile(props) {


  return (
    <>
      <div className="mt-20">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-[#202123] shadow rounded-lg p-6">
                <div className="flex   flex-col items-center">
                  {props.data.profile ? (
                    <img
                      src={props.data.profile}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="User Avatar"
                    />
                  ) : (
                    <img
                      src="/empty.jpg"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt=""
                    />
                  )}
                  <h1 className="text-xl text-white  font-bold">
                    {props.data.firstname} {props.data.lastname}
                  </h1>
                  <span className="text-sm my-1 text-gray-400  font-medium">
                     ({props.data.specilized} )
                  </span>
                  <p className="text-gray-300 font-medium "> Mail : <span className="text-sm my-1 text-gray-400  font-medium">
                  {props.data.email}
                  </span> </p>
   
                 {
                  props.rating ? (
                    <div className="flex mt-3 items-center">
                   
                    <div className="flex">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <label key={value} className="flex items-center mr-1">
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={value}
                                      checked={props.rating === value}
                                      className="hidden"
                                    />
                                    <span className="cursor-pointer text-md" role="img" aria-label="star">
                                      {props.rating >= value ? '⭐' : '☆'}
                                    </span>
                                  </label>
                                ))}
                              </div>
  
                      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{props.noOfRating}</p>
                      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400"> ratings</p>
                    </div>
                  ):(<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">0 ratings</p>)
                 }
                </div>

              </div>
            </div>
            <div className="col-span-4  sm:col-span-9">
              <div className="bg-[#202123] h-200px shadow  rounded-lg p-6">
                <div className="text-lg font-medium  text-white mb-4 flex items-center justify-between">
                  About Me

                </div>
                {props.data.about ? (
                  <p className="text-gray-400 text-sm  ">
                    {" "}
                    {props.data.about}{" "}
                  </p>
                ) : (
                  <p className="text-gray-500  text-sm  ">
                    Write something about you here..
                  </p>
                )}
                <h2 className="text-xl border-b p-3 border-gray-700  text-white  font-bold  ml- mt-4 mb-4">
                  Basic information
                </h2>
                <div className="grid gap-6 p-3   md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <p className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  dark:">
                      {props.data.phone ? props.data.phone : "phone"}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.gender ? props.data.gender : "gender"}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Height (cm){" "}
                    </label>
                    <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.height ? props.data.height : "height"}{" "}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Weigh (kg){" "}
                    </label>
                    <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.weight ? props.data.weight : "weight"}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age
                    </label>
                    <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700   dark:placeholder-gray-400 dark:text-white  ">
                      {" "}
                      {props.data.age ? props.data.age : "age"}{" "}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="visitors"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Trainer Specialization{" "}
                    </label>
                    <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.specilized
                        ? props.data.specilized
                        : "eg : yoga instructor "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
