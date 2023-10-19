import React from 'react'
import Trainer_Navbar from '../../Components/Navbar/Trainer_Navbar';
import Tab from '../../Components/Navbar/Tabs';



function TrainerUpload() {

  return (
 <>
 <Trainer_Navbar upload={true}/>
 <Tab upload={true}  />
 


 </>
  )
}

export default TrainerUpload