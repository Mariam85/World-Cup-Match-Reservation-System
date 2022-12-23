import axios from "axios";


const LoginServices =  {
    login: async (userName,password) => {
        let go = false;
        await axios
            .post("http://localhost:3001/auth", {
                headers: {
                    // header of request  | if Needed
                  },
                //body of request
                userName,password

            })
            .then((response) => {
                // Body of response
                console.log(response);
                if (response.status === 200) {
                  go = true;
                } else { go = false; }
            });

        return go
    }
}
 
export default LoginServices;