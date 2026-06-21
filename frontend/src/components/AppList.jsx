import AppCard from './AppCard.jsx'
import EmptyState from './EmptyState.jsx'
import Loader from './Loader.jsx'
import './AppList.css'

export default function AppList({ apps, loading, error, onRetry, onDelete }) {
  if (loading) {
    return <Loader label="Loading applications…" />
  }

  if (error) {
    return (
      <div className="app-list__error" role="alert">
        <p className="app-list__error-text">{error}</p>
        <button type="button" className="app-list__retry" onClick={onRetry}>
          Retry
        </button>
      </div>
    )
  }

  if (apps.length === 0) {
    return <EmptyState />
  }

  return (
    <section aria-label="Applications">
      <div className="app-list">
        {apps.map((app) => (
          <AppCard key={app._id} app={app} onDelete={onDelete} />
        ))}
      </div>
    </section>
  )
}