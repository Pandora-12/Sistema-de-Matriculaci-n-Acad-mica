import { useEffect } from 'react'
import { AlertTriangle, CheckCircle2, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onClose, 4200)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const Icon = toast.type === 'success' ? CheckCircle2 : AlertTriangle

  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <Icon size={18} strokeWidth={2.2} />
      <span>{toast.message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Cerrar aviso">
        <X size={15} />
      </button>
    </div>
  )
}
