import React, { useState } from 'react';
import { ExerciseVariation, MuscleGroupData } from '../data/anatomyData';
import { ExerciseItem } from '../data/exerciseDatabase';

interface CoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  muscle: MuscleGroupData;
  exercise: ExerciseItem | ExerciseVariation;
}

const DEFAULT_COACH_QUESTIONS = [
  {
    question: 'What if this machine is occupied when I walk over?',
    answer:
      'Zero stress! You can either tap Variation #2 right next to this exercise tab in FormLab 3D, or politely ask "Hey, how many sets do you have left?" Most sets take less than 2 minutes.',
  },
  {
    question: 'How do I know if my starting pin weight is too light or too heavy?',
    answer:
      'Use the "Reps in Reserve" check: if you reach rep 10 and feel like you could easily do 10 more, bump the pin down 1 plate (+10 lbs). If your form breaks down on rep 6, move the pin up 1 plate (-10 lbs).',
  },
  {
    question: 'Is muscle soreness the next day normal on Week 1?',
    answer:
      'Yes! Mild stiffness 24–48 hours later (called DOMS) simply means your muscle fibers experienced a new movement pattern. Sharp joint pain during a rep is never the goal—adjust the yellow seat pin if a joint feels pinched.',
  },
];

export const CoachModal: React.FC<CoachModalProps> = ({
  isOpen,
  onClose,
  muscle,
  exercise,
}) => {
  const [customQuery, setCustomQuery] = useState('');
  const [conversation, setConversation] = useState<
    { q: string; a: string }[]
  >([]);

  if (!isOpen) return null;

  const combinedFaqs = [
    ...exercise.coachTips,
    ...DEFAULT_COACH_QUESTIONS,
  ].slice(0, 4);

  const handleAsk = (qText: string, predefinedAnswer?: string) => {
    if (!qText.trim()) return;
    const angleTitle = exercise.safetyAngleTitle || ('angles' in exercise ? exercise.angles['Side 45°'].title : 'Key Safety Angle');
    const angleDesc = exercise.safetyAngleDesc || ('angles' in exercise ? exercise.angles['Side 45°'].description : 'Follow proper form');
    const answer =
      predefinedAnswer ||
      `For ${exercise.name} (${muscle.anatomicalName}): Check out the embedded YouTube tutorial video! Focus on ${angleTitle} (${angleDesc}). Start at ${exercise.startingWeight} for ${exercise.targetVolume} with a controlled 3-second lowering phase.`;
    setConversation((prev) => [...prev, { q: qText, a: answer }]);
    setCustomQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-surface-container rounded-2xl shadow-2xl border border-secondary/30 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-surface-container-high p-space-md flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-9 h-9 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">neurology</span>
            </div>
            <div>
              <span className="font-headline-sm text-body-md text-on-surface block">
                FormLab Biomechanical Coach
              </span>
              <span className="font-label-numeric text-[11px] text-primary">
                ACTIVE FOCUS: {exercise.name.toUpperCase()}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-space-md overflow-y-auto flex flex-col gap-space-md">
          <div className="bg-surface-container-low p-space-sm rounded-xl flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
              verified
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-on-surface">{exercise.name} Form Check:</strong>{' '}
              {exercise.safetyAngleTitle} — {exercise.safetyAngleDesc}
            </p>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="font-label-badge text-label-badge text-outline uppercase">
              Tap a Common Day-1 Question
            </span>
            {combinedFaqs.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(item.question, item.answer)}
                type="button"
                className="bg-surface-container-low hover:bg-surface-container-high p-space-sm rounded-xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer group"
              >
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                  {item.question}
                </span>
                <span className="material-symbols-outlined text-secondary text-[16px] shrink-0">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>

          {conversation.length > 0 && (
            <div className="flex flex-col gap-space-xs pt-2 border-t border-outline-variant/30">
              {conversation.map((turn, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-high/80 p-space-sm rounded-xl flex flex-col gap-1"
                >
                  <span className="font-headline-sm text-label-caption text-secondary">
                    Q: {turn.q}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    {turn.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(customQuery);
          }}
          className="p-space-sm bg-surface-container-low flex items-center gap-space-xs"
        >
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder={`Ask about ${exercise.name} form or video tutorial...`}
            className="flex-1 bg-surface-container px-space-md py-space-xs rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-space-md py-space-xs rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm hover:bg-primary transition-colors cursor-pointer"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};
