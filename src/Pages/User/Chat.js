import React, { useEffect, useState } from 'react'
import Chatpage from '../../Components/Chat/Chatpage'
import client from '../../Utils/axios-utils';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound'
function Chat() {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  const [userInfo,setUserInfo] = useState();
  const [isError, setIsError] = useState('');
  const [text,setText] = useState('')



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

    

  const submitChat =  async (event)=>{
    event.preventDefault()
    try {
      const response = await client.post('/user/create-new-chat',{text:text})
      if(response.data.success){
        setChatInfo(response.data.fetchChatById);
        setText('')
      }
    } catch (error) {
      console.error(error.message);
      setIsError(error.message)
    }
  }


  const fetchChatById =async()=>{
    try {
      const response = await  client.get('/user/fetch-chatbyid')
      if(response.data.success){
        setChatInfo(response.data.fetchChatById);
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

  
if(isError){
  return <NotFound error={isError}/>
}

  return (
    <>

      <Chatpage 
      data={userInfo} 
      setText={setText}
      text={text}
      submitChat={submitChat}
      chatInfo={chatInfo}
      />

    </>
  )
}

export default Chat