import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "./Pages/User/Login";
// import Signin from "./Components/Login/Signin";
import Signup from "./Pages/User/Signup";
import Home from './Pages/User/Home';
import Otp from  './Components/Otp/Otp'
import { Toaster } from "react-hot-toast";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route  path='/register'element={<Signup/>}/>
      <Route  path="/otp" element={<Otp/>}/>
      <Route path='/' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
  );
}

export default App;
