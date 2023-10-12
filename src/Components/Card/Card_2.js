import React from 'react';

function Card_2(props) {
    return (
        <>
            <div className=" grid grid-cols-1 p-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                    props.data.map((obj) => (
                        <div className="max-w-sm bg-white border border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            {
                                (obj.profile) ? <img className="rounded-t-lg" src="/logo.png" alt="" />
                                    : <img className="rounded-t-lg" src="/logo.png" alt="" />
                            }

                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{obj.name}</h5>
                                <p className="mb-2 font-normal  text-gray-700 dark:text-gray-400"> Email: {obj.email}</p>
                                <h6 className="mb-4 font-normal  text-gray-700 dark:text-gray-400"> Phone No: {obj.phone}</h6>

                                {
                                    obj.is_verified ? (
                                        obj.is_block ? (
                                            <a
                                                onClick={() => props.unBlock(obj._id)}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover-bg-green-700 dark:focus:ring-blue-800"
                                            >
                                                unBlock
                                            </a>
                                        ) : (
                                            <a
                                                onClick={() => props.block(obj._id)}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-md focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                                            >
                                                Block
                                            </a>
                                        )
                                    ) : (
                                        <a
                                            onClick={() => props.confirm(obj._id)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Confirm
                                        </a>
                                    )
                                }
                                {
                                  (props.delete) ?    <a onClick={()=>props.delete(obj._id)} className="inline-flex ml-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Delete

                                </a>
                                : ''
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Card_2;
