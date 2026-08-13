import { useState } from 'react'
import { ArrowRight, GraduationCap } from 'lucide-react'

export default function Login({ estudiantes, onIngresar }) {
  const [idIngresado, setIdIngresado] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (!idIngresado.trim()) {
      setError('Ingresa tu ID de estudiante.')
      return
    }

    const id = Number(idIngresado)
    const estudiante = estudiantes.find((e) => e.id === id)
    if (!estudiante) {
      setError(`No se encontró un estudiante con ID ${idIngresado}.`)
      return
    }

    setCargando(true)
    setTimeout(() => onIngresar(estudiante), 350)
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-seal">
          <GraduationCap size={26} strokeWidth={2} />
        </div>
        <p className="eyebrow">Registro académico</p>
        <h1>Sistema de Matrícula</h1>
        <p className="login-copy">
          Ingresa tu identificador de estudiante para ver los cursos disponibles de tu semestre.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="student-id">ID de estudiante</label>
          <input
            id="student-id"
            type="text"
            inputMode="numeric"
            placeholder="Ej. 101"
            value={idIngresado}
            onChange={(e) => {
              setIdIngresado(e.target.value)
              setError(null)
            }}
            autoFocus
          />
          {error && <p className="field-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? 'Ingresando…' : 'Ingresar'}
            {!cargando && <ArrowRight size={16} strokeWidth={2.4} />}
          </button>
        </form>

        <div className="login-hint">
          <p>IDs de prueba disponibles:</p>
          <ul>
            <li><strong>101</strong> — Juan Pérez, 2° semestre, caso normal</li>
            <li><strong>102</strong> — María Gómez, 1° semestre</li>
            <li><strong>103</strong> — Carlos Ramírez, límite de créditos bajo (7)</li>
            <li><strong>104</strong> — Laura Torres, no matriculada en el periodo</li>
            <li><strong>105</strong> — Andrés Rojas, límite de créditos alto (30)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
