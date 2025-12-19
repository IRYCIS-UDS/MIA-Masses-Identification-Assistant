import { useEffect } from 'react';
import "../assets/css/MassesFormView.css";

const MassesFormView = ({
  // Form:
  formData,
  setFormData,
  // Errores:
  formErrors,
  formErrorsLocal,
  // Handle general:
  handleChange,
  // Handle condicionales:
  handleConditionalChange,
  handleTipoLesionChange,
  handlePapilasChange,
  handleTabiquesChange,
  handleAreaSolidaChange,
  
  handleAddMasa,
  handleGenerarInforme,

  masaIndexVisible,
  datosBloqueados,
  handleSubmit,
  makeMassesReport,
  setFormErrorsLocal,


  // handleConfirmarInforme,
  // refConclusion,
  // validarMasaSi
  // masas,
  // payload,
  // conclusionRef,
}) => {

  useEffect(() => {
    const modalElement = document.getElementById('confirmMassModal');

    // Limpiar el campo conclusionEcografista cuando se abre el modal
    const handleModalShow = () => {
      setFormData(prevData => ({
        ...prevData,
        conclusionEcografista: '', // Limpiar el campo
      }));
    };

    // Registramos el evento para limpiar el campo cuando se abre el modal
    modalElement?.addEventListener('show.bs.modal', handleModalShow);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      modalElement?.removeEventListener('show.bs.modal', handleModalShow);
    };
  }, [setFormData]); // Solo ejecutamos este useEffect una vez cuando el componente se monta

  return (
    <div className="container-fluid mt-4">
      <h4 className="fw-bold mb-3 titulo-formulario">Datos generales</h4>
      <form onSubmit={handleSubmit} className="mi-formulario">    

        {/* ---------- FILA 1 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* CÓDIGO PACIENTE */}
          <div className="col-md-4">
            <label htmlFor="codigo" className="form-label fw-semibold text-secondary">
              Código de paciente del estudio 
            </label>
            <input
              id="codigo"
              name="codigo"
              type="text"
              className={`form-control ${formErrors.codigo ? "is-invalid" : ""}`}
              value={formData.codigo}
              onChange={handleChange}
              disabled={datosBloqueados}
              aria-invalid={!!formErrors.codigo}
              aria-describedby={formErrors.codigo ? "codigo-error" : undefined}
            />
            <div id="codigo-error" className="invalid-feedback">{formErrors.codigo}</div>
          </div>
          {/* EDAD PACIENTE */}
          <div className="col-md-4">
            <label htmlFor="edad" className="form-label fw-semibold text-secondary">
              Edad 
            </label>
            <input
              id="edad"
              name="edad"
              type="number"
              min="0"
              className={`form-control ${formErrors.edad ? "is-invalid" : ""}`}
              value={formData.edad}
              onChange={handleChange}
              disabled={datosBloqueados}
              aria-invalid={!!formErrors.edad}
              aria-describedby={formErrors.edad ? "edad-error" : undefined}
            />
            <div id="edad-error" className="invalid-feedback">{formErrors.edad}</div>
          </div>
          {/* FUR (FECHA ÚLTIMA REGLA) */}
          <div className="col-md-4">
            <label htmlFor="fur" className="form-label fw-semibold text-secondary">
              FUR 
            </label>
            <input
              id="fur"
              name="fur"
              type="date"
              className={`form-control ${formErrors.fur ? "is-invalid" : ""}`}
              value={formData.fur}
              onChange={handleChange}
              disabled={datosBloqueados}
              max={new Date().toISOString().split("T")[0]}
              aria-invalid={!!formErrors.fur}
              aria-describedby={formErrors.fur ? "fur-error" : undefined}
            />
            {formErrors.fur && <div id="fur-error" className="invalid-feedback">{formErrors.fur}</div>}
          </div>
        </div>    

        {/* ---------- FILA 2 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* SIGLAS ECO */}
          <div className="col-md-4">
            <label htmlFor="ecografista" className="form-label fw-semibold text-secondary">
              Siglas del ecografista 
            </label>
            <input
              id="ecografista"
              name="ecografista"
              type="text"
              className={`form-control ${formErrors.ecografista ? "is-invalid" : ""}`}
              value={formData.ecografista}
              onChange={handleChange}
              disabled={datosBloqueados}
              aria-invalid={!!formErrors.ecografista}
              aria-describedby={formErrors.ecografista ? "ecografista-error" : undefined}
            />
            {formErrors.ecografista && (
              <div id="ecografista-error" className="invalid-feedback">{formErrors.ecografista}</div>
            )}
          </div>

          {/* HOSPITAL */}
          <div className="col-md-4">
            <label htmlFor="hospital" className="form-label fw-semibold text-secondary">
              Hospital participante 
            </label>
            <select
              id="hospital"
              name="hospital"
              className={`form-select ${formErrors.hospital ? "is-invalid" : ""}`}
              value={formData.hospital}
              onChange={handleChange}
              aria-invalid={!!formErrors.hospital}
              aria-describedby={formErrors.hospital ? "hospital-error" : undefined}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="hurc">Hospital Ramón y Cajal</option>
              <option value="h12o">Hospital 12 de Octubre</option>
            </select>
            {formErrors.hospital && (
              <div id="hospital-error" className="invalid-feedback">{formErrors.hospital}</div>
            )}
          </div>

          {/* INDICACIÓN ECO */}
          <div className="col-md-4">
            <label htmlFor="indicacion" className="form-label fw-semibold text-secondary">
              Indicación de ecografía 
            </label>
            <select
              id="indicacion"
              name="indicacion"
              className={`form-select ${formErrors.indicacion ? "is-invalid" : ""}`}
              onChange={(e) => {
                console.log("Seleccionaste:", e.target.value);
                handleChange(e);
              }}
              aria-invalid={!!formErrors.indicacion}
              aria-describedby={formErrors.indicacion ? "indicacion-error" : undefined}
            >
              <option value="" disabled selected>
                Seleccione una opción
              </option>
              <option value="dolor abdominal">Dolor abdominal</option>
              <option value="distension abdominal">Distensión abdominal</option>
              <option value="sangrado">Sangrado</option>
              <option value="hallazgo">Hallazgo accidental</option>
              <option value="otro">Otro</option>
            </select>
            {formErrors.indicacion && (
              <div id="indicacion-error" className="invalid-feedback">{formErrors.indicacion}</div>
            )}
          </div>
        </div>

        {/* BLOQUE DINÁMICO (INDICACIÓN DE ECOGRAFÍA) || indicacion === "no" */}
        {formData.indicacion === "otro" && (
          <div className="row mb-3">
            <div className="col-md-12 item-appear">
              <label htmlFor="otraIndicacion" className="form-label fw-semibold text-secondary">
                Otro <span className="text-danger">*</span>
              </label>
              <textarea
                id="otraIndicacion"
                name="otraIndicacion"
                className={`form-control mt-2 ${formErrorsLocal.otraIndicacion ? "is-invalid" : ""}`}
                style={{ minHeight: "80px" }}
                value={formData.otraIndicacion || ""}
                onChange={handleChange}
                aria-invalid={!!formErrorsLocal.otraIndicacion}
                aria-describedby={formErrorsLocal.otraIndicacion ? "otraIndicacion-error" : undefined}
              />
              {formErrorsLocal.otraIndicacion && (
                <div id="otraIndicacion-error" className="text-danger mt-1">
                  {formErrorsLocal.otraIndicacion}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------- FILA 3 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* EXPERTO */}
          <div className="col-md-6">
            <fieldset 
              className={`rounded p-2 mt-2 ${formErrors.experto ? "border-danger" : "border-secondary"}`}
              aria-invalid={!!formErrors.experto}
              aria-describedby={formErrors.experto ? "experto-error" : undefined}
            >
              <legend className="form-label fw-semibold text-secondary">
                ¿Ecografista experto?
              </legend>

              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    id={`experto-${val}`}
                    className="form-check-input"
                    type="radio"
                    name="experto"
                    value={val}
                    checked={formData.experto === val}
                    onChange={handleChange}
                    disabled={datosBloqueados}
                  />
                  <label htmlFor={`experto-${val}`} className="form-check-label">
                    {val === "si" ? "Sí" : "No"}
                  </label>
                </div>
              ))}
            </fieldset>

            {formErrors.experto && (
              <div id="experto-error" className="text-danger mt-1">
                {formErrors.experto}
              </div>
            )}
          </div>
          {/* CENTRO DE REFERENCIA */}
          <div className="col-md-6">
            <fieldset 
              className={`rounded p-2 mt-2 ${formErrors.referencia ? "border-danger" : "border-secondary"}`}
              aria-invalid={!!formErrors.referencia}
              aria-describedby={formErrors.referencia ? "referencia-error" : undefined}
            >
              <legend className="form-label fw-semibold text-secondary">
                ¿Centro de referencia?
              </legend>

              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    id={`referencia-${val}`}
                    className="form-check-input"
                    type="radio"
                    name="referencia"
                    value={val}
                    checked={formData.referencia === val}
                    onChange={handleChange}
                    disabled={datosBloqueados}
                  />
                  <label htmlFor={`referencia-${val}`} className="form-check-label">
                    {val === "si" ? "Sí" : "No"}
                  </label>
                </div>
              ))}
            </fieldset>

            {formErrors.referencia && (
              <div id="referencia-error" className="text-danger mt-1">
                {formErrors.referencia}
              </div>
            )}
          </div>
        </div>      

        {/* ---------- FILA 4 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* ---------- MASA ANEXIAL ---------- */}
          <div className="col-md-6">
            <fieldset
              className={`rounded p-2 mt-2 border ${
                formErrorsLocal.masa ? "border-danger" : "border-secondary"
              }`}
              aria-invalid={!!formErrorsLocal.masa}
              aria-describedby={formErrorsLocal.masa ? "masa-error" : undefined}
            >
              <legend className="form-label fw-semibold text-secondary">
                ¿Hay alguna masa anexial? <span className="text-danger">*</span>
              </legend>

              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="masa"
                    value={val}
                    checked={formData.masa === val}
                    onChange={(e) => handleConditionalChange("masa", e.target.value, ["informeMasa", "informeOvario"])} 
                    disabled={datosBloqueados}
                    id={`masa-${val}`}
                  />
                  <label className="form-check-label ms-1" htmlFor={`masa-${val}`}>
                    {val === "si" ? "Sí" : "No"}
                  </label>
                </div>
              ))}
            </fieldset>

            {formErrorsLocal.masa && (
              <div id="masa-error" className="text-danger mt-1">
                Este campo es obligatorio
              </div>
            )}
          </div>
        </div>  

        {/* BLOQUE DINÁMICO -> masa === "si" */}
        {formData.masa === "si" && (
          <div
            className={`rounded p-3 mb-3 bg-formulario-azul item-appear ${
              formErrors.masa ? "border-danger" : "border-secondary"
            }`}
          >
          <h5 className="fw-semibold titulo-formulario mb-3 titulo-masa">
            INFORME DE LA MASA ANEXIAL
            {masaIndexVisible > 1 && ` #${masaIndexVisible}`}
          </h5>   

            {/* Subcaja 1: datos generales de la masa anexial */}
            <div className="p-3">

              {/* ---------- ROW - Localización / Estructura ---------- */}
              <div className="row">

                {/* LOCALIZACIÓN MASA */}
                <div className="col-md-6">
                  <label
                    htmlFor="localizacion"
                    className="form-label fw-semibold text-secondary"
                  >
                    ¿Dónde está localizada? <span className="text-danger">*</span>
                  </label>

                  <select
                    id="localizacion"
                    name="localizacion"
                    className={`form-select ${
                      formErrorsLocal.localizacion ? "is-invalid" : ""
                    }`}
                    value={formData.localizacion}
                    onChange={(e) => {
                      handleChange(e);
                      setFormErrorsLocal((prev) => {
                        const { localizacion, ...rest } = prev;
                        return rest;
                      });
                    }}
                    aria-invalid={!!formErrorsLocal.localizacion}
                    aria-describedby={
                      formErrorsLocal.localizacion ? "localizacion-error" : undefined
                    }
                  >
                    <option value="" disabled>
                      Seleccione una opción
                    </option>
                    <option value="derecha">Derecha</option>
                    <option value="izquierda">Izquierda</option>
                    <option value="bilateral">Indefinido</option>
                  </select>

                  {formErrorsLocal.localizacion && (
                    <div id="localizacion-error" className="text-danger mt-1">
                      {formErrorsLocal.localizacion}
                    </div>
                  )}
                </div>

                {/* ESTRUCTURA MASA */}
                <div className="col-md-6">
                  <label
                    htmlFor="estructura"
                    className="form-label fw-semibold text-secondary"
                  >
                    ¿De qué estructura depende? <span className="text-danger">*</span>
                  </label>

                  <select
                    id="estructura"
                    name="estructura"
                    className={`form-select ${
                      formErrorsLocal.estructura ? "is-invalid" : ""
                    }`}
                    value={formData.estructura}
                    onChange={(e) => {
                      handleChange(e);
                      setFormErrorsLocal((prev) => {
                        const { estructura, ...rest } = prev;
                        return rest;
                      });
                    }}
                    aria-invalid={!!formErrorsLocal.estructura}
                    aria-describedby={
                      formErrorsLocal.estructura ? "estructura-error" : undefined
                    }
                  >
                    <option value="" disabled>
                      Seleccione una opción
                    </option>
                    <option value="ovario">Ovario</option>
                    <option value="trompa">Trompa</option>
                    <option value="paraovario">Paraovario</option>
                    <option value="indefinido">Indefinido</option>
                  </select>

                  {formErrorsLocal.estructura && (
                    <div id="estructura-error" className="text-danger mt-1">
                      {formErrorsLocal.estructura}
                    </div>
                  )}
                </div>
              </div>

              {/* ---------- ROW - Tipo lesión / Aspectos relacionados con el tipo de lesión ---------- */}
              <div className="row mt-4">
                
                {/* TIPO LESIÓN */}
                <div className="col-md-6">
                  <label htmlFor="tipoLesion" className="form-label fw-semibold text-secondary">
                    ¿Qué tipo de lesión es? <span className="text-danger">*</span>
                  </label>
                  <select
                    id="tipoLesion"
                    name="tipoLesion"
                    className={`form-select ${formErrorsLocal.tipoLesion ? "is-invalid" : ""}`}
                    value={formData.tipoLesion}
                    onChange={handleTipoLesionChange}
                    aria-invalid={!!formErrorsLocal.tipoLesion}
                    aria-describedby={formErrorsLocal.tipoLesion ? "tipoLesion-error" : undefined}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="solido">Sólido</option>
                    <option value="quistica">Quística</option>
                    <option value="solido-quistica">Sólido-quística</option>
                  </select>
                  {formErrorsLocal.tipoLesion && (
                    <div id="tipoLesion-error" className="text-danger mt-1">
                      {formErrorsLocal.tipoLesion}
                    </div>
                  )}
                </div>
  
                {/* ---------- ROW - Según el tipo de lesión ---------- */}

                {/* BLOQUE DINÁMICO (TIPO LESIÓN) || tipoLesion === "solido" */}
                {formData.tipoLesion === "solido" && (
                  <div className="mt-4 row item-appear">
                    {/* CONTORNO EXTERNO */}
                    <div className="col-md-6">
                      <label htmlFor="contornoExterno" className="form-label fw-semibold text-secondary">
                        ¿Cómo es el contorno externo? <span className="text-danger">*</span>
                      </label>
                      <select
                        id="contornoExterno"
                        name="contornoExterno"
                        className={`form-select ${formErrorsLocal.contornoExterno ? "is-invalid" : ""}`}
                        value={formData.contornoExterno}
                        onChange={handleChange}
                        aria-invalid={!!formErrorsLocal.contornoExterno}
                        aria-describedby={formErrorsLocal.contornoExterno ? "contornoExterno-error" : undefined}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="regular">Regular</option>
                        <option value="irregular">Irregular</option>
                      </select>
                      {formErrorsLocal.contornoExterno && (
                        <div id="contornoExterno-error" className="text-danger mt-1">
                          {formErrorsLocal.contornoExterno}
                        </div>
                      )}
                    </div>

                    {/* GRADO VASCULARIZACIÓN */}
                    <div className="col-md-6">
                      <label htmlFor="vascularizacion" className="form-label fw-semibold text-secondary">
                        ¿Cuál es el grado de la vascularización? <span className="text-danger">*</span>
                      </label>
                      <select
                        id="vascularizacion"
                        name="vascularizacion"
                        className={`form-select ${formErrorsLocal.vascularizacion ? "is-invalid" : ""}`}
                        value={formData.vascularizacion}
                        onChange={handleChange}
                        aria-invalid={!!formErrorsLocal.vascularizacion}
                        aria-describedby={formErrorsLocal.vascularizacion ? "vascularizacion-error" : undefined}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                        <option value="leve (score color 2)">Leve (score color 2)</option>
                        <option value="moderado (score color 3)">Moderado (score color 3)</option>
                        <option value="abundante (score color 4)">Abundante (score color 4)</option>
                      </select>
                      {formErrorsLocal.vascularizacion && (
                        <div id="vascularizacion-error" className="text-danger mt-1">
                          {formErrorsLocal.vascularizacion}
                        </div>
                      )}
                    </div>
                  </div>
                )}    
                {/* BLOQUE DINÁMICO (TIPO LESIÓN) || tipoLesion === "quistica" */}
                {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica") && (
                  <div className="item-appear">
                    <div className="mt-4 row">
                      {/* GROSOR PARED */}
                      <div className="col-md-6">
                        <label htmlFor="grosorPared" className="form-label fw-semibold text-secondary">
                          ¿Cuál es el grosor de la pared? (mm) <span className="text-danger">*</span>
                        </label>
                        <input
                          id="grosorPared"
                          name="grosorPared"
                          type="number"
                          min="0"
                          step="0.1"
                          className={`form-control ${formErrorsLocal.grosorPared ? "is-invalid" : ""}`}
                          value={formData.grosorPared}
                          onChange={handleChange}
                          aria-invalid={!!formErrorsLocal.grosorPared}
                          aria-describedby={formErrorsLocal.grosorPared ? "grosorPared-error" : undefined}
                        />
                        {formErrorsLocal.grosorPared && (
                          <div id="grosorPared-error" className="text-danger mt-1">
                            {formErrorsLocal.grosorPared}
                          </div>
                        )}
                      </div>

                      {/* GRADO VASCULARIZACIÓN PARED */}
                      <div className="col-md-6">
                        <label htmlFor="gradoVascularizacionPared" className="form-label fw-semibold text-secondary">
                          ¿Cuál es el grado de la vascularización de la pared? <span className="text-danger">*</span>
                        </label>
                        <select
                          id="gradoVascularizacionPared"
                          name="gradoVascularizacionPared"
                          className={`form-select ${formErrorsLocal.gradoVascularizacionPared ? "is-invalid" : ""}`}
                          value={formData.gradoVascularizacionPared || ""}
                          onChange={handleChange}
                          aria-invalid={!!formErrorsLocal.gradoVascularizacionPared}
                          aria-describedby={formErrorsLocal.gradoVascularizacionPared ? "gradoVascularizacionPared-error" : undefined}
                        >
                          <option value="" disabled>Seleccione una opción</option>
                          <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                          <option value="leve (score color 2)">Leve (score color 2)</option>
                          <option value="moderado (score color 3)">Moderado (score color 3)</option>
                          <option value="abundante (score color 4)">Abundante (score color 4)</option>
                        </select>
                        {formErrorsLocal.gradoVascularizacionPared && (
                          <div id="gradoVascularizacionPared-error" className="text-danger mt-1">
                            {formErrorsLocal.gradoVascularizacionPared}
                          </div>
                        )}
                      </div>
                    </div>    

                    <div className="mt-4 row">
                      {/* CONTORNO INTERNO */}
                      <div className="col-md-6">
                        <label htmlFor="contornoInterno" className="form-label fw-semibold text-secondary">
                          ¿Cómo es el contorno interno? <span className="text-danger">*</span>
                        </label>
                        <select
                          id="contornoInterno"
                          name="contornoInterno"
                          className={`form-select ${formErrorsLocal.contornoInterno ? "is-invalid" : ""}`}
                          value={formData.contornoInterno || ""}
                          onChange={handleChange}
                          aria-invalid={!!formErrorsLocal.contornoInterno}
                          aria-describedby={formErrorsLocal.contornoInterno ? "contornoInterno-error" : undefined}
                        >
                          <option value="" disabled>Seleccione una opción</option>
                          <option value="regular">Regular</option>
                          <option value="irregular">Irregular</option>
                        </select>   
                        {formErrorsLocal.contornoInterno && (
                          <div id="contornoInterno-error" className="text-danger mt-1">
                            {formErrorsLocal.contornoInterno}
                          </div>
                        )}
                      </div>

                      {/* Columna vacía para mantener la alineación */}
                      <div className="col-md-6"></div>
                    </div>
                  </div>
                )}    
              </div>

              {/* ---------- ROW - Tipo de contenido ---------- */}
              <div className="row mt-4">    

                {/* TIPO CONTENIDO */}
                <div className="col-md-6">
                  <label htmlFor="contenido" className="form-label fw-semibold text-secondary">
                    ¿Qué contenido tiene? <span className="text-danger">*</span>
                  </label>
                  <select
                    name="contenido"
                    className={`form-select ${formErrorsLocal.contenido ? "is-invalid" : ""}`}
                    value={formData.contenido}
                    onChange={(e) => {
                      const value = e.target.value;
                      
                      // Actualizamos el select
                      setFormData(prev => ({
                        ...prev,
                        contenido: value,
                        // Si no es 'otro', limpiamos el campo dependiente
                        ...(value !== "otro" ? { otroContenido: "" } : {})
                      }));

                      // Limpiamos errores
                      setFormErrorsLocal(prev => {
                        const { contenido, otroContenido, ...rest } = prev;
                        return rest;
                      });
                    }}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="sonoluscente">Sonoluscente</option>
                    <option value="ecomixto">Ecomixto</option>
                    <option value="en vidrio esmerilado">En vidrio esmerilado</option>
                    <option value="otro">Otro</option>
                  </select>   
                  {formErrorsLocal.contenido && (
                    <div id="contenido-error" className="text-danger mt-1">{formErrorsLocal.contenido}</div>
                  )}
                </div>    

                {/* ---------- ROW - Según el tipo de contenido ---------- */}
                
                {/* BLOQUE DINÁMICO (OTRO CONTENIDO) || contenido === "otro" */}
                {formData.contenido === "otro" && (
                  <div className="mt-4 item-appear">
                    <label htmlFor="otroContenido" className="form-label fw-semibold text-secondary">
                      Otro <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="otroContenido"
                      name="otroContenido"
                      className={`form-control mt-2 ${formErrorsLocal.otroContenido ? "is-invalid" : ""}`}
                      style={{ minHeight: "80px" }}
                      value={formData.otroContenido || ""}
                      onChange={(e) => {
                        handleChange(e);
                        setFormErrorsLocal(prev => {
                          const { otroContenido, ...rest } = prev; 
                          return rest;
                        });
                      }}
                      aria-invalid={!!formErrorsLocal.otroContenido}
                      aria-describedby={formErrorsLocal.otroContenido ? "otroContenido-error" : undefined}
                    ></textarea>
                    {formErrorsLocal.otroContenido && (
                      <div id="otroContenido-error" className="text-danger mt-1">{formErrorsLocal.otroContenido}</div>
                    )}
                  </div>
                )}
              </div>
            </div>    

            {/* MEDIDA MASA ANEXIAL */}
            <div className="p-3">
              <fieldset className="fw-semibold mb-3 titulo-formulario">
                ¿Cuánto mide? 
                <span className="little-text"> (Redondee hasta el número entero que considere)</span>
              </fieldset>
              <fieldset>
                <div className="row">
                  {["T", "AP", "L"].map((eje) => {
                    const fieldName = `medida${eje}`;
                    const fieldId = `medida${eje}-id`;
                    const errorId = `${fieldId}-error`;
                    return (
                      <div className="col-md-4" key={eje}>
                        <label htmlFor={fieldId} className="form-label fw-semibold text-secondary">
                          Medida ({eje}) del POS (mm) <span className="text-danger">*</span>
                        </label>
                        <input
                          id={fieldId}
                          name={fieldName}
                          type="number"
                          min="0"
                          step="0.1"
                          className={`form-control ${formErrorsLocal[fieldName] ? "is-invalid" : ""}`}
                          value={formData[fieldName] ?? ""}
                          onChange={handleChange}
                          aria-required="true"
                          aria-invalid={!!formErrorsLocal[fieldName]}
                          aria-describedby={formErrorsLocal[fieldName] ? errorId : undefined}
                        />
                        {formErrorsLocal[fieldName] && (
                          <div id={errorId} role="alert" className="text-danger mt-1">
                            {formErrorsLocal[fieldName]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {/* BLOQUE DINÁMICO (PAPILAS) || tipoLesion === "quistica"/"solido-quistica" */}
            {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica" || formErrorsLocal.papilas) && (
              <div className="p-3 item-appear">
                {/* PAPILAS */}
                <div className="mb-3">
                  <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">PAPILAS</h5>
                  <fieldset className={`rounded bg-white p-3 w-100 ${formErrorsLocal.papilas ? "border border-danger" : "border border-secondary"}`}>
                    <legend className="form-label fw-semibold text-secondary mb-2">
                      ¿Hay papilas? <span className="text-danger">*</span>
                    </legend>
                    {["si", "no"].map((opt) => {
                      const radioId = `papilas-${opt}`;
                      return (
                        <div className="form-check mb-2" key={opt}>
                          <input
                            id={radioId}
                            className="form-check-input"
                            type="radio"
                            name="papilas"
                            value={opt}
                            checked={formData.papilas === opt}
                            onChange={handlePapilasChange} // ✅ aquí usamos la función correcta
                            aria-invalid={!!formErrorsLocal.papilas}
                            aria-describedby={formErrorsLocal.papilas ? "papilas-error" : undefined}
                          />
                          <label className="form-check-label" htmlFor={radioId}>
                            {opt === "si" ? "Sí" : "No"}
                          </label>
                        </div>
                      );
                    })}
                    {formErrorsLocal.papilas && (
                      <div id="papilas-error" className="text-danger mt-1" role="alert">
                        {formErrorsLocal.papilas}
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
            )}

            {/* INFO DE PAPILAS (solo si papilas === "si" o hay errores) */}
            {(formData.papilas === "si" || ["numeroPapilas", "contornoPapilas", "vascularizacionPapilas", "medidaPapilasT", "medidaPapilasAP"].some(f => formErrorsLocal[f])) && (
              <fieldset className="item-appear w-100 p-3 mb-2" aria-describedby="papilas-legend">
                <legend id="papilas-legend" className="fw-bold mb-3">Información sobre las papilas</legend>

                <div className="row g-3 mb-3">
                  {/* Número de Papilas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label id="label-numeroPapilas" className="form-label fw-semibold text-secondary" htmlFor="numeroPapilas">
                      ¿Cuántas papilas hay? <span className="text-danger">*</span>
                    </label>
                    <input
                      id="numeroPapilas"
                      name="numeroPapilas"
                      type="number"
                      min="0"
                      required
                      aria-required="true"
                      aria-labelledby="label-numeroPapilas"
                      aria-describedby={formErrorsLocal.numeroPapilas ? "error-numeroPapilas" : undefined}
                      aria-invalid={!!formErrorsLocal.numeroPapilas}
                      className={`form-control ${formErrorsLocal.numeroPapilas ? "is-invalid" : ""}`}
                      value={formData.numeroPapilas || ""}
                      onChange={handlePapilasChange} // ✅ aquí también
                    />
                    {formErrorsLocal.numeroPapilas && (
                      <div id="error-numeroPapilas" role="alert" className="text-danger mt-1">
                        {formErrorsLocal.numeroPapilas}
                      </div>
                    )}
                  </div>

                  {/* Contorno Papilas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label id="label-contornoPapilas" className="form-label fw-semibold text-secondary" htmlFor="contornoPapilas">
                      ¿Cómo es el contorno de las papilas? <span className="text-danger">*</span>
                    </label>
                    <select
                      id="contornoPapilas"
                      name="contornoPapilas"
                      required
                      aria-required="true"
                      aria-labelledby="label-contornoPapilas"
                      aria-describedby={formErrorsLocal.contornoPapilas ? "error-contornoPapilas" : undefined}
                      aria-invalid={!!formErrorsLocal.contornoPapilas}
                      className={`form-select ${formErrorsLocal.contornoPapilas ? "is-invalid" : ""}`}
                      value={formData.contornoPapilas || ""}
                      onChange={handlePapilasChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="regular">Regular</option>
                      <option value="irregular">Irregular</option>
                    </select>
                    {formErrorsLocal.contornoPapilas && (
                      <div id="error-contornoPapilas" role="alert" className="text-danger mt-1">
                        {formErrorsLocal.contornoPapilas}
                      </div>
                    )}
                  </div>
                </div>

                {/* Grado de vascularización */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6 d-flex flex-column">
                    <label id="label-vascularPapilas" className="form-label fw-semibold text-secondary" htmlFor="vascularizacionPapilas">
                      ¿Cuál es el grado de la vascularización de las papilas? <span className="text-danger">*</span>
                    </label>
                    <select
                      id="vascularizacionPapilas"
                      name="vascularizacionPapilas"
                      required
                      aria-required="true"
                      aria-labelledby="label-vascularPapilas"
                      aria-describedby={formErrorsLocal.vascularizacionPapilas ? "error-vascularPapilas" : undefined}
                      aria-invalid={!!formErrorsLocal.vascularizacionPapilas}
                      className={`form-select ${formErrorsLocal.vascularizacionPapilas ? "is-invalid" : ""}`}
                      value={formData.vascularizacionPapilas || ""}
                      onChange={handlePapilasChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                      <option value="leve (score color 2)">Leve (score color 2)</option>
                      <option value="moderado (score color 3)">Moderado (score color 3)</option>
                      <option value="abundante (score color 4)">Abundante (score color 4)</option>
                    </select>
                    {formErrorsLocal.vascularizacionPapilas && (
                      <div id="error-vascularPapilas" role="alert" className="text-danger mt-1">
                        {formErrorsLocal.vascularizacionPapilas}
                      </div>
                    )}
                  </div>
                </div>

                {/* Medidas Papilas */}
                <div className="mt-3">
                  <fieldset className="fw-semibold mb-3 titulo-formulario">
                    ¿Cuánto mide la papila mayor?
                    <span className="little-text"> (Redondee hasta el número entero que considere)</span>
                  </fieldset>
                  <div className="row g-3">
                    {["T", "AP"].map((eje) => (
                      <div className="col-md-4 d-flex flex-column" key={eje}>
                        <label id={`label-medidaPapilas${eje}`} className="form-label fw-semibold text-secondary" htmlFor={`medidaPapilas${eje}`}>
                          Medida ({eje}) de la papila (mm) <span className="text-danger">*</span>
                        </label>
                        <input
                          id={`medidaPapilas${eje}`}
                          name={`medidaPapilas${eje}`}
                          type="number"
                          min="0"
                          step="0.1"
                          required
                          aria-required="true"
                          aria-labelledby={`label-medidaPapilas${eje}`}
                          aria-describedby={formErrorsLocal[`medidaPapilas${eje}`] ? `error-medidaPapilas${eje}` : undefined}
                          aria-invalid={!!formErrorsLocal[`medidaPapilas${eje}`]}
                          className={`form-control ${formErrorsLocal[`medidaPapilas${eje}`] ? "is-invalid" : ""}`}
                          value={formData[`medidaPapilas${eje}`] || ""}
                          onChange={handlePapilasChange}
                        />
                        {formErrorsLocal[`medidaPapilas${eje}`] && (
                          <div id={`error-medidaPapilas${eje}`} role="alert" className="text-danger mt-1">
                            {formErrorsLocal[`medidaPapilas${eje}`]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>
            )}

            {/* BLOQUE DINÁMICO (TABIQUES) || tipoLesion === "quistica"/"solido-quistica" */}
            {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica") && (
              <div className="p-3 item-appear">
                <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">TABIQUES</h5>
                <fieldset
                  className={`rounded bg-white p-3 w-100 ${
                    formErrorsLocal.tabiques ? "border border-danger" : "border border-secondary"
                  }`}
                  aria-describedby={formErrorsLocal.tabiques ? "tabiques-error" : undefined}
                >
                  <p className="form-label fw-semibold text-secondary mb-2">
                    ¿Hay tabiques? <span className="text-danger">*</span>
                  </p>

                  {["si", "no"].map((opt) => {
                    const radioId = `tabiques-${opt}`;
                    return (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          id={radioId}
                          className="form-check-input"
                          type="radio"
                          name="tabiques"
                          value={opt}
                          checked={formData.tabiques === opt}
                          onChange={handleTabiquesChange}
                          aria-invalid={!!formErrorsLocal.tabiques}
                        />
                        <label className="form-check-label" htmlFor={radioId}>
                          {opt === "si" ? "Sí" : "No"}
                        </label>
                      </div>
                    );
                  })}

                  {formErrorsLocal.tabiques && (
                    <div id="tabiques-error" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.tabiques}
                    </div>
                  )}
                </fieldset>
              </div>
            )}

            {/* BLOQUE DINÁMICO (INFO DE TABIQUES) || tabiques === "si" */}
            {formData.tabiques === "si" && (
              <fieldset className="item-appear w-100 p-3 mb-2">
                <legend className="fw-bold mb-3">
                  Información sobre los tabiques
                </legend>

                {/* FILA 1 */}
                <div className="row g-3 mb-2">
                  {/* Número de lóculos */}
                  <div className="col-md-6 d-flex flex-column">
                    <label htmlFor="numeroLoculos" className="form-label fw-semibold text-secondary">
                      ¿Cuántos lóculos hay? <span className="text-danger">*</span>
                    </label>
                    <input
                      id="numeroLoculos"
                      name="numeroLoculos"
                      type="number"
                      min="0"
                      className={`form-control ${formErrorsLocal.numeroLoculos ? "is-invalid" : ""}`}
                      value={formData.numeroLoculos || ""}
                      onChange={handleChange}
                      aria-invalid={!!formErrorsLocal.numeroLoculos}
                    />
                    {formErrorsLocal.numeroLoculos && (
                      <div role="alert" className="text-danger mt-1">
                        {formErrorsLocal.numeroLoculos}
                      </div>
                    )}
                  </div>

                  {/* Grosor */}
                  <div className="col-md-6 d-flex flex-column">
                    <label htmlFor="grosorTabiques" className="form-label fw-semibold text-secondary">
                      Grosor de los tabiques (mm) <span className="text-danger">*</span>
                    </label>
                    <input
                      id="grosorTabiques"
                      name="grosorTabiques"
                      type="number"
                      min="0"
                      step="0.1"
                      className={`form-control ${formErrorsLocal.grosorTabiques ? "is-invalid" : ""}`}
                      value={formData.grosorTabiques || ""}
                      onChange={handleChange}
                      aria-invalid={!!formErrorsLocal.grosorTabiques}
                    />
                    {formErrorsLocal.grosorTabiques && (
                      <div role="alert" className="text-danger mt-1">
                        {formErrorsLocal.grosorTabiques}
                      </div>
                    )}
                  </div>
                </div>

                {/* FILA 2 */}
                <div className="row g-3">
                  <div className="col-md-6 d-flex flex-column">
                    <label htmlFor="morfologiaTabiques" className="form-label fw-semibold text-secondary">
                      Morfología de los tabiques <span className="text-danger">*</span>
                    </label>
                    <select
                      id="morfologiaTabiques"
                      name="morfologiaTabiques"
                      className={`form-select ${formErrorsLocal.morfologiaTabiques ? "is-invalid" : ""}`}
                      value={formData.morfologiaTabiques || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="regular">Regular</option>
                      <option value="irregular">Irregular</option>
                    </select>
                  </div>

                  <div className="col-md-6 d-flex flex-column">
                    <label htmlFor="vascularizacionTabiques" className="form-label fw-semibold text-secondary">
                      Grado de la vascularización de los tabiques <span className="text-danger">*</span>
                    </label>
                    <select
                      id="vascularizacionTabiques"
                      name="vascularizacionTabiques"
                      className={`form-select ${formErrorsLocal.vascularizacionTabiques ? "is-invalid" : ""}`}
                      value={formData.vascularizacionTabiques || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                      <option value="leve (score color 2)">Leve (score color 2)</option>
                      <option value="moderado (score color 3)">Moderado (score color 3)</option>
                      <option value="abundante (score color 4)">Abundante (score color 4)</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            )}

            {/* ------------------------------------ACCESIBILIDAD WCAG 2.2 (here!!!!!!!) ----------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------------------------------------ */} 

            {/* BLOQUE DINÁMICO (ÁREA SÓLIDA) || tipoLesion === "quistica"/"solido-quistica" */}
            {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica") && (
              <div className="p-3 item-appear">
                <div>
                  <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">ÁREA SÓLIDA</h5>
                  <fieldset
                    className={`rounded bg-white p-3 w-100 ${
                      formErrorsLocal.areaSolida ? "border-danger" : "border-secondary"
                    }`}
                    aria-describedby={formErrorsLocal.areaSolida ? "areaSolida-error" : undefined}
                  >
                    <legend className="form-label fw-semibold text-secondary mb-2">
                      ¿Hay área sólida? <span className="text-danger">*</span>
                    </legend>

                    {["si", "no"].map((opt) => {
                      const radioId = `areaSolida-${opt}`;
                      return (
                        <div className="form-check mb-2" key={opt}>
                          <input
                            id={radioId}
                            className="form-check-input"
                            type="radio"
                            name="areaSolida"
                            value={opt}
                            checked={formData.areaSolida === opt}
                            onChange={handleAreaSolidaChange}
                            aria-invalid={!!formErrorsLocal.areaSolida}
                          />
                          <label className="form-check-label" htmlFor={radioId}>
                            {opt === "si" ? "Sí" : "No"}
                          </label>
                        </div>
                      );
                    })}

                    {formErrorsLocal.areaSolida && (
                      <div
                        id="areaSolida-error"
                        className="text-danger mt-1"
                        role="alert"
                      >
                        {formErrorsLocal.areaSolida}
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
            )}
  
            {/* BLOQUE DINÁMICO (INFO ÁREA SÓLIDA) || areaSolida === "si" */}
            {formData.areaSolida === "si" && (
              <fieldset
                className="item-appear w-100 p-3 mb-2"
                aria-describedby="area-solida-legend"
              >
                <legend id="area-solida-legend" className="fw-bold mb-3">
                  Información del área sólida
                </legend>

                {/* FILA 1: número + vascularización */}
                <div className="row g-3 mb-0">

                  {/* Número de áreas sólidas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label
                      htmlFor="numeroAreasSolidas"
                      className="form-label fw-semibold text-secondary"
                    >
                      Número de áreas sólidas <span className="text-danger">*</span>
                    </label>

                    <input
                      id="numeroAreasSolidas"
                      name="numeroAreasSolidas"
                      type="number"
                      min="0"
                      required
                      aria-required="true"
                      aria-invalid={!!formErrorsLocal.numeroAreasSolidas}
                      aria-describedby={
                        formErrorsLocal.numeroAreasSolidas
                          ? "error-numeroAreasSolidas"
                          : undefined
                      }
                      className={`form-control ${
                        formErrorsLocal.numeroAreasSolidas ? "is-invalid" : ""
                      }`}
                      value={formData.numeroAreasSolidas || ""}
                      onChange={handleChange}
                    />

                    {formErrorsLocal.numeroAreasSolidas && (
                      <div
                        id="error-numeroAreasSolidas"
                        role="alert"
                        className="text-danger mt-1"
                      >
                        {formErrorsLocal.numeroAreasSolidas}
                      </div>
                    )}
                  </div>

                  {/* Vascularización de áreas sólidas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label
                      htmlFor="vascularizacionAreasSolidas"
                      className="form-label fw-semibold text-secondary"
                    >
                      Vascularización de las áreas sólidas <span className="text-danger">*</span>
                    </label>

                    <select
                      id="vascularizacionAreasSolidas"
                      name="vascularizacionAreasSolidas"
                      required
                      aria-required="true"
                      aria-invalid={!!formErrorsLocal.vascularizacionAreasSolidas}
                      aria-describedby={
                        formErrorsLocal.vascularizacionAreasSolidas
                          ? "error-vascularizacionAreasSolidas"
                          : undefined
                      }
                      className={`form-select ${
                        formErrorsLocal.vascularizacionAreasSolidas ? "is-invalid" : ""
                      }`}
                      value={formData.vascularizacionAreasSolidas || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                      <option value="leve (score color 2)">Leve (score color 2)</option>
                      <option value="moderado (score color 3)">Moderado (score color 3)</option>
                      <option value="abundante (score color 4)">Abundante (score color 4)</option>
                    </select>

                    {formErrorsLocal.vascularizacionAreasSolidas && (
                      <div
                        id="error-vascularizacionAreasSolidas"
                        role="alert"
                        className="text-danger mt-1"
                      >
                        {formErrorsLocal.vascularizacionAreasSolidas}
                      </div>
                    )}
                  </div>
                </div>

                {/* FILA 2: medidas */}
                <div className="row g-3 mt-2 mb-0">

                  {[
                    { eje: "T", campo: "medidaASolidaT" },
                    { eje: "AP", campo: "medidaASolidaAP" },
                    { eje: "L", campo: "medidaASolidaL" },
                  ].map(({ eje, campo }) => (
                    <div className="col-md-4 d-flex flex-column" key={campo}>
                      <label
                        htmlFor={campo}
                        className="form-label fw-semibold text-secondary"
                      >
                        Medida {eje} (mm) <span className="text-danger">*</span>
                      </label>
                      <input
                        id={campo}
                        name={campo}
                        type="number"
                        min="0"
                        step="0.1"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrorsLocal[campo]}
                        aria-describedby={
                          formErrorsLocal[campo] ? `error-${campo}` : undefined
                        }
                        className={`form-control ${
                          formErrorsLocal[campo] ? "is-invalid" : ""
                        }`}
                        value={formData[campo] || ""}
                        onChange={handleChange}
                      />

                      {formErrorsLocal[campo] && (
                        <div
                          id={`error-${campo}`}
                          role="alert"
                          className="text-danger mt-1"
                        >
                          {formErrorsLocal[campo]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Subcaja 3: otras características (desde Sombra acústica posterior hasta el final) */}
            <div className="p-3 mb-3">    
              {/* SOMBRA ACÚSTICA POSTERIOR */}
              <div className="mb-3">
                <legend className="fw-semibold text-uppercase mb-2 titulo-formulario">SOMBRA ACÚSTICA POSTERIOR</legend>
                <fieldset
                  className={`rounded bg-white p-3 w-100 ${formErrorsLocal.sombra ? "border border-danger" : "border border-secondary"}`}
                  aria-invalid={!!formErrorsLocal.sombra}
                  aria-describedby={formErrorsLocal.sombra ? "error-sombra" : undefined}
                >
                  <p className="form-label fw-semibold text-secondary mb-2">
                    ¿Tiene sombra acústica posterior? <span className="text-danger">*</span>
                  </p>

                  {["si", "no"].map((opt) => {
                    const inputId = `sombra-${opt}`;
                    return (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          id={inputId}
                          className="form-check-input"
                          type="radio"
                          name="sombra"
                          value={opt}
                          checked={formData.sombra === opt}
                          onChange={(e) => handleConditionalChange("sombra", e.target.value)}
                          aria-invalid={!!formErrorsLocal.sombra}
                          aria-describedby={formErrorsLocal.sombra ? "error-sombra" : undefined}
                        />
                        <label className="form-check-label" htmlFor={inputId}>
                          {opt === "si" ? "Sí" : "No"}
                        </label>
                      </div>
                    );
                  })}

                  {formErrorsLocal.sombra && (
                    <div id="error-sombra" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.sombra}
                    </div>
                  )}
                </fieldset>
              </div>
 
              {/* BLOQUE PARÉNQUIMA OVÁRICO SANO */}
              <div className="mb-3 mt-3">
                <legend className="fw-semibold text-uppercase mb-2 titulo-formulario">PARÉNQUIMA OVÁRICO SANO</legend>
                <fieldset
                  className={`rounded bg-white p-3 w-100 ${formErrorsLocal.parenquima ? "border border-danger" : "border border-secondary"}`}
                  aria-invalid={!!formErrorsLocal.parenquima}
                  aria-describedby={formErrorsLocal.parenquima ? "error-parenquima" : undefined}
                >
                  <p className="form-label fw-semibold text-secondary mb-2">
                    ¿Tiene parénquima ovárico sano? <span className="text-danger">*</span>
                  </p>

                  {["si","no","no consigo determinarlo"].map((opt) => {
                    const valueMap = { "si": "si", "no": "no", "no consigo determinarlo": "no determinado" };
                    const inputId = `parenquima-${opt.replace(/\s+/g, "")}`;
                    return (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          id={inputId}
                          className="form-check-input"
                          type="radio"
                          name="parenquima"
                          value={valueMap[opt]}
                          checked={formData.parenquima === valueMap[opt]}
                          onChange={(e) => handleConditionalChange("parenquima", e.target.value)}
                          aria-invalid={!!formErrorsLocal.parenquima}
                          aria-describedby={formErrorsLocal.parenquima ? "error-parenquima" : undefined}
                        />
                        <label className="form-check-label" htmlFor={inputId}>
                          {opt === "si" ? "Sí" : opt === "no" ? "No" : "No consigo determinarlo"}
                        </label>
                      </div>
                    );
                  })}

                  {formErrorsLocal.parenquima && (
                    <div id="error-parenquima" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.parenquima}
                    </div>
                  )}
                </fieldset>
              </div>
    
              {/* BLOQUE DINÁMICO PARÉNQUIMA */}
              {formData.parenquima === "si" && (
                <div className="mb-3 mt-4 item-appear">
                  <h5 className="fw-semibold mb-3 titulo-formulario">
                    ¿Cuánto mide? <text className="little-text">(Redondee hasta el número entero que considere)</text>
                  </h5>
                  <div className="row">
                    {["T","AP","L"].map((eje) => (
                      <div className="col-md-4" key={eje}>
                        <label className="form-label fw-semibold text-secondary">
                          Medida ({eje}) del POS (mm) <span className="text-danger">*</span>
                        </label>
                        <input
                          name={`medidaPos${eje}`}
                          type="number"
                          min="0"
                          step="0.1"
                          className={`form-control ${formErrorsLocal[`medidaPos${eje}`] ? "is-invalid" : ""}`}
                          value={formData[`medidaPos${eje}`] || ""}
                          onChange={handleChange}
                        />
                        {formErrorsLocal[`medidaPos${eje}`] && (
                          <div className="text-danger mt-1">{formErrorsLocal[`medidaPos${eje}`]}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}    

              {/* ASCITIS */}
              <div className="mb-3">
                <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">ASCITIS</h5>
                <fieldset className={`rounded bg-white p-3 w-100 ${formErrorsLocal.ascitis ? "border-danger" : "border-secondary"}`}>
                  <legend className="form-label fw-semibold text-secondary mb-2">
                    ¿Tiene ascitis? <span className="text-danger">*</span>
                  </legend>
                  {["si", "no"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`ascitis-${opt}`}
                        name="ascitis"
                        value={opt}
                        checked={formData.ascitis === opt}
                        onChange={(e) => handleConditionalChange("ascitis", e.target.value)}
                        aria-invalid={!!formErrorsLocal.ascitis}
                        aria-describedby={formErrorsLocal.ascitis ? "error-ascitis" : undefined}
                      />
                      <label className="form-check-label" htmlFor={`ascitis-${opt}`}>
                        {opt === "si" ? "Sí" : "No"}
                      </label>
                    </div>
                  ))}
                </fieldset>
                {formErrorsLocal.ascitis && (
                  <div className="text-danger mt-1" id="error-ascitis">{formErrorsLocal.ascitis}</div>
                )}

                {/* BLOQUE DINÁMICO || ascitis === "si" */}
                {formData.ascitis === "si" && (
                  <div className="mt-3 mb-3 item-appear">
                    <label className="form-label fw-semibold text-secondary" htmlFor="tipoAscitis">
                      ¿De qué tipo es la ascitis? <span className="text-danger">*</span>
                    </label>
                    <select
                      name="tipoAscitis"
                      id="tipoAscitis"
                      className={`form-select ${formErrorsLocal.tipoAscitis ? "is-invalid" : ""}`}
                      value={formData.tipoAscitis || ""}
                      onChange={handleChange}
                      aria-invalid={!!formErrorsLocal.tipoAscitis}
                      aria-describedby={formErrorsLocal.tipoAscitis ? "error-tipoAscitis" : undefined}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="leve">Leve</option>
                      <option value="moderada">Moderada</option>
                      <option value="abundante">Abundante</option>
                    </select>
                    {formErrorsLocal.tipoAscitis && (
                      <div className="text-danger mt-1" id="error-tipoAscitis">{formErrorsLocal.tipoAscitis}</div>
                    )}
                  </div>
                )}
              </div>
              
              {/* CARCINOMATOSIS */}
              <div className="mb-3">
                <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">CARCINOMATOSIS</h5>
                <fieldset className={`rounded bg-white p-3 w-100 ${formErrorsLocal.carcinomatosis ? "border-danger" : "border-secondary"}`}>
                  <legend className="form-label fw-semibold text-secondary mb-2">
                    ¿Tiene carcinomatosis? <span className="text-danger">*</span>
                  </legend>
                  {["si", "no", "no valorable"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`carcinomatosis-${opt}`}
                        name="carcinomatosis"
                        value={opt}
                        checked={formData.carcinomatosis === opt}
                        onChange={handleChange}
                        aria-invalid={!!formErrorsLocal.carcinomatosis}
                        aria-describedby={formErrorsLocal.carcinomatosis ? "error-carcinomatosis" : undefined}
                      />
                      <label className="form-check-label" htmlFor={`carcinomatosis-${opt}`}>
                        {opt === "si" ? "Sí" : opt === "no" ? "No" : "No valorable"}
                      </label>
                    </div>
                  ))}
                </fieldset>
                {formErrorsLocal.carcinomatosis && (
                  <div className="text-danger mt-1" id="error-carcinomatosis">{formErrorsLocal.carcinomatosis}</div>
                )}
              </div>
                
              {/* ANATOMÍA PATOLÓGICA */}
              <div className="mb-3">
                <fieldset className="rounded bg-white p-3 w-100 border border-secondary">
                  <legend className="form-label fw-semibold text-secondary mb-2">
                    ¿Se ha realizado anatomía patológica posterior?
                  </legend>
                  {["si", "no", "pendiente"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`anatomiaPatologica-${opt}`}
                        name="anatomiaPatologica"
                        value={opt}
                        checked={formData.anatomiaPatologica === opt}
                        onChange={(e) => handleConditionalChange("anatomiaPatologica", e.target.value)}
                        aria-invalid={!!formErrorsLocal.anatomiaPatologica}
                        aria-describedby={formErrorsLocal.anatomiaPatologica ? "error-anatomiaPatologica" : undefined}
                      />
                      <label className="form-check-label" htmlFor={`anatomiaPatologica-${opt}`}>
                        {opt === "si" ? "Sí" : opt === "no" ? "No" : "Pendiente"}
                      </label>
                    </div>
                  ))}
                </fieldset>
              </div>
      
              {/* BLOQUE DINÁMICO (ANATOMÍA PATOLÓGICA) || anatomiaPatologica === "si" */}
              {formData.anatomiaPatologica === "si" && (
                <div className="mb-3 item-appear">
                  <label className="form-label fw-semibold text-secondary" htmlFor="indicaPatologia">
                    Anatomía patológica definitiva: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="indicaPatologia"
                    id="indicaPatologia"
                    className={`form-control ${formErrorsLocal.indicaPatologia ? "is-invalid" : ""}`}
                    value={formData.indicaPatologia || ""}
                    onChange={handleChange}
                    aria-invalid={!!formErrorsLocal.indicaPatologia}
                    aria-describedby={formErrorsLocal.indicaPatologia ? "error-indicaPatologia" : undefined}
                  />
                  {formErrorsLocal.indicaPatologia && (
                    <div className="text-danger mt-1" id="error-indicaPatologia">{formErrorsLocal.indicaPatologia}</div>
                  )}
                </div>
              )}

              {/* BLOQUE DINÁMICO (ANATOMÍA PATOLÓGICA) || anatomiaPatologica === "no" */}
              {formData.anatomiaPatologica === "no" && (
                <div className="mb-3 item-appear">
                  <label className="form-label fw-semibold text-secondary">
                    ¿La lesión ha estado estable durante el último año? <span className="text-danger">*</span>
                  </label>
                  <fieldset className={`rounded bg-white p-3 w-100 ${formErrorsLocal.lesionUltimoAnio ? "border-danger" : "border-secondary"}`}>
                    <legend className="sr-only">¿La lesión ha estado estable durante el último año?</legend>
                    {["si", "no"].map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          id={`lesionUltimoAnio-${opt}`}
                          name="lesionUltimoAnio"
                          value={opt}
                          checked={formData.lesionUltimoAnio === opt}
                          onChange={handleChange}
                          aria-invalid={!!formErrorsLocal.lesionUltimoAnio}
                          aria-describedby={formErrorsLocal.lesionUltimoAnio ? "error-lesionUltimoAnio" : undefined}
                        />
                        <label className="form-check-label" htmlFor={`lesionUltimoAnio-${opt}`}>
                          {opt === "si" ? "Sí" : "No"}
                        </label>
                      </div>
                    ))}
                  </fieldset>
                  {formErrorsLocal.lesionUltimoAnio && (
                    <div className="text-danger mt-1" id="error-lesionUltimoAnio">{formErrorsLocal.lesionUltimoAnio}</div>
                  )}
                </div>
              )}

            </div>    

            {/* BLOQUE DINÁMICO (PROBABILIDAD DE MALIGNIDAD) || tipoLesion === "quistica" */}
            {formData.tipoLesion === "quistica" && (
              <div className="p-3 item-appear">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary d-block mb-2">
                    ¿Quiere calcular la probabilidad de malignidad según los datos ecográficos encontrados?
                    <span className="text-danger">*</span>
                  </label>    
                  <div
                    className={`rounded bg-white p-3 w-100 ${
                      formErrorsLocal.probabilidadMalignidad ? "border-danger" : "border-secondary"
                    }`}
                  >
                    {["si", "no"].map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="probabilidadMalignidad"
                          value={opt}
                          checked={formData.probabilidadMalignidad === opt}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{opt === "si" ? "Sí" : "No"}</label>
                      </div>
                    ))}
                  </div>
                  {formErrorsLocal.probabilidadMalignidad && (
                    <div className="text-danger mt-1">{formErrorsLocal.probabilidadMalignidad}</div>
                  )}    
                </div>
              </div>
            )}    
          </div>
        )}    

        {/* BLOQUE SI MASA ANEXIAL = NO */}
        {formData.masa === "no" && (
          <div
            className="d-flex flex-column gap-4 mb-3 item-appear"
            aria-hidden={formData.masa !== "no"}
          >

            {/* ================= OVARIO DERECHO ================= */}
            <fieldset className="border rounded p-3 bg-formulario-azul item-appear">
              <h5 className="fw-semibold mb-3 titulo-formulario">
                INFORME DEL OVARIO DERECHO
              </h5>
              <h5 className="fw-semibold mb-3 titulo-formulario">
                ¿Cuánto mide? <text className="little-text">(Redondee hasta el número entero que considere)</text>
              </h5>

              <div className="row mb-3">
                {/* Medida T */}
                <div className="col-md-6">
                  <label
                    htmlFor="ovarioDerechoT"
                    className="form-label fw-semibold text-secondary"
                  >
                    Medida (T) del OD (mm)
                  </label>
                  <input
                    id="ovarioDerechoT"
                    name="ovarioDerechoT"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${formErrorsLocal.ovarioDerechoT ? "is-invalid" : ""}`}
                    value={formData.ovarioDerechoT || ""}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrorsLocal.ovarioDerechoT}
                    aria-describedby={formErrorsLocal.ovarioDerechoT ? "error-od-t" : undefined}
                  />
                  {formErrorsLocal.ovarioDerechoT && (
                    <div id="error-od-t" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.ovarioDerechoT}
                    </div>
                  )}
                </div>

                {/* Medida AP */}
                <div className="col-md-6">
                  <label
                    htmlFor="ovarioDerechoAP"
                    className="form-label fw-semibold text-secondary"
                  >
                    Medida (AP) del OD (mm)
                  </label>
                  <input
                    id="ovarioDerechoAP"
                    name="ovarioDerechoAP"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${formErrorsLocal.ovarioDerechoAP ? "is-invalid" : ""}`}
                    value={formData.ovarioDerechoAP || ""}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrorsLocal.ovarioDerechoAP}
                    aria-describedby={formErrorsLocal.ovarioDerechoAP ? "error-od-ap" : undefined}
                  />
                  {formErrorsLocal.ovarioDerechoAP && (
                    <div id="error-od-ap" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.ovarioDerechoAP}
                    </div>
                  )}
                </div>
              </div>

              {/* Folículos OD */}
              <div className="col-md-6">
                <label
                  htmlFor="foliculosOD"
                  className="form-label fw-semibold text-secondary"
                >
                  ¿Cuántos folículos tiene el OD?
                </label>
                <select
                  id="foliculosOD"
                  name="foliculosOD"
                  className={`form-select ${formErrorsLocal.foliculosOD ? "is-invalid" : ""}`}
                  value={formData.foliculosOD || ""}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!formErrorsLocal.foliculosOD}
                  aria-describedby={formErrorsLocal.foliculosOD ? "error-foliculos-od" : undefined}
                >
                  <option value="" disabled>Seleccione una opción</option>
                  {["1","2","3","4","5","6","7","8","9","10",">10"].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {formErrorsLocal.foliculosOD && (
                  <div id="error-foliculos-od" role="alert" className="text-danger mt-1">
                    {formErrorsLocal.foliculosOD}
                  </div>
                )}
              </div>
            </fieldset>

            {/* ================= OVARIO IZQUIERDO ================= */}
            <fieldset className="border rounded p-3 bg-formulario-azul item-appear">
              <h5 className="fw-semibold mb-3 titulo-formulario">
                INFORME DEL OVARIO IZQUIERDO
              </h5>
              <h5 className="fw-semibold mb-3 titulo-formulario">
                ¿Cuánto mide? <text className="little-text">(Redondee hasta el número entero que considere)</text>
              </h5>
              
              <div className="row mb-3">
                {/* Medida T */}
                <div className="col-md-6">
                  <label htmlFor="ovarioIzquierdoT" className="form-label fw-semibold text-secondary">
                    Medida (T) del OI (mm)
                  </label>
                  <input
                    id="ovarioIzquierdoT"
                    name="ovarioIzquierdoT"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${formErrorsLocal.ovarioIzquierdoT ? "is-invalid" : ""}`}
                    value={formData.ovarioIzquierdoT || ""}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrorsLocal.ovarioIzquierdoT}
                    aria-describedby={formErrorsLocal.ovarioIzquierdoT ? "error-oi-t" : undefined}
                  />
                  {formErrorsLocal.ovarioIzquierdoT && (
                    <div id="error-oi-t" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.ovarioIzquierdoT}
                    </div>
                  )}
                </div>

                {/* Medida AP */}
                <div className="col-md-6">
                  <label htmlFor="ovarioIzquierdoAP" className="form-label fw-semibold text-secondary">
                    Medida (AP) del OI (mm)
                  </label>
                  <input
                    id="ovarioIzquierdoAP"
                    name="ovarioIzquierdoAP"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${formErrorsLocal.ovarioIzquierdoAP ? "is-invalid" : ""}`}
                    value={formData.ovarioIzquierdoAP || ""}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrorsLocal.ovarioIzquierdoAP}
                    aria-describedby={formErrorsLocal.ovarioIzquierdoAP ? "error-oi-ap" : undefined}
                  />
                  {formErrorsLocal.ovarioIzquierdoAP && (
                    <div id="error-oi-ap" role="alert" className="text-danger mt-1">
                      {formErrorsLocal.ovarioIzquierdoAP}
                    </div>
                  )}
                </div>
              </div>

              {/* Folículos OI */}
              <div className="col-md-6">
                <label htmlFor="foliculosOI" className="form-label fw-semibold text-secondary">
                  ¿Cuántos folículos tiene el OI?
                </label>
                <select
                  id="foliculosOI"
                  name="foliculosOI"
                  className={`form-select ${formErrorsLocal.foliculosOI ? "is-invalid" : ""}`}
                  value={formData.foliculosOI || ""}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!formErrorsLocal.foliculosOI}
                  aria-describedby={formErrorsLocal.foliculosOI ? "error-foliculos-oi" : undefined}
                >
                  <option value="" disabled>Seleccione una opción</option>
                  {["1","2","3","4","5","6","7","8","9","10",">10"].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {formErrorsLocal.foliculosOI && (
                  <div id="error-foliculos-oi" role="alert" className="text-danger mt-1">
                    {formErrorsLocal.foliculosOI}
                  </div>
                )}
              </div>
            </fieldset>

          </div>
        )}

        {/* MODAL DE ADVERTENCIA */}
        <div
          className="modal fade"
          id="requiredInputsModal"
          tabIndex="-1"
          aria-labelledby="warningModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger-subtle">
                <h5 className="modal-title text-danger fw-semibold" id="warningModalLabel">
                  ¡Atención!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                Debe rellenar todos los campos obligatorios antes de continuar.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger text-white"
                  data-bs-dismiss="modal"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>    

        {/* MODAL DE CONFIRMACIÓN */}
        <div
          className="modal fade"
          id="confirmMassModal"
          tabIndex="-1"
          aria-labelledby="confirmMassLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-primary">
              <div className="modal-header bg-primary-subtle">
                <h5 className="modal-title fw-semibold" id="confirmMassLabel">
                  Confirmación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Pulse <strong>continuar</strong> para elaborar el informe.
                  <br />
                  <strong>Si continúa no podrá volver a este cuestionario.</strong>
                </p>
                {/* TEXTAREA PARA LA CONCLUSIÓN ECÓGRAFISTA */}
                <div className="mb-3">
                  <label htmlFor="conclusionEcografista" className="form-label fw-bold">
                    Conclusión del ecografista:
                  </label>
                  <textarea
                    id="conclusionEcografista"
                    className="form-control"
                    rows={4}
                    value={formData.conclusionEcografista || ''} // Ahora es un controlado
                    onChange={(e) => setFormData({ ...formData, conclusionEcografista: e.target.value })} // Sincroniza con el estado
                  />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                {/* BOTÓN CONTINUAR */}
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    // Obtener la conclusión directamente desde formData
                    const conclusionValue = formData.conclusionEcografista?.trim();

                    console.log("Conclusión:", conclusionValue); // Solo para depuración

                    // Continuar con el resto de la lógica para generar el informe
                    const payload = {
                      ...formData,
                      tipoInforme: formData.masa === "si" ? "masa" : "ovario", // Condición según el tipo de informe
                      conclusionEcografista: conclusionValue, // Puede estar vacío
                    };
                    makeMassesReport(payload);
                  }}
                >
                  Continuar
                </button>
                {/* BOTÓN CANCELAR */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTONES INFORME */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* BLOQUE DINÁMICO -> masa === "si" */}
          {/* Botón - Añadir masa anexial */}
          {formData.masa === "si" && (
            <button
              type="button"
              className="btn btn-success d-flex align-items-center"
              onClick={handleAddMasa}
              disabled
            >
              <span style={{ fontSize: "20px", marginRight: "6px" }}>+</span>
              Añadir masa anexial
            </button>
          )}
          {/* Botón - Siguiente */}
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleGenerarInforme}  // ⬅️ aquí
          >
            Generar informe
          </button>
        </div>
      </form>
    </div>
  );
};

export default MassesFormView;
