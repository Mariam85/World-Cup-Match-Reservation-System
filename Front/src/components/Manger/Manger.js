import "./Manger.css"
import "bootstrap/dist/css/bootstrap.min.css";
import FIFA from "../images/FIFA.png";
import PAGE2022 from "../images/PagesCUP.gif";
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
    const id = ""



    return (
        <div className="container-fluid row manger " >
            <div className="left-cont col-8">
                <h1 className="hello-manger">HELLO Manager</h1>
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
                        <AddMatchForm 
                        _id={id}
                        type={true}
                        />
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
            <div className="right-cont col-4 d-md-none d-none d-lg-block">
                <img src={PAGE2022} className="img-fifa-manger img-fluid float-left" alt="" />
            </div>
        </div>
    )
}

export default Manger