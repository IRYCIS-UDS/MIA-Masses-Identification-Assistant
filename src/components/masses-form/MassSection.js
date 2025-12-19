const MassSection = (props) => {
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
    handleConditionalChange,
    indexMasa,
    handleMasaChange,
    masa
  } = props;

  const handleRemove = () => {
    setFormData(prev => ({
      ...prev,
      masas: prev.masas.filter((_, i) => i !== indexMasa)
    }));
  };

  //___________________________________________________________________________________________

  /* ================= HELPERS ================= */

  // 🔹 Wrapper genérico para cualquier input/select
  const onMasaChange = (e) => {
    handleMasaChange(masa.id, e);
  };

  // 🔹 Wrappers para los handlers especiales
  const onTipoLesionChange = (e) => {
    handleMasaChange(masa.id, e);
    handleTipoLesionChange?.(e);
  };

  const onPapilasChange = (e) => {
    handleMasaChange(masa.id, e);
    handlePapilasChange?.(e);
  };

  const onTabiquesChange = (e) => {
    handleMasaChange(masa.id, e);
    handleTabiquesChange?.(e);
  };

  const onAreaSolidaChange = (e) => {
    handleMasaChange(masa.id, e);
    handleAreaSolidaChange?.(e);
  };

  const onConditionalChange = (name, value) => {
    handleMasaChange(masa.id, {
      target: { name, value }
    });
    handleConditionalChange?.(name, value);
  };
  //___________________________________________________________________________________________

  return (
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
                value={masa.localizacion || ""}
                onChange={(e) => {
                  onMasaChange(e);
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
                value={masa.estructura || ""}
                onChange={(e) => {
                  onMasaChange(e);
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
              <label className="form-label fw-semibold text-secondary">
                ¿Qué tipo de lesión es? <span className="text-danger">*</span>
              </label>
              <select
                name="tipoLesion"
                className={`form-select ${formErrorsLocal.tipoLesion ? "is-invalid" : ""}`}
                value={masa.tipoLesion || ""}
                onChange={onTipoLesionChange}
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="solido">Sólido</option>
                <option value="quistica">Quística</option>
                <option value="solido-quistica">Sólido-quística</option>
              </select>
            </div>

            {/* ---------- ROW - Según el tipo de lesión ---------- */} 
            {/* BLOQUE DINÁMICO (TIPO LESIÓN) || tipoLesion === "solido" */}
            {masa.tipoLesion === "solido" && (
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
                    value={masa.contornoExterno || ""}
                    onChange={onMasaChange}
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
                    value={masa.vascularizacion || ""}
                    onChange={onMasaChange}
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

            {/* BLOQUE DINÁMICO (TIPO LESIÓN) || tipoLesion === "quistica" o "solido-quistica" */}
            {(masa.tipoLesion === "quistica" || masa.tipoLesion === "solido-quistica") && (
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
                      value={masa.grosorPared || ""}
                      onChange={onMasaChange}
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
                      value={masa.gradoVascularizacionPared || ""}
                      onChange={onMasaChange}
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
                      value={masa.contornoInterno || ""}
                      onChange={onMasaChange}
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
                value={masa.contenido || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  // Actualizamos el select
                  onConditionalChange("contenido", value);

                  // Si no es 'otro', limpiamos el campo dependiente
                  if (value !== "otro") {
                    onConditionalChange("otroContenido", "");
                  }

                  // Limpiamos errores locales
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
            {masa.contenido === "otro" && (
              <div className="mt-4 item-appear">
                <label htmlFor="otroContenido" className="form-label fw-semibold text-secondary">
                  Otro <span className="text-danger">*</span>
                </label>
                <textarea
                  id="otroContenido"
                  name="otroContenido"
                  className={`form-control mt-2 ${formErrorsLocal.otroContenido ? "is-invalid" : ""}`}
                  style={{ minHeight: "80px" }}
                  value={masa.otroContenido || ""}
                  onChange={onMasaChange}
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
                      value={masa[fieldName] ?? ""}
                      onChange={onMasaChange}
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
        {(masa.tipoLesion === "quistica" || masa.tipoLesion === "solido-quistica" || formErrorsLocal.papilas) && (
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
                        checked={masa.papilas === opt}
                        onChange={onPapilasChange} // ✅ wrapper ya correcto
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
        {(masa.papilas === "si" || ["numeroPapilas", "contornoPapilas", "vascularizacionPapilas", "medidaPapilasT", "medidaPapilasAP"].some(f => formErrorsLocal[f])) && (
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
                  value={masa.numeroPapilas || ""}
                  onChange={onPapilasChange} // ✅ wrapper correcto
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
                  value={masa.contornoPapilas || ""}
                  onChange={onPapilasChange}
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
                  value={masa.vascularizacionPapilas || ""}
                  onChange={onPapilasChange}
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
                      value={masa[`medidaPapilas${eje}`] || ""}
                      onChange={onPapilasChange}
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
        {(masa.tipoLesion === "quistica" || masa.tipoLesion === "solido-quistica") && (
          <div className="p-3 item-appear">
            <h5 className="fw-semibold text-uppercase mb-2 titulo-formulario">TABIQUES</h5>
            <fieldset
              className={`rounded bg-white p-3 w-100 ${formErrorsLocal.tabiques ? "border border-danger" : "border border-secondary"}`}
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
                      checked={masa.tabiques === opt}
                      onChange={onTabiquesChange}
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
        {masa.tabiques === "si" && (
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
                  value={masa.numeroLoculos || ""}
                  onChange={onMasaChange}
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
                  value={masa.grosorTabiques || ""}
                  onChange={onMasaChange}
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
                  value={masa.morfologiaTabiques || ""}
                  onChange={onMasaChange}
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
                  value={masa.vascularizacionTabiques || ""}
                  onChange={onMasaChange}
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

        {/* BLOQUE DINÁMICO (ÁREA SÓLIDA) || tipoLesion === "quistica"/"solido-quistica" */}
        {(masa.tipoLesion === "quistica" || masa.tipoLesion === "solido-quistica") && (
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
                        checked={masa.areaSolida === opt}
                        onChange={onAreaSolidaChange}
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

        /* BLOQUE DINÁMICO (INFO ÁREA SÓLIDA) || areaSolida === "si" */
        {masa.areaSolida === "si" && (
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
                  value={masa.numeroAreasSolidas || ""}
                  onChange={onMasaChange}
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
                  value={masa.vascularizacionAreasSolidas || ""}
                  onChange={onMasaChange}
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
                    value={masa[campo] || ""}
                    onChange={onMasaChange}
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
                      checked={masa.sombra === opt}
                      onChange={(e) => onMasaChange("sombra", e.target.value)}
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

          {/* PARÉNQUIMA OVÁRICO SANO */}
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
                      checked={masa.parenquima === valueMap[opt]}
                      onChange={(e) => onMasaChange("parenquima", e.target.value)}
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
          {masa.parenquima === "si" && (
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
                      value={masa[`medidaPos${eje}`] || ""}
                      onChange={(e) => onMasaChange(`medidaPos${eje}`, e.target.value)}
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
                    checked={masa.ascitis === opt}
                    onChange={(e) => onMasaChange("ascitis", e.target.value)}
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
            {masa.ascitis === "si" && (
              <div className="mt-3 mb-3 item-appear">
                <label className="form-label fw-semibold text-secondary" htmlFor="tipoAscitis">
                  ¿De qué tipo es la ascitis? <span className="text-danger">*</span>
                </label>
                <select
                  name="tipoAscitis"
                  id="tipoAscitis"
                  className={`form-select ${formErrorsLocal.tipoAscitis ? "is-invalid" : ""}`}
                  value={masa.tipoAscitis || ""}
                  onChange={(e) => onMasaChange("tipoAscitis", e.target.value)}
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
                    checked={masa.carcinomatosis === opt}
                    onChange={(e) => onMasaChange("carcinomatosis", e.target.value)}
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
                    checked={masa.anatomiaPatologica === opt}
                    onChange={(e) => onMasaChange("anatomiaPatologica", e.target.value)}
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

          {/* BLOQUE DINÁMICO ANATOMÍA PATOLÓGICA */}
          {masa.anatomiaPatologica === "si" && (
            <div className="mb-3 item-appear">
              <label className="form-label fw-semibold text-secondary" htmlFor="indicaPatologia">
                Anatomía patológica definitiva: <span className="text-danger">*</span>
              </label>
              <input
                name="indicaPatologia"
                id="indicaPatologia"
                className={`form-control ${formErrorsLocal.indicaPatologia ? "is-invalid" : ""}`}
                value={masa.indicaPatologia || ""}
                onChange={(e) => onMasaChange("indicaPatologia", e.target.value)}
                aria-invalid={!!formErrorsLocal.indicaPatologia}
                aria-describedby={formErrorsLocal.indicaPatologia ? "error-indicaPatologia" : undefined}
              />
              {formErrorsLocal.indicaPatologia && (
                <div className="text-danger mt-1" id="error-indicaPatologia">{formErrorsLocal.indicaPatologia}</div>
              )}
            </div>
          )}

          {masa.anatomiaPatologica === "no" && (
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
                      checked={masa.lesionUltimoAnio === opt}
                      onChange={(e) => onMasaChange("lesionUltimoAnio", e.target.value)}
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

          {/* BLOQUE DINÁMICO PROBABILIDAD MALIGNIDAD */}
          {masa.tipoLesion === "quistica" && (
            <div className="p-3 item-appear">
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary d-block mb-2">
                  ¿Quiere calcular la probabilidad de malignidad según los datos ecográficos encontrados?
                  <span className="text-danger">*</span>
                </label>
                <div
                  className={`rounded bg-white p-3 w-100 ${formErrorsLocal.probabilidadMalignidad ? "border-danger" : "border-secondary"}`}
                >
                  {["si", "no"].map((opt) => (
                    <div className="form-check mb-2" key={opt}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="probabilidadMalignidad"
                        value={opt}
                        checked={masa.probabilidadMalignidad === opt}
                        onChange={(e) => onMasaChange("probabilidadMalignidad", e.target.value)}
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
  
  </div>
  );
};

export default MassSection;