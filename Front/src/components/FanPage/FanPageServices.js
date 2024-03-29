import axios from "axios";
import { useState ,useEffect} from "react";

const accessToken = localStorage.getItem("AccessToken");

const FanPageServices = (id) => {
  const [seatNumbers, setSeatNumbers] = useState([]);
  // console.log("ID",id);
  useEffect(
    () => {
      const getSeatsNumbers = async () => {
        let go = false;
        let matchId=id; //"63ac971b639a27ff64cb629d";
        // console.log("Token ", matchId);
        await axios
          .get(`http://localhost:3001/fan/viewSeats/${matchId}`, {
            headers: {
              // header of request  | if Needed
              authToken: accessToken,
            },
            //body of request
          })
          .then((response) => {
            // Body of response
            // console.log(response);
            if (response.status === 200) {
              go = true;
              const seatNumberServer = response.data;
              setSeatNumbers(seatNumberServer);
            } else {
              go = false;
            }
          });

        // return go
      };
      getSeatsNumbers();
    },
    [
      /* dependency array (value when it changes we want the code to run) */
    ]
  );
  return seatNumbers;
};

export default FanPageServices;
