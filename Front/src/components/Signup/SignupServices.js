import axios from "axios";

const SignupServices = {
  signup: async (
    userName,
    password,
    firstName,
    lastName,
    birthdate,
    gender,
    nationality,
    wantsAuthority,
    email
  ) => {
    let go = false;
    await axios
      .post("http://localhost:3001/users", {
        headers: {
          // header of request  | if Needed
        },
        //body of request
        userName,
        password,
        firstName,
        lastName,
        birthdate,
        gender,
        nationality,
        wantsAuthority,
        email,
      })
      .then((response) => {
        // Body of response
        console.log(response);
        if (response.status === 200) {
          go = true;
        } else {
          go = false;
        }
      });

    return go;
  },
};

export default SignupServices;
