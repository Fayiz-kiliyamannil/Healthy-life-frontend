import React from 'react';
import { NavLink } from 'react-router-dom';
import EmptyPage from '../Common/Empty';

function CardTrainer(props) {

  if(props.data.length <= 0){
    return <EmptyPage/>
  }
  
  return (
    <>
      <div className={`mx-auto   mt-5 py-16 px-5 sm:px-10`}>
        <h2 className="text-lg   border-b border-gray-700 pb-3 font-medium  text-gray-400">{props.tittle}</h2>

        <div className="mt-8 grid grid-cols-1   gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {props.data.map((obj) => (
            <div key={obj._id} className="group border bg-[#15171C] border-gray-900 rounded-lg ">
              <div className="aspect-h-1 aspect-w-1 w-full  overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <NavLink to={ props.home ? 'trainers' : `${obj._id}`} >
                  <img
                    src={obj.profile ? `http://127.0.0.1:5001/image/${obj.profile}` : '/empty.jpg'}
                    alt={obj.profile}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </NavLink>
              </div>
              <div className="mt-4 p-2 flex justify-between">
                <div>
                  <NavLink to={`${obj._id}`} >

                    <h3 className="text-lg text-left font-bold   text-gray-100">
                      {obj.firstname} {obj.lastname}

                    </h3>
                    <h4 className="mt-1 text-sm text-left  text-gray-200">{obj.specilized}</h4>
                    <h4 className="mt-1 text-sm  text-left text-gray-500">{obj.email}</h4>
                  </NavLink>
                </div>
                {
                  props.admin ? (
                  obj.is_block ? (
                      <p className="text-sm mx-2 text-[#FA2A55]  font-medium ">BLOCKED</p>

                    ):''
                  ):(
                    <p className="text-sm font-medium text-gray-300">{obj.gender}</p>
                  )
                }
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardTrainer;
