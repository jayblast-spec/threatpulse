"use client";

import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import SeverityBadge from "./SeverityBadge";
import { CveItem, formatDate } from "./severity";

type State = "loading" | "error" | { cves: CveItem[] };

export default function LatestFeedPanel() {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    fetch("/api/cve-feed")
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setState({ cves: data.cves ?? [] });
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted">
        Recently published or updated vulnerabilities from the National Vulnerability Database.
      </p>

      {state === "loading" && (
        <ResultCard variant="info" title="Loading latest CVEs…" />
      )}

      {state === "error" && (
        <ResultCard variant="danger" title="Feed unavailable">
          Couldn&apos;t reach the vulnerability database. Try again shortly.
        </ResultCard>
      )}

      {typeof state === "object" &&
        state.cves.map((cve) => (
          <ResultCard
            key={cve.id}
            variant={
              cve.severity === "CRITICAL" || cve.severity === "HIGH"
                ? "danger"
                : cve.severity === "MEDIUM"
                ? "warn"
                : "safe"
            }
            title={cve.id}
          >
            <div className="flex items-center justify-between gap-2">
              <SeverityBadge severity={cve.severity} score={cve.score} />
              <span className="text-xs text-muted">{formatDate(cve.published)}</span>
            </div>
            <p className="mt-2 line-clamp-4">{cve.description}</p>
          </ResultCard>
        ))}

      {typeof state === "object" && state.cves.length === 0 && (
        <ResultCard variant="info" title="No recent CVEs found">
          Nothing new in the last 7 days from this feed.
        </ResultCard>
      )}
    </div>
  );
}
