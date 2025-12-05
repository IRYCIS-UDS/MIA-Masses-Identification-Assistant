import { useEffect } from 'react';
import "../assets/css/MassesFormView.css";

const MassesFormView = ({
  formData,
  setFormData,
  formErrors,
  formErrorsLocal,
  handleChange,
  handleMasaChange,
  handleAddMasa,
  handleGenerarInforme,
  masas,
  payload,
  conclusionRef,
  masaIndexVisible,
  datosBloqueados,
  handleSubmit,
  makeMassesReport,
  setFormErrorsLocal,
  handleConfirmarInforme,
  refConclusion,
  validarMasaSi
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
      <h4 className="fw-bold mb-3 titulo-formulario">Cuestionario</h4>
      <form onSubmit={handleSubmit} className="mi-formulario">    
        {/* ---------- FILA 1 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* CÓDIGO PACIENTE */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Código de paciente del estudio 
            </label>
            <input
              name="codigo"
              type="text"
              className={`form-control ${formErrors.codigo ? "is-invalid" : ""}`}
              value={formData.codigo}
              onChange={handleChange}
              disabled={datosBloqueados}
            />
            <div className="invalid-feedback">{formErrors.codigo}</div>
          </div>
          {/* EDAD PACIENTE */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Edad 
            </label>
            <input
              name="edad"
              type="number"
              min="0"
              step="0.1"
              className={`form-control ${formErrors.edad ? "is-invalid" : ""}`}
              value={formData.edad}
              onChange={handleChange}
              disabled={datosBloqueados}
            />
            <div className="invalid-feedback">{formErrors.edad}</div>
          </div>
          {/* FUR (FECHA ÚLTIMA REGLA) */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              FUR 
            </label>
            <input
              name="fur"
              type="date"
              className={`form-control ${formErrors.fur ? "is-invalid" : ""}`}
              value={formData.fur}
              onChange={handleChange}
              disabled={datosBloqueados}
              max={new Date().toISOString().split("T")[0]}
            />
            {formErrors.fur && <div className="invalid-feedback">{formErrors.fur}</div>}
          </div>
        </div>    
        {/* ---------- FILA 2 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* SIGLAS ECO */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Siglas del ecografista 
            </label>
            <input
              name="ecografista"
              type="text"
              className={`form-control ${formErrors.ecografista ? "is-invalid" : ""}`}
              value={formData.ecografista}
              onChange={handleChange}
              disabled={datosBloqueados}
            />
            <div className="invalid-feedback">{formErrors.ecografista}</div>
          </div>
          {/* HOSPITAL */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Hospital participante 
            </label>
            <select
              name="hospital"
              className={`form-select ${formErrors.hospital ? "is-invalid" : ""}`}
              value={formData.hospital}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="hurc">Hospital Ramón y Cajal</option>
              <option value="h12o">Hospital 12 de Octubre</option>
            </select>
            <div className="invalid-feedback">{formErrors.hospital}</div>
          </div>
          {/* INDICACIÓN ECO */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">
              Indicación de ecografía 
            </label>
            <select
              name="indicacion"
              className={`form-select ${formErrors.indicacion ? "is-invalid" : ""}`}
              value={formData.indicacion}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="dolor abdominal">Dolor abdominal</option>
              <option value="distension abdominal">Distensión abdominal</option>
              <option value="sangrado">Sangrado</option>
              <option value="hallazgo">Hallazgo accidental</option>
              <option value="otro">Otro</option>
            </select>
            <div className="invalid-feedback">{formErrors.indicacion}</div>
          </div>
        </div>    

        {/* BLOQUE DINÁMICO (INDICACIÓN DE ECOGRAFÍA) || indicacion === "no" */}
        {formData.indicacion === "otro" && (
          <div className="row mb-3">
            <div className="col-md-12 item-appear">
              <label className="form-label fw-semibold text-secondary">
                Otro <span className="text-danger">*</span>
              </label>
              <textarea
                name="otraIndicacion"
                className={`form-control mt-2 ${formErrorsLocal.otraIndicacion ? "is-invalid" : ""}`}
                style={{ minHeight: "80px" }}
                value={formData.otraIndicacion || ""}
                onChange={handleChange}
              />
              {formErrorsLocal.otraIndicacion && (
                <div className="text-danger mt-1">{formErrorsLocal.otraIndicacion}</div>
              )}
            </div>
          </div>
        )}
        
        {/* ---------- FILA 3 FORMULARIO ---------- */}
        <div className="row mb-3">
        {/* EXPERTO */}
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary">
            ¿Ecografista experto? 
          </label>    
          <div
            className={`rounded p-2 mt-2 ${
              formErrors.experto ? "border-danger" : "border-secondary"
            }`}
          >
            {["si", "no"].map((val) => (
              <div className="form-check" key={val}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="experto"
                  value={val}
                  checked={formData.experto === val}
                  onChange={handleChange}
                  disabled={datosBloqueados}
                />
                <label className="form-check-label">
                  {val === "si" ? "Sí" : "No"}
                </label>
              </div>
            ))}
          </div>    
          {formErrors.experto && (
            <div className="text-danger mt-1">{formErrors.experto}</div>
          )}
        </div>
        {/* CENTRO DE REFERENCIA */}
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary">
            ¿Centro de referencia? 
          </label>    
          <div
            className={`rounded p-2 mt-2 ${
              formErrors.referencia ? "border-danger" : "border-secondary"
            }`}
          >
            {["si", "no"].map((val) => (
              <div className="form-check" key={val}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="referencia"
                  value={val}
                  checked={formData.referencia === val}
                  onChange={handleChange}
                  disabled={datosBloqueados}
                />
                <label className="form-check-label">
                  {val === "si" ? "Sí" : "No"}
                </label>
              </div>
            ))}
          </div>    
          {formErrors.referencia && (
            <div className="text-danger mt-1">{formErrors.referencia}</div>
          )}
        </div>
        </div>      
        {/* ---------- FILA 4 FORMULARIO ---------- */}
        <div className="row mb-3">
          {/* ---------- MASA ANEXIAL ---------- */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">
              ¿Hay alguna masa anexial? <span className="text-danger">*</span>
            </label>    
            {/* Caja con borde dinámico */}
            <div
              className={`rounded p-2 mt-2 ${formErrorsLocal.masa ? "border-danger" : "border-secondary"}`}
            >
              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    className="form-check-input" // <-- eliminamos el is-invalid aquí
                    type="radio"
                    name="masa"
                    value={val}
                    checked={formData.masa === val}
                    onChange={handleMasaChange}
                    disabled={datosBloqueados}
                  />
                  <label className="form-check-label ms-1">
                    {val === "si" ? "Sí" : "No"}
                  </label>
                </div>
              ))}
            </div>    
            {/* Mensaje de error */}
            {formErrorsLocal.masa && (
              <div className="text-danger mt-1">Este campo es obligatorio</div>
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
              <div className="row"> {/* Fila 1 */}
                {/* LOCALIZACIÓN MASA */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    ¿Dónde está localizada? <span className="text-danger">*</span>
                  </label>
                  <select
                    name="localizacion"
                    className={`form-select ${formErrorsLocal.localizacion ? "is-invalid" : ""}`}
                    value={formData.localizacion}
                    onChange={(e) => {
                      handleChange(e);
                      setFormErrorsLocal(prev => {
                        const { localizacion, ...rest } = prev; // elimina error si estaba
                        return rest;
                      });
                    }}
                  >
                    <option value="" disabled>
                      Seleccione una opción
                    </option>
                    <option value="derecha">Derecha</option>
                    <option value="izquierda">Izquierda</option>
                    <option value="bilateral">Indefinido</option>
                  </select>
                  {formErrorsLocal.localizacion && (
                    <div className="text-danger mt-1">{formErrorsLocal.localizacion}</div>
                  )}
                </div>
                {/* ESTRUCTURA MASA */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    ¿De qué estructura depende? <span className="text-danger">*</span>
                  </label>
                  <select
                    name="estructura"
                    className={`form-select ${formErrorsLocal.estructura ? "is-invalid" : ""}`}
                    value={formData.estructura}
                    onChange={(e) => {
                      handleChange(e);
                      setFormErrorsLocal(prev => {
                        const { estructura, ...rest } = prev; // elimina error si se rellena
                        return rest;
                      });
                    }}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="ovario">Ovario</option>
                    <option value="trompa">Trompa</option>
                    <option value="paraovario">Paraovario</option>
                    <option value="indefinido">Indefinido</option>
                  </select>
                  {formErrorsLocal.estructura && (
                    <div className="text-danger mt-1">{formErrorsLocal.estructura}</div>
                  )}
                </div>
              </div>    
              <div className="row mt-4"> {/* Fila 2 */}
                {/* TIPO LESIÓN */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    ¿Qué tipo de lesión es? <span className="text-danger">*</span>
                  </label>
                  <select
                    name="tipoLesion"
                    className={`form-select ${
                      formErrorsLocal.tipoLesion ? "is-invalid" : ""
                    }`}
                    value={formData.tipoLesion}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione una opción
                    </option>
                    <option value="solido">Sólido</option>
                    <option value="quistica">Quística</option>
                    <option value="solido-quistica">Sólido-quística</option>
                  </select>
                  {formErrorsLocal.tipoLesion && (
                    <div className="text-danger mt-1">
                      {formErrorsLocal.tipoLesion}
                    </div>
                  )}
                </div>    
                {/* BLOQUE DINÁMICO (TIPO LESIÓN) || tipoLesion === "solido" */}
                {formData.tipoLesion === "solido" && (
                <div className="mt-4 row item-appear">
                  {/* CONTORNO EXTERNO */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      ¿Cómo es el contorno externo? <span className="text-danger">*</span>
                    </label>
                    <select
                      name="contornoExterno"
                      className={`form-select ${
                        formErrorsLocal.contornoExterno ? "is-invalid" : ""
                      }`}
                      value={formData.contornoExterno}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione una opción
                      </option>
                      <option value="regular">Regular</option>
                      <option value="irregular">Irregular</option>
                    </select>
                    {formErrorsLocal.contornoExterno && (
                      <div className="text-danger mt-1">
                        {formErrorsLocal.contornoExterno}
                      </div>
                    )}
                  </div>
                  {/* GRADO VASCULARIZACIÓN */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      ¿Cuál es el grado de la vascularización? <span className="text-danger">*</span>
                    </label>
                    <select
                      name="vascularizacion"
                      className={`form-select ${
                        formErrorsLocal.vascularizacion ? "is-invalid" : ""
                      }`}
                      value={formData.vascularizacion}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                      <option value="leve (score color 2)">Leve (score color 2)</option>
                      <option value="moderado (score color 3)">Moderado (score color 3)</option>
                      <option value="abundante (score color 4)">Abundante (score color 4)</option>
                    </select>
                    {formErrorsLocal.vascularizacion && (
                      <div className="text-danger mt-1">
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
                        <label className="form-label fw-semibold text-secondary">
                          ¿Cuál es el grosor de la pared? (mm) <span className="text-danger">*</span>
                        </label>
                        <input
                          name="grosorPared"
                          type="number"
                          min="0"
                          step="0.1"
                          className={`form-control ${formErrorsLocal.grosorPared ? "is-invalid" : ""}`}
                          value={formData.grosorPared}
                          onChange={handleChange}
                        />
                        {formErrorsLocal.grosorPared && (
                          <div className="text-danger mt-1">{formErrorsLocal.grosorPared}</div>
                        )}
                      </div>
                      {/* GRADO VASCULARIZACIÓN PARED */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-secondary">
                          ¿Cuál es el grado de la vascularización de la pared? <span className="text-danger">*</span>
                        </label>
                        <select
                          name="gradoVascularizacionPared"
                          className={`form-select ${formErrorsLocal.gradoVascularizacionPared ? "is-invalid" : ""}`}
                          value={formData.gradoVascularizacionPared || ""}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Seleccione una opción</option>
                          <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                          <option value="leve (score color 2)">Leve (score color 2)</option>
                          <option value="moderado (score color 3)">Moderado (score color 3)</option>
                          <option value="abundante (score color 4)">Abundante (score color 4)</option>
                        </select>   
                        {formErrorsLocal.gradoVascularizacionPared && (
                          <div className="text-danger mt-1">{formErrorsLocal.gradoVascularizacionPared}</div>
                        )}
                      </div>
                    </div>    
                    <div className="mt-4 row">
                      {/* CONTORNO INTERNO */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-secondary">
                          ¿Cómo es el contorno interno? <span className="text-danger">*</span>
                        </label>
                        <select
                          name="contornoInterno"
                          className={`form-select ${formErrorsLocal.contornoInterno ? "is-invalid" : ""}`}
                          value={formData.contornoInterno || ""}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Seleccione una opción
                          </option>
                          <option value="regular">Regular</option>
                          <option value="irregular">Irregular</option>
                        </select>   
                        {formErrorsLocal.contornoInterno && (
                          <div className="text-danger mt-1">{formErrorsLocal.contornoInterno}</div>
                        )}
                      </div>
                      {/* Columna vacía para mantener la alineación */}
                      <div className="col-md-6"></div>
                    </div>
                  </div>
                )}    
              </div>
              
              <div className="row mt-4">    
                {/* TIPO CONTENIDO */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    ¿Qué contenido tiene? <span className="text-danger">*</span>
                  </label>
                  <select
                    name="contenido"
                    className={`form-select ${formErrorsLocal.contenido ? "is-invalid" : ""}`}
                    value={formData.contenido}
                    onChange={(e) => {
                      handleChange(e);
                      setFormErrorsLocal(prev => {
                        const { contenido, ...rest } = prev; // elimina el error al rellenar
                        return rest;
                      });
                    }}
                  >
                    <option value="" disabled>
                      Seleccione una opción
                    </option>
                    <option value="sonoluscente">Sonoluscente</option>
                    <option value="ecomixto">Ecomixto</option>
                    <option value="en vidrio esmerilado">En vidrio esmerilado</option>
                    <option value="otro">Otro</option>
                  </select>   
                  {formErrorsLocal.contenido && (
                    <div className="text-danger mt-1">{formErrorsLocal.contenido}</div>
                  )}
                </div>    
                {/* BLOQUE DINÁMICO (OTRO CONTENIDO) || contenido === "otro" */}
                {formData.contenido === "otro" && (
                  <div className="mt-4 item-appear">
                    <label className="form-label fw-semibold text-secondary">
                      Otro <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="otroContenido"
                      className={`form-control mt-2 ${formErrorsLocal.otroContenido ? "is-invalid" : ""}`}
                      style={{ minHeight: "80px" }}
                      value={formData.otroContenido || ""}
                      onChange={(e) => {
                        handleChange(e);
                        setFormErrorsLocal(prev => {
                          const { otroContenido, ...rest } = prev; // elimina error si se rellena
                          return rest;
                        });
                      }}
                    ></textarea>
                    {formErrorsLocal.otroContenido && (
                      <div className="text-danger mt-1">{formErrorsLocal.otroContenido}</div>
                    )}
                  </div>
                )}
              </div>    
            </div>    
            {/* BLOQUE MEDIDA MASA ANEXIAL */}
            <div className="p-3">
              <h5 className="fw-semibold mb-3 titulo-formulario">
                ¿Cuánto mide? {" "}
                <text className="little-text">
                  (Redondee hasta el número entero que considere)
                </text>
              </h5>
              <div className="row">
                {["T", "AP", "L"].map((eje) => (
                  <div className="col-md-4" key={eje}>
                    <label className="form-label fw-semibold text-secondary">
                      Medida ({eje}) del POS (mm) <span className="text-danger">*</span>
                    </label>
                    <input
                      name={`medida${eje}`}
                      type="number"
                      min="0"
                      step="0.1"
                      className={`form-control ${
                        formErrorsLocal[`medida${eje}`] ? "is-invalid" : ""
                      }`}
                      value={formData[`medida${eje}`] ?? ""}
                      onChange={(e) => {
                        handleChange(e);
                        // eliminar el error específico cuando se rellena
                        setFormErrorsLocal(prev => {
                          const { [`medida${eje}`]: _omit, ...rest } = prev;
                          return rest;
                        });
                      }}
                    />
                    {formErrorsLocal[`medida${eje}`] && (
                      <div className="text-danger mt-1">
                        {formErrorsLocal[`medida${eje}`]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>    
            {/* BLOQUE DINÁMICO (PAPILAS) || tipoLesion === "quistica"/"solido-quistica" */}
            {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica" || formErrorsLocal.papilas) && (
              <div className="p-3 item-appear">
                {/* PAPILAS */}
                <div className="mb-3">
                  <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">PAPILAS</h5>
                  <label className="form-label fw-semibold text-secondary d-block mb-2">
                    ¿Hay papilas? <span className="text-danger">*</span>
                  </label>
                  <div className={`rounded bg-white p-3 w-100 ${formErrorsLocal.papilas ? "border border-danger" : "border border-secondary"}`}>
                    {["si", "no"].map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="papilas"
                          value={opt}
                          checked={formData.papilas === opt}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="form-check-label">{opt === "si" ? "Sí" : "No"}</label>
                      </div>
                    ))}
                  </div>
                  {formErrorsLocal.papilas && (
                    <div className="text-danger mt-1">{formErrorsLocal.papilas}</div>
                  )}
                </div>
              </div>
            )}    
            {/* INFO DE PAPILAS (solo si papilas === "si" o hay errores en los campos de papilas) */}
            {(
              formData.papilas === "si" ||
              ["numeroPapilas", "contornoPapilas", "vascularizacionPapilas", "medidaPapilasT", "medidaPapilasAP"]
                .some(f => formErrorsLocal[f])
            ) && (
              <div className="item-appear w-100 p-3 mb-2">    
                {/* FILA 1: NumeroPapilas y ContornoPapilas */}
                <div className="row g-3 mb-3">
                  {/* Número de Papilas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      ¿Cuántas papilas hay? <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="numeroPapilas"
                      min="0"
                      className={`form-control ${formErrorsLocal.numeroPapilas ? "is-invalid" : ""}`}
                      value={formData.numeroPapilas || ""}
                      onChange={(e) => {
                        handleChange(e);
                        setFormErrorsLocal(prev => {
                          const { numeroPapilas, ...rest } = prev;
                          return rest;
                        });
                      }}
                    />
                    {formErrorsLocal.numeroPapilas && (
                      <div className="text-danger mt-1">{formErrorsLocal.numeroPapilas}</div>
                    )}
                  </div>    
                  {/* Contorno Papilas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      ¿Cómo es el contorno de las papilas? <span className="text-danger">*</span>
                    </label>
                    <select
                      name="contornoPapilas"
                      className={`form-select ${formErrorsLocal.contornoPapilas ? "is-invalid" : ""}`}
                      value={formData.contornoPapilas || ""}
                      onChange={(e) => {
                        handleChange(e);
                        setFormErrorsLocal(prev => {
                          const { contornoPapilas, ...rest } = prev;
                          return rest;
                        });
                      }}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="regular">Regular</option>
                      <option value="irregular">Irregular</option>
                    </select>
                    {formErrorsLocal.contornoPapilas && (
                      <div className="text-danger mt-1">{formErrorsLocal.contornoPapilas}</div>
                    )}
                  </div>
                </div>    
                {/* FILA 2: Grado de vascularización de papilas */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      ¿Cuál es el grado de la vascularización de las papilas? <span className="text-danger">*</span>
                    </label>
                    <select
                      name="vascularizacionPapilas"
                      className={`form-select ${formErrorsLocal.vascularizacionPapilas ? "is-invalid" : ""}`}
                      value={formData.vascularizacionPapilas || ""}
                      onChange={(e) => {
                        handleChange(e);
                        setFormErrorsLocal(prev => {
                          const { vascularizacionPapilas, ...rest } = prev;
                          return rest;
                        });
                      }}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="ninguno (score color 1)">Ninguno (score color 1)</option>
                      <option value="leve (score color 2)">Leve (score color 2)</option>
                      <option value="moderado (score color 3)">Moderado (score color 3)</option>
                      <option value="abundante (score color 4)">Abundante (score color 4)</option>
                    </select>
                    {formErrorsLocal.vascularizacionPapilas && (
                      <div className="text-danger mt-1">{formErrorsLocal.vascularizacionPapilas}</div>
                    )}
                  </div>
                </div>    
                {/* FILA 3: Medidas del POS */}
                <div className="mt-3">
                  <h5 className="fw-semibold mb-3 titulo-formulario">
                    ¿Cuánto mide la papila mayor? <text className="little-text">(Redondee hasta el número entero que considere)</text>
                  </h5>
                  <div className="row g-3">
                    {["T","AP"].map((eje) => (
                      <div className="col-md-4 d-flex flex-column" key={eje}>
                        <label className="form-label fw-semibold text-secondary">
                          Medida ({eje}) de la papila (mm) <span className="text-danger">*</span>
                        </label>
                        <input
                          name={`medidaPapilas${eje}`}
                          type="number"
                          min="0"
                          step="0.1"
                          className={`form-control ${formErrorsLocal[`medidaPapilas${eje}`] ? "is-invalid" : ""}`}
                          value={formData[`medidaPapilas${eje}`] || ""}
                          onChange={(e) => {
                            handleChange(e);
                            setFormErrorsLocal(prev => {
                              const { [`medidaPapilas${eje}`]: _, ...rest } = prev;
                              return rest;
                            });
                          }}
                        />
                        {formErrorsLocal[`medidaPapilas${eje}`] && (
                          <div className="text-danger mt-1">{formErrorsLocal[`medidaPapilas${eje}`]}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>    
              </div>
            )}    
            {/* BLOQUE DINÁMICO (TABIQUES) || tipoLesion === "quistica"/"solido-quistica" */}
            {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica") && (
              <div className="p-3 item-appear">
                {/* Tabiques */}
                <div>
                  <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">
                    TABIQUES
                  </h5>
                  <label className="form-label fw-semibold text-secondary d-block mb-2">
                    ¿Hay tabiques? <span className="text-danger">*</span>
                  </label>
                  <div
                    className={`rounded bg-white p-3 w-100 ${
                      formErrorsLocal.tabiques ? "border-danger" : "border-secondary"
                    }`}
                  >
                    {["si", "no"].map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="tabiques"
                          value={opt}
                          checked={formData.tabiques === opt}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          {opt === "si" ? "Sí" : "No"}
                        </label>
                      </div>
                    ))}
                  </div>
                  {formErrorsLocal.tabiques && (
                    <div className="text-danger mt-1">{formErrorsLocal.tabiques}</div>
                  )}
                </div>
              </div>
            )}    
            {/* BLOQUE DINÁMICO (INFO DE TABIQUES) || tabiques === "si" */}
            {formData.tabiques === "si" && (
              <div className="item-appear w-100 p-3 mb-2"> {/* forzamos ancho del padre y padding controlado */}    
                <div className="row g-3 mb-0"> {/* fila 1: nro lóculos + grosor */}
                  {/* Número de lóculos */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      ¿Cuántos lóculos hay? <span className="text-danger">*</span>
                    </label>
                    <input
                      name="numeroLoculos"
                      type="number"
                      min="0"
                      className={`form-control ${formErrorsLocal.numeroLoculos ? "is-invalid" : ""}`}
                      value={formData.numeroLoculos || ""}
                      onChange={handleChange}
                    />
                    {formErrorsLocal.numeroLoculos && (
                      <div className="text-danger mt-1">{formErrorsLocal.numeroLoculos}</div>
                    )}
                  </div>    
                  {/* Grosor de los tabiques */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Grosor de los tabiques (mm) <span className="text-danger">*</span>
                    </label>
                    <input
                      name="grosorTabiques"
                      type="number"
                      min="0"
                      step="0.1"
                      className={`form-control ${formErrorsLocal.grosorTabiques ? "is-invalid" : ""}`}
                      value={formData.grosorTabiques || ""}
                      onChange={handleChange}
                    />
                    {formErrorsLocal.grosorTabiques && (
                      <div className="text-danger mt-1">{formErrorsLocal.grosorTabiques}</div>
                    )}
                  </div>
                </div>    
                <div className="row g-3 mt-2 mb-0"> {/* fila 2: morfologia + vascularizacion */}
                  {/* Morfología de los tabiques */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Morfología de los tabiques <span className="text-danger">*</span>
                    </label>
                    <select
                      name="morfologiaTabiques"
                      className={`form-select ${formErrorsLocal.morfologiaTabiques ? "is-invalid" : ""}`}
                      value={formData.morfologiaTabiques || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="regular">Regular</option>
                      <option value="irregular">Irregular</option>
                    </select>
                    {formErrorsLocal.morfologiaTabiques && (
                      <div className="text-danger mt-1">{formErrorsLocal.morfologiaTabiques}</div>
                    )}
                  </div>    
                  {/* Grado de vascularización */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Grado de la vascularización de los tabiques <span className="text-danger">*</span>
                    </label>
                    <select
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
                    {formErrorsLocal.vascularizacionTabiques && (
                      <div className="text-danger mt-1">{formErrorsLocal.vascularizacionTabiques}</div>
                    )}
                  </div>
                </div>    
              </div>
            )}    
            {/* BLOQUE DINÁMICO (ÁREA SÓLIDA) || tipoLesion === "solido"/"solido-quistica"/"quistica" */}
            {(formData.tipoLesion === "quistica" || formData.tipoLesion === "solido-quistica") && (
              <div className="p-3 item-appear">
                {/* Área sólida */}
                <div>
                  <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">
                    ÁREA SÓLIDA
                  </h5>
                  <label className="form-label fw-semibold text-secondary d-block mb-2">
                    ¿Hay área sólida? <span className="text-danger">*</span>
                  </label>    
                  <div
                    className={`rounded bg-white p-3 w-100 ${
                      formErrorsLocal.areaSolida ? "border-danger" : "border-secondary"
                    }`}
                  >
                    {["si", "no"].map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="areaSolida"
                          value={opt}
                          checked={formData.areaSolida === opt}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          {opt === "si" ? "Sí" : "No"}
                        </label>
                      </div>
                    ))}
                  </div>    
                  {formErrorsLocal.areaSolida && (
                    <div className="text-danger mt-1">{formErrorsLocal.areaSolida}</div>
                  )}
                </div>
              </div>
            )}    
            {/* BLOQUE DINÁMICO (INFO ÁREA SÓLIDA) || areaSolida === "si" */}
            {formData.areaSolida === "si" && (
              <div className="item-appear w-100 p-3 mb-2">    
                {/* fila 1: número + vascularización */}
                <div className="row g-3 mb-0">    
                  {/* Número de áreas sólidas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Número de áreas sólidas <span className="text-danger">*</span>
                    </label>
                    <input
                      name="numeroAreasSolidas"
                      type="number"
                      min="0"
                      className={`form-control ${formErrorsLocal.numeroAreasSolidas ? "is-invalid" : ""}`}
                      value={formData.numeroAreasSolidas || ""}
                      onChange={handleChange}
                    />
                    {formErrorsLocal.numeroAreasSolidas && (
                      <div className="text-danger mt-1">{formErrorsLocal.numeroAreasSolidas}</div>
                    )}
                  </div>    
                  {/* Vascularización de áreas sólidas */}
                  <div className="col-md-6 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Vascularización de las áreas sólidas <span className="text-danger">*</span>
                    </label>
                    <select
                      name="vascularizacionAreasSolidas"
                      className={`form-select ${formErrorsLocal.vascularizacionAreasSolidas ? "is-invalid" : ""}`}
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
                      <div className="text-danger mt-1">{formErrorsLocal.vascularizacionAreasSolidas}</div>
                    )}
                  </div>    
                </div>    
                {/* fila 2: medidas */}
                <div className="row g-3 mt-2 mb-0">   
                  {/* Medida T */}
                  <div className="col-md-4 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Medida T (mm) <span className="text-danger">*</span>
                    </label>
                    <input
                      name="medidaASolidaT"
                      type="number"
                      step="0.1"
                      min="0"
                      className={`form-control ${formErrorsLocal.medidaASolidaT ? "is-invalid" : ""}`}
                      value={formData.medidaASolidaT || ""}
                      onChange={handleChange}
                    />
                    {formErrorsLocal.medidaASolidaT && (
                      <div className="text-danger mt-1">{formErrorsLocal.medidaASolidaT}</div>
                    )}
                  </div>    
                  {/* Medida AP */}
                  <div className="col-md-4 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Medida AP (mm) <span className="text-danger">*</span>
                    </label>
                    <input
                      name="medidaASolidaAP"
                      type="number"
                      step="0.1"
                      min="0"
                      className={`form-control ${formErrorsLocal.medidaASolidaAP ? "is-invalid" : ""}`}
                      value={formData.medidaASolidaAP || ""}
                      onChange={handleChange}
                    />
                    {formErrorsLocal.medidaASolidaAP && (
                      <div className="text-danger mt-1">{formErrorsLocal.medidaASolidaAP}</div>
                    )}
                  </div>    
                  {/* Medida L */}
                  <div className="col-md-4 d-flex flex-column">
                    <label className="form-label fw-semibold text-secondary">
                      Medida L (mm) <span className="text-danger">*</span>
                    </label>
                    <input
                      name="medidaASolidaL"
                      type="number"
                      step="0.1"
                      min="0"
                      className={`form-control ${formErrorsLocal.medidaASolidaL ? "is-invalid" : ""}`}
                      value={formData.medidaASolidaL || ""}
                      onChange={handleChange}
                    />
                    {formErrorsLocal.medidaASolidaL && (
                      <div className="text-danger mt-1">{formErrorsLocal.medidaASolidaL}</div>
                    )}
                  </div>    
                </div>    
              </div>
            )}    
            {/* Subcaja 3: otras características (desde Sombra acústica posterior hasta el final) */}
            <div className="p-3 mb-3">    
              {/* SOMBRA ACÚSTICA POSTERIOR */}
              <div>
                <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">
                  SOMBRA ACÚSTICA POSTERIOR
                </h5>
                <label className="form-label fw-semibold text-secondary d-block mb-2">
                  ¿Tiene sombra acústica posterior? <span className="text-danger">*</span>
                </label>    
                <div
                  className={`rounded bg-white p-3 w-100 ${
                    formErrorsLocal.sombra ? "border-danger" : "border-secondary"
                  }`}
                >
                  {["si", "no"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sombra"
                        value={opt}
                        checked={formData.sombra === opt}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{opt === "si" ? "Sí" : "No"}</label>
                    </div>
                  ))}
                </div>
                {formErrorsLocal.sombra && (
                  <div className="text-danger mt-1">{formErrorsLocal.sombra}</div>
                )}
              </div>    
              {/* BLOQUE PARÉNQUIMA OVÁRICO SANO */}
              <div className="mb-3 mt-3">
                <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">
                  PARÉNQUIMA OVÁRICO SANO
                </h5>
                <label className="form-label fw-semibold text-secondary d-block mb-2">
                  ¿Tiene parénquima ovárico sano? <span className="text-danger">*</span>
                </label>
                <div className={`rounded bg-white p-3 w-100 ${formErrorsLocal.parenquima ? "border-danger" : "border-secondary"}`}>
                  {["si","no","no consigo determinarlo"].map((opt) => {
                    const valueMap = { "si": "si", "no": "no", "no consigo determinarlo": "no determinado" };   
                    return (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="parenquima"
                          value={valueMap[opt]}
                          checked={formData.parenquima === valueMap[opt]}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          {opt === "si" ? "Sí" : opt === "no" ? "No" : "No consigo determinarlo"}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {formErrorsLocal.parenquima && (
                  <div className="text-danger mt-1">{formErrorsLocal.parenquima}</div>
                )}
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
                <label className="form-label fw-semibold text-secondary d-block mb-2">
                  ¿Tiene ascitis? <span className="text-danger">*</span>
                </label>    
                <div
                  className={`rounded bg-white p-3 w-100 ${
                    formErrorsLocal.ascitis ? "border-danger" : "border-secondary"
                  }`}
                >
                  {["si", "no"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="ascitis"
                        value={opt}
                        checked={formData.ascitis === opt}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{opt === "si" ? "Sí" : "No"}</label>
                    </div>
                  ))}
                </div>
                {formErrorsLocal.ascitis && (
                  <div className="text-danger mt-1">{formErrorsLocal.ascitis}</div>
                )}    
                {/* BLOQUE DINÁMICO || ascitis === "sí" */}
                {formData.ascitis === "si" && (
                  <div className="mt-3 mb-3 item-appear">
                    <label className="form-label fw-semibold text-secondary">
                      ¿De qué tipo es la ascitis? <span className="text-danger">*</span>
                    </label>
                    <div
                      className={`rounded mt-2 ${
                        formErrorsLocal.tipoAscitis ? "border-danger" : "border-secondary"
                      }`}
                      style={{ borderWidth: "1px", borderStyle: "solid" }}
                    >
                      <select
                        name="tipoAscitis"
                        className="form-select border-0"
                        value={formData.tipoAscitis || ""}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="leve">Leve</option>
                        <option value="moderada">Moderada</option>
                        <option value="abundante">Abundante</option>
                      </select>
                    </div>
                    {formErrorsLocal.tipoAscitis && (
                      <div className="text-danger mt-1">{formErrorsLocal.tipoAscitis}</div>
                    )}
                  </div>
                )}
              </div>    
              {/* CARCINOMATOSIS */}
              <div className="mb-3">
                <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">CARCINOMATOSIS</h5>
                <label className="form-label fw-semibold text-secondary d-block mb-2">
                  ¿Tiene carcinomatosis? <span className="text-danger">*</span>
                </label>    
                <div
                  className={`rounded bg-white p-3 w-100 ${
                    formErrorsLocal.carcinomatosis ? "border-danger" : "border-secondary"
                  }`}
                >
                  {["sí", "no", "no valorable"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="carcinomatosis"
                        value={opt}
                        checked={formData.carcinomatosis === opt}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">
                        {opt === "sí" ? "Sí" : opt === "no" ? "No" : "No valorable"}
                      </label>
                    </div>
                  ))}
                </div>
                {formErrorsLocal.carcinomatosis && (
                  <div className="text-danger mt-1">{formErrorsLocal.carcinomatosis}</div>
                )}
              </div>    
              {/* ANATOMÍA PATOLÓGICA */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary d-block mb-2">
                  ¿Se ha realizado anatomía patológica posterior?
                </label>    
                <div className="rounded bg-white p-3 w-100 border border-secondary">
                  {["si", "no", "pendiente"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="anatomiaPatologica"
                        value={opt}
                        checked={formData.anatomiaPatologica === opt}
                        onChange={handleChange}
                      />
                    <label className="form-check-label">
                      {opt === "si" ? "Sí" : opt === "no" ? "No" : "Pendiente"}
                    </label>
                    </div>
                  ))}
                </div>
              </div>    
              {/* BLOQUE DINÁMICO (ANATOMÍA PATOLÓGIA) || anatomiaPatologica === "sí" */}
              {formData.anatomiaPatologica === "si" && (
                <div className="mb-3 item-appear">
                  <label className="form-label fw-semibold text-secondary">
                    Anatomía patológica definitiva: <span className="text-danger">*</span>
                  </label>
                  <input
                    name="indicaPatologia"
                    className={`form-control ${formErrorsLocal.indicaPatologia ? "is-invalid" : ""}`}
                    value={formData.indicaPatologia || ""}
                    onChange={handleChange}
                  />
                  {formErrorsLocal.indicaPatologia && (
                    <div className="text-danger mt-1">{formErrorsLocal.indicaPatologia}</div>
                  )}
                </div>
              )}    
              {/* BLOQUE DINÁMICO (ANATOMÍA PATOLÓGIA) || anatomiaPatologica === "no" */}
              {formData.anatomiaPatologica === "no" && (
                <div className="mb-3 item-appear">
                  <label className="form-label fw-semibold text-secondary">
                    ¿La lesión ha estado estable durante el último año? <span className="text-danger">*</span>
                  </label>    
                  <div
                    className={`rounded bg-white p-3 w-100 ${
                      formErrorsLocal.lesionUltimoAnio ? "border-danger" : "border-secondary"
                    }`}
                  >
                    {["si", "no"].map((opt) => (
                      <div className="form-check mb-2" key={opt}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="lesionUltimoAnio"
                          value={opt}
                          checked={formData.lesionUltimoAnio === opt}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">{opt === "si" ? "Sí" : "No"}</label>
                      </div>
                    ))}
                  </div>
                  {formErrorsLocal.lesionUltimoAnio && (
                    <div className="text-danger mt-1">{formErrorsLocal.lesionUltimoAnio}</div>
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
            style={{
              display: formData.masa === "no" ? "flex" : "none",
              visibility: formData.masa === "no" ? "visible" : "hidden",
              height: formData.masa === "no" ? "auto" : "0",
              overflow: "hidden",
            }}
          >
            {/* Caja 1: Ovario derecho */}
            <div className="border rounded p-3 bg-formulario-azul item-appear">
              <h5 className="fw-semibold mb-3 titulo-formulario">
                INFORME DEL OVARIO DERECHO
              </h5>   
              <h6 className="fw-semibold mb-3 titulo-formulario">
                ¿Cuánto mide?{" "}
                <text className="little-text">
                  (Redondee hasta el número entero que considere)
                </text>
              </h6>   
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Medida (T) del OD (mm)
                  </label>
                  <input
                    name="ovarioDerechoT"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${
                      formErrorsLocal.ovarioDerechoT ? "is-invalid" : ""
                    }`}
                    value={formData.ovarioDerechoT}
                    onChange={handleChange}
                  />
                  {formErrorsLocal.ovarioDerechoT && (
                    <div className="text-danger mt-1">{formErrorsLocal.ovarioDerechoT}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Medida (AP) del OD (mm)
                  </label>
                  <input
                    name="ovarioDerechoAP"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${
                      formErrorsLocal.ovarioDerechoAP ? "is-invalid" : ""
                    }`}
                    value={formData.ovarioDerechoAP}
                    onChange={handleChange}
                  />
                  {formErrorsLocal.ovarioDerechoAP && (
                    <div className="text-danger mt-1">{formErrorsLocal.ovarioDerechoAP}</div>
                  )}
                </div>
              </div>    
              {/* Folículos OD */}
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    ¿Cuántos folículos tiene el OD?
                  </label>    
                  <div
                    className={`rounded mt-2 ${
                      formErrorsLocal.foliculosOD ? "border-danger" : "border-secondary"
                    }`}
                    style={{ borderWidth: "1px", borderStyle: "solid" }}
                  >
                    <select
                      name="foliculosOD"
                      className="form-select border-0"
                      value={formData.foliculosOD}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione una opción
                      </option>
                      {["1","2","3","4","5","6","7","8","9","10",">10"].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>    
                  {formErrorsLocal.foliculosOD && (
                    <div className="text-danger mt-1">{formErrorsLocal.foliculosOD}</div>
                  )}
                </div>
              </div>
            </div>    
            {/* Caja 2: Ovario izquierdo */}
            <div className="border rounded p-3 bg-formulario-azul item-appear">
              <h5 className="fw-semibold mb-3 titulo-formulario">
                INFORME DEL OVARIO IZQUIERDO
              </h5>
              <h6 className="fw-semibold mb-3 titulo-formulario">
                ¿Cuánto mide?{" "}
                <text className="little-text">
                  (Redondee hasta el número entero que considere)
                </text>
              </h6>   
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Medida (T) del OI (mm)
                  </label>
                  <input
                    name="ovarioIzquierdoT"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${
                      formErrorsLocal.ovarioIzquierdoT ? "is-invalid" : ""
                    }`}
                    value={formData.ovarioIzquierdoT}
                    onChange={handleChange}
                  />
                  {formErrorsLocal.ovarioIzquierdoT && (
                    <div className="text-danger mt-1">
                      {formErrorsLocal.ovarioIzquierdoT}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Medida (AP) del OI (mm)
                  </label>
                  <input
                    name="ovarioIzquierdoAP"
                    type="number"
                    min="0"
                    step="0.1"
                    className={`form-control ${
                      formErrorsLocal.ovarioIzquierdoAP ? "is-invalid" : ""
                    }`}
                    value={formData.ovarioIzquierdoAP}
                    onChange={handleChange}
                  />
                  {formErrorsLocal.ovarioIzquierdoAP && (
                    <div className="text-danger mt-1">
                      {formErrorsLocal.ovarioIzquierdoAP}
                    </div>
                  )}
                </div>
              </div>    
              {/* Folículos OI */}
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    ¿Cuántos folículos tiene el OI?
                  </label>    
                  <div
                    className={`rounded mt-2 ${
                      formErrorsLocal.foliculosOI ? "border-danger" : "border-secondary"
                    }`}
                    style={{ borderWidth: "1px", borderStyle: "solid" }}
                  >
                    <select
                      name="foliculosOI"
                      className="form-select border-0"
                      value={formData.foliculosOI}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione una opción
                      </option>
                      {["1","2","3","4","5","6","7","8","9","10",">10"].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>    
                  {formErrorsLocal.foliculosOI && (
                    <div className="text-danger mt-1">{formErrorsLocal.foliculosOI}</div>
                  )}
                </div>
              </div>
            </div>
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

        {/* BOTONES FUERA DEL MODAL */}
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
