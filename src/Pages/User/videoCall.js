import React, { useContext, useState, useRef, useEffect } from 'react';
import { usersContext } from '../../App';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import client from '../../Utils/axios-utils';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import toast from 'react-hot-toast';
import NonProUsers from '../../Components/User/NonProUsers';
import { url } from '../../Utils/url';
const socket = io(url);



const VideoCall = () => {
    const { userInfo } = useContext(usersContext);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [pro, setPro] = useState(false)
    const [user, setUser] = useState()
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const dispatch = useDispatch()

    const fetchuserInfo = async () => {
        try {
            dispatch(showLoading())
            const response = await client.post('/user/get-user-into-by-id');
            if (response.data.success) {
                setUser(response.data.data);
                setPro(response.data.isProUser)
                dispatch(hideLoading())
            }
        } catch (error) {
            console.error(error.message);
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const currentstream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                console.log('Video Stream:', currentstream);
                setStream(currentstream);
                myVideo.current.srcObject = currentstream;
            } catch (error) {
                console.error(error.message);
            }
        }
        socket.emit('userJoin', userInfo?._id || user?._id)
        socket.on('me', (id) => setMe(id))
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
        getUserMedia();
        fetchuserInfo()
        setName(userInfo?.firstname + userInfo?.lastname)
    }, [])

 


    const answerCall = () => {
        try {
            toast.remove();
            setCallAccepted(true);
            const peer = new Peer({ initiator: false, trickle: false, stream });
            peer.on('signal', (data) => {
                socket.emit('answerCall', { signal: data, to: call.from });
            });
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            });
            if (peer) {
                peer.signal(call.signal);
                connectionRef.current = peer;
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    const callUser = (id) => {
        try {
            const peer = new Peer({ initiator: true, trickle: false, stream });
            peer.on('signal', (data) => {
                socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
            });
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            });
            socket.on('callAccepted', (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });
            connectionRef.current = peer;
        } catch (error) {
            console.error(error.message);

        }
    };



    const leaveCall = () => {
        // Close the connection and stop the stream
        if (connectionRef.current) {
            connectionRef.current.destroy(); // Close the Peer connection
            connectionRef.current = null;
        }

        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        // Reset the state
        setCall({});
        setCallAccepted(false);
        setCallEnded(true); // Set callEnded to true to prevent further actions
        window.history.back();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };





    if (!pro) {
        return <NonProUsers />
    }


    return (
        <>

            <div className='items-center flex pb-5 border-b border-gray-700  justify-center  mt-20   '  >
                <video muted playsInline ref={myVideo} autoPlay />
                {callAccepted && !callEnded && (
                    <video playsInline ref={userVideo} autoPlay />
                )}

            </div>

            <div className='flex mt-4 justify-center' >
                <button onClick={() => leaveCall()} className=" border border-transparent rounded-full w-14 h-14  mr-3 flex items-center justify-center text-sm font-medium bg-red-500 hover:bg-red-700 "
                >
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z" />
                    </svg>
                </button>
                <button onClick={() => callUser(userInfo.trainer)} className=" border border-transparent rounded-full w-14 h-14  mr-3 flex items-center justify-center text-sm font-medium bg-green-500 hover:bg-green-700 "
                >
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z" />
                    </svg>
                </button>

                {
                    call.isReceivingCall && (
                        toast.custom((t) => (
                            <div
                                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                    } max-w-md w-full h-full pt-6   bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                            >
                                <div className="flex-1  w-0 p-4">
                                    <div className="flex items-start">
                                        <div className="ml-3 mt-1 flex-1">
                                            <p className="text-md  font-medium text-gray-900">
                                                Incomming Call From
                                                <span className='text-lg font-medium text-gray-900' >  {call.name}  </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex p-3 border-gray-200">
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className=" border border-transparent rounded-full w-10 h-10 p-1 mr-3 flex items-center justify-center text-sm font-medium bg-red-500 hover:bg-red-700 "
                                    >
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={answerCall}
                                        className=" border border-transparent rounded-full w-10 h-10 p-1   flex items-center justify-center text-sm font-medium bg-green-500 hover:bg-green-700  "
                                    >
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                        </svg>
                                    </button>

                                </div>
                            </div>
                        ))


                    )
                }



            </div>



        </>
    );
};

export default VideoCall;
