import "./FanPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PAGE2022 from "../images/PagesCUP.gif";
import Reservation from "./Reservation";
import FanPageServices from "./FanPageServices";
import { useState } from "react";



const FanPage = () => {

    const seatRows= FanPageServices();


    const [isShown1, setIsShown1] = useState(false);

  const handleClick1 = (event) => {
    // 👇️ toggle shown state
    setIsShown1((current) => !current);

  };
  return (
    <div className="container-fluid SiteAdminPage ">
      <div className="leftDataContainerAdmin col d-lg-block">
        {/* LeftSide */}
        <h1 className="h1HelloMsgAdmin">Hello Admin</h1>
        <h2 className="h2RequestsAdmin">Requests</h2>
        <div className="LeftDataAdmin ">
          {/* <h1>Content</h1> */}
          <button
            onClick={handleClick1}
            aria-controls="add-match-form"
            // aria-expanded={openAddMatchForm}
            className="buttonsAdmin"
          >
            View Requests
          </button>

          {/* { <Reservation  seatsRows={seatRows}/>} */}
          {isShown1 &&<Reservation  seatsRows={seatRows}/>}

          <button
            // onClick={handleClick2}
            aria-controls="add-match-form"
            // aria-expanded={openAddMatchForm}
            className="buttonsAdmin"
          >
            View Users
          </button>

          {/* {isShown2 && <Tasks tasks={Users} type={false}/>} */}
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
