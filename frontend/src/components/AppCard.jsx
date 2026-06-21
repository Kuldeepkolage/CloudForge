import { useEffect, useRef, useState } from 'react'
import StatusBadge from './StatusBadge.jsx'
import './AppCard.css'

function formatDate(value) {
  if (!value) return 'Unknown'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function shortenUrl(url) {
  return url.replace(/^https?:\/\//, '')
}

const ACTIVE_STATUSES = new Set(['pending', 'building', 'deploying', 'running'])

export default function AppCard({ app, onDelete }) {
  const [confirming, setConfirming] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleDeleteClick = () => {
    if (!confirming) {
      setConfirming(true)
      timeoutRef.current = setTimeout(() => setConfirming(false), 3000)
      return
    }
    clearTimeout(timeoutRef.current)
    onDelete(app._id)
  }

  const statusKey = (app.status || 'pending').toLowerCase()
  const isActive = ACTIVE_STATUSES.has(statusKey)

  return (
    <article className="app-card">
      <span
        className={`app-card__rail app-card__rail--${statusKey} ${isActive ? 'app-card__rail--pulse' : ''}`}
        aria-hidden="true"
      />
      <div className="app-card__body">
        <div className="app-card__top">
          <h3 className="app-card__name">{app.name}</h3>
          <StatusBadge status={app.status} />
        </div>

        {app.description && <p className="app-card__description">{app.description}</p>}

        <a
          href={app.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="app-card__repo"
          title={app.repositoryUrl}
        >
          {shortenUrl(app.repositoryUrl)}
        </a>

        <div className="app-card__footer">
          <span className="app-card__date">Created {formatDate(app.createdAt)}</span>
          <button
            type="button"
            className={`app-card__delete ${confirming ? 'app-card__delete--confirm' : ''}`}
            onClick={handleDeleteClick}
          >
            {confirming ? 'Confirm delete' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  )
}