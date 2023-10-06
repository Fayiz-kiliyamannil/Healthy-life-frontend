import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "./Pages/User/Login";
// import Signin from "./Components/Login/Signin";
import Signup from "./Pages/User/Signup";
import Home from './Pages/User/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route  path='/register'element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
  );
}
  
export default App;
