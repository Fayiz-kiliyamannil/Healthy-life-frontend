import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function TrainerChatpage(props) {

    const [userInfo, setUserInfo] = useState(undefined);
    const dispatch = useDispatch()


    const handleSearch = (e) => {
        dispatch(showLoading());
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            props.searchData(props.searchValue);

            dispatch(hideLoading());
        } else {
            const updatedUser = props.searchValue.filter((item) => {
                return item.firstname.toLowerCase().includes(searchTerm);
            });
            props.searchData(updatedUser);

            dispatch(hideLoading());
        }
    };

    return (
        <>
            <div>
                <div className=" md:container mx-auto">
                    <div className="py-6  ">
                        <div className="flex h-[500px] border border-gray-400 xl:h-[650px] mx-auto bg-gray-700 rounded-lg shadow-lg ">
                            <div className="w-1/3 flex flex-col">
                                <div className=" pt-2 px-2 ">

                                    <input type="text" className="w-full px-2 py-2 rounded-lg text-sm" onChange={handleSearch} placeholder="Search or start new chat" />

                                </div>
                                <div className="bg-grey-lighter mt-4 flex-1 overflow-auto">

                                    {
                                        props.data?.map((obj) => (
                                            <Link key={obj._id} to={obj._id} onClick={() => setUserInfo(obj)}  >
                                                <div className="bg-gray-200 border border-gray-400 rounded px-3 flex items-center hover:bg-gray-300 cursor-pointer">
                                                    <div>
                                                        <img className="h-12 w-12 rounded-full"
                                                            src={`http://127.0.0.1:5001/image/${obj.profile}`} alt='profile' />
                                                    </div>
                                                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                        <div className="flex items-bottom justify-between">
                                                            <p className="text-grey-darkest">
                                                                {obj.firstname} {obj.lastname}
                                                            </p>
                                                            <p className="text-xs text-grey-darkest">
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                            {
                                userInfo ? (
                                    <div className="w-2/3  border rounded-md border-gray-400 flex flex-col">

                                        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="w-10 h-10 rounded-full"
                                                        src={`http://127.0.0.1:5001/image/${userInfo.profile}`} alt='userProfile' />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-white">
                                                        {userInfo.firstname} {userInfo.lastname}
                                                    </p>
                                                    <p className="text-gray-300 text-xs ">
                                                        {userInfo.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link to={`/trainer/videocall/${userInfo._id}`} className='mr-3' >
                                                <svg class="w-6 h-6 text-gray-500 text-gray-400  hover:dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                                    <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                                                </svg>

                                            </Link >
                                            {/* ----------------------------------------------------------------------video button */}
                                        </div>

                                        <div className="flex-1 overflow-auto " style={{ backgroundColor: '#DAD3CC' }} >
                                            <div className="py-2 px-3">

                                                <div className="flex justify-center mb-4">
                                                    <div className="rounded py-2 px-4" style={{ backgroundColor: '#FCF4CB' }} >
                                                        <p className="text-xs">
                                                            Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                                        </p>
                                                    </div>
                                                </div>


                                                {
                                                    props.chatInfo?.map((obj, index) => (
                                                        obj.sender === 'trainer' ? (
                                                            <div key={obj._id} className="flex justify-end mb-2">
                                                                <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                                    <p className="text-sm w-64 mt-1">
                                                                        {obj.text}
                                                                    </p>
                                                                    <p className="text-right text-[10px] text-grey-dark mt-1">
                                                                        {obj.time}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div key={obj._id} className="flex mb-2">
                                                                <div className="rounded-lg py-2  px-3" style={{ backgroundColor: '#F2F2F2' }} >
                                                                    <p className="text-sm  text-purple-700 ">
                                                                        {obj.userId.firstname} {obj.userId.lastname}
                                                                    </p>
                                                                    <p className="text-sm w-64 mt-1">
                                                                        {obj.text}
                                                                    </p>
                                                                    <p className="text-right text-[10px] text-grey-dark mt-1">
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
                                            <div className="bg-grey-lighter px-4 py-4 flex items-center">
                                                <div className="flex-1 mx-4">
                                                    <input className="w-full border pl-4 rounded-full px-2 py-2" value={props.text} onChange={(e) => props.setText(e.target.value)} type="text" />
                                                </div>
                                                <button type="submit" className=" text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-2.5  py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>
                                                </button>

                                            </div>
                                        </form>
                                    </div>



                                ) : (
                                    <div className="w-2/3  border rounded-md border-gray-400 flex mx-auto   flex-col">
                                        <div className=' m-auto  text-lg text-gray-300 ' >
                                            NO MESSAGE
                                        </div>
                                    </div>
                                )
                            }


                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default TrainerChatpage