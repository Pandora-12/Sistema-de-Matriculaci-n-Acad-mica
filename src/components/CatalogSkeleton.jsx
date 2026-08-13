export default function CatalogSkeleton() {
  return (
    <div className="app-main">
      <div className="course-list">
        <div className="skeleton-line skeleton-title" />
        <div className="course-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-line skeleton-w40" />
              <div className="skeleton-line skeleton-w80" />
              <div className="skeleton-line skeleton-w60" />
              <div className="skeleton-line skeleton-btn" />
            </div>
          ))}
        </div>
      </div>
      <div className="slip">
        <div className="skeleton-line skeleton-w60" />
        <div className="skeleton-line skeleton-w40" />
      </div>
    </div>
  )
}
