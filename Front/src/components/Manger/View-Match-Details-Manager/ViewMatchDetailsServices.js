import axios from "axios";
import { useState ,useEffect} from "react";

const accessToken = localStorage.getItem("AccessToken");

const ViewMatch = () => {
  const [match, setMatch] = useState([]);
  useEffect(
    () => {
      const viewmatch = async () => {
        let go = false;
        console.log("token",accessToken);

        await axios
          .get("http://localhost:3001/manager/matchDetails?", {
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
              const matchServer = response.data;
              setMatch(matchServer);
            } else {
              go = false;
            }
          });

        // return go
      };
      viewmatch();
    },
    [
      /* dependency array (value when it changes we want the code to run) */
    ]
  );
  return match;
};

export default ViewMatch;
