import axios from "axios";
import { useState ,useEffect} from "react";

const accessToken = localStorage.getItem("AccessToken");

const FanPageServices = () => {
  const [seatNumbers, setSeatNumbers] = useState([]);
  useEffect(
    () => {
      const getSeatsNumbers = async () => {
        let go = false;
        let matchId="63ab4661233d11fc3f8d78ae";
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
