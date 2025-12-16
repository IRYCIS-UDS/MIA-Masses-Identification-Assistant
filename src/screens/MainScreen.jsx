import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import doctora from "../assets/images/doctora.png"; // tu imagen de la doctora

const MainScreen = () => {
  const navigate = useNavigate();

  // Botón funcional: abre MassesReportScreen
  const handleOpenMassesForm = () => {
    navigate("/masses"); // ruta de MassesReportScreen
  };

  // Formularios de ejemplo (solo visual)
  const exampleForms = [
    { name: "Informe de Citología" },
    { name: "Informe de Ecografía" },
    { name: "Informe de Hormonas" },
  ];

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, md: 3 } }}>
      {/* Título principal */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          textAlign: { xs: "center", sm: "left" },
          mb: 4,
        }}
      >
        Generación de informes - Revisión Ginecológica
      </Typography>

      {/* Contenedor principal: botones a la izquierda, doctora a la derecha */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Botón funcional */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOpenMassesForm}
              sx={{ py: 2, fontSize: "1rem" }}
            >
              Informe de Masa Anexial
            </Button>

            {/* Botones de ejemplo */}
            {exampleForms.map((form, index) => (
              <Button
                key={index}
                variant="outlined"
                color="secondary"
                fullWidth
                disabled
                sx={{ py: 2, fontSize: "1rem" }}
              >
                {form.name}
              </Button>
            ))}
          </Box>
        </Grid>

        {/* Imagen de la doctora a la derecha */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={doctora}
            alt="Doctora"
            sx={{
              width: { xs: "80%", sm: "60%", md: "80%" },
              maxWidth: 400,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainScreen;
