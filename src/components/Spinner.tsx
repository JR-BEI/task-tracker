import './Spinner.css'

export function Spinner() {
  return (
    <div data-testid="loading-spinner" className="spinner-container">
      <div className="spinner"></div>
    </div>
  )
}
