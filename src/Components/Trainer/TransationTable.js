import React from 'react'

function TransationTable(props) {
    return (
        <>
            <div className=" px-4 mt-4 rounded-lg w-full shadow-md">
                <div className="flex items-center rounded-lg justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                    <div>
                        <h1 className="text-base text-gray-100 text-xl px-3 mt-2 font-semibold" >
                            Transactions
                        </h1>
                        <h4 className='text-base text-gray-100 text-gray-400 px-3' >
                            This is a list of latest transactions
                        </h4>
                    </div>
                </div>
                <div className="h-[500px] bg-gray-800  rounded-b-lg  overflow-auto"> 
                <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-7 upper-case py-3">
                                Transaction
                            </th>
                            <th scope="col" className="px-6 upper-case py-3">
                                date & time
                            </th>
                            <th scope="col" className="px-6 upper-case py-3">
                                no.of month
                            </th>
                            <th scope="col" className="px-6 upper-case py-3">
                                amount
                            </th>
                            <th scope="col" className="px-6 upper-case py-3">
                                status
                            </th>
                        </tr>
                    </thead>

                    <tbody >
                        {
                            (props.data.length <= 0 && (

                                <tr className="  h-32 dark:bg-gray-800 dark:border-gray-800 " >
                                    <th> </th>
                                    <th> </th>
                                    <th  > Empty..!</th>
                                    <th>  </th>
                                    <th> </th>
                                    <th> </th>
                                </tr>

                            ))
                        }
                    
                      {
                            props.data.map((obj) => (
                                <tr key={obj._id} className="bg-white     border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="  h-10 w-10 rounded-full" src={obj.userId.profile} alt="images" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{obj.userId?.firstname} {obj.userId?.lastname} </div>
                                            <div className="font-normal text-gray-500">{obj.userId?.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {obj.proStartIn}
                                    </td>
                                    <td className="px-6 py-4">
                                        {obj.noOfMonth}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span> {obj.price} </span>
                                    </td>
                                    <td className=" py-4">
                                        {
                                            obj.status === 'Success' ? (
                                                <p className='bg-green-300 w-20 px-1 text-sm  text-center text-gray-800 rounded-full' >{obj.status}</p>
                                            ) : (
                                                <p className='bg-yellow-300 w-20 px-1 text-sm text-center text-gray-800 rounded-full' >{obj.status}</p>
                                            )
                                        }
                                    </td>
                                </tr>


                            ))
                        }
                    
                    </tbody>

                </table>
                </div>
            </div>

        </>
    )
}

export default TransationTable
