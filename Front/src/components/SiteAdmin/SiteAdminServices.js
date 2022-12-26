import axios from "axios";
import { useState ,useEffect} from "react";

const accessToken = localStorage.getItem("AccessToken");

const SiteAdminServices = () => {
  const [userRequests, setUserRequests] = useState([]);
  useEffect(
    () => {
      const getManagerRequests = async () => {
        let go = false;
        console.log("Token ", accessToken);
        await axios
          .get("http://localhost:3001/admin/fansRequestingAuthority?", {
            headers: {
              // header of request  | if Needed
              authToken: accessToken,
            },
            //body of request
          })
          .then((response) => {
            // Body of response
            // console.log(response.data);
            if (response.status === 201) {
              go = true;
              const userRequestsServer = response.data;
              setUserRequests(userRequestsServer);
            } else {
              go = false;
            }
          });

        // return go
      };
      getManagerRequests();
    },
    [
      /* dependency array (value when it changes we want the code to run) */
    ]
  );
  return userRequests;
};

export default SiteAdminServices;
