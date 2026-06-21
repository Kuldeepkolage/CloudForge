import './StatusBadge.css'

const STATUS_LABELS = {
  pending: 'Pending',
  building: 'Building',
  deploying: 'Deploying',
  running: 'Running',
  deployed: 'Deployed',
  failed: 'Failed',
  error: 'Error',
  stopped: 'Stopped'
}

export default function StatusBadge({ status }) {
  const key = (status || 'pending').toLowerCase()
  const label = STATUS_LABELS[key] || status || 'Unknown'

  return (
    <span className={`status-badge status-badge--${key}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {label}
    </span>
  )
}