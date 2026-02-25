import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  HomeIcon,
  Users, 
  PhoneIncoming,
  MessageCircle,
  DoorClosed,
  CircleDollarSign,
  NotebookTabs,
  Key,
  UserRoundCheck,
  Clock
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50+",
          label: "Sensors can be connected",
  },
 
  {
    value: "99.9%",
    label: " SystemUptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
    {
    value: "24/7",
    label: "Real-time data analysis",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <Zap className="h-8 w-8 text-black" />,
    title: "Real-time monitoring technology",
    description:
      "The sensors constantly monitor environmental conditions such as humidity and temperature",
  },
  {
    icon: <UserRoundCheck className="h-8 w-8 text-black" />,
    title: "User friendly and informative ",
    description:
      "This interface is user-interactive and it shows the statistics for all the working sensors. ",
  },
  {
    icon: <Key className="h-8 w-8 text-black" />,
    title: "AI based insights",
    description: "Get AI generated responses for all your concerns regarding your IoT app architecture",
  },
];


// How It Works Data
export const howItWorksData = [
  {
    icon: <HomeIcon className="h-8 w-8 text-blue-600" />,
    title: "1. Create a project",
    description:
      "Get started in minutes with our simple and secure process",
  },
  {
    icon: < Users className="h-8 w-8 text-blue-600" />,
    title: "2. Get AI-based drag and drop system for your IoT devices in a simulation",
    description:
      "You can specify the no. of devices (nodes) and their parameters according to your project. ",
  },
  {
    icon: <PhoneIncoming className="h-8 w-8 text-blue-600" />,
    title: "3. Real-time insights",
    description:
      "Receive real-time insights, alerts and and statistics as per the data collected by your sensors.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];