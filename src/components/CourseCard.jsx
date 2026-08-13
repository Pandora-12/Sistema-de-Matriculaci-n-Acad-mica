import { Check, Plus, TriangleAlert } from 'lucide-react'
import { cuposDisponibles } from '../utils/validations'

export default function CourseCard({ curso, seleccionado, evaluacion, onToggle }) {
  const cupos = cuposDisponibles(curso)
  const sinCupos = cupos <= 0
  const ocupacion = Math.min(Math.round((curso.matriculados / curso.limiteCupos) * 100), 100)
  const deshabilitado = !seleccionado && !evaluacion.permitido

  let nivelOcupacion = 'baja'
  if (ocupacion >= 100) nivelOcupacion = 'llena'
  else if (ocupacion >= 80) nivelOcupacion = 'alta'
  else if (ocupacion >= 50) nivelOcupacion = 'media'

  return (
    <article className={`course-card ${seleccionado ? 'is-selected' : ''} ${deshabilitado ? 'is-disabled' : ''}`}>
      <header className="course-card-head">
        <span className="course-codigo">{curso.codigo}</span>
        <span className={`course-cupos ${sinCupos ? 'cupos-agotados' : ''}`}>
          {sinCupos ? 'Sin cupos' : `${cupos} cupos`}
        </span>
      </header>

      <h3 className="course-nombre">{curso.nombre}</h3>

      <div className="course-meta">
        <span>{curso.creditos} créditos</span>
        <span className="dot">·</span>
        <span>{curso.semestre}° semestre</span>
      </div>

      <div className="capacity-bar" aria-hidden="true">
        <div className={`capacity-fill capacity-${nivelOcupacion}`} style={{ width: `${ocupacion}%` }} />
      </div>
      <p className="capacity-caption">
        {curso.matriculados} de {curso.limiteCupos} cupos ocupados
      </p>

      <button
        type="button"
        className={`btn btn-toggle ${seleccionado ? 'btn-remove' : 'btn-add'}`}
        onClick={() => onToggle(curso)}
        disabled={deshabilitado}
      >
        {seleccionado ? (
          <>
            <Check size={15} strokeWidth={2.4} /> Agregado
          </>
        ) : (
          <>
            <Plus size={15} strokeWidth={2.4} /> Agregar
          </>
        )}
      </button>

      {deshabilitado && evaluacion.motivo && (
        <p className="course-motivo">
          <TriangleAlert size={13} strokeWidth={2.2} />
          {evaluacion.motivo}
        </p>
      )}
    </article>
  )
}
