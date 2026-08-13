import { ShieldCheck } from 'lucide-react'

export default function ConfirmModal({ seleccionados, totalCreditos, onCancelar, onConfirmar }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onCancelar}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <ShieldCheck size={20} strokeWidth={2} />
        </div>
        <p className="eyebrow">Revisa antes de confirmar</p>
        <h2>Resumen de matrícula</h2>

        <ul className="modal-list">
          {seleccionados.map((curso) => (
            <li key={curso.id}>
              <span className="modal-list-codigo">{curso.codigo}</span>
              <span className="modal-list-nombre">{curso.nombre}</span>
              <span className="modal-list-creditos">{curso.creditos} cr.</span>
            </li>
          ))}
        </ul>

        <div className="modal-total">
          <span>Total</span>
          <strong>{totalCreditos} créditos</strong>
        </div>

        <p className="modal-note">
          Esta acción guardará tu matrícula. Podrás revisarla luego desde esta misma sesión.
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancelar}>
            Volver a editar
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
