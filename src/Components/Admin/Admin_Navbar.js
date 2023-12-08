import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link, useNavigate } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Admin_Navbar(props) {
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', to: 'home', },
    { name: 'Trainees', to: 'trainees' },
    { name: 'Trainers', to: 'trainers' },
    { name: 'Inbox', to: 'inbox' },
  ];

  const logOut = () => {
    localStorage.removeItem('adminToken');
    console.log("log");
    navigate('/admin/login')

  }


  return (

    <>
      <div >
        <div className="min-h-full ">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className=" flex  flex-shrink-0">
                        <img
                          className="h-12 w-16"
                          src="/logo.png"
                          alt="Your Company"
                        />
                        <span className="text-[#fff] mt-3">Healthy-Life</span>
                        <span className="text-gray-400 text-sm mt-3.5">-Admin</span>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.to}
                              className={({ isActive }) =>
                                isActive
                                  ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                                  : 'text-gray-300 hover:bg-gray-700 hover-text-white rounded-md px-3 py-2 text-sm font-medium'
                              }
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                      <button type="button" onClick={logOut} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center me-2 mb-2">logout</button>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item,index) => (
                      <Link key={index} to={item.to} >
                        <Disclosure.Button
                          as="a"
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                    <button onClick={logOut} type="button" className="text-white border border-gray-900  font-medium rounded-lg text-sm px-3 py-1  text-center me-2 mb-2">Logout</button>
                  </div>
             
                  

             
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>

  )
}

export default Admin_Navbar;