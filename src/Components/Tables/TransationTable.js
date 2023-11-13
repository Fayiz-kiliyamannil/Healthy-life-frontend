import React from 'react'

function TransationTable() {
    return (
        <>
            <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                    <div>
                        <h1 className="text-base text-gray-100 text-xl px-3 mt-2  font-semibold" >
                            Transactions
                        </h1>
                        <h4 className='text-base text-gray-100  text-gray-400 px-3' >
                            This is a list of latest transactions
                        </h4>
                    </div>
                    {/* <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div> */}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        
                            <th scope="col" class="px-7 upper-case py-3">
                                Transaction
                            </th>
                            <th scope="col" class="px-6 upper-case py-3">
                                date & time
                            </th>
                            <th scope="col" class="px-6 upper-case py-3">
                               no.of month
                            </th>
                            <th scope="col" class="px-6 upper-case py-3">
                                amount
                            </th>
                            <th scope="col" class="px-6 upper-case py-3">
                                status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                 <span> 400 </span>
                            </td>
                            <td className=" py-4">
                            <p className='bg-green-300 w-20 px-1 text-sm  text-gray-800 rounded-full' >Completed</p>
                            </td>
                        </tr>


                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                         
                            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Bonnie Green</div>
                                    <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Designer
                            </td>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                 <span> 400 </span>
                            </td>
                            <td className=" py-4">
                            <p className='bg-red-400 w-20 px-1 text-sm  text-gray-900 rounded-full' >Cancelled</p>
                            </td>
                        </tr>


                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        
                            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Jese Leos</div>
                                    <div className="font-normal text-gray-500">jese@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Vue JS Developer
                            </td>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6  py-4">
                                 <span> 400 </span>
                            </td>
                            <td className="py-4">
                               <p className='bg-yellow-300 w-20 px-1 text-sm  text-gray-800 rounded-full' >Processing</p>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </>
    )
}

export default TransationTable
