export interface ExperienceData {
  id: string;
  name: string;
  tagline: string;
  color: string;
  description: string;
  phases: {
    arrival: {
      title: string;
      description: string;
      animation: string;
    };
    mainEvent: {
      title: string;
      description: string;
      animation: string;
    };
    aftermath: {
      title: string;
      description: string;
      animation: string;
    };
  };
  interactiveType: "flames" | "maze" | "leaderboard" | "bubbles" | "stars";
  fullConcept: string;
}

export const experiences: ExperienceData[] = [
  {
    id: "inferno",
    name: "Gemini Data Inferno",
    tagline: "Every spark counts—turning your impact into a living spectacle.",
    color: "#FF4500",
    description:
      "Transform live audience data into an erupting digital inferno that responds to every interaction.",
    phases: {
      arrival: {
        title: "Ignition Point",
        description:
          "Step in and you're instantly in the spotlight—a heatmap gallery builds as you walk in, energy rising with every new arrival.",
        animation: "flames-rise",
      },
      mainEvent: {
        title: "Data Eruption",
        description:
          "The room erupts in live data art—every interaction, every shout, every post is captured and visualized. No wallflowers, only fire.",
        animation: "fire-burst",
      },
      aftermath: {
        title: "Spark Legacy",
        description:
          "You leave with a personalized highlight reel—your spark, your badge, your story—Google-official and shareable. FOMO guaranteed.",
        animation: "ember-trail",
      },
    },
    interactiveType: "flames",
    fullConcept:
      "The Gemini Data Inferno transforms GSHA 2025 into a living, breathing data visualization that erupts with every audience interaction. Using real-time sentiment analysis, social media monitoring, and proximity sensors, we create a digital inferno that grows more intense as engagement increases. Attendees become fuel for the fire, with their contributions visualized as flames, sparks, and heat signatures across massive displays. The more they participate, the more spectacular the show becomes, creating an addictive cycle of engagement that turns passive attendees into active performers.",
  },
  {
    id: "labyrinth",
    name: "The Experience Labyrinth",
    tagline:
      "Navigate the maze of possibility—every path leads to performance.",
    color: "#9F32E9",
    description:
      "An interactive journey where each choice reveals new performance strategies and unlocks hidden insights.",
    phases: {
      arrival: {
        title: "Entry Portal",
        description:
          "Choose your path through a neon-lit maze of performance challenges. Each route offers different rewards and revelations.",
        animation: "maze-glow",
      },
      mainEvent: {
        title: "Path Discovery",
        description:
          "Navigate through immersive scenarios, making choices that unlock personalized Google Search strategies and competitive insights.",
        animation: "portal-open",
      },
      aftermath: {
        title: "Exit Trophy",
        description:
          "Emerge with a custom performance roadmap, exclusive insights, and proof of your journey through the labyrinth.",
        animation: "treasure-reveal",
      },
    },
    interactiveType: "maze",
    fullConcept:
      "The Experience Labyrinth creates a choose-your-own-adventure experience where attendees navigate through different performance scenarios. Using AR wayfinding and interactive decision points, participants explore various Google Search optimization strategies, competitive analysis techniques, and performance measurement approaches. Each path through the labyrinth reveals different insights, case studies, and actionable strategies, ensuring every attendee leaves with a unique and personalized learning experience tailored to their specific challenges and goals.",
  },
  {
    id: "spark-index",
    name: "The Spark Index",
    tagline: "Where performance becomes competition—and everyone wins.",
    color: "#0C5964",
    description:
      "A real-time leaderboard that gamifies performance insights and rewards bold marketing moves.",
    phases: {
      arrival: {
        title: "Index Entry",
        description:
          "Get scored instantly on your boldest marketing moves. The leaderboard updates live as you share your victories and challenges.",
        animation: "badge-rain",
      },
      mainEvent: {
        title: "Performance Battle",
        description:
          "Compete in real-time challenges, share strategies, and watch your Spark Index score climb as you engage with fellow marketers.",
        animation: "leaderboard-pulse",
      },
      aftermath: {
        title: "Champion Badge",
        description:
          "Leave with your official Spark Index ranking, performance badges, and a network of fellow high-performers to connect with.",
        animation: "trophy-glow",
      },
    },
    interactiveType: "leaderboard",
    fullConcept:
      "The Spark Index transforms GSHA 2025 into a competitive gaming experience where marketing performance becomes a real-time competition. Attendees earn points for sharing insights, asking bold questions, participating in challenges, and demonstrating innovative thinking. The system tracks engagement across multiple touchpoints—from social media activity to session participation—creating a dynamic leaderboard that encourages friendly competition while fostering meaningful connections and knowledge sharing among Canada's top marketing professionals.",
  },
  {
    id: "firestarter",
    name: "FireStarter Academy",
    tagline: "Light the way for others—become the spark that ignites change.",
    color: "#9D531F",
    description:
      "Turn attendees into performance evangelists with tools, content, and confidence to spread the fire.",
    phases: {
      arrival: {
        title: "Recruitment Rally",
        description:
          "Join the academy with a carnival of bold marketing questions, memes, and challenges that test your readiness to spread the performance gospel.",
        animation: "confetti-burst",
      },
      mainEvent: {
        title: "Evangelism Training",
        description:
          "Master the art of performance storytelling with tools, templates, and tactics to become a champion for Google Search excellence.",
        animation: "spotlight-sweep",
      },
      aftermath: {
        title: "Ambassador Credentials",
        description:
          "Graduate with official FireStarter status, exclusive content to share, and a mission to ignite performance culture wherever you go.",
        animation: "banner-unfurl",
      },
    },
    interactiveType: "bubbles",
    fullConcept:
      "FireStarter Academy transforms GSHA attendees into performance evangelists who carry the message of Google Search excellence beyond the event. Through interactive workshops, content creation tools, and peer-to-peer learning sessions, participants develop the skills and confidence to champion performance-driven marketing within their organizations. The academy provides templates, case studies, presentation materials, and ongoing support to ensure the impact of GSHA 2025 continues long after the event ends, creating a ripple effect of performance culture across the Canadian marketing landscape.",
  },
  {
    id: "constellation",
    name: "The Performance Constellation",
    tagline: "Connect the stars—map your path to performance brilliance.",
    color: "#FFD700",
    description:
      "An interactive star map where connections between ideas, people, and strategies create new possibilities.",
    phases: {
      arrival: {
        title: "Stellar Navigation",
        description:
          "Enter a cosmic space where each attendee becomes a star, and every interaction creates new constellations of possibility.",
        animation: "stars-emerge",
      },
      mainEvent: {
        title: "Constellation Building",
        description:
          "Connect with other marketing stars, link strategies and insights, and watch as new patterns of performance excellence emerge.",
        animation: "lines-connect",
      },
      aftermath: {
        title: "Galaxy Map",
        description:
          "Leave with your personal constellation map showing all the connections you've made and the performance pathways you've discovered.",
        animation: "constellation-complete",
      },
    },
    interactiveType: "stars",
    fullConcept:
      'The Performance Constellation creates a living map of the GSHA 2025 community, visualizing connections between attendees, ideas, and strategies in real-time. Using proximity sensors, interaction tracking, and collaborative mapping tools, the experience shows how individual marketing challenges and solutions connect to form larger patterns of industry insight. Attendees can explore different "star systems" of expertise, discover unexpected connections between seemingly unrelated strategies, and contribute to a growing galaxy of performance knowledge that becomes more valuable with each new connection made.',
  },
];

export const techNodes = [
  {
    id: "live-data",
    name: "Live Data",
    description: "Your presence fuels the fire.",
    details:
      "Real-time audience sentiment, engagement metrics, and behavioral data streams that power all visual experiences.",
  },
  {
    id: "gemini-ai",
    name: "Gemini AI",
    description: "Narrating in real time.",
    details:
      "AI-powered commentary, insights generation, and personalized content creation that responds to live audience behavior.",
  },
  {
    id: "ar-badges",
    name: "AR Badges",
    description: "Your story, in your hand.",
    details:
      "Augmented reality achievements, progress tracking, and shareable digital collectibles that document each attendee's journey.",
  },
  {
    id: "projection",
    name: "Projection Mapping",
    description: "The room, reimagined as a canvas.",
    details:
      "Environmental projection that transforms physical spaces into immersive digital experiences responding to audience energy.",
  },
  {
    id: "social",
    name: "Social Integration",
    description: "Instant FOMO, everywhere.",
    details:
      "Real-time social media integration, shareable moments, and viral content generation that extends the experience beyond the venue.",
  },
];

export const geminiQuips = [
  "Nice move.",
  "Now that's performance!",
  "You just sparked something.",
  "Fire detected.",
  "Performance level: Legendary",
  "You're igniting the room.",
  "Bold choice, brilliant result.",
  "The algorithm approves.",
  "Spark achieved.",
  "You're the next big thing.",
];

export const socialCards = [
  {
    platform: "twitter",
    content:
      "Just experienced the future of marketing events at #GSHA2025. When performance meets artistry, magic happens. #IgniteYourPerformance",
    author: "@MarketingMaven",
    timestamp: "2m",
  },
  {
    platform: "linkedin",
    content:
      "The GSHA 2025 experience redefined what's possible when data becomes art. Every marketer needs to see this. #PerformanceArt",
    author: "Sarah Chen, CMO",
    timestamp: "5m",
  },
  {
    platform: "instagram",
    content:
      "When your search performance literally sets the room on fire 🔥 #GSHA2025 #IgniteYourPerformance #MarketingMagic",
    author: "@digitalfirestarter",
    timestamp: "8m",
  },
];
