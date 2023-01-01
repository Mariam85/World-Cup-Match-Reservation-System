import axios from "axios";

const accessToken = localStorage.getItem("AccessToken");

const OtherFanPageServices = {
  ReserveSeat: async (matchId, seatNumber) => {
    let go = false;
    console.log("id ", matchId, " Seat ", seatNumber);
    await axios
      .post(
        `http://localhost:3001/fan/reserve/${matchId}/${seatNumber}`,
        {},
        {
          headers: {
            // header of request  | if Needed
            authToken: accessToken,
          },
          //body of request
        }
      )
      .then((response) => {
        // Body of response
        console.log(response);
        if (response.status === 201) {
          go = true;
        } else {
          go = false;
        }
      });

    return go;
  },
  editFanData: async (
      password,
      firstName,
      lastName,
      birthdate,
      gender,
      nationality,
      
  ) => {
    let go = false;
    
    await axios
      .patch(
        `http://localhost:3001/fan/editProfile`,
        {
            
            firstName,
            lastName,
            birthdate,
            gender,
            nationality,
            password,
            
        },
        {
          headers: {
            // header of request  | if Needed
            authToken: localStorage.getItem("AccessToken"),
            "content-type": "application/json",
          },
          //body of request
          
          firstName,
          lastName,
          birthdate,
          gender,
          nationality,
          password,
          
        }
      )
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

export default OtherFanPageServices;
