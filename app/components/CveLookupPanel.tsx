"use client";

import { useState } from "react";
import ScanForm from "./ScanForm";
import ResultCard from "./ResultCard";
import SeverityBadge from "./SeverityBadge";
import { CveItem, formatDate } from "./severity";

type State = "initial" | "loading" | "error" | "notfound" | CveItem;

export default function CveLookupPanel() {
  const [result, setResult] = useState<State>("initial");

  async function handleSubmit(value: string) {
    setResult("loading");
    try {
      const res = await fetch("/api/cve-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: value }),
      });
      if (!res.ok) {
        setResult("error");
        return;
      }
      const data = await res.json();
      if (!data.found) {
        setResult("notfound");
        return;
      }
      setResult(data.cve as CveItem);
    } catch {
      setResult("error");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ScanForm
        label="Look up a CVE by ID"
        placeholder="e.g. CVE-2024-3094"
        loading={result === "loading"}
        buttonText="Look up"
        helpText="Pulls details directly from the National Vulnerability Database."
        onSubmit={handleSubmit}
      />

      {result === "error" && (
        <ResultCard variant="danger" title="Lookup failed">
          Couldn&apos;t reach the vulnerability database. Try again shortly.
        </ResultCard>
      )}

      {result === "notfound" && (
        <ResultCard variant="info" title="CVE not found">
          We couldn&apos;t find that CVE ID in the database.
        </ResultCard>
      )}

      {typeof result === "object" && (
        <ResultCard
          variant={
            result.severity === "CRITICAL" || result.severity === "HIGH"
              ? "danger"
              : result.severity === "MEDIUM"
              ? "warn"
              : "safe"
          }
          title={result.id}
        >
          <div className="flex items-center justify-between gap-2">
            <SeverityBadge severity={result.severity} score={result.score} />
            <span className="text-xs text-muted">{formatDate(result.published)}</span>
          </div>
          <p className="mt-2">{result.description}</p>
        </ResultCard>
      )}

      {result === "initial" && (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-foreground">How it works</p>
          <p className="mt-2 text-xs">
            Enter any CVE identifier to see its severity score and description from the National
            Vulnerability Database.
          </p>
        </div>
      )}
    </div>
  );
}
