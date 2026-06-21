import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import AppForm from './components/AppForm.jsx'
import AppList from './components/AppList.jsx'
import { getApps, createApp, deleteApp } from './services/api.js'
import './App.css'

export default function App() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState(null)

  const loadApps = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getApps()
      setApps(data)
    } catch (err) {
      setError(
        err.response
          ? `Server responded with ${err.response.status}. Could not load applications.`
          : 'Could not reach the CloudForge API. Is the backend running on port 5000?'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadApps()
  }, [loadApps])

  const handleCreate = async (payload) => {
    setCreating(true)
    setFormError(null)
    try {
      const newApp = await createApp(payload)
      setApps((prev) => [newApp, ...prev])
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          'Could not register the application. Check the fields and try again.'
      )
      throw err
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id) => {
    const previous = apps
    setApps((prev) => prev.filter((app) => app._id !== id))
    try {
      await deleteApp(id)
    } catch (err) {
      setApps(previous)
      setError('Could not delete the application. Please try again.')
    }
  }

  return (
    <div className="page">
      <div className="page__inner">
        <Header appCount={apps.length} />

        <AppForm
          onCreate={handleCreate}
          creating={creating}
          formError={formError}
          onDismissError={() => setFormError(null)}
        />

        <AppList
          apps={apps}
          loading={loading}
          error={error}
          onRetry={loadApps}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}