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

            </div>
            {isShown && <AddMatchForm />}
        </div>

    );
};

export default MatchItem