
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'


function Profile() {

    const [userData, setUserData] = useState([]);
    const [image,setImage] = useState(null)
    const dispatch = useDispatch();

    const getProfile = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/user/profile', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response.data.success) {
                setUserData(response.data.user);
                setImage(response.data.user.profile)
                dispatch(hideLoading());
                console.log(image,'ddd');
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <>
            <Navbar />
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
                                    <h1 className="text-xl text-white  font-bold">{userData.firstname}.{userData.lastname}</h1>
                                    <p className="text-gray-400">{userData.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4  sm:col-span-9">
                            <div className="bg-[#202123] h-200px shadow   rounded-lg p-6">
                                <h2 className="text-xl font-bold text-white  mb-4">About Me</h2>
                                <p className="text-gray-100 b ">
                                    {userData.about ? userData.about : 'Write something about you here..'}
                                </p>
                                <h2 className="text-xl border-b p-3 border-gray-700  text-white  font-bold  ml- mt-4 mb-4">Basic information</h2>
                                <div class="grid gap-6 p-3  md:grid-cols-2">
                                    <div>
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                        <p class="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  dark:">{userData.phone ? userData.phone : 'phone'}</p>
                                    </div>
                                    <div>
                                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                        <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">{userData.gender ? userData.gender : 'gender'}</p>
                                    </div>
                                    <div>
                                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (cm) </label>
                                        <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">{userData.height ? userData.height : 'height'}   </p>
                                    </div>
                                    <div>
                                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weigh (kg) </label>
                                        <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">{userData.weight ? userData.weight : 'weight'}</p>
                                    </div>
                                    <div>
                                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                        <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700   dark:placeholder-gray-400 dark:text-white  "> {userData.age ? userData.age : 'age'} </p>
                                    </div>
                                    <div>
                                        <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name of Trainer  </label>
                                        <p class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ">{userData.trainer ? userData.trainer : 'trainer'}</p>
                                        <div className=" justify-end flex mt-4  flex-wrap gap-4 ">

                                            <Link to={`edit/${userData._id}`} >
                                                <a

                                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                                                >

                                                    Edit
                                                </a>



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
    )
}

export default Profile