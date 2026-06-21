import './Header.css'

export default function Header({ appCount = 0 }) {
  return (
    <header className="header">
      <div className="header__title-row">
        <span className="header__mark" aria-hidden="true">⚒</span>
        <h1 className="header__title">CloudForge</h1>
      </div>
      <p className="header__subtitle">
        Register, track, and ship applications from one deployment console.
      </p>
      <div className="header__meta">
        <span className="header__meta-dot" aria-hidden="true" />
        <span>{appCount} {appCount === 1 ? 'application' : 'applications'} under management</span>
      </div>
    </header>
  )
}