import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dialog,  Popover,  } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,} from '@heroicons/react/24/outline'
import {  useNavigate, NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import { useDispatch } from 'react-redux'



function classNames(...classes) {
     return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const dispatch = useDispatch()
    const [userId,setuserId] = useState([])
     const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [log, setLog] = useState(Boolean);


    const getData = async () => {
        try {
          const response = await axios.post('/user/get-user-into-by-id', {}, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          if(response.data.success){
          setuserId(response.data.data)
          }else{
            if(response.data.message === 'user blocked'){
                logOut();
            }
          }
        } catch (error) {
          console.error(error); 
        }
      }
    

    const logOut = () => {
        dispatch(showLoading())
        localStorage.removeItem('token');
        navigate('/login')
        setTimeout(() => {
           window.location.reload();
           dispatch(hideLoading())
        }, 1000);
           
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
           getData()
           setLog(true)
        } else {
            setLog(false)
        }
    }, [])


    return (
        <header className="h-3.6 bg-gradient-to-t  from-transparent via-rgba(37, 37, 37,) to-black  fixed top-0 left-0 w-full h-20 ">
            <nav className="mx-auto container flex max-w-7xl items-center justify-between p-6 h-20 lg:px-8" aria-label="Global">
                <div className="flex items-center lg:flex-1">
                    <img className="h-11 w-auto" src="/logo.png" alt="" />
                    <span className="text-[#fff]">Healthy-Life</span>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <NavLink to='/' className={({isActive}) => isActive ? "text-[#FA2A55]" :"text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#FA2A55]" } >
                        Home
                    </NavLink>
                    <NavLink to='/trainers' className={({isActive}) => isActive ? "text-[#FA2A55]" :"text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#FA2A55]" } >
                        Trainers
                    </NavLink>
                    <NavLink to='/classes' className={({isActive}) => isActive ? "text-[#FA2A55]" :"text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#FA2A55]" } >
                        Classes
                    </NavLink>
                    <NavLink to='/blog' className={({isActive}) => isActive ? "text-[#FA2A55]" :"text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#FA2A55]" } >
                        Blog
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => isActive ? "text-[#FA2A55]" :"text-sm font-semibold leading-6 text-[#ffffff] hover:text-[#FA2A55]" } >
                        Contact
                    </NavLink>
                </Popover.Group>


                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {(log) ? <Link onClick={logOut} className="bg-[#FA2A55]  py-1  px-3 text-white font-bold uppercase text-xs rounded-md hover:bg-gray-200 hover:text-gray-800">logout</Link>
                        : <a href='/login' className="bg-[#FA2A55]  py-1  px-3 text-white font-bold uppercase text-xs rounded-md hover:bg-gray-200 hover:text-gray-800">login</a>}
                </div>
                <div className='text-white top-0 hidden lg:flex ml-6 '>
                    <NavLink to={`/profile`} >
                        {
                            userId.profile  ?   <img className="w-6 h-6  hover:border border-grey-400  rounded-full" src={`http://127.0.0.1:5001/image/${userId.profile}`} alt="Rounded avatar" />
                            :    <img className="w-6 h-6  hover:border border-grey-400  rounded-full" src="/empty.jpg" alt="Rounded avatar" />
                        }
                    </NavLink>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black bg-opacity-80 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-12 w-auto"
                                src="/logo.png"
                                alt=""
                            />
                        
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">

                                <NavLink to='/' onClick={() => setMobileMenuOpen(false)} className={({isActive})=> isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#FA2A55]" :"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#ffff] hover:text-[#FA2A55]"} >
                                    Home
                                </NavLink>
                                <NavLink to='/trainers' onClick={() => setMobileMenuOpen(false)} className={({isActive})=> isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#FA2A55]" :"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#ffff] hover:text-[#FA2A55]"} >
                                    Trianers
                                </NavLink>

                                <NavLink to='/classes' onClick={() => setMobileMenuOpen(false)} className={({isActive})=> isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#FA2A55]" :"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#ffff] hover:text-[#FA2A55]"} >
                                    Classes
                                </NavLink>

                                <NavLink to='/blog' onClick={() => setMobileMenuOpen(false)} className={({isActive})=> isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#FA2A55]" :"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#ffff] hover:text-[#FA2A55]"} >
                                    Blog
                                </NavLink>

                                <NavLink to='/contact' onClick={() => setMobileMenuOpen(false)} className={({isActive})=> isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#FA2A55]" :"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#ffff] hover:text-[#FA2A55]"} >
                                    Contact
                                </NavLink>

                                <NavLink to='/profile' onClick={() => setMobileMenuOpen(false)} className={({isActive})=> isActive ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#FA2A55]" :"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#ffff] hover:text-[#FA2A55]"} >
                                    Profile
                                </NavLink>
                            </div>
                            {/* _________________________________________________________________________________ */}

                            {/* --------------------------------------------------------------------- */}
                            <div className="py-6">

                                {
                                    log ? <Link
                                        onClick={logOut}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#cfd1d1] hover:text-[#FA2A55]"
                                    >
                                        Logout
                                    </Link> : <Link
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#cfd1d1] hover:text-[#FA2A55]"
                                    >
                                        Log in
                                    </Link>
                                }

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default Navbar