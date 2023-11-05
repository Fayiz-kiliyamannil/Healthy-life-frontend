import React, { useContext, useEffect, useState } from 'react'
import Chatpage from '../../Components/Chat/Chatpage'
import client from '../../Utils/axios-utils';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound'
import io from 'socket.io-client';
import { userContext } from '../../App';
import { trainerChatinfo } from '../../App';

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

function Chat() {

  const { userChat, setUserChat } = useContext(userContext)
  const { setTrainerChat } = useContext(trainerChatinfo);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
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
    socket = io.apply(ENDPOINT)
    socket.emit('user-setup', userInfo)
    socket.on('connection', () => setSocketConnected(true));
  }, [userInfo])



  const submitChat = async (event) => {
    event.preventDefault()
    try {
      const response = await client.post('/user/create-new-chat', { text: text })
      if (response.data.success) {
        setUserChat(response.data.fetchChatById);
        setText('')
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
  useEffect(() => {
    fetchData();
    fetchChatById();
  }, [])




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