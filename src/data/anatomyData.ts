export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1XIEc41beIucrSXGzRrB-h1Epqaa2_OTI-h18gknXxEw69rjl3w_iE4i9nxZouj1rdk2myci5dMaCcF4lsTJ7VnsHZMHuyK_NWcaQYbkrYAzw8-tb1ZMiO6kTJa2ecgdIHzB-FCHX5pOKISpam9wxtavHsKAW0XEzyFURLJKcWrh0UF6SQNue4utDXPvvOlNJOG1wG0JCJK7QEhwKM9TgK86KHlYpGAruILX1uCzLMH89X8595hIxG4lc_y';

export const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbCS_T3gvJ-NxOBo3YZl89kleynEcSNHaVaZo0h5iG4pBGGRDeNXjImUNH0Jtbis4CLQMepThjR64l4ckuCQc9BZtCIRxjrEZfamt91J2awYr2JzJQJ5pcmW36WdLMyKRBOaIPw9_xdR-9BQxeXaHLSeIL46a5qk2hogERzDqkWmizayvnn4uK91J5MutmSfEZT4Sna5EnFDZl4tgwG20FcgiOs11qtw5FZ7Ap6MFbnDBUpXAZ-1mq4Q';

export const HERO_EXERCISE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBtx-_7i2mJJXU_mldxQLoAREi30jJ2QWIK7H5N_dg-KT7vfLhV8QWK4fWnBn3_DIP6lmqbAd6Gcu4f9HOvXmjMxx-yvxWs4JXH6x-SW39Hs8hXbx3Jba-xA3NyhCNjNLhLUMHU__rWGhRX-_C6mDPT1LKTMxE5ZhlB_K2XwONtfOtzcYzqs-KRy0NIBR-jzV_vY5LriEF9kkyhYbdiRXIqMFNM2uCtnNOPbx4p7-O2_AGGIdR0Lur6RA';

export type BodyRegion = 'upper' | 'core' | 'lower' | 'full';
export type ViewSide = 'front' | 'back';
export type MuscleId =
  | 'chest'
  | 'shoulders'
  | 'biceps'
  | 'abs'
  | 'quads'
  | 'calves'
  | 'lats'
  | 'triceps'
  | 'glutes';

export interface SetupStep {
  title: string;
  text: string;
  highlight?: string;
}

export interface AngleCallout {
  title: string;
  description: string;
  vectorLabel: string;
  pinLevel?: string;
  timestamp?: number;
}

export interface ExerciseVariation {
  id: string;
  name: string;
  subtitle: string;
  badgeText: string;
  badgeVariant: 'primary' | 'neutral' | 'secondary';
  isDay1Pick?: boolean;
  startingWeight: string;
  targetVolume: string;
  restInterval: string;
  safetyAngleTitle: string;
  safetyAngleDesc: string;
  youtubeId: string;
  youtubeTitle: string;
  steps: [SetupStep, SetupStep, SetupStep];
  avoidThis: string;
  doThis: string;
  doThisMetric?: string;
  angles: {
    'Side 45°': AngleCallout;
    'Front View': AngleCallout;
    'Seat Pin': AngleCallout;
  };
  coachTips: {
    question: string;
    answer: string;
  }[];
}

export interface MuscleGroupData {
  id: MuscleId;
  shortName: string;
  focusLabel: string;
  subHeader: string;
  anatomicalName: string;
  roleBadge: string;
  description: string;
  synergistsLabel: string;
  synergistMuscleIds: MuscleId[];
  region: BodyRegion;
  side: ViewSide;
  readinessScore: number;
  suggestedNextMuscleId: MuscleId;
  suggestedNextLabel: string;
  suggestedNextRelation: string;
  exercises: ExerciseVariation[];
}

export const MUSCLE_GROUPS: Record<MuscleId, MuscleGroupData> = {
  chest: {
    id: 'chest',
    shortName: 'Chest',
    focusLabel: 'Active Focus: Chest',
    subHeader: 'Pectoralis Major • Anterior Deltoid assist',
    anatomicalName: 'Pectoralis Major',
    roleBadge: 'Primary Mover',
    description:
      'Responsible for horizontal pushing and hugging motions. Training this builds upper chest firmness, arm stabilization, and athletic posture.',
    synergistsLabel: 'Front Delts + Triceps',
    synergistMuscleIds: ['shoulders', 'triceps'],
    region: 'upper',
    side: 'front',
    readinessScore: 88,
    suggestedNextMuscleId: 'triceps',
    suggestedNextLabel: 'Triceps Pushdown',
    suggestedNextRelation: '(Antagonist pairing)',
    exercises: [
      {
        id: 'machine-chest-press',
        name: 'Machine Chest Press',
        subtitle: 'Fixed Path • Zero Wobble',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '20 – 30 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '60–75 sec',
        safetyAngleTitle: 'Key Safety Angle: 75°',
        safetyAngleDesc:
          'Keep elbows tucked slightly below shoulder height to shield rotator cuffs.',
        youtubeId: 'sqOw2Y6uDWQ',
        youtubeTitle: 'How To Proper Machine Chest Press Form',
        steps: [
          {
            title: 'Seat Adjustment:',
            text: 'Pull the yellow pop-pin under the seat so the horizontal handles line up directly with your ',
            highlight: 'mid-chest nipple line',
          },
          {
            title: 'Body Foundation:',
            text: 'Plant both feet flat into the rubber gym floor. Pin your shoulder blades gently back against the pad.',
          },
          {
            title: 'The Movement:',
            text: 'Exhale as you push forward until arms are nearly straight (do not lock elbows hard). Inhale and slowly return for 3 seconds.',
          },
        ],
        avoidThis:
          'Flaring elbows at 90° straight sideways (causes shoulder pinching).',
        doThis: 'Tuck elbows slightly down like an arrow (',
        doThisMetric: '~75°',
        angles: {
          'Side 45°': {
            title: 'Key Safety Angle: 75°',
            description:
              'Keep elbows tucked slightly below shoulder height to shield rotator cuffs.',
            vectorLabel: 'ELBOW TORQUE: 75° OPTIMAL',
            timestamp: 5,
          },
          'Front View': {
            title: 'Symmetrical Wrist Path',
            description:
              'Keep forearms parallel to the floor and wrists neutral directly behind the handles.',
            vectorLabel: 'STERNAL ALIGNMENT: CENTERED',
            timestamp: 25,
          },
          'Seat Pin': {
            title: 'Seat Pop-Pin Notch #4–5',
            description:
              'Pull the yellow knob outward, slide seat until handles match mid-chest height, and click lock.',
            vectorLabel: 'PIN NOTCH: #4 (MID-STERNUM)',
            pinLevel: 'Notch 4',
            timestamp: 45,
          },
        },
        coachTips: [
          {
            question: 'What if the Machine Chest Press is taken?',
            answer:
              'Switch to the Dumbbell Bench tab right next to this one, or use the Incline Chest Press machine—both work the exact same Pectoralis Major fibers safely.',
          },
          {
            question: 'How do I know if 20–30 lbs is the right starting weight?',
            answer:
              'Reps 1 to 7 should feel smooth and controlled. Reps 8 to 10 should feel noticeably slower, like you could only do 2 more reps with clean form.',
          },
          {
            question: 'My front shoulders feel it more than my chest—how do I fix that?',
            answer:
              'Drop the seat by 1 notch so the handles sit slightly lower across your mid-chest, and imagine squeezing your biceps toward each other as you press.',
          },
        ],
      },
      {
        id: 'dumbbell-bench',
        name: 'Dumbbell Bench',
        subtitle: 'Moderate Balance',
        badgeText: 'Free Weight',
        badgeVariant: 'neutral',
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '75–90 sec',
        safetyAngleTitle: 'Natural Arc Path: 60°',
        safetyAngleDesc:
          'Angle dumbbells at 45–60° rather than perpendicular to your torso.',
        youtubeId: 'VmB1G1K7v94',
        youtubeTitle: 'Dumbbell Bench Press Tutorial',
        steps: [
          {
            title: 'Kick-Up Setup:',
            text: 'Sit on the flat bench edge with dumbbells resting vertically on your ',
            highlight: 'lower thighs near knees',
          },
          {
            title: 'Roll Back Safely:',
            text: 'Lie back while driving knees up one at a time to bring the dumbbells smoothly to chest level.',
          },
          {
            title: 'The Movement:',
            text: 'Press dumbbells up over your mid-chest without clanking them together at the top. Lower slowly over 3 seconds.',
          },
        ],
        avoidThis:
          'Dropping dumbbells sideways onto the floor after your last rep.',
        doThis: 'Bring knees up to meet the dumbbells and roll forward (',
        doThisMetric: '60° grip',
        angles: {
          'Side 45°': {
            title: 'Natural Arc Path: 60°',
            description:
              'Lower dumbbells until elbows reach bench pad height—no deeper needed on Day 1.',
            vectorLabel: 'HUMERAL DEPTH: 0° BENCH PLANE',
            timestamp: 8,
          },
          'Front View': {
            title: 'Independent Arm Control',
            description:
              'Keep both dumbbells rising at the exact same speed to train stabilizer muscles.',
            vectorLabel: 'BILATERAL SYNC: 98%',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Flat Bench Zero-Pin Mode',
            description:
              'Verify the bench backrest pin is locked in the horizontal 0° flat slot before sitting.',
            vectorLabel: 'BENCH INCLINE: 0° FLAT',
            pinLevel: '0° Flat',
            timestamp: 50,
          },
        },
        coachTips: [
          {
            question: 'My arms wobble slightly with dumbbells—is that normal?',
            answer:
              '100% normal on Day 1! That slight wobble is your rotator cuff stabilizer muscles waking up. Within 2 weeks of practice, the path becomes rock solid.',
          },
        ],
      },
      {
        id: 'incline-db-press',
        name: 'Incline DB Press',
        subtitle: 'Bench Angle 30°',
        badgeText: 'Upper Clavicle',
        badgeVariant: 'neutral',
        startingWeight: '12 – 20 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '75–90 sec',
        safetyAngleTitle: 'Bench Incline: 30° Slot',
        safetyAngleDesc:
          'Use the 2nd notch up (30°)—steeper angles shift load away from chest onto shoulders.',
        youtubeId: '8iPEnn-ltC8',
        youtubeTitle: 'How to Incline Dumbbell Press',
        steps: [
          {
            title: 'Bench Calibration:',
            text: 'Lift the adjustable backrest and lock the pin into the ',
            highlight: '30° low-incline notch',
          },
          {
            title: 'Upper Back Arch:',
            text: 'Set your upper back firmly into the angled pad and keep heels planted beneath your knees.',
          },
          {
            title: 'The Movement:',
            text: 'Press straight up toward the ceiling line above your collarbone. Pause 1 second at the bottom stretch.',
          },
        ],
        avoidThis:
          'Setting the bench too steep at 60° (turns it into a shoulder press).',
        doThis: 'Use the 1st or 2nd incline notch above flat (',
        doThisMetric: '30° angle',
        angles: {
          'Side 45°': {
            title: 'Bench Incline: 30° Slot',
            description:
              '30° targets the upper clavicular head of the chest while protecting the shoulder joint.',
            vectorLabel: 'BENCH ANGLE: 30.0°',
            timestamp: 10,
          },
          'Front View': {
            title: 'Clavicular Drive Path',
            description:
              'Drive forearms vertically so weights finish directly over your upper chest.',
            vectorLabel: 'UPPER PEC FOCUS: HIGH',
            timestamp: 32,
          },
          'Seat Pin': {
            title: 'Dual-Pin Bench Setup',
            description:
              'Tilt seat base up 1 notch (15°) so your hips do not slide down during the press.',
            vectorLabel: 'BACK: 30° | SEAT: 15°',
            pinLevel: 'Notch 2 (30°)',
            timestamp: 55,
          },
        },
        coachTips: [
          {
            question: 'Should I use lighter weights on Incline than Flat Bench?',
            answer:
              'Yes! Because the upper chest is a smaller muscle region, using 20% lighter dumbbells on Incline is standard for lifters of all levels.',
          },
        ],
      },
      {
        id: 'cable-chest-fly',
        name: 'Cable Chest Fly',
        subtitle: 'Smooth Constant Tension',
        badgeText: 'Low Joint Stress',
        badgeVariant: 'secondary',
        startingWeight: '10 – 15 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Soft Elbow Hug: 15° Bend',
        safetyAngleDesc:
          'Maintain a soft, fixed bend in your elbows—like hugging a wide tree trunk.',
        youtubeId: 'taI4XduLpBe',
        youtubeTitle: 'Cable Chest Fly Form Guide',
        steps: [
          {
            title: 'Pulley Height:',
            text: 'Slide both dual-cable pulleys and lock the pins at ',
            highlight: 'mid-chest height',
          },
          {
            title: 'Staggered Stance:',
            text: 'Grab both D-handles and step 1 foot forward into a balanced split stance for zero lower-back strain.',
          },
          {
            title: 'The Movement:',
            text: 'Sweep hands together in a wide arc until knuckles lightly meet in front of your sternum.',
          },
        ],
        avoidThis:
          'Letting the cables yank your arms behind your torso at the back.',
        doThis: 'Stop when elbows are even with your torso (',
        doThisMetric: '15° bend',
        angles: {
          'Side 45°': {
            title: 'Soft Elbow Hug: 15° Bend',
            description:
              'Never let your hands drift behind your shoulder line during the return phase.',
            vectorLabel: 'ELBOW FLEXION: 15° LOCKED',
            timestamp: 12,
          },
          'Front View': {
            title: 'Wide Horizontal Arc',
            description:
              'Squeeze inner chest for 1 full second when handles meet at the centerline.',
            vectorLabel: 'PEAK CONTRACTION: 1.0s',
            timestamp: 35,
          },
          'Seat Pin': {
            title: 'Pulley Carriage Pin #7',
            description:
              'Set both left and right pulley carriages to matching laser-etched number #7.',
            vectorLabel: 'CARRIAGE PIN: #7 BOTH SIDES',
            pinLevel: 'Pulley #7',
            timestamp: 58,
          },
        },
        coachTips: [
          {
            question: 'Why does the cable stack feel heavier or lighter than other machines?',
            answer:
              'Cable stacks use different pulley ratios (2:1 vs 1:1). Ignore the number printed on the plate and choose the pin where 12 smooth reps feel challenging.',
          },
        ],
      },
    ],
  },
  shoulders: {
    id: 'shoulders',
    shortName: 'Deltoids',
    focusLabel: 'Active Focus: Deltoids',
    subHeader: 'Anterior & Lateral Deltoid • Trapezius stabilizer',
    anatomicalName: 'Deltoid Complex',
    roleBadge: 'Overhead Mover',
    description:
      'Caps the shoulder joint in three distinct heads. Training deltoids creates shoulder width, overhead reach stability, and injury-resilient posture.',
    synergistsLabel: 'Triceps + Upper Traps',
    synergistMuscleIds: ['triceps', 'chest'],
    region: 'upper',
    side: 'front',
    readinessScore: 91,
    suggestedNextMuscleId: 'lats',
    suggestedNextLabel: 'Wide-Grip Lat Pulldown',
    suggestedNextRelation: '(Vertical pull balance)',
    exercises: [
      {
        id: 'shoulder-press-machine',
        name: 'Shoulder Press Machine',
        subtitle: 'Guided Vertical Track',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '60–75 sec',
        safetyAngleTitle: 'Scapular Plane: 30° Forward',
        safetyAngleDesc:
          'Use the neutral or slightly angled handles to keep shoulders in their natural socket groove.',
        youtubeId: '_QlLSbNbIwg',
        youtubeTitle: 'Seated Machine Shoulder Press Tutorial',
        steps: [
          {
            title: 'Seat Adjustment:',
            text: 'Adjust the yellow seat pin so the handles start right at ',
            highlight: 'earlobe / jawline height',
          },
          {
            title: 'Back Support:',
            text: 'Keep your lower and upper back glued flat against the vertical backrest pad—do not arch.',
          },
          {
            title: 'The Movement:',
            text: 'Press smoothly overhead until arms are almost extended. Lower under control until hands reach chin level.',
          },
        ],
        avoidThis:
          'Shrugging your shoulders up toward your ears as you press up.',
        doThis: 'Keep shoulders depressed down and elbows slightly forward (',
        doThisMetric: '30° plane',
        angles: {
          'Side 45°': {
            title: 'Scapular Plane: 30° Forward',
            description:
              'Keep lower ribs tucked down so your lower back stays flush with the pad.',
            vectorLabel: 'SCAPULAR ANGLE: 30° SAFE',
            timestamp: 8,
          },
          'Front View': {
            title: 'Vertical Forearm Track',
            description:
              'Wrists stay stacked directly above elbows throughout the entire press.',
            vectorLabel: 'WRIST-ELBOW STACK: 90°',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Seat Pop-Pin Notch #3–4',
            description:
              'Set seat so handles never drop below your collarbone at the bottom stop.',
            vectorLabel: 'PIN NOTCH: #3 (CHIN LINE)',
            pinLevel: 'Notch 3',
            timestamp: 48,
          },
        },
        coachTips: [
          {
            question: 'Should I use the wide handles or the inward-facing handles?',
            answer:
              'On Day 1, use the inward-facing (neutral grip) handles! They naturally rotate your shoulder blades into a pinch-free angle.',
          },
        ],
      },
      {
        id: 'lateral-raise-machine',
        name: 'Lateral Raise Machine',
        subtitle: 'Side Delt Isolation',
        badgeText: 'Machine Guided',
        badgeVariant: 'secondary',
        startingWeight: '10 – 20 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Top Stop: 85° Shoulder Line',
        safetyAngleDesc:
          'Raise elbow pads just to shoulder height—going higher shifts work into neck traps.',
        youtubeId: '3VcKaXpzqRo',
        youtubeTitle: 'Lateral Raise Machine Form',
        steps: [
          {
            title: 'Pivot Alignment:',
            text: 'Adjust seat height so your shoulder joint aligns with the ',
            highlight: 'red mechanical pivot dot',
          },
          {
            title: 'Pad Contact:',
            text: 'Rest the sides of your lower arms against the padded rollers; relax your grip on the handles.',
          },
          {
            title: 'The Movement:',
            text: 'Drive outward with your elbows—not your hands—until arms are parallel to the floor.',
          },
        ],
        avoidThis: 'Swinging torso or raising elbows way above shoulder height.',
        doThis: 'Lead with your elbows up to horizontal (',
        doThisMetric: '85° peak',
        angles: {
          'Side 45°': {
            title: 'Top Stop: 85° Shoulder Line',
            description:
              'Keep chest tall against the front pad if seated backward, or spine against backrest.',
            vectorLabel: 'ABDUCTION LIMIT: 85°',
            timestamp: 10,
          },
          'Front View': {
            title: 'Lead With Elbows',
            description:
              'Imagine pouring out two pitchers of water gently at the top of the motion.',
            vectorLabel: 'MEDIAL DELT ISOLATION: 94%',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Align Shoulder to Red Pivot',
            description:
              'Match the outer tip of your shoulder bone with the machine axis marker.',
            vectorLabel: 'AXIS ALIGNMENT: VERIFIED',
            pinLevel: 'Notch 5',
            timestamp: 50,
          },
        },
        coachTips: [
          {
            question: 'Why does 15 lbs feel so heavy on Lateral Raises?',
            answer:
              'Because the lateral deltoid is a small muscle working on a long lever arm! Even experienced lifters use very light weights here.',
          },
        ],
      },
      {
        id: 'cable-face-pull',
        name: 'Cable Face Pull',
        subtitle: 'Posture & Rear Delts',
        badgeText: 'Desk Worker Fix',
        badgeVariant: 'secondary',
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 15 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'External Rotation: 90°',
        safetyAngleDesc:
          'Pull the rope ends apart toward your temples so thumbs point backward.',
        youtubeId: 'rep-qVOkqgk',
        youtubeTitle: 'How to Do Face Pulls Correctly',
        steps: [
          {
            title: 'Pulley Height:',
            text: 'Attach the double-rope attachment and lock the pulley at ',
            highlight: 'upper forehead height',
          },
          {
            title: 'Grip & Stance:',
            text: 'Hold the rope knots with thumbs pointing backward. Step back until arms are fully extended.',
          },
          {
            title: 'The Movement:',
            text: 'Pull the center of the rope toward your nose while flaring elbows wide and squeezing shoulder blades.',
          },
        ],
        avoidThis: 'Pulling down toward your chest or leaning backward heavily.',
        doThis: 'Pull high toward your forehead with thumbs back (',
        doThisMetric: '90° flare',
        angles: {
          'Side 45°': {
            title: 'External Rotation: 90°',
            description:
              'Finish in a double-biceps pose so your forearms are vertical at the end of each rep.',
            vectorLabel: 'CUFF ROTATION: +90°',
            timestamp: 8,
          },
          'Front View': {
            title: 'Split the Rope Wide',
            description:
              'Pull the two rope ends apart as they approach your cheekbones.',
            vectorLabel: 'REAR DELT ACTIVATION: MAX',
            timestamp: 25,
          },
          'Seat Pin': {
            title: 'High Pulley Notch #14',
            description:
              'Set pulley carriage to eye or forehead level (#14 on standard cable columns).',
            vectorLabel: 'PULLEY NOTCH: #14 (EYE LINE)',
            pinLevel: 'Pulley #14',
            timestamp: 45,
          },
        },
        coachTips: [
          {
            question: 'Why do coaches love Face Pulls for beginners?',
            answer:
              'They strengthen the rear shoulders and rotator cuffs, undoing hours of sitting at a laptop and keeping your shoulders pain-free on pressing machines.',
          },
        ],
      },
      {
        id: 'seated-db-shoulder-press',
        name: 'Seated DB Press',
        subtitle: 'Balanced Overhead',
        badgeText: 'Free Weight',
        badgeVariant: 'neutral',
        startingWeight: '10 – 20 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '75 sec',
        safetyAngleTitle: 'Backrest Angle: 75°–80°',
        safetyAngleDesc:
          'Set the bench one notch shy of vertical (75°–80°) for comfortable shoulder clearance.',
        youtubeId: 'qEwKCR5JCog',
        youtubeTitle: 'Seated Dumbbell Shoulder Press Guide',
        steps: [
          {
            title: 'Bench Setup:',
            text: 'Lock the adjustable bench backrest one notch below upright at ',
            highlight: '75°–80° high incline',
          },
          {
            title: 'Starting Position:',
            text: 'Bring dumbbells to ear level with palms turned slightly inward (45° neutral angle).',
          },
          {
            title: 'The Movement:',
            text: 'Press vertically overhead without arching your spine off the pad. Lower smoothly to ear level.',
          },
        ],
        avoidThis: 'Flaring elbows 90° straight back against the wall.',
        doThis: 'Keep elbows angled 30° forward in your field of view (',
        doThisMetric: '75° bench',
        angles: {
          'Side 45°': {
            title: 'Backrest Angle: 75°–80°',
            description:
              'A slight 10° recline prevents lumbar arching while pressing overhead.',
            vectorLabel: 'LUMBAR LOAD: MINIMAL',
            timestamp: 12,
          },
          'Front View': {
            title: 'Controlled Convergence',
            description:
              'Dumbbells travel slightly inward overhead without colliding.',
            vectorLabel: 'OVERHEAD ARC: SMOOTH',
            timestamp: 32,
          },
          'Seat Pin': {
            title: 'Bench Backrest Notch #5',
            description:
              'Lock backrest at the 75° upright slot and tilt seat base up 1 notch.',
            vectorLabel: 'BENCH PIN: #5 (75° UPRIGHT)',
            pinLevel: 'Notch 5 (75°)',
            timestamp: 52,
          },
        },
        coachTips: [],
      },
    ],
  },
  biceps: {
    id: 'biceps',
    shortName: 'Biceps',
    focusLabel: 'Active Focus: Biceps',
    subHeader: 'Biceps Brachii • Brachialis forearm assist',
    anatomicalName: 'Biceps Brachii',
    roleBadge: 'Elbow Flexor',
    description:
      'Controls elbow flexion and forearm supination (turning the palm up). Strong biceps support every pulling exercise and protect the elbow joint.',
    synergistsLabel: 'Brachialis + Forearms',
    synergistMuscleIds: ['lats', 'shoulders'],
    region: 'upper',
    side: 'front',
    readinessScore: 94,
    suggestedNextMuscleId: 'triceps',
    suggestedNextLabel: 'Triceps Pushdown',
    suggestedNextRelation: '(Arm antagonist pair)',
    exercises: [
      {
        id: 'preacher-curl-machine',
        name: 'Preacher Curl Machine',
        subtitle: 'Locked Elbow Pad • Zero Swing',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Bottom Stretch: 160° Soft Stop',
        safetyAngleDesc:
          'Leave a slight 15–20° bend at the bottom of the pad to protect the biceps tendon.',
        youtubeId: 'fIWP-FRFNU0',
        youtubeTitle: 'Preacher Curl Machine Proper Form',
        steps: [
          {
            title: 'Seat Adjustment:',
            text: 'Set the seat height so your armpits rest snugly atop the ',
            highlight: 'upper edge of the angled pad',
          },
          {
            title: 'Triceps Contact:',
            text: 'Keep the entire back of your upper arms glued flat against the cushion throughout the set.',
          },
          {
            title: 'The Movement:',
            text: 'Curl the handles smoothly toward your shoulders, squeeze 1 second, and lower over 3 seconds.',
          },
        ],
        avoidThis: 'Lifting your elbows or standing up off the seat to heave weight.',
        doThis: 'Keep armpits anchored on the pad and stop just shy of lockout (',
        doThisMetric: '160° bottom',
        angles: {
          'Side 45°': {
            title: 'Bottom Stretch: 160° Soft Stop',
            description:
              'Full control on the way down builds twice as much strength as rushing.',
            vectorLabel: 'TENDON STRAIN: LOW',
            timestamp: 10,
          },
          'Front View': {
            title: 'Supinated Grip Alignment',
            description:
              'Hold the angled cambered handles so wrists feel completely natural.',
            vectorLabel: 'WRIST TORQUE: NEUTRAL',
            timestamp: 25,
          },
          'Seat Pin': {
            title: 'Seat Pop-Pin Notch #4',
            description:
              'No gap should exist between your armpit and the top roller of the preacher pad.',
            vectorLabel: 'PAD CONTACT: 100%',
            pinLevel: 'Notch 4',
            timestamp: 45,
          },
        },
        coachTips: [
          {
            question: 'Why use the Preacher Curl machine instead of standing barbell curls?',
            answer:
              'The angled arm pad makes it impossible to swing your lower back, meaning 100% of the work goes safely into your biceps.',
          },
        ],
      },
      {
        id: 'cable-hammer-curl',
        name: 'Cable Rope Hammer Curl',
        subtitle: 'Joint-Friendly Neutral Grip',
        badgeText: 'Low Joint Stress',
        badgeVariant: 'secondary',
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Pinned Elbows: 0° Drift',
        safetyAngleDesc:
          'Keep elbows glued to your ribcage like they are pinned to your sides.',
        youtubeId: 'TwD-YGVP4Bk',
        youtubeTitle: 'Cable Rope Hammer Curl Guide',
        steps: [
          {
            title: 'Low Pulley Setup:',
            text: 'Lock the cable pulley at the ',
            highlight: 'lowest bottom notch (#1)',
          },
          {
            title: 'Neutral Grip:',
            text: 'Hold the rope with palms facing each other (thumbs pointing up toward the ceiling).',
          },
          {
            title: 'The Movement:',
            text: 'Curl your thumbs toward your shoulders while keeping upper arms completely stationary.',
          },
        ],
        avoidThis: 'Swinging elbows forward to lift the stack.',
        doThis: 'Pin upper arms to your sides and curl with thumbs up (',
        doThisMetric: '0° elbow drift',
        angles: {
          'Side 45°': {
            title: 'Pinned Elbows: 0° Drift',
            description:
              'Only your forearms should move through space—upper arms stay vertical.',
            vectorLabel: 'HUMERAL DRIFT: 0.0°',
            timestamp: 10,
          },
          'Front View': {
            title: 'Brachialis & Biceps Peak',
            description:
              'Neutral grip targets both the biceps and the underlying brachialis muscle.',
            vectorLabel: 'FOREARM SYNERGY: OPTIMAL',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Pulley Carriage Pin #1',
            description:
              'Slide the cable carriage all the way down to position #1 near the floor.',
            vectorLabel: 'PULLEY NOTCH: #1 (FLOOR)',
            pinLevel: 'Pulley #1',
            timestamp: 45,
          },
        },
        coachTips: [],
      },
      {
        id: 'incline-db-curl',
        name: 'Seated Incline DB Curl',
        subtitle: 'Long-Head Stretch',
        badgeText: 'Free Weight',
        badgeVariant: 'neutral',
        startingWeight: '10 – 15 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Bench Angle: 60° Recline',
        safetyAngleDesc:
          'Resting against a 60° bench prevents torso swinging and gently stretches the biceps.',
        youtubeId: 'soxrZlIl35U',
        youtubeTitle: 'Incline Dumbbell Curl Form',
        steps: [
          {
            title: 'Bench Calibration:',
            text: 'Set the adjustable bench backrest to a ',
            highlight: '60° upright incline',
          },
          {
            title: 'Dead Hang Start:',
            text: 'Let arms hang straight toward the floor with shoulder blades pinned to the pad.',
          },
          {
            title: 'The Movement:',
            text: 'Rotate palms upward as you curl both dumbbells together. Lower slowly over 3 seconds.',
          },
        ],
        avoidThis: 'Using heavy dumbbells that force your head off the backrest.',
        doThis: 'Use lighter dumbbells and keep shoulders back against the pad (',
        doThisMetric: '60° bench',
        angles: {
          'Side 45°': {
            title: 'Bench Angle: 60° Recline',
            description:
              'Keep elbows pointing straight at the floor throughout the curl.',
            vectorLabel: 'LONG HEAD STRETCH: HIGH',
            timestamp: 12,
          },
          'Front View': {
            title: 'Supination Twist',
            description:
              'Turn pinkies slightly inward at the top of the curl for full contraction.',
            vectorLabel: 'SUPINATION: FULL',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Bench Backrest Notch #4',
            description:
              'Set bench backrest to 60° (usually the 4th slot from flat).',
            vectorLabel: 'BENCH PIN: #4 (60°)',
            pinLevel: 'Notch 4 (60°)',
            timestamp: 50,
          },
        },
        coachTips: [],
      },
      {
        id: 'ez-bar-cable-curl',
        name: 'EZ-Bar Cable Curl',
        subtitle: 'Angled Wrist Relief',
        badgeText: 'Machine Guided',
        badgeVariant: 'secondary',
        startingWeight: '20 – 30 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Cambered Grip: 25° Angle',
        safetyAngleDesc:
          'Grip the wavy inner bends of the bar to take all twisting strain off your wrists.',
        youtubeId: 'opF_kZ2f3Qc',
        youtubeTitle: 'Cable EZ Bar Bicep Curl',
        steps: [
          {
            title: 'Attachment Setup:',
            text: 'Clip the wavy EZ-curl bar attachment onto the ',
            highlight: 'bottom cable carabiner',
          },
          {
            title: 'Posture Check:',
            text: 'Stand tall with knees softly bent and elbows tucked lightly against your sides.',
          },
          {
            title: 'The Movement:',
            text: 'Curl the bar in a smooth arc toward your upper chest, pause 1 second, and return slowly.',
          },
        ],
        avoidThis: 'Curling your wrists inward toward your forearms.',
        doThis: 'Keep knuckles flat in line with your forearms (',
        doThisMetric: '25° bar bend',
        angles: {
          'Side 45°': {
            title: 'Cambered Grip: 25° Angle',
            description:
              'Constant cable tension keeps the muscle engaged even at the top.',
            vectorLabel: 'TENSION CURVE: CONSTANT',
            timestamp: 8,
          },
          'Front View': {
            title: 'Shoulder-Width Grip',
            description:
              'Hands sit naturally on the outer angled grooves of the EZ bar.',
            vectorLabel: 'WRIST RELIEF: ACTIVE',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Pulley Carriage Pin #1',
            description:
              'Lock pulley at the bottom-most setting (#1) before clipping bar.',
            vectorLabel: 'PULLEY NOTCH: #1',
            pinLevel: 'Pulley #1',
            timestamp: 45,
          },
        },
        coachTips: [],
      },
    ],
  },
  abs: {
    id: 'abs',
    shortName: 'Core Stabilizer',
    focusLabel: 'Active Focus: Core & Abs',
    subHeader: 'Rectus Abdominis • Transverse Abdominis brace',
    anatomicalName: 'Rectus Abdominis',
    roleBadge: 'Spinal Stabilizer',
    description:
      'Braces the trunk, protects the lower lumbar spine during all lifts, and controls rib-to-pelvis flexion. Essential foundation for every gym movement.',
    synergistsLabel: 'Obliques + Hip Flexors',
    synergistMuscleIds: ['quads', 'glutes'],
    region: 'core',
    side: 'front',
    readinessScore: 95,
    suggestedNextMuscleId: 'quads',
    suggestedNextLabel: 'Seated Leg Press',
    suggestedNextRelation: '(Lower body foundation)',
    exercises: [
      {
        id: 'ab-crunch-machine',
        name: 'Abdominal Crunch Machine',
        subtitle: 'Guided Spinal Flexion',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '20 – 30 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Rib-to-Pelvis Arc: 30°',
        safetyAngleDesc:
          'Curl your ribs down toward your belt buckle rather than folding flat at the hips.',
        youtubeId: 'Z57CtFmrmmA',
        youtubeTitle: 'Ab Machine Crunch Form',
        steps: [
          {
            title: 'Seat & Foot Rollers:',
            text: 'Sit tall and hook your ankles comfortably behind the ',
            highlight: 'lower foam foot rollers',
          },
          {
            title: 'Upper Handles:',
            text: 'Hold the top handles near your shoulders and rest the back of your arms on the pads.',
          },
          {
            title: 'The Movement:',
            text: 'Exhale all your air as you curl your ribs down 30°. Pause 1 second and return slowly.',
          },
        ],
        avoidThis: 'Pulling with your arms or jerking the weight stack fast.',
        doThis: 'Exhale forcefully and curl your sternum down (',
        doThisMetric: '30° rib curl',
        angles: {
          'Side 45°': {
            title: 'Rib-to-Pelvis Arc: 30°',
            description:
              'A short, controlled 30° thoracic curl maximally activates the six-pack muscles.',
            vectorLabel: 'THORACIC FLEXION: 30°',
            timestamp: 8,
          },
          'Front View': {
            title: 'Even Abdominal Brace',
            description:
              'Keep chin slightly tucked—never pull on your neck.',
            vectorLabel: 'CORE ENGAGEMENT: 96%',
            timestamp: 25,
          },
          'Seat Pin': {
            title: 'Seat Pop-Pin Notch #3',
            description:
              'Align the machine pivot with your mid-riff (just above your naval).',
            vectorLabel: 'PIVOT: MID-ABDOMEN',
            pinLevel: 'Notch 3',
            timestamp: 45,
          },
        },
        coachTips: [
          {
            question: 'Why does exhaling matter so much on ab exercises?',
            answer:
              'Your abdominal muscles also help expel air! Breathing out completely at the crunch peak allows your abs to contract 30% harder.',
          },
        ],
      },
      {
        id: 'pallof-cable-press',
        name: 'Pallof Cable Press',
        subtitle: 'Zero-Spine-Bending Core Brace',
        badgeText: 'Low Joint Stress',
        badgeVariant: 'secondary',
        startingWeight: '10 – 15 lbs',
        targetVolume: '3 × 10 / side',
        restInterval: '60 sec',
        safetyAngleTitle: 'Anti-Rotation Lock: 0° Twist',
        safetyAngleDesc:
          'Resist the cable pulling you sideways—your torso stays squared forward like a statue.',
        youtubeId: '5_8qojbl9wI',
        youtubeTitle: 'Pallof Press Tutorial',
        steps: [
          {
            title: 'Pulley Height:',
            text: 'Clip a single D-handle onto the cable column at ',
            highlight: 'sternum / chest height',
          },
          {
            title: 'Sideways Stance:',
            text: 'Stand perpendicular to the machine, hold the handle at your chest with both hands, and step out.',
          },
          {
            title: 'The Movement:',
            text: 'Press the handle straight out in front of your chest, hold 2 seconds resisting the twist, and return.',
          },
        ],
        avoidThis: 'Letting the cable twist your shoulders toward the weight stack.',
        doThis: 'Stand feet wider than hips and lock ribs over pelvis (',
        doThisMetric: '0° rotation',
        angles: {
          'Side 45°': {
            title: 'Anti-Rotation Lock: 0° Twist',
            description:
              'Keeps the spine 100% neutral while firing deep internal obliques.',
            vectorLabel: 'LUMBAR SHEAR: ZERO',
            timestamp: 10,
          },
          'Front View': {
            title: 'Centerline Extension',
            description:
              'Hands press straight along the button line of your shirt.',
            vectorLabel: 'ANTI-TORQUE: ACTIVE',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Pulley Carriage Pin #8',
            description:
              'Set cable carriage to mid-torso height (#8 on standard columns).',
            vectorLabel: 'PULLEY NOTCH: #8',
            pinLevel: 'Pulley #8',
            timestamp: 50,
          },
        },
        coachTips: [],
      },
      {
        id: 'dead-bug-floor',
        name: 'Dead Bug Floor Press',
        subtitle: 'Flat Lower-Back Guarantee',
        badgeText: 'Mat Area',
        badgeVariant: 'primary',
        startingWeight: 'Bodyweight',
        targetVolume: '3 × 8 / side',
        restInterval: '45 sec',
        safetyAngleTitle: 'Lumbar Seal: 0 mm Gap',
        safetyAngleDesc:
          'Press your lower back gently into the floor mat so no air gap forms underneath.',
        youtubeId: '4XLEnwUr1d8',
        youtubeTitle: 'How To Do The Dead Bug Correctly',
        steps: [
          {
            title: 'Tabletop Start:',
            text: 'Lie on a gym mat with arms pointing straight up and knees bent at ',
            highlight: '90° tabletop angle',
          },
          {
            title: 'Flatten Lower Back:',
            text: 'Gently tilt your pelvis so your lower back presses flush into the mat.',
          },
          {
            title: 'The Movement:',
            text: 'Slowly reach your right arm and left leg toward the floor, then return and switch sides.',
          },
        ],
        avoidThis: 'Arching your lower back off the mat as your leg lowers.',
        doThis: 'Only lower your heel as far as your back stays flat (',
        doThisMetric: '90° knee start',
        angles: {
          'Side 45°': {
            title: 'Lumbar Seal: 0 mm Gap',
            description:
              'The gold-standard physical therapy core exercise for beginners.',
            vectorLabel: 'PELVIC TILT: POSTERIOR LOCK',
            timestamp: 8,
          },
          'Front View': {
            title: 'Contralateral Coordination',
            description:
              'Opposite arm and opposite leg move in slow, synchronized unison.',
            vectorLabel: 'TEMPO: 3s OUT / 2s IN',
            timestamp: 25,
          },
          'Seat Pin': {
            title: 'Floor Mat Zone (No Pins)',
            description:
              'Grab any padded stretching mat in the turf or warmup area.',
            vectorLabel: 'EQUIPMENT: FLOOR MAT',
            pinLevel: 'Floor Mat',
            timestamp: 40,
          },
        },
        coachTips: [],
      },
      {
        id: 'incline-plank-hold',
        name: 'Incline Bench Plank',
        subtitle: 'Beginner-Scaled Isometric',
        badgeText: 'Zero Wrist Pain',
        badgeVariant: 'neutral',
        startingWeight: 'Bodyweight',
        targetVolume: '3 × 30 sec',
        restInterval: '45 sec',
        safetyAngleTitle: 'Straight Line: 180° Spine',
        safetyAngleDesc:
          'Keep ears, shoulders, hips, and ankles in one straight diagonal line.',
        youtubeId: '4_Q0rY6v4_o',
        youtubeTitle: 'Incline Plank Form Guide',
        steps: [
          {
            title: 'Forearm Placement:',
            text: 'Rest your forearms squarely on a ',
            highlight: 'flat or slightly inclined bench pad',
          },
          {
            title: 'Glute & Core Squeeze:',
            text: 'Step your feet back, squeeze your glutes, and brace your stomach like preparing for a poke.',
          },
          {
            title: 'The Hold:',
            text: 'Breathe steadily through your nose for 30 seconds without holding your breath.',
          },
        ],
        avoidThis: 'Letting your hips sag downward toward the bench edge.',
        doThis: 'Tuck your tailbone slightly and squeeze glutes (',
        doThisMetric: '180° alignment',
        angles: {
          'Side 45°': {
            title: 'Straight Line: 180° Spine',
            description:
              'Elevating your forearms on a bench reduces lower-back fatigue while building core endurance.',
            vectorLabel: 'SPINAL ALIGNMENT: 180°',
            timestamp: 10,
          },
          'Front View': {
            title: 'Shoulder Blades Protracted',
            description:
              'Push the bench away through your elbows so your upper back stays strong.',
            vectorLabel: 'SCAPULAR STABILITY: HIGH',
            timestamp: 25,
          },
          'Seat Pin': {
            title: 'Flat Bench Pad',
            description:
              'Use a standard flat bench or 30° incline bench for comfort.',
            vectorLabel: 'BENCH: 0° OR 30°',
            pinLevel: 'Flat Pad',
            timestamp: 45,
          },
        },
        coachTips: [],
      },
    ],
  },
  quads: {
    id: 'quads',
    shortName: 'Quadriceps',
    focusLabel: 'Active Focus: Quadriceps',
    subHeader: 'Quadriceps Femoris • Gluteus Maximus assist',
    anatomicalName: 'Quadriceps Femoris',
    roleBadge: 'Primary Knee Extensor',
    description:
      'The four-headed powerhouse on the front of the thigh. Drives standing up, climbing stairs, knee joint stability, and full lower-body metabolic output.',
    synergistsLabel: 'Glutes + Adductors',
    synergistMuscleIds: ['glutes', 'calves'],
    region: 'lower',
    side: 'front',
    readinessScore: 90,
    suggestedNextMuscleId: 'glutes',
    suggestedNextLabel: 'Seated Leg Curl Machine',
    suggestedNextRelation: '(Hamstring balance)',
    exercises: [
      {
        id: 'seated-leg-press',
        name: 'Seated Leg Press',
        subtitle: 'Back-Supported Squat Path',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '50 – 80 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '75–90 sec',
        safetyAngleTitle: 'Knee Flexion Depth: 90°',
        safetyAngleDesc:
          'Lower the sled until knees form a clean 90° right angle, keeping heels flat on the platform.',
        youtubeId: 'IZxyjW7MPJQ',
        youtubeTitle: 'How to Leg Press Proper Form',
        steps: [
          {
            title: 'Seat Distance Pin:',
            text: 'Pull the yellow floor lever under the seat so your knees start at a ',
            highlight: 'comfortable 90° angle',
          },
          {
            title: 'Foot Placement:',
            text: 'Place feet hip-width apart in the middle of the footplate with toes turned out 10–15°.',
          },
          {
            title: 'The Movement:',
            text: 'Push through your whole foot until legs are 95% straight—never snap or lock your knees hard at the top.',
          },
        ],
        avoidThis:
          'Locking knees completely straight at the top or letting heels lift.',
        doThis: 'Keep a soft 5° knee bend at the top and push through mid-foot (',
        doThisMetric: '90° knee depth',
        angles: {
          'Side 45°': {
            title: 'Knee Flexion Depth: 90°',
            description:
              'Keep your lower tailbone glued into the seat crease—never let hips curl off the pad.',
            vectorLabel: 'KNEE FLEXION: 90° SAFE STOP',
            timestamp: 8,
          },
          'Front View': {
            title: 'Knees Track Over Toes',
            description:
              'Prevent knees from caving inward toward each other; push them slightly out in line with toes.',
            vectorLabel: 'VALGUS DRIFT: 0° (ALIGNED)',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Sled Rail Pin Notch #4–5',
            description:
              'Horizontal pin-loaded Leg Press requires zero manual plate loading or safety latches.',
            vectorLabel: 'CARRIAGE RAIL: NOTCH #4',
            pinLevel: 'Rail #4',
            timestamp: 50,
          },
        },
        coachTips: [
          {
            question: 'What is the difference between the Horizontal Leg Press and the 45° Sled?',
            answer:
              'Start on the Horizontal Seated Leg Press (with a weight stack and pin)! You just move the seat pin—no heavy 45-lb metal plates or manual safety handles to worry about.',
          },
        ],
      },
      {
        id: 'leg-extension-machine',
        name: 'Leg Extension Machine',
        subtitle: 'Targeted Quad & Knee Strength',
        badgeText: 'Machine Guided',
        badgeVariant: 'secondary',
        startingWeight: '25 – 40 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Knee Axis Alignment',
        safetyAngleDesc:
          'Line up the bend of your knee snug against the curved front edge of the seat.',
        youtubeId: 'YyvSfV_88Ts',
        youtubeTitle: 'Leg Extension Machine Tutorial',
        steps: [
          {
            title: 'Backrest Depth:',
            text: 'Slide the backrest pad so the curved edge of the seat fits snugly behind your ',
            highlight: 'knee joint pivot',
          },
          {
            title: 'Shin Pad Roller:',
            text: 'Adjust the ankle pad so it rests on your lower shins just above your shoelaces.',
          },
          {
            title: 'The Movement:',
            text: 'Extend legs smoothly until straight, pause 1 full second squeezing quads, and lower over 3 seconds.',
          },
        ],
        avoidThis: 'Kicking the weight up violently with momentum.',
        doThis: 'Pause 1 full second at the top of every repetition (',
        doThisMetric: '1s top hold',
        angles: {
          'Side 45°': {
            title: 'Knee Axis Alignment',
            description:
              'Your knee joint should match the red pivot dot on the side of the machine.',
            vectorLabel: 'PATELLAR TRACKING: SMOOTH',
            timestamp: 10,
          },
          'Front View': {
            title: 'Toes Pointed Up (Dorsiflexed)',
            description:
              'Pull toes slightly up toward your shins for balanced inner and outer quad activation.',
            vectorLabel: 'VMO ENGAGEMENT: +18%',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Backrest #3 + Ankle Pad #2',
            description:
              'Two yellow pins: one behind the backrest for leg length, one by the shin roller.',
            vectorLabel: 'BACK: #3 | SHIN: #2',
            pinLevel: 'Dual Pin #3/#2',
            timestamp: 50,
          },
        },
        coachTips: [],
      },
      {
        id: 'goblet-box-squat',
        name: 'Goblet Box Squat',
        subtitle: 'Bench Target Depth Guarantee',
        badgeText: 'Confidence Builder',
        badgeVariant: 'primary',
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '75 sec',
        safetyAngleTitle: 'Natural Counterbalance: 15°',
        safetyAngleDesc:
          'Holding a dumbbell at your chest naturally keeps your torso upright and balanced.',
        youtubeId: 'MeIiIdtwEl4',
        youtubeTitle: 'Goblet Squat Form',
        steps: [
          {
            title: 'Bench Target:',
            text: 'Stand 4 inches in front of a flat bench with feet slightly wider than ',
            highlight: 'shoulder-width apart',
          },
          {
            title: 'Goblet Hold:',
            text: 'Cup one end of a dumbbell vertically against your sternum like holding a heavy goblet.',
          },
          {
            title: 'The Movement:',
            text: 'Sit your hips back and down until you lightly tap the bench pad, then stand right back up.',
          },
        ],
        avoidThis: 'Plopping down and relaxing all tension on the bench.',
        doThis: 'Lightly tap the bench like it is made of glass and stand up (',
        doThisMetric: 'Tap & Go',
        angles: {
          'Side 45°': {
            title: 'Natural Counterbalance: 15°',
            description:
              'The bench behind you removes all fear of losing balance or squatting too deep.',
            vectorLabel: 'TORSO INCLINATION: 15° UPRIGHT',
            timestamp: 10,
          },
          'Front View': {
            title: 'Elbows Inside Knees',
            description:
              'Keep elbows tucked downwards so they lightly brush inside your knees at the bottom.',
            vectorLabel: 'STANCE: SHOULDER WIDTH',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Standard 17" Flat Bench',
            description:
              'Use any standard flat bench as your depth target gauge.',
            vectorLabel: 'TARGET HEIGHT: 17 INCHES',
            pinLevel: '17" Bench',
            timestamp: 50,
          },
        },
        coachTips: [],
      },
      {
        id: 'assisted-split-squat',
        name: 'Supported Split Squat',
        subtitle: 'Hand-Assisted Balance',
        badgeText: 'Single-Leg Balance',
        badgeVariant: 'neutral',
        startingWeight: 'Bodyweight / 10 lbs',
        targetVolume: '3 × 8 / leg',
        restInterval: '60 sec',
        safetyAngleTitle: '90/90 Knee Geometry',
        safetyAngleDesc:
          'Both front and back knees bend to ~90° at the bottom—like an elevator going straight down.',
        youtubeId: '2C-uNgKwPLE',
        youtubeTitle: 'Split Squat Setup & Execution',
        steps: [
          {
            title: 'Hand Support:',
            text: 'Stand next to a sturdy machine frame or upright post and hold it lightly for ',
            highlight: '100% balance stability',
          },
          {
            title: 'Railroad Stance:',
            text: 'Step one foot back on hip-width tracks (not tightrope style). Keep back heel lifted.',
          },
          {
            title: 'The Movement:',
            text: 'Lower your back knee straight toward the floor, then push through your front heel to stand.',
          },
        ],
        avoidThis: 'Stepping on a narrow tightrope line that makes you wobble.',
        doThis: 'Keep feet hip-width apart and hold an upright post for balance (',
        doThisMetric: '90/90 knees',
        angles: {
          'Side 45°': {
            title: '90/90 Knee Geometry',
            description:
              'Think straight down like an elevator, not lunging far forward.',
            vectorLabel: 'VERTICAL DESCENT: 90°/90°',
            timestamp: 8,
          },
          'Front View': {
            title: 'Hip-Width Train Tracks',
            description:
              'Holding a stationary post eliminates balance anxiety so you can focus on leg strength.',
            vectorLabel: 'STABILITY ASSIST: ACTIVE',
            timestamp: 26,
          },
          'Seat Pin': {
            title: 'Bodyweight / Light DB',
            description:
              'Start with bodyweight only on Day 1 while holding an upright rack post.',
            vectorLabel: 'LOAD: BODYWEIGHT START',
            pinLevel: 'No Pin',
            timestamp: 45,
          },
        },
        coachTips: [],
      },
    ],
  },
  calves: {
    id: 'calves',
    shortName: 'Calves',
    focusLabel: 'Active Focus: Calves',
    subHeader: 'Gastrocnemius • Soleus ankle stabilizer',
    anatomicalName: 'Gastrocnemius & Soleus',
    roleBadge: 'Ankle Propulsor',
    description:
      'Powers ankle plantarflexion for walking, running, and lower-leg stability. Training calves improves ankle mobility for deeper squats.',
    synergistsLabel: 'Tibialis + Foot Arch',
    synergistMuscleIds: ['quads', 'glutes'],
    region: 'lower',
    side: 'front',
    readinessScore: 96,
    suggestedNextMuscleId: 'quads',
    suggestedNextLabel: 'Seated Leg Press',
    suggestedNextRelation: '(Compound leg pairing)',
    exercises: [
      {
        id: 'leg-press-calf-push',
        name: 'Leg Press Toe Push',
        subtitle: 'Zero Extra Machine Needed',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '40 – 60 lbs',
        targetVolume: '3 × 15 Reps',
        restInterval: '45 sec',
        safetyAngleTitle: 'Ankle Range: +25° to -15°',
        safetyAngleDesc:
          'Pause for 2 full seconds in the bottom stretch and 1 second at the tiptoe peak.',
        youtubeId: 'IZxyjW7MPJQ',
        youtubeTitle: 'Leg Press Calf Raise Form',
        steps: [
          {
            title: 'Ball-of-Foot Setup:',
            text: 'On the Seated Leg Press, place the balls of your feet near the ',
            highlight: 'bottom edge of the sled plate',
          },
          {
            title: 'Soft Knee Lock:',
            text: 'Push the sled out until your legs are nearly straight with a tiny 5° safety bend.',
          },
          {
            title: 'The Movement:',
            text: 'Press through your big toes to extend your ankles forward, then let heels sink back for a deep stretch.',
          },
        ],
        avoidThis: 'Bouncing rapidly with tiny half-inch ankle pulses.',
        doThis: 'Pause 2 seconds at the bottom stretch of every rep (',
        doThisMetric: '2s stretch',
        angles: {
          'Side 45°': {
            title: 'Ankle Range: +25° to -15°',
            description:
              'Eliminates Achilles bounce so the calf muscle fibers do 100% of the work.',
            vectorLabel: 'ANKLE ROM: 40° TOTAL',
            timestamp: 10,
          },
          'Front View': {
            title: 'Big-Toe Ball Pressure',
            description:
              'Push evenly across the ball of the big and second toe rather than rolling outward.',
            vectorLabel: 'FOOT PRESSURE: CENTERED',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Farthest Seat Notch #6',
            description:
              'Set the leg press seat back so legs are nearly extended from the start.',
            vectorLabel: 'SEAT PIN: #6 (EXTENDED)',
            pinLevel: 'Notch 6',
            timestamp: 48,
          },
        },
        coachTips: [],
      },
      {
        id: 'seated-calf-machine',
        name: 'Seated Calf Raise',
        subtitle: 'Soleus Deep Muscle Focus',
        badgeText: 'Machine Guided',
        badgeVariant: 'secondary',
        startingWeight: '20 – 35 lbs',
        targetVolume: '3 × 15 Reps',
        restInterval: '45 sec',
        safetyAngleTitle: 'Bent-Knee Isolation: 90°',
        safetyAngleDesc:
          'Bending knees at 90° targets the deep soleus muscle for lower-leg endurance.',
        youtubeId: 'JbyjNymZOt0',
        youtubeTitle: 'Seated Calf Raise Proper Form',
        steps: [
          {
            title: 'Thigh Pad Pin:',
            text: 'Sit and adjust the knee pad height so it rests snugly on your ',
            highlight: 'lower thighs just above knees',
          },
          {
            title: 'Release Safety Latch:',
            text: 'Push up on your toes slightly and swing the center support lever out of the way.',
          },
          {
            title: 'The Movement:',
            text: 'Lower heels slowly for a 2-second stretch, then drive up high onto your tiptoes.',
          },
        ],
        avoidThis: 'Placing the knee pad directly on top of your kneecaps.',
        doThis: 'Set the pad 2 inches above your kneecaps on the lower quad (',
        doThisMetric: '90° knee bend',
        angles: {
          'Side 45°': {
            title: 'Bent-Knee Isolation: 90°',
            description:
              'Smooth tempo protects the Achilles tendon while building ankle stability.',
            vectorLabel: 'SOLEUS FOCUS: 92%',
            timestamp: 12,
          },
          'Front View': {
            title: 'Parallel Foot Stance',
            description:
              'Keep feet hip-width apart and pointing straight ahead.',
            vectorLabel: 'STANCE: PARALLEL',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Thigh Pad Pin Notch #3',
            description:
              'Pull the yellow pin on the vertical post to snug the pad onto your thighs.',
            vectorLabel: 'PAD PIN: #3',
            pinLevel: 'Notch 3',
            timestamp: 48,
          },
        },
        coachTips: [],
      },
    ],
  },
  lats: {
    id: 'lats',
    shortName: 'Latissimus Dorsi',
    focusLabel: 'Active Focus: Lats & Back',
    subHeader: 'Latissimus Dorsi • Rhomboids & Rear Delt assist',
    anatomicalName: 'Latissimus Dorsi',
    roleBadge: 'Primary Vertical Puller',
    description:
      'The broadest muscle of the human back. Pulls the arms downward and backward, counterbalancing chest pressing and creating strong, upright posture.',
    synergistsLabel: 'Biceps + Mid-Traps',
    synergistMuscleIds: ['biceps', 'shoulders'],
    region: 'upper',
    side: 'back',
    readinessScore: 92,
    suggestedNextMuscleId: 'biceps',
    suggestedNextLabel: 'Preacher Curl Machine',
    suggestedNextRelation: '(Synergist finisher)',
    exercises: [
      {
        id: 'wide-grip-lat-pulldown',
        name: 'Wide-Grip Lat Pulldown',
        subtitle: 'Guided Overhead Pull',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '30 – 50 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '60–75 sec',
        safetyAngleTitle: 'Torso Lean: 15° Back',
        safetyAngleDesc:
          'Lean back slightly (15°) and always pull the bar in front of your face to your upper chest.',
        youtubeId: 'CAwf7n6Luuc',
        youtubeTitle: 'Lat Pulldown Form & Technique',
        steps: [
          {
            title: 'Thigh Roller Pin:',
            text: 'Adjust the foam knee pad down so it locks your ',
            highlight: 'upper thighs firmly onto the seat',
          },
          {
            title: 'Grip Width:',
            text: 'Stand up to grab the bar just outside shoulder width (where the bar starts to bend), then sit down.',
          },
          {
            title: 'The Movement:',
            text: 'Drive your elbows down toward your back pockets until the bar touches your upper chest/collarbone.',
          },
        ],
        avoidThis:
          'Pulling the bar behind your neck (strains cervical spine and rotator cuffs).',
        doThis: 'Pull bar in front of your chin down to your collarbone (',
        doThisMetric: '15° torso lean',
        angles: {
          'Side 45°': {
            title: 'Torso Lean: 15° Back',
            description:
              'Keep your chest proud toward the ceiling and avoid swinging backward to yank the bar.',
            vectorLabel: 'TORSO RECLINE: 15° FIXED',
            timestamp: 10,
          },
          'Front View': {
            title: 'Elbows Drive Into Pockets',
            description:
              'Think of your hands as simple hooks and focus on pulling your elbows down.',
            vectorLabel: 'LAT RECRUITMENT: 93%',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Thigh Roller Pin Notch #3',
            description:
              'Set the thigh pad tight enough that your heels stay flat on the floor.',
            vectorLabel: 'THIGH LOCK: NOTCH #3',
            pinLevel: 'Roller #3',
            timestamp: 50,
          },
        },
        coachTips: [
          {
            question: 'Why do my forearms get tired before my back on Lat Pulldowns?',
            answer:
              'Avoid squeezing the bar with a white-knuckle death grip! Hook your 4 fingers over the top of the bar and picture driving your elbows down.',
          },
        ],
      },
      {
        id: 'seated-cable-row',
        name: 'Seated Cable Row',
        subtitle: 'Mid-Back Posture Builder',
        badgeText: 'Machine Guided',
        badgeVariant: 'secondary',
        startingWeight: '30 – 45 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '60–75 sec',
        safetyAngleTitle: 'Vertical Spine: 90° Tall',
        safetyAngleDesc:
          'Keep your torso upright at 90° and knees softly bent—never row with a rounded lower back.',
        youtubeId: 'GZbfZ033f74',
        youtubeTitle: 'Seated Cable Row Form',
        steps: [
          {
            title: 'Footplate & Knees:',
            text: 'Place feet on the angled footpads and slide back until knees have a ',
            highlight: 'soft 20° bend',
          },
          {
            title: 'Proud Chest Start:',
            text: 'Sit up tall, brace your core, and let your shoulder blades glide slightly forward at the start.',
          },
          {
            title: 'The Movement:',
            text: 'Pull the V-handle into your lower ribcage/stomach while squeezing shoulder blades together.',
          },
        ],
        avoidThis: 'Rocking your torso wildly forward and backward like a rowboat.',
        doThis: 'Keep your spine tall at 90° and move only your arms and shoulder blades (',
        doThisMetric: '90° spine',
        angles: {
          'Side 45°': {
            title: 'Vertical Spine: 90° Tall',
            description:
              'Your hips stay stationary on the bench while shoulder blades protract and retract.',
            vectorLabel: 'LUMBAR ANGLE: 90° NEUTRAL',
            timestamp: 10,
          },
          'Front View': {
            title: 'Scapular Retraction Squeeze',
            description:
              'Imagine pinching a pencil between your shoulder blades for 1 second.',
            vectorLabel: 'RHOMBOID LOAD: HIGH',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Close-Grip V-Handle Clip',
            description:
              'Clip the double D-handle (V-bar) onto the low cable carabiner.',
            vectorLabel: 'ATTACHMENT: V-HANDLE',
            pinLevel: 'Fixed Bench',
            timestamp: 48,
          },
        },
        coachTips: [],
      },
    ],
  },
  triceps: {
    id: 'triceps',
    shortName: 'Triceps',
    focusLabel: 'Active Focus: Triceps',
    subHeader: 'Triceps Brachii • Lateral & Long Head',
    anatomicalName: 'Triceps Brachii',
    roleBadge: 'Primary Elbow Extensor',
    description:
      'Makes up 60% of upper arm mass on the back of the arm. Straightens the elbow joint and locks out every chest and shoulder pressing movement.',
    synergistsLabel: 'Anconeus + Forearms',
    synergistMuscleIds: ['chest', 'shoulders'],
    region: 'upper',
    side: 'back',
    readinessScore: 95,
    suggestedNextMuscleId: 'chest',
    suggestedNextLabel: 'Machine Chest Press',
    suggestedNextRelation: '(Compound push pair)',
    exercises: [
      {
        id: 'triceps-pushdown',
        name: 'Triceps Pushdown',
        subtitle: 'Pinned Elbows • Cable Rope',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Hinge Only At Elbows: 90°',
        safetyAngleDesc:
          'Lock your upper arms against your ribs—only your forearms hinge downward.',
        youtubeId: '2-LAMcpzODU',
        youtubeTitle: 'Tricep Rope Pushdown Tutorial',
        steps: [
          {
            title: 'High Pulley Setup:',
            text: 'Clip the double-rope or V-bar attachment to the ',
            highlight: 'top pulley position (#15)',
          },
          {
            title: 'Athletic Hinge:',
            text: 'Step back 1 foot, soften your knees, and incline your torso forward 10° so the cable clears your body.',
          },
          {
            title: 'The Movement:',
            text: 'Push the rope ends down and slightly apart at the bottom until arms are straight. Return to 90°.',
          },
        ],
        avoidThis: 'Letting elbows flare out and leaning your chest on top of the bar.',
        doThis: 'Pin elbows to your ribs and spread the rope ends at the bottom (',
        doThisMetric: '90° top stop',
        angles: {
          'Side 45°': {
            title: 'Hinge Only At Elbows: 90°',
            description:
              'Stop when forearms reach parallel to the floor on the way up to keep tension.',
            vectorLabel: 'ELBOW HINGE: PURE ISOLATION',
            timestamp: 8,
          },
          'Front View': {
            title: 'Rope Flare Finish',
            description:
              'Turn wrists slightly outward at the bottom to engage the lateral triceps head.',
            vectorLabel: 'LATERAL HEAD PEAK: 100%',
            timestamp: 26,
          },
          'Seat Pin': {
            title: 'High Pulley Notch #15',
            description:
              'Lock the cable carriage at the very top setting (#15 or #16).',
            vectorLabel: 'PULLEY NOTCH: #15 (TOP)',
            pinLevel: 'Pulley #15',
            timestamp: 48,
          },
        },
        coachTips: [
          {
            question: 'Why did the dashboard suggest Triceps Pushdown right after Chest Press?',
            answer:
              'Your triceps were already warmed up assisting your chest! Finishing with 3 sets of Triceps Pushdowns completes your entire upper-body pushing chain in 5 minutes.',
          },
        ],
      },
      {
        id: 'seated-dip-machine',
        name: 'Seated Dip Machine',
        subtitle: 'Supported Vertical Pressdown',
        badgeText: 'Machine Guided',
        badgeVariant: 'secondary',
        startingWeight: '30 – 45 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Shoulder Cap Down',
        safetyAngleDesc:
          'Keep shoulders pressed down away from your ears as the handles rise.',
        youtubeId: 'h_Mh87J_Jg4',
        youtubeTitle: 'Seated Dip Machine Proper Form',
        steps: [
          {
            title: 'Seat & Seatbelt:',
            text: 'Adjust the seat to mid-height and buckle the lap belt if pressing near ',
            highlight: '50% of your bodyweight',
          },
          {
            title: 'Tucked Elbows:',
            text: 'Grip the handles and tuck your elbows inward toward the backrest pad.',
          },
          {
            title: 'The Movement:',
            text: 'Press handles straight down toward your hips, squeeze triceps, and return smoothly to 90°.',
          },
        ],
        avoidThis: 'Letting shoulders shrug up to your ears on the way back up.',
        doThis: 'Keep chest proud and stop when elbows hit 90° (',
        doThisMetric: '90° elbow stop',
        angles: {
          'Side 45°': {
            title: 'Shoulder Cap Down',
            description:
              'Much safer on the front shoulder capsule than bodyweight bench dips.',
            vectorLabel: 'ANTERIOR CAPSULE: SAFE',
            timestamp: 10,
          },
          'Front View': {
            title: 'Narrow Handle Width',
            description:
              'Rotate handles to the narrow setting to emphasize triceps over chest.',
            vectorLabel: 'HANDLE SETTING: NARROW',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Seat Pop-Pin Notch #4',
            description:
              'Set seat so elbows bend at 90° when gripping the handles at rest.',
            vectorLabel: 'SEAT PIN: #4',
            pinLevel: 'Notch 4',
            timestamp: 46,
          },
        },
        coachTips: [],
      },
    ],
  },
  glutes: {
    id: 'glutes',
    shortName: 'Glutes & Hamstrings',
    focusLabel: 'Active Focus: Glutes & Hams',
    subHeader: 'Gluteus Maximus • Biceps Femoris posterior chain',
    anatomicalName: 'Gluteus & Hamstrings',
    roleBadge: 'Posterior Hip Driver',
    description:
      'Forms the posterior engine of the lower body. Balances quad dominance, protects the ACL knee ligament, and supports lower-back health.',
    synergistsLabel: 'Calves + Lower Back',
    synergistMuscleIds: ['quads', 'calves'],
    region: 'lower',
    side: 'back',
    readinessScore: 91,
    suggestedNextMuscleId: 'quads',
    suggestedNextLabel: 'Seated Leg Press',
    suggestedNextRelation: '(Anterior leg pairing)',
    exercises: [
      {
        id: 'seated-leg-curl',
        name: 'Seated Leg Curl Machine',
        subtitle: 'Guided Hamstring Flexion',
        badgeText: 'Day 1 Pick',
        badgeVariant: 'primary',
        isDay1Pick: true,
        startingWeight: '25 – 40 lbs',
        targetVolume: '3 × 12 Reps',
        restInterval: '60 sec',
        safetyAngleTitle: 'Thigh Lock Pad Snug',
        safetyAngleDesc:
          'Lock the top thigh pad firmly over your quads so your hips never lift off the seat.',
        youtubeId: 'ELOCsoDSmrg',
        youtubeTitle: 'Seated Leg Curl Machine Form',
        steps: [
          {
            title: 'Backrest Depth:',
            text: 'Adjust the backrest so the back of your knees rests comfortably against the ',
            highlight: 'front curved seat edge',
          },
          {
            title: 'Ankle & Thigh Pads:',
            text: 'Place calves ON TOP of the lower ankle roller, then pull the upper lap pad down snugly over your thighs.',
          },
          {
            title: 'The Movement:',
            text: 'Curl your heels down and back underneath the seat, hold 1 second, and return slowly over 3 seconds.',
          },
        ],
        avoidThis: 'Putting your shins behind the ankle roller (like a leg extension).',
        doThis: 'Rest the back of your ankles ON TOP of the roller and curl down (',
        doThisMetric: '95° curl arc',
        angles: {
          'Side 45°': {
            title: 'Thigh Lock Pad Snug',
            description:
              'Seated leg curls place the hamstrings in a favorable stretch for painless strength.',
            vectorLabel: 'HAMSTRING ISOLATION: 96%',
            timestamp: 10,
          },
          'Front View': {
            title: 'Dorsiflexed Ankles',
            description:
              'Keep toes pulled slightly up toward your shins as you curl downward.',
            vectorLabel: 'CALF ASSIST: ACTIVE',
            timestamp: 28,
          },
          'Seat Pin': {
            title: 'Backrest #4 + Lap Pad Lock',
            description:
              'Pull the yellow pin on the lap pad arm to click it down over your thighs.',
            vectorLabel: 'BACK: #4 | LAP PAD: LOCKED',
            pinLevel: 'Notch 4',
            timestamp: 50,
          },
        },
        coachTips: [
          {
            question: 'How do I tell the Seated Leg Curl apart from the Leg Extension machine?',
            answer:
              'Look for the extra padded bar that swings down over the top of your thighs! That top thigh lock pad only exists on the Seated Leg Curl.',
          },
        ],
      },
      {
        id: 'romanian-db-deadlift',
        name: 'Romanian DB Deadlift',
        subtitle: 'Hip Hinge Pattern',
        badgeText: 'Free Weight',
        badgeVariant: 'neutral',
        startingWeight: '15 – 25 lbs',
        targetVolume: '3 × 10 Reps',
        restInterval: '75 sec',
        safetyAngleTitle: 'Mid-Shin Stop & Flat Spine',
        safetyAngleDesc:
          'Push hips straight backward like closing a car door with your glutes; stop at mid-shin.',
        youtubeId: '_oyxCn2iSjU',
        youtubeTitle: 'Dumbbell Romanian Deadlift (RDL) Form',
        steps: [
          {
            title: 'Soft Knee Lock:',
            text: 'Stand hip-width apart holding dumbbells against the front of your thighs with a ',
            highlight: '15° soft knee bend',
          },
          {
            title: 'Shave Your Legs:',
            text: 'Push your hips straight back toward the wall behind you while sliding dumbbells down your thighs.',
          },
          {
            title: 'The Movement:',
            text: 'Stop as soon as dumbbells reach just below your knees (mid-shin), then drive hips forward to stand.',
          },
        ],
        avoidThis: 'Reaching all the way to the floor by rounding your lower back.',
        doThis: 'Stop at mid-shin height as soon as your hips stop moving back (',
        doThisMetric: 'Mid-shin stop',
        angles: {
          'Side 45°': {
            title: 'Mid-Shin Stop & Flat Spine',
            description:
              'Depth comes from hips moving backward, never from bending the spine.',
            vectorLabel: 'HIP HINGE: NEUTRAL SPINE',
            timestamp: 10,
          },
          'Front View': {
            title: 'Lats Packed Tight',
            description:
              'Keep dumbbells lightly brushing your pants leg the entire time.',
            vectorLabel: 'BAR PATH: 0cm DRIFT',
            timestamp: 30,
          },
          'Seat Pin': {
            title: 'Open Floor Space',
            description:
              'Perform in front of the dumbbell rack (2 steps back from the rack).',
            vectorLabel: 'FLOOR ZONE: DUMBBELL AREA',
            pinLevel: 'Free Weight',
            timestamp: 50,
          },
        },
        coachTips: [],
      },
    ],
  },
};

export interface BeginnerRoutineProgram {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  equipmentFocus: string;
  description: string;
  exercises: {
    muscleId: MuscleId;
    exerciseId: string;
    name: string;
    sets: number;
    reps: string;
    startingWeight: string;
    pinGuide: string;
  }[];
}

export const BEGINNER_ROUTINES: BeginnerRoutineProgram[] = [
  {
    id: 'day1-machine-circuit',
    title: 'Day 1: Zero-Intimidation Machine Circuit',
    subtitle: '100% Fixed-Path Pin-Loaded Machines • Full Body Foundation',
    duration: '35 Mins',
    difficulty: 'Novice Certified',
    equipmentFocus: 'Pin-Loaded Machines Only',
    description:
      'Designed specifically for your first 2 weeks in the gym. Every movement uses a guided pin-loaded stack so you never have to load plates, ask for a spotter, or worry about balance.',
    exercises: [
      {
        muscleId: 'chest',
        exerciseId: 'machine-chest-press',
        name: 'Machine Chest Press',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '25 lbs',
        pinGuide: 'Seat Notch #4 (Mid-Chest)',
      },
      {
        muscleId: 'lats',
        exerciseId: 'wide-grip-lat-pulldown',
        name: 'Wide-Grip Lat Pulldown',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '35 lbs',
        pinGuide: 'Thigh Pad Notch #3',
      },
      {
        muscleId: 'quads',
        exerciseId: 'seated-leg-press',
        name: 'Seated Leg Press',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '60 lbs',
        pinGuide: 'Sled Rail Notch #4 (90° Knees)',
      },
      {
        muscleId: 'shoulders',
        exerciseId: 'shoulder-press-machine',
        name: 'Shoulder Press Machine',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '20 lbs',
        pinGuide: 'Seat Notch #3 (Chin Level)',
      },
      {
        muscleId: 'abs',
        exerciseId: 'ab-crunch-machine',
        name: 'Abdominal Crunch Machine',
        sets: 3,
        reps: '12 Reps',
        startingWeight: '25 lbs',
        pinGuide: 'Seat Notch #3',
      },
    ],
  },
  {
    id: 'upper-body-confidence',
    title: 'Upper Body Push / Pull Posture Split',
    subtitle: 'Balanced Chest, Back, Deltoids & Arms',
    duration: '40 Mins',
    difficulty: 'Day 4 Ready',
    equipmentFocus: 'Machines + Cable Column',
    description:
      'Pairs every pushing movement with its exact pulling antagonist to build upper-body tone while keeping your shoulder joints balanced and pain-free.',
    exercises: [
      {
        muscleId: 'chest',
        exerciseId: 'machine-chest-press',
        name: 'Machine Chest Press',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '30 lbs',
        pinGuide: 'Seat Notch #4',
      },
      {
        muscleId: 'lats',
        exerciseId: 'seated-cable-row',
        name: 'Seated Cable Row',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '35 lbs',
        pinGuide: 'V-Handle Attachment',
      },
      {
        muscleId: 'shoulders',
        exerciseId: 'cable-face-pull',
        name: 'Cable Face Pull',
        sets: 3,
        reps: '15 Reps',
        startingWeight: '20 lbs',
        pinGuide: 'Pulley Notch #14 (Eye Level)',
      },
      {
        muscleId: 'triceps',
        exerciseId: 'triceps-pushdown',
        name: 'Triceps Pushdown',
        sets: 3,
        reps: '12 Reps',
        startingWeight: '20 lbs',
        pinGuide: 'Top Pulley Notch #15',
      },
      {
        muscleId: 'biceps',
        exerciseId: 'preacher-curl-machine',
        name: 'Preacher Curl Machine',
        sets: 3,
        reps: '12 Reps',
        startingWeight: '20 lbs',
        pinGuide: 'Seat Notch #4',
      },
    ],
  },
  {
    id: 'lower-core-stability',
    title: 'Lower Body & Core Stability Builder',
    subtitle: 'Quads, Hamstrings, Glutes, Calves & Deep Core',
    duration: '35 Mins',
    difficulty: 'Novice Certified',
    equipmentFocus: 'Seated Leg Machines + Mat',
    description:
      'Strengthens knees, hips, and lower back without placing heavy barbells across your spine. Ideal for building lower-body power with zero lower-back strain.',
    exercises: [
      {
        muscleId: 'quads',
        exerciseId: 'seated-leg-press',
        name: 'Seated Leg Press',
        sets: 3,
        reps: '10 Reps',
        startingWeight: '70 lbs',
        pinGuide: 'Rail Notch #4',
      },
      {
        muscleId: 'glutes',
        exerciseId: 'seated-leg-curl',
        name: 'Seated Leg Curl Machine',
        sets: 3,
        reps: '12 Reps',
        startingWeight: '30 lbs',
        pinGuide: 'Backrest #4 + Lap Pad',
      },
      {
        muscleId: 'quads',
        exerciseId: 'leg-extension-machine',
        name: 'Leg Extension Machine',
        sets: 3,
        reps: '12 Reps',
        startingWeight: '30 lbs',
        pinGuide: 'Backrest #3 | Shin #2',
      },
      {
        muscleId: 'calves',
        exerciseId: 'leg-press-calf-push',
        name: 'Leg Press Toe Push',
        sets: 3,
        reps: '15 Reps',
        startingWeight: '50 lbs',
        pinGuide: 'Seat Notch #6',
      },
      {
        muscleId: 'abs',
        exerciseId: 'dead-bug-floor',
        name: 'Dead Bug Floor Press',
        sets: 3,
        reps: '8 / side',
        startingWeight: 'Bodyweight',
        pinGuide: 'Floor Mat Zone',
      },
    ],
  },
];
