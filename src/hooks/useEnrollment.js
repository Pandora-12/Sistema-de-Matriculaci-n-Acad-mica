import { useMemo, useState } from 'react'
import { puedeSeleccionarCurso, creditosSeleccionados } from '../utils/validations'
import { guardarMatricula, leerMatricula, borrarMatricula } from '../utils/storage'

export function useEnrollment(estudiante, cursos) {
  const [seleccionados, setSeleccionados] = useState([])
  const [matriculaConfirmada, setMatriculaConfirmada] = useState(() =>
    leerMatricula(estudiante.id)
  )
  const [errorSeleccion, setErrorSeleccion] = useState(null)

  const totalCreditos = useMemo(() => creditosSeleccionados(seleccionados), [seleccionados])

  function estaSeleccionado(cursoId) {
    return seleccionados.some((c) => c.id === cursoId)
  }

  function evaluarCurso(curso) {
    return puedeSeleccionarCurso({ curso, estudiante, seleccionados })
  }

  function toggleCurso(curso) {
    setErrorSeleccion(null)

    if (estaSeleccionado(curso.id)) {
      setSeleccionados((prev) => prev.filter((c) => c.id !== curso.id))
      return
    }

    const { permitido, motivo } = evaluarCurso(curso)
    if (!permitido) {
      setErrorSeleccion(motivo)
      return
    }
    setSeleccionados((prev) => [...prev, curso])
  }

  function confirmarMatricula() {
    if (seleccionados.length === 0) {
      setErrorSeleccion('Selecciona al menos un curso antes de confirmar.')
      return false
    }

    const matricula = {
      estudianteId: estudiante.id,
      fecha: new Date().toISOString(),
      cursos: seleccionados.map((c) => ({
        id: c.id,
        codigo: c.codigo,
        nombre: c.nombre,
        creditos: c.creditos,
      })),
      totalCreditos,
    }

    guardarMatricula(estudiante.id, matricula)
    setMatriculaConfirmada(matricula)
    return true
  }

  function reiniciarMatricula() {
    borrarMatricula(estudiante.id)
    setMatriculaConfirmada(null)
    setSeleccionados([])
    setErrorSeleccion(null)
  }

  function limpiarError() {
    setErrorSeleccion(null)
  }

  return {
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
  }
}
