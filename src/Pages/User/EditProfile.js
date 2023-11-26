import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import client from '../../Utils/axios-utils';



function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams()
    const [trainerInfo, setTrainerInfo] = useState([]);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        profile: null,
        about: '',
        gender: '',
        age: '',
        weight: '',
        height: '',
        trainer: {
            firstname: '',
            lastname: '',
            specilized: '',
        },
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile: file })
    }

    const submitChange = async (e) => {
        e.preventDefault();
        const newError = {};
        try {
         
            if (!formData?.firstname?.trim()) {
                newError.firstname = 'Name is Required'
            }
            if (!formData?.gender?.trim()) {
                newError.gender = 'Select the Gender'
            }
            if (!formData.profile) {
                newError.profile = "Photo is Required...";
            }

            if (!formData?.phone?.trim()) {
                newError.phone = 'Phone Number is Required'
            }
            if(!formData.trainer ){
                newError.trainer = ' Please select the Trainer'
            }
            
            setError(newError);

            if (Object.keys(newError).length === 0) {

                dispatch(showLoading())
                const reponse = await axios.post('/user/user-profile-update-info', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (reponse.data.success) {
                    dispatch(hideLoading());
                    navigate('/profile')
                } else {
                    newError.profile = (reponse.data.message)
                    setError(newError);
                    dispatch(hideLoading())
                }
            }
            setTimeout(() => {
                setError('')
            }, 3000);

        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }


    const profileinfo = async () => {
        try {
            dispatch(showLoading());
            const response = await client.post('/user/get-user-info', { userId: userId })
            if (response.data.success) {
                setFormData(response.data.user);
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            console.error(error);
        }
    }



    const trainerinfo = async () => {
        try {
            dispatch(showLoading());
            const response = await client.get('/user/get-trainer-info')
            if (response.data.success) {
                setTrainerInfo(response.data.trainer)
                dispatch(hideLoading())
            }

        } catch (error) {
            dispatch(hideLoading())
            console.error(error);
        }
    }


    useEffect(() => {
        profileinfo()
        trainerinfo()
    }, [])

    return (
        <>
            <div className="col-span-4 mt-20 md:px-20  sm:col-span-9">
                <div className="bg-[#202123] h-200px  shadow   rounded-lg p-6">
                    <form onSubmit={submitChange} encType="multipart/form-data">
                        <div className="grid gap-6 mb-6 p-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" id="firstName" name='firstname' value={formData?.firstname} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                                <span className="text-xs text-center m text-[#FA2A55]">{error.firstname}</span>
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" id="last_name" name='lastname' value={formData.lastname} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='last name' />
                            </div>
                            <div>

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                <input name='profile' onChange={handleImage} className="block w-full  text-sm text-gray-900 border p-1.5 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-600" id="file_input_help">SVG, PNG, JPG.</p>
                                <span className="text-xs text-center m text-[#FA2A55]">{error.profile}</span>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input type="phone" id="phone" name='phone' maxLength={10} value={formData.phone} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[9-0]" />
                                <span className="text-xs text-center m text-[#FA2A55]">{error.phone}</span>
                            </div>
                            <div>

                                <label htmlFor="trainers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your Trainer </label>
                                <select id="trainers" name='trainer' value={formData.trainer ? formData.trainer.firstname : ''} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    <option>Select</option>

                                    {
                                        trainerInfo.map((obj) => (
                                            <option key={obj._id} value={obj.firstname}  >{obj.firstname} {obj.lastname} ( {obj.specilized} )</option>
                                        ))
                                    }
                                </select>
                                <span className="text-xs text-center m text-[#FA2A55]">{error.trainer}</span>
                            </div>
                            <div>
                                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Me</label>
                                <input type="text" id="last_name" name='about' value={formData.about} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write some thing" />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="gender" value={formData.gender} name='gender' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    <option >Select</option>
                                    <option value="male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                                <span className="text-xs text-center m text-[#FA2A55]">{error.gender}</span>
                            </div>
                            <div>
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                <input type="number" id="age" value={formData.age} name='age' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />

                            </div>
                            <div>
                                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight (Kg) </label>
                                <input type="number" id="weight" value={formData.weight} name='weight' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                            </div>
                            <div>
                                <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (Cm) </label>
                                <input type="number" id="height" value={formData.height} name='height' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age" />
                            </div>
                        </div>
                        <button type="submit" className="text-white ml-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center  mb-2">Submit</button>

                    </form>


                </div>
            </div>
        </>
    )
}

export default EditProfile