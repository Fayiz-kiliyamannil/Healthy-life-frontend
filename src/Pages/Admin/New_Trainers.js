import React, { useEffect, useState } from "react";
import CardTrainee from "../../Components/Admin/CardTrainee";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import Tab from "../../Components/Admin/Tabs";
import adminApi from '../../Utils/admin-axios';
import NotFoundAd from "../../Components/NotFound/NotfoundAd";



function New_Trainers() {
  const dispatch = useDispatch();
  const [newtrainer, setNewTrainer] = useState([]);
  const [isError,setError]  = useState('');


  const newTrainer = async () => {
    try {
      dispatch(showLoading());
      const response = await adminApi.post("/admin/newtrainers");
      setNewTrainer(response.data.value);
      dispatch(hideLoading());
    } catch (error) {
      console.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    newTrainer();
  }, []);

  if(isError){
    return <NotFoundAd/>
  }

  return (
    <>
      <Tab
        trainer={true}
        new={true}
        fetchApi={newTrainer}
        callApi={'newtrainers'}
        searchData={setNewTrainer}
        setError={setError}
      />
      <CardTrainee data={newtrainer}  />
    </>
  );
}

export default New_Trainers;
