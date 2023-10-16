import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import Login from '../../Pages/User/Login';


function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams()
    const [trainerInfo, setTrainerInfo] = useState([])

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        profile: null,
        phone: '',
        trainer: '',
        about: '',
        gender: '',
        age: '',
        weight: '',
        height: ''
    }

    )

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile: file })
        console.log(file);
    }

    const submitChange = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading())
            console.log(formData,'-----------------------------------');
            const reponse = await axios.post('/user/user-profile-update-info', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            });
            if (reponse.data.success) {
                dispatch(hideLoading());
                navigate('/profile')
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }


    const profileinfo = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/user/get-user-info', { userId: userId });
            if (response.data.success) {
                setFormData(response.data.user);
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            console.error(error);
        }
    }
    // const fileInput = document.getElementById('file_input')
    // fileInput.value = formData.profile

    const trainerinfo = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/user/get-trainer-info');
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
            <div className="col-span-4  sm:col-span-9">
                <div className="bg-[#202123] h-200px  shadow   rounded-lg p-6">
                    <form onSubmit={submitChange} >
                        <div class="grid gap-6 mb-6 p-5 md:grid-cols-2">
                            <div>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" id="firstName" name='firstname' value={formData.firstname} onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder required />
                            </div>
                            <div>
                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" id="last_name" name='lastname' value={formData.lastname} onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                            </div>
                            <div>

                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                <input  name='profile'   onChange={handleImage} class="block w-full  text-sm text-gray-900 border p-1.5 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-600" id="file_input_help">SVG, PNG, JPG.</p>

                            </div>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input type="phone" id="phone" name='phone' value={formData.phone} onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[9-0]" required />
                            </div>
                            <div>

                                <label for="trainers" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your Trainer </label>
                                <select id="trainers" value={formData.trainer} name='trainer' onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Select</option>

                                    {
                                        trainerInfo.map((obj) => (
                                            <option value={obj.name}>{obj.name}</option>
                                        ))
                                    }


                                </select>

                            </div>
                            <div>
                                <label for="about" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Me</label>
                                <input type="text" id="last_name" name='about' value={formData.about} onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write some thing" required />
                            </div>
                            <div>
                                <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="gender" value={formData.gender} name='gender' onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Select</option>
                                    <option value="male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                            </div>
                            <div>
                                <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                <input type="number" id="age" value={formData.age} name='age' onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                            <div>
                                <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight (Kg) </label>
                                <input type="number" id="weight" value={formData.weight} name='weight' onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                            <div>
                                <label for="height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (Cm) </label>
                                <input type="number" id="height" value={formData.height} name='height' onChange={handlechange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age" required />
                            </div>
                        </div>

                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>


                </div>
            </div>



        </>



    )
}

export default EditProfile