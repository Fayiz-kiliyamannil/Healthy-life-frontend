import React, { useContext, useState, useRef, useEffect } from 'react';
import { trainerContext, usersContext } from '../../App';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
const socket = io.apply('http://localhost:5000');


const VideoCall = () => {
    const { userInfo } = useContext(usersContext);
    const { trainerInfo } = useContext(trainerContext);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const currentstream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                setStream(currentstream);
                console.log('Video Stream:', currentstream);
                myVideo.current.srcObject = currentstream;
            } catch (error) {
                console.error(error.message);
            }
        }
         
        socket.on('me', (id) => setMe(id))
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
        getUserMedia();
    }, [])

    const answerCall = () => {
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
    };

    const callUser = (id) => {
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
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current = null;
            window.location.reload();
        }


    };



    return (
        <>

            <div className='items-center flex border     justify-center  mt-20   '  >
                <video className='  border  ' muted playsInline ref={myVideo} autoPlay />
                {callAccepted && !callEnded && (
                    <video playsInline ref={userVideo} autoPlay />
                )
                }  

            </div>

            <div className='flex justify-center' >
                <button onClick={leaveCall} className='text-red bg-gray-500 border mr-5 rounded-md hover:bg-white' >
                    EndCall
                </button>
                <button onClick={() => callUser(me)} className='bg-red-500  hover:bg-white rounded-md border, ' >
                    call to trainer
                </button>


                <button onClick={answerCall} className='bg-red-500  hover:bg-white rounded-md border, ' >
                    answer call
                </button>




            </div>



        </>
    );
};

export default VideoCall;
