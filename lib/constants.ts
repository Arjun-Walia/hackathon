import type { ProfileBuilderFormValues, ProfileSection } from "@/types";

export const BRAND_NAME = "Vigilo";
export const BRAND_INITIAL = "V";
export const REFERENCE_DATE = "2026-04-09T09:00:00+05:30";

export type RiskLevel = "critical" | "high" | "medium" | "low";
export type Cluster = "ready" | "at-risk" | "unprepared" | "inactive";
export type BadgeTone =
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "slate"
  | "blue"
  | "default";
export type IconName =
  | "LayoutDashboard"
  | "TrendingUp"
  | "PieChart"
  | "Users"
  | "AlertTriangle"
  | "Zap"
  | "MessageSquare"
  | "Settings"
  | "HelpCircle"
  | "Cpu"
  | "Bell"
  | "Search"
  | "Sparkles"
  | "BadgeCheck"
  | "ShieldAlert"
  | "Gauge"
  | "ArrowUpRight"
  | "ArrowDownRight"
  | "ArrowRight"
  | "Eye"
  | "Download"
  | "Send"
  | "Mail"
  | "Calendar"
  | "Building2"
  | "Globe"
  | "CheckCircle";

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  riskScore: number;
  cluster: Cluster;
  placementProbability: number;
  lastActive: string;
  mockAttempts: number;
  skills: {
    dsa: number;
    aptitude: number;
    communication: number;
    domainKnowledge: number;
    resumeQuality: number;
    mockInterviewScore: number;
  };
  triggers: string[];
  interventionStatus?: "none" | "pending" | "active" | "completed";
}

export interface NavSection {
  title: string;
  items: Array<{
    label: string;
    href: string;
    icon: IconName;
    badgeCount?: number;
    badgeTone?: BadgeTone;
  }>;
}

export interface PageMeta {
  href: string;
  title: string;
  description: string;
}

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: IconName;
  tone: BadgeTone;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  sparkline?: number[];
}

export interface DashboardAlertRow {
  id: string;
  studentName: string;
  riskScore: number;
  triggerReason: string;
  department: string;
  lastActiveLabel: string;
  severity: "Critical" | "High" | "Medium";
  actionLabel: "Intervene" | "View";
}

export interface AlertQueueItem {
  id: string;
  studentName: string;
  rollNo: string;
  department: string;
  severity: "critical" | "high" | "medium";
  reason: string;
  riskScore: number;
  signals: string[];
  assignedTo: string;
  status: "Pending" | "Assigned" | "In Review";
  flaggedLabel: string;
}

export interface InterventionCardData {
  id: string;
  studentId: string;
  type:
    | "Mock Interview Session"
    | "DSA Crash Course"
    | "Resume Review"
    | "Domain Shift"
    | "1:1 Counseling"
    | "Aptitude Bootcamp";
  assignedOfficer: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Critical" | "High" | "Medium";
  createdDate: string;
  dueDate: string;
  aiRecommendation: string;
  progressNote?: string;
}

export interface NudgeTemplateData {
  id: string;
  name: string;
  tone: BadgeTone;
  preview: string;
  channels: Array<"WhatsApp" | "Email" | "In-App">;
  lastUsed: string;
  useCount: number;
}

export interface NudgeRecord {
  id: string;
  studentId: string;
  templateId: string;
  channel: "WhatsApp" | "Email" | "In-App";
  sentAt: string;
  status: "Delivered" | "Opened" | "Responded" | "Failed";
  responseSnippet?: string;
}

export interface IntegrationCardData {
  id: string;
  name: string;
  icon: IconName;
  status: "Connected" | "Disconnected";
  lastSync: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Coordinator" | "Viewer";
  assignedStudents: number;
}

const baseDate = new Date(REFERENCE_DATE);

function isoDaysAgo(days: number, hourOffset = 0): string {
  const next = new Date(baseDate);
  next.setHours(next.getHours() - hourOffset - days * 24);
  return next.toISOString();
}

function isoHoursAgo(hours: number): string {
  const next = new Date(baseDate);
  next.setHours(next.getHours() - hours);
  return next.toISOString();
}

function skills(
  dsa: number,
  aptitude: number,
  communication: number,
  domainKnowledge: number,
  resumeQuality: number,
  mockInterviewScore: number,
) {
  return {
    dsa,
    aptitude,
    communication,
    domainKnowledge,
    resumeQuality,
    mockInterviewScore,
  };
}

export const CLUSTER_LABELS: Record<Cluster, string> = {
  ready: "Ready",
  "at-risk": "At-Risk",
  unprepared: "Unprepared",
  inactive: "Inactive",
};

export const CLUSTER_TONES: Record<Cluster, BadgeTone> = {
  ready: "emerald",
  "at-risk": "amber",
  unprepared: "rose",
  inactive: "slate",
};

export const SEVERITY_TONES: Record<AlertQueueItem["severity"], BadgeTone> = {
  critical: "rose",
  high: "amber",
  medium: "blue",
};

export const INTERVENTION_STATUS_TONES: Record<
  InterventionCardData["status"],
  BadgeTone
> = {
  Pending: "slate",
  "In Progress": "amber",
  Completed: "emerald",
};

export const NUDGE_STATUS_TONES: Record<NudgeRecord["status"], BadgeTone> = {
  Delivered: "blue",
  Opened: "amber",
  Responded: "emerald",
  Failed: "rose",
};

export const INTEGRATION_STATUS_TONES: Record<
  IntegrationCardData["status"],
  BadgeTone
> = {
  Connected: "emerald",
  Disconnected: "rose",
};

export function getRiskScoreTone(score: number): BadgeTone {
  if (score <= 40) {
    return "rose";
  }

  if (score <= 60) {
    return "amber";
  }

  return "emerald";
}

export function getPlacementTone(probability: number): "emerald" | "amber" | "rose" {
  if (probability > 65) {
    return "emerald";
  }

  if (probability >= 40) {
    return "amber";
  }

  return "rose";
}

export const BRAND_DETAILS = {
  roleLabel: "TPC Admin",
  sidebarSearchPlaceholder: "Search students, pages, insights...",
  aiStatusLabel: "AI Engine · Active",
  aiStatusUpdatedLabel: "Updated 3 mins ago",
  notificationCount: 7,
  overviewTabs: ["Overview", "Students", "Alerts"],
  topbarSearchLabel: "Search dashboard",
  runScanLabel: "Run AI Scan",
  runScanToast: {
    title: "AI scan initiated",
    description: "Results expected in approximately 2 minutes.",
  },
  currentOfficer: "Dr. Anita Mehra",
};

export const PAGE_META: PageMeta[] = [
  {
    href: "/dashboard",
    title: "Placement Intelligence Overview",
    description:
      "AI-led signals, placement probability trends, and intervention readiness across the campus.",
  },
  {
    href: "/dashboard/analytics",
    title: "Placement Trend Intelligence",
    description:
      "Trend analysis, campus risk distribution, forecast coverage, and intervention impact insights.",
  },
  {
    href: "/dashboard/segmentation",
    title: "AI Student Clustering",
    description:
      "Cluster-level understanding of readiness, disengagement, and silent-risk patterns.",
  },
  {
    href: "/students",
    title: "All Students Registry",
    description:
      "Unified student records with placement probability, cluster tagging, and recent activity signals.",
  },
  {
    href: "/alerts",
    title: "High-Priority Intervention Queue",
    description:
      "Prioritized alerts sorted by severity so coordinators can act before students fall behind.",
  },
  {
    href: "/interventions",
    title: "Intervention Management",
    description:
      "Assignment, monitoring, and outcome tracking for student-specific and batch interventions.",
  },
  {
    href: "/nudge-engine",
    title: "Automated Student Communication",
    description:
      "Templates, delivery performance, and personalized outreach across WhatsApp, email, and in-app channels.",
  },
  {
    href: "/dashboard/settings",
    title: "System Settings",
    description:
      "AI thresholds, clustering cadence, notifications, integrations, and TPC team management.",
  },
  {
    href: "/dashboard/help",
    title: "Support Center",
    description:
      "Operating guides, escalation pathways, and model usage notes for TPC officers.",
  },
];

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Analytics", href: "/dashboard/analytics", icon: "TrendingUp" },
      { label: "Segmentation", href: "/dashboard/segmentation", icon: "PieChart" },
    ],
  },
  {
    title: "STUDENTS",
    items: [
      { label: "All Students", href: "/students", icon: "Users" },
      {
        label: "Risk Alerts",
        href: "/alerts",
        icon: "AlertTriangle",
        badgeCount: 10,
        badgeTone: "rose",
      },
      {
        label: "Interventions",
        href: "/interventions",
        icon: "Zap",
        badgeCount: 34,
        badgeTone: "amber",
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      { label: "Nudge Engine", href: "/nudge-engine", icon: "MessageSquare" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
      { label: "Help", href: "/dashboard/help", icon: "HelpCircle" },
    ],
  },
];

export const DASHBOARD_METRICS: StatCardData[] = [
  {
    id: "placement-probability",
    label: "Placement Probability Avg",
    value: "67.3%",
    delta: "+2.1% this week",
    subtitle: "Campus average across all active cohorts",
    icon: "Gauge",
    tone: "violet",
    trend: "up",
  },
  {
    id: "high-risk",
    label: "High-Risk Students",
    value: "143",
    delta: "+12 since Monday",
    subtitle: "Require counselor or faculty attention",
    icon: "ShieldAlert",
    tone: "rose",
    trend: "up",
  },
  {
    id: "interventions-active",
    label: "Interventions Active",
    value: "89",
    delta: "34 pending review",
    subtitle: "Open actions across TPC officers",
    icon: "Zap",
    tone: "amber",
    trend: "neutral",
  },
  {
    id: "placement-ready",
    label: "Placement-Ready Students",
    value: "412",
    delta: "+28 this month",
    subtitle: "Meeting readiness thresholds today",
    icon: "BadgeCheck",
    tone: "emerald",
    trend: "up",
  },
];

export const DASHBOARD_RISK_DISTRIBUTION = [
  { department: "CSE", ready: 92, atRisk: 58, unprepared: 31 },
  { department: "IT", ready: 74, atRisk: 46, unprepared: 25 },
  { department: "ECE", ready: 63, atRisk: 61, unprepared: 47 },
  { department: "MECH", ready: 51, atRisk: 54, unprepared: 43 },
  { department: "CIVIL", ready: 36, atRisk: 41, unprepared: 38 },
  { department: "MBA", ready: 96, atRisk: 37, unprepared: 20 },
];

export const DASHBOARD_PROBABILITY_TREND = [
  { week: "W1", average: 61.2, ready: 72.8, atRisk: 48.1 },
  { week: "W2", average: 62.7, ready: 73.6, atRisk: 48.8 },
  { week: "W3", average: 63.8, ready: 74.9, atRisk: 49.5 },
  { week: "W4", average: 64.4, ready: 75.8, atRisk: 50.2 },
  { week: "W5", average: 65.6, ready: 77.1, atRisk: 51.3 },
  { week: "W6", average: 66.1, ready: 78.3, atRisk: 52.5 },
  { week: "W7", average: 66.9, ready: 79.1, atRisk: 53.6 },
  { week: "W8", average: 67.3, ready: 80.4, atRisk: 54.1 },
];

export const DASHBOARD_SEGMENTS = [
  { id: "ready", label: "Placement-Ready", count: 412, percentage: 33, tone: "emerald" as const },
  { id: "at-risk", label: "At-Risk", count: 349, percentage: 28, tone: "amber" as const },
  { id: "unprepared", label: "Unprepared", count: 224, percentage: 18, tone: "rose" as const },
  { id: "inactive", label: "Inactive", count: 262, percentage: 21, tone: "slate" as const },
];

export const DASHBOARD_CONFIDENCE = {
  label: "AI Confidence Score",
  value: "91.4%",
};

export const DASHBOARD_RECENT_ALERTS: DashboardAlertRow[] = [
  {
    id: "alert-001",
    studentName: "Arjun Mehta",
    riskScore: 23,
    triggerReason: "Zero mock attempts in 3 weeks",
    department: "CSE",
    lastActiveLabel: "21 days ago",
    severity: "Critical",
    actionLabel: "Intervene",
  },
  {
    id: "alert-002",
    studentName: "Priya Sharma",
    riskScore: 31,
    triggerReason: "Skills gap: DSA weak",
    department: "IT",
    lastActiveLabel: "8 days ago",
    severity: "High",
    actionLabel: "Intervene",
  },
  {
    id: "alert-003",
    studentName: "Rohit Nair",
    riskScore: 42,
    triggerReason: "Low aptitude score trend",
    department: "ECE",
    lastActiveLabel: "3 days ago",
    severity: "Medium",
    actionLabel: "View",
  },
  {
    id: "alert-004",
    studentName: "Sneha Kulkarni",
    riskScore: 18,
    triggerReason: "No profile update + inactive",
    department: "MECH",
    lastActiveLabel: "32 days ago",
    severity: "Critical",
    actionLabel: "Intervene",
  },
  {
    id: "alert-005",
    studentName: "Vivek Joshi",
    riskScore: 37,
    triggerReason: "Rejected in 4 mock interviews",
    department: "CSE",
    lastActiveLabel: "5 days ago",
    severity: "High",
    actionLabel: "Intervene",
  },
  {
    id: "alert-006",
    studentName: "Ananya Rao",
    riskScore: 55,
    triggerReason: "Missing domain skills for target role",
    department: "MBA",
    lastActiveLabel: "1 day ago",
    severity: "Medium",
    actionLabel: "View",
  },
  {
    id: "alert-007",
    studentName: "Karan Patel",
    riskScore: 29,
    triggerReason: "Skipped 6 consecutive webinars",
    department: "IT",
    lastActiveLabel: "14 days ago",
    severity: "Critical",
    actionLabel: "Intervene",
  },
  {
    id: "alert-008",
    studentName: "Divya Menon",
    riskScore: 44,
    triggerReason: "Resume score below threshold",
    department: "CIVIL",
    lastActiveLabel: "6 days ago",
    severity: "Medium",
    actionLabel: "View",
  },
];

export const STUDENT_STATS: StatCardData[] = [
  {
    id: "students-total",
    label: "Total Enrolled",
    value: "1,247",
    delta: "+53 this quarter",
    subtitle: "Final-year students under monitoring",
    icon: "Users",
    tone: "violet",
  },
  {
    id: "students-active",
    label: "Active This Week",
    value: "892",
    delta: "71.5% engagement rate",
    subtitle: "Logged in or took at least one action",
    icon: "TrendingUp",
    tone: "emerald",
  },
  {
    id: "students-risk",
    label: "Avg Risk Score",
    value: "61.8",
    delta: "-1.9 vs last week",
    subtitle: "Higher is healthier in Vigilo scoring",
    icon: "ShieldAlert",
    tone: "amber",
    trend: "up",
  },
  {
    id: "students-placed",
    label: "Placed This Cycle",
    value: "318",
    delta: "+22 since Friday",
    subtitle: "Offers secured in the current drive",
    icon: "BadgeCheck",
    tone: "emerald",
  },
];

export const STUDENT_FILTERS = {
  searchPlaceholder: "Search by name, roll no, or department",
  departments: ["All Departments", "CSE", "IT", "ECE", "MECH", "CIVIL", "MBA"],
  riskLevels: ["All Risk Levels", "Safe", "At-Risk", "High-Risk"],
  clusters: ["All Clusters", "Ready", "At-Risk", "Unprepared", "Inactive"],
  lastActive: ["Any Time", "Active in 3 Days", "Active in 7 Days", "Inactive 14+ Days"],
  sortOptions: ["Risk Score ↑", "Risk Score ↓", "Last Active", "Name"],
};

export const STUDENTS: Student[] = [
  {
    id: "stu-001",
    name: "Aarav Khanna",
    rollNo: "23CSE017",
    department: "CSE",
    riskScore: 82,
    cluster: "ready",
    placementProbability: 88,
    lastActive: isoHoursAgo(14),
    mockAttempts: 5,
    skills: skills(86, 80, 78, 82, 90, 84),
    triggers: ["Consistent coding streak", "Resume complete"],
    interventionStatus: "completed",
  },
  {
    id: "stu-002",
    name: "Ishita Menon",
    rollNo: "23IT041",
    department: "IT",
    riskScore: 74,
    cluster: "ready",
    placementProbability: 79,
    lastActive: isoHoursAgo(9),
    mockAttempts: 4,
    skills: skills(73, 70, 81, 76, 88, 77),
    triggers: ["Daily portal activity", "Strong communication"],
    interventionStatus: "none",
  },
  {
    id: "stu-003",
    name: "Nikhil Chatterjee",
    rollNo: "23ECE026",
    department: "ECE",
    riskScore: 46,
    cluster: "at-risk",
    placementProbability: 52,
    lastActive: isoDaysAgo(4),
    mockAttempts: 2,
    skills: skills(38, 57, 63, 59, 69, 48),
    triggers: ["Low mock cadence", "DSA confidence falling"],
    interventionStatus: "pending",
  },
  {
    id: "stu-004",
    name: "Sana Shaikh",
    rollNo: "23MEC012",
    department: "MECH",
    riskScore: 28,
    cluster: "unprepared",
    placementProbability: 24,
    lastActive: isoDaysAgo(16),
    mockAttempts: 0,
    skills: skills(22, 34, 45, 31, 40, 18),
    triggers: ["No mock interviews", "Resume incomplete", "Low attendance"],
    interventionStatus: "active",
  },
  {
    id: "stu-005",
    name: "Devansh Patel",
    rollNo: "23CIV008",
    department: "CIVIL",
    riskScore: 21,
    cluster: "inactive",
    placementProbability: 18,
    lastActive: isoDaysAgo(24),
    mockAttempts: 0,
    skills: skills(20, 26, 41, 33, 28, 12),
    triggers: ["Inactive 24 days", "No tests attempted"],
    interventionStatus: "pending",
  },
  {
    id: "stu-006",
    name: "Kavya Reddy",
    rollNo: "23CSE054",
    department: "CSE",
    riskScore: 57,
    cluster: "at-risk",
    placementProbability: 61,
    lastActive: isoDaysAgo(2),
    mockAttempts: 2,
    skills: skills(61, 58, 72, 64, 71, 55),
    triggers: ["Mock interview gaps", "Sporadic portal activity"],
    interventionStatus: "active",
  },
  {
    id: "stu-007",
    name: "Rohit Nair",
    rollNo: "23ECE043",
    department: "ECE",
    riskScore: 42,
    cluster: "at-risk",
    placementProbability: 49,
    lastActive: isoDaysAgo(3),
    mockAttempts: 1,
    skills: skills(44, 41, 58, 51, 62, 43),
    triggers: ["Low aptitude trend", "Only one mock attempt"],
    interventionStatus: "pending",
  },
  {
    id: "stu-008",
    name: "Ananya Rao",
    rollNo: "23MBA031",
    department: "MBA",
    riskScore: 69,
    cluster: "ready",
    placementProbability: 74,
    lastActive: isoHoursAgo(20),
    mockAttempts: 3,
    skills: skills(62, 70, 79, 76, 83, 72),
    triggers: ["Strong resume", "Responsive to nudges"],
    interventionStatus: "none",
  },
  {
    id: "stu-009",
    name: "Vivek Joshi",
    rollNo: "23CSE079",
    department: "CSE",
    riskScore: 37,
    cluster: "unprepared",
    placementProbability: 39,
    lastActive: isoDaysAgo(5),
    mockAttempts: 4,
    skills: skills(39, 46, 60, 44, 58, 27),
    triggers: ["Rejected in 4 mock interviews", "Confidence dip"],
    interventionStatus: "active",
  },
  {
    id: "stu-010",
    name: "Divya Menon",
    rollNo: "23CIV019",
    department: "CIVIL",
    riskScore: 44,
    cluster: "at-risk",
    placementProbability: 43,
    lastActive: isoDaysAgo(6),
    mockAttempts: 1,
    skills: skills(35, 48, 61, 46, 33, 40),
    triggers: ["Resume score below threshold", "Weak aptitude consistency"],
    interventionStatus: "pending",
  },
  {
    id: "stu-011",
    name: "Arjun Mehta",
    rollNo: "23CSE021",
    department: "CSE",
    riskScore: 23,
    cluster: "unprepared",
    placementProbability: 28,
    lastActive: isoDaysAgo(21),
    mockAttempts: 0,
    skills: skills(25, 32, 42, 38, 51, 17),
    triggers: ["Zero mock attempts in 3 weeks", "Silent disengagement"],
    interventionStatus: "pending",
  },
  {
    id: "stu-012",
    name: "Priya Sharma",
    rollNo: "23IT014",
    department: "IT",
    riskScore: 31,
    cluster: "unprepared",
    placementProbability: 36,
    lastActive: isoDaysAgo(8),
    mockAttempts: 1,
    skills: skills(29, 48, 62, 44, 58, 37),
    triggers: ["Skills gap in DSA", "Low mock consistency"],
    interventionStatus: "active",
  },
  {
    id: "stu-013",
    name: "Sneha Kulkarni",
    rollNo: "23MEC024",
    department: "MECH",
    riskScore: 18,
    cluster: "inactive",
    placementProbability: 15,
    lastActive: isoDaysAgo(32),
    mockAttempts: 0,
    skills: skills(18, 27, 39, 29, 24, 11),
    triggers: ["Inactive 32 days", "No profile updates"],
    interventionStatus: "pending",
  },
  {
    id: "stu-014",
    name: "Karan Patel",
    rollNo: "23IT052",
    department: "IT",
    riskScore: 29,
    cluster: "inactive",
    placementProbability: 22,
    lastActive: isoDaysAgo(14),
    mockAttempts: 0,
    skills: skills(32, 35, 46, 37, 44, 20),
    triggers: ["Skipped 6 webinars", "No mock attempts"],
    interventionStatus: "pending",
  },
  {
    id: "stu-015",
    name: "Farhan Ali",
    rollNo: "23MBA017",
    department: "MBA",
    riskScore: 63,
    cluster: "ready",
    placementProbability: 68,
    lastActive: isoDaysAgo(1),
    mockAttempts: 3,
    skills: skills(54, 66, 82, 75, 78, 69),
    triggers: ["Improved aptitude trend", "Consistent recruiter activity"],
    interventionStatus: "none",
  },
  {
    id: "stu-016",
    name: "Bhavya Iyer",
    rollNo: "23ECE037",
    department: "ECE",
    riskScore: 71,
    cluster: "ready",
    placementProbability: 77,
    lastActive: isoHoursAgo(18),
    mockAttempts: 4,
    skills: skills(68, 73, 74, 79, 80, 75),
    triggers: ["Strong domain scores", "Mock interview momentum"],
    interventionStatus: "completed",
  },
  {
    id: "stu-017",
    name: "Manish Yadav",
    rollNo: "23MEC031",
    department: "MECH",
    riskScore: 54,
    cluster: "at-risk",
    placementProbability: 58,
    lastActive: isoDaysAgo(7),
    mockAttempts: 2,
    skills: skills(49, 56, 63, 58, 65, 53),
    triggers: ["Activity dipping", "Needs more mock practice"],
    interventionStatus: "active",
  },
  {
    id: "stu-018",
    name: "Neha Borkar",
    rollNo: "23CIV027",
    department: "CIVIL",
    riskScore: 66,
    cluster: "ready",
    placementProbability: 69,
    lastActive: isoDaysAgo(2),
    mockAttempts: 3,
    skills: skills(58, 69, 75, 71, 82, 64),
    triggers: ["Resume improved 19 points", "High webinar completion"],
    interventionStatus: "completed",
  },
  {
    id: "stu-019",
    name: "Gautam Dutta",
    rollNo: "23CSE091",
    department: "CSE",
    riskScore: 48,
    cluster: "at-risk",
    placementProbability: 51,
    lastActive: isoDaysAgo(9),
    mockAttempts: 2,
    skills: skills(51, 50, 68, 56, 63, 49),
    triggers: ["Inconsistent coding rounds", "Low response to nudges"],
    interventionStatus: "pending",
  },
  {
    id: "stu-020",
    name: "Pooja Nair",
    rollNo: "23IT088",
    department: "IT",
    riskScore: 77,
    cluster: "ready",
    placementProbability: 83,
    lastActive: isoHoursAgo(6),
    mockAttempts: 5,
    skills: skills(79, 74, 81, 78, 88, 82),
    triggers: ["Daily preparation streak", "Strong mock performance"],
    interventionStatus: "none",
  },
  {
    id: "stu-021",
    name: "Saurabh Singh",
    rollNo: "23MBA044",
    department: "MBA",
    riskScore: 34,
    cluster: "unprepared",
    placementProbability: 33,
    lastActive: isoDaysAgo(11),
    mockAttempts: 1,
    skills: skills(28, 39, 57, 46, 48, 35),
    triggers: ["Low aptitude percentile", "Minimal interview practice"],
    interventionStatus: "active",
  },
  {
    id: "stu-022",
    name: "Meera Krishnan",
    rollNo: "23CSE102",
    department: "CSE",
    riskScore: 84,
    cluster: "ready",
    placementProbability: 91,
    lastActive: isoHoursAgo(5),
    mockAttempts: 6,
    skills: skills(89, 82, 84, 86, 92, 88),
    triggers: ["Top recruiter shortlist", "Excellent mock interview scores"],
    interventionStatus: "completed",
  },
  {
    id: "stu-023",
    name: "Harshit Verma",
    rollNo: "23ECE064",
    department: "ECE",
    riskScore: 58,
    cluster: "at-risk",
    placementProbability: 62,
    lastActive: isoDaysAgo(3),
    mockAttempts: 2,
    skills: skills(55, 59, 67, 61, 66, 57),
    triggers: ["Sporadic engagement", "Needs stronger resume positioning"],
    interventionStatus: "pending",
  },
  {
    id: "stu-024",
    name: "Lavanya Pillai",
    rollNo: "23IT097",
    department: "IT",
    riskScore: 62,
    cluster: "ready",
    placementProbability: 67,
    lastActive: isoDaysAgo(4),
    mockAttempts: 3,
    skills: skills(65, 61, 75, 63, 72, 60),
    triggers: ["Improving trajectory", "Strong workshop attendance"],
    interventionStatus: "active",
  },
  {
    id: "stu-025",
    name: "Yashika Jain",
    rollNo: "23CIV035",
    department: "CIVIL",
    riskScore: 26,
    cluster: "inactive",
    placementProbability: 19,
    lastActive: isoDaysAgo(27),
    mockAttempts: 0,
    skills: skills(19, 31, 43, 35, 30, 15),
    triggers: ["Inactive 27 days", "No LMS or portal activity"],
    interventionStatus: "pending",
  },
];

export const RISK_ALERT_STATS: StatCardData[] = [
  {
    id: "critical-alerts",
    label: "Critical Alerts",
    value: "38",
    delta: "+6 this morning",
    subtitle: "Students requiring immediate outreach",
    icon: "ShieldAlert",
    tone: "rose",
  },
  {
    id: "high-priority",
    label: "High Priority",
    value: "64",
    delta: "Across 6 departments",
    subtitle: "Needs assignment within 24 hours",
    icon: "AlertTriangle",
    tone: "amber",
  },
  {
    id: "pending-review",
    label: "Pending Review",
    value: "34",
    delta: "9 in coordinator queue",
    subtitle: "Waiting for action validation",
    icon: "Zap",
    tone: "violet",
  },
  {
    id: "resolved-today",
    label: "Resolved Today",
    value: "17",
    delta: "+4 vs yesterday",
    subtitle: "Alerts closed after intervention",
    icon: "CheckCircle",
    tone: "emerald",
  },
];

export const ALERT_FILTERS = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Unassigned",
  "My Queue",
];

export const ALERT_QUEUE: AlertQueueItem[] = [
  {
    id: "queue-001",
    studentName: "Arjun Mehta",
    rollNo: "23CSE021",
    department: "CSE",
    severity: "critical",
    reason: "No engagement for 28 days",
    riskScore: 18,
    signals: ["0 mock tests", "DSA: 12%", "Resume: incomplete"],
    assignedTo: "Unassigned",
    status: "Pending",
    flaggedLabel: "Flagged 2 hours ago by AI Engine",
  },
  {
    id: "queue-002",
    studentName: "Sneha Kulkarni",
    rollNo: "23MEC024",
    department: "MECH",
    severity: "critical",
    reason: "No profile completion and 32-day inactivity",
    riskScore: 19,
    signals: ["No logins", "Resume missing", "Attendance drop"],
    assignedTo: "Vijayalakshmi Rao",
    status: "Assigned",
    flaggedLabel: "Flagged 4 hours ago by AI Engine",
  },
  {
    id: "queue-003",
    studentName: "Karan Patel",
    rollNo: "23IT052",
    department: "IT",
    severity: "critical",
    reason: "Skipped 6 consecutive webinars",
    riskScore: 24,
    signals: ["0 mock tests", "No webinar joins", "No nudge response"],
    assignedTo: "Unassigned",
    status: "Pending",
    flaggedLabel: "Flagged 6 hours ago by AI Engine",
  },
  {
    id: "queue-004",
    studentName: "Priya Sharma",
    rollNo: "23IT014",
    department: "IT",
    severity: "high",
    reason: "Skills gap widening in DSA",
    riskScore: 31,
    signals: ["DSA: 34%", "2 rejected coding rounds", "Mock score: 39"],
    assignedTo: "Dr. Anita Mehra",
    status: "In Review",
    flaggedLabel: "Flagged 9 hours ago by AI Engine",
  },
  {
    id: "queue-005",
    studentName: "Vivek Joshi",
    rollNo: "23CSE079",
    department: "CSE",
    severity: "high",
    reason: "Rejected in 4 mock interviews",
    riskScore: 37,
    signals: ["Mock feedback poor", "Confidence slump", "High retake count"],
    assignedTo: "Rahul Banerjee",
    status: "Assigned",
    flaggedLabel: "Flagged 11 hours ago by AI Engine",
  },
  {
    id: "queue-006",
    studentName: "Saurabh Singh",
    rollNo: "23MBA044",
    department: "MBA",
    severity: "high",
    reason: "Aptitude percentile dropped below 40",
    riskScore: 34,
    signals: ["Aptitude: 38%", "No improvement in 2 weeks", "Low portal activity"],
    assignedTo: "Unassigned",
    status: "Pending",
    flaggedLabel: "Flagged 13 hours ago by AI Engine",
  },
  {
    id: "queue-007",
    studentName: "Divya Menon",
    rollNo: "23CIV019",
    department: "CIVIL",
    severity: "high",
    reason: "Resume quality below threshold",
    riskScore: 40,
    signals: ["Resume: 33%", "No portfolio", "No mock interview bookings"],
    assignedTo: "Vijayalakshmi Rao",
    status: "Assigned",
    flaggedLabel: "Flagged 18 hours ago by AI Engine",
  },
  {
    id: "queue-008",
    studentName: "Rohit Nair",
    rollNo: "23ECE043",
    department: "ECE",
    severity: "medium",
    reason: "Low aptitude score trend over 3 weeks",
    riskScore: 42,
    signals: ["Aptitude: 44%", "Missed quiz", "Low consistency"],
    assignedTo: "Dr. Anita Mehra",
    status: "In Review",
    flaggedLabel: "Flagged 22 hours ago by AI Engine",
  },
  {
    id: "queue-009",
    studentName: "Harshit Verma",
    rollNo: "23ECE064",
    department: "ECE",
    severity: "medium",
    reason: "Resume positioning lagging behind cluster",
    riskScore: 51,
    signals: ["Resume: 58%", "Needs project framing", "Sporadic mock feedback"],
    assignedTo: "Rahul Banerjee",
    status: "Assigned",
    flaggedLabel: "Flagged 1 day ago by AI Engine",
  },
  {
    id: "queue-010",
    studentName: "Lavanya Pillai",
    rollNo: "23IT097",
    department: "IT",
    severity: "medium",
    reason: "Improving, but still under target mock frequency",
    riskScore: 55,
    signals: ["Mock attempts: 3", "Needs confidence coaching", "Resume at 72%"],
    assignedTo: "Unassigned",
    status: "Pending",
    flaggedLabel: "Flagged 1 day ago by AI Engine",
  },
];

export const SEGMENTATION_SCHEDULE = {
  lastClustered: "Today, 6:02 AM",
  nextRun: "Tomorrow 6:00 AM",
  actionLabel: "Re-run Clustering",
};

export const SEGMENTATION_CLUSTER_CARDS = [
  {
    id: "ready",
    label: "Placement Ready",
    count: 412,
    avgProbability: "81.2%",
    traits: "Strong DSA, 3+ mock interviews, active daily, resume complete",
    tone: "emerald" as const,
    departments: [
      { department: "CSE", value: 116 },
      { department: "MBA", value: 88 },
      { department: "IT", value: 79 },
      { department: "ECE", value: 64 },
      { department: "CIVIL", value: 35 },
    ],
    actions: ["View All"],
  },
  {
    id: "at-risk",
    label: "At-Risk",
    count: 349,
    avgProbability: "48.7%",
    traits: "Moderate skills, low mock frequency, sporadic engagement",
    tone: "amber" as const,
    departments: [
      { department: "ECE", value: 79 },
      { department: "MECH", value: 68 },
      { department: "IT", value: 61 },
      { department: "CSE", value: 57 },
      { department: "CIVIL", value: 48 },
    ],
    actions: ["View All", "Bulk Intervene"],
  },
  {
    id: "unprepared",
    label: "Unprepared",
    count: 224,
    avgProbability: "21.3%",
    traits: "Skill gaps in core areas, very low activity, incomplete profiles",
    tone: "rose" as const,
    departments: [
      { department: "MECH", value: 54 },
      { department: "ECE", value: 49 },
      { department: "IT", value: 41 },
      { department: "CIVIL", value: 40 },
      { department: "CSE", value: 32 },
    ],
    actions: ["View All", "Bulk Alert TPC"],
  },
];

export const INACTIVE_CLUSTER = {
  count: 262,
  description:
    "Last seen more than 14 days ago. No test, login, or resource activity recorded.",
  actionLabel: "Send Re-engagement Nudge to All",
  students: [
    "Sneha Kulkarni",
    "Devansh Patel",
    "Karan Patel",
    "Yashika Jain",
    "Arjun Mehta",
    "Saurabh Singh",
    "Nidhi Bansal",
    "Ritesh Kulkarni",
  ],
};

export const SEGMENTATION_RADAR_DATA = [
  { skill: "DSA", ready: 82, atRisk: 54, unprepared: 26 },
  { skill: "Aptitude", ready: 76, atRisk: 57, unprepared: 34 },
  { skill: "Communication", ready: 79, atRisk: 63, unprepared: 45 },
  { skill: "Domain Knowledge", ready: 78, atRisk: 59, unprepared: 37 },
  { skill: "Resume Quality", ready: 86, atRisk: 65, unprepared: 31 },
  { skill: "Mock Interview Score", ready: 81, atRisk: 52, unprepared: 23 },
];

export const INTERVENTION_TABS = ["All", "Pending", "In Progress", "Completed"];

export const INTERVENTION_STATS: StatCardData[] = [
  {
    id: "interventions-total",
    label: "Total Interventions",
    value: "126",
    delta: "+11 this week",
    subtitle: "Individual student actions tracked",
    icon: "Zap",
    tone: "violet",
  },
  {
    id: "interventions-pending",
    label: "Pending Assignment",
    value: "34",
    delta: "Needs coordinator allocation",
    subtitle: "Awaiting owner mapping",
    icon: "AlertTriangle",
    tone: "slate",
  },
  {
    id: "interventions-active",
    label: "In Progress",
    value: "52",
    delta: "18 due this week",
    subtitle: "Active counselor and faculty actions",
    icon: "TrendingUp",
    tone: "amber",
  },
  {
    id: "interventions-success",
    label: "Success Rate",
    value: "68.4%",
    delta: "+6.8% vs last month",
    subtitle: "Students improved after action plans",
    icon: "BadgeCheck",
    tone: "emerald",
  },
];

export const INTERVENTIONS: InterventionCardData[] = [
  {
    id: "int-001",
    studentId: "stu-011",
    type: "Mock Interview Session",
    assignedOfficer: "Unassigned",
    status: "Pending",
    priority: "Critical",
    createdDate: "06 Apr 2026",
    dueDate: "10 Apr 2026",
    aiRecommendation: "AI suggested based on zero mock attempts and low confidence trend",
  },
  {
    id: "int-002",
    studentId: "stu-012",
    type: "DSA Crash Course",
    assignedOfficer: "Rahul Banerjee",
    status: "In Progress",
    priority: "High",
    createdDate: "05 Apr 2026",
    dueDate: "12 Apr 2026",
    aiRecommendation: "AI suggested based on DSA score gap versus placed cohort",
    progressNote: "Student completed arrays and recursion track; next checkpoint on graphs.",
  },
  {
    id: "int-003",
    studentId: "stu-010",
    type: "Resume Review",
    assignedOfficer: "Vijayalakshmi Rao",
    status: "Pending",
    priority: "High",
    createdDate: "07 Apr 2026",
    dueDate: "11 Apr 2026",
    aiRecommendation: "AI suggested based on resume quality below cluster average",
  },
  {
    id: "int-004",
    studentId: "stu-004",
    type: "1:1 Counseling",
    assignedOfficer: "Dr. Anita Mehra",
    status: "In Progress",
    priority: "Critical",
    createdDate: "04 Apr 2026",
    dueDate: "10 Apr 2026",
    aiRecommendation: "AI suggested based on silent disengagement and missing profile data",
    progressNote: "Initial counseling done. Family contact requested for attendance follow-up.",
  },
  {
    id: "int-005",
    studentId: "stu-021",
    type: "Aptitude Bootcamp",
    assignedOfficer: "Rahul Banerjee",
    status: "In Progress",
    priority: "High",
    createdDate: "03 Apr 2026",
    dueDate: "14 Apr 2026",
    aiRecommendation: "AI suggested based on aptitude percentile under 40th percentile",
    progressNote: "Bootcamp attendance 2/4 sessions. Improvement seen in speed rounds.",
  },
  {
    id: "int-006",
    studentId: "stu-009",
    type: "Mock Interview Session",
    assignedOfficer: "Vijayalakshmi Rao",
    status: "In Progress",
    priority: "High",
    createdDate: "05 Apr 2026",
    dueDate: "13 Apr 2026",
    aiRecommendation: "AI suggested based on repeated mock interview rejections",
    progressNote: "Working on storytelling and clarity for project walkthroughs.",
  },
  {
    id: "int-007",
    studentId: "stu-013",
    type: "1:1 Counseling",
    assignedOfficer: "Unassigned",
    status: "Pending",
    priority: "Critical",
    createdDate: "02 Apr 2026",
    dueDate: "09 Apr 2026",
    aiRecommendation: "AI suggested based on prolonged inactivity and missing resume data",
  },
  {
    id: "int-008",
    studentId: "stu-014",
    type: "Domain Shift",
    assignedOfficer: "Dr. Anita Mehra",
    status: "Pending",
    priority: "High",
    createdDate: "07 Apr 2026",
    dueDate: "15 Apr 2026",
    aiRecommendation: "AI suggested based on interest and skill-fit mismatch for current role targets",
  },
  {
    id: "int-009",
    studentId: "stu-017",
    type: "Mock Interview Session",
    assignedOfficer: "Vijayalakshmi Rao",
    status: "Completed",
    priority: "Medium",
    createdDate: "28 Mar 2026",
    dueDate: "04 Apr 2026",
    aiRecommendation: "AI suggested based on moderate communication gap before recruiter drive",
  },
  {
    id: "int-010",
    studentId: "stu-019",
    type: "Resume Review",
    assignedOfficer: "Rahul Banerjee",
    status: "Completed",
    priority: "Medium",
    createdDate: "27 Mar 2026",
    dueDate: "03 Apr 2026",
    aiRecommendation: "AI suggested based on low response to nudges and weak resume framing",
  },
  {
    id: "int-011",
    studentId: "stu-023",
    type: "Resume Review",
    assignedOfficer: "Vijayalakshmi Rao",
    status: "Pending",
    priority: "Medium",
    createdDate: "08 Apr 2026",
    dueDate: "16 Apr 2026",
    aiRecommendation: "AI suggested based on resume positioning behind cluster benchmarks",
  },
  {
    id: "int-012",
    studentId: "stu-007",
    type: "Aptitude Bootcamp",
    assignedOfficer: "Rahul Banerjee",
    status: "In Progress",
    priority: "Medium",
    createdDate: "01 Apr 2026",
    dueDate: "12 Apr 2026",
    aiRecommendation: "AI suggested based on falling aptitude trend over three weeks",
    progressNote: "Student improved timed tests from 41 to 52. Follow-up mock scheduled.",
  },
];

export const BATCH_INTERVENTIONS = [
  {
    label: "DSA Workshop",
    description: "67 students need DSA improvement",
    actionLabel: "Schedule",
  },
  {
    label: "Aptitude Bootcamp",
    description: "43 students below 40th percentile",
    actionLabel: "Schedule",
  },
  {
    label: "Mock Interview Drive",
    description: "89 students with 0 mock attempts",
    actionLabel: "Schedule",
  },
];

export const ANALYTICS_DATE_RANGE = "Last 30 Days";

export const ANALYTICS_KPIS: StatCardData[] = [
  {
    id: "placement-rate",
    label: "Overall Placement Rate",
    value: "73.2%",
    delta: "+4.1%",
    subtitle: "Placed or final-round students",
    icon: "TrendingUp",
    tone: "emerald",
    sparkline: [61, 63, 65, 66, 68, 70, 71, 73],
  },
  {
    id: "time-to-intervention",
    label: "Avg Time to Intervention",
    value: "6.3 days",
    delta: "-1.2 days",
    subtitle: "From risk flag to first action",
    icon: "Zap",
    tone: "violet",
    sparkline: [8.1, 7.9, 7.6, 7.2, 7, 6.8, 6.5, 6.3],
  },
  {
    id: "nudge-response",
    label: "Nudge Response Rate",
    value: "61.4%",
    delta: "+8.2%",
    subtitle: "Student replies across channels",
    icon: "MessageSquare",
    tone: "amber",
    sparkline: [42, 44, 48, 51, 54, 57, 59, 61],
  },
  {
    id: "highest-risk",
    label: "Dept with Highest Risk",
    value: "ECE",
    delta: "43 critical",
    subtitle: "Critical alerts currently open",
    icon: "AlertTriangle",
    tone: "rose",
    sparkline: [31, 34, 35, 37, 39, 40, 42, 43],
  },
];

export const ANALYTICS_AREA_TREND = [
  { week: "W1", ready: 72, atRisk: 49, unprepared: 24 },
  { week: "W2", ready: 73, atRisk: 48, unprepared: 24 },
  { week: "W3", ready: 74, atRisk: 49, unprepared: 23 },
  { week: "W4", ready: 75, atRisk: 50, unprepared: 23 },
  { week: "W5", ready: 76, atRisk: 51, unprepared: 22 },
  { week: "W6", ready: 78, atRisk: 52, unprepared: 22 },
  { week: "W7", ready: 79, atRisk: 52, unprepared: 21 },
  { week: "W8", ready: 80, atRisk: 53, unprepared: 21 },
  { week: "W9", ready: 80, atRisk: 54, unprepared: 20 },
  { week: "W10", ready: 81, atRisk: 54, unprepared: 20 },
  { week: "W11", ready: 81, atRisk: 55, unprepared: 19 },
  { week: "W12", ready: 82, atRisk: 56, unprepared: 19 },
];

export const ANALYTICS_DEPARTMENT_RISK = [
  { department: "CSE", critical: 18, high: 23, medium: 16 },
  { department: "IT", critical: 14, high: 19, medium: 13 },
  { department: "ECE", critical: 43, high: 30, medium: 18 },
  { department: "MECH", critical: 25, high: 22, medium: 16 },
  { department: "CIVIL", critical: 21, high: 18, medium: 14 },
  { department: "MBA", critical: 12, high: 14, medium: 9 },
];

export const ANALYTICS_EFFECTIVENESS = [
  { week: "W1", intervention: 41, control: 24 },
  { week: "W2", intervention: 43, control: 25 },
  { week: "W3", intervention: 46, control: 26 },
  { week: "W4", intervention: 48, control: 28 },
  { week: "W5", intervention: 51, control: 29 },
  { week: "W6", intervention: 54, control: 31 },
  { week: "W7", intervention: 55, control: 32 },
  { week: "W8", intervention: 57, control: 33 },
  { week: "W9", intervention: 59, control: 34 },
  { week: "W10", intervention: 61, control: 35 },
  { week: "W11", intervention: 63, control: 36 },
  { week: "W12", intervention: 65, control: 37 },
];

export const ANALYTICS_SKILL_GAPS = [
  { skill: "DSA", value: 68 },
  { skill: "Aptitude", value: 54 },
  { skill: "System Design", value: 47 },
  { skill: "Communication", value: 39 },
  { skill: "Resume Quality", value: 35 },
];

export const FORECAST_TABLE = [
  { department: "CSE", totalStudents: 284, predictedPlaced: 228, predictedUnplaced: 56, atRiskCount: 41, confidence: 94 },
  { department: "IT", totalStudents: 241, predictedPlaced: 182, predictedUnplaced: 59, atRiskCount: 39, confidence: 92 },
  { department: "ECE", totalStudents: 226, predictedPlaced: 141, predictedUnplaced: 85, atRiskCount: 63, confidence: 89 },
  { department: "MECH", totalStudents: 196, predictedPlaced: 117, predictedUnplaced: 79, atRiskCount: 54, confidence: 87 },
  { department: "CIVIL", totalStudents: 148, predictedPlaced: 78, predictedUnplaced: 70, atRiskCount: 46, confidence: 86 },
  { department: "MBA", totalStudents: 152, predictedPlaced: 118, predictedUnplaced: 34, atRiskCount: 24, confidence: 93 },
];

export const NUDGE_STATS: StatCardData[] = [
  {
    id: "nudges-total",
    label: "Total Nudges Sent",
    value: "1,483",
    delta: "+92 today",
    subtitle: "Across WhatsApp, email, and in-app",
    icon: "Send",
    tone: "violet",
  },
  {
    id: "nudges-response",
    label: "Response Rate",
    value: "61.4%",
    delta: "+8.2% vs last month",
    subtitle: "Students replying or taking action",
    icon: "MessageSquare",
    tone: "emerald",
  },
  {
    id: "nudges-opened",
    label: "Opened",
    value: "1,104",
    delta: "74.4% open rate",
    subtitle: "Messages opened across all channels",
    icon: "Mail",
    tone: "amber",
  },
  {
    id: "nudges-pending",
    label: "Pending",
    value: "72",
    delta: "23 scheduled for tomorrow",
    subtitle: "Queued and waiting for delivery",
    icon: "Bell",
    tone: "slate",
  },
];

export const NUDGE_TEMPLATES: NudgeTemplateData[] = [
  {
    id: "tpl-001",
    name: "Inactivity Alert",
    tone: "slate",
    preview: "Hey [Name], we noticed you have not logged in for X days. Let us get you back on track.",
    channels: ["WhatsApp", "Email", "In-App"],
    lastUsed: "08 Apr 2026",
    useCount: 214,
  },
  {
    id: "tpl-002",
    name: "Mock Interview Reminder",
    tone: "violet",
    preview: "Your placement probability can improve by 18% with a mock session. Book one today.",
    channels: ["WhatsApp", "Email"],
    lastUsed: "09 Apr 2026",
    useCount: 173,
  },
  {
    id: "tpl-003",
    name: "Skill Gap Alert",
    tone: "amber",
    preview: "We identified gaps in [Skill]. Here is a recommended course and a quick action plan.",
    channels: ["WhatsApp", "Email", "In-App"],
    lastUsed: "07 Apr 2026",
    useCount: 196,
  },
  {
    id: "tpl-004",
    name: "Resume Incomplete",
    tone: "rose",
    preview: "Your resume score is [X]/100. Here is what is missing before your next recruiter review.",
    channels: ["Email", "In-App"],
    lastUsed: "05 Apr 2026",
    useCount: 128,
  },
  {
    id: "tpl-005",
    name: "Motivation Boost",
    tone: "emerald",
    preview: "You are 73% of the way to placement-ready. Keep going, your recent effort is showing up.",
    channels: ["WhatsApp", "In-App"],
    lastUsed: "08 Apr 2026",
    useCount: 147,
  },
  {
    id: "tpl-006",
    name: "Domain Shift Suggestion",
    tone: "blue",
    preview: "Based on your profile, [New Domain] may be a stronger fit. Here is why and what to do next.",
    channels: ["Email", "In-App"],
    lastUsed: "04 Apr 2026",
    useCount: 63,
  },
];

export const NUDGE_FEED: NudgeRecord[] = [
  {
    id: "nudge-001",
    studentId: "stu-012",
    templateId: "tpl-003",
    channel: "WhatsApp",
    sentAt: "12 mins ago",
    status: "Responded",
    responseSnippet: "I joined the DSA playlist and booked a mock for Friday.",
  },
  {
    id: "nudge-002",
    studentId: "stu-010",
    templateId: "tpl-004",
    channel: "Email",
    sentAt: "42 mins ago",
    status: "Opened",
    responseSnippet: "Downloaded resume checklist.",
  },
  {
    id: "nudge-003",
    studentId: "stu-013",
    templateId: "tpl-001",
    channel: "In-App",
    sentAt: "1 hour ago",
    status: "Delivered",
  },
  {
    id: "nudge-004",
    studentId: "stu-023",
    templateId: "tpl-005",
    channel: "WhatsApp",
    sentAt: "2 hours ago",
    status: "Opened",
  },
  {
    id: "nudge-005",
    studentId: "stu-014",
    templateId: "tpl-006",
    channel: "Email",
    sentAt: "3 hours ago",
    status: "Failed",
    responseSnippet: "Mailbox bounced. Retry recommended with alternate channel.",
  },
  {
    id: "nudge-006",
    studentId: "stu-007",
    templateId: "tpl-002",
    channel: "WhatsApp",
    sentAt: "5 hours ago",
    status: "Delivered",
  },
];

export const NUDGE_COMPOSER = {
  studentModes: ["Select Students", "By Cluster"],
  clusters: ["Placement Ready", "At-Risk", "Unprepared", "Inactive"],
  templates: NUDGE_TEMPLATES.map((template) => template.name),
  channels: ["WhatsApp", "Email", "In-App"],
  schedulingModes: ["Send Now", "Schedule"],
  preview:
    "Hi Priya, our AI model noticed your DSA readiness is lagging behind your target role. Complete the linked crash course and book one mock interview this week to improve your placement probability.",
};

export const SETTINGS_DATA = {
  aiConfiguration: {
    thresholds: {
      critical: 30,
      highRisk: 50,
      atRisk: 65,
    },
    frequencyOptions: ["Daily", "Weekly", "Manual"],
    selectedFrequency: "Daily",
    confidenceThresholdEnabled: true,
    confidenceThreshold: 91,
    retrainLabel: "Re-train Model",
  },
  notifications: {
    toggles: [
      { label: "Email alerts for Critical students", enabled: true },
      { label: "WhatsApp nudges", enabled: true },
      { label: "Daily digest", enabled: true },
      { label: "Weekly report", enabled: false },
    ],
    alertRecipients: "anita.mehra@vigilo.ai, tpc-core@vigilo.ai",
  },
};

export const INTEGRATIONS: IntegrationCardData[] = [
  {
    id: "intg-001",
    name: "LMS (Moodle)",
    icon: "Building2",
    status: "Connected",
    lastSync: "Today, 5:42 AM",
  },
  {
    id: "intg-002",
    name: "Attendance System",
    icon: "Building2",
    status: "Connected",
    lastSync: "Today, 6:10 AM",
  },
  {
    id: "intg-003",
    name: "Mock Test Platform",
    icon: "Globe",
    status: "Connected",
    lastSync: "Today, 6:18 AM",
  },
  {
    id: "intg-004",
    name: "HR Portal",
    icon: "Globe",
    status: "Disconnected",
    lastSync: "07 Apr 2026, 8:12 PM",
  },
];

export const TPC_TEAM: TeamMember[] = [
  {
    id: "team-001",
    name: "Dr. Anita Mehra",
    email: "anita.mehra@vigilo.ai",
    role: "Admin",
    assignedStudents: 184,
  },
  {
    id: "team-002",
    name: "Rahul Banerjee",
    email: "rahul.banerjee@vigilo.ai",
    role: "Coordinator",
    assignedStudents: 173,
  },
  {
    id: "team-003",
    name: "Vijayalakshmi Rao",
    email: "vijayalakshmi.rao@vigilo.ai",
    role: "Coordinator",
    assignedStudents: 162,
  },
  {
    id: "team-004",
    name: "Sonal Kapadia",
    email: "sonal.kapadia@vigilo.ai",
    role: "Viewer",
    assignedStudents: 0,
  },
];

export const HELP_CENTER = {
  heading: "TPC Help & Model Ops",
  sections: [
    {
      title: "Runbook",
      body: "Check the intervention queue twice a day, assign critical alerts within 6 hours, and review AI confidence drift every Friday.",
    },
    {
      title: "Escalation",
      body: "Escalate students with 3 unanswered nudges and 21+ days inactivity to the faculty coordinator and class mentor.",
    },
    {
      title: "Model Notes",
      body: "Risk scores update every morning at 6:00 AM after LMS, attendance, and mock data sync completes.",
    },
  ],
};

export const STUDENT_PAGE_META = [
  {
    href: "/student/dashboard",
    title: "Student Overview",
    description: "Track readiness, risks, and your next best actions.",
  },
  {
    href: "/student/progress",
    title: "Progress Insights",
    description: "Placement probability trends and weekly activity.",
  },
  {
    href: "/student/action-plan",
    title: "AI Action Plan",
    description: "Prioritized tasks to improve your placement score.",
  },
  {
    href: "/student/profile-builder",
    title: "Profile Builder",
    description: "Complete your profile to improve recruiter visibility.",
  },
  {
    href: "/student/skill-tracker",
    title: "Skill Tracker",
    description: "Skill-by-skill diagnostics with improvement guidance.",
  },
  {
    href: "/student/mock-interviews",
    title: "Mock Interviews",
    description: "Book and review interview practice sessions.",
  },
  {
    href: "/student/achievements",
    title: "Achievements",
    description: "Badges, leaderboard, and certification highlights.",
  },
  {
    href: "/student/notifications",
    title: "Notifications",
    description: "TPC alerts, reminders, and AI nudges.",
  },
];

export const STUDENT_NAV_SECTIONS = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard" },
      { label: "Progress", href: "/student/progress", icon: "TrendingUp" },
      { label: "Action Plan", href: "/student/action-plan", icon: "Zap" },
    ],
  },
  {
    title: "PROFILE",
    items: [
      {
        label: "Profile Builder",
        href: "/student/profile-builder",
        icon: "UserCircle",
        badgeCount: 78,
        badgeTone: "amber",
      },
      { label: "Skill Tracker", href: "/student/skill-tracker", icon: "Brain" },
      { label: "Mock Interviews", href: "/student/mock-interviews", icon: "Mic" },
    ],
  },
  {
    title: "ENGAGEMENT",
    items: [
      { label: "Achievements", href: "/student/achievements", icon: "Trophy" },
      {
        label: "Notifications",
        href: "/student/notifications",
        icon: "Bell",
        badgeCount: 4,
        badgeTone: "rose",
      },
    ],
  },
];

export const STUDENT_PROFILE = {
  id: "stu-022",
  name: "Meera Krishnan",
  rollNo: "23CSE102",
  department: "CSE",
  year: 4,
  cgpa: 8.3,
  placementProbability: 72,
  riskScore: 58,
  cluster: "ready",
  streak: 12,
  profileCompletion: 78,
  batchYear: "2026",
  lastUpdated: "2026-04-09T09:00:00+05:30",
  weeklyProgress: [
    { week: "W1", probability: 61, dsa: 52, aptitude: 60, mock: 48 },
    { week: "W2", probability: 63, dsa: 55, aptitude: 62, mock: 52 },
    { week: "W3", probability: 65, dsa: 58, aptitude: 63, mock: 57 },
    { week: "W4", probability: 66, dsa: 60, aptitude: 64, mock: 60 },
    { week: "W5", probability: 68, dsa: 62, aptitude: 66, mock: 63 },
    { week: "W6", probability: 70, dsa: 66, aptitude: 68, mock: 66 },
    { week: "W7", probability: 71, dsa: 68, aptitude: 69, mock: 68 },
    { week: "W8", probability: 72, dsa: 70, aptitude: 71, mock: 70 },
  ],
  monthlyProgress: [
    { month: "Jan", probability: 58, tasksCompleted: 26 },
    { month: "Feb", probability: 63, tasksCompleted: 35 },
    { month: "Mar", probability: 68, tasksCompleted: 43 },
    { month: "Apr", probability: 72, tasksCompleted: 51 },
  ],
  skills: {
    dsa: 70,
    aptitude: 71,
    communication: 76,
    domainKnowledge: 73,
    resumeQuality: 82,
    mockInterviewScore: 69,
  },
  batchAvgSkills: {
    dsa: 62,
    aptitude: 65,
    communication: 70,
    domainKnowledge: 67,
    resumeQuality: 75,
    mockInterviewScore: 63,
  },
  activityHeatmap: Array.from({ length: 56 }, (_, index) => ({
    date: `2026-03-${String((index % 28) + 1).padStart(2, "0")}`,
    count: index % 7 === 0 ? 0 : (index % 5) + 1,
  })),
};

export const STUDENT_PROFILE_COMPLETION_CARD = {
  completion: 78,
  attentionText: "Add 2 missing sections for recruiter-ready profile",
  actionLabel: "Complete Now",
};

export const STUDENT_AI_INSIGHT_SHEET = {
  headline: "You can cross 75% readiness this month",
  summary:
    "Your recent consistency is strong. The biggest gain now comes from mock interview depth and DSA mediums.",
  bullets: [
    "Book one problem-solving mock by Friday to unlock the highest short-term probability gain.",
    "Finish 12 medium DSA problems from Graphs and DP in the next 7 days.",
    "Your resume is strong; focus effort on communication and structured storytelling.",
  ],
};

export const STUDENT_PROGRESS_RANGES = [
  "This Week",
  "This Month",
  "Last 3 Months",
  "Last 6 Months",
];

export const STUDENT_SKILL_CARDS = [
  {
    id: "dsa",
    label: "DSA",
    icon: "Code2",
    currentScore: 70,
    trend: [52, 55, 58, 60, 62, 66, 68, 70],
    delta: 8,
    batchAverage: 62,
    percentile: 42,
    diagnosis: "Steady rise in mediums; graphs and DP still need focused reps.",
    actionLabel: "Practice DSA",
  },
  {
    id: "aptitude",
    label: "Aptitude",
    icon: "Cpu",
    currentScore: 71,
    trend: [60, 61, 62, 64, 66, 68, 70, 71],
    delta: 5,
    batchAverage: 65,
    percentile: 46,
    diagnosis: "Speed is improving; maintain daily timed sets for consistency.",
    actionLabel: "Take Timed Test",
  },
  {
    id: "communication",
    label: "Communication",
    icon: "MessageSquare",
    currentScore: 76,
    trend: [65, 66, 68, 70, 71, 73, 75, 76],
    delta: 4,
    batchAverage: 70,
    percentile: 39,
    diagnosis: "Clear progress in structure and confidence during mock answers.",
    actionLabel: "Practice Pitch",
  },
  {
    id: "domainKnowledge",
    label: "Domain Knowledge",
    icon: "BookOpen",
    currentScore: 73,
    trend: [61, 63, 65, 66, 68, 70, 72, 73],
    delta: 5,
    batchAverage: 67,
    percentile: 44,
    diagnosis: "Core concepts are solid; revise advanced edge-case patterns.",
    actionLabel: "Revise Notes",
  },
  {
    id: "resumeQuality",
    label: "Resume Quality",
    icon: "FileCheck",
    currentScore: 82,
    trend: [70, 72, 74, 76, 78, 79, 81, 82],
    delta: 3,
    batchAverage: 75,
    percentile: 31,
    diagnosis: "Strong ATS alignment and measurable project bullets.",
    actionLabel: "Preview Resume",
  },
  {
    id: "mockInterviewScore",
    label: "Mock Interview Score",
    icon: "Mic",
    currentScore: 69,
    trend: [51, 54, 56, 59, 61, 64, 67, 69],
    delta: 6,
    batchAverage: 63,
    percentile: 48,
    diagnosis: "Improve follow-up handling and concise trade-off explanations.",
    actionLabel: "Book Mock",
  },
];

export const STUDENT_STREAK_INSIGHT =
  "You are 2 active days away from matching your longest streak. Continuing this cadence typically lifts placement readiness by 3-5 points over two weeks.";

export const STUDENT_ACTIVITY_BREAKDOWN_CURRENT = [
  { day: "Mon", leetCode: 2, mockTests: 1, courses: 1, profileUpdates: 0 },
  { day: "Tue", leetCode: 3, mockTests: 1, courses: 1, profileUpdates: 1 },
  { day: "Wed", leetCode: 2, mockTests: 0, courses: 2, profileUpdates: 1 },
  { day: "Thu", leetCode: 4, mockTests: 1, courses: 1, profileUpdates: 0 },
  { day: "Fri", leetCode: 3, mockTests: 1, courses: 1, profileUpdates: 1 },
  { day: "Sat", leetCode: 5, mockTests: 1, courses: 0, profileUpdates: 0 },
  { day: "Sun", leetCode: 2, mockTests: 0, courses: 1, profileUpdates: 0 },
];

export const STUDENT_ACTIVITY_BREAKDOWN_PREVIOUS = [
  { day: "Mon", leetCode: 1, mockTests: 0, courses: 1, profileUpdates: 0 },
  { day: "Tue", leetCode: 2, mockTests: 1, courses: 0, profileUpdates: 0 },
  { day: "Wed", leetCode: 2, mockTests: 0, courses: 1, profileUpdates: 0 },
  { day: "Thu", leetCode: 3, mockTests: 0, courses: 1, profileUpdates: 0 },
  { day: "Fri", leetCode: 2, mockTests: 1, courses: 0, profileUpdates: 1 },
  { day: "Sat", leetCode: 3, mockTests: 0, courses: 1, profileUpdates: 0 },
  { day: "Sun", leetCode: 1, mockTests: 0, courses: 0, profileUpdates: 0 },
];

export const STUDENT_MONTHLY_SUMMARY = [
  { label: "Problems Solved", value: "184", delta: "+27", tone: "violet" },
  { label: "Mocks Completed", value: "6", delta: "+2", tone: "amber" },
  { label: "Courses Finished", value: "4", delta: "+1", tone: "blue" },
  { label: "Profile Updates", value: "11", delta: "+3", tone: "emerald" },
];

export const STUDENT_COHORT_COMPARISON = [
  { skill: "DSA", yourScore: 70, batchAverage: 62, percentile: 42 },
  { skill: "Aptitude", yourScore: 71, batchAverage: 65, percentile: 46 },
  { skill: "Communication", yourScore: 76, batchAverage: 70, percentile: 39 },
  { skill: "Domain Knowledge", yourScore: 73, batchAverage: 67, percentile: 44 },
  { skill: "Resume Quality", yourScore: 82, batchAverage: 75, percentile: 31 },
  { skill: "Mock Interview", yourScore: 69, batchAverage: 63, percentile: 48 },
];

export const STUDENT_DSA_TOPIC_BREAKDOWN = [
  { topic: "Arrays", solved: 34, accuracy: "86%", status: "Strong", tone: "emerald" },
  { topic: "Strings", solved: 26, accuracy: "81%", status: "Strong", tone: "emerald" },
  { topic: "Trees", solved: 22, accuracy: "69%", status: "Improving", tone: "amber" },
  { topic: "Graphs", solved: 14, accuracy: "56%", status: "Needs Focus", tone: "rose" },
  { topic: "Dynamic Programming", solved: 11, accuracy: "49%", status: "Needs Focus", tone: "rose" },
];

export const STUDENT_RECOMMENDED_PROBLEMS = [
  "200. Number of Islands",
  "743. Network Delay Time",
  "300. Longest Increasing Subsequence",
  "322. Coin Change",
  "146. LRU Cache",
];

export const STUDENT_IMPROVEMENT_PLAN = [
  { id: "imp-1", week: "Week 1", task: "Finish graph traversals and 15 BFS/DFS questions.", completed: true },
  { id: "imp-2", week: "Week 2", task: "Practice 10 DP patterns and revise recursion templates.", completed: false },
  { id: "imp-3", week: "Week 3", task: "Take two full mock rounds with timed explanations.", completed: false },
  { id: "imp-4", week: "Week 4", task: "Polish resume storytelling and behavioral answers.", completed: false },
];

export const STUDENT_MOCK_STATS = [
  { label: "Mocks Taken", value: "6", delta: "+2 this month", tone: "violet" },
  { label: "Average Score", value: "69/100", delta: "+6 pts", tone: "emerald" },
  { label: "Best Score", value: "81/100", delta: "Technical Round", tone: "amber" },
  { label: "Pending Reviews", value: "1", delta: "Awaiting feedback", tone: "violet" },
];

export const STUDENT_UPCOMING_MOCK = {
  dateLabel: "Fri, 12 Apr · 4:30 PM",
  type: "Problem Solving + Resume Deep Dive",
  interviewer: "Priya Nair (SDE-II)",
  countdown: "01d : 05h",
};

export const STUDENT_MOCK_ATTEMPTS = [
  {
    id: "mock-1",
    date: "02 Apr 2026",
    type: "Technical Round",
    score: 64,
    feedbackSummary: "Good fundamentals; needs sharper trade-off articulation.",
    strengths: ["Array patterns", "Code readability"],
    improvements: ["Complexity analysis", "Edge-case probing"],
    scoreBreakdown: [
      { label: "Problem Solving", value: 66 },
      { label: "Communication", value: 61 },
      { label: "System Thinking", value: 58 },
      { label: "Confidence", value: 69 },
    ],
    questionReview: [
      "Solved two medium problems with clean structure.",
      "Missed optimization in sliding window follow-up.",
    ],
    aiTips: [
      "Narrate brute-force first, then optimize step-by-step.",
      "Summarize constraints before coding to reduce rework.",
    ],
  },
  {
    id: "mock-2",
    date: "06 Apr 2026",
    type: "HR + Behavioral",
    score: 72,
    feedbackSummary: "Clear structure with stronger confidence and examples.",
    strengths: ["STAR framing", "Calm delivery"],
    improvements: ["Quantify outcomes", "Shorten introductions"],
    scoreBreakdown: [
      { label: "Clarity", value: 75 },
      { label: "Confidence", value: 74 },
      { label: "Relevance", value: 69 },
      { label: "Structure", value: 70 },
    ],
    questionReview: [
      "Strong ownership examples for conflict resolution.",
      "Need more measurable impact in final answer.",
    ],
    aiTips: [
      "Keep each answer under 90 seconds when possible.",
      "Anchor examples with one concrete metric.",
    ],
  },
];

export const STUDENT_BOOK_MOCK_OPTIONS = {
  types: [
    "Technical Round",
    "Problem Solving",
    "HR + Behavioral",
    "Resume Deep Dive",
  ],
  slots: [
    "Tue 11:00 AM",
    "Wed 3:30 PM",
    "Fri 4:30 PM",
    "Sat 10:00 AM",
  ],
};

export const STUDENT_ACTION_PLAN_HEADER = {
  generatedOn: "Generated on 09 Apr 2026 · 08:20 AM",
  riskLabel: "Medium Risk",
  projection: "Following this plan can improve your placement probability by +11 points in 4 weeks.",
};

export const STUDENT_ACTION_PLAN_PROJECTION = [
  { week: "W-2", current: 63, plan: 63 },
  { week: "W-1", current: 66, plan: 66 },
  { week: "Today", current: 72, plan: 72 },
  { week: "W+1", current: 72, plan: 75 },
  { week: "W+2", current: 71, plan: 78 },
  { week: "W+3", current: 71, plan: 81 },
  { week: "W+4", current: 70, plan: 83 },
];

export const STUDENT_ACTION_PLAN_TASKS = {
  critical: [
    {
      id: "crit-1",
      title: "Complete Graph + DP sprint",
      why: "These topics currently drive most misses in coding rounds.",
      impact: "+4 pts readiness",
      due: "Due in 5 days",
      ctaLabel: "Start Sprint",
      href: "/student/skill-tracker#dsa",
      icon: "Code2",
      progress: 5,
      total: 15,
    },
  ],
  high: [
    {
      id: "high-1",
      title: "Book and finish one problem-solving mock",
      why: "Live pressure simulation improves conversion in final rounds.",
      impact: "+3 pts readiness",
      due: "Due this week",
      ctaLabel: "Book Mock",
      href: "/student/mock-interviews",
      icon: "Mic",
      progress: 0,
      total: 1,
    },
  ],
  medium: [
    {
      id: "med-1",
      title: "Refine 3 project stories on resume",
      why: "Sharper storytelling raises recruiter confidence.",
      impact: "+2 pts readiness",
      due: "Due in 10 days",
      ctaLabel: "Update Resume",
      href: "/student/profile-builder",
      icon: "FileText",
      progress: 1,
      total: 3,
    },
  ],
};

export const STUDENT_WEEKLY_CHECKLIST = [
  { id: "wk-1", label: "Solve 20 DSA medium problems", completed: true },
  { id: "wk-2", label: "Complete 2 aptitude timed tests", completed: true },
  { id: "wk-3", label: "Attend 1 mock interview", completed: false },
  { id: "wk-4", label: "Update resume metrics", completed: false },
  { id: "wk-5", label: "Publish one project demo", completed: true },
];

export const STUDENT_ACHIEVEMENT_STATS = [
  { label: "Badges Earned", value: "18", delta: "+2 this month", tone: "amber" },
  { label: "Leaderboard Rank", value: "#27", delta: "Top 10%", tone: "violet" },
  { label: "Certifications", value: "7", delta: "+1 recent", tone: "emerald" },
  { label: "Milestones", value: "12", delta: "On track", tone: "blue" },
];

export const STUDENT_BADGES = [
  {
    id: "badge-1",
    name: "Consistency Pro",
    description: "Active for 10 consecutive days.",
    icon: "Flame",
    tone: "amber",
    earned: true,
    earnedDate: "Earned 08 Apr 2026",
  },
  {
    id: "badge-2",
    name: "Mock Warrior",
    description: "Completed 5+ mock interviews.",
    icon: "Mic",
    tone: "violet",
    earned: true,
    earnedDate: "Earned 02 Apr 2026",
  },
  {
    id: "badge-3",
    name: "Resume Ready",
    description: "Achieved ATS score above 80.",
    icon: "FileCheck",
    tone: "emerald",
    earned: true,
    earnedDate: "Earned 29 Mar 2026",
  },
  {
    id: "badge-4",
    name: "Top Coder",
    description: "Solve 250 coding problems.",
    icon: "Code",
    tone: "yellow",
    earned: false,
    unlockCriteria: "Solve 66 more problems",
  },
];

export const STUDENT_LEADERBOARD = [
  { rank: 21, name: "ID-9F2A", placementProbability: 84, score: 912, mockCount: 9 },
  { rank: 24, name: "ID-0D7K", placementProbability: 81, score: 904, mockCount: 8 },
  { rank: 27, name: "You (ID-2M3Q)", placementProbability: 72, score: 861, mockCount: 6, isCurrentStudent: true },
  { rank: 30, name: "ID-5R1Z", placementProbability: 70, score: 850, mockCount: 6 },
  { rank: 32, name: "ID-4H8T", placementProbability: 69, score: 845, mockCount: 5 },
];

export const STUDENT_CERTIFICATIONS = [
  {
    id: "cert-1",
    name: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    issueDate: "Issued Jan 2026",
    category: "Cloud",
    relevance: "relevant",
  },
  {
    id: "cert-2",
    name: "Data Structures & Algorithms",
    organization: "Coursera",
    issueDate: "Issued Mar 2026",
    category: "DSA",
    relevance: "relevant",
  },
  {
    id: "cert-3",
    name: "Prompting for Engineers",
    organization: "DeepLearning.AI",
    issueDate: "Issued Apr 2026",
    category: "AI/ML",
    relevance: "suggested",
  },
];

export const STUDENT_NOTIFICATION_STATS = [
  { label: "Unread", value: "4", tone: "rose" },
  { label: "TPC Alerts", value: "2", tone: "amber" },
  { label: "AI Nudges", value: "5", tone: "violet" },
  { label: "System", value: "3", tone: "slate" },
];

export const STUDENT_NOTIFICATION_FILTERS = [
  "All",
  "TPC Alerts",
  "AI Nudges",
  "Reminders",
  "System",
];

export const STUDENT_NOTIFICATIONS = [
  {
    id: "note-1",
    type: "tpc",
    title: "Resume review slot assigned",
    description: "Your resume review is scheduled for Thursday 3:00 PM with the TPC panel.",
    timestamp: "12 mins ago",
    unread: true,
    actionLabel: "View Slot",
  },
  {
    id: "note-2",
    type: "ai",
    title: "AI nudge: focus on Graphs",
    description: "You are within +3 points of threshold. Graph practice can unlock the jump.",
    timestamp: "1 hour ago",
    unread: true,
    actionLabel: "Open Plan",
  },
  {
    id: "note-3",
    type: "reminder",
    title: "Mock interview tomorrow",
    description: "Prepare your project walkthrough and two STAR behavioral examples.",
    timestamp: "3 hours ago",
    unread: true,
    actionLabel: "View Checklist",
  },
  {
    id: "note-4",
    type: "achievement",
    title: "New badge unlocked",
    description: "You earned the Consistency Pro badge for maintaining a 10-day streak.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "note-5",
    type: "system",
    title: "Profile sync completed",
    description: "Your profile has been synced with recruiter-facing view.",
    timestamp: "2 days ago",
    unread: false,
  },
];

export const PROFILE_SECTION_ORDER: ProfileSection[] = [
  "basic",
  "academic",
  "resume",
  "links",
  "contests",
  "certifications",
  "projects",
  "experience",
  "skills",
  "preferences",
  "additional",
];

export const PROFILE_SECTION_META = [
  {
    id: "basic",
    title: "Basic Info",
    completion: 92,
    status: "partial",
    aiTip: "Add a professional photo and verify phone number.",
  },
  {
    id: "academic",
    title: "Academic Details",
    completion: 100,
    status: "complete",
    aiTip: "Academic profile is strong for most product roles.",
  },
  { id: "resume", title: "Resume", completion: 82, status: "partial", aiTip: "Quantify outcomes in two project bullets." },
  { id: "links", title: "Public Links", completion: 76, status: "partial", aiTip: "Add one portfolio/demo link for credibility." },
  { id: "contests", title: "Contest Ratings", completion: 68, status: "partial", aiTip: "Include your latest contest rank for recency." },
  { id: "certifications", title: "Certifications", completion: 84, status: "partial", aiTip: "Mark relevance to target role for better matching." },
  { id: "projects", title: "Projects", completion: 79, status: "partial", aiTip: "Add one team project with deployment metrics." },
  { id: "experience", title: "Experience", completion: 64, status: "partial", aiTip: "Highlight measurable outcomes from internship work." },
  { id: "skills", title: "Skills", completion: 88, status: "partial", aiTip: "Raise self-ratings only when backed by project evidence." },
  { id: "preferences", title: "Preferences", completion: 95, status: "complete", aiTip: "Preferences are aligned with your current trajectory." },
  { id: "additional", title: "Additional", completion: 71, status: "partial", aiTip: "Complete parent contact and language details." },
];

export const STUDENT_PROFILE_OPTIONS = {
  departments: ["CSE", "IT", "ECE", "MECH", "CIVIL", "MBA"],
  years: ["1st", "2nd", "3rd", "4th"],
  genders: ["Male", "Female", "Other", "Prefer not to say"],
  contestPlatforms: ["LeetCode", "Codeforces", "CodeChef", "HackerRank", "AtCoder"],
  certificateCategories: ["Cloud", "DSA", "Web Dev", "AI/ML", "Database", "Soft Skills", "Other"],
  projectTypes: ["Academic", "Personal", "Open Source", "Freelance", "Internship"],
  employmentTypes: ["Internship", "Part-time", "Full-time", "Contract"],
  targetRoles: ["SDE", "Data Analyst", "Backend Engineer", "Frontend Engineer", "QA Engineer", "Product Analyst"],
  preferredDomains: ["Product", "FinTech", "SaaS", "AI/ML", "Core Engineering", "Consulting"],
  preferredLocations: ["Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai", "Remote"],
  noticePeriods: ["Immediate", "15 days", "30 days", "60 days"],
  workModes: ["In-Office", "Hybrid", "Remote", "No Preference"],
  categories: ["General", "OBC", "SC", "ST", "EWS"],
};

export const STUDENT_PROFILE_FORM_DEFAULTS: ProfileBuilderFormValues = {
  basic: {
    fullName: STUDENT_PROFILE.name,
    rollNumber: STUDENT_PROFILE.rollNo,
    department: "CSE",
    yearOfStudy: "4th",
    expectedGraduation: "2026",
    dateOfBirth: "2004-02-18",
    phoneNumber: "+91 9876543210",
    gender: "Female",
    profilePhotoUrl: "",
  },
  academic: {
    cgpa: 8.3,
    tenthPercentage: 92.4,
    twelfthPercentage: 89.1,
    activeBacklogs: 0,
    historicalBacklogs: 0,
    specialization: "Artificial Intelligence",
    collegeName: "Vigilo Institute of Technology",
    university: "VTU",
  },
  resume: {
    resumeLink: "",
    atsScore: 82,
    lastUpdated: "2026-04-08",
    checklist: [
      { id: "resume-check-1", label: "Include quantified achievements", completed: true },
      { id: "resume-check-2", label: "Add GitHub and deployed project links", completed: true },
      { id: "resume-check-3", label: "Keep resume to one page", completed: false },
      { id: "resume-check-4", label: "Tailor summary for target role", completed: false },
    ],
  },
  links: [
    {
      id: "link-1",
      platform: "GitHub",
      icon: "Github",
      tone: "sky",
      url: "",
      visibility: "public",
      verified: true,
    },
    {
      id: "link-2",
      platform: "LinkedIn",
      icon: "Linkedin",
      tone: "violet",
      url: "",
      visibility: "public",
      verified: true,
    },
  ],
  contests: [
    {
      id: "contest-1",
      platform: "LeetCode",
      rating: 1735,
      rank: "Knight",
      percentile: 88,
      contestName: "Weekly Contest 395",
      date: "2026-04-06",
    },
  ],
  certifications: [
    {
      id: "cert-default-1",
      name: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      issueDate: "2026-01-11",
      expiryDate: "",
      noExpiry: true,
      credentialId: "",
      url: "",
      category: "Cloud",
      relevance: "relevant",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Placement Tracker",
      description: "Built a predictive placement dashboard with role-fit analytics and action nudges.",
      techStack: ["Next.js", "TypeScript", "Supabase"],
      demoUrl: "",
      githubUrl: "",
      type: "Personal",
      startDate: "2025-11",
      endDate: "2026-02",
      ongoing: false,
      teamSize: 2,
      achievement: "Improved mock completion by 18% in pilot.",
    },
  ],
  experience: [
    {
      id: "exp-1",
      companyName: "Innova Labs",
      role: "Software Engineer Intern",
      employmentType: "Internship",
      startDate: "2025-06",
      endDate: "2025-08",
      present: false,
      location: "Bangalore",
      remote: true,
      description: "Worked on analytics widgets and API integration for recruiter dashboards.",
      stipend: 30000,
      offerLetterUrl: "",
      skillsUsed: ["React", "TypeScript", "SQL"],
    },
  ],
  skills: {
    technical: [
      { id: "tech-1", name: "TypeScript", selfRating: 4, aiRating: 3.8 },
      { id: "tech-2", name: "DSA", selfRating: 4, aiRating: 3.5 },
      { id: "tech-3", name: "React", selfRating: 4, aiRating: 3.7 },
    ],
    soft: [
      { id: "soft-1", label: "Communication", level: "yes" },
      { id: "soft-2", label: "Leadership", level: "developing" },
      { id: "soft-3", label: "Teamwork", level: "yes" },
      { id: "soft-4", label: "Problem Solving", level: "yes" },
      { id: "soft-5", label: "Time Management", level: "developing" },
      { id: "soft-6", label: "Presentation Skills", level: "developing" },
      { id: "soft-7", label: "Critical Thinking", level: "yes" },
    ],
  },
  preferences: {
    targetRoles: ["SDE", "Backend Engineer"],
    preferredDomains: ["Product", "AI/ML"],
    preferredLocations: ["Bangalore", "Hyderabad"],
    ctcRange: [8, 16],
    openToRelocation: true,
    noticePeriod: "Immediate",
    workModePreference: "Hybrid",
    aiMatchScore: 84,
  },
  additional: {
    fatherName: "Ravi Krishnan",
    motherName: "Lakshmi Krishnan",
    parentContactNumber: "+91 9988776655",
    permanentAddress: "Bengaluru, Karnataka",
    category: "General",
    differentlyAbled: false,
    differentlyAbledDetails: "",
    passportAvailable: true,
    languages: ["English", "Hindi", "Kannada"],
    hobbies: ["Chess", "Running", "Reading"],
  },
};
