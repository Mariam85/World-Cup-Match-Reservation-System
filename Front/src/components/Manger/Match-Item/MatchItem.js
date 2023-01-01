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
                <small>{Request.dateAndTime}</small>
                <br />
                <small>{Request.venue}</small>

            </div>
            {isShown && <AddMatchForm  _id={Request._id} type ={false}/>}
        </div>

    );
};

export default MatchItem