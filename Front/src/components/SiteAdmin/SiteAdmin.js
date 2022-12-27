import "./SiteAdmin.css";
import TaskItem from "./Task-Item/Task-Item";
import PAGE2022 from "../images/PagesCUP.gif";
import SiteAdminServices from "./SiteAdminServices";
import SiteAdminGetUsersServices from "./SiteAdminGetUsersServices";
import Tasks from "./Tasks";
import { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";

const SiteAdmin = () => {
  useEffect;
  const Requests = SiteAdminServices();
  const Users = SiteAdminGetUsersServices();
  // console.log("requests", Requests);
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

          {isShown1 && <Tasks tasks={Requests} type={true} />}

          <button
            onClick={handleClick2}
            aria-controls="add-match-form"
            // aria-expanded={openAddMatchForm}
            className="buttonsAdmin"
          >
            View Users
          </button>

          {isShown2 && <Tasks tasks={Users} type={false}/>}

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

export default SiteAdmin;
