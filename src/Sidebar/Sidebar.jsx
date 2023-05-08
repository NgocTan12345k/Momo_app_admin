import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill, BsFillFilePostFill } from "react-icons/bs";
import { FaUserAlt, FaDonate } from "react-icons/fa";
import { BiLogIn, BiRegistered } from "react-icons/bi";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import "./Sidebar.scss";

const SidebarComponent = () => {
  return (
    <>
      <div
        className="left-sidebar"
        style={{
          display: "flex",
          height: "100%",
          minHeight: "400px",
        }}
      >
        <Sidebar
          breakPoint="always"
          className="left-sidebar__item"
          backgroundColor="none"
        >
          <Menu
            className="center"
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0) {
                  return {
                    color: disabled ? "#eee" : "#455A64",
                    backgroundColor: active ? "#fff" : undefined,
                    "&:hover": {
                      backgroundColor: "#0dcaf0 !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      fontWeight: "bold !important",
                    },
                  };
                }
              },
            }}
          >
            <SubMenu label="MAIN">
              <MenuItem>
                <Link
                  // style={{ color: "#000", textDecoration: "none" }}
                  to="/"
                >
                  <BsFillHouseDoorFill className="icon" />
                  <span>Dashboard</span>
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu label="LIST">
              <MenuItem>
                <Link
                  // style={{ color: "#000", textDecoration: "none" }}
                  to="/users"
                >
                  <FaUserAlt className="icon" />
                  <span>Users</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  // style={{ color: "#000", textDecoration: "none" }}
                  to="/donations"
                >
                  <FaDonate className="icon" />
                  <span>Donations</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  // style={{ color: "#000", textDecoration: "none" }}
                  to="/posts"
                >
                  <BsFillFilePostFill className="icon" />
                  <span>Post</span>
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu label="AUTHENTICATION">
              <MenuItem>
                <Link
                  // style={{ color: "#000", textDecoration: "none" }}
                  to="/login"
                >
                  <BiLogIn className="icon" />
                  <span>Log in</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  // style={{ color: "#000", textDecoration: "none" }}
                  to="/register"
                >
                  <BiRegistered className="icon" />
                  <span>Register</span>
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};
export default SidebarComponent;
