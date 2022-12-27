import axios from "axios";
import { useState ,useEffect} from "react";

const accessToken = localStorage.getItem("AccessToken");

const GetTeam = () => {
  const [teams, setTeams] = useState([]);
  useEffect(
    () => {
      const getTeam = async () => {
        let go = false;
        console.log("token",accessToken);

        await axios
          .get("http://localhost:3001/manager/teams", {
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
              const teamsServer = response.data;
              setTeams(teamsServer);
            } else {
              go = false;
            }
          });

        // return go
      };
      getTeam();
    },
    [
      /* dependency array (value when it changes we want the code to run) */
    ]
  );
  return teams;
};

export default GetTeam;
