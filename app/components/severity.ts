export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";

export type CveItem = {
  id: string;
  published: string | null;
  description: string;
  score: number | null;
  severity: string;
};

export function severityVariant(severity: string): "danger" | "warn" | "safe" | "info" {
  switch (severity.toUpperCase()) {
    case "CRITICAL":
    case "HIGH":
      return "danger";
    case "MEDIUM":
      return "warn";
    case "LOW":
      return "safe";
    default:
      return "info";
  }
}

export function formatDate(iso: string | null): string {
  if (!iso) return "Unknown date";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
