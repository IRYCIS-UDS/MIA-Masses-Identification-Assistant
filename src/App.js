/* (🔻) AUTENTICACION DESHABILITADA (bloques de Keycloak, roles y llamadas al backend) */

// import { useKeycloak } from "@react-keycloak/web";
import { Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HomeScreen from "./screens/MainScreen";
import QuestionnaireScreen from "./screens/QuestionnaireScreen";
import GenerateReportScreen from "./screens/GenerateReportScreen";
import Layout from "./layout/Layout";
/* import ResponsesScreen from "./screens/ResponsesScreen"; */
/* import DownloadScreen from "./screens/DownloadScreen"; */
/* import EncountersScreen from "./screens/EncountersScreen"; */
/* import ApiService from "./services/ApiService"; */
=======
>>>>>>> Stashed changes
import { useState } from "react";
import "./App.css";
import { MainScreen, MassesReportScreen } from "./screens";
import Layout from "./layout/Layout";

// 🧩 Simulación de autenticación eliminada
// Creamos un usuario ficticio para que la interfaz tenga algo que mostrar
const fakeKeycloak = {
  token: "fake-token",
  authenticated: true,
  tokenParsed: {
    preferred_username: "demo_user",
    given_name: "Demo",
    family_name: "User",
  },
};

function App() {
  /* (🔻) AUTENTICACION DESHABILITADA:
  const { keycloak, initialized } = useKeycloak();
  const [isAdmin, setIsAdmin] = useState(false);
  const [practitioner, setPractitioner] = useState("");
  const [practitionerName, setPractitionerName] = useState("");
  */

  // Sustituimos los valores anteriores por datos simulados
  const [isAdmin] = useState(true);
  const [practitionerName] = useState("Demo User");

  const [sidebarOpen, setSidebarOpen] = useState(false);
<<<<<<< Updated upstream
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /* (🔻) AUTENTICACION DESHABILITADA:
  const handleDownload = async () => {
    ...
  };
  */

  // Simulación de funciones eliminadas para evitar errores en Layout
  const handleDownload = () => {
    console.log("Simulando descarga de CSV (autenticación deshabilitada)");
  };

  const closeSession = () => {
    console.log("Simulando cierre de sesión (autenticación deshabilitada)");
  };

  /* (🔻) AUTENTICACION DESHABILITADA:
  useEffect(() => {
    ...
  }, [initialized, keycloak, setIsAdmin, setPractitioner, setPractitionerName]);
  */

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}

              // 🧩 Pasamos props simuladas para que el Layout funcione sin keycloak
              handleDownload={handleDownload}
              closeSession={closeSession}
              preferred_username={practitionerName}
              isAdmin={isAdmin}
            />
          }
        >
          <Route
            index
            element={
              <HomeScreen
                // 🧩 Props simuladas
                keycloak={fakeKeycloak}
                practitionerName={practitionerName}
                isAdmin={isAdmin}
              />
            }
          />
          <Route path="/questionnaire" element={<QuestionnaireScreen />} />
          <Route path="/generate-report" element={<GenerateReportScreen />} />
          {/* (🔻) AUTENTICACION DESHABILITADA:
          <Route path="/responses" element={<ResponsesScreen />} />
          <Route path="/download" element={<DownloadScreen />} />
          <Route path="/encounters" element={<EncountersScreen />} />
          */}
        </Route>
      </Routes>
    </>
=======

  // Función simplificada: ahora solo cambia el estado booleano
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // ELIMINAR nombre de usuario simulado:
  const userName = "Usuario Demo"; 

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}

            // ELIMINAR nombre de usuario simulado:
            userName={userName}
          />
        }
      >
        {/* SCREENS: */}
        <Route index element={<MainScreen />} />
        <Route path="masses" element={<MassesReportScreen />} />
      </Route>
    </Routes>
>>>>>>> Stashed changes
  );
}

export default App;