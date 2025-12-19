import { useEffect } from 'react';
import "../../assets/css/MassesFormView.css"; // Ruta corregida
import MassSection from './MassSection';
import OvarySection from './OvarySection';

const GeneralSection = (props) => {
  // Extraemos lo necesario para el alcance local, pero usaremos "props" para los hijos
  const {
    formData,
    setFormData,
    formErrors,
    formErrorsLocal,
    handleChange,
    handleConditionalChange,
    handleGenerarInforme,
    handleAddMasa,
    datosBloqueados,
    handleSubmit,
    makeMassesReport,
    removeMasa,
    addMasa,
    handleMasaChange
  } = props;

  useEffect(() => {
    const modalElement = document.getElementById('confirmMassModal');
    const handleModalShow = () => {
      setFormData(prevData => ({
        ...prevData,
        conclusionEcografista: '', 
      }));
    };
    modalElement?.addEventListener('show.bs.modal', handleModalShow);
    return () => {
      modalElement?.removeEventListener('show.bs.modal', handleModalShow);
    };
  }, [setFormData]);

  return (
    <div className="container-fluid mt-4">
      <h4 className="fw-bold mb-3 titulo-formulario">Datos generales</h4>
      <form onSubmit={handleSubmit} className="mi-formulario">    

        {/* ---------- FILA 1 FORMULARIO ---------- */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="codigo" className="form-label fw-semibold text-secondary">
              Código de paciente del estudio 
            </label>
            <input
              id="codigo" name="codigo" type="text"
              className={`form-control ${formErrors.codigo ? "is-invalid" : ""}`}
              value={formData.codigo} onChange={handleChange} disabled={datosBloqueados}
            />
            <div className="invalid-feedback">{formErrors.codigo}</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="edad" className="form-label fw-semibold text-secondary">
              Edad 
            </label>
            <input
              id="edad" name="edad" type="number"
              className={`form-control ${formErrors.edad ? "is-invalid" : ""}`}
              value={formData.edad} onChange={handleChange} disabled={datosBloqueados}
            />
            <div className="invalid-feedback">{formErrors.edad}</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="fur" className="form-label fw-semibold text-secondary">
              FUR 
            </label>
            <input
              id="fur" name="fur" type="date"
              className={`form-control ${formErrors.fur ? "is-invalid" : ""}`}
              value={formData.fur} onChange={handleChange} disabled={datosBloqueados}
              max={new Date().toISOString().split("T")[0]}
            />
            {formErrors.fur && <div className="invalid-feedback">{formErrors.fur}</div>}
          </div>
        </div>    

        {/* ---------- FILA 2 FORMULARIO ---------- */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="ecografista" className="form-label fw-semibold text-secondary">
              Siglas del ecografista 
            </label>
            <input
              id="ecografista" name="ecografista" type="text"
              className={`form-control ${formErrors.ecografista ? "is-invalid" : ""}`}
              value={formData.ecografista} onChange={handleChange} disabled={datosBloqueados}
            />
            {formErrors.ecografista && <div className="invalid-feedback">{formErrors.ecografista}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="hospital" className="form-label fw-semibold text-secondary">
              Hospital participante 
            </label>
            <select
              id="hospital" name="hospital"
              className={`form-select ${formErrors.hospital ? "is-invalid" : ""}`}
              value={formData.hospital} onChange={handleChange}
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="hurc">Hospital Ramón y Cajal</option>
              <option value="h12o">Hospital 12 de Octubre</option>
            </select>
            {formErrors.hospital && <div className="invalid-feedback">{formErrors.hospital}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="indicacion" className="form-label fw-semibold text-secondary">
              Indicación de ecografía 
            </label>
            <select
              id="indicacion" name="indicacion"
              className={`form-select ${formErrors.indicacion ? "is-invalid" : ""}`}
              value={formData.indicacion} onChange={handleChange}
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="dolor abdominal">Dolor abdominal</option>
              <option value="distension abdominal">Distensión abdominal</option>
              <option value="sangrado">Sangrado</option>
              <option value="hallazgo">Hallazgo accidental</option>
              <option value="otro">Otro</option>
            </select>
            {formErrors.indicacion && <div className="invalid-feedback">{formErrors.indicacion}</div>}
          </div>
        </div>

        {/* BLOQUE DINÁMICO OTRO */}
        {formData.indicacion === "otro" && (
          <div className="row mb-3">
            <div className="col-md-12 item-appear">
              <label htmlFor="otraIndicacion" className="form-label fw-semibold text-secondary">
                Otro <span className="text-danger">*</span>
              </label>
              <textarea
                id="otraIndicacion" name="otraIndicacion"
                className={`form-control mt-2 ${formErrorsLocal.otraIndicacion ? "is-invalid" : ""}`}
                style={{ minHeight: "80px" }}
                value={formData.otraIndicacion || ""} onChange={handleChange}
              />
              {formErrorsLocal.otraIndicacion && <div className="text-danger mt-1">{formErrorsLocal.otraIndicacion}</div>}
            </div>
          </div>
        )}

        {/* ---------- FILA 3 FORMULARIO ---------- */}
        <div className="row mb-3">
          <div className="col-md-6">
            <fieldset className={`rounded p-2 mt-2 ${formErrors.experto ? "border-danger" : "border-secondary"}`}>
              <legend className="form-label fw-semibold text-secondary">¿Ecografista experto?</legend>
              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    id={`experto-${val}`} className="form-check-input" type="radio"
                    name="experto" value={val} checked={formData.experto === val}
                    onChange={handleChange} disabled={datosBloqueados}
                  />
                  <label htmlFor={`experto-${val}`} className="form-check-label">{val === "si" ? "Sí" : "No"}</label>
                </div>
              ))}
            </fieldset>
            {formErrors.experto && <div className="text-danger mt-1">{formErrors.experto}</div>}
          </div>

          <div className="col-md-6">
            <fieldset className={`rounded p-2 mt-2 ${formErrors.referencia ? "border-danger" : "border-secondary"}`}>
              <legend className="form-label fw-semibold text-secondary">¿Centro de referencia?</legend>
              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    id={`referencia-${val}`} className="form-check-input" type="radio"
                    name="referencia" value={val} checked={formData.referencia === val}
                    onChange={handleChange} disabled={datosBloqueados}
                  />
                  <label htmlFor={`referencia-${val}`} className="form-check-label">{val === "si" ? "Sí" : "No"}</label>
                </div>
              ))}
            </fieldset>
            {formErrors.referencia && <div className="text-danger mt-1">{formErrors.referencia}</div>}
          </div>
        </div>      

        {/* ---------- FILA 4 FORMULARIO ---------- */}
        <div className="row mb-3">
          <div className="col-md-6">
            <fieldset className={`rounded p-2 mt-2 border ${formErrorsLocal.masa ? "border-danger" : "border-secondary"}`}>
              <legend className="form-label fw-semibold text-secondary">
                ¿Hay alguna masa anexial? <span className="text-danger">*</span>
              </legend>
              {["si", "no"].map((val) => (
                <div className="form-check" key={val}>
                  <input
                    className="form-check-input" type="radio" name="masa" value={val}
                    checked={formData.masa === val}
                    onChange={(e) => handleConditionalChange("masa", e.target.value, ["informeMasa", "informeOvario"])} 
                    disabled={datosBloqueados} id={`masa-${val}`}
                  />
                  <label className="form-check-label ms-1" htmlFor={`masa-${val}`}>{val === "si" ? "Sí" : "No"}</label>
                </div>
              ))}
            </fieldset>
            {formErrorsLocal.masa && <div className="text-danger mt-1">Este campo es obligatorio</div>}
          </div>
        </div>  

        {/* BLOQUES DINÁMICOS INFORME MASA E INFORME OVARIO */}
        {/* {formData.masa === "si" && <MassSection {...props} />} */}
        {formData.masa === "si" &&
          formData.masas.map((masa, indexMasa) => (
            <MassSection
              key={masa.id}
              masa={masa}
              indexMasa={indexMasa}
              formErrors={formErrors}
              formErrorsLocal={formErrors?.masas?.[indexMasa] || {}}
              setFormErrorsLocal={() => {}}
              handleMasaChange={handleMasaChange}
              removeMasa={removeMasa}
            />
          ))
        }

        {formData.masa === "no" && <OvarySection {...props} />}

        {/* MODAL ADVERTENCIA */}
        <div className="modal fade" id="requiredInputsModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger-subtle">
                <h5 className="modal-title text-danger fw-semibold">¡Atención!</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">Debe rellenar todos los campos obligatorios antes de continuar.</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger text-white" data-bs-dismiss="modal">Entendido</button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL CONFIRMACIÓN */}
        <div className="modal fade" id="confirmMassModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-primary">
              <div className="modal-header bg-primary-subtle">
                <h5 className="modal-title fw-semibold">Confirmación</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <p>Pulse <strong>continuar</strong> para elaborar el informe. <br />
                <strong>Si continúa no podrá volver a este cuestionario.</strong></p>
                <div className="mb-3">
                  <label htmlFor="conclusionEcografista" className="form-label fw-bold">Conclusión del ecografista:</label>
                  <textarea
                    id="conclusionEcografista" className="form-control" rows={4}
                    value={formData.conclusionEcografista || ''}
                    onChange={(e) => setFormData({ ...formData, conclusionEcografista: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                  onClick={() => {
                    const payload = {
                      ...formData,
                      tipoInforme: formData.masa === "si" ? "masa" : "ovario",
                      conclusionEcografista: formData.conclusionEcografista?.trim(),
                    };
                    makeMassesReport(payload);
                  }}
                >
                  Continuar
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTONES ACCIÓN */}
        {/* <div className="d-flex justify-content-between align-items-center mt-3">
          {formData.masa === "si" && (
            <button type="button" className="btn btn-success d-flex align-items-center" onClick={handleAddMasa} disabled>
              <span style={{ fontSize: "20px", marginRight: "6px" }}>+</span> Añadir masa anexial
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={handleGenerarInforme}>
            Generar informe
          </button>
        </div> */}

        {/* BOTONES ACCIÓN */}
        <div className="d-flex justify-content-between align-items-center mt-3">

          <div className="d-flex gap-2">
            {/* Botón añadir masa */}
            {formData.masa === "si" && (
              <button
                type="button"
                className="btn btn-success d-flex align-items-center"
                onClick={handleAddMasa}
              >
                <span style={{ fontSize: "20px", marginRight: "6px" }}>+</span> Añadir masa anexial
              </button>
            )}

            {/* Botón eliminar última masa */}
            {formData.masas.length > 1 && (
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
                onClick={removeMasa}
              >
                <span style={{ fontSize: "20px", marginRight: "6px" }}>−</span> Eliminar masa
              </button>
            )}
          </div>

          {/* Botón generar informe */}
          <button type="button" className="btn btn-primary" onClick={handleGenerarInforme}>
            Generar informe
          </button>
        </div>

      </form>
    </div>
  );
};

export default GeneralSection;