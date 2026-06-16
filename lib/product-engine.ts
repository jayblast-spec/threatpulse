export type IntelligenceInput = { input?: string };
const product = {
  "repo": "ThreatPulse",
  "title": "ThreatPulse",
  "eyebrow": "ArkNet Digital / Cybersecurity Suite",
  "theme": "from-rose-300 via-orange-300 to-amber-300",
  "hero": "Turn threat noise into a daily defensive action brief.",
  "sub": "ThreatPulse is for founders and blue-team leads who need to know what changed, why it matters, and what to do today without drowning in feeds.",
  "input": "SaaS startup, public dashboards, credential stuffing, exposed admin routes",
  "cta": "Generate threat pulse",
  "scoreLabel": "Priority pulse",
  "panels": [
    [
      "Signal clustering",
      "Group CVEs, abuse campaigns, and industry signals into themes."
    ],
    [
      "Business impact",
      "Translate technical issues into operational risk."
    ],
    [
      "Action brief",
      "Recommend the next defensive move with owner and urgency."
    ],
    [
      "Watch memory",
      "Track recurring themes and what was already handled."
    ]
  ],
  "rows": [
    [
      "Credential stuffing",
      "Identity",
      "High",
      "Review MFA coverage, rate limits, and login anomaly monitoring."
    ],
    [
      "Public admin panels",
      "Exposure",
      "Critical",
      "Find, restrict, and monitor admin paths."
    ],
    [
      "Dependency CVE",
      "Supply chain",
      "Medium",
      "Patch reachable services first."
    ],
    [
      "Phishing campaign",
      "Human risk",
      "High",
      "Push warning copy and safe-link checks."
    ]
  ],
  "missions": [
    [
      "OTX and URLhaus fusion",
      "Combine free feeds into useful daily defensive signals."
    ],
    [
      "MITRE mapping",
      "Map pulse items to tactics and mitigations."
    ],
    [
      "Morning SOC email",
      "Send a concise daily action brief."
    ],
    [
      "Founder report",
      "Translate threats into business priorities."
    ]
  ],
  "apiExtra": "ThreatPulse should reduce noise and point to defensive action, not become a fear dashboard."
} as const;
function scoreFor(subject: string) { let score = 58 + Math.min(28, Math.floor(subject.length / 5)); if (/admin|rdp|database|credential|prod|public|critical|cve|phishing/i.test(subject)) score += 9; return Math.min(98, score); }
function severity(score: number) { return score >= 88 ? 'critical' : score >= 74 ? 'high' : score >= 61 ? 'medium' : 'low'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.title,
    brand: 'ArkNet Digital',
    category: product.hero,
    subject,
    score,
    severity: severity(score),
    executive_summary: product.sub,
    exposure_map: product.panels.map(([label, value]) => ({ label, value, status: score >= 74 ? 'priority' : 'review' })),
    remediation_queue: product.rows.slice(0, 3).map(([asset, type, risk, note]) => ({ action: asset + ' - ' + type, owner: risk === 'Critical' ? 'Security lead' : 'Blue Team', impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    defensive_scope: product.apiExtra,
    generated_at: new Date().toISOString()
  };
}
