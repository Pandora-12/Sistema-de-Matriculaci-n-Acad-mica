const RADIUS = 42
const CIRCUNFERENCIA = 2 * Math.PI * RADIUS

export default function CreditSeal({ usados, permitidos }) {
  const proporcion = permitidos > 0 ? Math.min(usados / permitidos, 1) : 0
  const offset = CIRCUNFERENCIA * (1 - proporcion)
  const excedido = usados > permitidos

  return (
    <div className={`credit-seal ${excedido ? 'is-over' : ''}`} role="img" aria-label={`${usados} de ${permitidos} créditos usados`}>
      <svg viewBox="0 0 100 100" width="96" height="96">
        <circle cx="50" cy="50" r={RADIUS} className="seal-track" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          className="seal-progress"
          strokeDasharray={CIRCUNFERENCIA}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="46" textAnchor="middle" className="seal-number">
          {usados}
        </text>
        <text x="50" y="63" textAnchor="middle" className="seal-label">
          / {permitidos} cr.
        </text>
      </svg>
    </div>
  )
}
