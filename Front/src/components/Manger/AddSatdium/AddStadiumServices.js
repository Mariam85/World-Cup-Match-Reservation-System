import axios from "axios"

const AddStadiumServices = {
    add: async (
        stadium,
        seatsPerRow,
        numberOfRows,
    ) => {
        let go = false;
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
                if (response.status === 200) {
                    go = true;
                    const alert = useAlert();
                    // alert.show(response.data)
                } else {
                    go = false;
                }
            });

        return go;
    },

}
export default AddStadiumServices