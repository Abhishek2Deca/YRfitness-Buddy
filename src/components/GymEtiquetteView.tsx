import React, { useState } from 'react';

const ETIQUETTE_CARDS = [
  {
    id: 'working-in',
    badge: 'Machine Sharing',
    title: 'How to Ask "How Many Sets Do You Have Left?"',
    situation:
      'Someone is sitting on the Machine Chest Press resting on their phone between sets.',
    exactScript:
      '"Hey! No rush at all—how many sets do you have left?" (If they say 2–3 sets: "Mind if I work in while you rest, or I can wait right here?")',
    whyItWorks:
      'On pin-loaded machines, switching the pin takes 2 seconds. 99% of gym-goers will happily tell you they have 1–2 sets left or offer to let you work in.',
  },
  {
    id: 'dumbbell-rack',
    badge: 'Spatial Awareness',
    title: 'The 2-Step Dumbbell Rack Buffer Zone',
    situation:
      'Picking up dumbbells from the main horizontal mirror rack.',
    exactScript:
      'Grab your dumbbells and take 2 full steps backward away from the rack before starting your curls or lateral raises.',
    whyItWorks:
      'Standing directly touching the rack blocks 4–5 pairs of dumbbells so other lifters cannot un-rack or re-rack their weights.',
  },
  {
    id: 'wiping-down',
    badge: 'Hygiene & Reset',
    title: 'Wiping Down Pads & Un-Racking Plates',
    situation:
      'You just finished your 3rd set on a machine or bench.',
    exactScript:
      'Grab a paper towel + spray bottle (or gym wipe) from the wall dispenser and give the seat and backrest pad a quick 3-second wipe.',
    whyItWorks:
      'Leaves the pad fresh for the next person. On plate-loaded machines, always return metal plates to the side horns when finished.',
  },
  {
    id: 'yellow-pins',
    badge: 'Hardware Decoder',
    title: 'Yellow vs. Red Machine Levers & Pop-Pins',
    situation:
      'You sit at an unfamiliar machine and see brightly colored handles.',
    exactScript:
      'Pull OUT on the round yellow knob to slide the seat up or down, then release it until you hear a solid metallic CLICK.',
    whyItWorks:
      'Almost all commercial gym manufacturers color-code adjustable seat and pad pins bright yellow or orange specifically so users can spot them immediately.',
  },
];

export const GymEtiquetteView: React.FC = () => {
  const [selectedStackWeight, setSelectedStackWeight] = useState<number>(20);
  const [adderEngaged, setAdderEngaged] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<boolean[]>([
    true,
    true,
    true,
    false,
    false,
  ]);

  const totalPinWeight = selectedStackWeight + (adderEngaged ? 5 : 0);

  const toggleCheck = (i: number) => {
    setChecklist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-md flex flex-col gap-space-lg">
      <div className="w-full bg-surface-container-low rounded-xl p-space-lg shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-label-badge text-label-badge uppercase">
            Zero-Anxiety Floor Manual
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            Gym Etiquette 101 &amp; Hardware Decoder
          </h1>
          <p className="font-body-md text-body-sm text-on-surface-variant max-w-2xl mt-0.5">
            Gym intimidation disappears the moment you know the unwritten floor rules and
            how weight stacks work. Practice with the interactive stack simulator below.
          </p>
        </div>

        <div className="bg-surface-container-high rounded-xl p-space-md flex items-center gap-space-sm shrink-0">
          <span className="material-symbols-outlined text-primary text-[24px]">
            verified_user
          </span>
          <div className="flex flex-col">
            <span className="font-label-badge text-label-badge text-outline uppercase">
              Floor Confidence Checklist
            </span>
            <span className="font-label-numeric text-headline-sm text-primary">
              {checklist.filter(Boolean).length} / {checklist.length} Mastered
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 grid grid-cols-1 gap-space-md">
          {ETIQUETTE_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-surface-container rounded-2xl p-space-lg shadow-xl flex flex-col gap-space-sm"
            >
              <div className="flex items-center gap-space-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-label-badge text-label-badge uppercase">
                  {card.badge}
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  {card.title}
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <strong className="text-on-surface">The Scenario:</strong>{' '}
                {card.situation}
              </p>
              <div className="bg-surface-container-low p-space-sm rounded-xl border border-primary/20">
                <span className="font-label-badge text-label-badge text-primary uppercase block mb-0.5">
                  Exact Move / Word-for-Word Script
                </span>
                <p className="font-body-md text-body-sm text-on-surface">
                  {card.exactScript}
                </p>
              </div>
              <p className="font-body-sm text-label-caption text-outline">
                <strong className="text-secondary">Why it works:</strong>{' '}
                {card.whyItWorks}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Interactive Weight Stack Simulator
              </span>
              <span className="font-label-numeric text-headline-sm text-primary tabular-nums">
                {totalPinWeight} lbs
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Ever wonder how to go from <span className="font-label-numeric">20 lbs</span>{' '}
              to <span className="font-label-numeric">25 lbs</span> when the metal plates
              jump by 10 lbs? Use the yellow <strong className="text-primary">+5 lb Adder Switch</strong> at the top of the stack:
            </p>

            <button
              onClick={() => setAdderEngaged((a) => !a)}
              type="button"
              className={`w-full p-space-sm rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                adderEngaged
                  ? 'bg-primary text-on-primary font-headline-sm shadow-[0_0_16px_rgba(204,255,128,0.35)]'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Top Yellow +5 lb Micro-Adder Weight</span>
              </span>
              <span className="font-label-numeric text-label-caption uppercase">
                {adderEngaged ? 'ENGAGED (+5 LBS)' : 'OFF (+0 LBS)'}
              </span>
            </button>

            <div className="flex flex-col gap-1.5 bg-surface-container-lowest p-space-md rounded-xl">
              {[10, 20, 30, 40, 50, 60].map((plateWeight) => {
                const isPinnedHere = selectedStackWeight === plateWeight;
                const isLifted = plateWeight <= selectedStackWeight;
                return (
                  <button
                    key={plateWeight}
                    onClick={() => setSelectedStackWeight(plateWeight)}
                    type="button"
                    className={`h-9 px-space-md rounded-lg flex items-center justify-between font-label-numeric text-body-sm transition-all cursor-pointer ${
                      isPinnedHere
                        ? 'bg-primary-container text-on-primary-container font-bold ring-2 ring-primary'
                        : isLifted
                        ? 'bg-surface-container-high text-primary'
                        : 'bg-surface-container-low text-outline hover:text-on-surface'
                    }`}
                  >
                    <span>Plate {plateWeight / 10}</span>
                    <span className="flex items-center gap-2">
                      <span>{plateWeight} lbs</span>
                      {isPinnedHere && (
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-primary text-[10px]">
                          YELLOW PIN INSERTED
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-container rounded-2xl p-space-lg shadow-xl flex flex-col gap-space-sm">
            <span className="font-headline-sm text-body-lg text-on-surface">
              Day-1 Gym Bag &amp; Floor Checklist
            </span>
            {[
              'Flat-soled athletic shoes + comfortable breathable tee',
              'Water bottle (refill stations are next to locker rooms)',
              'Know my 1st machine: Machine Chest Press (Seat Notch #4)',
              'Start with a 5-minute brisk walk on the treadmill to warm up',
              'Leave ego at the door—focus 100% on smooth 3-second reps',
            ].map((label, idx) => {
              const checked = checklist[idx];
              return (
                <button
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  type="button"
                  className="bg-surface-container-low hover:bg-surface-container-high p-space-xs px-space-sm rounded-lg flex items-center gap-space-xs text-left transition-colors cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      checked ? 'text-primary' : 'text-outline'
                    }`}
                  >
                    {checked ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span
                    className={`font-body-sm text-body-sm ${
                      checked ? 'text-on-surface' : 'text-on-surface-variant'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
