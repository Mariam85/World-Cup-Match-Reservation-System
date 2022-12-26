import { useState } from "react"
import "./AddMatchForm.css"
import AddMatchServices from "./AddMatchServices";

function AddMatchForm() {

    const[venue , setVenue] = useState();
    const[mainReferee, setMainReferee] = useState();
    const[line1, setLine1] = useState();
    const[line2, setLine2] = useState();
    const[date, setDate] = useState();
    const[time, setTime] = useState();
    const[team1, setTeam1] = useState();
    const[team2, setTeam2] = useState();


    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("HandleSubmit AddMatch");
    
        console.log("venue 👉️", venue);
        console.log("mainReferee 👉️", mainReferee);
        console.log("line1  👉️", line1);
        console.log("line2 👉️", line2);
        console.log("date 👉️", date);
        console.log("time 👉️", time);
        console.log("team1 👉️", team1);
        console.log("team2 👉️", team2);

        const lineMen = [line1, line2]
        const teams = [team1, team2]

        console.log("lineMen 👉️", lineMen);
        console.log("teams 👉️", teams);

        AddMatchServices.add(
            venue,
            mainReferee,
            lineMen,
            date,
            time,
            teams
        )

        const currentTeams= AddMatchServices.getTeams()
        console.log(currentTeams)

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
                onSubmit={handleSubmit}
            >
                <h2 className="h2FIFAddMatch">Match Info</h2>

                <div className="inlineInput">
                    {/* venue  */}
                    <div className="addMatchInputs">
                        <label className="addMatchLabel">Stadium</label>
                        <br />
                        <input
                            type="text"
                            name="venue"
                            className="addMatchInput"
                            placeholder="eg. new stadium"
                            onChange={(event) => setVenue(event.target.value)}
                            value ={venue}
                        />
                    </div>

                    <div className="addMatchInputs">
                        {/* mainRefree */}
                        <label className="addMatchLabel">Main refree</label>
                        <br />
                        <input
                            type="text"
                            name="mainReferee"
                            className="addMatchInput"
                            placeholder="eg. Johnyy baiely"
                            onChange={(event) => setMainReferee(event.target.value)}
                            value ={mainReferee}

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
                        {/* dateAndTime */}
                        <label className="addMatchLabel">Date</label>
                        <br />
                        <input
                            type="date"
                            name="date"
                            className="addMatchInput"
                            onChange={(event) => setDate(event.target.value)}
                            value={date}

                        />
                    </div>

                    <div className="addMatchInputs">
                        {/* time */}
                        <label className="addMatchLabel">Time </label>
                        <br />
                        <input
                            type="time"
                            name="time"
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
                        <input
                            type="text"
                            name="team1"
                            className="addMatchInput"
                            placeholder="eg. Brazil "
                            onChange={(event) => setTeam1(event.target.value)}
                            value={team1}

                        />
                    </div>

                    <div className="addMatchInputs">
                        {/* Team2 */}
                        <label className="addMatchLabel">Team 2 </label>
                        <br />
                        <input
                            type="text"
                            name="team2"
                            className="addMatchInput"
                            placeholder="eg. Argentine "
                            onChange={(event) => setTeam2(event.target.value)}
                            value={team2}
                        />
                    </div>

                </div>
                <button className="addButton" type="submit">
                    Add
                </button>

            </form>
        </div>
    )
}

export default AddMatchForm