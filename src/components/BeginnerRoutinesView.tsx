import React, { useState, useEffect } from 'react';
import {
  BEGINNER_ROUTINES,
  MUSCLE_GROUPS,
  MuscleId,
} from '../data/anatomyData';
import { getExercisesForMuscle } from '../data/exerciseDatabase';

interface RoutineLogItem {
  exerciseId: string;
  muscleId: MuscleId;
  name: string;
  pinGuide: string;
  weightLbs: number;
  reps: number;
  completedSets: boolean[];
}

interface BeginnerRoutinesViewProps {
  routineExerciseIds: string[];
  onToggleRoutineExercise: (exerciseId: string, muscleId: MuscleId) => void;
  onLoadProgram: (exerciseIds: { id: string; muscleId: MuscleId }[]) => void;
  onInspectIn3D: (muscleId: MuscleId, exerciseId: string) => void;
}

export const BeginnerRoutinesView: React.FC<BeginnerRoutinesViewProps> = ({
  routineExerciseIds,
  onToggleRoutineExercise,
  onLoadProgram,
  onInspectIn3D,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    BEGINNER_ROUTINES[0].id
  );
  const [restTimerSec, setRestTimerSec] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<Record<string, RoutineLogItem>>({
    'machine-chest-press': {
      exerciseId: 'machine-chest-press',
      muscleId: 'chest',
      name: 'Machine Chest Press',
      pinGuide: 'Seat Notch #4 (Mid-Chest)',
      weightLbs: 25,
      reps: 10,
      completedSets: [true, false, false],
    },
    'wide-grip-lat-pulldown': {
      exerciseId: 'wide-grip-lat-pulldown',
      muscleId: 'lats',
      name: 'Wide-Grip Lat Pulldown',
      pinGuide: 'Thigh Roller Notch #3',
      weightLbs: 35,
      reps: 10,
      completedSets: [false, false, false],
    },
    'seated-leg-press': {
      exerciseId: 'seated-leg-press',
      muscleId: 'quads',
      name: 'Seated Leg Press',
      pinGuide: 'Sled Rail Notch #4 (90° Knees)',
      weightLbs: 60,
      reps: 10,
      completedSets: [false, false, false],
    },
  });

  useEffect(() => {
    setLogs((prev) => {
      const next = { ...prev };
      routineExerciseIds.forEach((exId) => {
        if (!next[exId]) {
          for (const mKey of Object.keys(MUSCLE_GROUPS) as MuscleId[]) {
            const allExercises = getExercisesForMuscle(mKey);
            const found = allExercises.find((e) => e.id === exId);
            if (found) {
              const parsedWeight = parseInt(found.startingWeight, 10) || 20;
              next[exId] = {
                exerciseId: exId,
                muscleId: mKey,
                name: found.name,
                pinGuide: `${found.equipment.toUpperCase()} • ${found.targetSubRegion || 'Notch #4'}`,
                weightLbs: parsedWeight,
                reps: 10,
                completedSets: [false, false, false],
              };
            }
          }
        }
      });
      return next;
    });
  }, [routineExerciseIds]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setRestTimerSec((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleToggleSet = (exId: string, setIdx: number) => {
    setLogs((prev) => {
      const item = prev[exId];
      if (!item) return prev;
      const updatedSets = [...item.completedSets];
      const becomingDone = !updatedSets[setIdx];
      updatedSets[setIdx] = becomingDone;
      if (becomingDone) {
        setRestTimerSec(60);
        setTimerRunning(true);
      }
      return {
        ...prev,
        [exId]: { ...item, completedSets: updatedSets },
      };
    });
  };

  const handleAdjustWeight = (exId: string, delta: number) => {
    setLogs((prev) => {
      const item = prev[exId];
      if (!item) return prev;
      return {
        ...prev,
        [exId]: {
          ...item,
          weightLbs: Math.max(5, item.weightLbs + delta),
        },
      };
    });
  };

  const handleAdjustReps = (exId: string, delta: number) => {
    setLogs((prev) => {
      const item = prev[exId];
      if (!item) return prev;
      return {
        ...prev,
        [exId]: {
          ...item,
          reps: Math.max(1, item.reps + delta),
        },
      };
    });
  };

  const activeRoutineItems = routineExerciseIds
    .map((id) => logs[id])
    .filter(Boolean);

  const totalSets = activeRoutineItems.length * 3;
  const completedSetsCount = activeRoutineItems.reduce(
    (acc, item) => acc + item.completedSets.filter(Boolean).length,
    0
  );

  const selectedProgram =
    BEGINNER_ROUTINES.find((p) => p.id === selectedProgramId) ||
    BEGINNER_ROUTINES[0];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-md flex flex-col gap-space-lg">
      <div className="w-full bg-surface-container-low rounded-xl p-space-lg shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xxs">
          <div className="flex items-center gap-space-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-label-badge text-label-badge uppercase">
              Zero-Intimidation Curated Tracks
            </span>
            <span className="font-label-numeric text-label-caption text-secondary">
              DAY 4 PROGRESS
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            Beginner Routines &amp; Live Floor Logger
          </h1>
          <p className="font-body-md text-body-sm text-on-surface-variant max-w-2xl">
            Every routine is sequenced to minimize walking back-and-forth across the gym
            floor. Tap any movement to inspect its YouTube form video, 3D muscle target,
            and pin heights.
          </p>
        </div>

        <div className="w-full lg:w-auto bg-surface-container-high rounded-xl p-space-md flex items-center justify-between lg:justify-start gap-space-md shadow-lg">
          <div className="flex items-center gap-space-sm">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center ${
                timerRunning
                  ? 'bg-primary text-on-primary animate-pulse'
                  : 'bg-secondary/15 text-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">timer</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-badge text-label-badge text-outline uppercase">
                Rest Interval Timer
              </span>
              <span className="font-label-numeric text-headline-md text-on-surface tabular-nums">
                00:{restTimerSec < 10 ? `0${restTimerSec}` : restTimerSec}{' '}
                <span className="text-label-caption text-secondary font-normal">
                  / 60s target
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xxs">
            <button
              onClick={() => setTimerRunning((r) => !r)}
              type="button"
              className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-label-caption hover:bg-primary transition-colors cursor-pointer"
            >
              {timerRunning ? 'Pause' : 'Start 60s'}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setRestTimerSec(60);
              }}
              type="button"
              className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
              title="Reset Timer"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline">
              Select a Guided Program Blueprint
            </span>
            <span className="font-label-caption text-label-caption text-primary">
              3 Novice-Certified Plans
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
            {BEGINNER_ROUTINES.map((prog) => {
              const active = prog.id === selectedProgramId;
              return (
                <button
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  type="button"
                  className={
                    active
                      ? 'bg-surface-container-high rounded-xl p-space-md text-left shadow-[0_0_16px_-4px_rgba(163,230,53,0.35)] flex flex-col justify-between gap-space-xs cursor-pointer transition-all'
                      : 'bg-surface-container-low hover:bg-surface-container rounded-xl p-space-md text-left flex flex-col justify-between gap-space-xs cursor-pointer transition-all'
                  }
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-label-badge text-[10px] px-2 py-0.5 rounded-full uppercase ${
                        active
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {prog.duration}
                    </span>
                    <span className="font-label-numeric text-label-caption text-secondary">
                      {prog.exercises.length} Moves
                    </span>
                  </div>
                  <div>
                    <span className="font-headline-sm text-body-md text-on-surface block leading-snug">
                      {prog.title}
                    </span>
                    <span className="font-body-sm text-label-caption text-outline mt-1 block">
                      {prog.equipmentFocus}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-surface-container rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/30">
              <div>
                <span className="font-label-badge text-label-badge text-primary uppercase">
                  {selectedProgram.difficulty} • {selectedProgram.duration}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">
                  {selectedProgram.title}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {selectedProgram.description}
                </p>
              </div>
              <button
                onClick={() =>
                  onLoadProgram(
                    selectedProgram.exercises.map((e) => ({
                      id: e.exerciseId,
                      muscleId: e.muscleId,
                    }))
                  )
                }
                type="button"
                className="px-space-md py-space-sm rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm hover:bg-primary transition-all shrink-0 flex items-center gap-space-xs cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">
                  playlist_add_check
                </span>
                <span>Load Full Circuit</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-xs">
              {selectedProgram.exercises.map((ex, index) => {
                const inRoutine = routineExerciseIds.includes(ex.exerciseId);
                return (
                  <div
                    key={ex.exerciseId}
                    className="bg-surface-container-low hover:bg-surface-container-high/70 rounded-xl p-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm transition-colors"
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="w-7 h-7 rounded-full bg-primary/15 text-primary font-label-numeric text-label-caption flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-body-md text-on-surface">
                          {ex.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 font-label-numeric text-label-caption text-on-surface-variant">
                          <span className="text-primary">
                            {ex.sets} × {ex.reps}
                          </span>
                          <span>•</span>
                          <span>Start: {ex.startingWeight}</span>
                          <span>•</span>
                          <span className="text-secondary">{ex.pinGuide}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-xs self-end sm:self-center">
                      <button
                        onClick={() => onInspectIn3D(ex.muscleId, ex.exerciseId)}
                        type="button"
                        className="px-space-sm py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary font-body-sm text-label-caption flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          smart_display
                        </span>
                        <span>Video &amp; 3D</span>
                      </button>
                      <button
                        onClick={() =>
                          onToggleRoutineExercise(ex.exerciseId, ex.muscleId)
                        }
                        type="button"
                        className={`px-space-sm py-1.5 rounded-lg font-headline-sm text-label-caption flex items-center gap-1 transition-colors cursor-pointer ${
                          inRoutine
                            ? 'bg-primary/20 text-primary'
                            : 'bg-surface-container-highest text-on-surface hover:bg-primary-container hover:text-on-primary-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {inRoutine ? 'check' : 'add'}
                        </span>
                        <span>{inRoutine ? 'In Routine' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline">
              Today&apos;s Active Session Logger
            </span>
            <span className="font-label-numeric text-label-caption text-primary">
              {completedSetsCount} / {totalSets} Sets Logged
            </span>
          </div>

          <div className="bg-surface-container rounded-2xl p-space-md shadow-2xl flex flex-col gap-space-md">
            <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-sm text-on-surface">
                  Session Completion
                </span>
                <span className="font-label-numeric text-label-caption text-primary">
                  {totalSets > 0
                    ? Math.round((completedSetsCount / totalSets) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${
                      totalSets > 0 ? (completedSetsCount / totalSets) * 100 : 0
                    }%`,
                  }}
                  className="h-full bg-primary transition-all duration-300"
                ></div>
              </div>
            </div>

            {activeRoutineItems.length === 0 ? (
              <div className="py-space-xl text-center flex flex-col items-center gap-space-xs">
                <span className="material-symbols-outlined text-outline text-[32px]">
                  fitness_center
                </span>
                <p className="font-body-md text-body-sm text-on-surface-variant">
                  No movements in Today&apos;s Routine yet. Click &quot;Load Full
                  Circuit&quot; or add movements from the 3D Stage.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-space-sm">
                {activeRoutineItems.map((item) => (
                  <div
                    key={item.exerciseId}
                    className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <button
                          onClick={() =>
                            onInspectIn3D(item.muscleId, item.exerciseId)
                          }
                          type="button"
                          className="font-headline-sm text-body-md text-on-surface hover:text-primary transition-colors text-left cursor-pointer"
                        >
                          {item.name}
                        </button>
                        <span className="block font-label-numeric text-[11px] text-secondary">
                          {item.pinGuide}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          onToggleRoutineExercise(item.exerciseId, item.muscleId)
                        }
                        type="button"
                        className="text-outline hover:text-error transition-colors cursor-pointer"
                        title="Remove from Today's Routine"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          close
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-space-xs pt-1">
                      <div className="bg-surface-container rounded-lg p-1.5 flex items-center justify-between">
                        <button
                          onClick={() => handleAdjustWeight(item.exerciseId, -5)}
                          type="button"
                          className="w-7 h-7 rounded bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <div className="flex flex-col text-center">
                          <span className="font-label-numeric text-body-sm text-primary tabular-nums">
                            {item.weightLbs} lbs
                          </span>
                          <span className="text-[10px] text-outline">Pin Load</span>
                        </div>
                        <button
                          onClick={() => handleAdjustWeight(item.exerciseId, 5)}
                          type="button"
                          className="w-7 h-7 rounded bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="bg-surface-container rounded-lg p-1.5 flex items-center justify-between">
                        <button
                          onClick={() => handleAdjustReps(item.exerciseId, -1)}
                          type="button"
                          className="w-7 h-7 rounded bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <div className="flex flex-col text-center">
                          <span className="font-label-numeric text-body-sm text-on-surface tabular-nums">
                            {item.reps} reps
                          </span>
                          <span className="text-[10px] text-outline">Target</span>
                        </div>
                        <button
                          onClick={() => handleAdjustReps(item.exerciseId, 1)}
                          type="button"
                          className="w-7 h-7 rounded bg-surface-container-high text-on-surface hover:text-primary flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-space-xxs pt-1">
                      {item.completedSets.map((done, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleToggleSet(item.exerciseId, sIdx)}
                          type="button"
                          className={`py-1.5 rounded-lg font-label-numeric text-label-caption flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            done
                              ? 'bg-primary text-on-primary font-bold shadow-sm'
                              : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {done ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>Set {sIdx + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
