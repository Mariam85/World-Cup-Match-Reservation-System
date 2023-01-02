import "./MatchItem.css"
import AddMatchForm from "../AddMatch/AddMatchForm";
import { useState } from "react";

const MatchItem = ({ Request }) => {
    const [isShown, setIsShown] = useState(false)
    const HandleClick = () => {
        setIsShown((current) => !current);
    }
    return (
        <div>
            <div onClick={HandleClick} className="matchItem">
                <h3>{Request.teams[0]} vs {Request.teams[1]} </h3>
                <small><b>Date and time:</b> {Request.dateAndTime}</small>
                <br />
                <small><b>Stadium:</b> {Request.venue}</small>
                <br />
                <small><b>Linesmen:</b> {Request.linesMen[0]} and {Request.linesMen[1]}</small>
                <br/>
                <small><b>Main Refree:</b> {Request.mainReferee}</small>

            </div>
            {isShown && <AddMatchForm  _id={Request._id} type ={false}/>}
        </div>

    );
};

export default MatchItem