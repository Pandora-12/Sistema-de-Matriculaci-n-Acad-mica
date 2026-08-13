// Reglas de negocio de la matrícula, centralizadas aquí para que
// tanto la UI (habilitar/deshabilitar botones) como la confirmación
// final validen exactamente lo mismo.

export function cuposDisponibles(curso) {
  return curso.limiteCupos - curso.matriculados
}

export function creditosSeleccionados(cursosSeleccionados) {
  return cursosSeleccionados.reduce((total, curso) => total + curso.creditos, 0)
}

/**
 * Determina si un curso puede ser seleccionado por el estudiante,
 * dado el estado actual de selección. Devuelve { permitido, motivo }.
 */
export function puedeSeleccionarCurso({ curso, estudiante, seleccionados }) {
  if (!estudiante.matriculado) {
    return { permitido: false, motivo: 'El estudiante no está matriculado en el periodo académico.' }
  }

  if (curso.semestre !== estudiante.semestre) {
    return { permitido: false, motivo: `Este curso pertenece a ${curso.semestre}° semestre, no al tuyo.` }
  }

  if (cuposDisponibles(curso) <= 0) {
    return { permitido: false, motivo: 'No hay cupos disponibles para este curso.' }
  }

  const yaSeleccionado = seleccionados.some((c) => c.id === curso.id)
  if (yaSeleccionado) {
    return { permitido: true, motivo: null }
  }

  const totalConEsteCurso = creditosSeleccionados(seleccionados) + curso.creditos
  if (totalConEsteCurso > estudiante.creditosPermitidos) {
    return {
      permitido: false,
      motivo: `Superarías el límite de ${estudiante.creditosPermitidos} créditos permitidos.`,
    }
  }

  return { permitido: true, motivo: null }
}
