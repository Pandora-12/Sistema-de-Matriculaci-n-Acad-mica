import { Search, X } from 'lucide-react'

export default function CourseSearch({ value, onChange }) {
  return (
    <div className="course-search">
      <Search size={16} strokeWidth={2.2} className="course-search-icon" />
      <input
        type="text"
        placeholder="Buscar por nombre o código…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="course-search-clear"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
