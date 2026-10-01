import { Campaign, Lead, PulseItem, NotificationItem, CreativeAsset, CopyLibraryItem } from '../types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'CMP-9042',
    name: 'Q3 High-Intent B2B Pipeline',
    target: 'Target: CMO & VP Growth in US/CA',
    channels: ['Google Ads', 'LinkedIn'],
    objective: 'Lead Gen',
    budgetSpend: 3420,
    budgetCap: 4800,
    pacingPercent: 71,
    status: 'active',
    startedDaysAgo: 18,
    remainingDays: 12,
    metrics: {
      label1: 'Leads',
      value1: '312',
      label2: 'CPL',
      value2: '$10.96',
      label3: 'Conv. Rate',
      value3: '4.82%',
      label4: 'ROAS',
      value4: '3.8x',
    },
    highlightBadge: '+14.2% lead velocity',
    autoShiftAi: true,
  },
  {
    id: 'CMP-7718',
    name: 'Omnichannel Retargeting Surge',
    target: 'Abandoned demo signups & visited pricing',
    channels: ['Meta Ads', 'Nurture Sequence'],
    objective: 'Retargeting',
    budgetSpend: 1890,
    budgetCap: 2200,
    pacingPercent: 85,
    status: 'active',
    remainingDays: 4,
    statusNote: 'Pacing on schedule • Ends in 4 days',
    metrics: {
      label1: 'Booked',
      value1: '144',
      label2: 'CPD',
      value2: '$13.12',
      label3: 'CTR',
      value3: '6.10%',
      label4: 'ROAS',
      value4: '4.2x',
    },
    highlightBadge: 'Target CAC reached',
    autoShiftAi: true,
  },
  {
    id: 'CMP-6210',
    name: 'EU Summer Brand Awareness',
    target: 'Top-of-funnel video creatives on Meta & IG',
    channels: ['Meta IG Reels'],
    objective: 'Awareness',
    budgetSpend: 950,
    budgetCap: 3000,
    pacingPercent: 31,
    status: 'paused',
    statusNote: 'Paused by Sarah Chen • Creative fatigue detected',
    metrics: {
      label1: 'Impr.',
      value1: '89.4K',
      label2: 'CPM',
      value2: '$10.62',
      label3: 'CTR',
      value3: '1.22%',
      label4: 'ROAS',
      value4: '1.1x',
    },
    highlightBadge: 'Paused for creative refresh',
    autoShiftAi: false,
  },
  {
    id: 'CMP-8812',
    name: 'Summer SaaS Scale-Up',
    target: 'Google Ads • Meta Performance',
    channels: ['Google Ads', 'Meta Performance'],
    objective: 'Scale Up',
    budgetSpend: 8420,
    budgetCap: 12000,
    pacingPercent: 70,
    status: 'active',
    startedDaysAgo: 22,
    remainingDays: 8,
    metrics: {
      label1: 'ROAS',
      value1: '5.2x',
      label2: 'Leads',
      value2: '412',
      label3: 'Avg CPC',
      value3: '$3.40',
      label4: 'Pacing',
      value4: '70%',
    },
    highlightBadge: 'AI Budget Auto-Shift ON',
    autoShiftAi: true,
  },
  {
    id: 'CMP-5140',
    name: 'Q3 Enterprise Outbound',
    target: 'LinkedIn InMail + InFeed',
    channels: ['LinkedIn'],
    objective: 'CXO Decision Maker Focus',
    budgetSpend: 5150,
    budgetCap: 8000,
    pacingPercent: 64,
    status: 'active',
    metrics: {
      label1: 'ROAS',
      value1: '4.1x',
      label2: 'Leads',
      value2: '184',
      label3: 'Open Rate',
      value3: '58.2%',
      label4: 'Pacing',
      value4: '64%',
    },
    highlightBadge: 'CXO Decision Maker Focus',
    autoShiftAi: true,
  },
  {
    id: 'CMP-3200',
    name: 'Prompt Playbook Magnet',
    target: 'Meta Ads • Drip Email',
    channels: ['Meta Ads', 'Email Flow'],
    objective: 'Lead Magnet',
    budgetSpend: 3200,
    budgetCap: 4000,
    pacingPercent: 80,
    status: 'active',
    metrics: {
      label1: 'ROAS',
      value1: '6.8x',
      label2: 'Leads',
      value2: '620',
      label3: 'CPL',
      value3: '$5.16',
      label4: 'Pacing',
      value4: '80%',
    },
    highlightBadge: '$5.16 CPL (Industry Best)',
    autoShiftAi: true,
  },
  {
    id: 'CMP-1800',
    name: 'Product Hunt Retargeting',
    target: 'X / Twitter • Meta Display',
    channels: ['X / Twitter', 'Meta'],
    objective: 'Retargeting',
    budgetSpend: 1800,
    budgetCap: 2500,
    pacingPercent: 72,
    status: 'paused',
    statusNote: 'Awaiting creative refresh • Completed',
    metrics: {
      label1: 'ROAS',
      value1: '2.9x',
      label2: 'Leads',
      value2: '95',
      label3: 'CTR',
      value3: '1.4%',
      label4: 'Status',
      value4: 'Paused',
    },
    highlightBadge: 'Awaiting creative refresh',
    autoShiftAi: false,
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'alex',
    name: 'Alex Morgan',
    role: 'VP of Growth',
    company: 'TechFlow Inc',
    score: 96,
    isHot: true,
    status: 'qualified',
    source: 'Google Search Ads - Enterprise Intent',
    sourceIcon: 'ads_click',
    estValueArr: 24000,
    assignedTo: {
      name: 'Sarah Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw'
    },
    email: 'alex.morgan@techflow.io',
    phone: '+1 (415) 890-2341',
    location: 'San Francisco, CA',
    companySize: '50 - 200 Employees (Series B)',
    technologies: ['HubSpot CRM', 'Segment CDP', 'Google Ads', 'Mixpanel', 'Next.js'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3eOmMoFhSJqvQ1yhzWbE1FpJreapt19XM_oJHUxEabh47HZlB0VzidBoRvEWnmJyZ1fTmZfEph-cQMbwvTdtH6mxHhTWxiER8jPVj2fvx_hSJqRfglQxLBxcdEtKgewSm9b4ObggoxyNoKYEYBfpYiUFgDa0Pwy9qduvCniAdYrI9_RpligZjKjG7Tm-zIj0ruJi8USmwXJhIDFstshKKcSvR5vrhnI-EuSeENKql6JJ3GTLkeOGoJQ',
    avatarDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGh4k6k7UysarENBRbu5S-P6QKajFFqw7Xl9JulT2kX6osQqYjS2KjXHnH7r3eR94CveQdwU8Mq2duCGSM4WGaDGsSIOkVO3_a9Pb-ohNyTtVj8b7CGWmZeemH05aE4ZY1VJF1azgweXnhOo48xLTsvK97GV0g4a-wny83W7aS5ixr8hCPAPFRa4DWwwcHHET40344dWmmivq0Hh3RnL9-C7CWc455rIYzx9mnyaiGkBWFoeZvETZCug',
    timeline: [
      {
        title: 'Form submitted: Enterprise Demo Request',
        time: 'Yesterday, 4:15 PM',
        description: 'Selected interest: "Multi-channel AI Attribution & Automation"',
        type: 'submission'
      },
      {
        title: 'Email opened: Case Study',
        time: 'Today, 9:20 AM',
        description: '"How SaaS scaled to $5M ARR with Pilot Copilot" (3 read sessions)',
        type: 'email'
      },
      {
        title: 'AI Follow-up Draft Prepared',
        time: 'Today, 10:05 AM',
        description: '"Personalized pitch emphasizing TechFlow\'s $24k ARR expansion potential is ready to send."',
        type: 'ai'
      }
    ]
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Head of Demand Gen',
    company: 'CloudPulse',
    score: 88,
    isHot: false,
    status: 'proposal',
    source: 'LinkedIn Ads - Enterprise Campaign',
    sourceIcon: 'share',
    estValueArr: 18500,
    assignedTo: {
      name: 'Marc V.',
      initials: 'MV'
    },
    email: 'elena@cloudpulse.tech',
    phone: '+1 (212) 555-0192',
    location: 'New York, NY',
    companySize: '100 - 500 Employees',
    technologies: ['Salesforce', 'Marketo', 'LinkedIn Campaign Mgr', 'Tableau'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUNKWAGNpL5Wvvjd2lV4nPN6e9SeaVghv2q7ufJf7-uvk-wbkLRYq1IscDf152s3d4FSm3qUdlLiQHT7mWVqrvJjxO4i-JAuBAO6ZTL8_Ts8z5OM2TaYbIhXM_mlEUtr997PA_6rvNmqvaoYTiqJripiZ2R_gfxrumU7ObVn-S3ikwYZHq5UiqNgq6FrWYmC8CTP0Po52SweIgYqVfeCxj0OA4rXCnUeCWw4Ryb6kCfaafyOX_SswlCA',
    timeline: [
      {
        title: 'Proposal Document Sent',
        time: '2 days ago',
        description: 'Custom Enterprise Tier: $18,500 annual contract with multi-seat Copilot.',
        type: 'submission'
      },
      {
        title: 'Security Review Questionnaire Received',
        time: 'Yesterday, 2:30 PM',
        description: 'CloudPulse compliance team requested SOC2 Type II validation docs.',
        type: 'email'
      }
    ]
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Founder',
    company: 'OmniRetail AI',
    score: 79,
    isHot: false,
    status: 'contacted',
    source: 'AI Studio Webinar - High Engagement',
    sourceIcon: 'auto_awesome',
    estValueArr: 12000,
    assignedTo: {
      name: 'Sarah Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw'
    },
    email: 'marcus@omniretail.ai',
    phone: '+1 (312) 441-9982',
    location: 'Chicago, IL',
    companySize: '20 - 50 Employees (Seed Funded)',
    technologies: ['Shopify Plus', 'Klaviyo', 'PostgreSQL', 'Stripe'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtWxG_E3Ba2TrOw3VRedqzEl88Djk94uwGfhHFKt2tHPBJciaeW15nfpW6S08F_LRnGGDxL01fqGCwr3CwnKaibS40esAROy-SVMCC1M6bn547Vpl6H9kV6BfAAPxn3EU3B_P5qe2keINSIgdYa1KphsuFmPqxS7kVcQLmwuByt4nxBKvVnQpA60dd4HQGZllP9WbB_95enQoapfllnnceS2OuVyLEH3kBRLrWBsONu3CKnmlyd_PfUg',
    timeline: [
      {
        title: 'Attended Live Product Demo Webinar',
        time: '3 days ago',
        description: 'Stayed 54 minutes; asked question about automated Meta CPA caps.',
        type: 'submission'
      },
      {
        title: 'Discovery Call Held by Sarah Chen',
        time: 'Yesterday, 11:00 AM',
        description: 'Expressed strong interest in replacing manual agency retainer.',
        type: 'submission'
      }
    ]
  },
  {
    id: 'samantha',
    name: 'Samantha Wright',
    role: 'Chief Revenue Officer',
    company: 'Apex Logistics',
    score: 94,
    isHot: true,
    status: 'won',
    source: 'Organic SEO Inbound',
    sourceIcon: 'travel_explore',
    estValueArr: 36000,
    assignedTo: {
      name: 'Sarah Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw'
    },
    email: 'samantha@apexlogistics.io',
    phone: '+1 (206) 882-1922',
    location: 'Seattle, WA',
    companySize: '500+ Employees',
    technologies: ['SAP', 'Salesforce CRM', 'Google Ads', 'Snowflake'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw',
    timeline: [
      {
        title: 'Master Service Agreement Signed',
        time: 'Yesterday, 5:00 PM',
        description: 'Contract finalized for annual enterprise license ($36k ARR).',
        type: 'submission'
      }
    ]
  },
  {
    id: 'david',
    name: 'David Cho',
    role: 'Growth Marketing Lead',
    company: 'FinStack Systems',
    score: 82,
    isHot: false,
    status: 'new',
    source: 'Meta IG Retargeting',
    sourceIcon: 'public',
    estValueArr: 15000,
    assignedTo: {
      name: 'Marc V.',
      initials: 'MV'
    },
    email: 'david.cho@finstack.co',
    phone: '+1 (650) 332-9011',
    location: 'Austin, TX',
    companySize: '35 Employees',
    technologies: ['Pipedrive', 'Google Analytics 4', 'Webflow'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3eOmMoFhSJqvQ1yhzWbE1FpJreapt19XM_oJHUxEabh47HZlB0VzidBoRvEWnmJyZ1fTmZfEph-cQMbwvTdtH6mxHhTWxiER8jPVj2fvx_hSJqRfglQxLBxcdEtKgewSm9b4ObggoxyNoKYEYBfpYiUFgDa0Pwy9qduvCniAdYrI9_RpligZjKjG7Tm-zIj0ruJi8USmwXJhIDFstshKKcSvR5vrhnI-EuSeENKql6JJ3GTLkeOGoJQ',
    timeline: [
      {
        title: 'Downloaded 2025 Growth Benchmark Report',
        time: '4 hours ago',
        description: 'Form submission on landing page /resources/b2b-saas-benchmarks',
        type: 'submission'
      }
    ]
  }
];

export const PULSE_FEED_ITEMS: PulseItem[] = [
  {
    id: 'pulse-1',
    title: 'Campaign Auto-Optimized',
    time: '12m ago',
    description: 'AI shifted $1,400 daily spend from meta lookalikes to high-intent search terms.',
    icon: 'rocket_launch',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    id: 'pulse-2',
    title: 'AI Creative Published',
    time: '42m ago',
    description: '"5 Ways B2B Leaders Automate Ad Creatives" distributed across LinkedIn & X profiles.',
    icon: 'auto_awesome',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary'
  },
  {
    id: 'pulse-3',
    title: 'High-Value Lead Demo',
    time: '1h ago',
    description: 'Alex Morgan (VP Growth, TechFlow) booked executive demo • $18,500 Pipeline.',
    icon: 'verified_user',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-primary'
  },
  {
    id: 'pulse-4',
    title: 'SEO Rank Elevation',
    time: '3h ago',
    description: 'Gained +14 high-volume commercial keywords into Google Top 10 SERP positions.',
    icon: 'query_stats',
    iconBg: 'bg-surface-container',
    iconColor: 'text-tertiary'
  }
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Campaign completed',
    description: 'Q2 Acquisition Sprint concluded with 342% ROI.',
    time: '2m',
    icon: 'task_alt',
    iconColor: 'text-primary',
    read: false
  },
  {
    id: 'n2',
    title: 'New lead captured',
    description: 'Enterprise contact booked demo via Landing Page.',
    time: '14m',
    icon: 'person_add',
    iconColor: 'text-secondary',
    read: false
  },
  {
    id: 'n3',
    title: 'SEO audit ready',
    description: 'Core web vitals score climbed to 98/100.',
    time: '1h',
    icon: 'search_check',
    iconColor: 'text-tertiary',
    read: false
  },
  {
    id: 'n4',
    title: 'Budget pacing alert',
    description: 'Google Ads spend reached 88% of daily target.',
    time: '3h',
    icon: 'notification_important',
    iconColor: 'text-error',
    read: false
  },
  {
    id: 'n5',
    title: 'AI Copy Generation Ready',
    description: '3 new high-converting variations created for LinkedIn.',
    time: '5h',
    icon: 'auto_awesome',
    iconColor: 'text-primary',
    read: true
  },
  {
    id: 'n6',
    title: 'Webhook Sync Completed',
    description: 'HubSpot and Segment CRM contacts aligned.',
    time: '1d',
    icon: 'sync',
    iconColor: 'text-outline',
    read: true
  }
];

export const CREATIVE_ASSETS: CreativeAsset[] = [
  {
    id: 'c1',
    title: 'Modern high-tech software dashboard showing live analytics',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsaKJA14qW3n0C3Lo3HAREKh4ZAES8trvSVxcRST6pI0sVmUjGFQ3kEir8WgEKLvmAQOhZtamwDSIG4omt3EypNpWtVNrtwsYLnye7kx_0Iabb8RdyqGP8yeUet2xJ6auBmeq4gjs4xBoyUPiptgcnxTV9VHc0TPX4IxPk-ufFSB36B8Cd9FLtRhbXTwFnL1bfVD5o-sYTsDW2VBiFKO9ryO0UVLQhURlgs1dBMj7C8Unpl8KTjddKQ',
    badge: 'ROAS 4.9x',
    channel: 'Google Ads'
  },
  {
    id: 'c2',
    title: 'Energetic tech team collaborating in sunny loft space',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClV3iskrR2xFMsBaRU749B-qjdaEwvV3qbqN7vdv6e5A4Ggmejhm2BRS39ZyrWCmLJldK72CaP0guS228-fXnkF69N-mEUhXmr3CDApKc71w1wGug_9usGP9kuEVPpSYcZB3V-3-OP2Bxrsj4IR0WaWdhQDq9ta0wjHWjdQyNaAwawfvu1D7kF2E_VCza2wJA58VLgrEgwisdtNY29pKoTJ2yYUXj53lGlQ5pRPuFf3Rjdy-TAcaemFw',
    badge: 'CTR 5.8%',
    channel: 'LinkedIn'
  },
  {
    id: 'c3',
    title: 'Abstract 3D render of vibrant purple and indigo geometric growth',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2bmeozl94Rvde7Yr278uDprTRbCkVr-fTJZxtUm3KqBPKUY0jh3kX6wD3RWT3Ngj7KCImdM6JYoiKz0zKEsZGNM0UoD4ExzBZZWT82QUGBMFAic4oky6eRGQSxFJpd6UlqELk0MmY9h27J2sG8pM8PHZqSGOzb8H6RK4HZR4A3-4c06EoBnIEvfbFNSR7XQzjgC-XXXuEnfTd-jD0Zf6ERpzl2Exa1wKrxE8RpKVxWPxlptcQ4mZvA',
    badge: 'ROAS 3.6x',
    channel: 'Meta'
  }
];

export const COPY_LIBRARY: CopyLibraryItem[] = [
  {
    id: 'lib-1',
    title: '14-Day Free Trial Pitch',
    channel: 'Google Ads',
    badge: 'ROAS 4.8x',
    snippet: '"Automate ad fatigue detection in 3 clicks. Join 1,200+ high-velocity SaaS teams today."',
    usedAgo: 'Used 3d ago'
  },
  {
    id: 'lib-2',
    title: 'Objection Handling Sequence #3',
    channel: 'Email Nurture',
    badge: '42% Open',
    snippet: '"Why your attribution model is lying to you: How to recover $4k/month in blended budget."',
    usedAgo: 'Used 5d ago'
  },
  {
    id: 'lib-3',
    title: '7 Metrics That Actually Matter',
    channel: 'Instagram',
    badge: '9.2% Save',
    snippet: '"Slide 1: Stop reporting impressions. Slide 2: Velocity-adjusted CAC. Slide 3: Channel saturation..."',
    usedAgo: 'Used 1w ago'
  },
  {
    id: 'lib-4',
    title: 'Enterprise Demo Confirmation Drip',
    channel: 'Email Sequence',
    badge: '68% Reply',
    snippet: '"Looking forward to our session tomorrow. Here is our executive benchmark audit checklist tailored to your stack."',
    usedAgo: 'Used 2w ago'
  }
];
