export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ArchitectureLayer {
  layer: string;
  technologies: string;
  details: string;
}

export interface TechStackCategory {
  category: string;
  skills: string[];
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
  description: string;
}

export interface ProjectDetails {
  tagline: string;
  overview: string;
  features: ProjectFeature[];
  architecture: ArchitectureLayer[];
  techStackCategories: TechStackCategory[];
  challenges: ProjectChallenge[];
  learnings: string[];
  screenshots?: ProjectScreenshot[];
}

export interface ProjectData {
  id: string;
  number: string;
  featured?: boolean;
  category: string;
  title: string;
  tagline?: string;
  description?: string;
  technologies?: string[];
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  liveUrl?: string;
  githubUrl?: string;
  details?: ProjectDetails;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'proj-cartpilot',
    number: '01',
    featured: true,
    category: 'AI-Powered Agentic Commerce Platform',
    title: 'CartPilot AI',
    tagline: 'Beyond Shopping. Towards Smarter Decisions.',
    description:
      'An AI-powered agentic commerce platform that combines intelligent product discovery, product comparison, shopping assistance, and digital payments into one unified experience.',
    technologies: [
      'React 18',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'Supabase PostgreSQL',
      'Google Gemini API',
      'PayPal Orders v2',
      'PayPal Sandbox',
      'Vercel',
      'Render',
    ],
    col1Img1: '/projects/cartpilot-storefront.jpg',
    col1Img2: '/projects/cartpilot-assistant.jpg',
    col2Img: '/projects/cartpilot-assistant.jpg',
    liveUrl: 'https://cart-pilot-ai-7wfu.vercel.app/',
    githubUrl: 'https://github.com/Shashank22-jpg/CartPilot-AI',
    details: {
      tagline: 'Beyond Shopping. Towards Smarter Decisions.',
      overview:
        'CartPilot AI is an AI-powered agentic commerce platform that combines intelligent product discovery, product comparison, shopping assistance, and digital payments into one unified experience. Built on a resilient decoupled architecture, it leverages Google Gemini for autonomous conversational shopping assistance, Supabase for scalable PostgreSQL persistence and auth, and PayPal Orders API v2 for secure digital checkout in sandbox mode.',
      screenshots: [
        {
          url: '/projects/cartpilot-storefront.jpg',
          caption: 'Storefront & Discovery Workspace',
          description:
            'Interactive e-commerce storefront with multi-filter search, instant category exploration, and real-time shopping cart.',
        },
        {
          url: '/projects/cartpilot-assistant.jpg',
          caption: 'Conversational AI Shopping Assistant',
          description:
            'Gemini-powered shopping companion providing budget evaluation, comparisons, and risk analysis.',
        },
      ],
      features: [
        {
          title: 'AI-Powered Product Discovery',
          description:
            'Utilizes Google Gemini to deliver contextual semantic searches, natural-language filtering, and intelligent recommendations tailored to user intent.',
        },
        {
          title: 'Natural-Language Shopping Assistance',
          description:
            'Autonomous AI companion that helps users discover products, analyze budget ceilings, and make informed purchasing decisions with structured tool-calling.',
        },
        {
          title: 'Product Exploration & Comparison',
          description:
            'Interactive comparison engine evaluating side-by-side hardware specifications, warranty terms, and price-to-performance tradeoffs.',
        },
        {
          title: 'Smart Shopping Cart & Budget Guardrails',
          description:
            'Real-time cart synchronization, monthly budget ceiling tracking, and intelligent spending threshold warnings.',
        },
        {
          title: 'PayPal Sandbox Checkout Integration',
          description:
            'Two-step authenticated payment workflow using PayPal JavaScript SDK and server-side PayPal Orders API v2 order creation and capture.',
        },
        {
          title: 'Order Management & Tracking',
          description:
            'Complete order history ledger with live status updates, idempotency tracking, and transaction records.',
        },
        {
          title: 'Digital Purchase Passport Concept',
          description:
            'Unified post-purchase concept maintaining digital proof of ownership, warranty details, and item lifecycle history.',
        },
      ],
      architecture: [
        {
          layer: 'Client Presentation Layer',
          technologies: 'React 18, Vite, Tailwind CSS, Lucide React',
          details:
            'High-performance responsive single-page application hosted on Vercel with fluid dark-mode UI, reactive state management, and accessible navigation.',
        },
        {
          layer: 'Edge Routing & Serverless Proxy',
          technologies: 'Vercel Serverless Catch-All Functions (api/[...path].js)',
          details:
            'Zero-latency API reverse proxy routing /api/* and /health to Render backend with HTTP methods (GET, POST, PUT, DELETE), auth headers, query parameters, and payloads preserved.',
        },
        {
          layer: 'Backend Application Service',
          technologies: 'Node.js, Express.js REST API',
          details:
            'Decoupled microservice backend deployed on Render handling commerce logic, payment coordination, session authentication, and Gemini tool execution.',
        },
        {
          layer: 'Database & Authentication',
          technologies: 'Supabase (PostgreSQL), Supabase Auth',
          details:
            'Relational persistence with Row-Level Security (RLS), ACID transaction support, and secure JWT-based session management.',
        },
        {
          layer: 'AI Intelligence & Tool Calling',
          technologies: 'Google Gemini API',
          details:
            'Autonomous agent reasoning with structured schema output, deterministic tool execution, and guardrail constraints.',
        },
        {
          layer: 'Payment Gateway',
          technologies: 'PayPal JavaScript SDK, PayPal Orders API v2',
          details:
            'Full sandbox payment lifecycle: server-side order generation, client SDK rendering, and server-side capture verification.',
        },
      ],
      techStackCategories: [
        {
          category: 'Frontend',
          skills: ['React 18', 'Vite', 'Tailwind CSS', 'Lucide React', 'Responsive UI Design'],
        },
        {
          category: 'Backend & Database',
          skills: [
            'Node.js',
            'Express.js',
            'RESTful Architecture',
            'Supabase',
            'PostgreSQL',
            'Row-Level Security (RLS)',
          ],
        },
        {
          category: 'AI & Intelligence',
          skills: [
            'Google Gemini API',
            'Autonomous Tool Calling',
            'Contextual Reasoning',
            'Prompt Engineering',
          ],
        },
        {
          category: 'Payments & Security',
          skills: [
            'PayPal JavaScript SDK',
            'PayPal Orders API v2',
            'PayPal Sandbox',
            'JWT Authentication',
          ],
        },
        {
          category: 'Hosting & Deployment',
          skills: [
            'Vercel (Frontend & Edge Proxy)',
            'Render (Backend Web Service)',
            'Git & GitHub',
          ],
        },
      ],
      challenges: [
        {
          challenge: 'Vercel-to-Render API Proxying & SPA Fallback Collisions',
          solution:
            'Configured sequential rewrite rules and a catch-all serverless proxy function (api/[...path].js) to guarantee that all POST, GET, PUT, and DELETE API requests reach the Render backend without falling through to the React SPA index.html.',
        },
        {
          challenge: 'Secure Two-Step PayPal Sandbox Payment Verification',
          solution:
            'Architected a dual-phase order lifecycle where order creation and final payment capture are initiated and verified exclusively server-side via PayPal Orders API v2, preventing client-side tampering.',
        },
        {
          challenge: 'Reliable AI-Driven Product Recommendations Within Budget',
          solution:
            'Engineered strict JSON schema guardrails and deterministic tool schemas with Google Gemini, ensuring the assistant evaluates user budget ceilings and real catalog availability before suggesting products.',
        },
      ],
      learnings: [
        'Mastered cross-platform edge proxy architectures connecting Vercel static/serverless deployments to dedicated Render web services.',
        'Developed production-grade payment flows adhering to PCI-DSS principles via PayPal Orders v2.',
        'Acquired hands-on experience orchestrating LLM agents with real-world transactional database backends and constraint verification.',
        'Gained deep insights into debugging edge-case HTTP 405 routing conflicts and SPA rewrite mechanics.',
      ],
    },
  },
  {
    id: 'proj-1',
    number: '02',
    category: 'Full Stack & AI Platform',
    title: 'AI Travel Budget Planner',
    tagline: 'Smart Trip Planning & Intelligent Expense Estimation',
    description:
      'An AI-powered travel budget planner that helps users calculate trip expenses, optimize travel routes, and explore budget-conscious itineraries.',
    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'AI Services',
      'Vercel',
    ],
    col1Img1: '/projects/ai-travel-budget-planner.png',
    col1Img2: '/projects/ai-travel-budget-planner.png',
    col2Img: '/projects/ai-travel-budget-planner.png',
    liveUrl: 'https://ai-travel-budget-planner.vercel.app/',
    githubUrl: 'https://github.com/Shashank22-jpg/AI-Travel-Budget-Planner',
    details: {
      tagline: 'Smart Trip Planning & Intelligent Expense Estimation',
      overview:
        'An AI-driven travel planning and budgeting application designed to help travelers estimate trip costs, optimize expenses, and generate personalized itineraries based on budget preferences and destinations.',
      screenshots: [
        {
          url: '/projects/ai-travel-budget-planner.png',
          caption: 'Trip Budget Dashboard',
          description:
            'Interactive budget planner interface for destinations, duration, and dynamic expense breakdowns.',
        },
      ],
      features: [
        {
          title: 'Automated Budget Estimation',
          description:
            'Calculates flight, accommodation, food, and activity costs based on destination and travel duration.',
        },
        {
          title: 'Intelligent Itinerary Generator',
          description:
            'Creates day-by-day itineraries tailored to the user’s spending limits and travel style.',
        },
        {
          title: 'Real-time Expense Breakdown',
          description:
            'Categorizes projected costs and highlights potential saving opportunities.',
        },
      ],
      architecture: [
        {
          layer: 'Frontend Client',
          technologies: 'React, Vite, Tailwind CSS',
          details:
            'Interactive and responsive user interface for itinerary configuration and budget tracking.',
        },
        {
          layer: 'AI Services & Backend',
          technologies: 'Node.js, AI APIs',
          details:
            'Computes financial projections and delivers structured destination recommendations.',
        },
      ],
      techStackCategories: [
        {
          category: 'Core Stack',
          skills: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Node.js'],
        },
        {
          category: 'Deployment',
          skills: ['Vercel', 'GitHub'],
        },
      ],
      challenges: [
        {
          challenge: 'Accurate Dynamic Expense Modeling',
          solution:
            'Aggregated normalized travel benchmark data and algorithmic cost bands to generate realistic budget estimates.',
        },
      ],
      learnings: [
        'Deepened understanding of responsive UI design and full-stack integration with modern AI endpoints.',
      ],
    },
  },
];
