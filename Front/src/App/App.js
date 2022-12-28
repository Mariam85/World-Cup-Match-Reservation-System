
import './App.css';
import Mainpage from '../components/Mainpage/Mainpage';
import Login from "../components/Login/Login";
import Signup from '../components/Signup/Signup';
import Manger from '../components/Manger/Manger';
import SiteAdmin from '../components/SiteAdmin/SiteAdmin';
import FanPage from '../components/FanPage/FanPage';
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";
import Reservation from '../components/FanPage/Reservation';


function App() {
  return (
      <Router>
        <Routes>
          <Route   path='/' element={<Mainpage />} />

          <Route   path='/login' element={<Login />} />

          <Route   path='/signup' element={<Signup />} />

          <Route   path='/manger' element={<Manger />} />

          <Route   path='/admin' element={<SiteAdmin />} />

          <Route   path='/fan' element={<FanPage />} />
          <Route   path='/reservation' element={<Reservation />} />

        </Routes>
      </Router>

  );
}

export default App;
