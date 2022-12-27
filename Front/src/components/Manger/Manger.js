import "./Manger.css"
import "bootstrap/dist/css/bootstrap.min.css";
import FIFA from "../images/FIFA.png";
import { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';

import AddMatchForm from "./AddMatch/AddMatchForm";
import ViewMatchDetails from "./View-Match-Details-Manager/ViewMatchDetails";
import AddStadium from "./AddSatdium/AddStadium";


function Manger() {

    const [openAddMatchForm, setAddMatchForm] = useState(false);
    const [openEditMatchForm, setEditMatchForm] = useState(false);
    const [openAddStadForm, setAddStadForm] = useState(false);
    const [openViewMatch, setViewMatch] = useState(false);
    const [openViewSeats, setViewSeats] = useState(false);




    return (
        <div className="container-fluid row manger" >
            <div className="left-cont col-7">
                <h1>HELLO.....</h1>
                {/* add match functionality */}
                <button
                    onClick={() => setAddMatchForm(!openAddMatchForm)}
                    aria-controls="add-match-form"
                    aria-expanded={openAddMatchForm}
                    className="mangerButtons"
                >
                    Add Match
                </button>
                <Collapse in={openAddMatchForm}>
                    <div id="add-match-form">
                        <AddMatchForm />
                    </div>
                </Collapse>

                {/* Edit existing match details */}
                <button
                    onClick={() => setEditMatchForm(!openEditMatchForm)}
                    aria-controls="add-match-form"
                    aria-expanded={openEditMatchForm}
                    className="mangerButtons"
                >
                    Edit Match
                </button>
                <Collapse in={openEditMatchForm}>
                    <div id="add-match-form">
                        {/* <AddMatchForm /> */}
                    </div>
                </Collapse>

                {/* adding a new stadium */}
                <button
                    onClick={() => setAddStadForm(!openAddStadForm)}
                    aria-controls="add-match-form"
                    aria-expanded={openAddStadForm}
                    className="mangerButtons"
                >
                    Add Stadium
                </button>
                <Collapse in={openAddStadForm}>
                    <div id="add-match-form">
                        <AddStadium />
                    </div>
                </Collapse>

                {/* view match details */}
                <button
                    onClick={() => setViewMatch(!openViewMatch)}
                    aria-controls="add-match-form"
                    aria-expanded={openViewMatch}
                    className="mangerButtons"
                >
                   View Match Details 
                </button>
                <Collapse in={openViewMatch}>
                    <div id="add-match-form">
                        <ViewMatchDetails />
                    </div>
                </Collapse>

                {/* view vacant and reserved seat */}
                <button
                    onClick={() => setViewSeats(!openViewSeats)}
                    aria-controls="add-match-form"
                    aria-expanded={openViewSeats}
                    className="mangerButtons"
                >
                   View Vacant & Reserved Seats 
                </button>
                <Collapse in={openViewSeats}>
                    <div id="add-match-form">
                        <h1>Seats details</h1>
                    </div>
                </Collapse>






            </div>
            <div className="right-cont col-5 d-md-none d-none d-lg-block">
                <img src={FIFA} className="img-fifa-manger img-fluid float-left" alt="" />
            </div>
        </div>
    )
}

export default Manger