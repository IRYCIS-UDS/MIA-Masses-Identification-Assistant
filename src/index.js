import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter } from "react-router-dom";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
/* (🔻) AUTENTICACION DESHABILITADA
// import keycloak from './keycloak';
// import { ReactKeycloakProvider } from '@react-keycloak/web'; */

const root = ReactDOM.createRoot(document.getElementById('root'));

// (🔹) MODO ESTÁTICO (sin autenticación):
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// COMENTADO service worker si no es necesario ahora
/*
serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  },
});
*/
