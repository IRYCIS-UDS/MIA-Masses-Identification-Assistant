import React, { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import MassesFormView from './MassesFormView';

// ----------------------------------------------------
// FUNCION PARA GENERAR JSON DE MASAS
// ----------------------------------------------------
export const buildAdnexalMassesJSON = (formData) => {
  const masa = {
    localizacion: formData.localizacion,
    estructura: formData.estructura,
    tipoLesion: formData.tipoLesion,
    contenido: formData.contenido,
    sombra: formData.sombra,
    parenquima: formData.parenquima,
    ascitis: formData.ascitis,
    carcinomatosis: formData.carcinomatosis,
    anatomiaPatologica: formData.anatomiaPatologica,
    medidas: {
      T: formData.medidaT,
      AP: formData.medidaAP,
      L: formData.medidaL,
    },
    parenquima_medidas:
      formData.parenquima === "si"
        ? {
            posT: formData.medidaPosT,
            posAP: formData.medidaPosAP,
            posL: formData.medidaPosL,
          }
        : null,
    ascitis_detalle: formData.ascitis === "si" ? formData.tipoAscitis : null,
    patologia_detalle:
      formData.anatomiaPatologica === "si"
        ? formData.indicaPatologia
        : null,
    lesionUltimoAnio:
      formData.anatomiaPatologica === "no"
        ? formData.lesionUltimoAnio
        : null,
    solida:
      formData.tipoLesion === "solido"
        ? {
            contornoExterno: formData.contornoExterno,
            vascularizacion: formData.vascularizacion,
          }
        : null,
    quistica:
      formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica"
        ? {
            grosorPared: formData.grosorPared,
            gradoVascularizacionPared: formData.gradoVascularizacionPared,
            contornoInterno: formData.contornoInterno,
            papilas:
              formData.papilas === "si"
                ? {
                    numero: formData.numeroPapilas,
                    contorno: formData.contornoPapilas,
                    vascularizacion: formData.vascularizacionPapilas,
                    medidas: {
                      T: formData.medidaPapilasT,
                      AP: formData.medidaPapilasAP,
                    },
                  }
                : null,
            tabiques:
              formData.tabiques === "si"
                ? {
                    numero: formData.numeroLoculos,
                    grosor: formData.grosorTabiques,
                    morfologia: formData.morfologiaTabiques,
                    vascularizacion: formData.vascularizacionTabiques,
                  }
                : null,
            areaSolida:
              formData.areaSolida === "si"
                ? {
                    numero: formData.numeroAreasSolidas,
                    vascularizacion: formData.vascularizacionAreasSolidas,
                    medidas: {
                      T: formData.medidaASolidaT,
                      AP: formData.medidaASolidaAP,
                      L: formData.medidaASolidaL,
                    },
                  }
                : null,
          }
        : null,
    contenido_otro: formData.contenido === "otro" ? formData.otroContenido : null,
    probabilidadMalignidad: formData.probabilidadMalignidad || null,
  };

  // Limpiar nulos o vacíos
  const limpiar = (obj) =>
    Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => [
          k,
          typeof v === "object" && v !== null ? limpiar(v) : v,
        ])
        .filter(([_, v]) => v !== null && v !== "")
    );

  return limpiar(masa);
};

// ----------------------------------------------------
// COMPONENTE PRINCIPAL MassesFormContainer
// ----------------------------------------------------
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
    if (!modalEl) return;
    Modal.getOrCreateInstance(modalEl).show();
  };

  // ----------------------------------------------------
  // CAMBIO GENERAL DE INPUTS
  // ----------------------------------------------------
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   setFormErrorsLocal((prev) => {
  //     const newErrors = { ...prev };
  //     delete newErrors[name];
  //     return newErrors;
  //   });
  // };

  //este borrarlo y descomentar el de arriba (!)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      console.log("formData actualizado:", updated); // <--- ver si otraIndicacion se guarda
      return updated;
    });

    setFormErrorsLocal((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };


  const handleMasaChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, masa: value }));
    setFormErrorsLocal((prev) => {
      const newErrors = { ...prev };
      delete newErrors.masa;
      return newErrors;
    });
  };

  const handleAddMasa = () => {
    const jsonActual = buildAdnexalMassesJSON(formData);
    setMasas((prev) => [...prev, jsonActual]);
    setDatosBloqueados(true);
    setFormErrorsLocal({});
    setErroresMasaActual([]);
  };

  const resetCamposMasa = () => {
    const limpiar = {
      localizacion: "",
      estructura: "",
      tipoLesion: "",
      contenido: "",
      sombra: "",
      parenquima: "",
      ascitis: "",
      carcinomatosis: "",
      anatomiaPatologica: "",
      medidaT: "",
      medidaAP: "",
      medidaL: "",
      medidaPosT: "",
      medidaPosAP: "",
      medidaPosL: "",
      tipoAscitis: "",
      indicaPatologia: "",
      lesionUltimoAnio: "",
      contornoExterno: "",
      vascularizacion: "",
      grosorPared: "",
      gradoVascularizacionPared: "",
      contornoInterno: "",
      papilas: "",
      numeroPapilas: "",
      contornoPapilas: "",
      vascularizacionPapilas: "",
      medidaPapilasT: "",
      medidaPapilasAP: "",
      tabiques: "",
      numeroLoculos: "",
      grosorTabiques: "",
      morfologiaTabiques: "",
      vascularizacionTabiques: "",
      areaSolida: "",
      numeroAreasSolidas: "",
      vascularizacionAreasSolidas: "",
      medidaASolidaT: "",
      medidaASolidaAP: "",
      medidaASolidaL: "",
      otroContenido: "",
      probabilidadMalignidad: "",
    };
    setFormData((prev) => ({ ...prev, ...limpiar }));
  };

  // ----------------------------------------------------
  // VALIDACIÓN DE MASA (masa === "si")
  // ----------------------------------------------------
  const validarMasaSi = (data) => {
    const faltan = [];
    ["localizacion", "estructura", "tipoLesion", "contenido",
     "sombra", "parenquima", "ascitis", "carcinomatosis",
     "anatomiaPatologica", "medidaT", "medidaAP", "medidaL"].forEach(f => {
      if (!data[f]) faltan.push(f);
    });
    // Validaciones específicas:
    if (data.tipoLesion === "solido") ["contornoExterno","vascularizacion"].forEach(f=>!data[f]&&faltan.push(f));
    if (data.tipoLesion==="quistica"||data.tipoLesion==="solido-quistica")
      ["grosorPared","gradoVascularizacionPared","contornoInterno","papilas","tabiques","areaSolida"].forEach(f=>!data[f]&&faltan.push(f));
    if (data.papilas==="si") ["numeroPapilas","contornoPapilas","vascularizacionPapilas","medidaPapilasT","medidaPapilasAP"].forEach(f=>!data[f]&&faltan.push(f));
    if (data.tabiques==="si") ["numeroLoculos","grosorTabiques","morfologiaTabiques","vascularizacionTabiques"].forEach(f=>!data[f]&&faltan.push(f));
    if (data.areaSolida==="si") ["numeroAreasSolidas","vascularizacionAreasSolidas","medidaASolidaT","medidaASolidaAP","medidaASolidaL"].forEach(f=>!data[f]&&faltan.push(f));
    if (data.ascitis==="si"&&!data.tipoAscitis) faltan.push("tipoAscitis");
    if (data.parenquima==="si") ["medidaPosT","medidaPosAP","medidaPosL"].forEach(f=>!data[f]&&faltan.push(f));
    if (data.anatomiaPatologica==="si"&&!data.indicaPatologia) faltan.push("indicaPatologia");
    if (data.anatomiaPatologica==="no"&&!data.lesionUltimoAnio) faltan.push("lesionUltimoAnio");
    if (data.contenido==="otro"&&!data.otroContenido) faltan.push("otroContenido");
    return faltan;
  };

  // ----------------------------------------------------
  // GENERAR INFORME
  // ----------------------------------------------------
  const handleGenerarInforme = () => {
    let nuevosErrores = {};
    if (!formData.masa) nuevosErrores.masa = "Debe indicar si hay masa";

    if (formData.masa==="si"){
      const faltan = validarMasaSi(formData);
      faltan.forEach(c=>nuevosErrores[c]="Campo obligatorio");
    }

    if (formData.masa==="no"){
      ["ovarioDerechoT","ovarioDerechoAP","foliculosOD","ovarioIzquierdoT","ovarioIzquierdoAP","foliculosOI"]
        .forEach(c=>!formData[c] && (nuevosErrores[c]="Campo obligatorio"));
    }

    if (formData.indicacion === "otro" && !formData.otraIndicacion) {
      nuevosErrores.otraIndicacion = "Campo obligatorio";
    }

    if (Object.keys(nuevosErrores).length>0){
      setFormErrorsLocal(nuevosErrores);
      setErroresMasaActual(Object.keys(nuevosErrores));
      showModal("requiredInputsModal");
      return;
    }

    showModal("confirmMassModal");
  };

  // ----------------------------------------------------
  // CONFIRMAR INFORME -> SOLO DEPURACIÓN
  // ----------------------------------------------------
  const handleConfirmarInforme = () => {

    let payloadFinal;

    // Determinar la indicación final
    const indicacionFinal =
      formData.indicacion === "otro" ? formData.otraIndicacion : formData.indicacion;

    if (formData.masa === "si") {
      const jsonActual = buildAdnexalMassesJSON(formData);

      // Sobrescribir la indicación si es "otro"
      jsonActual.indicacion = indicacionFinal;

      const masasFinales = [...masas, jsonActual];

      payloadFinal = {
        datosPaciente: {
          codigo: formData.codigo,
          edad: formData.edad,
          fur: formData.fur,
          hospital: formData.hospital,
          ecografista: formData.ecografista,
          indicacion: indicacionFinal,
          experto: formData.experto,
          referencia: formData.referencia,
        },
        "masas-anexiales": masasFinales,
        conclusionEcografista: "",
      };
    } else {
      payloadFinal = {
        datosPaciente: {
          codigo: formData.codigo,
          edad: formData.edad,
          fur: formData.fur,
          hospital: formData.hospital,
          ecografista: formData.ecografista,
          indicacion: indicacionFinal,
          experto: formData.experto,
          referencia: formData.referencia,
        },
        conclusionEcografista: "",
      };
    }

    console.log("PAYLOAD FINAL PARA DEPURACIÓN:", payloadFinal);

    const modalEl = document.getElementById("confirmMassModal");
    if (modalEl) Modal.getOrCreateInstance(modalEl).hide();
  };

  // ----------------------------------------------------
  // EXPONER MODALES AL PADRE
  // ----------------------------------------------------
  useEffect(()=>{
    props.exposeModals?.({
      showErrorModal:()=>showModal("requiredInputsModal"),
    });
  },[props.exposeModals]);

  // ----------------------------------------------------
  // RETURN — SOLO VIEW
  // ----------------------------------------------------
  return (
    <MassesFormView
      formData={formData}
      setFormData={setFormData}
      formErrors={formErrors}
      formErrorsLocal={formErrorsLocal}
      handleSubmit={handleSubmit}
      makeMassesReport={makeMassesReport}
      handleChange={handleChange}
      handleAddMasa={handleAddMasa}
      resetCamposMasa={resetCamposMasa}
      showModal={showModal}
      setFormErrorsLocal={setFormErrorsLocal}
      erroresMasaActual={erroresMasaActual}
      masas={masas}
      masaIndexVisible={masaIndexVisible}
      datosBloqueados={datosBloqueados}
      validarMasaSi={validarMasaSi}
      handleMasaChange={handleMasaChange}
      handleGenerarInforme={handleGenerarInforme}
      handleConfirmarInforme={handleConfirmarInforme}
      refConclusion={conclusionRef}
    />
  );
};

export default MassesFormContainer;
