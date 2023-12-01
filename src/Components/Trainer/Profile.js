import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Profile(props) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };



  const handleDietPlan = (e) => {
    const { name, value } = e.target
    props.setData({ ...props.data, [name]: value});
  }


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
                      src={props.data.profile}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="User Avatar"
                    />
                  ) : (
                    <img
                      src="/empty.jpg"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="img"
                    />
                  )}
                  <h1 className="text-xl text-white  font-bold">
                    {props.data.firstname} {props.data.lastname}
                  </h1>
                  <p className="text-gray-400">{props.data.email}</p>

                  {props.trainer ?
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
                  ):(<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">0 ratings</p>):''
                 }

                </div>
              </div>
            </div>
            <div className="col-span-4  sm:col-span-9">
              <div className="bg-[#202123] h-200px shadow  rounded-lg p-6">
                <div className="text-lg font-medium  text-white mb-4 flex items-center justify-between">
                  About Me
                  {
                    ! props.trainer ? (
                      <div className="relative">
                        <button
                          className=" border-b  text-gray-400 hover:text-gray-100 mr-2 "
                          onClick={openForm}
                        >
                          Diet plan
                        </button>

                        {isFormOpen && (
                          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-30">
                            <div className="bg-[#121111]   px- p-4 rounded-lg">
                              <button
                                className="text-gray-500     hover:text-gray-700"
                                onClick={closeForm}
                              >
                                <svg className="w-5  h-5 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                              </button>
                              <h2 className="text-2xl text-center mb-6  font-semibold text-gray-400 ">NutriFit Tracker</h2>
                              <form  onSubmit={props.submitDietPlan} >

                                <div className="grid   sm:grid-cols-3   mx-6  md:gap-6">
                                  <div className="relative z-0 w-full mb-6  group">
                                    <input type="text" name="targetWeight"  value={props.data.targetWeight}   onChange={handleDietPlan} id="targetWeight" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer" />
                                    <label htmlFor="targetWeight" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Target Weight</label>
                                  </div>
                                  <div className="relative z-0 w-full mb-6   group">
                                  <input type="text" name="dailyCaloriegoal" value={props.data.dailyCaloriegoal}  onChange={handleDietPlan} id="dailyCaloriegoal" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer" />
                                    <label htmlFor="dailyCaloriegoal" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Daily Calorie Goal</label>
                                  </div>
                                  <div className="relative z-0 w-full mb-6  group">
                                    <input type="text" name="proteinIntake"  value={props.data.proteinIntake}  onChange={handleDietPlan}  id="proteinIntake" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="proteinIntake" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Protein Intake</label>
                                  </div>
                                </div>

                                <div className="grid  sm:grid-cols-3 mx-6  md:gap-6">
                                  <div className="relative z-0 w-full mb-6  group">
                                    <input type="text" name="waterIntake" id="waterIntake" value={props.data.waterIntake}  onChange={handleDietPlan} className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="waterIntake" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Water Intake</label>
                                  </div>
                                  <div className="relative z-0 w-full mb-6   group">
                                  <input type="text" name="carbohydrateAndTatintake" value={props.data.carbohydrateAndTatintake}  onChange={handleDietPlan} id="carbohydrateAndTatintake" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="carbohydrateAndTatintake" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Carbo & Fat Intake</label>
                                  </div>
                                  <div className="relative z-0 w-full mb-6   group">
                                    <input type="text" name="mealPlanCreation" value={props.data.mealPlanCreation}  onChange={handleDietPlan} id="mealPlanCreation" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="mealPlanCreation" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Meal Plan Creation</label>
                                  </div>
                                </div>

                                <div className="grid sm:grid-cols-3 mx-6   md:gap-6">
                                  <div className="relative z-0 w-full mb-6  group">
                                    <input type="text" name="dietaryGoals" id="dietaryGoals" value={props.data.dietaryGoals}  onChange={handleDietPlan} className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="dietaryGoals" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Dietary Goals</label>
                                  </div>
                                  <div className="relative z-0 w-full mb-6  group">
                                  <input type="text" name="nutritionalAnalysis" value={props.data.nutritionalAnalysis}  onChange={handleDietPlan} id="nutritionalAnalysis" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="nutritionalAnalysis" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Nutritional Analysis</label>
                                  </div>
                                  <div className="relative z-0 w-full mb-6  group">
                                    <input type="text" name="supplementTracking"  value={props.data.supplementTracking} onChange={handleDietPlan} id="supplementTracking" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer"  />
                                    <label htmlFor="supplementTracking" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Supplement Tracking</label>
                                  </div>
                                </div>
                                <div className="text-center  ">
                                  <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white w- font-semibold py-2 px-4 rounded-full"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : ''
                  }

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
                  {props.trainer ? (
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
                  ) : (
                    <div>
                      <label
                        htmlFor="visitors"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Name of Trainer{" "}
                      </label>
                      <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
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
