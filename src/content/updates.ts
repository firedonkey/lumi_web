export type ArchitectureSeriesKey = "system" | "planning" | "navigation" | "manipulation";

type FlowStep = {
  title: string;
  description?: string;
};

type DetailCard = {
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

type LabelDescription = {
  label: string;
  description: string;
};

type TitledList = {
  title: string;
  description?: string;
  items: string[];
};

type ContinueLink = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export type UpdatePost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  subtitle?: string;
  body?: string[];
  tags: string[];
  seriesKey?: ArchitectureSeriesKey;
  continueExploring?: ContinueLink[];
  architectureHub?: {
    opening: string[];
    flow: FlowStep[];
    flowNote: string;
    hardware: {
      title: string;
      description: string;
      layers: TitledList[];
    };
    software: {
      title: string;
      description: string[];
      stackNote: string;
      technicalNote: string;
    };
    autonomy: {
      title: string;
      cards: DetailCard[];
      callout: string;
    };
    status: {
      takingShape: string[];
      next: string[];
      closing: string;
    };
  };
  planningArticle?: {
    ownership: string[];
    objectRecord: string[];
    statuses: string[];
    algorithm: {
      intro: string;
      steps: string[];
      scoreFactors: {
        positive: string[];
        negative: string[];
      };
      methods: DetailCard[];
    };
    stateMachine: {
      steps: string[];
      recoveries: LabelDescription[];
    };
    responsibilities: DetailCard[];
    roadmap: TitledList[];
  };
  navigationArticle?: {
    job: string[];
    dependencyChain: FlowStep[];
    implementationPath: string[];
    nav2: {
      intro: string;
      configuration: LabelDescription[];
    };
    standoff: string[];
    validation: string[];
  };
  manipulationArticle?: {
    difficulty: {
      intro: string[];
      factors: string[];
      callout: string;
    };
    demonstrations: {
      intro: string[];
      roles: DetailCard[];
      variations: string[];
    };
    roadmap: TitledList[];
    sequence: {
      steps: string[];
      owns: string[];
      note: string;
    };
    safety: string;
  };
  diagram?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export const updates: UpdatePost[] = [
  {
    slug: "building-the-mobile-foundation",
    title: "Lumi System Architecture: From Seeing Clutter to Storing It",
    date: "2026-06-26",
    summary:
      "A concise map of Lumi's V1 hardware, software, and autonomy stack for the long-term cleanup loop.",
    tags: ["System architecture"],
    seriesKey: "system",
    body: [],
    architectureHub: {
      opening: [
        "Lumi is being built as a mobile manipulation system, not a single isolated robot arm. The long-term cleanup loop connects perception, task planning, navigation, manipulation, storage, verification, and recovery.",
        "The system is still in supervised development. Lumi does not yet autonomously clean a full home, and object-to-bin cleanup is still being assembled layer by layer.",
      ],
      flow: [
        {
          title: "SEE",
          description: "Detect floor objects and estimate where they are in the room.",
        },
        {
          title: "PLAN",
          description: "Choose what to attempt, where it should go, and how to recover if it fails.",
        },
        {
          title: "MOVE",
          description: "Navigate to a safe pickup or bin standoff pose.",
        },
        {
          title: "PICK",
          description: "Position the arm, grasp, lift, and check whether anything was captured.",
        },
        {
          title: "STORE",
          description: "Bring the held object to a bin pose and coordinate placement.",
        },
        {
          title: "VERIFY",
          description: "Confirm the grasp or release before updating task state.",
        },
        {
          title: "REPEAT OR RETURN HOME",
          description: "Select the next object or end the run safely.",
        },
      ],
      flowNote:
        "This is Lumi's intended long-term loop. Nav2, SLAM, robust floor pickup, and full object-to-bin cleanup are not yet complete.",
      hardware: {
        title: "Hardware foundation",
        description:
          "The V1 hardware foundation is organized around onboard compute, real-time control, indoor mobility, sensing, manipulation, power, and safety.",
        layers: [
          {
            title: "Compute and control",
            items: ["Jetson Orin Nano", "STM32G431"],
            description:
              "Jetson handles higher-level perception, planning, navigation, recording, and learned-policy inference. STM32 keeps time-sensitive motor control, encoder reading, IMU interfaces, watchdog behavior, and low-level safety close to the hardware.",
          },
          {
            title: "Mobile base",
            items: ["Four-wheel differential-drive chassis for V1", "Wheel encoders", "Motor drivers"],
            description:
              "The base is being prepared for slow, supervised indoor motion before autonomous navigation is trusted.",
          },
          {
            title: "Sensing",
            items: ["BNO085/BNO086 IMU", "RPLIDAR", "Intel RealSense D435", "Wrist camera"],
            description:
              "The sensor stack supports odometry validation, mapping, object detection, and close-range manipulation feedback.",
          },
          {
            title: "Manipulation and safety",
            items: [
              "Front-mounted SO-ARM follower arm",
              "Leader/follower teleoperation",
              "Battery",
              "Emergency stop",
            ],
            description:
              "Teleoperation supports supervised testing and demonstration collection. Battery, motor drivers, watchdogs, and emergency stop behavior remain part of the safety foundation.",
          },
        ],
      },
      software: {
        title: "Software foundation",
        description: [
          "ROS 2 is becoming the central integration layer for Lumi's robot state, transforms, diagnostics, launch files, and modular capability testing.",
          "The Jetson runs higher-level perception, planning, navigation, recording, and learned-policy inference. The STM32 retains time-sensitive motor control, encoder reading, IMU interfaces, watchdog behavior, and low-level safety.",
          "Direct diagnostic tools remain available during hardware development so the team can validate motors, sensors, and serial interfaces before routing everything through the full autonomy stack.",
        ],
        stackNote:
          "Operator tools / web panel -> mission executive -> ROS 2 integration layer -> perception, navigation, and manipulation -> chassis bridge and safety interfaces -> STM32 real-time control -> motors, encoders, IMU, battery, emergency stop.",
        technicalNote:
          "Wheel/IMU calibration, ROS 2 integration, URDF/Xacro, lidar integration, and navigation validation are still ongoing.",
      },
      autonomy: {
        title: "The autonomy stack",
        cards: [
          {
            title: "Planning the cleanup loop",
            description:
              "Lumi needs to decide which object to address next, whether it is reachable, where to place it, and how to recover from failed attempts.",
            href: "/updates/planning-the-cleanup-loop",
            cta: "Read how Lumi plans a cleanup task ->",
          },
          {
            title: "Preparing the navigation stack",
            description:
              "Navigation turns a selected object or bin into a safe destination, using odometry, IMU data, lidar mapping, localization, and Nav2.",
            href: "/updates/preparing-the-navigation-stack",
            cta: "Read how Lumi will move through a room ->",
          },
          {
            title: "Teaching Lumi to pick up from the floor",
            description:
              "Manipulation combines teleoperation, camera observations, imitation learning, grasp verification, placement, and recovery behavior.",
            href: "/updates/teaching-an-arm-to-pick-up-from-the-floor",
            cta: "Read the pickup-learning roadmap ->",
          },
        ],
        callout:
          "Storage is where these three layers meet: the planner chooses the bin, navigation brings Lumi there, and the arm places and verifies the object.",
      },
      status: {
        takingShape: [
          "V1 chassis, battery, motor drivers, and emergency-stop foundation",
          "STM32 motor-control, encoder, IMU, watchdog, and battery-monitoring interfaces",
          "Jetson-based operator tools, recording path, and ROS 2 integration work",
          "Leader/follower arm teleoperation for structured demonstration collection",
          "Early tabletop pickup and local perception experiments",
        ],
        next: [
          "Continue wheel encoder and IMU calibration.",
          "Validate ROS 2 chassis bridge, TF tree, URDF/Xacro, lidar, EKF, mapping, and Nav2 in supervised stages.",
          "Collect structured floor-pickup demonstrations.",
          "Train and evaluate a first ACT-style manipulation baseline.",
          "Connect planning, navigation, pickup, storage, verification, and recovery into a supervised cleanup loop.",
        ],
        closing:
          "The goal is useful home cleanup behavior, but the current work is still foundation building and validation.",
      },
    },
    diagram: {
      src: "/media/lumi-architecture.png",
      alt: "Lumi prototype architecture diagram showing battery, BMS, buck converters, STM32, Jetson, sensors, motor driver, motors, encoders, arm, cameras, lidar, and USB hub connections.",
      caption:
        "Current Lumi prototype architecture. Purple lines represent power distribution, black lines represent compute and USB connections, orange lines represent sensing and encoder feedback, and green lines represent motor output paths.",
    },
  },
  {
    slug: "planning-the-cleanup-loop",
    title: "Planning the Cleanup Loop",
    date: "2026-06-26",
    summary:
      "Before Lumi can drive or grasp, it needs to decide what to clean, what is safe to attempt, where the object should go, and how to recover when the real world does not cooperate.",
    tags: ["Planning"],
    seriesKey: "planning",
    body: [],
    continueExploring: [
      {
        label: "Planning -> Navigation",
        title: "Preparing the Navigation Stack",
        description: "See how a selected object or bin becomes a safe base destination.",
        href: "/updates/preparing-the-navigation-stack",
      },
      {
        label: "Back to hub",
        title: "System Architecture",
        description: "Return to the overview of Lumi's full cleanup loop.",
        href: "/updates/building-the-mobile-foundation",
      },
    ],
    planningArticle: {
      ownership: [
        "Planning is neither motor control nor grasping. It decides what should happen next and keeps track of what has already happened.",
        "Planning decides what should happen next. Navigation decides how the base should move. Manipulation decides how the arm should interact with the object.",
        "For storage, planning chooses the bin, stores task state, and decides what happens after success or failure.",
      ],
      objectRecord: [
        "Object ID",
        "Object type or description",
        "Estimated position",
        "Detection confidence",
        "Reachability",
        "Pickup confidence",
        "Cleanup priority",
        "Current status",
      ],
      statuses: [
        "pending",
        "selected",
        "navigating",
        "attempting pickup",
        "held",
        "moving to bin",
        "stored",
        "failed",
        "needs review",
      ],
      algorithm: {
        intro:
          "The first planner should be transparent and deterministic, so each target choice can be inspected during supervised testing.",
        steps: [
          "Build an object list from local perception.",
          "Estimate object location, confidence, class, and reachability.",
          "Filter objects that are unsafe, uncertain, outside reach, or blocked.",
          "Score remaining targets.",
          "Select the next target.",
          "Execute the task sequence.",
          "Update the object registry after success, failure, or interruption.",
        ],
        scoreFactors: {
          positive: ["priority", "confidence", "reachability", "likelihood of successful pickup"],
          negative: ["navigation travel cost", "obstacle risk", "repeated failed attempts"],
        },
        methods: [
          {
            title: "Target choice",
            description: "A utility-score heuristic chooses the next useful object to attempt.",
          },
          {
            title: "Object ordering",
            description: "A greedy strategy orders objects before more complex multi-object routing is needed.",
          },
          {
            title: "Execution and recovery",
            description:
              "A behavior tree or hierarchical state machine coordinates retries, pauses, and operator-review states.",
          },
        ],
      },
      stateMachine: {
        steps: [
          "Survey room",
          "Choose object",
          "Navigate to standoff pose",
          "Verify target is still visible",
          "Attempt pickup",
          "Verify grasp",
          "Navigate to bin",
          "Place object",
          "Verify release",
          "Update task list",
          "Select next object or return home",
        ],
        recoveries: [
          {
            label: "Object not visible",
            description: "Rescan or mark for review.",
          },
          {
            label: "Navigation failed",
            description: "Try a different standoff pose or defer the object.",
          },
          {
            label: "Pickup failed",
            description: "Retry with a bounded number of attempts, then mark failed.",
          },
          {
            label: "Grasp verification failed",
            description: "Do not navigate to the bin. Recover or retry before continuing.",
          },
          {
            label: "Bin unavailable",
            description: "Pause the task and request operator review.",
          },
        ],
      },
      responsibilities: [
        {
          title: "Local robot responsibilities",
          description:
            "Local perception, safety checks, navigation, and arm-control loops must handle time-sensitive decisions.",
        },
        {
          title: "Possible cloud responsibilities",
          description:
            "Cloud AI may later help with high-level scene interpretation or ambiguous cleanup requests, but it must not directly control real-time motion.",
        },
      ],
      roadmap: [
        {
          title: "Phase 1",
          description: "Single-object cleanup with fixed bin location and transparent rules.",
          items: [],
        },
        {
          title: "Phase 2",
          description: "Multiple-object ordering, retries, and object-state tracking.",
          items: [],
        },
        {
          title: "Phase 3",
          description: "Room-level cleanup plans, user preferences, and learned prioritization.",
          items: [],
        },
        {
          title: "Phase 4",
          description:
            "Natural-language requests such as 'clear the toys' translated into safe, verified task steps.",
          items: [],
        },
      ],
    },
  },
  {
    slug: "preparing-the-navigation-stack",
    title: "Preparing the Navigation Stack",
    date: "2026-06-26",
    summary:
      "Wheel encoders, IMU validation, robot frames, lidar, mapping, localization, and Nav2 are being assembled in deliberate stages before autonomous movement.",
    tags: ["Next milestone", "Navigation"],
    seriesKey: "navigation",
    body: [],
    continueExploring: [
      {
        label: "Navigation -> Manipulation",
        title: "Teaching Lumi to Pick Up from the Floor",
        description: "See how pickup and placement behavior will be learned and verified.",
        href: "/updates/teaching-an-arm-to-pick-up-from-the-floor",
      },
    ],
    navigationArticle: {
      job: [
        "Navigation converts a task-level destination into safe motion for Lumi's mobile base.",
        "For pickup, Lumi must reach a calculated standoff pose rather than driving directly onto the object.",
        "For storage, navigation moves Lumi from the pickup location to a safe bin-placement pose while the arm remains safely controlled.",
      ],
      dependencyChain: [
        {
          title: "Wheel encoders + IMU",
          description: "Measure wheel movement and rotation cues that can be checked during supervised driving.",
        },
        {
          title: "Raw wheel odometry",
          description: "Converts encoder ticks into an initial estimate of chassis movement.",
        },
        {
          title: "EKF sensor fusion",
          description: "Combines encoder and IMU signals into a more stable odometry estimate.",
        },
        {
          title: "odom -> base_footprint transform",
          description: "Publishes the base pose relationship needed by ROS navigation tools.",
        },
        {
          title: "URDF/Xacro robot-frame model",
          description: "Defines chassis, lidar, IMU, D435 mount, and arm mount relationships.",
        },
        {
          title: "Lidar scan in laser_link frame",
          description: "Provides room geometry and obstacle observations in a known robot frame.",
        },
        {
          title: "SLAM Toolbox mapping",
          description: "Builds a map while Lumi is driven under supervision.",
        },
        {
          title: "Localization on saved map",
          description: "Lets Lumi estimate where it is inside a previously mapped room.",
        },
        {
          title: "Nav2 planning and control",
          description: "Plans and tracks conservative routes to pickup, bin, or home poses.",
        },
        {
          title: "/cmd_vel to STM32 chassis bridge",
          description: "Sends bounded velocity commands to the low-level controller.",
        },
        {
          title: "Motor commands and watchdog behavior",
          description: "Keeps command timing, stop behavior, and hardware safety close to STM32.",
        },
      ],
      implementationPath: [
        "Wheel encoders are electrically integrated and need continued physical calibration.",
        "IMU data is available and needs orientation and integration validation.",
        "Raw chassis telemetry and ROS 2 bridge infrastructure are being assembled.",
        "First URDF/Xacro robot frames describe the chassis, lidar, IMU, D435 mount, and arm mount.",
        "Lidar must become a stable ROS 2 scan source.",
        "EKF, TF, mapping, localization, and Nav2 will be validated in stages.",
      ],
      nav2: {
        intro:
          "This is the intended first Nav2 configuration, not a proven autonomous navigation result yet.",
        configuration: [
          {
            label: "Global planner",
            description: "Smac 2D planner.",
          },
          {
            label: "Local controller",
            description: "Regulated Pure Pursuit.",
          },
          {
            label: "Costmaps",
            description: "Static map layer, lidar obstacle layer, inflation layer, and conservative Lumi footprint.",
          },
          {
            label: "Safety behavior",
            description:
              "Low speed limits, arm-stowed driving rule, collision monitoring, STM32 command watchdog, hardware emergency stop, and conservative recovery actions.",
          },
        ],
      },
      standoff: [
        "Lumi will navigate to positions that make the arm useful.",
        "A pickup standoff pose keeps the chassis clear of the object while placing the arm within reach.",
        "A bin standoff pose places Lumi where the arm can safely lower, release, and retract without colliding with the bin or nearby furniture.",
      ],
      validation: [
        "Calibrate encoder scale and effective track width.",
        "Validate IMU orientation and raw sensor behavior.",
        "Validate odometry and EKF in supervised manual driving.",
        "Validate TF tree and lidar alignment.",
        "Build indoor maps with SLAM Toolbox.",
        "Localize reliably on a saved map.",
        "Navigate to simple empty-room goals.",
        "Add obstacle avoidance and recovery behavior.",
        "Add pickup and bin standoff-pose navigation.",
      ],
    },
  },
  {
    slug: "teaching-an-arm-to-pick-up-from-the-floor",
    title: "Teaching Lumi to Pick Up from the Floor",
    date: "2026-06-26",
    summary:
      "Teleoperation, structured demonstrations, ACT-style imitation learning, and safety-bounded pickup validation.",
    subtitle:
      "Lumi's first learned manipulation system starts with teleoperation and imitation learning, then grows toward more general visual and language-conditioned behavior.",
    tags: ["In progress", "Manipulation"],
    seriesKey: "manipulation",
    body: [],
    continueExploring: [
      {
        label: "Manipulation -> System Architecture",
        title: "Lumi System Architecture",
        description: "Return to the complete cleanup-loop overview.",
        href: "/updates/building-the-mobile-foundation",
      },
    ],
    manipulationArticle: {
      difficulty: {
        intro: [
          "Floor pickup is difficult because the robot sees the object from a moving base, approaches from imperfect poses, and must handle everyday variation without damaging the home.",
          "A closed gripper does not prove the robot picked anything up. Lumi needs grasp verification before moving to the bin.",
        ],
        factors: [
          "shape",
          "size",
          "surface material",
          "orientation",
          "distance",
          "occlusion",
          "lighting",
          "graspability",
        ],
        callout: "A closed gripper does not prove the robot picked anything up.",
      },
      demonstrations: {
        intro: [
          "The manipulation path begins with structured demonstrations instead of pretending the robot already knows every household object.",
          "Remote leader/follower teleoperation is being prepared to make data collection more practical, but it still needs supervised physical validation.",
        ],
        roles: [
          {
            title: "Laptop-connected leader arm",
            description: "Used by the operator to guide pickup, recovery, and placement demonstrations.",
          },
          {
            title: "Jetson-connected follower arm",
            description: "Mounted on Lumi and controlled locally during supervised demonstrations.",
          },
          {
            title: "Jetson",
            description:
              "Owns camera streams, follower-arm safety, dataset recording, and learned-policy inference.",
          },
        ],
        variations: [
          "left / center / right object positions",
          "near and far reach",
          "multiple object rotations",
          "different safe household objects",
          "successful grasps",
          "failed grasps",
          "recovery actions",
          "different lighting and background conditions",
        ],
      },
      roadmap: [
        {
          title: "Stage 1 - Structured pickup setup",
          description: "Known workspace, safe objects, fixed camera locations, and known bin location.",
          items: [],
        },
        {
          title: "Stage 2 - Teleoperation demonstrations",
          description:
            "Operator records approaches, grasps, lifts, failed attempts, and recovery behavior.",
          items: [],
        },
        {
          title: "Stage 3 - First learned policy",
          description:
            "ACT-style imitation learning predicts short sequences of arm and gripper actions from camera observations and robot state.",
          items: [],
        },
        {
          title: "Stage 4 - Floor-pickup generalization",
          description:
            "Increase object diversity, position variation, viewpoint variation, and recovery examples.",
          items: [],
        },
        {
          title: "Stage 5 - Pretrained policy research",
          description:
            "Evaluate pretrained robot-policy or VLA-style approaches only after Lumi has high-quality task data and stable hardware interfaces.",
          items: [],
        },
      ],
      sequence: {
        steps: [
          "Detect object",
          "Estimate pickup point",
          "Move to pre-grasp pose",
          "Descend",
          "Close gripper",
          "Lift",
          "Verify grasp",
          "Navigate to bin",
          "Place object",
          "Verify release",
          "Retry or mark failed",
        ],
        owns: [
          "pre-grasp positioning",
          "grasp behavior",
          "lifting",
          "grasp verification",
          "bin placement",
          "release verification",
          "recovery behavior",
        ],
        note:
          "Planning and navigation remain responsible for target selection and moving the robot base between object and bin.",
      },
      safety:
        "A learned policy can propose arm actions. It does not bypass safety. The Jetson-side safety layer still enforces joint limits, velocity limits, workspace limits, watchdog behavior, and emergency-stop priority. ACT-style imitation learning is the initial baseline; VLA-style approaches are a later research direction, not Lumi's current deployed pickup method.",
    },
  },
];

export function getUpdateBySlug(slug: string) {
  return updates.find((post) => post.slug === slug);
}
