import { useState } from "react"
import "./AddStadium.css"
import AddStadiumServices from "./AddStadiumServices";

function AddStadium() {
    const [stadium,  setStadium] = useState();
    const [seatsPerRow, setSeatsPerRow] = useState();
    const [numberOfRows, setNumberOfRows] = useState();

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("HandleSubmit AddStadium");
        console.log("stadium 👉️", stadium);
        console.log("seatsPerRow 👉️", seatsPerRow);
        console.log("numberOfRows  👉️", numberOfRows);



        AddStadiumServices.add(
            stadium,
            seatsPerRow,
            numberOfRows,
        )


        // setVenue("");
        // setMainReferee("");
        // setLine1("");
        // setLine2("");
        // setDate("");
        // setTime("");
        // setTeam1("");
        // setTeam2("");
    }




    return (

        <div className="container-fluid">
            <form
                onSubmit={handleSubmit}
                className="addMatchFormContainer"
            >
                <h2 className="h2FIFAddMatch">Stadium Info</h2>
                {/* stadium name */}
                <div className="addMatchInputs">
                    <label className="addMatchLabel">Stadium name</label>
                    <br />
                    <input
                        required
                        type="text"
                        name="stadium"
                        className="addMatchInput"
                        placeholder="eg. new stadium"
                        onChange={(event) => setStadium(event.target.value)}
                        value={stadium}
                    />
                </div>
                {/* seats per row */}
                <div className="addMatchInputs">
                    <label className="addMatchLabel">Seats per row</label>
                    <br />
                    <input
                        required
                        type="number"
                        min="1"
                        max="20"
                        name="seatsPerRow"
                        className="addMatchInput"
                        placeholder="eg. 5"
                        onChange={(event) => setSeatsPerRow(event.target.value)}
                        value={seatsPerRow}
                    />
                    <span> 1 to 20 seats</span>
                </div>
                {/* number of rows */}
                <div className="addMatchInputs">
                    <label className="addMatchLabel">Number of rows</label>
                    <br />
                    <input
                        required
                        type="number"
                        min="1"
                        max="30"
                        name="stadium"
                        className="addMatchInput"
                        placeholder="eg. 10"
                        onChange={(event) => setNumberOfRows(event.target.value)}
                        value={numberOfRows}
                    />
                    <span> 1 to 30 rows</span>
                </div>
                <button className="addButton" type="submit">
                    Add
                </button>




            </form>
        </div>
    )
}

export default AddStadium