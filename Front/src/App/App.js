
import './App.css';
import Mainpage from '../components/Mainpage/Mainpage';
import Login from "../components/Login/Login";
import Signup from '../components/Signup/Signup';
import Manger from '../components/Manger/Manger';
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";


function App() {
  return (
      <Router>
        <Routes>
          <Route   path='/' element={<Mainpage />} />

          <Route   path='/login' element={<Login />} />

          <Route   path='/signup' element={<Signup />} />

          <Route   path='/manger' element={<Manger />} />

        </Routes>
      </Router>

  );
}

export default App;
