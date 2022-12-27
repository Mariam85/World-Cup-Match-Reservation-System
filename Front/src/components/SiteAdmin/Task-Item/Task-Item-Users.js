import { useState } from "react";
import OtherSiteAdminServices from "../OtherSideAdminServices";

import "./Task-Item.css";
import Button from "react-bootstrap/Button";

const TaskItemUsers = ({Request}) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
    
    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  const handleClickDelete = (event) => {
    // 👇️ Log
    console.log("Delete");
    OtherSiteAdminServices.deleteUser(Request._id)
  };
  // const [style, setStyle] = useState("userNameAdmin");
  // const changeStyle = () => {
  //   console.log("you just clicked");
  
  //   setStyle("userNameAdminActive");
  // };


  return (
    <div className="TaskAdmin">
      <div className="TaskHeader" onClick={handleClick}>
        <h1 className="userNameAdmin">{Request.userName}</h1>
      </div>

      {isShown && (
        <div className="TaskContent">
          <div className="UserInfoAdmin">
            <h4 className="nameAdmin">{Request.firstName} {Request.lastName}</h4>
            <h4 className="otherInfoAdmin">{Request.role}</h4>
          </div>
          <div className="buttonsAdmins">
            <Button
              className="DeclineButtonAdmin"
              variant="outline-danger"
              onClick={handleClickDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItemUsers;
