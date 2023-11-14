import React from 'react'



function AdminDashboardCard(props) {



  
    return (
        <>
            <div className="grid  grid-cols-2  sm:grid-cols-2 xl:grid-cols-4 flex ">
                <div className=" h-32 bg-gradient-to-r m-2 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                        <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-800 to-yellow-600 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>

                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-200 font-bold uppercase"> Total Users</p>
                            <h4 className="text-xl text-gray-300  font-bold">{props.data.noOfUsers} </h4>
                        </div>
                    </div>

                </div>

                <div className=" h-32  bg-gradient-to-r m-2  from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                        <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-800 to-cyan-600 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
                                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-200 font-bold  uppercase">Total trainer's</p>
                            <h4 className="text-xl text-gray-300 font-bold">{props.data.noOfTrainers}</h4>
                        </div>
                    </div>

                </div>

                <div className=" h-32 bg-gradient-to-r m-2 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                        <div className="relative w-16 h-16 bg-gradient-to-r from-red-800 to-red-600 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-200 font-bold uppercase">Blocked user's</p>
                            <h4 className="text-xl text-gray-300 font-bold">{props.data.blockedUsers}</h4>
                        </div>
                    </div>

                </div>

                <div className=" h-32 bg-gradient-to-r m-2 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                        <div className="relative w-16 h-16 bg-gradient-to-r from-pink-800 to-pink-600 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="m19.848 15.968-4.4-7a1 1 0 0 0-1.6-.131l-2.164 2.448L7.872 4.51A1.028 1.028 0 0 0 6.985 4a1 1 0 0 0-.871.537l-6 11.5A1 1 0 0 0 1 17.5h18a1 1 0 0 0 .847-1.532ZM12.5 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            </svg>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-200  font-bold uppercase">today Sales</p>
                            <h4 className="text-md mb-2 text-gray-300 font-bold">Sales 
                             <span className="text-md text-gray-400 font-bold">
                                : &#8377;{props.data.totalSales}
                            </span>
                            </h4>
                            <h4 className="text-md text-gray-300 font-bold">Profit:
                                <span className="text-md text-gray-400 font-bold">
                                 : &#8377;{props.data.totalProfit}
                                </span>
                            </h4>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AdminDashboardCard