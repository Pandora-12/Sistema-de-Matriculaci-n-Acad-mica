import { useMemo, useState } from 'react'
import { Lock } from 'lucide-react'
import CourseCard from './CourseCard'
import CourseSearch from './CourseSearch'

function coincide(curso, termino) {
  const t = termino.trim().toLowerCase()
  if (!t) return true
  return curso.nombre.toLowerCase().includes(t) || curso.codigo.toLowerCase().includes(t)
}

export default function CourseList({ cursos, estudiante, estaSeleccionado, evaluarCurso, onToggle }) {
  const [busqueda, setBusqueda] = useState('')

  const propioSemestre = useMemo(
    () => cursos.filter((c) => c.semestre === estudiante.semestre && coincide(c, busqueda)),
    [cursos, estudiante.semestre, busqueda]
  )
  const otroSemestre = useMemo(
    () => cursos.filter((c) => c.semestre !== estudiante.semestre && coincide(c, busqueda)),
    [cursos, estudiante.semestre, busqueda]
  )

  return (
    <div className="course-list">
      <div className="course-list-toolbar">
        <div>
          <h2 className="section-title">
            Cursos de tu {estudiante.semestre}° semestre
            <span className="section-count">{propioSemestre.length}</span>
          </h2>
          <p className="course-list-subtitle">Selecciona los cursos que quieres matricular este periodo.</p>
        </div>
        <CourseSearch value={busqueda} onChange={setBusqueda} />
      </div>

      <section>
        {propioSemestre.length === 0 ? (
          <p className="empty-search">No encontramos cursos que coincidan con “{busqueda}”.</p>
        ) : (
          <div className="course-grid">
            {propioSemestre.map((curso) => (
              <CourseCard
                key={curso.id}
                curso={curso}
                seleccionado={estaSeleccionado(curso.id)}
                evaluacion={evaluarCurso(curso)}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}
      </section>

      {otroSemestre.length > 0 && (
        <section>
          <h2 className="section-title section-title-muted">
            <Lock size={15} strokeWidth={2.2} />
            Otros semestres (no matriculables)
            <span className="section-count">{otroSemestre.length}</span>
          </h2>
          <div className="course-grid">
            {otroSemestre.map((curso) => (
              <CourseCard
                key={curso.id}
                curso={curso}
                seleccionado={false}
                evaluacion={{ permitido: false, motivo: `Curso de ${curso.semestre}° semestre.` }}
                onToggle={onToggle}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
