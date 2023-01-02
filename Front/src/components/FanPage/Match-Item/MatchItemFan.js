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
                <small><b>Date and time:</b> {Request.dateAndTime}</small>
                <br />
                <small><b>Stadium:</b> {Request.venue}</small>
                <br />
                <small><b>Linesmen:</b> {Request.linesMen[0]} and {Request.linesMen[1]}</small>
                <br/>
                <small><b>Main Refree:</b> {Request.mainReferee}</small>

            </div>
            {/* {isShown && <AddMatchForm  _id={Request._id} type ={false}/>} */}
            {isShown1 &&<Reservation  seatsRows={seatRows} id={id}/>}
        </div>

    );
};

export default MatchItemFan