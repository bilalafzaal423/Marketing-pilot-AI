export type ActiveTab = 'dashboard' | 'campaigns' | 'ai-studio' | 'leads';

export type TimeRange = '7D' | '30D' | '90D' | '12M';

export interface Campaign {
  id: string;
  name: string;
  target: string;
  channels: string[];
  objective: string;
  budgetSpend: number;
  budgetCap: number;
  pacingPercent: number;
  status: 'active' | 'paused' | 'draft';
  startedDaysAgo?: number;
  remainingDays?: number;
  statusNote?: string;
  metrics: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
    label3: string;
    value3: string;
    label4: string;
    value4: string;
  };
  highlightBadge?: string;
  autoShiftAi?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  score: number;
  isHot?: boolean;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  source: string;
  sourceIcon: string;
  estValueArr: number;
  assignedTo: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  email: string;
  phone: string;
  location: string;
  companySize: string;
  technologies: string[];
  avatar: string;
  avatarDetail?: string;
  timeline: {
    title: string;
    time: string;
    description: string;
    type?: 'submission' | 'email' | 'ai';
  }[];
}

export interface PulseItem {
  id: string;
  title: string;
  time: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  iconColor: string;
  read: boolean;
}

export interface CreativeAsset {
  id: string;
  title: string;
  imageUrl: string;
  badge: string;
  channel: string;
}

export interface CopyLibraryItem {
  id: string;
  title: string;
  channel: string;
  badge: string;
  snippet: string;
  usedAgo: string;
}
