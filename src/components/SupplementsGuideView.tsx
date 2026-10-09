import React, { useState } from 'react';

interface SupplementItem {
  id: string;
  name: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  verdictBadge: string;
  dosage: string;
  timing: string;
  whatItActuallyDoes: string;
  hypeCheck: string;
  costEfficiency: string;
}

const SUPPLEMENTS_LIST: SupplementItem[] = [
  {
    id: 'creatine-mono',
    name: 'Creatine Monohydrate',
    tier: 'tier1',
    verdictBadge: 'Tier 1 • Gold Standard',
    dosage: '5g Daily (1 flat scoop)',
    timing: 'Any time of day with water',
    whatItActuallyDoes:
      'Replenishes ATP energy reserves inside muscle cells so you can squeeze out 1–2 extra reps on machines and recover faster between sets.',
    hypeCheck:
      'Skip expensive "Buffered / HCl / Liquid" creatine. Plain micronized Creatine Monohydrate is the most studied, safest, and cheapest form.',
    costEfficiency: '~$0.25 per serving',
  },
  {
    id: 'whey-plant-protein',
    name: 'Whey Isolate or Pea/Rice Protein Powder',
    tier: 'tier1',
    verdictBadge: 'Tier 1 • Convenience Food',
    dosage: '25–30g (1 scoop) as needed',
    timing: 'Post-workout or snack',
    whatItActuallyDoes:
      'Simply powdered food protein with carbs and fats filtered out. Helps you hit your daily protein goal when you do not feel like cooking another chicken breast.',
    hypeCheck:
      'You do not have to chug a shake within 15 minutes of finishing your last set—your muscles absorb protein for 24+ hours after training.',
    costEfficiency: '~$1.10 per 25g protein',
  },
  {
    id: 'vitamin-d3-omega',
    name: 'Vitamin D3 + Omega-3 Fish Oil',
    tier: 'tier2',
    verdictBadge: 'Tier 2 • Foundational Health',
    dosage: '2,000 IU D3 + 1–2g EPA/DHA',
    timing: 'With breakfast or dinner',
    whatItActuallyDoes:
      'Supports joint comfort, bone density, and indoor desk-worker immune recovery as you adapt to new resistance training.',
    hypeCheck:
      'Helpful if you work indoors or eat fish less than twice a week.',
    costEfficiency: '~$0.30 per day',
  },
  {
    id: 'pre-workout-caffeine',
    name: 'Low-Stim Caffeine / Coffee',
    tier: 'tier2',
    verdictBadge: 'Tier 2 • Optional Alertness',
    dosage: '80–150 mg Caffeine',
    timing: '30 mins before gym (before 3 PM)',
    whatItActuallyDoes:
      'Reduces perceived effort so weights feel slightly lighter after a long workday.',
    hypeCheck:
      'Avoid extreme 350mg+ "hardcore" pre-workouts on Day 1—they cause jitters, racing heart rate, and disrupt deep recovery sleep.',
    costEfficiency: '1 cup black coffee / espresso',
  },
  {
    id: 'bcaas-fat-burners',
    name: 'BCAAs, "Fat Burners" & Test Boosters',
    tier: 'tier3',
    verdictBadge: 'Tier 3 • Save Your Money',
    dosage: '0g (Not Recommended)',
    timing: 'Skip completely',
    whatItActuallyDoes:
      'BCAAs only contain 3 of the 9 essential amino acids already abundant in normal food or whey protein. "Fat burners" are mostly overpriced caffeine.',
    hypeCheck:
      '100% marketing hype targeted at beginners. Spend that budget on comfortable gym shoes or whole groceries instead.',
    costEfficiency: '$0 Saved',
  },
];

export const SupplementsGuideView: React.FC = () => {
  const [tierFilter, setTierFilter] = useState<'all' | 'tier1' | 'tier2' | 'tier3'>(
    'all'
  );
  const [creatineStreak, setCreatineStreak] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    false,
    false,
    false,
  ]);

  const filtered = SUPPLEMENTS_LIST.filter(
    (s) => tierFilter === 'all' || s.tier === tierFilter
  );

  const toggleDay = (idx: number) => {
    setCreatineStreak((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-md flex flex-col gap-space-lg">
      <div className="w-full bg-surface-container-low rounded-xl p-space-lg shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-badge text-label-badge uppercase">
            Anti-Hype Evidence Guide
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            Supplements Guide: Science vs. Marketing Hype
          </h1>
          <p className="font-body-md text-body-sm text-on-surface-variant max-w-2xl mt-0.5">
            95% of your progress comes from consistent machine progression, sleep, and
            whole food. Here are the only 2 supplements backed by peer-reviewed clinical
            evidence—and what you can safely ignore.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-xxs bg-surface-container-lowest p-1 rounded-full">
          {(
            [
              { id: 'all', label: 'All Tiers' },
              { id: 'tier1', label: 'Tier 1: Worth It' },
              { id: 'tier2', label: 'Tier 2: Situational' },
              { id: 'tier3', label: 'Tier 3: Skip & Save' },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setTierFilter(f.id)}
              type="button"
              className={
                tierFilter === f.id
                  ? 'px-space-md py-space-xs rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-caption cursor-pointer transition-all'
                  : 'px-space-md py-space-xs rounded-full text-on-surface-variant hover:text-on-surface font-body-sm text-label-caption cursor-pointer transition-all'
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container rounded-2xl p-space-lg shadow-xl flex flex-col gap-space-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-space-sm">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-badge text-label-badge uppercase ${
                      item.tier === 'tier1'
                        ? 'bg-primary-container text-on-primary-container'
                        : item.tier === 'tier2'
                        ? 'bg-secondary/15 text-secondary'
                        : 'bg-error-container/40 text-error'
                    }`}
                  >
                    {item.verdictBadge}
                  </span>
                  <h2 className="font-headline-md text-headline-sm text-on-surface">
                    {item.name}
                  </h2>
                </div>
                <span className="font-label-numeric text-label-caption text-outline">
                  {item.costEfficiency}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex flex-col">
                  <span className="font-label-caption text-label-caption text-outline">
                    Evidence-Based Dosage
                  </span>
                  <span className="font-label-numeric text-body-md text-primary">
                    {item.dosage}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caption text-label-caption text-outline">
                    Ideal Timing
                  </span>
                  <span className="font-label-numeric text-body-md text-secondary">
                    {item.timing}
                  </span>
                </div>
              </div>

              <p className="font-body-md text-body-sm text-on-surface">
                <strong className="text-primary font-headline-sm">
                  Clinical Mechanism:
                </strong>{' '}
                {item.whatItActuallyDoes}
              </p>

              <div className="bg-surface-container-high/60 p-space-xs px-space-sm rounded-lg flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                  fact_check
                </span>
                <span className="font-body-sm text-label-caption text-on-surface-variant">
                  <strong className="text-on-surface">No-BS Hype Check:</strong>{' '}
                  {item.hypeCheck}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container rounded-2xl p-space-lg shadow-xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Daily 5g Creatine Tracker
              </span>
              <span className="font-label-numeric text-label-caption text-primary">
                {creatineStreak.filter(Boolean).length}/7 DAYS
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Creatine works by gradual muscle saturation over 3–4 weeks (no &quot;loading
              phase&quot; needed). Tap today&apos;s slot once you take your 5g scoop:
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayLabel, i) => {
                const done = creatineStreak[i];
                return (
                  <button
                    key={i}
                    onClick={() => toggleDay(i)}
                    type="button"
                    className={`h-12 rounded-xl flex flex-col items-center justify-center font-label-numeric text-label-caption transition-all cursor-pointer ${
                      done
                        ? 'bg-primary text-on-primary font-bold shadow-[0_0_12px_rgba(204,255,128,0.3)]'
                        : 'bg-surface-container-low text-outline hover:text-on-surface'
                    }`}
                  >
                    <span>{dayLabel}</span>
                    <span className="text-[10px]">{done ? '5g' : '—'}</span>
                  </button>
                );
              })}
            </div>
            <div className="bg-primary/10 p-space-sm rounded-xl text-body-sm text-on-surface-variant">
              <strong className="text-primary font-headline-sm">
                Why skip the 20g loading phase?
              </strong>{' '}
              Taking 20g a day often causes stomach discomfort. A steady 5g daily scoop
              reaches 100% muscle saturation smoothly with zero GI upset.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
