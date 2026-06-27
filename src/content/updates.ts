export type UpdatePost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
  tags: string[];
  diagram?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export const updates: UpdatePost[] = [
  {
    slug: "building-the-mobile-foundation",
    title: "Building the mobile foundation",
    date: "2026-06-26",
    summary:
      "Lumi’s chassis work focuses on safe low-level control, wheel sensing, onboard power monitoring, and a ROS 2 path toward indoor navigation.",
    tags: ["Prototype", "Mobility"],
    body: [
      "Lumi starts with a mobile base that can be tested, measured, and improved safely. The current work centers on the chassis, onboard compute, sensors, low-level controls, and the safety systems needed before more autonomy is layered on top.",
      "Wheel encoders and IMU integration are part of that foundation. They help turn motion into measurable state, which is essential for repeatable indoor navigation experiments.",
      "The current architecture separates power distribution, low-level motion control, and higher-level compute. A 24V battery feeds the power button, fuse, battery monitoring, and buck converters. The STM32 handles real-time motor-driver commands and encoder feedback, while the Jetson connects higher-level perception and autonomy work to cameras, lidar, the arm, and USB peripherals.",
      "This separation keeps the base practical to debug: power, sensing, motor control, and onboard compute can each be tested independently before they are combined into more autonomous navigation behavior.",
      "The goal is not to rush toward a polished demo. It is to make each underlying capability dependable enough to support the next one.",
    ],
    diagram: {
      src: "/media/lumi-architecture.png",
      alt: "Lumi prototype architecture diagram showing battery, BMS, buck converters, STM32, Jetson, sensors, motor driver, motors, encoders, arm, cameras, lidar, and USB hub connections.",
      caption:
        "Current Lumi prototype architecture. Purple lines represent power distribution, black lines represent compute and USB connections, orange lines represent sensing and encoder feedback, and green lines represent motor output paths.",
    },
  },
  {
    slug: "teaching-an-arm-to-pick-up-from-the-floor",
    title: "Teaching an arm to pick up from the floor",
    date: "2026-06-26",
    summary:
      "The manipulation work begins with leader/follower teleoperation, structured demonstrations, and a small set of safe everyday objects.",
    tags: ["In progress", "Manipulation"],
    body: [
      "The robot arm is being developed around practical indoor cleanup tasks: reaching, gripping, lifting, carrying, and releasing small objects in predictable ways.",
      "Leader/follower teleoperation is working, which makes it possible to collect structured demonstrations and explore how the arm behaves before relying on more autonomous behaviors.",
      "Tabletop pickup has been demonstrated. Reliable floor pickup across varied everyday objects is still active research and development.",
    ],
  },
  {
    slug: "preparing-the-navigation-stack",
    title: "Preparing the navigation stack",
    date: "2026-06-26",
    summary:
      "Wheel encoders, IMU validation, robot frames, lidar, mapping, and local planning are being assembled in deliberate stages before autonomous movement.",
    tags: ["Next milestone", "Navigation"],
    body: [
      "Navigation is being assembled step by step: sensor validation, robot frames, lidar integration, mapping, and local planning all need to agree before indoor autonomy can be trusted.",
      "ROS 2 provides the foundation for bringing those pieces together while keeping the system understandable and testable.",
      "Full navigation, mapping, autonomous pickup, and object-to-bin cleanup are not complete yet. The near-term focus is a supervised path toward a reliable end-to-end cleanup loop.",
    ],
  },
];

export function getUpdateBySlug(slug: string) {
  return updates.find((post) => post.slug === slug);
}
