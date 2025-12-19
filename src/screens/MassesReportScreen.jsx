import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/MainScreen.css";
import { Modal } from "bootstrap";
import LogoHRYC from "../assets/images/LogoHRYC.jpg";
import LogoIrycis from "../assets/images/logo-irycis.png";
import { Document, Page, Text, View, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import MassesFormContainer from "../components/masses-form/MassesFormContainer";

const MainScreen = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    codigo: "", edad: "", fur: "", indicacion: "", ecografista: "",
    hospital: "", experto: "", referencia: "", masa: "",
    conclusionEcografista: "",
    
    masas: [
      {
        id: Date.now(),
        localizacion: "", estructura: "", tipoLesion: "", contenido: "",
        sombra: "", parenquima: "", ascitis: "", carcinomatosis: "",
        anatomiaPatologica: "", medidaT: "", medidaAP: "", medidaL: "",
        medidaPosT: "", medidaPosAP: "", medidaPosL: "",
        tipoAscitis: "", indicaPatologia: "", lesionUltimoAnio: "",
        contornoExterno: "", vascularizacion: "",
        grosorPared: "", gradoVascularizacionPared: "",
        contornoInterno: "", papilas: "", tabiques: "", areaSolida: "",
        numeroPapilas: "", contornoPapilas: "", vascularizacionPapilas: "",
        medidaPapilasT: "", medidaPapilasAP: "",
        numeroLoculos: "", grosorTabiques: "", morfologiaTabiques: "",
        vascularizacionTabiques: "",
        numeroAreasSolidas: "", vascularizacionAreasSolidas: "",
        medidaASolidaT: "", medidaASolidaAP: "", medidaASolidaL: "",
        otroContenido: "", otraIndicacion: "", probabilidadMalignidad: "",
      }
    ],

    ovarioDerechoT: "", ovarioDerechoAP: "", foliculosOD: "",
    ovarioIzquierdoT: "", ovarioIzquierdoAP: "", foliculosOI: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const addMasa = () => {
    const nuevaMasa = {
      id: Date.now(),
      localizacion: "", estructura: "", tipoLesion: "", contenido: "",
      sombra: "", parenquima: "", ascitis: "", carcinomatosis: "",
      anatomiaPatologica: "", medidaT: "", medidaAP: "", medidaL: "",
      medidaPosT: "", medidaPosAP: "", medidaPosL: "",
      tipoAscitis: "", indicaPatologia: "", lesionUltimoAnio: "",
      contornoExterno: "", vascularizacion: "",
      grosorPared: "", gradoVascularizacionPared: "",
      contornoInterno: "", papilas: "", tabiques: "", areaSolida: "",
      numeroPapilas: "", contornoPapilas: "", vascularizacionPapilas: "",
      medidaPapilasT: "", medidaPapilasAP: "",
      numeroLoculos: "", grosorTabiques: "", morfologiaTabiques: "",
      vascularizacionTabiques: "",
      numeroAreasSolidas: "", vascularizacionAreasSolidas: "",
      medidaASolidaT: "", medidaASolidaAP: "", medidaASolidaL: "",
      otroContenido: "", otraIndicacion: "", probabilidadMalignidad: ""
    };

    setFormData(prev => ({
      ...prev,
      masas: [...prev.masas, nuevaMasa]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes validar campos generales si quieres
    console.log("Submit formData", formData);
    Modal.getOrCreateInstance(document.getElementById("confirmMassModal")).show();
  };

  const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Helvetica", fontSize: 10, lineHeight: 1.5, backgroundColor: "#fff" },
    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" },
    footer: { position: "absolute", bottom: 18, left: 30, right: 30, flexDirection: "row", justifyContent: "space-between", fontSize: 10, color: "gray" },
    logoHospi: { width: 150, height: 50, objectFit: "contain" },
    logoIrycis: { width: 120, height: 50, objectFit: "contain" },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 20 },
    subtitle: { fontSize: 12, fontWeight: "bold", marginTop: 10, marginBottom: 8 },
    bold: { fontWeight: "bold" },
    paragraph: { marginLeft: 10, marginBottom: 5 }
  });

  const makeMassesReport = async (formData) => {
    const doc = <Document><Page size="A4" style={styles.page}><Text>Reporte de ejemplo</Text></Page></Document>;
    const blob = await pdf(doc).toBlob();
    if (blob) saveAs(blob, "informe.pdf");
  };

  return (
    <main className="container mt-4">
      <MassesFormContainer
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        makeMassesReport={makeMassesReport}
        addMasa={addMasa}
      />
    </main>
  );
};

export default MainScreen;
