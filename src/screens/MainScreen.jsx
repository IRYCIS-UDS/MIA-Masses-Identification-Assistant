import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/MainScreen.css";
import MassesFormContainer from "../components/MassesFormContainer"; // Formulario
import AdnexalMassReport from "../components/adnexalMassReport"; // Plantillas informes
import { Modal } from "bootstrap";
// Logos:
import LogoHRYC from "../assets/images/LogoHRYC.jpg";
import LogoIrycis from "../assets/images/logo-irycis.png";
// PDF:
import { Document, Page, Text, View, Image, StyleSheet, pdf, Font } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const normalize = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const MainScreen = () => {
  const navigate = useNavigate();

  // DATOS FORZADOS PARA PRUEBAS          !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const [formData,setFormData]=useState({codigo:"LAF000013",edad:"22",fur:"2025-11-12",indicacion:"dolor de vivir",ecografista:"GIN",hospital:"hurc",experto:"si",referencia:"si",masa:"si",localizacion:"bilateral",estructura:"trompa",tipoLesion:"quistica",contenido:"en vidrio esmerilado",sombra:"si",parenquima:"si",ascitis:"si",carcinomatosis:"no valorable",anatomiaPatologica:"si",medidaT:"3",medidaAP:"3",medidaL:"3",medidaPosT:"4",medidaPosAP:"3",medidaPosL:"5",tipoAscitis:"moderada",indicaPatologia:"tfdhbgddfgb",lesionUltimoAnio:"si",contornoExterno:"2",vascularizacion:"leve (grado x)",grosorPared:"3",gradoVascularizacionPared:"moderada (grado x)",contornoInterno:"irregular",papilas:"si",tabiques:"si",areaSolida:"si",numeroPapilas:"3",contornoPapilas:"regular",vascularizacionPapilas:"leve",medidaPapilasT:"3",medidaPapilasAP:"3",numeroLoculos:"23",grosorTabiques:"4",morfologiaTabiques:"regular",vascularizacionTabiques:"ninguno (score color 1)",numeroAreasSolidas:"34",vascularizacionAreasSolidas:"leve (score color 2)",medidaASolidaT:"5",medidaASolidaAP:"4",medidaASolidaL:"3",otroContenido:"otro texto contenido blabla",otraIndicacion:"otro texto indicacion blabla",probabilidadMalignidad:"si",ovarioDerechoT:"2",ovarioDerechoAP:"3",foliculosOD:"23",ovarioIzquierdoT:"3",ovarioIzquierdoAP:"5",foliculosOI:"23",conclusionEcografista:"El paciente debe acudir nuevamente para revisión."});

  const [formData,setFormData]=useState({
    // CAMPOS GENERALES
    codigo:"",edad:"",fur:"",indicacion:"",ecografista:"",
    hospital:"",experto:"",referencia:"",masa:"",
    // MASA ANEXIAL
    localizacion:"",estructura:"",tipoLesion:"",contenido:"",
    sombra:"",parenquima:"",ascitis:"",carcinomatosis:"",
    anatomiaPatologica:"",medidaT:"",medidaAP:"",medidaL:"",
    // Parénquima
    medidaPosT:"",medidaPosAP:"",medidaPosL:"",
    // Ascitis
    tipoAscitis:"",
    // Anatomía Patológica
    indicaPatologia:"",lesionUltimoAnio:"",
    // Lesión sólida
    contornoExterno:"",vascularizacion:"",
    // Lesión quística o sólido-quística
    grosorPared:"",gradoVascularizacionPared:"",
    contornoInterno:"",papilas:"",tabiques:"",areaSolida:"",
    // Papilas
    numeroPapilas:"",contornoPapilas:"",vascularizacionPapilas:"",
    medidaPapilasT:"",medidaPapilasAP:"",
    // Tabiques
    numeroLoculos:"",grosorTabiques:"",morfologiaTabiques:"",
    vascularizacionTabiques:"",
    // Área sólida
    numeroAreasSolidas:"",vascularizacionAreasSolidas:"",
    medidaASolidaT:"",medidaASolidaAP:"",medidaASolidaL:"",
    // Contenido
    otroContenido:"",
    // Indicación
    otraIndicacion:"",
    // Tipo lesión
    probabilidadMalignidad:"",
    // Ovario
    ovarioDerechoT:"",ovarioDerechoAP:"",foliculosOD:"",
    ovarioIzquierdoT:"",ovarioIzquierdoAP:"",foliculosOI:"",
    // Conclusión
    conclusionEcografista:""
  });

  const [formErrors, setFormErrors] = useState({});

  // Modales de las plantillas informes:
  const [showReport, setShowReport] = useState(false);
  const [tipoInforme, setTipoInforme] = useState(null);

  // ----------------------
  // VALIDACIÓN
  // ----------------------
  const validate = (data) => {
    const fields = []; // Almacena los campos que deben ser validados

    // Si la masa es "si", añadimos los campos obligatorios de la masa
    if (data.masa === "si") {
      const req = [
        "localizacion",
        "estructura",
        "tipoLesion",
        "contenido",
        "sombra",
        "parenquima",
        "ascitis",
        "carcinomatosis",
        "anatomiaPatologica",
        "medidaT",
        "medidaAP",
        "medidaL",
      ];

      req.forEach((f) => {
        if (!data[f]) fields.push(f);
      });

      if (data.tipoLesion === "solido") {
        fields.push("contornoExterno", "vascularizacion");
      }

      if (data.tipoLesion === "quistica" || data.tipoLesion === "solido-quistica") {
        fields.push("grosorPared", "gradoVascularizacionPared", "contornoInterno", "papilas", "tabiques", "areaSolida");
      }

      if (data.papilas === "si") {
        fields.push("numeroPapilas", "contornoPapilas", "vascularizacionPapilas", "medidaPapilasT", "medidaPapilasAP");
      }

      if (data.tabiques === "si") {
        fields.push("numeroLoculos", "grosorTabiques", "morfologiaTabiques", "vascularizacionTabiques");
      }

      if (data.areaSolida === "si") {
        fields.push("numeroAreasSolidas", "vascularizacionAreasSolidas", "medidaASolidaT", "medidaASolidaAP", "medidaASolidaL");
      }

      if (data.ascitis === "si" && !data.tipoAscitis) {
        fields.push("tipoAscitis");
      }

      if (data.parenquima === "si") {
        fields.push("medidaPosT", "medidaPosAP", "medidaPosL");
      }

      if (data.anatomiaPatologica === "si" && !data.indicaPatologia) {
        fields.push("indicaPatologia");
      }

      if (data.anatomiaPatologica === "no" && !data.lesionUltimoAnio) {
        fields.push("lesionUltimoAnio");
      }

      if (data.contenido === "otro" && !data.otroContenido) {
        fields.push("otroContenido");
      }

      // Además, se debe agregar la validación de los campos de ovarios si la masa es "si"
      if (data.masa === "si") {
        if (!data.ovarioDerechoT) fields.push("ovarioDerechoT");
        if (!data.ovarioDerechoAP) fields.push("ovarioDerechoAP");
        if (!data.foliculosOD) fields.push("foliculosOD");
        if (!data.ovarioIzquierdoT) fields.push("ovarioIzquierdoT");
        if (!data.ovarioIzquierdoAP) fields.push("ovarioIzquierdoAP");
        if (!data.foliculosOI) fields.push("foliculosOI");
      }
    }

    // Retornar los campos que faltan
    return fields;
  };

  // ----------------------
  // SUBMIT
  // ----------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = validate(formData);

    if (missingFields.length > 0) {
      const uiErrors = {};
      missingFields.forEach(f => uiErrors[f] = "Campo requerido");
      setFormErrors(uiErrors);

      console.log("⚠️ Campos obligatorios faltantes:", missingFields);

      // Mostrar modal de error
      Modal.getOrCreateInstance(document.getElementById("requiredInputsModal")).show();
      return;
    }

    console.log("-> Campos informe:", formData);

    // Mostrar modal de confirmación
    Modal.getOrCreateInstance(document.getElementById("confirmMassModal")).show();
  };

  // ------------------------------------------------------------------
  // GENERAR REPORTE MASAS ANEXIALES - PDF (react-pdf)
  // ------------------------------------------------------------------
  // ESTILOS INFORME:
  const styles = StyleSheet.create({
    page: {
      paddingTop: 20, // menos espacio arriba
      paddingBottom: 30,
      paddingLeft: 30,
      paddingRight: 30,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.5,
      backgroundColor: "#ffffff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      alignItems: "center",
    },
    footer: {
      position: "absolute",
      bottom: 18,
      left: 30,
      right: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
      color: "gray",
    },
    logoHospi: { width: 150, height: 50, objectFit: "contain" },
    logoIrycis: { width: 120, height: 50, objectFit: "contain" },
    title: {
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: 16,
      fontFamily: "Helvetica",
      fontWeight: "bold",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 12,
      fontFamily: "Helvetica",
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 8,
    },
    bold: {
      fontFamily: "Helvetica",
      fontWeight: "bold",
    },
    paragraph: {
      marginLeft: 10,
      marginBottom: 5,
    }
  });
  // CREA EL INFORME:
  const makeMassesReport = async (formData) => {
    
    console.log("---make Masses Report---");

    // Obtener fecha actual en formato DD/MM/YYYY
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getDate().toString().padStart(2, "0")}/${(fechaActual.getMonth()+1).toString().padStart(2,"0")}/${fechaActual.getFullYear()}`;

    // Mapeo del nombre del hospital
    const nombreHospital = (() => {
      if (formData.hospital === "hurc") return "Hospital Ramón y Cajal";
      if (formData.hospital === "h12o") return "Hospital 12 de Octubre";
      return "";
    })();

    // Conversión de indicación a minúsculas
    const indicacionTexto = (formData.indicacion || formData.otraIndicacion || "").toLowerCase();

    // Cálculo del volumen de la masa
    const medidaT = parseFloat(formData.medidaT || 0);
    const medidaAP = parseFloat(formData.medidaAP || 0);
    const medidaL = parseFloat(formData.medidaL || 0);
    const volumenMM3 = medidaT * medidaAP * medidaL;
    const volumenCM3 = (volumenMM3 / 1000).toFixed(2); // Convertimos a cm³

    const calcularLogit = (contornoInterno, sombra, vascularizacionAreasSolidas, vascularizacionPapilas) => {
      let logit = -3.625;
      if (contornoInterno === "irregular") logit += 1.299;
      if (sombra === "no") logit += 1.847;
      if (vascularizacionAreasSolidas === "nula (score color 1)" || vascularizacionAreasSolidas === "leve (score color 2)") logit += 2.209;
      else if (vascularizacionAreasSolidas === "moderada (score color 3)" || vascularizacionAreasSolidas === "abundante (score color 4)") logit += 2.967;
      if (vascularizacionPapilas === "nula (score color 1)" || vascularizacionPapilas === "leve (score color 2)") logit += 1.253;
      else if (vascularizacionPapilas === "moderada (score color 3)" || vascularizacionPapilas === "abundante (score color 4)") logit += 1.988;
      return logit;
    };

    const calcularProbabilidad = (logit) => 1 / (1 + Math.exp(-logit));

    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Cabecera */}
          <View style={styles.header}>
            <Image style={styles.logoHospi} src={LogoHRYC} />
            <Image style={styles.logoIrycis} src={LogoIrycis} />
          </View>

          {/* Contenido dinámico */}
          <Text style={styles.title}>Servicio de Ginecología y Obstetricia</Text>

          {/* DATOS DE LA PACIENTE */}
          <Text style={styles.subtitle}>Datos de la paciente:</Text>
          <Text style={styles.paragraph}><Text style={styles.bold}>Código de paciente:</Text> {formData.codigo}</Text>
          <Text style={styles.paragraph}><Text style={styles.bold}>Edad:</Text> {formData.edad}</Text>
          <Text style={styles.paragraph}><Text style={styles.bold}>FUR:</Text> {formData.fur}</Text>

          {/* INDICACIÓN DE LA ECOGRAFÍA */}
          <Text style={styles.subtitle}>Indicación de la ecografía:</Text>
          <Text style={styles.paragraph}>
            {(() => {
              // Construir edad
              const edadTexto = formData.edad ? `de ${formData.edad} años ` : "";
              // Construir indicación
              const indicacionTexto = formData.indicacion === "otro" 
              ? formData.otraIndicacion 
              : formData.indicacion;
              return `Mujer ${edadTexto}que acude a consulta de ecografía para valoración por ${indicacionTexto}.`;
            })()}
          </Text>

          {/* DESCRIPCIÓN DE LA IMAGEN */}
          <Text style={styles.subtitle}>Descripción de la imagen:</Text>

          {formData.masa === "si" ? (
            <>
              {/* Subtítulo para la masa */}
              <Text style={styles.paragraph}><Text style={styles.bold}>Masa anexial 1</Text></Text>

              {/* DESCRIPCIÓN MASA */}
              <Text style={styles.paragraph}>
                Dependiente de ovario derecho, se objetiva formación de{" "}
                <Text style={styles.bold}>
                  {medidaT} x {medidaAP} x {medidaL} mm ({volumenCM3} cm³)
                </Text>{" "}
                de aspecto <Text style={styles.bold}>{formData.tipoLesion}</Text>
                {formData.contenido === "otro" ? (
                  <> y de contenido {formData.otroContenido}.</>
                ) : (
                  <> y de contenido {formData.contenido}.</>
                )}
              </Text>

              {/* PARED */}
              <Text style={styles.paragraph}>
                {formData.gradoVascularizacionPared === "ninguno (score color 1)" ? (
                  <>La pared mide <Text style={styles.bold}>{formData.grosorPared}</Text> mm y es avascular. El contorno es <Text style={styles.bold}>{formData.contornoInterno}</Text>.</>
                ) : (
                  <>La pared mide <Text style={styles.bold}>{formData.grosorPared}</Text> mm y su grado de vascularización es <Text style={styles.bold}>{formData.gradoVascularizacionPared}</Text>. El contorno es <Text style={styles.bold}>{formData.contornoInterno}</Text>.</>
                )}
              </Text>

              {/* PAPILAS */}
              {formData.papilas === "si" && (
                <Text style={styles.paragraph}>
                  Contiene <Text style={styles.bold}>{formData.numeroPapilas}</Text> papila/s, la mayor de ellas de <Text style={styles.bold}>{formData.medidaPapilasT} x {formData.medidaPapilasAP}</Text> mm de morfología <Text style={styles.bold}>{formData.contornoPapilas}</Text> y {formData.vascularizacionPapilas === "ninguno (score color 1)" ? "avascular" : <>con grado de vascularización <Text style={styles.bold}>{formData.vascularizacionPapilas}</Text></>}.
                </Text>
              )}

              {/* TABIQUES */}
              <Text style={styles.paragraph}>
                {formData.vascularizacionTabiques === "ninguno (score color 1)" ? (
                  <>Los tabiques son de morfología <Text style={styles.bold}>{formData.morfologiaTabiques}</Text>, de grosor <Text style={styles.bold}>{formData.grosorTabiques}</Text> mm y avasculares. La formación tiene <Text style={styles.bold}>{formData.numeroLoculos}</Text> lóculo/s.</>
                ) : (
                  <>Los tabiques son de morfología <Text style={styles.bold}>{formData.morfologiaTabiques}</Text>, de grosor <Text style={styles.bold}>{formData.grosorTabiques}</Text> mm y su grado de vascularización es <Text style={styles.bold}>{formData.vascularizacionTabiques}</Text>. La formación tiene <Text style={styles.bold}>{formData.numeroLoculos}</Text> lóculo/s.</>
                )}
              </Text>

              {/* ÁREA SÓLIDA */}
              {formData.areaSolida === "si" && (
                <Text style={styles.paragraph}>
                  {formData.vascularizacionAreasSolidas === "ninguno (score color 1)" ? (
                    <>Contiene <Text style={styles.bold}>{formData.numeroAreasSolidas}</Text> porción/es sólida/s, la mayor de ella tiene un tamaño de <Text style={styles.bold}>{formData.medidaASolidaT} x {formData.medidaASolidaAP} x {formData.medidaASolidaL}</Text> mm y es avascular.</>
                  ) : (
                    <>Contiene <Text style={styles.bold}>{formData.numeroAreasSolidas}</Text> porción/es sólida/s, la mayor de ella tiene un tamaño de <Text style={styles.bold}>{formData.medidaASolidaT} x {formData.medidaASolidaAP} x {formData.medidaASolidaL}</Text> mm con grado de vascularización <Text style={styles.bold}>{formData.vascularizacionAreasSolidas}</Text>.</>
                  )}
                </Text>
              )}

              {/* SOMBRA */}
              {formData.sombra === "si" && (
                <Text style={styles.paragraph}>Presenta sombra posterior.</Text>
              )}

              {/* PARÉNQUIMA */}
              {formData.parenquima === "si" && (
                <Text style={styles.paragraph}>
                  Tiene parénquima ovárico sano, de tamaño <Text style={styles.bold}>{formData.medidaPosT} x {formData.medidaPosAP} x {formData.medidaPosL}</Text> mm.
                </Text>
              )}

              {/* ASCITIS */}
              {formData.ascitis === "si" && (
                <Text style={styles.paragraph}>
                  Presenta ascitis <Text style={styles.bold}>{formData.tipoAscitis}</Text>.
                </Text>
              )}

              {/* CARCINOMSATOSIS */}
              {formData.carcinomatosis === "si" && (
                <Text style={styles.paragraph}>Hay carcinomatosis.</Text>
              )}

              {/* PROBABILIDAD MALIGNIDAD */}
              {formData.probabilidadMalignidad === "si" && (() => {
                const logit = calcularLogit(
                  formData.contornoInterno,
                  formData.sombra,
                  formData.vascularizacionAreasSolidas,
                  formData.vascularizacionPapilas
                );
                const probabilidad = calcularProbabilidad(logit) * 100; // en porcentaje

                return (
                  <Text style={styles.paragraph}>
                    La probabilidad de que la masa anexial sea maligna es de <Text style={styles.bold}>{probabilidad.toFixed(1)}%</Text>.
                  </Text>
                );
              })()}

              {/* {formData.anatomiaPatologica === "si" && (
                <Text style={styles.paragraph}><Text style={styles.bold}>Anatomía patológica:</Text> {formData.indicaPatologia}</Text>
              )} */}

            </>
          ) : (
            <>
              {/* Masa === "no" */}
              <Text style={styles.paragraph}>
                Anejo derecho de <Text style={styles.bold}>{formData.ovarioDerechoT}</Text> x <Text style={styles.bold}>{formData.ovarioDerechoAP}</Text> mm con <Text style={styles.bold}>{formData.foliculosOD}</Text> folículo/s.
              </Text>
              <Text style={styles.paragraph}>
                Anejo izquierdo de <Text style={styles.bold}>{formData.ovarioIzquierdoT}</Text> x <Text style={styles.bold}>{formData.ovarioIzquierdoAP}</Text> mm con <Text style={styles.bold}>{formData.foliculosOI}</Text> folículo/s.
              </Text>
            </>
          )}

          {/* CONCLUSIÓN DEL ECOGRAFISTA */}
          {formData.conclusionEcografista && (
            <>
              <Text style={styles.subtitle}>Conclusión del ecografista:</Text>
              <Text style={styles.paragraph}>{formData.conclusionEcografista}</Text>
            </>
          )}

          <View style={styles.footer}>
            <Text>{nombreHospital || " "}</Text>{/* Solo si hay hospital */}
            <Text>Fecha: {fechaFormateada}</Text>
          </View>

        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    saveAs(blob, "informe.pdf");

    // 🔹 Recargar la página para resetear el formulario
    window.location.reload();
  };


  return (
    <div className="container mt-4">
      <MassesFormContainer
        formData={formData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        makeMassesReport={makeMassesReport}
        setFormData={setFormData}
      />
    </div>
  );
};

export default MainScreen;
