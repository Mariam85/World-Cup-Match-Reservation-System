import Navbar from "../Navbar/Navbar";
import WORLDCUP from "../images/worldcup.png"
import './Mainpage.css'
import { useNavigate} from 'react-router-dom';

function Mainpage(){
    
    
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login');
      };

    const navigateSignup = () => {
        navigate('/signup');
      };
    
    return(
        <div>
            <Navbar />
            <div className="flex-box">
                <div className="desc">
                    <h1>Make your reservation easier</h1>
                    <div>
                        <button onClick={navigateLogin}>Login</button>
                        <button onClick={navigateSignup}>signup</button>
                    </div>
                </div>
                <div className="cup">
                    <img src={WORLDCUP} alt='cup' className="worldcup" />
                </div>
            </div>
        </div>
    )
}

export default Mainpage