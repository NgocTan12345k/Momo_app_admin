import "./Header.scss";
import logo from "../images/logo_admin.jpeg";
import { IoIosMenu } from "react-icons/io";
import { BsMoon, BsClockHistory } from "react-icons/bs";
import { MdLogout, MdOutlineChangeCircle } from "react-icons/md";
import { UncontrolledCollapse, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import logo_user from "../images/logo_user.png";
import { useProSidebar } from "react-pro-sidebar";
import { useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import AuthAPI from "../API/AuthAPI";

const Header = () => {
  const { toggleSidebar } = useProSidebar();
  const user = localStorage.getItem("currentUser");
  const user_id = localStorage.getItem("userID");
  const { dispatch } = useContext(DarkModeContext);
  const handleLogout = async () => {
    await AuthAPI.Logout()
      .then((res) => {
        console.log("res-->", res.data);
        const result =
          res && res.data && res.data.message ? res.data.message : "";
        if (result === "logged out successfully") {
          localStorage.clear();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="headerContainer">
      <div className="left">
        <div className="left_item">
          <div>
            <button onClick={() => toggleSidebar()}>
              <IoIosMenu className="icon" />
            </button>
          </div>
        </div>
        <div className="left_item">
          <Link to="/">
            <div className="logo_img">
              <img src={logo} alt="logo" />
            </div>
          </Link>
        </div>
      </div>
      <div className="right">
        <div className="right_item">
          <BsMoon
            className="icon"
            onClick={() => dispatch({ type: "TOGGLE" })}
          />
        </div>
        <div className="right_item">
          <p> Hello {user ? user : "admin"} </p>
        </div>
        <div className="right_item">
          <Button
            color="white"
            id="toggler"
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            <img src={logo_user} alt="logo" />
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            <Card
              style={{
                position: "absolute",
                right: "30px",
                top: "60px",
                zIndex: "999",
              }}
            >
              <CardBody>
                {" "}
                <BsClockHistory className="icon" />
                <Link
                  style={{ color: "#000", textDecoration: "none" }}
                  to={`/history/${user_id}`}
                >
                  <span>History</span>
                </Link>
              </CardBody>
              <CardBody>
                <MdOutlineChangeCircle className="icon" />
                <Link
                  style={{ color: "#000", textDecoration: "none" }}
                  to="/users/changePassword"
                >
                  <span>Change Password</span>{" "}
                </Link>
              </CardBody>
              <CardBody>
                <MdLogout className="icon" />
                <Link
                  style={{ color: "#000", textDecoration: "none" }}
                  onClick={handleLogout}
                  to="/login"
                >
                  <span>Log out</span>{" "}
                </Link>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </div>
      </div>
    </div>
  );
};

export default Header;
