import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FIFA2022 from "../images/FIFA2022.gif";

import "./Signup.css";

import SignupServices from "./SignupServices";

function Signup() {

  //Const For Navigation
  const navigate = useNavigate();

  //Const For Requests and Values
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  var [wantsAuthority, setWantsAuthority] = useState(false);

  //Navigation Handles
  const navigateLogin = () => {
    navigate("/login");
  };

  //Handle Submit Functionality
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("HandleSubmit Signup");

    if (role === "Manager") {
      setWantsAuthority(true);
    }

    // Send Request
    const goLogin = SignupServices.signup(
      userName,
      password,
      firstName,
      lastName,
      birthdate,
      gender,
      nationality,
      wantsAuthority,
      email
    );

    if (goLogin) {
        navigateLogin();
    }

    //Access Input
    console.log("Email 👉️", userName);
    console.log("Password 👉️", password);
    console.log("First Name 👉️", firstName);
    console.log("Last Name 👉️", lastName);
    console.log("Birthdate 👉️", birthdate);
    console.log("Gender 👉️", gender);
    console.log("Nationality 👉️", nationality);
    console.log("role 👉️", role, wantsAuthority);
    console.log("Email 👉️", email);

    // Clear Inputs After Signin
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setBirthdate("");
    setGender("");
    setNationality("");
    setRole("");
    setEmail("");
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
          className="signupFormContainer  justify-content-center"
        >
          <h1 className="h1FIFASignup">Register to book your place</h1>
          <h2 className="h2FIFASignup">Personal Info</h2>

          <div className="inlineInput">
            <div className="signupInputs">
              {/* FirstName */}
              <label className="signupLabel">First Name</label>
              <br />
              <input
                type="text"
                name="firstName"
                className="signupInput"
                placeholder="eg. Sarah"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>

            <div className="signupInputs">
              {/* LastName */}
              <label className="signupLabel">Last Name</label>
              <br />
              <input
                type="text"
                name="lastName"
                className="signupInput"
                placeholder="eg. Osama"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </div>
          </div>

          <div className="signupInputs">
            {/* Email */}
            <label className="signupLabel">Email</label>
            <br />
            <input
              type="text"
              name="email"
              className="signupInput"
              placeholder="eg. sarahosama123@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>

          <div className="inlineInput">
            <div className="signupInputs">
              {/* UserName */}
              <label className="signupLabel">User Name</label>
              <br />
              <input
                type="text"
                name="userName"
                className="signupInput"
                placeholder="eg. SarahOsama1"
                onChange={(event) => setUsername(event.target.value)}
                value={userName}
              />
            </div>

            <div className="signupInputs">
              {/* Password */}
              <label className="signupLabel">Password</label>
              <br />
              <input
                type="password"
                name="password"
                className="signupInput"
                placeholder="eg. ********"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </div>
          </div>

          <div className="inlineInput">
            <div className="signupInputs">
              {/* BirthDate */}
              <label className="signupLabel">Birthdate</label>
              <br />
              <input
                type="date"
                name="date"
                className="signupInput"
                // placeholder="eg. Sarah"
                onChange={(event) => setBirthdate(event.target.value)}
                value={birthdate}
              />
            </div>

            <div className="signupInputs">
              {/* Gender */}
              <label className="signupLabel">Gender</label>
              <br />
              <select
                name="gender"
                className="signupInput"
                // placeholder="eg. Osama"
                onChange={(event) => setGender(event.target.value)}
                value={gender}
              >
                <option>female</option>
                <option>male</option>
              </select>
            </div>
          </div>
          <div className="inlineInput">
            <div className="signupInputs">
              {/* Nationality */}
              <label className="signupLabel">Nationality</label>
              <br />
              <input
                type="text"
                name="nationality"
                className="signupInput"
                placeholder="eg. Egyptian"
                onChange={(event) => setNationality(event.target.value)}
                value={nationality}
              />
            </div>

            <div className="signupInputs">
              {/* Role */}
              <label className="signupLabel">Role</label>
              <br />
              <select
                name="role"
                className="signupInput"
                // placeholder="eg. Osama"
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option>Manager</option>
                <option>Fan</option>
              </select>
            </div>
          </div>

          <button className="signupButton" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
