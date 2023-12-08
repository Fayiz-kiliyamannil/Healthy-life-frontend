import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import client from "../../Utils/axios-utils";

function Profile() {

  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState(null);
  const [trainerImage, setTrainerImage] = useState(null);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [trainerId, setTrainerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState()


  const handlePopoverToggle = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const getProfile = async () => {
    try {
      dispatch(showLoading());
      const response = await client.post('/user/profile')
      if (response.data.success) {
        setUserData(response.data.user);
        setImage(response.data.user.profile);
        setTrainerImage(response.data.user.trainer.profile);
        setTrainerId(response.data.user.trainer._id);
        setRating(parseInt(response.data.rating.rating));
        setOrder(response.data.order)
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error.message);
    }
  };



  const handleRatingChange = (value) => {
    setRating(value);
  };

  const ratingSubmit = async (event) => {
    event.preventDefault();
    const trainerRating = { rating: rating, trainerId: trainerId };
    setIsLoading(true)
    try {
      const response = await client.post('/user/trainer-rating', { trainerRating })
      if (response.data.success) {
        setRating(parseInt(response.data.trainerRating.rating));
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    } catch (error) {
      console.error(error.message);
      setIsLoading(false)
    }
  };


  useEffect(() => {
    getProfile();
  }, []);


  return (
    <>
      <div className="mt-20 mb-10">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4  sm:col-span-3">
              <div className="bg-[#202123]  rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={image ? image : '/empty.png'}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="User Avatar"
                  />
                  <h1 className="text-xl text-white  font-bold">
                    {userData.firstname} {userData.lastname}
                  </h1>
                  <p className="text-gray-400">{userData.email}</p>
                </div>

                <div className=" h-40 bg-gradient-to-r  mt-5 mb-3  from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
                  <p className="text-md mt-2 ml-2 text-gray-200 mt-3   border-gray-50  text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm  text-center me-2 mb-2  font-medium uppercase">pro</p>
                 
                 {
                  order ? (
                    <div className=" mt-4   mx-4 " >
                    <h4 className="text-sm  text-gray-300 font-medium"> Price :
                      <span className="text-sm  ml-2 text-[#7E3BF2] font-bold">
                        &#8377; {order?.price}
                      </span>
                    </h4>

                    <h4 className="text-sm text-gray-300 mb-2 font-medium"> plan Start In :
                      <span className="text-sm  ml-2 text-green-400 font-bold">
                        {order?.proStartIn.slice(4, 16)}
                      </span>
                    </h4>
                    <h4 className="text-sm text-gray-300 mb-2 font-medium"> Plan End In :
                      <span className="text-sm ml-2  text-red-500 font-bold">
                        {order?.proEndIn.slice(4, 16)}
                      </span>
                    </h4>
                    <h4 className="text-sm text-gray-300 font-medium"> No. of Month :
                      <span className="text-sm ml-2 text-[#7E3BF2] font-bold">
                        {order?.noOfMonth}
                      </span>
                    </h4>
                  </div>
                  ):(
                    <div className=" mt-8 text-red-400 text-center  mx-4 " >
                      No Plan
                      </div>
                  )
                 }
                
                </div>

              </div>
            </div>

            <div className="col-span-4  sm:col-span-9">
              <div className="bg-[#202123] h-200px shadow   rounded-lg p-6">
                <div className="text-lg font-medium  text-white mb-4 flex items-center justify-between">
                  About Me

                  <div className="relative">
                    <button
                      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  text-center me-2 mb-2 "
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
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                          </button>
                          <h2 className="text-2xl text-center mb-6  font-semibold text-gray-400 ">NutriFit Tracker</h2>

                          <div className="grid sm:grid-cols-3 mx-2  md:gap-3">
                            <div className="relative z-0 w-64  mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.targetWeight ? (userData.targetWeight) : '0'}</p>
                              <label htmlFor="targetweight" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Target Weight</label>
                            </div>
                            <div className="relative z-0    mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.dailyCaloriegoal ? (userData.dailyCaloriegoal) : '0'}</p>
                              <label htmlFor="dailycaloriegoal" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Daily Calorie Goal</label>
                            </div>
                            <div className="relative z-0 w-full  mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.proteinIntake ? (userData.proteinIntake) : '0'}</p>
                              <label htmlFor="proteinintake" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Protein Intake</label>
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-3 mx-2 md:gap-3">
                            <div className="relative z-0 w-full mb-6 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.waterIntake ? (userData.waterIntake) : '0'}</p>
                              <label htmlFor="waterintake" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Water Intake</label>
                            </div>
                            <div className="relative z-0 w-full  mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.carbohydrateAndTatintake ? (userData.carbohydrateAndTatintake) : '0'}</p>
                              <label htmlFor="carbohydrateandtatintake" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Carbo & Fat Intake</label>
                            </div>
                            <div className="relative z-0 w-full  mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.mealPlanCreation ? (userData.mealPlanCreation) : '0'}</p>
                              <label htmlFor="mealplancreation" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Meal Plan Creation</label>
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-3 mx-2 md:gap-3">
                            <div className="relative z-0 w-full mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.dietaryGoals ? (userData.dietaryGoals) : '0'}</p>
                              <label htmlFor="dietarygoals" className="peer-focus:font-medium absolute  text-sm  dark:text-gray-400 duration-300 transform -translate-y-6  scale-75 top-3 -z-10 origin-[0] ">Dietary Goals</label>
                            </div>
                            <div className="relative z-0 w-full  mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.nutritionalAnalysis ? (userData.nutritionalAnalysis) : '0'}</p>
                              <label htmlFor="nutritionalanalysis" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Nutritional Analysis</label>
                            </div>
                            <div className="relative z-0 w-full  mb-10 group">
                              <p className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#bf697a] peer">{userData.supplementTracking ? (userData.supplementTracking) : '0'}</p>
                              <label htmlFor="supplementtracking" className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">Supplement Tracking</label>
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
                    <p
                      onMouseEnter={handlePopoverToggle}
                      onMouseLeave={handlePopoverToggle}
                      className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">
                      {userData.trainer
                        ? userData.trainer.firstname
                        : "trainer"}{" "}
                      {userData.trainer ? userData.trainer.lastname : ""} ({" "}
                      {userData.trainer ? userData.trainer.specilized : ""} )
                    </p>

                    {isPopoverVisible && userData.trainer && (
                      <div
                        data-popover
                        id="popover-user-profile"
                        role="tooltip"
                        className="absolute  inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                        onMouseEnter={() => (setPopoverVisible(isPopoverVisible))}
                        onMouseLeave={handlePopoverToggle}
                      >
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">

                            <img
                              className="w-10 h-10 border rounded-full"
                              src={trainerImage}
                              alt="Jese Leos"
                            />
                          </div>
                          <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                            {userData.trainer?.firstname} {userData.trainer?.lastname}
                          </p>
                          <p className="mb-3 text-sm font-normal">
                            <p className="hover:underline">
                              ({userData.trainer?.specilized})
                            </p>
                          </p>


                          <h2 className="text-2xl font-semibold mb-2">Rate this Trainer</h2>
                          <form onSubmit={ratingSubmit}>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex items-center mr-4">
                                  <input
                                    type="radio"
                                    name="rating"
                                    value={value}
                                    checked={rating === value}
                                    onChange={() => handleRatingChange(value)}
                                    className="hidden"
                                  />
                                  <span className="cursor-pointer text-2xl" role="img" aria-label="star">
                                    {rating >= value ? '⭐' : '☆'}
                                  </span>
                                </label>
                              ))}
                            </div>
                            <button type="submit"
                              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2 mt-3 text-center me-2 mb-2"
                            >
                              {isLoading ? (
                                <div className="border-t-transparent   border-solid animate-spin  rounded-full border-[#FA2A55] border-4  mx-10  w-[20px] h-[20px] " >

                                </div>
                              ) : (' Submit Rating')}

                            </button>
                          </form>
                        </div>


                      </div>

                    )}

                    <div className=" justify-end flex mt-4  flex-wrap gap-4 ">
                      <Link
                        to={`edit/${userData._id}`}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
                        focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
