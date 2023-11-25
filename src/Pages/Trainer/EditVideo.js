import React, { useEffect, useState } from 'react'
import VideoUpload from '../../Components/Trainer/VideoUpload'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import trainerApi from '../../Utils/trainer-axio';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function EditVideo() {
    const { videoId } = useParams();
    const [error, setError] = useState([])
    const [videoEdit, setVideoEdit] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) => { // to  handle header and note in to upload video
        const { name, value } = e.target;
        setVideoEdit({ ...videoEdit, [name]: value, videoId:videoId })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(showLoading())
        const newError = {}
        try {
            if (!videoEdit.header) {
                newError.header = 'Heading Required'
            }

            if (!videoEdit.note) {
                newError.note = 'Commet Required'
            }
            if (!videoEdit.video) {
                newError.video = 'Video is Require'
            }
            if (Object.keys(newError).length === 0) {
                const response = await trainerApi.post('/trainer/trainer-update-video',
                    videoEdit,
                    )
                if (response.data.success) {
                    toast.success(response.data.message, {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    })
                    dispatch(hideLoading());
                    navigate(`/trainer/media/video`)

                }
            }
            setError(newError)
            setTimeout(() => {
                setError([])
            }, 3000);

        } catch (error) {
            dispatch(hideLoading())
            console.error(error);
        }
    }

    const fetchVideoDetails = async () => {
        dispatch(showLoading())
        try {
            const response = await trainerApi.post('/trainer/trainer-video-details', { videoId: videoId })
            if (response.data.success) {
                setVideoEdit(response.data.videoDetails);
                dispatch(hideLoading());
            }
        } catch (error) {
            console.error(error);
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        fetchVideoDetails();
    }, [])


    return (
        <>
            <VideoUpload handleChange={handleChange} edit error={error} videoEdit={videoEdit} handleSubmit={handleSubmit} />

        </>
    )
}

export default EditVideo