import { useState } from "react"
import "./AddMatchForm.css"
import AddMatchServices from "./AddMatchServices";
import GetTeam from "./GetTeams";
import GetStadium from "./GetStadiums";

const AddMatchForm = ({ _id, type }) => {

    const [venue, setVenue] = useState();
    const [mainReferee, setMainReferee] = useState();
    const [line1, setLine1] = useState();
    const [line2, setLine2] = useState();
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();
    const [dateAndTime, setDateandtime] = useState();
    const [time, setTime] = useState();


    const currentTeams = GetTeam();
    const Add = currentTeams.map(Add => Add)

    const currentStadium = GetStadium();
    const stad = currentStadium.map(Add => Add)


    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("HandleSubmit AddMatch");


        const linesMen = [line1, line2]
        const teams = [team1, team2]
        setDateandtime(new Date(time).toUTCString());

        console.log("venue 👉️", venue);
        console.log("mainReferee 👉️", mainReferee);
        console.log("LineMen  👉️", linesMen);
        console.log("treams 👉️", teams);
        console.log("dateAndTime 👉️", dateAndTime);



        AddMatchServices.add(
            venue,
            mainReferee,
            linesMen,
            dateAndTime,
            teams
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
    const handleEdit = (e) => {

        e.preventDefault();

        console.log("HandleSubmit Edit");

        const linesMen = [line1, line2]
        const teams = [team1, team2]
        setDateandtime(new Date(time).toUTCString());

        console.log("venue 👉️", venue);
        console.log("mainReferee 👉️", mainReferee);
        console.log("LineMen  👉️", linesMen);
        console.log("treams 👉️", teams);
        console.log("dateAndTime 👉️", dateAndTime);


        AddMatchServices.edit(_id,
            venue,
            mainReferee,
            linesMen,
            dateAndTime,
            teams
        )

        setVenue("");
        setMainReferee("");
        setLine1("");
        setLine2("");
        setDate("");
        setTime("");
        setTeam1("");
        setTeam2("");




    }

    return (
        <div className="container-fluid">
            <form
                className="addMatchFormContainer"
            // onSubmit={handleSubmit}
            >
                <h2 className="h2FIFAddMatch">Match Info</h2>

                <div className="inlineInput">
                    {/* venue  */}
                    <div className="addMatchInputs">
                        <label className="addMatchLabel">Stadium</label>
                        <br />
                        <select
                            name="venue"
                            className="addMatchInput"
                            onChange={(event) => setVenue(event.target.value)}
                            value={venue}
                        >

                            {
                                stad.map((address, key) => <option value={address.name}>{address.name}</option>)
                            }

                        </select>
                    </div>

                    <div className="addMatchInputs">
                        {/* mainRefree */}
                        <label className="addMatchLabel">Main refree</label>
                        <br />
                        <input
                            type="text"
                            name="mainReferee"
                            className="addMatchInput"
                            placeholder="eg. jack"
                            onChange={(event) => setMainReferee(event.target.value)}
                            value={mainReferee}

                        />
                    </div>
                </div>

                <div className="inlineInput">
                    {/* linesMen  */}
                    <div className="addMatchInputs">
                        <label className="addMatchLabel">Lineman 1</label>
                        <br />
                        <input
                            type="text"
                            name="line1"
                            className="addMatchInput"
                            placeholder="eg. Drake"
                            onChange={(event) => setLine1(event.target.value)}
                            value={line1}

                        />
                    </div>
                    <div>
                        <label className="addMatchLabel">Lineman 2</label>
                        <br />

                        <input
                            type="text"
                            name="linesMen"
                            className="addMatchInput"
                            placeholder="eg. Josh"
                            onChange={(event) => setLine2(event.target.value)}
                            value={line2}

                        />

                    </div>

                </div>
                <div className="inlineInput">

                    <div className="addMatchInputs">
                        {/* time */}
                        <label className="addMatchLabel">Time </label>
                        <br />
                        <input
                            type="datetime-local"
                            name="dateAndTime"
                            className="addMatchInput"
                            onChange={(event) => setTime(event.target.value)}
                            value={time}

                        />
                    </div>

                </div>

                <div className="inlineInput">
                    <div className="addMatchInputs">
                        {/* Team1 */}
                        <label className="addMatchLabel">Team 1</label>
                        <br />
                        <select
                            name="team1"
                            className="addMatchInput"
                            onChange={(event) => setTeam1(event.target.value)}
                            value={team1}
                        >

                            {
                                Add.map((address, key) => <option value={address.name}>{address.name}</option>)
                            }

                        </select>

                    </div>

                    <div className="addMatchInputs">
                        {/* Team2 */}
                        <label className="addMatchLabel">Team 2 </label>
                        <br />
                        <select
                            name="team2"
                            className="addMatchInput"
                            onChange={(event) => setTeam2(event.target.value)}
                            value={team2}
                        >

                            {
                                Add.map((address, key) => <option value={address.name}>{address.name}</option>)
                            }

                        </select>
                    </div>

                </div>
                {type && <button className="addButton" onClick={handleSubmit}>
                    Add
                </button>
                }
                {!type && <button className="addButton" onClick={handleEdit}>
                    Edit
                </button>}
            </form>
        </div>
    )
}

export default AddMatchForm