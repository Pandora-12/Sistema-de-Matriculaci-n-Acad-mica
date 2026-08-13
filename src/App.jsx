import { useEffect, useState } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import CourseList from './components/CourseList'
import EnrollmentSlip from './components/EnrollmentSlip'
import ConfirmModal from './components/ConfirmModal'
import Receipt from './components/Receipt'
import Toast from './components/Toast'
import CatalogSkeleton from './components/CatalogSkeleton'
import { useEnrollment } from './hooks/useEnrollment'
import cursosData from './data/courses.json'
import estudiantesData from './data/students.json'

export default function App() {
  const [estudiante, setEstudiante] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  if (!estudiante) {
    return <Login estudiantes={estudiantesData} onIngresar={setEstudiante} />
  }

  return (
    <EnrollmentScreen
      estudiante={estudiante}
      onSalir={() => setEstudiante(null)}
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
    />
  )
}

function EnrollmentScreen({ estudiante, onSalir, mostrarModal, setMostrarModal }) {
  const [cargandoCatalogo, setCargandoCatalogo] = useState(true)
  const [toast, setToast] = useState(null)

  const {
    seleccionados,
    totalCreditos,
    matriculaConfirmada,
    errorSeleccion,
    estaSeleccionado,
    evaluarCurso,
    toggleCurso,
    confirmarMatricula,
    reiniciarMatricula,
    limpiarError,
  } = useEnrollment(estudiante, cursosData)

  useEffect(() => {
    const t = setTimeout(() => setCargandoCatalogo(false), 420)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (errorSeleccion) {
      setToast({ type: 'error', message: errorSeleccion })
      limpiarError()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorSeleccion])

  function handleConfirmarDesdeModal() {
    const ok = confirmarMatricula()
    if (ok) {
      setMostrarModal(false)
      setToast({ type: 'success', message: 'Matrícula confirmada con éxito.' })
    }
  }

  if (matriculaConfirmada) {
    return (
      <div className="app-shell">
        <Header estudiante={estudiante} onSalir={onSalir} />
        <Receipt estudiante={estudiante} matricula={matriculaConfirmada} onReiniciar={reiniciarMatricula} />
      </div>
    )
  }

  const cursosDelSemestre = cursosData.filter((c) => c.semestre === estudiante.semestre)

  return (
    <div className="app-shell">
      <Header estudiante={estudiante} onSalir={onSalir} />

      {!estudiante.matriculado && (
        <div className="banner-warning">
          Tu estado no figura como matriculado en el periodo académico actual, por lo que no
          puedes asignar cursos.
        </div>
      )}

      <div className="stats-bar-wrap">
        <StatsBar
          estudiante={estudiante}
          totalCreditos={totalCreditos}
          cursosDisponiblesCount={cursosDelSemestre.length}
          seleccionadosCount={seleccionados.length}
        />
      </div>

      {cargandoCatalogo ? (
        <CatalogSkeleton />
      ) : (
        <main className="app-main">
          <CourseList
            cursos={cursosData}
            estudiante={estudiante}
            estaSeleccionado={estaSeleccionado}
            evaluarCurso={evaluarCurso}
            onToggle={toggleCurso}
          />

          <EnrollmentSlip
            estudiante={estudiante}
            seleccionados={seleccionados}
            totalCreditos={totalCreditos}
            onQuitar={toggleCurso}
            onConfirmar={() => setMostrarModal(true)}
          />
        </main>
      )}

      {mostrarModal && (
        <ConfirmModal
          seleccionados={seleccionados}
          totalCreditos={totalCreditos}
          onCancelar={() => setMostrarModal(false)}
          onConfirmar={handleConfirmarDesdeModal}
        />
      )}

      <div className="toast-wrap">
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  )
}
