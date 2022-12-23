import { useState } from "react"
import Axios from "axios"
import FIFA from "../images/FIFA.jpg"
import "./Signup.css"

function Signup() {

    const [usernameReg, setUsername] = useState("");
    const [passwordReg, setPassword] = useState("");
    const [firstnameReg, setFirstname] = useState("");
    const [lastnameReg, setLastname] = useState("");
    const [birthdateReg, setBirthdate] = useState("");
    const [genderReg, setGender] = useState("");
    const [nationalityReg, setNationality] = useState("");
    const [roleReg, setRole] = useState("");
    const [emailReg, setEmail] = useState("");


    const signup =() =>{
        Axios.post('http://localhost:3001/users', {
            username:usernameReg,
            password: passwordReg,
            firstname: firstnameReg,
            lastname: lastnameReg,
            birthdate: birthdateReg,
            gender: genderReg,
            nationality: nationalityReg,
            role: roleReg,
            email: emailReg
        }).then((response) =>{
            console.log(response);
        })
    }
    return (
        <div className="flex">
            <div className="signup1">
                <img src={FIFA} alt='fifa' className="fifa" />
            </div>
            <div className="signup2">
                <h1>Register to FIFA 2022</h1>
                <form action="/my-handling-form-page" method="post">
                    <label>Username:</label><br />
                    <input type="text"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    ></input><br />
                    <br />
                    <label>Password:</label><br />
                    <input type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></input>
                    <br />
                    <br />
                    <div className="form1-flex">
                        <label>First name:</label><br />
                        <input type="text"
                            onChange={(e) => {
                                setFirstname(e.target.value)
                            }}
                        ></input><br />
                        <label>Last name:</label><br />
                        <input type="text"
                            onChange={(e) => {
                                setLastname(e.target.value)
                            }}
                        ></input>
                    </div>
                    <br /><br />
                    <div className="form1-flex">
                        <label>Birth date:</label><br />
                        <input type="date"
                            onChange={(e) => {
                                setBirthdate(e.target.value)
                            }}
                        ></input><br />
                        <label>Gender:</label><br />
                        <select
                            onChange={(e) => {
                                setGender(e.target.value)
                            }}
                        >
                            <option>Female</option>
                            <option>Male</option>

                        </select>
                    </div>
                    <br /> <br />
                    <div className="form1-flex">
                        <label>Nationality: </label><br />
                        <input type="text"
                            onChange={(e) => {
                                setNationality(e.target.value)
                            }}

                        ></input><br />
                        <label>Role:</label><br />
                        <select
                            onChange={(e) => {
                                setRole(e.target.value)
                            }}
                        >
                            <option>Manager</option>
                            <option>Fan</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <br /> <br />
                    <label>Email: </label><br />
                    <input type="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    ></input>
                    <br /> <br />
                    <button className="button1" onClick={signup}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup