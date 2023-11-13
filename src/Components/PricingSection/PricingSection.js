import React from 'react';
import clientApi from '../../Utils/axios-utils'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'

function PricingSection() {
    const navigate = useNavigate();
    const showRazorpay = (order) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';

        script.onload = async function () {
            if (!localStorage.getItem('token')) {
                return navigate('/login')
            }
            const response = await clientApi.post('/user/payment', { order: order })
            if (response.data.success) {
                const { amount, order_id } = response.data
                var options = {
                    key: "rzp_test_qrlDJ1Oj1jxh4U",
                    amount: amount * 100, // Ensure 'price' is a valid integer representing the amount
                    currency: "INR",
                    name: "Healthy-Life", //your business name
                    description: "Test Transaction",
                    image: "/logo.png",
                    order_id: undefined, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    handler: async function (response) {
                           await  clientApi.post('/user/payment-success',{order_id:order_id})
                    },
                    prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                        name: "Gaurav Kumar", //your customer's name
                        email: "gaurav.kumar@example.com",
                        contact: "9000090000"  //Provide the customer's phone number for better conversion rates 
                    }
                };
            } else {

                toast.error(response.data.message,
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }

            var paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };

        document.body.appendChild(script);
    };





    const pricing = [
        { id: 1, month: 'One', price: 3999 },
        { id: 2, month: 'Two', price: 5999 },
        { id: 3, month: 'Three', price: 9999 }
    ]


    return (
        <>
            <div className=" mx-auto max-w-screen-xl border border-gray-500 rounded-lg lg:py-16 lg:px-6">
                <div className="mx-auto   max-w-screen-md  text-center mb-8 lg:mb-6">
                    <h1 className='text-[#898989] text-sm text-center font-sans '>Pro</h1>
                    <h1 className='text-[#898989] pb-2 mx-10 border-b border-gray-700  text-4xl text-center font-sans font-bold '>Choose your Healthy-Life Pro</h1>
                </div>
                <div className="  space-y-8  lg:grid pt-5 lg:grid-cols-3 mx-10 sm:gap-6 xl:gap-20 lg:space-y-0 ">

                    {
                        pricing.map(obj => (
                            <div className="flex flex-col p-6 mx-auto max-w-md text-center rounded-lg border border-gray-100 hover:scale-105  transition-transform duration-500  dark:border-gray-700 xl:p-8 bg-zinc-900 dark:text-white">
                                {/* <h3 className="mb-4 text-2xl font-semibold">Pro for {obj.month} /h3> */}
                                <p className="font-light text-gray-500 sm:text-md dark:text-gray-400">Best option for personal</p>

                                <div className="flex justify-center  items-baseline mt-7 ">
                                    <span className="mr-2 text-5xl font-medium"> ₹ {obj.price} </span>
                                    <span className="text-gray-500 text-4xl dark:text-gray-400">/-</span>
                                </div>
                                <p className="font-medium mb-7 ml-32 mt-2 text-gray-500 sm:text-md dark:text-gray-400">
                                    For <span className="text-red-700 ">{obj.month}</span>  Month</p>


                                <ul className="mb-8 space-y-4 text-left" >
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>1 Pro Coaches</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>Unlimited Consultation Video Call & Chat</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span>  <span className="font-semibold">Personalised Diet & Workout Plans</span></span>
                                    </li>
                                    <li className="flex items-center space-x-3">

                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><span className="font-semibold">Smart Scale</span></span>
                                    </li>

                                </ul>
                                <button onClick={() => showRazorpay(obj)} className="text-white bg-[#FA2A55]  hover:bg-white hover:text-black focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">buy</button>
                            </div>

                        ))
                    }

                </div>
            </div>

        </>



    );
}

export default PricingSection;
