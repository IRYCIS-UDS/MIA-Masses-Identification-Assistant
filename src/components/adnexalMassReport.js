import React from "react";
import html2pdf from "html2pdf.js";
import LogoHRYC from "../assets/images/LogoHRYC.jpg";
import LogoIrycis from "../assets/images/logo-irycis.png";
import "../assets/css/adnexalMassReport.css";

/* ---------------------------------------------------
   INFORME DE OVARIO
---------------------------------------------------- */
function OvarioReport({ data }) {
  return (
    <div className="mi_formulario">
      <div className="informe-content">
        <h2 className="informe-title">Servicio de Ginecología y Obstetricia</h2>

        <h3 className="informe-subtitle">Datos de la paciente:</h3>
        <p>Nombre: </p>
        <p>NHC: {data.codigo || ""}</p>
        <p>FUR: {data.FUR || ""}</p>

        <h3 className="informe-subtitle">Indicación de la ecografía:</h3>
        <p>Mujer de {data.edad} años que acude a consulta de ecografía para valoración por {data.indicacion}.</p>

        <h3 className="informe-subtitle">Descripción de la imagen:</h3>
        <p>Anejo derecho: {data.ovarioDerechoAP} x {data.ovarioDerechoT} mm con {data.foliculosOD} folículo/s.</p>
        <p>Anejo izquierdo: {data.ovarioIzquierdoAP} x {data.ovarioIzquierdoT} mm con {data.foliculosOI} folículo/s.</p>

        <h3 className="informe-subtitle">Conclusiones del ecografista:</h3>
        <p>{data.conclusion || "___________"}</p>
      </div>
    </div>
  );
}

  function MasaReport({ data }) {
    const volumen = ((parseFloat(data.medidaPosT) * parseFloat(data.medidaPosAP) * parseFloat(data.medidaPosL) * 0.52) / 1000).toFixed(2);

    const renderMasaAnexial = () => {
      if (!data.tipoLesion) return null;

      const frases = [];

      // Frase principal según localización
      frases.push(
        <p key="principal" dangerouslySetInnerHTML={{
          __html: `${
            data.localizacion === "bilateral"
              ? "Dependiente de ambos ovarios"
              : `Dependiente de ovario <b>${data.localizacion || "indefinida"}</b>`
          }, se objetiva formación de <b>${data.medidaPosT} x ${data.medidaPosAP} x ${data.medidaPosL} mm</b> (<b>${volumen} cm³</b>) de aspecto <b>${data.tipoLesion}</b>, de contorno <b>${data.contornoInterno || "irregular"}</b> y de contenido <b>${data.contenido || "indefinido"}</b>.`
        }} />
      );

/////////////////////// no se esta pintando ESTA MIERDA (!) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // Pared y vascularización si hay quística o sólido-quística
      if (['quistica', 'sólido-quistica'].includes(data.tipoLesion) && data.grosorPared) {
        console.log("HOLA??? La pared mide");
        console.log(data.gradoVascularizacionPared);
        frases.push(
          <p key="pared" dangerouslySetInnerHTML={{
            __html: `La pared mide <b>${data.grosorPared} mm</b> y su grado de vascularización es <b>${data.gradoVascularizacionPared || 'leve'} (${data.MA_Q_SCORE || '?'})</b>. El contorno es <b>${data.contornoInterno || 'irregular'}</b>.`
          }} />
        );
      }

      // Parénquima
      if (data.parenquima) {
        console.log("HOLA??? parénquima");
        frases.push(
          <p key="parénquima" dangerouslySetInnerHTML={{
            __html: `<strong>Parénquima ovárico sano:</strong> De tamaño <b>${data.medidaPosT} x ${data.medidaPosAP} x ${data.medidaPosL} mm</b>.`
          }} />
        );
      }

      // Ascitis
      if (data.ascitis) {
        frases.push(<p key="ascitis"><strong>Ascitis:</strong> {data.tipoAscitis || 'leve'}</p>);
      }

      // Carcinomatosis
      if (data.carcinomatosis === 'sí') {
        frases.push(<p key="carcinomatosis"><strong>Carcinomatosis presente.</strong></p>);
      }

      // Anatomía patológica
      if (data.anatomiaPatologica) {
        frases.push(<p key="anatp"><strong>Anatomía patológica:</strong> {data.anatomiaPatologica}</p>);
      }

      // Probabilidad de malignidad
      if (data.probabilidadMalignidad === "si") {
        frases.push(
          <p key="probabilidad" dangerouslySetInnerHTML={{
            __html: `La probabilidad de que la masa anexial sea maligna es de <b>${data.valorProbabilidad || "0"}%</b>.`
          }} />
        );
      }

      return frases;
    };

    return (
      <div className="informe-content">
        <h2 className="informe-title">Servicio de Ginecología y Obstetricia</h2>

        <h3 className="informe-subtitle">Datos de la paciente:</h3>
        <p>Código de paciente: {data.codigo || "___________"}</p>
        <p>Edad: {data.edad || "___________"}</p>
        <p>FUR: {data.fur || "___________"}</p>

        <h3 className="informe-subtitle">Indicación de la ecografía:</h3>
        <p>Mujer de {data.edad} años que acude a consulta de ecografía para valoración por {data.indicacion}.</p>

        <h3 className="informe-subtitle">Descripción de la imagen:</h3>
        <p style={{ fontWeight: 'bold' }}>Masa anexial 1</p>
        {renderMasaAnexial()}

        <h3 className="informe-subtitle">Observaciones del ecografista:</h3>
        <p>{data.conclusion || "------------no hay-------------"}</p>
      </div>
    );
  }



/* ---------------------------------------------------
   COMPONENTE PRINCIPAL
---------------------------------------------------- */
export default function AdnexalMassReport({ tipoInforme, data, onClose }) {
  const waitForImages = () =>
    Promise.all(
      Array.from(document.querySelectorAll("img")).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = resolve;
          })
      )
    );

  const downloadPDF = async () => {
    const element = document.getElementById("informe-a4");

    await waitForImages();

    html2pdf()
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        pdf.save(`informe-${tipoInforme}.pdf`);
      });
  };

  return (
    <div className="adnexal-report">
      <div className="report-buttons-container">
        <div className="report-buttons">
          {onClose && (
            <button onClick={onClose} className="btn btn-secondary">
              Modificar Informe
            </button>
          )}
          <button onClick={downloadPDF} className="btn btn-primary">
            Descargar PDF
          </button>
        </div>
      </div>

      <div id="informe-a4" className="previsualizacion">
        <div className="report-header">
          <div className="header-left">
            <img className="logoHospi" src={LogoHRYC} alt="Logo HRYC" />
          </div>
          <div className="header-right">
            <img className="logoIrycis" src={LogoIrycis} alt="Logo Irycis" />
          </div>
        </div>

        {tipoInforme === "informeMasa" ? (
          <MasaReport data={data} />
        ) : (
          <OvarioReport data={data} />
        )}
      </div>
    </div>
  );
}
