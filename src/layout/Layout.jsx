import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Container } from "react-bootstrap";

const Layout = ({ sidebarOpen, toggleSidebar, handleDownload, closeSession, preferred_username }) => {
  return (
    <Container className="App">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} download={handleDownload} />
      <div className="main-content">
        <Header name={preferred_username} closeSession={closeSession} />
        {/* Aquí se renderizan todas las rutas hijas */}
        <Outlet />
      </div>
    </Container>
  );
};

export default Layout;
