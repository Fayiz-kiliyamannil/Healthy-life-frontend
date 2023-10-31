import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import toast from 'react-hot-toast';
import trainerApi from '../../Utils/trainer-axio';
function TrainerProfileEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const [formData, setFormData] = useState({ firstname: '', lastname: '', profile: null, specilized: '', phone: '', trainer: '', about: '', gender: '', age: '', weight: '', height: '' });
    const { Id } = useParams();

    const submitChange = async (e) => {
        e.preventDefault();
        const newError = {};
        try {
            if (!formData.firstname.trim()) {
                newError.firstname = 'Name Required'
            }
            if (!formData.specilized.trim()) {
                newError.specilized = "Trainer Specialization Required"
            }
            if (!formData.phone.trim()) {
                newError.phone = 'Phone Number Required'
            }

            if (!formData.gender.trim()) {
                newError.gender = 'Select your Gender'
            }

                dispatch(showLoading());
                const response = await axios.post('/trainer/trainer-profile-edit', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                if (response.data.success) {
                    dispatch(hideLoading());
                    toast.success(response.data.message);
                    navigate('/trainer/profile');
                
            }else{
                newError.profile  = (response.data.message)
                dispatch(hideLoading());
            }
            setError(newError);
            setTimeout(() => {
                setError('')
            }, 3000);
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setFormData({ ...formData, profile: file });
    }


    const getTrainer = async () => {
        dispatch(showLoading());
        try {
            const response = await trainerApi.post('/trainer/get-trainer-info', Id)
            if (response.data.success) {
                setFormData(response.data.trainer)
                dispatch(hideLoading());
            }
        } catch (error) {
            dispatch(hideLoading());
            setError(error.message);
            console.error(error);
        }

    }

    useEffect(() => {
        getTrainer();
    }, [])


    return (
        <>
            <div className="col-span-4  p-20 sm:col-span-9">
                <div className="bg-[#202123] h-200px  shadow   rounded-lg p-6">
                    <form onSubmit={submitChange}>
                        <div className="grid gap-6 mb-6 p-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name  </label> 
                                <input type="text" id="firstName" name='firstname' value={formData.firstname} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='first name'  />
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
                                <input type="phone" id="phone" name='phone' maxLength='10' value={formData.phone} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[9-0]"  />
                                <span className="text-xs text-center m text-[#FA2A55]">{error.phone}</span>
                            </div>
                            <div>

                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trainer Specialization</label>
                                <input type="text" id="specilized " name='specilized' value={formData.specilized} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='eg: yoga instructor' />
                                <span className="text-xs text-center m text-[#FA2A55]">{error.specilized}</span>

                            </div>
                            <div>
                                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Me</label>
                                <input type="text" id="last_name" name='about' value={formData.about} onChange={handlechange} maxLength='150' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write some thing" />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="gender" value={formData.gender} name='gender' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <span className="text-xs text-center m text-[#FA2A55]">{error.gender}</span>
                                    <option >Select</option>
                                    <option value="male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                            </div>
                            <div>
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                <input type="number" id="age" value={formData.age} name='age' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age"/>
                            </div>
                            <div>
                                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight (Kg) </label>
                                <input type="number" id="weight" value={formData.weight} name='weight' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="weight"  />
                            </div>
                            <div>
                                <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (Cm) </label>
                                <input type="number" id="height" value={formData.height} name='height' onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="height"/>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 ml-5 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>


                </div>
            </div>

        </>
    )
}

export default TrainerProfileEdit
