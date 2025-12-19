const OvarySection = (props) => {
  const {
    formData,
    setFormData,
    formErrors,
    formErrorsLocal,
    setFormErrorsLocal,
    masaIndexVisible,
    handleTipoLesionChange,
    handlePapilasChange,
    handleTabiquesChange,
    handleAreaSolidaChange,
    handleChange,
    handleConditionalChange
  } = props;

  return (
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
  );
};

export default OvarySection;