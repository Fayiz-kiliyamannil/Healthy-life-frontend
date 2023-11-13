import React from 'react'
import SalesGraph from '../../Components/Graph/SalesGraph'
import TransationTable from '../../Components/Tables/TransationTable'
function TrainerHome() {





  return (
    <div>


      <div className="grid  grid-cols-2  sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className=" h-40 bg-gradient-to-r m-4 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-800 to-yellow-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
              </svg>

            </div>
            <div className="text-right">
              <p className="text-sm text-gray-100 font-medium uppercase">Today's Money</p>
              <h4 className="text-xl text-gray-300 font-bold">$53k</h4>
            </div>
          </div>
          <div className="h-px mt-2 bg-gray-600"></div>
          <div className="p-4">
            <p className="text-sm text-green-500 font-bold">+55% than last week</p>
          </div>
        </div>

        <div className=" h-40 bg-gradient-to-r m-4 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-800 to-cyan-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-100 font-medium uppercase">Today's Money</p>
              <h4 className="text-xl text-gray-300 font-bold">$53k</h4>
            </div>
          </div>
          <div className="h-px mt-2 bg-gray-600"></div>
          <div className="p-4">
            <p className="text-sm text-green-500 font-bold">+55% than last week</p>
          </div>
        </div>

        <div className=" h-40 bg-gradient-to-r m-4 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-16 h-16 bg-gradient-to-r from-red-800 to-red-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-100 uppercase">Today's Money</p>
              <h4 className="text-xl text-gray-300 font-bold">$53k</h4>
            </div>
          </div>
          <div className="h-px mt-2 bg-gray-600"></div>
          <div className="p-4">
            <p className="text-sm text-green-500 font-bold">+55% than last week</p>
          </div>
        </div>

        <div className=" h-40 bg-gradient-to-r m-4 from-gray-900 to-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-16 h-16 bg-gradient-to-r from-pink-800 to-pink-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="m19.848 15.968-4.4-7a1 1 0 0 0-1.6-.131l-2.164 2.448L7.872 4.51A1.028 1.028 0 0 0 6.985 4a1 1 0 0 0-.871.537l-6 11.5A1 1 0 0 0 1 17.5h18a1 1 0 0 0 .847-1.532ZM12.5 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-100 uppercase">Today's Money</p>
              <h4 className="text-xl text-gray-300 font-bold">$53k</h4>
            </div>
          </div>
          <div className="h-px mt-2 bg-gray-600"></div>
          <div className="p-4">
            <p className="text-sm text-green-500 font-bold">+55% than last week</p>
          </div>
        </div>
      </div>



      <SalesGraph />
      <TransationTable />

    </div>
  )
}

export default TrainerHome
