// Simulación de backend: la matrícula confirmada se persiste en
// localStorage, agrupada por id de estudiante, para sobrevivir a
// recargas de página.

const STORAGE_KEY = 'matriculas-confirmadas'

export function guardarMatricula(estudianteId, matricula) {
  const todas = leerTodasLasMatriculas()
  todas[estudianteId] = matricula
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todas))
}

export function leerMatricula(estudianteId) {
  const todas = leerTodasLasMatriculas()
  return todas[estudianteId] ?? null
}

export function leerTodasLasMatriculas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function borrarMatricula(estudianteId) {
  const todas = leerTodasLasMatriculas()
  delete todas[estudianteId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todas))
}
