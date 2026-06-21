import { useState } from 'react'
import './AppForm.css'

const initialState = { name: '', description: '', repositoryUrl: '' }

function isValidUrl(value) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export default function AppForm({ onCreate, creating, formError, onDismissError }) {
  const [form, setForm] = useState(initialState)
  const [touched, setTouched] = useState({})

  const nameError = touched.name && !form.name.trim() ? 'Application name is required.' : null
  const urlError =
    touched.repositoryUrl && !isValidUrl(form.repositoryUrl)
      ? 'Enter a valid repository URL, e.g. https://github.com/org/repo.'
      : null

  const canSubmit = form.name.trim() && isValidUrl(form.repositoryUrl) && !creating

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (formError) onDismissError()
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, repositoryUrl: true })
    if (!canSubmit) return

    try {
      await onCreate({
        name: form.name.trim(),
        description: form.description.trim(),
        repositoryUrl: form.repositoryUrl.trim()
      })
      setForm(initialState)
      setTouched({})
    } catch {
      // formError is surfaced by the parent; keep field values for correction.
    }
  }

  return (
    <section className="app-form" aria-labelledby="app-form-heading">
      <div className="app-form__head">
        <h2 id="app-form-heading" className="app-form__title">Forge a new application</h2>
        <p className="app-form__hint">Connect a repository to start tracking its deployments.</p>
      </div>

      {formError && (
        <div className="app-form__error" role="alert">
          <span>{formError}</span>
          <button type="button" className="app-form__error-dismiss" onClick={onDismissError} aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}

      <form className="app-form__grid" onSubmit={handleSubmit} noValidate>
        <div className="app-form__field app-form__field--name">
          <label htmlFor="name">Application name</label>
          <input
            id="name"
            type="text"
            placeholder="payments-api"
            value={form.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            aria-invalid={Boolean(nameError)}
            disabled={creating}
          />
          {nameError && <span className="app-form__field-error">{nameError}</span>}
        </div>

        <div className="app-form__field app-form__field--repo">
          <label htmlFor="repositoryUrl">Repository URL</label>
          <input
            id="repositoryUrl"
            type="text"
            placeholder="https://github.com/org/payments-api"
            value={form.repositoryUrl}
            onChange={handleChange('repositoryUrl')}
            onBlur={handleBlur('repositoryUrl')}
            aria-invalid={Boolean(urlError)}
            disabled={creating}
            className="app-form__input--mono"
          />
          {urlError && <span className="app-form__field-error">{urlError}</span>}
        </div>

        <div className="app-form__field app-form__field--description">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="What does this service do?"
            value={form.description}
            onChange={handleChange('description')}
            disabled={creating}
            rows={2}
          />
        </div>

        <div className="app-form__actions">
          <button type="submit" className="app-form__submit" disabled={!canSubmit}>
            {creating ? 'Registering…' : 'Register application'}
          </button>
        </div>
      </form>
    </section>
  )
}