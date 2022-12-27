import axios from "axios";
import { useState ,useEffect} from "react";

const accessToken = localStorage.getItem("AccessToken");

const SiteAdminGetUsersServices = () => {
  const [users, setUsers] = useState([]);
  useEffect(
    () => {
      const getUsersAdmin = async () => {
        let go = false;
        // console.log("Token ", accessToken);
        await axios
          .get("http://localhost:3001/admin/users", {
            headers: {
              // header of request  | if Needed
              authToken: accessToken,
            },
            //body of request
          })
          .then((response) => {
            // Body of response
            // console.log(response.data);
            if (response.status === 200) {
              go = true;
              const usersServer = response.data;
              setUsers(usersServer);
            } else {
              go = false;
            }
          });

        // return go
      };
      getUsersAdmin();
    },
    [
      /* dependency array (value when it changes we want the code to run) */
    ]
  );
  return users;
};

export default SiteAdminGetUsersServices;
