import React, { useState } from "react";
import {
  FaBars,
  FaTh,
  FaUserNurse,
  FaMoneyCheckAlt,
  FaBook,
  FaStickyNote,
  FaSignOutAlt,
  FaTrain,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../common/logo.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";
import { useNavigate } from "react-router-dom";

const menuItem = [
  {
    path: "/admin/Dashboard",
    name: "Dashboard",
    icon: <FaTh />,
  },
  {
    path: "/admin/StationMastersPage",
    name: "Station Masters",
    icon: <FaUserNurse />,
  },

  {
    path: "/admin/TrainTicketIncome",
    name: "Earnings",
    icon: <FaMoneyCheckAlt />,
  },
  {
    path: "/admin/ReportPage",
    name: "Reports",
    icon: <FaBook />,
  },
  {
    path: "/admin/ComplaintsPage",
    name: "Complaints",
    icon: <FaStickyNote />,
  },
  // {
  //   path: "/admin/viewTraindelays",
  //   name: "Train Delays",
  //   icon: <FaTrain />,
  // },
];





const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [activeItem, setActiveItem] = useState(menuItem[0].path);

  // const menuItem = [
  //   {
  //     path: "/admin/Dashboard",
  //     name: "Dashboard",
  //     icon: <FaTh />,
  //   },
  //   {
  //     path: "/admin/StationMastersPage",
  //     name: "Station Masters",
  //     icon: <FaUserNurse />,
  //   },

  //   {
  //     path: "/admin/TrainTicketIncome",
  //     name: "Earnings",
  //     icon: <FaMoneyCheckAlt />,
  //   },
  //   {
  //     path: "/admin/ReportPage",
  //     name: "Reports",
  //     icon: <FaBook />,
  //   },
  //   {
  //     path: "/admin/ComplaintsPage",
  //     name: "Complaints",
  //     icon: <FaStickyNote />,
  //   },
  //   {
  //     path: "/admin/ViewDelays",
  //     name: "Train Delays",
  //     icon: <FaTrain/>,
  //   },
  // ];


  const handleSignOut = async () => {
    try {
      // Send a sign-out request to your server if needed
      // For example, you can use axios like in your Header component
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      // For example, you might want to dispatch an action to update your Redux state.
      dispatch(authActions.logout());

      // Remove access token from local storage
      localStorage.removeItem("accessToken");

      // Redirect the user to the login page or home page
      history.push("/"); // If using React Router, uncomment this line
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container">
      <div style={{ width: isOpen ? "18%" : "50px" }} className="sidebar">

        <div
          style={{
            marginLeft: isOpen ? "85%" : "30%",
            marginTop: "8%",
          }}
          className="bars grey-text"
        >
          <FaBars onClick={toggle} />
        </div>
        <div className="top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            src={Logo}
            width={125}
            alt="logo"
            className="logo"
          />

        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`link grey-text ${activeItem === item.path ? "active" : ""}`}
            activeClassName="active"
            onClick={() => setActiveItem(item.path)}
          >
            <div className={`icon grey-text ${activeItem === item.path ? "active" : ""}`}>{item.icon}</div>
            <div
              style={{
                display: isOpen ? "block" : "none",

              }}
              className="link_text grey-text"
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
            onClick={handleSignOut}
          >
            <div className="icon grey-text" style={{ marginLeft: "14px" }}>
              {<FaSignOutAlt className="black-icon" />}
            </div>
            <div
              style={{
                display: isOpen ? "block" : "none",
                marginLeft: "10px",
              }}
              className="link_text"
            >
              Sign Out
            </div>
          </button>
        </div>
      </div>

      <main className="cc-main">{children}</main>
    </div>
  );
};

export default Sidebar;
