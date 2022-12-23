import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FIFA from "../images/FIFA.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateSignup = () => {
    navigate("/signup");
  };
  const handleSubmit = (e) => {
    console.log("handleSubmit ran");
    e.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log("Email 👉️", email);
    console.log("Password 👉️", password);

    // 👇️ clear all input values in the form
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container-fluid loginPage ">
      <div className="leftImgContainer col-7 d-md-none d-none d-lg-block">
        {/* <h1 >Img</h1> */}
        <img src={FIFA} class="imgFIFALogin float-left img-fluid" alt="" />
      </div>
      <div className="rightDataContainer col d-sm-block">
        {/* <h1>Data</h1> */}
        <form
          onSubmit={handleSubmit}
          className="loginFormContainer  justify-content-center"
        >
          <h1 className="h1FIFALogin">Welcome to FIFA 2022</h1>
          <div className="loginInputs">
            <label className="loginLabel">Email</label>
            <br />
            <input
              type="text"
              name="email"
              className="loginInput"
              placeholder="eg. sarahosama123@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
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
}

export default Login;
