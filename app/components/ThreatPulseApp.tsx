"use client";

import { useState } from "react";
import ToolTabs, { TabId } from "./ToolTabs";
import LatestFeedPanel from "./LatestFeedPanel";
import CveLookupPanel from "./CveLookupPanel";
import CrossPromoFooter from "./CrossPromoFooter";

export default function ThreatPulseApp() {
  const [activeTab, setActiveTab] = useState<TabId>("feed");

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-lg text-accent">
            ⚡
          </span>
          <h1 className="text-xl font-bold text-foreground">ThreatPulse</h1>
        </div>
        <p className="mt-2 text-sm text-muted">
          Latest vulnerability feed — free, instant, no signup.
        </p>
      </header>

      <ToolTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "feed" && <LatestFeedPanel />}
        {activeTab === "lookup" && <CveLookupPanel />}
      </div>

      <CrossPromoFooter />
    </main>
  );
}
