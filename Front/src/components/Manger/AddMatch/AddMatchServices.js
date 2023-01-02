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
        try{
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
              alert("Successfully created a new match!");
              go = true;
            } else {
              go = false;
            }
          });
    
        return go;
        }
      catch(error)
      {
        console.log(error.response.data)
        alert(error.response.data);
      }  
      },

      edit: async (_id,
        venue,
        mainReferee,
        linesMen,
        dateAndTime,
        teams,
    ) => {
        let go = false;
        const matchId = _id;
        await axios
          .put(`http://localhost:3001/manager/editMatch/${matchId}`,{venue,
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

        
}
export default AddMatchServices