import React, { useEffect, useState } from 'react'
import TrainerChatpage from '../../Components/Chat/TrainerChatpage'
import { useDispatch } from 'react-redux'
import trainerApi from '../../Utils/trainer-axio'
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';
import { useParams } from 'react-router-dom';


function TrainerChat() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState([]);
    const [chatInfo, setChatInfo] = useState([]);
    const [text, setText] = useState('');
    const [isError, setIsError] = useState('');


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


    const submitChat = async (e) => {
        e.preventDefault();
        try {
            const response = await trainerApi.post(`/trainer/trainer-create-chat/${userId}`, { text: text })
            if (response.data.success) {
                setChatInfo(response.data.fetchChatById);
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
            const response = await trainerApi.get(`/trainer/trainer-fetch-chat/${userId}`)
            if (response.data.success) {
                setChatInfo(response.data.fetchChatById);
            }
        } catch (error) {
            console.error(error);
            setIsError(error.message)
        }
    }
    useEffect(() => {
        fetchChatById()
    }, [userId])




    if (isError) {
        return <NotFound error={isError} />
    }

    return (
        <TrainerChatpage fetchChatById={fetchChatById}  text={text} chatInfo={chatInfo} setText={setText} submitChat={submitChat} data={userInfo} />
    )
}

export default TrainerChat