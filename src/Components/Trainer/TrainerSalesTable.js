import React, { useEffect, useRef, useState } from 'react'
import trainerApi from '../../Utils/trainer-axio';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast'
import EmptyPage from '../Common/Empty';

function TrainerSalesTable() {

    const componentPdf = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [dateSelector, setDateSelector] = useState('Last 7 days');
    const [salesReport, setSalesReport] = useState([]);
    const selector = (e) => {
        setDateSelector(e.name)
        fetchSalesReport(e.value);
        setIsOpen(!isOpen);
    }

    const fetchSalesReport = async (days) => {
        try {

            const response = await trainerApi.post("/trainer/sales-report", { days })
            if (response.data.success) {
                setSalesReport(response.data.salesReport)
            }

        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        fetchSalesReport(7);
    }, [])

    const generatePdf = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: 'Sales Report',
        onAfterPrint: () => toast.success('PDF Downloaded', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })

    })




    return (

        <>
            <div className='px-4 mt-4 w-full' >
            <div className="bg-gray-900 pt-2 shadow-md rounded-lg">
            <h1 className='text-xl font-medium ml-3 text-gray-100 pb-3'> Sales report</h1>
                <div className="flex  flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-3">

                    <div >
                        <button onClick={() => setIsOpen(!isOpen)} id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex ml-2  items-center text-gray-500 bg-white   border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            {dateSelector}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {
                            isOpen && (
                                <div id="dropdownRadio" className="z-10 ml-3 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ; " data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" >
                                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">

                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input onClick={(e) => selector(e.target)} id="filter-radio-example-1" type="radio" value="0" name="Today" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Today</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input onClick={(e) => selector(e.target)} id="filter-radio-example-2" type="radio" value="7" name="Last 7 days" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input onClick={(e) => selector(e.target)} id="filter-radio-example-3" type="radio" value="30" name="Last 30 days" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input onClick={(e) => selector(e.target)} id="filter-radio-example-5" type="radio" value="365" name="Last year" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }

                    </div>

                    <button type="button" onClick={generatePdf} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-6 text-center me-2 ">Download</button>


                </div>
                <div ref={componentPdf} style={{ width: '100%' }} >
                <div className='h-[500px] bg-gray-800  rounded-b-lg overflow-auto ' >
                <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    No.of Month
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trainer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                (salesReport.length <= 0 && (

                                    <tr className="   h-32 dark:bg-gray-800 dark:border-gray-700 " >
                                        <th> </th>
                                        <th> </th>
                                        <th className='text-right ' > Empty..!</th>
                                        <th>  </th>
                                        <th> </th>
                                        <th> </th>
                                    </tr>

                                ))
                            }

                            {
                                salesReport.map((obj) => (
                                    <tr key={obj._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {obj.userId.firstname} {obj.userId.lastname}
                                        </th>
                                        <td className="px-6 py-4">
                                            {obj.noOfMonth}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.trainerId.firstname} {obj.trainerId.lastname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.proStartIn.slice(0, 15)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {obj.proEndIn.slice(0, 15)}
                                        </td>
                                        <td className="px-6 py-4">
                                            &#8377; {obj.price}
                                        </td>
                                    </tr>
                                ))
                            }



                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>

        </>

    )
}

export default TrainerSalesTable