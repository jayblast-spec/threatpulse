<div align="center">

# ThreatPulse

### Threat Intelligence Without the Noise

ThreatPulse translates live vulnerability data into decisions a small team can actually act on: a live CVE feed and a direct CVE lookup, without the alert fatigue of a full SOC feed.

<p>
  <a href="https://github.com/jayblast-spec/threatpulse"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-1D4ED8?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated ThreatPulse headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Live+CVE+feed%2C+no+SOC+budget+required;Search+any+CVE+%E2%86%92+full+detail%2C+CVSS%2C+patch+status;Plain-English+severity%2C+not+raw+scores;Zero+signup%2C+open+and+search+immediately">
</p>

</div>

## What It Does

ThreatPulse surfaces newly published vulnerabilities as a live feed and lets a user search any CVE ID directly to see its severity (CVSS), affected products, and patch/fix status — without needing a security operations budget or an enterprise threat-intel subscription.

## How It Works

- Next.js App Router front end (`app/page.tsx`) renders the feed and lookup UI.
- `app/api/cve-feed/route.ts` queries NIST's real NVD API directly (`services.nvd.nist.gov`) for CVEs modified in the last 7 days; `app/api/cve-lookup/route.ts` handles direct CVE ID lookups against the same source.
- Styling is Tailwind CSS 4, with no account system required to browse or search.

## Engineering Notes

**The real problem:** the NVD's own web UI is slow to scan and not built for a quick "what changed this week" check — most people either don't check CVE feeds regularly or rely on a mailing list digest that's already a day stale.

**The approach:** `cve-feed` hits the live NVD REST API with a 7-day `lastModStartDate`/`lastModEndDate` window every request — there's no local cache or database, so the feed is always exactly as current as NVD's own data, not a snapshot that drifts out of sync.

**One real number:** each request pulls up to 20 results (`resultsPerPage: "20"`) per page from the real NVD dataset, with CVSS v3.1/v3.0/v2 base scores read directly from NVD's own metrics, not recomputed locally.

**Not handled yet:** the homepage "intelligence" panel is a decorative heuristic disconnected from the real feed and lookup routes — don't read it as a threat-summarization layer.

## Live

Production: *(demo temporarily offline)*

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Server Logic | Next.js API routes (`/api/cve-feed`, `/api/cve-lookup`, `/api/intelligence`) |
| Deployment | Vercel |

<p align="center">
  <img alt="ArkNet Digital" src="https://capsule-render.vercel.app/api?type=rect&height=70&color=0:1D4ED8,55:0B1E3D,100:020617&text=ArkNet%20Digital%20%7C%20Contact%3A%20michael%40arknet.digital&fontColor=FAFAFA&fontSize=16&fontAlign=50&animation=fadeIn">
</p>
