const COLORS: Record<string, string> = {
  CRITICAL: "bg-danger/15 text-danger border-danger/40",
  HIGH: "bg-danger/15 text-danger border-danger/40",
  MEDIUM: "bg-warn/15 text-warn border-warn/40",
  LOW: "bg-safe/15 text-safe border-safe/40",
  UNKNOWN: "bg-surface-2 text-muted border-border",
};

export default function SeverityBadge({
  severity,
  score,
}: {
  severity: string;
  score: number | null;
}) {
  const classes = COLORS[severity.toUpperCase()] ?? COLORS.UNKNOWN;
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${classes}`}>
      {severity}
      {score !== null ? ` ${score.toFixed(1)}` : ""}
    </span>
  );
}
