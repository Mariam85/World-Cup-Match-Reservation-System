import axios from "axios"

const AddMatchServices = {
    add: async (
        venue,
        mainReferee,
        linesMen,
        dateAndTime,
        teams,
    ) => {
        let go = false;
        await axios
          .post("http://localhost:3001/manager/createMatch",{venue,
          mainReferee,
          linesMen,
          dateAndTime,
          teams,}, {
            headers: {
              // header of request  | if Needed
             'authToken': localStorage.getItem('AccessToken'),
             'content-type':'application/json'
            },
            //body of request
            venue,
            mainReferee,
            linesMen,
            dateAndTime,
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
        let re = [];
        await axios
          .get("http://localhost:3001/manager/teams", {
            headers: {
              // header of request  | if Needed
             authToken: localStorage.getItem('AccessToken')
            },
            //body of request
          })
          .then((response) => {
            // Body of response
            // console.log(response.data);
            if (response.status === 200) {
              go = true;
              re =response.data;
              console.log(re) 
            } else {
              go = false;
            }
          });
        return re;
      },
        
}
export default AddMatchServices