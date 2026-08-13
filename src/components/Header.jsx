import { LogOut } from 'lucide-react'

export default function Header({ estudiante, onSalir }) {
  return (
    <header className="page-header">
      <div className="brand">
        <span className="brand-seal">UA</span>
        <div>
          <p className="eyebrow">Registro académico</p>
          <p className="brand-title">Matrícula {new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="header-student">
        <div className="header-avatar">{estudiante.nombre.charAt(0)}</div>
        <div className="header-student-info">
          <strong>{estudiante.nombre}</strong>
          <span>ID {estudiante.id} · {estudiante.semestre}° semestre</span>
        </div>
        <button type="button" className="btn btn-ghost btn-small" onClick={onSalir}>
          <LogOut size={14} strokeWidth={2.2} />
          Salir
        </button>
      </div>
    </header>
  )
}
