import { BookOpen, GraduationCap, Layers, Wallet } from 'lucide-react'

export default function StatsBar({ estudiante, totalCreditos, cursosDisponiblesCount, seleccionadosCount }) {
  const creditosRestantes = Math.max(estudiante.creditosPermitidos - totalCreditos, 0)

  const items = [
    {
      icon: GraduationCap,
      label: 'Semestre actual',
      value: `${estudiante.semestre}°`,
    },
    {
      icon: BookOpen,
      label: 'Cursos disponibles',
      value: cursosDisponiblesCount,
    },
    {
      icon: Layers,
      label: 'Cursos seleccionados',
      value: seleccionadosCount,
    },
    {
      icon: Wallet,
      label: 'Créditos restantes',
      value: creditosRestantes,
    },
  ]

  return (
    <div className="stats-bar">
      {items.map(({ icon: Icon, label, value }) => (
        <div className="stat-chip" key={label}>
          <span className="stat-chip-icon">
            <Icon size={16} strokeWidth={2.2} />
          </span>
          <div>
            <p className="stat-chip-value">{value}</p>
            <p className="stat-chip-label">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
