import React, { useContext, useEffect, useState } from 'react'
import TrainerChatpage from '../../Components/Chat/TrainerChatpage'
import { useDispatch } from 'react-redux'
import trainerApi from '../../Utils/trainer-axio'
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';
import { useParams } from 'react-router-dom';
import { trainerChatinfo } from '../../App';
import { userContext } from '../../App';
import { trainerContext } from '../../App';

import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;


function TrainerChat() {

    const { trainerChat, setTrainerChat } = useContext(trainerChatinfo);//----------
    const { userChat, setUserChat } = useContext(userContext);//---------------------USECONTEXT
    const { trainerInfo, setTrainerInfo } = useContext(trainerContext)

    const { userId } = useParams();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState([]);
    const [text, setText] = useState('');
    const [isError, setIsError] = useState('');
    const [socketConnected, setSocketConnected] = useState(false)



    const fetchUserInfo = async () => { //---------- TO FETCTH USER INFO -
        dispatch(showLoading())
        try {
            const response = await trainerApi.post('/trainer/get-trainee-info')
            if (response.data.success) {
                setUserInfo(response.data.trainee);
                dispatch(hideLoading());
            }
        } catch (error) {
            setIsError(error.message)
            console.error(error);
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        fetchUserInfo();
    }, [])

    useEffect(() => {
        socket = io.apply(ENDPOINT)
        socket.emit('setup', trainerInfo)
        socket.on('connection', () => setSocketConnected(true));
    }, [])


    useEffect(() => {
        socket.on('messageRecivedTrainer', (newChat) => {
          if (!userChat.includes(newChat)) {
            setUserChat([...userChat, newChat]);
          }
        });
      });
    

    useEffect(()=>{
        fetchChatById()
    },[userId,trainerChat])


    const submitChat = async (e) => {
        e.preventDefault();
        try {
            const response = await trainerApi.post(`/trainer/trainer-create-chat/${userId}`, { text: text })
            if (response.data.success) {
                setTrainerChat(response.data.fetchChatById);
                socket.emit('newChat', response.data.fetchChatById[response.data.fetchChatById.length - 1])
                setText('')
            }
        } catch (error) {
            setIsError(error.message)
            console.error(error);
            dispatch(hideLoading())
        }  
    }
  




    const fetchChatById = async () => {
        try {
            if (userId) {
                const response = await trainerApi.get(`/trainer/trainer-fetch-chat/${userId}`)
                if (response.data.success) {
                    setTrainerChat(response.data.fetchChatById);
                    socket.emit('joinChat', trainerInfo);
                }
            }
        } catch (error) {
            console.error(error);
            setIsError(error.message)
        }
    }
  



  


    if (isError) {
        return <NotFound error={isError} />
    }

    return (
        <TrainerChatpage fetchChatById={fetchChatById} text={text} chatInfo={trainerChat} setText={setText} submitChat={submitChat} data={userInfo} />
    )
}

export default TrainerChat