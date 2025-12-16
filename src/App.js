import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainScreen from "./screens/MainScreen"; // Menú principal
import MassesReportScreen from "./screens/MassesReportScreen"; // Formulario/Reporte
import Layout from "./layout/Layout";

import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDownload = () => console.log("Descarga simulada");
  const closeSession = () => console.log("Cierre de sesión");

  const preferred_username = "Demo User"; // Nombre de usuario fijo, ya no hay login

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            handleDownload={handleDownload}
            closeSession={closeSession}
            preferred_username={preferred_username}
          />
        }
      >
        <Route index element={<MainScreen />} />
        <Route path="masses" element={<MassesReportScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
