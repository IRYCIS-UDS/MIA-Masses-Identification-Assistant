import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GenerateReportScreen = () => {
  const location = useLocation();
  const { formData } = location.state;
  const componentRef = useRef();

  // Función para generar PDF desde HTML
  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("informe.pdf");
  };

  if (!formData) return <p>No hay datos para mostrar</p>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 6,
        backgroundColor: "#f9fafb",
        p: 5,
      }}
    >
      {/* Caja blanca */}
      <Box
        ref={componentRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "white",
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: 1000,
          width: "100%",
        }}
      >
        {/* Título */}
        <h3
          style={{
            color: "#1a4c89",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Generación de Informe
        </h3>

        {/* Contenedor de contenido */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          {/* Datos en texto */}
          <Box sx={{ flex: 1 }}>
            {/* Datos personales */}
            <h5 className="mb-3 text-secondary">Datos personales</h5>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <div className="form-control" style={{ backgroundColor: "#f5f5f5" }}>
                {formData.nombre}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Apellidos</label>
              <div className="form-control" style={{ backgroundColor: "#f5f5f5" }}>
                {formData.apellidos}
              </div>
            </div>

            {/* Cantidades */}
            <h5 className="mb-3 text-secondary">Cantidades</h5>
            {["cantidad1", "cantidad2", "cantidad3"].map((campo, index) => (
              <div className="mb-3" key={campo}>
                <label className="form-label">Cantidad {index + 1}</label>
                <div className="form-control" style={{ backgroundColor: "#f5f5f5" }}>
                  {formData[campo]}
                </div>
              </div>
            ))}

            {/* Botón descargar */}
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "#2c7fe3",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                onClick={handleDownloadPDF}
              >
                Descargar PDF
              </button>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GenerateReportScreen;
