// Shown when there's genuinely no data to display (e.g. a district
// somehow has no sector data). Never leave a blank white area — always
// tell the user what happened and, if possible, what to do next.

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2.5rem 1.5rem",
        color: "#5C5A4C",
        border: "1px dashed #E2DCC9",
        borderRadius: "10px",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.95rem" }}>{message}</p>
    </div>
  );
}