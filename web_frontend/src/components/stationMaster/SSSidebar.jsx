import React, { useState } from "react";
import {
  FaTh ,
  FaBars,
  FaBell,
  FaTrain,
  FaPersonBooth,
  FaLocationArrow,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../common/logoText.png";
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/ss/SMDashboard",
      name: "Dashboard",
      icon: <FaTh  />,
    },
    {
      path: "/ss/addcheckerclerk",
      name: "Add Checker/Clerk",
      icon: <FaBell />,
    },
    {
      path: "/ss/TrainDelays",
      name: "Train Delays",
      icon: <FaTrain />,
    },
    {
      path: "/ss/EmployeeDetails",
      name: "Employees",
      icon: <FaPersonBooth />,
    },
    // {
    //   path: "/ss/Traindetails",
    //   name: "Train Info",
    //   icon: <FaLocationArrow />,
    // },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            src={Logo}
            width={125}
            alt="logo"
            className="logo"
          />
          <div
            style={{ marginLeft: isOpen ? "25px" : "0px", marginTop: "5px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}

        <div
          style={{
            marginTop: "100px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <button
            className="signout"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="icon" style={{ marginLeft: "14px" }}>
              {<FaSignOutAlt />}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none", marginLeft: "10px" }}
              className="link_text"
            >
              Sign Out
            </div>
          </button>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
