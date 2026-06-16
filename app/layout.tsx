import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ThreatPulse | Threat intelligence',
  description: 'translate threat signals into daily decisions, not noisy feeds',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
