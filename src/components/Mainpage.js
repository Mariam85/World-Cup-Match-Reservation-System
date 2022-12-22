import Navbar from "./Navbar";
import WORLDCUP from '../images/worldcup.png'
import './Mainpage.css'

function Mainpage(){
    return(
        <div>
            <Navbar />
            <div className="flex-box">
                <div className="desc">
                    <h1>Make your reservation easier</h1>
                    <div>
                        <button>Login</button>
                        <button>signup</button>
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