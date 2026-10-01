import React, { useState } from 'react';
import { Campaign, PulseItem, TimeRange, ActiveTab } from '../types';

interface DashboardScreenProps {
  campaigns: Campaign[];
  pulseItems: PulseItem[];
  onOpenCopilot: () => void;
  onOpenWizard: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  campaigns,
  pulseItems,
  onOpenCopilot,
  onOpenWizard,
  onNavigateTab,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'leads' | 'visitors' | 'conversions'>('revenue');
  const [campaignFilter, setCampaignFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredCampaigns = campaigns.filter((c) => {
    if (campaignFilter === 'all') return true;
    return c.status === campaignFilter;
  });

  // Dynamic values depending on timeRange
  const revenueValues = {
    '7D': { rev: '$34,920', diff: '+8.2%', prior: '$32,200', spend: '$8,140', leads: '412', roas: '4.29x', traffic: '24.1k' },
    '30D': { rev: '$148,650', diff: '+18.4%', prior: '$125,500', spend: '$32,480', leads: '1,842', roas: '4.58x', traffic: '94.2k' },
    '90D': { rev: '$432,100', diff: '+24.6%', prior: '$346,800', spend: '$94,200', leads: '5,420', roas: '4.62x', traffic: '280.4k' },
    '12M': { rev: '$1,680,000', diff: '+38.9%', prior: '$1,210,000', spend: '$360,000', leads: '21,900', roas: '4.67x', traffic: '1.14M' },
  }[timeRange];

  return (
    <div className="flex flex-col w-full px-gutter-mobile space-y-space-md pb-8 max-w-4xl mx-auto">
      {/* Executive Greeting & Context Bar */}
      <div className="flex flex-col space-y-space-sm pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface">
              Good morning, Sarah
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Marketing Command Center • Acme Growth Co
            </span>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-container text-on-primary shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-secondary"
            id="open-copilot-btn"
            type="button"
            onClick={onOpenCopilot}
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span className="font-label-md text-label-md font-semibold">Copilot</span>
          </button>
        </div>

        {/* Date selector & Primary Action Row */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center bg-surface-container-high p-1 rounded-xl gap-1">
            {(['7D', '30D', '90D', '12M'] as TimeRange[]).map((range) => (
              <button
                key={range}
                className={`time-pill px-2.5 py-1 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                  timeRange === range
                    ? 'active-time-pill bg-surface-container-lowest text-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-highest text-primary hover:bg-surface-container-high transition-colors flex-shrink-0 active:scale-95 cursor-pointer"
            id="open-wizard-btn"
            type="button"
            onClick={onOpenWizard}
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="font-label-md text-label-md font-semibold">New Campaign</span>
          </button>
        </div>
      </div>

      {/* High-Impact KPI Carousel / Grid Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Total Revenue (Span 2) */}
        <div className="col-span-2 p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container/60">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  {revenueValues.rev}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  {revenueValues.diff}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-outline mt-0.5">
                vs {revenueValues.prior} prior period
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
          </div>

          {/* Sparkline Area */}
          <div className="w-full h-12 mt-3">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 48">
              <defs>
                <linearGradient id="revenue-spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,40 Q35,38 70,28 T140,24 T210,12 T280,18 T320,4 L320,48 L0,48 Z"
                fill="url(#revenue-spark)"
              />
              <path
                d="M0,40 Q35,38 70,28 T140,24 T210,12 T280,18 T320,4"
                fill="none"
                stroke="#4f46e5"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

        {/* Marketing Spend Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Spend</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">+4.2%</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 block">
              {revenueValues.spend}
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between items-center font-label-sm text-label-sm text-outline">
              <span>Cap: $40,000</span>
              <span>81%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '81%' }} />
            </div>
          </div>
        </div>

        {/* Leads Generated Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Leads Gen</span>
              <span className="inline-flex items-center text-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[13px]">trending_up</span>
                24.1%
              </span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 block">
              {revenueValues.leads}
            </span>
          </div>
          <div className="w-full h-7 mt-2">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
              <path
                d="M0,20 Q20,18 40,10 T80,8 T100,2"
                fill="none"
                stroke="#6063ee"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* ROAS Performance Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Blended ROAS</span>
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[10px] font-bold">
                Top 5%
              </span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 block">
              {revenueValues.roas}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Goal: 3.8x Target</span>
          </div>
        </div>

        {/* Traffic Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Site Traffic</span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">+12.8%</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface mt-1 block">
              {revenueValues.traffic}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1">
            <span className="font-body-sm text-body-sm text-outline">Avg duration: 2m 44s</span>
          </div>
        </div>
      </div>

      {/* Performance Overview Chart Card */}
      <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container/60">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Growth Trends
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-mono-metric text-mono-metric text-primary font-semibold">
            June 2024
          </span>
        </div>

        {/* Switcher Tabs */}
        <div className="flex bg-surface-container-low p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'revenue', label: 'Revenue' },
              { id: 'leads', label: 'Leads' },
              { id: 'visitors', label: 'Visitors' },
              { id: 'conversions', label: 'Conv %' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              className={`chart-tab flex-1 py-1.5 px-2 rounded-lg font-label-sm text-label-sm text-center transition-all cursor-pointer ${
                chartMetric === tab.id
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
              onClick={() => setChartMetric(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart Canvas & Simulated Pin Point Tooltip */}
        <div className="relative w-full h-48 pt-2">
          {/* Interactive Tooltip Overlay (Anchored to Jun 24) */}
          <div className="absolute left-[68%] top-3 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
            <div className="bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-xl shadow-xl flex flex-col items-center">
              <span className="font-label-sm text-[10px] text-outline-variant font-medium">
                Jun 24, 2024
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-headline-sm text-headline-sm font-bold text-on-primary">
                  {chartMetric === 'revenue'
                    ? '$6,420'
                    : chartMetric === 'leads'
                    ? '88 leads'
                    : chartMetric === 'visitors'
                    ? '4.2k users'
                    : '5.14%'}
                </span>
                <span className="font-label-sm text-[10px] text-secondary-fixed">88 leads</span>
              </div>
            </div>
            <div className="w-2 h-2 bg-inverse-surface rotate-45 -mt-1" />
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 340 160">
            <defs>
              <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#6063ee" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle Gridlines */}
            <line stroke="#eaedff" strokeDasharray="3 3" x1="0" x2="340" y1="30" y2="30" />
            <line stroke="#eaedff" strokeDasharray="3 3" x1="0" x2="340" y1="70" y2="70" />
            <line stroke="#eaedff" strokeDasharray="3 3" x1="0" x2="340" y1="110" y2="110" />
            <line stroke="#dae2fd" x1="0" x2="340" y1="145" y2="145" />

            {/* Area Surface */}
            <path
              d="M0,130 C40,120 70,105 100,95 C140,82 170,102 210,65 C240,40 270,30 300,50 C320,62 335,42 340,38 L340,145 L0,145 Z"
              fill="url(#area-gradient)"
            />

            {/* Primary Spline */}
            <path
              d="M0,130 C40,120 70,105 100,95 C140,82 170,102 210,65 C240,40 270,30 300,50 C320,62 335,42 340,38"
              fill="none"
              stroke="#3525cd"
              strokeLinecap="round"
              strokeWidth="3"
            />

            {/* Target Benchmark Reference Line */}
            <path
              d="M0,110 Q170,95 340,80"
              fill="none"
              opacity="0.6"
              stroke="#777587"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />

            {/* Active Data Marker Point (Jun 24) */}
            <circle
              className="animate-pulse"
              cx="240"
              cy="40"
              fill="#3525cd"
              r="6"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          </svg>

          {/* Date Axis */}
          <div className="flex justify-between items-center pt-1 font-label-sm text-[11px] text-outline">
            <span>Jun 1</span>
            <span>Jun 8</span>
            <span>Jun 15</span>
            <span className="text-primary font-bold">Jun 24</span>
            <span>Jun 30</span>
          </div>
        </div>

        {/* Summary Metrics Below Chart */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="p-2 rounded-xl bg-surface-container-low text-center">
            <span className="font-label-sm text-[10px] text-on-surface-variant block">Avg Daily</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              $4,955
            </span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container-low text-center">
            <span className="font-label-sm text-[10px] text-on-surface-variant block">Conversion</span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
              4.82%
            </span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container-low text-center">
            <span className="font-label-sm text-[10px] text-on-surface-variant block">Efficiency</span>
            <span className="font-headline-sm text-headline-sm text-secondary font-semibold">
              +34%
            </span>
          </div>
        </div>
      </div>

      {/* Active Campaigns Section */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Active Campaigns
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-bold">
              {campaigns.length} Total
            </span>
          </div>
          <button
            className="font-label-md text-label-md text-primary font-semibold flex items-center hover:underline cursor-pointer"
            type="button"
            onClick={() => onNavigateTab('campaigns')}
          >
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            className={`campaign-filter px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex-shrink-0 cursor-pointer transition-colors ${
              campaignFilter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant'
            }`}
            type="button"
            onClick={() => setCampaignFilter('all')}
          >
            All ({campaigns.length})
          </button>
          <button
            className={`campaign-filter px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium flex-shrink-0 cursor-pointer transition-colors ${
              campaignFilter === 'active'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container text-on-surface-variant'
            }`}
            type="button"
            onClick={() => setCampaignFilter('active')}
          >
            Active ({campaigns.filter((c) => c.status === 'active').length})
          </button>
          <button
            className={`campaign-filter px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium flex-shrink-0 cursor-pointer transition-colors ${
              campaignFilter === 'paused'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container text-on-surface-variant'
            }`}
            type="button"
            onClick={() => setCampaignFilter('paused')}
          >
            Paused ({campaigns.filter((c) => c.status === 'paused').length})
          </button>
        </div>

        {/* Swipeable High-Density Campaign Cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 -mx-gutter-mobile px-gutter-mobile">
          {filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="snap-start shrink-0 w-[84%] max-w-[320px] p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-3 border border-surface-container/60 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        camp.status === 'active' ? 'bg-primary-container animate-pulse' : 'bg-outline'
                      }`}
                    />
                    <span
                      className={`font-label-sm text-label-sm font-semibold capitalize ${
                        camp.status === 'active' ? 'text-primary' : 'text-outline'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 line-clamp-1">
                    {camp.name}
                  </h3>
                  <span className="font-body-sm text-body-sm text-outline">
                    {camp.channels.join(' • ')}
                  </span>
                </div>
                <button
                  className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer hover:text-on-surface"
                  type="button"
                  onClick={() => onNavigateTab('campaigns')}
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low grid grid-cols-2 gap-2">
                <div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">Budget Spend</span>
                  <p className="font-headline-sm text-headline-sm font-semibold text-on-surface mt-0.5">
                    ${camp.budgetSpend.toLocaleString()}
                  </p>
                  <span className="font-body-sm text-[11px] text-outline">
                    Cap ${camp.budgetCap.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">ROAS &amp; Volume</span>
                  <p className="font-headline-sm text-headline-sm font-semibold text-primary mt-0.5">
                    {camp.metrics.label4 === 'ROAS' ? camp.metrics.value4 : '4.5x'}
                  </p>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    {camp.metrics.value1} qualified leads
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">auto_mode</span>
                  <span className="text-[11px]">{camp.highlightBadge || 'AI Optimization ON'}</span>
                </div>
                <span className="font-mono-metric text-mono-metric font-semibold text-on-surface">
                  {camp.pacingPercent}% Pacing
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Performance Breakdown ("Multi-Channel Attribution") */}
      <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Multi-Channel Attribution
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Efficiency breakdown across spend pools
            </p>
          </div>
          <button
            className="p-2 rounded-xl bg-surface-container-high text-on-surface hover:text-primary transition-colors cursor-pointer"
            type="button"
            onClick={() => onNavigateTab('campaigns')}
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Channel Rows */}
        <div className="space-y-3 pt-1">
          {/* Google Ads */}
          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-[20px]">ads_click</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    Google Ads Search &amp; PMax
                  </span>
                  <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant">
                    <span>$14,200 spend</span>
                    <span>•</span>
                    <span>820 conv</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-headline-sm font-bold text-primary">4.8x</span>
                <span className="font-label-sm text-[10px] text-outline block">ROAS</span>
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '42%' }} />
            </div>
          </div>

          {/* Meta Ads */}
          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center text-secondary font-bold">
                  <span className="material-symbols-outlined text-[20px]">photo_camera_front</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    Meta Performance (IG &amp; FB)
                  </span>
                  <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant">
                    <span>$9,800 spend</span>
                    <span>•</span>
                    <span>540 conv</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-headline-sm font-bold text-secondary">4.2x</span>
                <span className="font-label-sm text-[10px] text-outline block">ROAS</span>
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '30%' }} />
            </div>
          </div>

          {/* LinkedIn Ads */}
          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-center text-tertiary font-bold">
                  <span className="material-symbols-outlined text-[20px]">domain</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    LinkedIn B2B Sponsored
                  </span>
                  <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant">
                    <span>$5,150 spend</span>
                    <span>•</span>
                    <span>184 conv</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline-sm text-headline-sm font-bold text-tertiary">4.1x</span>
                <span className="font-label-sm text-[10px] text-outline block">ROAS</span>
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-tertiary rounded-full" style={{ width: '16%' }} />
            </div>
          </div>

          {/* Organic & Email Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">travel_explore</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Organic SEO
                </span>
              </div>
              <div className="mt-2">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">9.4x</span>
                <span className="font-body-sm text-[11px] text-outline block">
                  248 Conversions ($0 Ad)
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  mark_email_read
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Email Flows
                </span>
              </div>
              <div className="mt-2">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">18.2x</span>
                <span className="font-body-sm text-[11px] text-outline block">310 Conversions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Activity Feed ("Autonomous Pulse") */}
      <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Autonomous Pulse
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-medium">Live Feed</span>
        </div>

        <div className="space-y-3 pt-1">
          {pulseItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0 mt-0.5`}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    {item.title}
                  </span>
                  <span className="font-label-sm text-[11px] text-outline flex-shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
