// Reusable error message, shown whenever an API call fails. Never shows
// raw error details/stack traces to the user — just a plain message and
// an optional retry button.

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      style={{
        backgroundColor: "#F3DFD3",
        border: "1px solid #9B4A2B",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
        color: "#9B4A2B",
        fontSize: "0.92rem",
      }}
    >
      <p style={{ margin: 0 }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: "0.6rem",
            background: "none",
            border: "1px solid #9B4A2B",
            color: "#9B4A2B",
            borderRadius: "5px",
            padding: "0.3rem 0.8rem",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}