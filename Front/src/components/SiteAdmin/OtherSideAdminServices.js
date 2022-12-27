import axios from "axios";


const accessToken = localStorage.getItem("AccessToken");

const OtherSiteAdminServices =  {
    acceptRequest: async (_id) => {
        let go = false;
        await axios
            .put(`http://localhost:3001/admin/approveAuthority?id=${_id}`,{}, {
                headers: {
                    // header of request  | if Needed
                    authToken: accessToken,
                  },
                //body of request
                

            })
            .then((response) => {
                // Body of response
                console.log(response);
                if (response.status === 201) {
                  go = true;
            
                } else { go = false; }
            });

        return go
    },
    declineRequest: async (_id) => {
        let go = false;
        await axios
            .put(`http://localhost:3001/admin/declineAuthority?id=${_id}`,{}, {
                headers: {
                    // header of request  | if Needed
                    authToken: accessToken,
                  },
                //body of request
                

            })
            .then((response) => {
                // Body of response
                console.log(response);
                if (response.status === 200) {
                  go = true;
            
                } else { go = false; }
            });

        return go
    },
    deleteUser: async (_id) => {
        let go = false;
        const customerId=_id
        await axios
            .delete(`http://localhost:3001/admin/deleteCustomer/${customerId}`, {
                headers: {
                    // header of request  | if Needed
                    authToken: accessToken,
                  },
                //   params:{
                //         customerId: _id
                //   },
                //body of request
                

            })
            .then((response) => {
                // Body of response
                console.log(response);
                if (response.status === 202) {
                  go = true;
            
                } else { go = false; }
            });

        return go
    },
}
 
export default OtherSiteAdminServices;