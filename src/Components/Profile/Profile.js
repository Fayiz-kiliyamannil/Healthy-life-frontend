import React from "react";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <>
      <div className="mt-20">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-[#202123] shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  {props.data.profile ? (
                    <img
                      src={`http://127.0.0.1:5001/profileImage/${props.data.profile}`}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="User Avatar"
                    />
                  ) : (
                    <img
                      src="/empty.jpg"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    />
                  )}
                  <h1 className="text-xl text-white  font-bold">
                    {props.data.firstname}.{props.data.lastname}
                  </h1>
                  <p className="text-gray-400">{props.data.email}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4  sm:col-span-9">
              <div className="bg-[#202123] h-200px shadow   rounded-lg p-6">
                <h2 className="text-xl font-bold text-white  mb-4">About Me</h2>
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
                <div class="grid gap-6 p-3  md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <p class="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  dark:">
                      {props.data.phone ? props.data.phone : "phone"}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.gender ? props.data.gender : "gender"}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Height (cm){" "}
                    </label>
                    <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.height ? props.data.height : "height"}{" "}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Weigh (kg){" "}
                    </label>
                    <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {props.data.weight ? props.data.weight : "weight"}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age
                    </label>
                    <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700   dark:placeholder-gray-400 dark:text-white  ">
                      {" "}
                      {props.data.age ? props.data.age : "age"}{" "}
                    </p>
                  </div>
                  {props.trainer ? (
                    <div>
                      <label
                        htmlFor="visitors"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Trainer Specialization{" "}
                      </label>
                      <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                        {props.data.specilized
                          ? props.data.specilized
                          : "eg : yoga instructor "}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="visitors"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Name of Trainer{" "}
                      </label>
                      <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                        {props.data.trainer
                          ? props.data.trainer.firstname
                          : "trainer"}{" "}
                        {props.data.trainer ? props.data.trainer.lastname : ""}{" "}
                        ({" "}
                        {props.data.trainer
                          ? props.data.trainer.specilized
                          : ""}{" "}
                        )
                      </p>
                    </div>
                  )}
                  <div className="  flex mt-4  flex-wrap gap-4 ">
                    {props.edit ? (
                      <Link
                        to={`edit/${props.data._id}`}
                        className="bg-blue-500 px-6 hover:bg-blue-600 text-white py-2  rounded-lg"
                      >
                        Edit
                      </Link>
                    ) : (
                      ""
                    )}

                    {props.admin ? (

                      props.data.is_block ? (
                        <a
                          onClick={() => props.action(props.data._id)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover-bg-green-700 dark:focus:ring-blue-800"
                        >
                          unBlock
                        </a>

                      ) : (

                        <a
                          onClick={() => props.action(props.data._id)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-md focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                        >
                          Block
                        </a>
                      )
                    ) : props.confirm ? (
                      <a
                      onClick={() => props.confirm(props.data._id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                      Confirm
                  </a>
                    ): ''
                    }
                   {
                    props.delete ? (
                      <a onClick={()=>props.delete(props.data._id)} className="inline-flex ml-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#FA2A55] rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-red-700 dark:focus:ring-red-800">
                      Delete

                  </a>
                    ):''
                   }
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
