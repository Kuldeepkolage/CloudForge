import './EmptyState.css'

export default function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">⚒</span>
      <h3 className="empty-state__title">No applications yet</h3>
      <p className="empty-state__text">
        Register your first application above to start tracking its deployments here.
      </p>
    </div>
  )
}