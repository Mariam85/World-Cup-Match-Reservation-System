import "./Mainpage.css";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoFootball } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";

const Mainpage = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="startContainer">
        <div className="navbar navbar-expand-md navbar-light">
          <div class="container-fluid">
            {/* Login */}

            <div className="loginbtn">
              <FiLogIn onClick={navigateLogin} />
              <button className="mainpageButton " onClick={navigateLogin}>login</button>
            </div>
            {/* signup */}
            <div className="signupbtn">
              <SiGnuprivacyguard onClick={navigateSignup} />
              <button className="mainpageButton" onClick={navigateSignup}>signup</button>
            </div>
            {/* Matches */}
            <div className="match">
              <IoFootball onClick={navigateSignup} />
              <button className="mainpageButton" onClick={navigateSignup}>match</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
