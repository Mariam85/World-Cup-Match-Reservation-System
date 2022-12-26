import { useState } from "react";
import OtherSiteAdminServices from "../OtherSideAdminServices";

import "./Task-Item.css";
import Button from "react-bootstrap/Button";

const TaskItem = ({Request}) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  const handleClickAccept = (event) => {
    // 👇️ Log
    console.log("Accept");
    OtherSiteAdminServices.acceptRequest(Request._id)
  };
  const handleClickDecline = (event) => {
    // 👇️ Log
    console.log("Decline");
    OtherSiteAdminServices.declineRequest(Request._id)
  };
  return (
    <div className="TaskAdmin">
      <div className="TaskHeader" onClick={handleClick}>
        <h1 className="userNameAdmin">{Request.userName}</h1>
      </div>

      {isShown && (
        <div className="TaskContent">
          <div className="UserInfoAdmin">
            <h4 className="nameAdmin">{Request.firstName} {Request.lastName}</h4>
            <h4 className="otherInfoAdmin">{Request.nationality}</h4>
          </div>
          <div className="buttonsAdmin">
            <Button
              className="AcceptButtonAdmin"
              variant="outline-success"
              onClick={handleClickAccept}
            >
              Accept
            </Button>
            <Button
              className="DeclineButtonAdmin"
              variant="outline-danger"
              onClick={handleClickDecline}
            >
              Decline
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
