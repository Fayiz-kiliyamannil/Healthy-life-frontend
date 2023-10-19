import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { hideLoading, showLoading } from '../../Redux/alertSlice';




function Tab(props) {
    const dispatch = useDispatch();


    const handleSearch = (e) => {
        dispatch(showLoading());
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            // setUser(originalUser);
            props.searchData(props.searchValue)
            dispatch(hideLoading())
        } else {
            const updatedUser = props.searchValue.filter((item) => {
                return item.name.toLowerCase().includes(searchTerm);
            });
            props.searchData(updatedUser)
            dispatch(hideLoading());
        }
    };




    return (
        <>
            <div className="text-sm font-medium text-center text-gray-500  dark:text-gray-400 dark:border-gray-700 flex items-center justify-between">

                {
                    (props.trainer) ? (
                        <ul className="flex flex-wrap -mb-px">
                            <li className="mr-2">
                                <h6 className="inline-block p-4 text-md border-transparent text-white">Trainers</h6>
                            </li>
                            <li className="mr-2">
                                <NavLink to='/admin/trainers' >
                                    <a className={`inline-block p-4 border-b-2 border-transparent ${props.all ? 'border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'active:text-red rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}  `}>All</a>
                                </NavLink>
                            </li>
                            <li className="mr-2">
                                <NavLink to='/admin/newtrainers ' >
                                    <a className={`inline-block p-4 border-b-2 border-transparent ${props.new ? 'border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'active:text-red rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}  `}>New</a>
                                </NavLink>
                            </li>
                        </ul>

                    ) :
                        (props.trainees) ? (
                            <ul className="flex flex-wrap -mb-px">
                                <li className="mr-2">
                                    <h6 className="inline-block p-4 text-md border-transparent text-white">Trainees</h6>
                                </li>
                                <li className="mr-2">
                                    <NavLink to='/admin/trainees' >
                                        <a className={`inline-block p-4 border-b-2 border-transparent ${props.all ? 'border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'active:text-red rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}  `}>All</a>
                                    </NavLink>
                                </li>
                                <li className="mr-2">
                                    <NavLink to='/admin/trainees/pro ' >
                                        <a className={`inline-block p-4 border-b-2 border-transparent ${props.pro ? 'border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'active:text-red rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}  `}>New</a>
                                    </NavLink>
                                </li>
                            </ul>

                        ) : (props.upload) ? (
                            <nav  className="flex flex-wrap ">
                               
                                    <h6 className="inline-block p-4 text-md border-transparent text-white">Upload</h6>
                
                                    <NavLink 
                                        to="blog"
                                        className={`inline-block p-4 border-b-2 border-transparent ${props.blog ? 'border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'active:text-red rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}  `}
                                    >
                                        Blog
                                    </NavLink>
                               
                                    <NavLink to='video'
                                       className={`inline-block p-4 border-b-2 border-transparent ${props.video ? 'border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'active:text-red rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}  `}>Video
                                    </NavLink>
                                
                            </nav>

                        ) : ''

                }
                {
                    (!props.upload) ?
                        (
                            <div className="flex mr-6">
                                <input onChange={handleSearch}
                                    type="text"
                                    placeholder="Search"
                                    className="p-1  p-2 border-b bg-black border-gray-600  focus:outline-none"
                                />
                                {/* <button className="bg-blue-500 text-white p-2 ml-2 rounded-lg hover:bg-blue-600">
                    Search
                </button> */}
                            </div>
                        ) : ''
                }

            </div>
            <Outlet />
        </>

    );
}

export default Tab;
