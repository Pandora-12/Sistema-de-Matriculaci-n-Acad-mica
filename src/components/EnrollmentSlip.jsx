import { ClipboardList, Trash2 } from 'lucide-react'
import CreditSeal from './CreditSeal'

export default function EnrollmentSlip({
  estudiante,
  seleccionados,
  totalCreditos,
  onQuitar,
  onConfirmar,
}) {
  return (
    <aside className="slip">
      <div className="slip-header">
        <div>
          <p className="eyebrow">Boleta de matrícula</p>
          <h2>{estudiante.nombre}</h2>
          <p className="slip-carrera">{estudiante.carrera}</p>
        </div>
        <CreditSeal usados={totalCreditos} permitidos={estudiante.creditosPermitidos} />
      </div>

      <div className="slip-body">
        {seleccionados.length === 0 ? (
          <div className="slip-empty">
            <ClipboardList size={28} strokeWidth={1.6} />
            <p>Aún no has agregado cursos. Selecciónalos de la lista.</p>
          </div>
        ) : (
          <ul className="slip-list">
            {seleccionados.map((curso) => (
              <li key={curso.id} className="slip-item">
                <div>
                  <span className="slip-item-codigo">{curso.codigo}</span>
                  <span className="slip-item-nombre">{curso.nombre}</span>
                </div>
                <div className="slip-item-right">
                  <span>{curso.creditos} cr.</span>
                  <button
                    type="button"
                    className="slip-remove"
                    onClick={() => onQuitar(curso)}
                    aria-label={`Quitar ${curso.nombre}`}
                  >
                    <Trash2 size={13} strokeWidth={2.2} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="slip-footer">
        <div className="slip-total">
          <span>Total créditos</span>
          <strong>
            {totalCreditos} / {estudiante.creditosPermitidos}
          </strong>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          disabled={seleccionados.length === 0}
          onClick={onConfirmar}
        >
          Confirmar matrícula
        </button>
      </div>
    </aside>
  )
}
