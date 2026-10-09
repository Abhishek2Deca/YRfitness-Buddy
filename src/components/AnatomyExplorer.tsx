import React, { useState, useEffect, useMemo } from 'react';
import {
  MUSCLE_GROUPS,
  MuscleId,
  BodyRegion,
  ViewSide,
} from '../data/anatomyData';
import {
  getExercisesForMuscle,
  ExerciseItem,
  EquipmentCategory,
} from '../data/exerciseDatabase';

interface AnatomyExplorerProps {
  selectedMuscleId: MuscleId;
  onSelectMuscle: (muscleId: MuscleId) => void;
  selectedExerciseIndex: number;
  onSelectExerciseIndex: (index: number) => void;
  routineExerciseIds: string[];
  onToggleRoutineExercise: (exerciseId: string, muscleId: MuscleId) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (exerciseId: string) => void;
  onOpenCoachModal: (question?: string) => void;
  noviceMode: boolean;
}

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({
  selectedMuscleId,
  onSelectMuscle,
  selectedExerciseIndex,
  onSelectExerciseIndex,
  routineExerciseIds,
  onToggleRoutineExercise,
  bookmarkedIds,
  onToggleBookmark,
  onOpenCoachModal,
  noviceMode,
}) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [viewSide, setViewSide] = useState<ViewSide>('front');
  const [bodyRegion, setBodyRegion] = useState<BodyRegion>('upper');
  const [muscleLayer, setMuscleLayer] = useState<'surface' | 'skeletal'>('surface');
  const [zoom, setZoom] = useState<number>(1);
  const [yRotation, setYRotation] = useState<number>(0);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(false);

  // Exercise filtering & custom workout plan states
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentCategory>('all');
  const [exerciseSearch, setExerciseSearch] = useState<string>('');
  const [showPlanDrawer, setShowPlanDrawer] = useState<boolean>(false);

  const currentMuscle = MUSCLE_GROUPS[selectedMuscleId] || MUSCLE_GROUPS.chest;
  
  // 50+ exercises for this specific muscle
  const allMuscleExercises = useMemo(() => {
    return getExercisesForMuscle(selectedMuscleId);
  }, [selectedMuscleId]);

  // Filtered exercises based on equipment and search
  const filteredExercises = useMemo(() => {
    return allMuscleExercises.filter((ex) => {
      const matchesEquipment =
        equipmentFilter === 'all' || ex.equipment === equipmentFilter;
      const matchesSearch =
        exerciseSearch.trim() === '' ||
        ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
        ex.subtitle.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
        ex.targetSubRegion.toLowerCase().includes(exerciseSearch.toLowerCase());
      return matchesEquipment && matchesSearch;
    });
  }, [allMuscleExercises, equipmentFilter, exerciseSearch]);

  const currentExercise =
    allMuscleExercises[selectedExerciseIndex] || allMuscleExercises[0];

  // Sync viewSide when a back/front muscle is selected externally
  useEffect(() => {
    if (currentMuscle.side !== viewSide && !autoOrbit) {
      setViewSide(currentMuscle.side);
    }
  }, [selectedMuscleId]);

  // Continuous 360° Auto-Orbit effect
  useEffect(() => {
    if (!autoOrbit) return;
    const interval = setInterval(() => {
      setYRotation((prev) => {
        const next = (prev + 3) % 360;
        if (next >= 90 && next < 270) {
          setViewSide('back');
        } else {
          setViewSide('front');
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [autoOrbit]);

  const handleRegionFilter = (region: BodyRegion) => {
    setBodyRegion(region);
    if (region === 'upper') {
      setViewSide('front');
      onSelectMuscle('chest');
      onSelectExerciseIndex(0);
    } else if (region === 'core') {
      setViewSide('front');
      onSelectMuscle('abs');
      onSelectExerciseIndex(0);
    } else if (region === 'lower') {
      setViewSide('front');
      onSelectMuscle('quads');
      onSelectExerciseIndex(0);
    } else {
      setViewSide('front');
      onSelectMuscle('chest');
      onSelectExerciseIndex(0);
    }
  };

  const handleMuscleClick = (id: MuscleId) => {
    onSelectMuscle(id);
    onSelectExerciseIndex(0);
    setExerciseSearch('');
    setEquipmentFilter('all');
    const target = MUSCLE_GROUPS[id];
    if (target) {
      setBodyRegion(target.region);
    }
  };

  const handleRotateStep = () => {
    setAutoOrbit(false);
    setYRotation((prev) => {
      const next = (prev + 45) % 360;
      if (next >= 90 && next < 270) {
        setViewSide('back');
      } else {
        setViewSide('front');
      }
      return next;
    });
  };

  const handleResetCamera = () => {
    setAutoOrbit(false);
    setZoom(1);
    setYRotation(0);
    setViewSide(currentMuscle.side);
  };

  const isSelectedMuscle = (id: MuscleId) => selectedMuscleId === id;
  const isSynergistMuscle = (id: MuscleId) =>
    currentMuscle.synergistMuscleIds.includes(id);

  const getMuscleSvgProps = (id: MuscleId) => {
    if (isSelectedMuscle(id)) {
      return {
        fill: 'url(#chestGlow)',
        stroke: '#ccff80',
        strokeWidth: 2.5,
        filter: 'url(#neonBlur)',
        opacity: 1,
      };
    }
    if (isSynergistMuscle(id)) {
      return {
        fill: '#03b5d3',
        fillOpacity: 0.3,
        stroke: '#4cd7f6',
        strokeWidth: 1.5,
        opacity: 0.85,
      };
    }
    return {
      fill: '#262a31',
      stroke: '#8c947c',
      strokeWidth: 1.2,
      opacity: 0.55,
    };
  };

  const isInRoutine = routineExerciseIds.includes(currentExercise.id);
  const isBookmarked = bookmarkedIds.includes(currentExercise.id);

  // Exercises chosen in the routine for this specific muscle
  const selectedMuscleRoutineExercises = useMemo(() => {
    return allMuscleExercises.filter((ex) => routineExerciseIds.includes(ex.id));
  }, [allMuscleExercises, routineExerciseIds]);

  const dynamicReadinessScore = Math.min(
    99,
    currentMuscle.readinessScore + selectedMuscleRoutineExercises.length * 3
  );

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-md flex flex-col gap-space-lg">
      {/* Top Controls & Exploration Filter Bar */}
      <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-xl flex flex-col xl:flex-row items-center justify-between gap-space-md">
        {/* Left: Mode Switchers (Gender, View Angle) */}
        <div className="flex flex-wrap items-center gap-space-sm w-full xl:w-auto">
          {/* Gender Model Segmented Toggle */}
          <div className="inline-flex items-center bg-surface-container-lowest p-1 rounded-full shadow-inner">
            <button
              onClick={() => setGender('male')}
              className={
                gender === 'male'
                  ? 'px-space-md py-space-xs rounded-full font-headline-sm text-body-sm bg-primary-container text-on-primary-container shadow-md flex items-center gap-space-xxs transition-all cursor-pointer'
                  : 'px-space-md py-space-xs rounded-full font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface flex items-center gap-space-xxs transition-all cursor-pointer'
              }
              id="gender-male"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">male</span>
              <span>Male Model</span>
            </button>
            <button
              onClick={() => setGender('female')}
              className={
                gender === 'female'
                  ? 'px-space-md py-space-xs rounded-full font-headline-sm text-body-sm bg-primary-container text-on-primary-container shadow-md flex items-center gap-space-xxs transition-all cursor-pointer'
                  : 'px-space-md py-space-xs rounded-full font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface flex items-center gap-space-xxs transition-all cursor-pointer'
              }
              id="gender-female"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">female</span>
              <span>Female Model</span>
            </button>
          </div>

          {/* Perspective Toggle */}
          <div className="inline-flex items-center bg-surface-container-lowest p-1 rounded-full shadow-inner">
            <button
              onClick={() => {
                setAutoOrbit(false);
                setViewSide('front');
                setYRotation(0);
                if (currentMuscle.side === 'back') {
                  onSelectMuscle('chest');
                  onSelectExerciseIndex(0);
                }
              }}
              className={
                viewSide === 'front'
                  ? 'px-space-md py-space-xs rounded-full font-headline-sm text-body-sm bg-surface-container-high text-primary flex items-center gap-space-xxs transition-all cursor-pointer'
                  : 'px-space-md py-space-xs rounded-full font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface flex items-center gap-space-xxs transition-all cursor-pointer'
              }
              id="view-front"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Anterior (Front)</span>
            </button>
            <button
              onClick={() => {
                setAutoOrbit(false);
                setViewSide('back');
                setYRotation(180);
                if (currentMuscle.side === 'front') {
                  onSelectMuscle('lats');
                  onSelectExerciseIndex(0);
                }
              }}
              className={
                viewSide === 'back'
                  ? 'px-space-md py-space-xs rounded-full font-headline-sm text-body-sm bg-surface-container-high text-primary flex items-center gap-space-xxs transition-all cursor-pointer'
                  : 'px-space-md py-space-xs rounded-full font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface flex items-center gap-space-xxs transition-all cursor-pointer'
              }
              id="view-back"
              type="button"
            >
              <span>Posterior (Back)</span>
            </button>
            <button
              onClick={() => setAutoOrbit((prev) => !prev)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                autoOrbit
                  ? 'bg-primary text-on-primary shadow-[0_0_12px_#ccff80]'
                  : 'text-secondary hover:text-primary'
              }`}
              title="Rotate 360° Continuous Orbit"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">360</span>
            </button>
          </div>
        </div>

        {/* Center: Filter Pills */}
        <div className="flex flex-wrap items-center gap-space-xxs overflow-x-auto w-full xl:w-auto pb-1 xl:pb-0">
          {(
            [
              { id: 'upper', label: 'Upper Body' },
              { id: 'core', label: 'Core & Abs' },
              { id: 'lower', label: 'Lower Body' },
              { id: 'full', label: 'Full Body' },
            ] as { id: BodyRegion; label: string }[]
          ).map((item) => {
            const active = bodyRegion === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleRegionFilter(item.id)}
                type="button"
                className={
                  active
                    ? 'px-space-md py-space-xs rounded-full font-headline-sm text-label-caption uppercase tracking-wider bg-primary/15 text-primary shadow-sm flex items-center gap-1.5 cursor-pointer transition-all'
                    : 'px-space-md py-space-xs rounded-full font-body-sm text-label-caption uppercase tracking-wider text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer'
                }
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Custom Workout Plan Quick Counter */}
        <button
          onClick={() => setShowPlanDrawer((p) => !p)}
          type="button"
          className="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high px-space-md py-space-xs rounded-full transition-colors cursor-pointer border border-primary/20"
        >
          <span
            className="material-symbols-outlined text-primary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            checklist
          </span>
          <span className="font-body-sm text-label-caption text-on-surface">
            My {currentMuscle.shortName} Plan:{' '}
            <span className="text-primary font-headline-sm">
              {selectedMuscleRoutineExercises.length} Moves
            </span>
          </span>
        </button>
      </div>

      {/* Instructional Strip */}
      <div className="w-full bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container p-space-sm rounded-xl flex items-center justify-between gap-space-md shadow-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
            <span className="material-symbols-outlined text-[20px]">smart_display</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface">
            <span className="font-headline-sm text-primary">50+ Exercise Options for {currentMuscle.shortName}:</span> Pick
            and combine any exercise below to build your custom workout plan. Each movement includes a dedicated YouTube video tutorial!
          </p>
        </div>
        <div className="hidden md:flex items-center gap-space-sm text-on-surface-variant font-label-numeric text-label-caption shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span> {allMuscleExercises.length} Total Exercises
          </span>
        </div>
      </div>

      {/* Main Dynamic Split: 3D Stage (Left ~50%) & Real-Time Form Deck (Right ~50%) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* ================= LEFT: 3D ANATOMY VISUALIZER STAGE ================= */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          {/* Interactive 3D Canvas Box */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/3] lg:aspect-[10/11] rounded-2xl bg-surface-container-lowest overflow-hidden shadow-2xl flex flex-col justify-between p-space-md group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(163,230,53,0.12)_0%,rgba(3,181,211,0.06)_45%,transparent_75%)] pointer-events-none"></div>

            <svg
              className="absolute bottom-0 inset-x-0 w-full h-44 opacity-25 pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 800 200"
            >
              <defs>
                <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ccff80" stopOpacity="0"></stop>
                  <stop offset="100%" stopColor="#ccff80" stopOpacity="0.8"></stop>
                </linearGradient>
              </defs>
              <path
                d="M 0,200 L 350,0 M 100,200 L 370,0 M 200,200 L 385,0 M 300,200 L 395,0 M 400,200 L 400,0 M 500,200 L 405,0 M 600,200 L 415,0 M 700,200 L 430,0 M 800,200 L 450,0"
                stroke="url(#gridFade)"
                strokeWidth="1"
              ></path>
              <ellipse
                cx="400"
                cy="180"
                fill="none"
                opacity="0.6"
                rx="260"
                ry="24"
                stroke="#ccff80"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              ></ellipse>
            </svg>

            {/* Top Stage Badges & Metrics HUD */}
            <div className="relative z-10 flex items-start justify-between w-full">
              <div className="flex flex-col gap-space-xxs">
                <div className="flex items-center gap-space-xxs bg-surface-container-high/90 backdrop-blur-md px-space-sm py-space-xxs rounded-full shadow-md">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-label-badge text-label-badge text-primary uppercase">
                    {currentMuscle.focusLabel}
                  </span>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant pl-space-xs">
                  {currentMuscle.subHeader}
                </span>
              </div>

              <div className="bg-surface-container-high/90 backdrop-blur-md p-space-xxs px-space-sm rounded-full flex items-center gap-space-xs shadow-md">
                <span className="font-label-numeric text-label-caption text-secondary">
                  Y-ROT: {yRotation.toFixed(2)}°
                </span>
                <span className="text-outline text-label-caption">|</span>
                <button
                  onClick={() => setAutoOrbit((prev) => !prev)}
                  className={`font-label-badge text-label-badge uppercase flex items-center gap-1 transition-colors cursor-pointer ${
                    autoOrbit ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      autoOrbit ? 'animate-spin' : ''
                    }`}
                  >
                    autorenew
                  </span>{' '}
                  Auto-Orbit
                </button>
              </div>
            </div>

            {/* Anatomical Human Model Vector Display */}
            <div className="relative w-full h-full flex items-center justify-center my-auto">
              <svg
                style={{
                  transform: `scale(${zoom}) rotateY(${
                    autoOrbit ? (yRotation % 45) - 22.5 : 0
                  }deg)`,
                }}
                className="w-full max-w-[340px] h-[92%] drop-shadow-[0_0_35px_rgba(163,230,53,0.18)] select-none transition-all duration-300"
                fill="none"
                viewBox="0 0 300 600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient cx="50%" cy="50%" id="chestGlow" r="50%">
                    <stop offset="0%" stopColor="#ccff80" stopOpacity="0.95"></stop>
                    <stop offset="85%" stopColor="#a3e635" stopOpacity="0.75"></stop>
                    <stop offset="100%" stopColor="#a3e635" stopOpacity="0.2"></stop>
                  </radialGradient>
                  <filter id="neonBlur">
                    <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
                    <feMerge>
                      <feMergeNode in="blur"></feMergeNode>
                      <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                  </filter>
                </defs>

                {/* Wireframe Outline */}
                <g
                  opacity={muscleLayer === 'skeletal' ? '0.65' : '0.35'}
                  stroke={muscleLayer === 'skeletal' ? '#4cd7f6' : '#424936'}
                  strokeLinecap="round"
                  strokeWidth="1.2"
                >
                  <ellipse
                    cx="150"
                    cy="55"
                    rx={gender === 'female' ? '20' : '22'}
                    ry="28"
                  ></ellipse>
                  <path d="M 142 82 L 142 102 M 158 82 L 158 102"></path>
                  <path
                    d={
                      gender === 'female'
                        ? 'M 120 106 Q 150 114 180 106'
                        : 'M 115 106 Q 150 114 185 106'
                    }
                  ></path>
                  <path
                    d={
                      gender === 'female'
                        ? 'M 115 115 L 125 215 L 118 265 L 182 265 L 175 215 L 185 115'
                        : 'M 110 115 L 120 220 L 126 260 L 174 260 L 180 220 L 190 115'
                    }
                  ></path>
                  <path d="M 95 125 L 82 205 L 75 275"></path>
                  <path d="M 205 125 L 218 205 L 225 275"></path>
                  <path d="M 126 260 L 115 385 L 110 510 L 105 570"></path>
                  <path d="M 174 260 L 185 385 L 190 510 L 195 570"></path>
                  <path d="M 150 285 L 140 385 L 138 510"></path>
                  <path d="M 150 285 L 160 385 L 162 510"></path>
                </g>

                {muscleLayer === 'skeletal' && (
                  <g opacity="0.55" stroke="#4cd7f6" strokeWidth="1" strokeDasharray="3 2">
                    <line x1="150" y1="85" x2="150" y2="265" strokeWidth="2.5" />
                    <path d="M 122 128 Q 150 136 178 128" />
                    <path d="M 120 144 Q 150 154 180 144" />
                    <path d="M 122 160 Q 150 170 178 160" />
                    <path d="M 126 176 Q 150 184 174 176" />
                    <ellipse cx="150" cy="268" rx="28" ry="14" />
                    <line x1="130" y1="275" x2="125" y2="390" strokeWidth="2" />
                    <line x1="170" y1="275" x2="175" y2="390" strokeWidth="2" />
                    <line x1="125" y1="398" x2="120" y2="510" strokeWidth="1.5" />
                    <line x1="175" y1="398" x2="180" y2="510" strokeWidth="1.5" />
                  </g>
                )}

                {viewSide === 'front' ? (
                  <>
                    <g
                      onClick={() => handleMuscleClick('shoulders')}
                      className="cursor-pointer group/shoulder hover:opacity-100 transition-opacity"
                      id="muscle-shoulders"
                      {...getMuscleSvgProps('shoulders')}
                    >
                      <path d="M 98 116 Q 84 135 90 156 Q 102 152 108 132 Z"></path>
                      <path d="M 202 116 Q 216 135 210 156 Q 198 152 192 132 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('chest')}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      id="muscle-chest"
                      {...getMuscleSvgProps('chest')}
                    >
                      <path d="M 147 118 Q 112 118 110 148 Q 116 178 147 180 Z"></path>
                      <path d="M 153 118 Q 188 118 190 148 Q 184 178 153 180 Z"></path>
                      <line
                        stroke="#213600"
                        strokeWidth="2.5"
                        x1="150"
                        x2="150"
                        y1="116"
                        y2="182"
                      ></line>
                      <path
                        d="M 120 135 Q 135 142 147 145 M 122 150 Q 136 156 147 158 M 180 135 Q 165 142 153 145 M 178 150 Q 164 156 153 158"
                        opacity="0.55"
                        stroke="#10141a"
                        strokeWidth="1"
                      ></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('biceps')}
                      className="cursor-pointer hover:opacity-95 transition-opacity"
                      id="muscle-biceps"
                      {...getMuscleSvgProps('biceps')}
                    >
                      <path d="M 88 162 Q 78 185 85 208 Q 94 200 97 172 Z"></path>
                      <path d="M 212 162 Q 222 185 215 208 Q 206 200 203 172 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('abs')}
                      className="cursor-pointer hover:opacity-95 transition-opacity"
                      id="muscle-abs"
                      {...getMuscleSvgProps('abs')}
                    >
                      <rect height="15" rx="3" width="13" x="135" y="190"></rect>
                      <rect height="15" rx="3" width="13" x="152" y="190"></rect>
                      <rect height="16" rx="3" width="13" x="135" y="210"></rect>
                      <rect height="16" rx="3" width="13" x="152" y="210"></rect>
                      <rect height="18" rx="3" width="12" x="136" y="231"></rect>
                      <rect height="18" rx="3" width="12" x="152" y="231"></rect>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('quads')}
                      className="cursor-pointer hover:opacity-95 transition-opacity"
                      id="muscle-quads"
                      {...getMuscleSvgProps('quads')}
                    >
                      <path d="M 122 285 Q 106 335 116 385 Q 138 385 142 340 Q 140 295 122 285 Z"></path>
                      <path d="M 178 285 Q 194 335 184 385 Q 162 385 158 340 Q 160 295 178 285 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('calves')}
                      className="cursor-pointer hover:opacity-95 transition-opacity"
                      id="muscle-calves"
                      {...getMuscleSvgProps('calves')}
                    >
                      <path d="M 112 415 Q 104 460 115 500 Q 128 495 126 430 Z"></path>
                      <path d="M 188 415 Q 196 460 185 500 Q 172 495 174 430 Z"></path>
                    </g>
                  </>
                ) : (
                  <>
                    <g
                      onClick={() => handleMuscleClick('shoulders')}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      {...getMuscleSvgProps('shoulders')}
                    >
                      <path d="M 98 116 Q 84 135 90 156 Q 102 152 108 132 Z"></path>
                      <path d="M 202 116 Q 216 135 210 156 Q 198 152 192 132 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('lats')}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      {...getMuscleSvgProps('lats')}
                    >
                      <path d="M 148 112 L 112 128 L 118 205 L 148 225 Z"></path>
                      <path d="M 152 112 L 188 128 L 182 205 L 152 225 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('triceps')}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      {...getMuscleSvgProps('triceps')}
                    >
                      <path d="M 88 160 Q 76 185 84 210 Q 95 202 98 170 Z"></path>
                      <path d="M 212 160 Q 224 185 216 210 Q 205 202 202 170 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('glutes')}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      {...getMuscleSvgProps('glutes')}
                    >
                      <path d="M 122 252 Q 112 278 124 298 Q 148 300 148 272 Z"></path>
                      <path d="M 178 252 Q 188 278 176 298 Q 152 300 152 272 Z"></path>
                      <path d="M 122 304 Q 110 345 118 385 Q 138 385 142 340 Z"></path>
                      <path d="M 178 304 Q 190 345 182 385 Q 162 385 158 340 Z"></path>
                    </g>

                    <g
                      onClick={() => handleMuscleClick('calves')}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      {...getMuscleSvgProps('calves')}
                    >
                      <path d="M 112 415 Q 104 460 115 500 Q 128 495 126 430 Z"></path>
                      <path d="M 188 415 Q 196 460 185 500 Q 172 495 174 430 Z"></path>
                    </g>
                  </>
                )}
              </svg>

              {/* Floating Hotspot Markers */}
              {viewSide === 'front' ? (
                <>
                  <div
                    onClick={() => handleMuscleClick('chest')}
                    className="absolute top-[23%] left-[50%] -translate-x-1/2 flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer"
                  >
                    {selectedMuscleId === 'chest' ? (
                      <>
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-7 h-7 rounded-full bg-primary/40 animate-ping"></span>
                          <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_#ccff80]">
                            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                          </span>
                        </div>
                        <div className="bg-surface-container-high/95 backdrop-blur-md px-space-sm py-space-xxs rounded-lg shadow-xl flex items-center gap-space-xs -translate-y-1">
                          <span className="font-headline-sm text-body-sm text-primary">
                            Chest
                          </span>
                          <span className="bg-primary-container text-on-primary-container font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                            50+ Exercises
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="w-3 h-3 rounded-full bg-outline flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-surface-container-lowest"></span>
                        </span>
                        <span className="bg-surface-container-high/90 px-space-xs py-space-xxs rounded font-label-caption text-label-caption text-on-surface-variant hover:text-primary transition-colors">
                          Chest
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    onClick={() => handleMuscleClick('shoulders')}
                    className="absolute top-[21%] left-[24%] flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer opacity-85 hover:opacity-100 transition-opacity"
                  >
                    {selectedMuscleId === 'shoulders' ? (
                      <>
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-7 h-7 rounded-full bg-primary/40 animate-ping"></span>
                          <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_#ccff80]">
                            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                          </span>
                        </div>
                        <div className="bg-surface-container-high/95 backdrop-blur-md px-space-sm py-space-xxs rounded-lg shadow-xl flex items-center gap-space-xs">
                          <span className="font-headline-sm text-body-sm text-primary">
                            Deltoids
                          </span>
                          <span className="bg-primary-container text-on-primary-container font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                            50+ Exercises
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="w-3 h-3 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_8px_#4cd7f6]">
                          <span className="w-1 h-1 rounded-full bg-surface-container-lowest"></span>
                        </span>
                        <span className="hidden sm:inline bg-surface-container-high/90 px-space-xs py-space-xxs rounded font-label-caption text-label-caption text-secondary">
                          Deltoids
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    onClick={() => handleMuscleClick('abs')}
                    className="absolute top-[37%] left-[50%] -translate-x-1/2 flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {selectedMuscleId === 'abs' ? (
                      <>
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-7 h-7 rounded-full bg-primary/40 animate-ping"></span>
                          <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_#ccff80]">
                            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                          </span>
                        </div>
                        <div className="bg-surface-container-high/95 backdrop-blur-md px-space-sm py-space-xxs rounded-lg shadow-xl flex items-center gap-space-xs">
                          <span className="font-headline-sm text-body-sm text-primary">
                            Core Stabilizer
                          </span>
                          <span className="bg-primary-container text-on-primary-container font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                            50+ Exercises
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="w-3 h-3 rounded-full bg-outline flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-surface-container-lowest"></span>
                        </span>
                        <span className="hidden sm:inline bg-surface-container-high/90 px-space-xs py-space-xxs rounded font-label-caption text-label-caption text-on-surface-variant">
                          Core Stabilizer
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    onClick={() => handleMuscleClick('quads')}
                    className="absolute top-[54%] left-[64%] flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {selectedMuscleId === 'quads' ? (
                      <>
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-7 h-7 rounded-full bg-primary/40 animate-ping"></span>
                          <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_#ccff80]">
                            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                          </span>
                        </div>
                        <div className="bg-surface-container-high/95 backdrop-blur-md px-space-sm py-space-xxs rounded-lg shadow-xl flex items-center gap-space-xs">
                          <span className="font-headline-sm text-body-sm text-primary">
                            Quadriceps
                          </span>
                          <span className="bg-primary-container text-on-primary-container font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                            50+ Exercises
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="w-3 h-3 rounded-full bg-outline flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-surface-container-lowest"></span>
                        </span>
                        <span className="hidden sm:inline bg-surface-container-high/90 px-space-xs py-space-xxs rounded font-label-caption text-label-caption text-on-surface-variant">
                          Quadriceps
                        </span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => handleMuscleClick('lats')}
                    className="absolute top-[26%] left-[50%] -translate-x-1/2 flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      {selectedMuscleId === 'lats' && (
                        <span className="absolute w-7 h-7 rounded-full bg-primary/40 animate-ping"></span>
                      )}
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          selectedMuscleId === 'lats'
                            ? 'bg-primary shadow-[0_0_12px_#ccff80]'
                            : 'bg-outline'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                      </span>
                    </div>
                    <div className="bg-surface-container-high/95 backdrop-blur-md px-space-sm py-space-xxs rounded-lg shadow-xl flex items-center gap-space-xs">
                      <span
                        className={`font-headline-sm text-body-sm ${
                          selectedMuscleId === 'lats' ? 'text-primary' : 'text-on-surface'
                        }`}
                      >
                        Lats & Back
                      </span>
                      <span className="bg-primary-container text-on-primary-container font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase">
                        50+ Exercises
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => handleMuscleClick('triceps')}
                    className="absolute top-[30%] left-[22%] flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        selectedMuscleId === 'triceps'
                          ? 'bg-primary shadow-[0_0_12px_#ccff80]'
                          : 'bg-secondary shadow-[0_0_8px_#4cd7f6]'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-surface-container-lowest"></span>
                    </span>
                    <span className="bg-surface-container-high/90 px-space-xs py-space-xxs rounded font-label-caption text-label-caption text-secondary">
                      Triceps
                    </span>
                  </div>

                  <div
                    onClick={() => handleMuscleClick('glutes')}
                    className="absolute top-[52%] left-[58%] flex items-center gap-space-xs z-20 pointer-events-auto cursor-pointer"
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        selectedMuscleId === 'glutes'
                          ? 'bg-primary shadow-[0_0_12px_#ccff80]'
                          : 'bg-outline'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-surface-container-lowest"></span>
                    </span>
                    <span className="bg-surface-container-high/90 px-space-xs py-space-xxs rounded font-label-caption text-label-caption text-on-surface-variant">
                      Glutes & Hams
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Stage Viewport Interaction Toolbar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
              <div className="flex items-center gap-1 bg-surface-container-high/90 backdrop-blur-md p-1 rounded-xl shadow-lg">
                <button
                  onClick={() => setZoom((z) => Math.min(1.35, +(z + 0.1).toFixed(2)))}
                  aria-label="Zoom in"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(0.8, +(z - 0.1).toFixed(2)))}
                  aria-label="Zoom out"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <button
                  onClick={handleResetCamera}
                  aria-label="Reset viewport"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  title="Reset Camera"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    center_focus_strong
                  </span>
                </button>
                <button
                  onClick={handleRotateStep}
                  className="px-space-xs h-9 rounded-lg flex items-center gap-1 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors font-label-caption text-label-caption cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">rotate_right</span>
                  <span>+45°</span>
                </button>
              </div>

              <div className="inline-flex items-center bg-surface-container-high/90 backdrop-blur-md p-1 rounded-xl shadow-lg">
                <button
                  onClick={() => setMuscleLayer('surface')}
                  type="button"
                  className={
                    muscleLayer === 'surface'
                      ? 'px-space-sm py-1.5 rounded-lg font-headline-sm text-label-caption bg-primary/20 text-primary cursor-pointer transition-all'
                      : 'px-space-sm py-1.5 rounded-lg font-body-sm text-label-caption text-on-surface-variant hover:text-on-surface cursor-pointer transition-all'
                  }
                >
                  Surface Muscle
                </button>
                <button
                  onClick={() => setMuscleLayer('skeletal')}
                  type="button"
                  className={
                    muscleLayer === 'skeletal'
                      ? 'px-space-sm py-1.5 rounded-lg font-headline-sm text-label-caption bg-primary/20 text-primary cursor-pointer transition-all'
                      : 'px-space-sm py-1.5 rounded-lg font-body-sm text-label-caption text-on-surface-variant hover:text-on-surface cursor-pointer transition-all'
                  }
                >
                  Deep Skeletal
                </button>
              </div>
            </div>
          </div>

          {/* Muscle Anatomy Explainer Card */}
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[28px]">
                  accessibility_new
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {currentMuscle.anatomicalName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-badge text-label-badge uppercase">
                    {currentMuscle.roleBadge}
                  </span>
                </div>
                <p className="font-body-md text-body-sm text-on-surface-variant mt-0.5">
                  {currentMuscle.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-xs shrink-0 self-end md:self-center">
              <div className="flex flex-col text-right">
                <span className="font-label-badge text-label-badge text-outline uppercase">
                  Synergists Engaged
                </span>
                <span className="font-headline-sm text-label-caption text-secondary">
                  {currentMuscle.synergistsLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: 50+ EXERCISE BROWSER & YOUTUBE PLAYER ================= */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          {/* Workout Plan Builder Header Bar */}
          <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-headline-sm text-body-md text-on-surface">
                {currentMuscle.shortName} Exercise Library
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-numeric text-[11px]">
                {allMuscleExercises.length} Exercises Available
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="font-label-numeric text-label-caption text-secondary">
                {selectedMuscleRoutineExercises.length} in plan
              </span>
              <button
                onClick={() => setShowPlanDrawer((p) => !p)}
                type="button"
                className="px-space-sm py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-headline-sm text-label-caption transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {showPlanDrawer ? 'visibility_off' : 'visibility'}
                </span>
                <span>{showPlanDrawer ? 'Hide Plan' : 'Review Plan'}</span>
              </button>
            </div>
          </div>

          {/* Custom Workout Plan Drawer (if expanded) */}
          {showPlanDrawer && (
            <div className="bg-surface-container rounded-xl p-space-md border border-primary/30 flex flex-col gap-space-xs shadow-xl animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30">
                <span className="font-headline-sm text-body-sm text-primary">
                  Custom {currentMuscle.shortName} Workout Plan ({selectedMuscleRoutineExercises.length} Moves)
                </span>
                <span className="font-label-numeric text-[11px] text-outline">
                  ~{selectedMuscleRoutineExercises.length * 8} mins total
                </span>
              </div>
              {selectedMuscleRoutineExercises.length === 0 ? (
                <p className="font-body-sm text-label-caption text-on-surface-variant py-2">
                  No exercises added to your {currentMuscle.shortName} plan yet. Click &quot;+ Add to Plan&quot; on any of the 50+ options below!
                </p>
              ) : (
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedMuscleRoutineExercises.map((planItem, pIdx) => (
                    <div
                      key={planItem.id}
                      className="bg-surface-container-low px-space-sm py-1.5 rounded-lg flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary font-label-numeric text-[11px] flex items-center justify-center">
                          {pIdx + 1}
                        </span>
                        <span className="font-headline-sm text-body-sm text-on-surface">
                          {planItem.name}
                        </span>
                        <span className="font-label-numeric text-[10px] text-secondary">
                          {planItem.equipment.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => onToggleRoutineExercise(planItem.id, selectedMuscleId)}
                        type="button"
                        className="text-outline hover:text-error transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pure YouTube Video Player Card (NO simulation frame, NO loop scrub controls) */}
          <div className="bg-surface-container rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-primary/20">
            {/* Player Header Banner */}
            <div className="bg-surface-container-low px-space-md py-2 flex items-center justify-between border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="font-headline-sm text-body-sm text-on-surface">
                  {currentExercise.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 font-label-badge text-[10px] uppercase">
                  YouTube Tutorial
                </span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${currentExercise.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="font-label-caption text-[11px] text-secondary hover:text-primary flex items-center gap-1 transition-colors"
                title="Open directly on YouTube"
              >
                <span>Watch on YouTube</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>

            {/* Responsive Pure YouTube IFrame Embed */}
            <div className="relative w-full aspect-[16/9] bg-black">
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${currentExercise.youtubeId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1`}
                title={currentExercise.youtubeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Quick Machine Settings Bar */}
            <div className="bg-surface-container-low px-space-md py-space-sm grid grid-cols-3 divide-x divide-transparent gap-space-xs text-center">
              <div className="flex flex-col">
                <span className="font-label-caption text-label-caption text-outline">
                  Starting Pin Weight
                </span>
                <span className="font-label-numeric text-headline-sm text-primary">
                  {currentExercise.startingWeight}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caption text-label-caption text-outline">
                  Target Volume
                </span>
                <span className="font-label-numeric text-headline-sm text-on-surface">
                  {currentExercise.targetVolume}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caption text-label-caption text-outline">
                  Rest Interval
                </span>
                <span className="font-label-numeric text-headline-sm text-secondary">
                  {currentExercise.restInterval}
                </span>
              </div>
            </div>

            {/* Step-by-Step Form & Setup Guide */}
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    checklist
                  </span>
                  3-Step Form &amp; Setup Guide
                </span>
                <span className="font-label-caption text-label-caption text-on-surface-variant">
                  {currentExercise.targetSubRegion}
                </span>
              </div>

              {/* Steps Stack */}
              <div className="flex flex-col gap-space-xs">
                {currentExercise.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-space-xs bg-surface-container-low p-space-xs rounded-lg"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary font-label-numeric text-label-caption flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      <strong className="text-primary font-headline-sm">
                        {step.title}
                      </strong>{' '}
                      {step.text}
                      {step.highlight && (
                        <>
                          <span className="text-on-surface font-headline-sm">
                            {step.highlight}
                          </span>
                          .
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Common Beginner Mistakes Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs mt-space-xxs">
                <div className="bg-error-container/20 p-space-xs rounded-lg flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                    cancel
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-label-caption text-error">
                      Avoid This
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                      {currentExercise.avoidThis}
                    </span>
                  </div>
                </div>
                <div className="bg-primary/10 p-space-xs rounded-lg flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-label-caption text-primary">
                      Do This
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                      {currentExercise.doThis}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-space-xs mt-space-xs pt-space-xs">
                <button
                  onClick={() =>
                    onToggleRoutineExercise(currentExercise.id, selectedMuscleId)
                  }
                  className={`w-full sm:flex-1 h-12 rounded-xl font-headline-sm text-body-md active:scale-[0.98] transition-all flex items-center justify-center gap-space-xs cursor-pointer ${
                    isInRoutine
                      ? 'bg-primary text-on-primary shadow-[0_0_24px_rgba(204,255,128,0.45)]'
                      : 'bg-primary-container text-on-primary-container hover:bg-primary shadow-[0_0_20px_-3px_rgba(163,230,53,0.35)]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isInRoutine ? 'task_alt' : 'add_task'}
                  </span>
                  <span>
                    {isInRoutine ? `In My ${currentMuscle.shortName} Plan` : `Add to My ${currentMuscle.shortName} Plan`}
                  </span>
                </button>
                <button
                  onClick={() => onToggleBookmark(currentExercise.id)}
                  className={`w-full sm:w-12 h-12 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    isBookmarked
                      ? 'bg-primary/20 text-primary'
                      : 'bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-bright'
                  }`}
                  title={isBookmarked ? 'Saved in Favorites' : 'Save to favorites'}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={
                      isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined
                    }
                  >
                    bookmark
                  </span>
                </button>
                <button
                  onClick={() => onOpenCoachModal()}
                  className="w-full sm:w-auto px-space-md h-12 rounded-xl bg-surface-container-high text-secondary hover:text-on-surface hover:bg-surface-bright transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  title="Ask Form Coach"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">neurology</span>
                  <span className="font-body-sm text-label-caption">Ask Coach</span>
                </button>
              </div>
            </div>
          </div>

          {/* 50+ Exercise Selection Suite & Equipment Filter Bar */}
          <div className="flex flex-col gap-space-xs bg-surface-container rounded-2xl p-space-md shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-1 border-b border-outline-variant/30">
              <span className="font-headline-sm text-body-md text-on-surface">
                Choose from 50+ {currentMuscle.shortName} Exercises
              </span>
              <span className="font-label-numeric text-[11px] text-primary">
                Showing {filteredExercises.length} / {allMuscleExercises.length}
              </span>
            </div>

            {/* Search + Equipment Filters */}
            <div className="flex flex-col gap-space-xs pt-1">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  placeholder={`Search 50+ ${currentMuscle.shortName} moves (e.g. Incline, Cable, Dumbbell)...`}
                  className="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Equipment Segmented Controls */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {(
                  [
                    { id: 'all', label: `All (${allMuscleExercises.length})` },
                    { id: 'machine', label: 'Machines' },
                    { id: 'dumbbell', label: 'Dumbbells' },
                    { id: 'barbell', label: 'Barbells' },
                    { id: 'cable', label: 'Cables' },
                    { id: 'bodyweight', label: 'Bodyweight' },
                    { id: 'smith', label: 'Smith Machine' },
                  ] as { id: EquipmentCategory; label: string }[]
                ).map((cat) => {
                  const active = equipmentFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setEquipmentFilter(cat.id)}
                      type="button"
                      className={
                        active
                          ? 'px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-caption whitespace-nowrap shrink-0 transition-all cursor-pointer'
                          : 'px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface font-body-sm text-label-caption whitespace-nowrap shrink-0 transition-all cursor-pointer'
                      }
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 50+ Exercise Scrollable Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1 mt-1">
              {filteredExercises.map((ex) => {
                const originalIndex = allMuscleExercises.findIndex((item) => item.id === ex.id);
                const isSelected = originalIndex === selectedExerciseIndex;
                const isIncludedInPlan = routineExerciseIds.includes(ex.id);

                return (
                  <div
                    key={ex.id}
                    className={`rounded-xl p-2.5 flex flex-col justify-between gap-2 transition-all border ${
                      isSelected
                        ? 'bg-surface-container-high border-primary shadow-[0_0_16px_-4px_rgba(163,230,53,0.35)]'
                        : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container-high/60'
                    }`}
                  >
                    <div
                      onClick={() => onSelectExerciseIndex(originalIndex >= 0 ? originalIndex : 0)}
                      className="cursor-pointer flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-badge text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase">
                          {ex.equipment.toUpperCase()}
                        </span>
                        <span className="font-label-badge text-[10px] text-secondary">
                          {ex.targetSubRegion}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-1 mt-1">
                        <span className="font-headline-sm text-body-sm text-on-surface line-clamp-1">
                          {ex.name}
                        </span>
                        <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0">
                          smart_display
                        </span>
                      </div>
                      <span className="font-body-sm text-[11px] text-outline line-clamp-1">
                        {ex.subtitle}
                      </span>
                    </div>

                    {/* Quick Add to Custom Workout Plan Toggle */}
                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                      <button
                        onClick={() => onSelectExerciseIndex(originalIndex >= 0 ? originalIndex : 0)}
                        type="button"
                        className="font-label-caption text-[11px] text-secondary hover:text-primary transition-colors cursor-pointer flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                        <span>{isSelected ? 'Playing Video' : 'Watch Video'}</span>
                      </button>

                      <button
                        onClick={() => onToggleRoutineExercise(ex.id, selectedMuscleId)}
                        type="button"
                        className={`px-2 py-0.5 rounded-md font-headline-sm text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                          isIncludedInPlan
                            ? 'bg-primary text-on-primary font-bold'
                            : 'bg-surface-container-highest text-on-surface hover:bg-primary-container hover:text-on-primary-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {isIncludedInPlan ? 'check' : 'add'}
                        </span>
                        <span>{isIncludedInPlan ? 'In Plan' : '+ Add'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Beginner Reassurance & Confidence Dashboard Strip */}
      <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-lg grid grid-cols-1 md:grid-cols-3 gap-space-md items-center">
        {/* Confidence Score Meter */}
        <div className="flex items-center gap-space-md">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-container-highest"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              ></path>
              <path
                className="text-primary transition-all duration-300"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${dynamicReadinessScore}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              ></path>
            </svg>
            <span className="absolute font-label-numeric text-label-badge text-primary">
              {dynamicReadinessScore}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-body-sm text-on-surface">
              {currentMuscle.shortName} Plan Readiness: {dynamicReadinessScore}%
            </span>
            <span className="font-body-sm text-label-caption text-on-surface-variant">
              {selectedMuscleRoutineExercises.length} movements selected in your plan
            </span>
          </div>
        </div>

        {/* Suggested Next Muscle Pairing */}
        <button
          onClick={() => handleMuscleClick(currentMuscle.suggestedNextMuscleId)}
          type="button"
          className="flex items-center gap-space-sm bg-surface-container hover:bg-surface-container-high p-space-xs px-space-sm rounded-lg text-left transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
            <span className="material-symbols-outlined text-[18px]">
              turn_sharp_right
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-badge text-label-badge text-outline uppercase">
              Suggested Next Target
            </span>
            <span className="font-headline-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
              {currentMuscle.suggestedNextLabel}{' '}
              <span className="text-secondary font-body-sm font-normal">
                {currentMuscle.suggestedNextRelation}
              </span>
            </span>
          </div>
        </button>

        {/* Gym Etiquette Quick Reminder */}
        <div className="flex items-center gap-space-sm justify-start md:justify-end">
          <span className="material-symbols-outlined text-outline text-[20px]">info</span>
          <span className="font-body-sm text-label-caption text-on-surface-variant max-w-[280px]">
            You have {allMuscleExercises.length} different exercise choices. Choose the ones that feel best on your joints.
          </span>
        </div>
      </div>
    </section>
  );
};
