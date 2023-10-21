import React, { useEffect, useState } from "react";
import Admin_Navbar from "../../Components/Navbar/Admin_Navbar";
import CardTrainerTrainee from "../../Components/Card/CardTrainerTrainee";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import Tab from "../../Components/Navbar/Tabs";

function New_Trainers() {
  const dispatch = useDispatch();
  const [newtrainer, setNewTrainer] = useState([]);
  const [search, setSearch] = useState([]);

  const newTrainer = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/admin/newtrainers");
      setNewTrainer(response.data.newTrainer);
      setSearch(response.data.trainer);
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
    }
  };



  

  useEffect(() => {
    newTrainer();
  }, []);

  return (
    <>
      <Admin_Navbar />
      <Tab
        trainer={true}
        new={true}
        searchValue={search}
        searchData={setNewTrainer}
      />
      <CardTrainerTrainee data={newtrainer}  />
    </>
  );
}

export default New_Trainers;
