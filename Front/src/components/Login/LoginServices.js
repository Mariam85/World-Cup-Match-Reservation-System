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
                // console.log(response.data);
                if (response.status === 200) {
                  go = true;
                  localStorage.removeItem('AccessToken');
                  localStorage.setItem('AccessToken', response.data);
                  console.log(localStorage.getItem('AccessToken'));
            
                } else { go = false; }
            });

        return go
    }
}
 
export default LoginServices;