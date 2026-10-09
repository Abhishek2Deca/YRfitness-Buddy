import React, { useState } from 'react';

interface MealOption {
  title: string;
  protein: string;
  calories: string;
  prepTime: string;
  ingredients: string;
}

const MEAL_BLUEPRINTS: {
  slot: string;
  timing: string;
  options: [MealOption, MealOption];
}[] = [
  {
    slot: 'Pre-Workout Fuel',
    timing: '60–90 mins before gym',
    options: [
      {
        title: 'Greek Yogurt + Banana & Oats Bowl',
        protein: '28g Protein',
        calories: '410 kcal',
        prepTime: '3 min',
        ingredients: '1 cup 0% Greek yogurt, 1 medium banana, 1/3 cup rolled oats, cinnamon.',
      },
      {
        title: '2 Eggs + Sourdough Toast & Berries',
        protein: '24g Protein',
        calories: '390 kcal',
        prepTime: '6 min',
        ingredients: '2 whole eggs scrambled, 2 slices sourdough toast, 1/2 cup blueberries.',
      },
    ],
  },
  {
    slot: 'Post-Workout Recovery',
    timing: 'Within 2 hours after training',
    options: [
      {
        title: 'Grilled Chicken Rice & Avocado Bowl',
        protein: '45g Protein',
        calories: '580 kcal',
        prepTime: '10 min',
        ingredients: '6 oz chicken breast, 1 cup jasmine rice, 1/4 avocado, steamed broccoli.',
      },
      {
        title: 'Whey Isolate Shake + Turkey Wrap',
        protein: '48g Protein',
        calories: '540 kcal',
        prepTime: '4 min',
        ingredients: '1 scoop whey isolate in water/milk + whole-wheat wrap with 4 oz lean turkey.',
      },
    ],
  },
  {
    slot: 'High-Satiety Dinner',
    timing: 'Evening muscle repair window',
    options: [
      {
        title: 'Baked Salmon, Roasted Potatoes & Asparagus',
        protein: '42g Protein',
        calories: '620 kcal',
        prepTime: '15 min',
        ingredients: '6 oz Atlantic salmon, 200g baby gold potatoes, olive oil spray, asparagus.',
      },
      {
        title: 'Lean Beef or Tofu Stir-Fry with Sobas',
        protein: '40g Protein',
        calories: '590 kcal',
        prepTime: '12 min',
        ingredients: '6 oz 93% lean ground beef or firm tofu, bell peppers, snap peas, buckwheat noodles.',
      },
    ],
  },
];

export const NutritionPlansView: React.FC = () => {
  const [bodyweightLbs, setBodyweightLbs] = useState<number>(165);
  const [goal, setGoal] = useState<'recomp' | 'muscle' | 'fatloss'>('recomp');
  const [selectedSwap, setSelectedSwap] = useState<Record<number, 0 | 1>>({
    0: 0,
    1: 0,
    2: 0,
  });
  const [waterCups, setWaterCups] = useState<number>(5);

  const proteinGrams = Math.round(
    bodyweightLbs * (goal === 'muscle' ? 0.9 : goal === 'recomp' ? 0.85 : 0.95)
  );
  const dailyCalories = Math.round(
    bodyweightLbs * (goal === 'muscle' ? 16 : goal === 'recomp' ? 14 : 12)
  );
  const carbsGrams = Math.round((dailyCalories * 0.42) / 4);
  const fatsGrams = Math.round((dailyCalories * 0.26) / 9);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-md flex flex-col gap-space-lg">
      <div className="w-full bg-surface-container-low rounded-xl p-space-lg shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-label-badge text-label-badge uppercase">
            Zero-Jargon Nutrition Engine
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            Beginner Nutrition &amp; Muscle Recovery Fueling
          </h1>
          <p className="font-body-md text-body-sm text-on-surface-variant max-w-2xl mt-0.5">
            You do not need obsessive food scales on Day 1. Hit your daily protein
            baseline and hydrate consistently so your muscles recover stronger between
            sessions.
          </p>
        </div>

        <div className="bg-surface-container-high rounded-xl p-space-md flex items-center gap-space-md shrink-0">
          <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">water_drop</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-badge text-label-badge text-outline uppercase">
              Daily Hydration
            </span>
            <span className="font-label-numeric text-headline-sm text-secondary tabular-nums">
              {waterCups} / 8 Cups (64 oz)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWaterCups((c) => Math.max(0, c - 1))}
              type="button"
              className="w-8 h-8 rounded-lg bg-surface-container text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
            >
              -
            </button>
            <button
              onClick={() => setWaterCups((c) => Math.min(12, c + 1))}
              type="button"
              className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-bold flex items-center justify-center cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-5 bg-surface-container rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Day-1 Macro Calibration
            </span>
            <span className="font-label-numeric text-label-caption text-primary">
              EVIDENCE-BASED
            </span>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="font-label-caption text-label-caption text-outline">
              1. Select Primary Training Goal
            </span>
            <div className="grid grid-cols-3 gap-space-xxs bg-surface-container-lowest p-1 rounded-xl">
              {(
                [
                  { id: 'recomp', label: 'Tone & Recomp' },
                  { id: 'muscle', label: 'Build Muscle' },
                  { id: 'fatloss', label: 'Lean Out' },
                ] as const
              ).map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  type="button"
                  className={
                    goal === g.id
                      ? 'py-2 px-2 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-label-caption cursor-pointer transition-all'
                      : 'py-2 px-2 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-label-caption cursor-pointer transition-all'
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bw-slider"
                className="font-label-caption text-label-caption text-outline"
              >
                2. Current Bodyweight
              </label>
              <span className="font-label-numeric text-headline-sm text-primary tabular-nums">
                {bodyweightLbs} lbs ({Math.round(bodyweightLbs / 2.205)} kg)
              </span>
            </div>
            <input
              id="bw-slider"
              type="range"
              min={100}
              max={280}
              step={5}
              value={bodyweightLbs}
              onChange={(e) => setBodyweightLbs(Number(e.target.value))}
              className="w-full accent-[#ccff80] cursor-pointer mt-1"
            />
            <div className="flex justify-between font-label-numeric text-[11px] text-outline">
              <span>100 lbs</span>
              <span>190 lbs</span>
              <span>280 lbs</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col">
              <span className="font-label-badge text-label-badge text-outline uppercase">
                Daily Protein Target
              </span>
              <span className="font-label-numeric text-headline-lg text-primary mt-1 tabular-nums">
                {proteinGrams}g
              </span>
              <span className="font-body-sm text-label-caption text-on-surface-variant mt-0.5">
                ~{Math.round(proteinGrams / 3)}g per meal (3 meals)
              </span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col">
              <span className="font-label-badge text-label-badge text-outline uppercase">
                Daily Energy Target
              </span>
              <span className="font-label-numeric text-headline-lg text-secondary mt-1 tabular-nums">
                {dailyCalories}
              </span>
              <span className="font-body-sm text-label-caption text-on-surface-variant mt-0.5">
                kcal / day ({carbsGrams}g C • {fatsGrams}g F)
              </span>
            </div>
          </div>

          <div className="bg-primary/10 p-space-sm rounded-xl flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
              verified
            </span>
            <p className="font-body-sm text-body-sm text-on-surface">
              <strong className="text-primary font-headline-sm">
                The Palm Visual Rule:
              </strong>{' '}
              1 palm-sized serving of chicken, fish, tofu, or Greek yogurt equals roughly{' '}
              <span className="font-label-numeric text-primary">25–30g protein</span>. Aim
              for 1 palm at each meal plus 1 high-protein snack.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline">
              Training Day Meal Windows (Click to Swap Options)
            </span>
            <span className="font-label-caption text-label-caption text-secondary">
               Under 15-Min Prep
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {MEAL_BLUEPRINTS.map((slotItem, idx) => {
              const activeOptIdx = selectedSwap[idx] || 0;
              const activeMeal = slotItem.options[activeOptIdx];
              return (
                <div
                  key={slotItem.slot}
                  className="bg-surface-container rounded-2xl p-space-md shadow-xl flex flex-col gap-space-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-badge text-label-badge uppercase">
                        {slotItem.slot}
                      </span>
                      <span className="font-body-sm text-label-caption text-outline">
                        {slotItem.timing}
                      </span>
                    </div>

                    <div className="inline-flex bg-surface-container-lowest p-1 rounded-full">
                      {[0, 1].map((optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() =>
                            setSelectedSwap((prev) => ({
                              ...prev,
                              [idx]: optIndex as 0 | 1,
                            }))
                          }
                          type="button"
                          className={
                            activeOptIdx === optIndex
                              ? 'px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-[11px] cursor-pointer'
                              : 'px-2.5 py-0.5 rounded-full text-on-surface-variant hover:text-on-surface font-body-sm text-[11px] cursor-pointer'
                          }
                        >
                          Option {optIndex + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                    <div className="flex flex-col gap-1">
                      <span className="font-headline-sm text-body-lg text-on-surface">
                        {activeMeal.title}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {activeMeal.ingredients}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-1">
                      <span className="font-label-numeric text-body-md text-primary">
                        {activeMeal.protein}
                      </span>
                      <span className="font-label-numeric text-label-caption text-secondary">
                        {activeMeal.calories} • {activeMeal.prepTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
