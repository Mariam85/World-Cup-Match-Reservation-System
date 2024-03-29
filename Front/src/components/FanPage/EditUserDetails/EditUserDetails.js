import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OtherFanPageServices from "../OtherFanPageServices";
import "./EditUserDetails.css";

const EditUserDetails = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [goLogin, setGoLogin] = useState(false);

  //Handle Submit Functionality
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("HandleSubmit Signup");

    // Send Request
    setGoLogin( OtherFanPageServices.editFanData(
      
      password,
      firstName,
      lastName,
      birthdate,
      gender,
      nationality
    ));
    

    //Access Input
    console.log("Email 👉️", userName);
    console.log("Password 👉️", password);
    console.log("First Name 👉️", firstName);
    console.log("Last Name 👉️", lastName);
    console.log("Birthdate 👉️", birthdate);
    console.log("Gender 👉️", gender);
    console.log("Nationality 👉️", nationality);
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
    <div className="EditUserDetails">
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



        <div className="inlineInput">
          <div className="signupInputs">
            {/* UserName */}
            <label className="signupLabel">Old Password</label>
            <br />
            <input
              type="text"
              name="userName"
              className="signupInput"
              placeholder="eg. SarahOsama1"
            //   onChange={(event) => setUsername(event.target.value)}
              value={userName}
            />
          </div>

          <div className="signupInputs">
            {/* Password */}
            <label className="signupLabel">New Password </label>
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
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditUserDetails;
