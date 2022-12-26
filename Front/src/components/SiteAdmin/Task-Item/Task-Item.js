import { useState } from "react";

import "./Task-Item.css";
import Button from "react-bootstrap/Button";

const TaskItem = () => {
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
  };
  const handleClickDecline = (event) => {
    // 👇️ Log
    console.log("Decline");
  };
  return (
    <div className="TaskAdmin">
      <div className="TaskHeader" onClick={handleClick}>
        <h1 className="userNameAdmin">SaraOsama</h1>
      </div>

      {isShown && (
        <div className="TaskContent">
          <div className="UserInfoAdmin">
            <h4 className="nameAdmin">Name: Sarah Osama</h4>
            <h4 className="otherInfoAdmin">Nationality: Egyptian</h4>
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
