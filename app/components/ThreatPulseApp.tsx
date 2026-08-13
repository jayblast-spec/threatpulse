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
        <div className="flex items-center gap-3">
          <span className="icon-3d">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2 3 6v6c0 5.25 3.75 9.75 9 11 5.25-1.25 9-5.75 9-11V6l-9-4Z"
                stroke="#f4efec"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M12 8v4.5M12 15.5h.01" stroke="#f4efec" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
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
