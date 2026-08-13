import { BadgeCheck, Pencil, Printer } from 'lucide-react'

export default function Receipt({ estudiante, matricula, onReiniciar }) {
  const fecha = new Date(matricula.fecha)

  return (
    <div className="receipt-screen">
      <div className="receipt-card">
        <div className="receipt-stamp">
          <BadgeCheck size={14} strokeWidth={2.4} />
          Matrícula confirmada
        </div>
        <h1>Comprobante de matrícula</h1>
        <p className="receipt-sub">
          {estudiante.nombre} · {estudiante.carrera} · {estudiante.semestre}° semestre
        </p>

        <ul className="receipt-list">
          {matricula.cursos.map((curso) => (
            <li key={curso.id}>
              <span className="modal-list-codigo">{curso.codigo}</span>
              <span className="modal-list-nombre">{curso.nombre}</span>
              <span className="modal-list-creditos">{curso.creditos} cr.</span>
            </li>
          ))}
        </ul>

        <div className="modal-total">
          <span>Total matriculado</span>
          <strong>{matricula.totalCreditos} créditos</strong>
        </div>

        <p className="receipt-meta">
          Generado el {fecha.toLocaleDateString('es-CO')} a las{' '}
          {fecha.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </p>

        <div className="receipt-actions">
          <button type="button" className="btn btn-ghost" onClick={onReiniciar}>
            <Pencil size={14} strokeWidth={2.2} />
            Editar matrícula
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
            <Printer size={14} strokeWidth={2.2} />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  )
}
