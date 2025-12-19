import React, { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import GeneralSection from "./GeneralSection";

const MassesFormContainer = (props) => {
  const { formData, setFormData, handleSubmit, formErrors, makeMassesReport } = props;

  const [masas, setMasas] = React.useState([]);
  const masaIndexVisible = masas.length + 1;
  const [datosBloqueados, setDatosBloqueados] = React.useState(false);
  const [erroresMasaActual, setErroresMasaActual] = React.useState([]);
  const [formErrorsLocal, setFormErrorsLocal] = React.useState({});

  const conclusionRef = useRef();

  const showModal = (modalId) => {
    const modalEl = document.getElementById(modalId);
    if (modalEl) Modal.getOrCreateInstance(modalEl).show();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrorsLocal(prev => { const copy = { ...prev }; delete copy[name]; return copy; });
  };

  // Manejo general de radios condicionales
  const handleConditionalChange = (name, value) => {
    let fieldsToReset = [];
    if (name === "masa") {
      if (value === "si") fieldsToReset = ["ovarioDerechoT","ovarioDerechoAP","foliculosOD","ovarioIzquierdoT","ovarioIzquierdoAP","foliculosOI"];
      else if (value === "no") fieldsToReset = Object.keys(formData).filter(f => f !== "masa" && f !== "ovarioDerechoT" && f !== "ovarioDerechoAP" && f !== "foliculosOD" && f !== "ovarioIzquierdoT" && f !== "ovarioIzquierdoAP" && f !== "foliculosOI");
    }
    setFormData(prev => ({ ...prev, [name]: value, ...fieldsToReset.reduce((acc,f)=>({...acc,[f]:""}),{}) }));
  };

  // Cambios de campos dentro de cada masa
  const handleMasaChange = (id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      masas: prev.masas.map(masa => masa.id === id ? { ...masa, [name]: value } : masa)
    }));
  };

  const removeMasa = (id) => {
    setFormData(prev => ({
      ...prev,
      masas: prev.masas.filter(masa => masa.id !== id)
    }));
  };

  useEffect(()=>{
    props.exposeModals?.({ showErrorModal:()=>showModal("requiredInputsModal") });
  },[props.exposeModals]);

  return (
    <GeneralSection
      formData={formData}
      setFormData={setFormData}
      formErrors={formErrors}
      formErrorsLocal={formErrorsLocal}
      handleSubmit={handleSubmit}
      makeMassesReport={makeMassesReport}
      masas={masas}
      masaIndexVisible={masaIndexVisible}
      datosBloqueados={datosBloqueados}
      erroresMasaActual={erroresMasaActual}
      handleMasaChange={handleMasaChange}
      removeMasa={removeMasa}
      handleChange={handleChange}
      handleConditionalChange={handleConditionalChange}
    />
  );
};

export default MassesFormContainer;
