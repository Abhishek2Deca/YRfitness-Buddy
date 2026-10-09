import React, { useState, useMemo } from 'react';
import {
  LOGO_URL,
  AVATAR_URL,
  MUSCLE_GROUPS,
  MuscleId,
} from './data/anatomyData';
import { getExercisesForMuscle, ExerciseItem } from './data/exerciseDatabase';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { BeginnerRoutinesView } from './components/BeginnerRoutinesView';
import { NutritionPlansView } from './components/NutritionPlansView';
import { SupplementsGuideView } from './components/SupplementsGuideView';
import { GymEtiquetteView } from './components/GymEtiquetteView';
import { CoachModal } from './components/CoachModal';

type NavTab =
  | '3d-anatomy-explorer'
  | 'beginner-routines'
  | 'nutrition-and-diet-plans'
  | 'supplements-guide'
  | 'gym-etiquette-101';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('3d-anatomy-explorer');
  const [selectedMuscleId, setSelectedMuscleId] = useState<MuscleId>('chest');
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);

  const [routineExerciseIds, setRoutineExerciseIds] = useState<string[]>([
    'machine-chest-press',
    'wide-grip-lat-pulldown',
    'seated-leg-press',
  ]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    'machine-chest-press',
  ]);

  const [noviceMode, setNoviceMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [coachModalOpen, setCoachModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleToggleRoutineExercise = (exerciseId: string) => {
    setRoutineExerciseIds((prev) => {
      const exists = prev.includes(exerciseId);
      if (exists) {
        triggerToast('Removed movement from Today’s Routine');
        return prev.filter((id) => id !== exerciseId);
      } else {
        triggerToast('Added movement to Today’s Routine');
        return [...prev, exerciseId];
      }
    });
  };

  const handleToggleBookmark = (exerciseId: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(exerciseId);
      triggerToast(exists ? 'Removed from saved movements' : 'Saved to favorites');
      return exists ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId];
    });
  };

  const handleLoadProgram = (items: { id: string; muscleId: MuscleId }[]) => {
    setRoutineExerciseIds(items.map((i) => i.id));
    triggerToast(`Loaded ${items.length} movements into Today's Routine`);
  };

  const handleInspectIn3D = (muscleId: MuscleId, exerciseId: string) => {
    const group = MUSCLE_GROUPS[muscleId];
    if (group) {
      const idx = group.exercises.findIndex((e) => e.id === exerciseId);
      setSelectedMuscleId(muscleId);
      setSelectedExerciseIndex(idx >= 0 ? idx : 0);
      setActiveTab('3d-anatomy-explorer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: {
      muscleId: MuscleId;
      muscleName: string;
      exerciseIndex: number;
      exerciseName: string;
      subtitle: string;
    }[] = [];

    (Object.keys(MUSCLE_GROUPS) as MuscleId[]).forEach((mKey) => {
      const group = MUSCLE_GROUPS[mKey];
      const muscleExs = getExercisesForMuscle(mKey);
      muscleExs.forEach((ex, idx) => {
        if (
          ex.name.toLowerCase().includes(q) ||
          group.shortName.toLowerCase().includes(q) ||
          group.anatomicalName.toLowerCase().includes(q) ||
          ex.subtitle.toLowerCase().includes(q) ||
          ex.targetSubRegion.toLowerCase().includes(q)
        ) {
          results.push({
            muscleId: mKey,
            muscleName: group.shortName,
            exerciseIndex: idx,
            exerciseName: ex.name,
            subtitle: ex.subtitle,
          });
        }
      });
    });
    return results.slice(0, 8);
  }, [searchQuery]);

  const currentMuscle = MUSCLE_GROUPS[selectedMuscleId] || MUSCLE_GROUPS.chest;
  const currentMuscleAllExercises = useMemo(() => {
    return getExercisesForMuscle(selectedMuscleId);
  }, [selectedMuscleId]);

  const currentExercise =
    currentMuscleAllExercises[selectedExerciseIndex] || currentMuscleAllExercises[0];

  const navItems: { id: NavTab; label: string }[] = [
    { id: '3d-anatomy-explorer', label: '3D Anatomy Explorer' },
    { id: 'beginner-routines', label: 'Beginner Routines' },
    { id: 'nutrition-and-diet-plans', label: 'Nutrition & Diet Plans' },
    { id: 'supplements-guide', label: 'Supplements Guide' },
    { id: 'gym-etiquette-101', label: 'Gym Etiquette 101' },
  ];

  return (
    <div className="min-h-screen bg-background font-body-md text-body-md text-on-surface antialiased flex flex-col">
      {/* Top Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
        <div className="h-20 max-w-[1440px] mx-auto px-gutter flex items-center justify-between gap-space-md">
          {/* Left: Brand Lockup & Motion Engine Status */}
          <div className="flex items-center gap-space-lg">
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('3d-anatomy-explorer');
              }}
              className="flex items-center gap-space-sm group cursor-pointer"
              href="#explorer"
            >
              <img
                alt="FormLab 3D Logo"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain"
                src={LOGO_URL}
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface group-hover:text-primary transition-colors">
                  FORMLAB <span className="text-primary">3D</span>
                </span>
                <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
                  Visualizer
                </span>
              </div>
            </a>
            <div className="hidden xl:flex items-center gap-space-xxs bg-surface-container-low px-space-xs py-space-xxs rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-badge text-label-badge text-primary uppercase">
                Motion Engine Active
              </span>
            </div>
          </div>

          {/* Center: Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-space-xxs bg-surface-container-low p-space-xxs rounded-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={
                    isActive
                      ? 'px-space-md py-space-xs rounded-full transition-all bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_16px_-2px_rgba(163,230,53,0.35)] cursor-pointer'
                      : 'px-space-md py-space-xs rounded-full font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer'
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Search, Novice Mode, Notifications, User Profile */}
          <div className="flex items-center gap-space-sm relative">
            <div className="relative hidden sm:flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] pointer-events-none">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                className="w-48 lg:w-60 bg-surface-container-low pl-9 pr-3 py-space-xs rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all"
                placeholder="Search gym machine or muscle..."
                type="text"
              />
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-11 left-0 w-72 bg-surface-container-high rounded-xl shadow-2xl border border-outline-variant/40 overflow-hidden z-50">
                  {searchResults.length === 0 ? (
                    <div className="p-3 text-label-caption text-on-surface-variant">
                      No matching machines or muscles found.
                    </div>
                  ) : (
                    searchResults.map((res) => (
                      <button
                        key={`${res.muscleId}-${res.exerciseName}`}
                        onMouseDown={() => {
                          setSelectedMuscleId(res.muscleId);
                          setSelectedExerciseIndex(res.exerciseIndex);
                          setActiveTab('3d-anatomy-explorer');
                          setSearchQuery('');
                        }}
                        type="button"
                        className="w-full px-3 py-2 text-left hover:bg-surface-bright flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="font-headline-sm text-body-sm text-on-surface block">
                            {res.exerciseName}
                          </span>
                          <span className="font-body-sm text-[11px] text-outline">
                            {res.muscleName} • {res.subtitle}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-primary text-[16px]">
                          north_east
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setNoviceMode((n) => !n);
                triggerToast(
                  !noviceMode
                    ? 'Novice Mode Enabled: Guided machines & pin heights prioritized'
                    : 'Switched to Standard Mode'
                );
              }}
              type="button"
              className="flex items-center gap-space-xxs bg-surface-container-low px-space-xs py-space-xxs rounded-full cursor-pointer hover:bg-surface-container-high transition-colors"
              title="Novice Mode Active"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  noviceMode ? 'bg-secondary' : 'bg-outline'
                }`}
              ></span>
              <span
                className={`font-label-badge text-label-badge uppercase ${
                  noviceMode ? 'text-secondary' : 'text-on-surface-variant'
                }`}
              >
                Novice Mode
              </span>
            </button>

            <button
              onClick={() => setShowNotifications((s) => !s)}
              aria-label="Notifications"
              className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors relative cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary"></span>
            </button>

            {showNotifications && (
              <div className="absolute top-12 right-0 w-80 bg-surface-container-high rounded-xl shadow-2xl border border-outline-variant/40 p-space-md z-50 flex flex-col gap-space-xs">
                <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30">
                  <span className="font-headline-sm text-body-sm text-on-surface">
                    Day 4 Training Updates
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    type="button"
                    className="text-outline hover:text-on-surface text-label-caption cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="bg-surface-container p-space-xs rounded-lg flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                    smart_display
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-label-caption text-primary">
                      YouTube Video Form Engine Active
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      Watch real video executions of every movement directly in the player.
                    </span>
                  </div>
                </div>
                <div className="bg-surface-container p-space-xs rounded-lg flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">
                    bolt
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-label-caption text-secondary">
                      Recovery Status: 94% Fresh
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      Chest and Anterior Deltoids are fully recovered from Day 2.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveTab('beginner-routines')}
              type="button"
              title="View Today's Routine & Progress"
              className="flex items-center gap-space-xs pl-space-xs py-space-xxs pr-space-sm bg-surface-container-low hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
            >
              <img
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover"
                src={AVATAR_URL}
              />
              <div className="flex flex-col text-left">
                <span className="font-headline-sm text-label-caption text-on-surface leading-tight">
                  Marcus
                </span>
                <span className="font-label-numeric text-label-badge text-primary-fixed">
                  Day 4
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-space-xxs overflow-x-auto px-gutter pb-space-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={
                  isActive
                    ? 'px-space-sm py-1 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-caption whitespace-nowrap shrink-0'
                    : 'px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant font-body-sm text-label-caption whitespace-nowrap shrink-0'
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-24 lg:pt-20 bg-background flex-1">
        <div className="flex flex-col w-full">
          {activeTab === '3d-anatomy-explorer' && (
            <AnatomyExplorer
              selectedMuscleId={selectedMuscleId}
              onSelectMuscle={setSelectedMuscleId}
              selectedExerciseIndex={selectedExerciseIndex}
              onSelectExerciseIndex={setSelectedExerciseIndex}
              routineExerciseIds={routineExerciseIds}
              onToggleRoutineExercise={handleToggleRoutineExercise}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onOpenCoachModal={() => setCoachModalOpen(true)}
              noviceMode={noviceMode}
            />
          )}

          {activeTab === 'beginner-routines' && (
            <BeginnerRoutinesView
              routineExerciseIds={routineExerciseIds}
              onToggleRoutineExercise={handleToggleRoutineExercise}
              onLoadProgram={handleLoadProgram}
              onInspectIn3D={handleInspectIn3D}
            />
          )}

          {activeTab === 'nutrition-and-diet-plans' && <NutritionPlansView />}

          {activeTab === 'supplements-guide' && <SupplementsGuideView />}

          {activeTab === 'gym-etiquette-101' && <GymEtiquetteView />}
        </div>
      </main>

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-surface-container-high border border-primary/40 text-on-surface px-space-md py-space-xs rounded-full shadow-2xl flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[18px]">
            check_circle
          </span>
          <span className="font-body-sm text-label-caption">{toastMessage}</span>
        </div>
      )}

      {/* Ask Coach Interactive Modal */}
      <CoachModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        muscle={currentMuscle}
        exercise={currentExercise}
      />

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest mt-space-3xl">
        <div className="max-w-[1440px] mx-auto px-gutter py-space-2xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <img
              alt="FormLab 3D Logo"
              referrerPolicy="no-referrer"
              className="h-6 w-auto opacity-70"
              src={LOGO_URL}
            />
            <span className="font-headline-sm text-headline-sm text-on-surface-variant">
              YRfitness<span className="text-primary">-Buddy</span>
            </span>
            <span className="font-label-caption text-label-caption text-outline">
              | Safe Training Visualizer
            </span>
          </div>
          <div className="flex items-center gap-space-lg text-on-surface-variant">
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('beginner-routines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-body-sm text-body-sm hover:text-primary transition-colors cursor-pointer"
              href="#beginner-routines"
            >
              Routines
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('gym-etiquette-101');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-body-sm text-body-sm hover:text-primary transition-colors cursor-pointer"
              href="#gym-etiquette-101"
            >
              Etiquette
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('3d-anatomy-explorer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-body-sm text-body-sm hover:text-primary transition-colors cursor-pointer"
              href="#3d-anatomy-explorer"
            >
              Interactive 3D
            </a>
          </div>
          <div className="font-label-caption text-label-caption text-outline">
            © 2025 YRfitness-Buddy. Engineered to dissolve gym intimidation.
          </div>
        </div>
      </footer>
    </div>
  );
}
