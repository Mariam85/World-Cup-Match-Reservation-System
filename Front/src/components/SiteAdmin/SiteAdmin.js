import "./SiteAdmin.css";
import TaskItem from "./Task-Item/Task-Item";
import PAGE2022 from "../images/PagesCUP.gif";

const SiteAdmin = () => {
  return (
    <div className="container-fluid SiteAdminPage ">
      <div className="leftDataContainerAdmin col d-lg-block">
        {/* LeftSide */}
        <h1 className="h1HelloMsgAdmin">Hello Admin</h1>
        <h2 className="h2RequestsAdmin">Requests</h2>
        <div className="LeftDataAdmin justify-content-center">
            {/* <h1>Content</h1> */}
            <TaskItem/>
        </div>
      </div>

      <div className="rightImgContainerAdmin col-4 d-sm-none d-none d-lg-block ">
        {/* RightSide */}
        <img src={PAGE2022} className="imgFIFAdmin float-right img-fluid" alt="" />
        </div>
    </div>
  );
};

export default SiteAdmin;
