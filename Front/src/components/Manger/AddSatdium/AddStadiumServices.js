import axios from "axios"

const AddStadiumServices = {
    add: async (
        stadium,
        seatsPerRow,
        numberOfRows,
    ) => {
        let go = false;
        try{
        await axios
            .post("http://localhost:3001/manager/addStadium", {
                stadium,
                seatsPerRow,
                numberOfRows,
            }, {
                headers: {
                    // header of request  | if Needed
                    'authToken': localStorage.getItem('AccessToken'),
                    'content-type': 'application/json'
                },
                //body of request
                stadium,
                seatsPerRow,
                numberOfRows,
            })
            .then((response) => {
                // Body of response
                console.log(response);
                if (response.status === 201) {
                    go = true;
                    alert("Successfully added a new stadium!");
                    // const alert = useAlert();
                    // alert.show(response.data)
                } else {
                    go = false;
                    alert("Failed to add new stadium!");
                }
            });

        return go;
        }
        catch(error)
        {
            alert(error.response.data);
        }
    },

}
export default AddStadiumServices