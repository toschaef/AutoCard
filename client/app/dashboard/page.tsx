/*
 * Quick Start:
 * 1. Install Tailwind CSS: npm install -D tailwindcss postcss autoprefixer
 * 2. Run development server: npm run dev
 * 3. Navigate to /dashboard
 * 
 * TODO: Wire up dynamic auth name from user context
 * TODO: Add navigation routing for Play/Edit buttons
 */

import TopBar from '../../components/TopBar';
import GreetingHero from '../../components/GreetingHero';
import Row from '../../components/Row';
import { rows } from '../../lib/mockData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar name="Ali" />
      <GreetingHero name="Ali" />
      
      <main className="max-w-7xl mx-auto">
        {rows.map((row) => (
          <Row
            key={row.title}
            title={row.title}
            items={row.items}
          />
        ))}
      </main>
    </div>
  );
}
