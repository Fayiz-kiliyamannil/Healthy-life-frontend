import React, { useContext, useEffect, useState } from 'react'
import Chatpage from '../../Components/Chat/Chatpage'
import client from '../../Utils/axios-utils';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound'
import io from 'socket.io-client';
import { userContext } from '../../App';
import { trainerChatinfo } from '../../App';
import { usersContext } from '../../App';

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

function Chat() {
  const { userInfo, setUserInfo } = useContext(usersContext) //-------
  const { userChat, setUserChat } = useContext(userContext)//---------    USECONTEXT
  const { trainerChat, setTrainerChat } = useContext(trainerChatinfo);//------

  const dispatch = useDispatch();
  const [isError, setIsError] = useState('');
  const [text, setText] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)



  const fetchData = async () => {
    dispatch(showLoading())
    try {
      const response = await client.post('/user/get-user-info')
      if (response.data.success) {
        setUserInfo(response.data.user);
        dispatch(hideLoading());
      }
    } catch (error) {
      console.error(error.message);
      setIsError(error.message)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    socket = io.apply(ENDPOINT)
    socket.emit('setup', userInfo)
    socket.emit('joinChat', userInfo?._id)
    socket.on('connection', () => setSocketConnected(true));
  }, [])

  useEffect(() => {
    socket.on('messageRecivedTrainer', (newChat) => {
      if (!trainerChat.includes(newChat)) {
        setTrainerChat((prevTrainerChat) => [...prevTrainerChat, newChat]);
      }
    });
  });

  useEffect(() => {
    fetchChatById();
  }, [userChat])



  const submitChat = async (event) => {
    event.preventDefault()
    try {
      if(text.trim()){
        const response = await client.post('/user/create-new-chat', { text: text })
      if (response.data.success) {
        setUserChat(response.data.fetchChatById);
        socket.emit('newChat', response.data.fetchChatById[response.data.fetchChatById.length - 1])
        setText('')
      }
      }
    } catch (error) {
      console.error(error.message);
      setIsError(error.message)
    }
  }


  const fetchChatById = async () => {
    try {
      const response = await client.get('/user/fetch-chatbyid')
      if (response.data.success) {
        setUserChat(response.data.fetchChatById);
      }
    } catch (error) {
      console.error(error.message);
      setIsError(error.message)
    }
  }





  if (isError) {
    return <NotFound error={isError} />
  }

  return (
    <>

      <Chatpage
        data={userInfo}
        setText={setText}
        text={text}
        submitChat={submitChat}
        chatInfo={userChat}
      />

    </>
  )
}

export default Chat