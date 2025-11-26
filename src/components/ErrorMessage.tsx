import './ErrorMessage.css'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div data-testid="error-message" className="error-message">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button
          data-testid="retry-btn"
          onClick={onRetry}
          className="retry-btn"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
