import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FIFA from "../images/FIFA.jpg";
import FIFA2022 from "../images/FIFA2022.gif";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginServices from "./LoginServices";

const Login = () => {
  const navigate = useNavigate();
  //   const [user, setuser] = useState({

  //   email: '',
  //   password: '',

  // });

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  // Define Navigations 
  const navigateAdmin = () => {
    navigate("/admin");
  };
  const navigateManager = () => {
    navigate("/manger");
  };
  const navigateFan = () => {
    navigate("/fan");
  };
  //Handle submit and routing 
  const handleSubmit = async (e) => {
    console.log("handleSubmit ran");
    e.preventDefault(); // 👈️ prevent page refresh
    let role = await LoginServices.login(userName, password);

    // console.log("token",localStorage.getItem("AccessToken"));
    if (role === "Manager") {
      navigateManager();
    } else if (role === "Fan") {
      navigateFan();
    } else if (role === "Admin") {
      navigateAdmin();
    }
    
    // console.log("role",role);

    // 👇️ access input values here
    console.log("Email 👉️", userName);
    console.log("Password 👉️", password);

    // 👇️ clear all input values in the form
    setUserName("");
    setPassword("");
  };

  return (
    <div className="container-fluid loginPage ">
      <div className="leftImgContainer col-7 d-md-none d-none d-lg-block">
        {/* <h1 >Img</h1> */}
        <img
          src={FIFA2022}
          className="imgFIFALogin float-left img-fluid"
          alt=""
        />
      </div>
      <div className="rightDataContainer col d-sm-block">
        {/* <h1>Data</h1> */}
        <form
          onSubmit={handleSubmit}
          className="loginFormContainer  justify-content-center"
        >
          <h1 className="h1FIFALogin">Welcome to FIFA 2022</h1>
          <div className="loginInputs">
            <label className="loginLabel">Username</label>
            <br />
            <input
              type="text"
              name="username"
              className="loginInput"
              placeholder="eg. SaraOsama1"
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
            />
          </div>

          <div className="loginInputs">
            <label className="loginLabel">Password</label>
            <br />
            <input
              type="password"
              name="password"
              className="loginInput"
              placeholder="eg. ********"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <button className="signinButton" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
