export type IntelligenceInput = { input?: string };

const product = {
  "repo": "ThreatPulse",
  "suite": "Cybersecurity Suite",
  "category": "Threat intelligence",
  "audience": "blue-team leads, SOC managers, and founders protecting revenue",
  "promise": "translate threat signals into daily decisions, not noisy feeds",
  "inputLabel": "Asset, industry, or threat concern",
  "placeholder": "SaaS startup exposed admin panels and credential stuffing risk",
  "primary": "Generate pulse",
  "gradient": "from-rose-300 via-orange-300 to-amber-300",
  "modules": [
    "Signal clustering",
    "Business impact scoring",
    "Mitigation shortlist",
    "Executive summary",
    "Watchlist memory"
  ],
  "outputs": [
    "Top threat theme",
    "Business impact",
    "Next defensive action",
    "Watchlist update"
  ],
  "next": [
    "OTX/URLhaus feed fusion",
    "industry watchlists",
    "automated morning SOC brief",
    "MITRE ATT&CK mapping"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
