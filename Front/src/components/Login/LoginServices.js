import axios from "axios";
import jwt_decode from "jwt-decode";

const LoginServices = {
  login: async (userName, password) => {
    let go = false;
    let role = {};
    try{
    await axios
      .post("http://localhost:3001/auth", {
        headers: {
          // header of request  | if Needed
        },
        //body of request
        userName,
        password,
      })
      .then((response) => {
        // Body of response
        // console.log(response.data);
        if (response.status === 200) {
          alert("Successfully logged in!")
          go = true;
          localStorage.removeItem("AccessToken");
          localStorage.setItem("AccessToken", response.data);
          //   console.log(localStorage.getItem("AccessToken"));
          var decoded = jwt_decode(localStorage.getItem("AccessToken"));
          role = decoded.role;
          console.log(role);
        } else {
          alert("Invalid login. Incorrect email or password.")  
          go = false;
        }
      });

    return role;
    }
    catch(error)
    {
      alert("Invalid login. Incorrect email or password.")  
    }
  },
};

export default LoginServices;
