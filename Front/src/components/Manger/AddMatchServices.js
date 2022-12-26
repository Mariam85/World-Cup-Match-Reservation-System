import axios from "axios"

const AddMatchServices = {
    add: async (
        venue,
        mainReferee,
        lineMen,
        date,
        time,
        teams,
    ) => {
        let go = false;
        await axios
          .post("http://localhost:3001/manager/createMatch", {
            headers: {
              // header of request  | if Needed
             'x-auth-token': localStorage.getItem('AccessToken')
            },
            //body of request
            venue,
            mainReferee,
            lineMen,
            date,
            time,
            teams,
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

    getTeams: async (
    ) => {
        let go = false;
        await axios
          .get("http://localhost:3001/manager/teams", {
            headers: {
              // header of request  | if Needed
             'x-auth-token': localStorage.getItem('AccessToken')
            },
            //body of request
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
        
}
export default AddMatchServices