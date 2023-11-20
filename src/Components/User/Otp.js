import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function Otp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState({ email: '' });
    const [otpStatus, setOtpStatus] = useState('')



    const submitEvent = async (event) => {
        event.preventDefault();
        try {
            dispatch(showLoading())
            const response = await axios.post('/user/otp', { Otp: otp });
            if (response.data.success) {
                setOtpStatus(response.data.message)
                dispatch(hideLoading());
                navigate('/login')
            } else {
                dispatch(hideLoading());
                setOtpStatus(response.data.message);
                setTimeout(() => {
                    setOtpStatus('')
                }, 2000);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("otperro");
        }
    }

    const resend = async (event) => {
        event.preventDefault();
        console.log("resend");
        try {
            dispatch(showLoading());
            const response = await axios.post('/user/register', {});
            if (response.data.success) {
                dispatch(hideLoading());
                setOtpStatus(response.data.message)
                setTimeout(() => {
                    setOtpStatus('')
                }, 2000);
            }

        } catch (error) {
            dispatch(hideLoading())
            console.error("resend error.......");
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[#191919] flex justify-center items-center">
                <div className="">
                    <div className="bg-[] p-7 rounded-md shadow-lg text-center">
                        <h6 className="text-lg text-white">
                            Please enter the one-time password<br />to verify your account 
                        </h6>
                        <div className="mt-1 text-white ">
                            <small className=" text-[#C2C2C2]">A code has been sent to Gmail Account</small>
                        </div>
                        <form onSubmit={submitEvent} >
                            <div className="flex justify-center mt-4  space-y-3">
                                <input
                                    className="text-center text-[#C2C2C2] bg-[#191919]    border-b p-1 border-gray-400 focus:outline-none "
                                    type="otp"
                                    id="firstOtp"
                                    maxLength="6"
                                    value={otp.otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    name="Otp"
                                />
                            </div>
                            <h6 className="text-[#FA2A55] mt-4">{otpStatus}</h6>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    value="submit"
                                    className="px-8 py-2 bg-[#FA2A55] mt-2  text-white rounded hover:bg-red-500  focus:outline-none"
                                >
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4 text-center text-sm text-[#C2C2C2]">
                        <span>Didn't get the code -</span>
                        <button onClick={resend} className=" p-1 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F]">
                            Resend
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otp