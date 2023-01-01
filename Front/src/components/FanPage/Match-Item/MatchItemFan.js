import "./MatchItemFan.css"
import Reservation from "../Reservation";
import FanPageServices from "../FanPageServices";
import { useState } from "react";

const MatchItemFan = ({ Request,id }) => {
    const [isShown1, setIsShown1] = useState(false)
    // console.log("IDfgjvh",id);
    const seatRows= FanPageServices(id);
    const HandleClick = () => {
        setIsShown1((current) => !current);
    }
    return (
        <div>
            <div onClick={HandleClick} className="matchItemFan">
                <h3>{Request.teams[0]} vs {Request.teams[1]} </h3>
                <small>{Request.dateAndTime}</small>
                <br/>
                <small>Venue {Request.venue}</small>

            </div>
            {/* {isShown && <AddMatchForm  _id={Request._id} type ={false}/>} */}
            {isShown1 &&<Reservation  seatsRows={seatRows} id={id}/>}
        </div>

    );
};

export default MatchItemFan