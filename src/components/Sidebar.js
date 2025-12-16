import React from "react";
import { useNavigate } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download";

import miaLogo from "../assets/images/logo-mia.png";
import "../assets/css/Sidebar.css";

const Sidebar = ({ sidebarOpen, toggleSidebar, download }) => {
  const navigate = useNavigate(); // Hook para navegación

  const goHome = () => navigate("/"); // Va al MainScreen

  return (
    <div className={`principalBox sidebar ${sidebarOpen ? "open" : ""}`}>
      <button className="close-sidebar-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
      </button>

      <img src={miaLogo} alt="miaLogo" className="logoMIA" />

      <div className="sections">
        {/* Botón de inicio */}
        <div className="sidebar-section">
          <ul>
            <li>
              <button
                onClick={goHome}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <HomeIcon sx={{ fontSize: 18, marginRight: 5 }} />
                Inicio
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
