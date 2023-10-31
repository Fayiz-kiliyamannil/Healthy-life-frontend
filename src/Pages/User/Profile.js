import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import client from "../../Utils/axios-utils";
function Profile() {
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const getProfile = async () => {
    try {
      dispatch(showLoading());
      const response  = await client.post('/user/profile')
      if (response.data.success) {
        setUserData(response.data.user);
        setImage(response.data.user.profile);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="mt-20">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-[#202123] shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={`http://127.0.0.1:5001/profileImage/${image}`}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="User Avatar"
                  />
                  <h1 className="text-xl text-white  font-bold">
                    {userData.firstname}.{userData.lastname}
                  </h1>
                  <p className="text-gray-400">{userData.email}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4  sm:col-span-9">
              <div className="bg-[#202123] h-200px shadow   rounded-lg p-6">
              <div className="text-lg font-medium  text-white mb-4 flex items-center justify-between">
                  About Me
                
                <div className="relative">
                        <button
                          className=" border-b text-gray-400  hover:text-gray-100 mr-2 "
                          onClick={openForm}
                        >
                          Diet Plan
                        </button>

                        {isFormOpen && (
                          <div className=" fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-[#202123] p-4 rounded-lg">
                              <button
                                className="text-gray-500     hover:text-gray-700"
                                onClick={closeForm}
                              >
                                <svg className="w-5  h-5 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                              </button>
                              <h2 className="text-2xl text-center mb-6  font-semibold text-gray-400 ">NutriFit Tracker</h2>
          
                              <div class="grid sm:grid-cols-3 mx-2  md:gap-3">
                                  <div class="relative z-0 w-64  mb-10 group">
                                    <p  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.targetWeight ? (userData.targetWeight):'0' }</p>
                                    <label for="targetweight" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Target Weight</label>
                                  </div>
                                  <div class="relative z-0    mb-10 group">
                                  <p  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.dailyCaloriegoal ? (userData.dailyCaloriegoal):'0' }</p>
                                    <label for="dailycaloriegoal" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Daily Calorie Goal</label>
                                  </div>
                                  <div class="relative z-0 w-full  mb-10 group">
                                    <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.proteinIntake ? (userData.proteinIntake):'0' }</p>
                                    <label for="proteinintake" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Protein Intake</label>
                                  </div>
                                </div>
                                <div class="grid sm:grid-cols-3 mx-2 md:gap-3">
                                  <div class="relative z-0 w-full mb-6 group">
                                    <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.waterIntake ? (userData.waterIntake):'0' }</p>
                                    <label for="waterintake" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Water Intake</label>
                                  </div>
                                  <div class="relative z-0 w-full  mb-10 group">
                                  <p  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.carbohydrateAndTatintake ? (userData.carbohydrateAndTatintake):'0' }</p>
                                    <label for="carbohydrateandtatintake" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Carbo & Fat Intake</label>
                                  </div>
                                  <div class="relative z-0 w-full  mb-10 group">
                                    <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.mealPlanCreation ? (userData.mealPlanCreation):'0' }</p>
                                    <label for="mealplancreation" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Meal Plan Creation</label>
                                  </div>
                                </div>
                                <div class="grid sm:grid-cols-3 mx-2 md:gap-3">
                                  <div class="relative z-0 w-full mb-10 group">
                                    <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.dietaryGoals ? (userData.dietaryGoals):'0' }</p>
                                    <label for="dietarygoals" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Dietary Goals</label>
                                  </div>
                                  <div class="relative z-0 w-full  mb-10 group">
                                  <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.nutritionalAnalysis ? (userData.nutritionalAnalysis):'0' }</p>
                                    <label for="nutritionalanalysis" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Nutritional Analysis</label>
                                  </div>
                                  <div class="relative z-0 w-full  mb-10 group">
                                    <p  className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.supplementTracking ? (userData.supplementTracking):'0' }</p>
                                    <label for="supplementtracking" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Supplement Tracking</label>
                                  </div>
                                </div>
                          
                            </div>
                          </div>
                        )}
                      </div>


                </div>
                <p className="text-gray-100 b ">
                  {userData.about
                    ? userData.about
                    : "Write something about you here.."}
                </p>
                <h2 className="text-xl border-b p-3 border-gray-700  text-white  font-bold  ml- mt-4 mb-4">
                  Basic information
                </h2>
                <div className="grid gap-6 p-3  md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <p className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  dark:">
                      {userData.phone ? userData.phone : "phone"}
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
                      {userData.gender ? userData.gender : "gender"}
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
                      {userData.height ? userData.height : "height"}{" "}
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
                      {userData.weight ? userData.weight : "weight"}
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
                      {userData.age ? userData.age : "age"}{" "}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="visitors"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Name of Trainer{" "}
                    </label>
                    <p className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {userData.trainer
                        ? userData.trainer.firstname
                        : "trainer"}{" "}
                      {userData.trainer ? userData.trainer.lastname : ""} ({" "}
                      {userData.trainer ? userData.trainer.specilized : ""} )
                    </p>
                    <div className=" justify-end flex mt-4  flex-wrap gap-4 ">
                      <Link
                        to={`edit/${userData._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-7 rounded-lg"
                      >
                        Edit
                      </Link>
                    </div>
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
