import "./FanPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PAGE2022 from "../images/PagesCUP.gif";
import Reservation from "./Reservation";
import MatchItemFan from "./Match-Item/MatchItemFan";
import FanPageServices from "./FanPageServices";
import { useState } from "react";
import ViewMatchDetailsFans from "./View-Match-Details-Fan/ViewMatchDetailsFan";
import EditUserDetails from "./EditUserDetails/EditUserDetails";


const FanPage = () => {



    const [isShown1, setIsShown1] = useState(false);
    const [isShown2, setIsShown2] = useState(false);

    const handleClick1 = (event) => {
      // 👇️ toggle shown state
      setIsShown1((current) => !current);
      setIsShown2(false);
    };
    const handleClick2 = (event) => {
      // 👇️ toggle shown state
      setIsShown2((current) => !current);
      setIsShown1(false);
    };
  return (
    <div className="container-fluid SiteAdminPage ">
      <div className="leftDataContainerAdmin col d-lg-block">
        {/* LeftSide */}
        <h1 className="h1HelloMsgAdmin">Hello Fan</h1>
        <h2 className="h2RequestsAdmin">Happy Game</h2>
        <div className="LeftDataAdmin ">
          {/* <h1>Content</h1> */}
          <button
            onClick={handleClick1}
            aria-controls="add-match-form"
            // aria-expanded={openAddMatchForm}
            className="buttonsAdmin"
          >
            View Matchs 
          </button>

          {/* { <Reservation  seatsRows={seatRows}/>} */}
          {/* {isShown1 &&<Reservation  seatsRows={seatRows}/>} */}
          {isShown1 &&<ViewMatchDetailsFans/>}

          <button
            onClick={handleClick2}
            aria-controls="add-match-form"
            // aria-expanded={openAddMatchForm}
            className="buttonsAdmin"
          >
            Edit Profile
          </button>

          {isShown2 && <EditUserDetails/>}
        </div>
      </div>

      <div className="rightImgContainerAdmin col-4 d-sm-none d-none d-lg-block ">
        {/* RightSide */}
        <img
          src={PAGE2022}
          className="imgFIFAdmin float-right img-fluid"
          alt=""
        />
      </div>
    </div>
  );
};

export default FanPage;
