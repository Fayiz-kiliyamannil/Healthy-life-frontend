import React, { useEffect, useState } from "react";
import Banner from "../../Components/User/Banner";
import axios from "axios";
import Card from "../../Components/User/card";
import CardTrainer from "../../Components/User/CardTrainer&Trainee";
import PricingSection from "../../Components/User/PricingSection";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";


function Home() {
  const dispatch = useDispatch();
  const [trainers, setTrainers] = useState([]);
  const product = [
    {
      id: 1,
      progress: "1.2 kg",
      pros: "Average weight loss per week",
      image: "/istockphoto-1169486621-612x612.jpg",
    },
    {
      id: 2,
      progress: "80 %",
      pros: "Decline in lifestyle  diseases",
      image: "/food.jpg",
    },
    {
      id: 3,
      progress: "45 %",
      pros: "Increases in steps taken",
      image: "/foot.jpg",
    },
    {
      id: 4,
      progress: ">15 %",
      pros: "Avg.drop in Hbic levels",
      image: "yoga.png",
    },
  ];

  const getData = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`https://healthylife-srpz.onrender.com/user/get-home-info`);
      if (response.data.success) {
        setTrainers(response.data.trainer);
        dispatch(hideLoading())
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Banner />
      <Card product={product} tittle={"How Healthy-Life Works"} />
      <div className="w-[80%] mx-auto ">
        <iframe
          className="w-full aspect-video border border-gray-500 rounded-lg"
          src="https://www.youtube.com/embed/LGBxJqT_CUI?si=YGBumVu22np829Ep"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className=" text-center   mx-auto  lg:max-w-7xl" >
        <CardTrainer
          home
          data={trainers}
          tittle={"Healthy-Life Coaches at your Service"}
        />
      </div>
      <PricingSection />

    </>
  );
}

export default Home;
