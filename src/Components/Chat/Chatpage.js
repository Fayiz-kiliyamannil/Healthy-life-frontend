import React from 'react'

function Chatpage(props) {
    return (
        <>
            <div className=" lg:mx-20  mx-auto">
                <div className=" py-6 ">
                    <div className="flex  rounded shadow-lg h-screen ">
                        <div className="w-full sm:mx-20 border border-gray-700 bg-[#202124] rounded-md mx-auto mt-16  mb-14  flex flex-col">

                            <div className="py-2 px-3 bg-grey-lighter flex  flex-row justify-between items-center">
                                <div className="flex items-center">
                                    <div>
                                        <img className="w-10 h-10 rounded-full" src={`http://127.0.0.1:5001/image/${props.data?.trainer.profile}`} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-white">
                                            {props.data?.trainer.firstname} {props.data?.trainer.lastname} <span className='text-gray-300' >
                                                ({props.data?.trainer.specilized})
                                            </span>
                                        </p>
                                        <p className="text-gray-200 text-xs mt-1">
                                            {props.data?.trainer.email}
                                        </p>
                                    </div>
                                </div>
                                <button className='mr-3' >
                                    <svg class="w-6 h-6 text-gray-500 text-gray-400  hover:dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                                    </svg>

                                </button>

                                {/* HERE-------------------------------------------------- PLAN TO PUT BUTTON FROM VIDEO  CALL */}
                            </div>


                            <div className="flex-1 bg-cover overflow-auto" style={{ backgroundColor: '#0a1617' }}>
                                <div className="py-2 px-3">


                                    {
                                        props.chatInfo?.map((obj) => (

                                            obj.sender === 'trainer' ? (
                                                <div className="flex mb-2">
                                                    <div className="rounded-lg  py-2 pl-2 pr-8" style={{ backgroundColor: '#F2F2F2' }}>
                                                        <p className="text-xs  text-purple-700 text-orange">
                                                          {obj.trainerId.firstname} {obj.trainerId.lastname}
                                                        </p>
                                                        <p className="text-sm w-64 mt-1">
                                                         {obj.text}
                                                        </p>
                                                        <p className="text-right text-[10px] text-grey-dark mt-1">
                                                           {obj.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end mb-2">
                                                    <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                        <p className="text-sm w-64 mt-1">
                                                            {obj.text}
                                                        </p>
                                                        <p className="text-right text-[10px]  text-grey-dark mt-1">
                                                          {obj.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            )

                                        ))
                                    }







                                </div>
                            </div>

                            <form onSubmit={props.submitChat} >
                                <div className=" pr-5 py-4 flex items-center">
                                    <div className="flex-1 mx-4">
                                        <input className="w-full border border-gray-500 bg-gray-400 pl-4  rounded-full px-2 py-2" value={props.text} onChange={(e) => props.setText(e.target.value)} type="text" />
                                    </div>
                                    <div>
                                        <button type="submit" className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-2.5  py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Chatpage