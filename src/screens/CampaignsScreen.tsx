import React, { useState } from 'react';
import { Campaign, CreativeAsset } from '../types';

interface CampaignsScreenProps {
  campaigns: Campaign[];
  creativeAssets: CreativeAsset[];
  onOpenWizard: () => void;
  onToggleStatus: (id: string) => void;
  onApplyAiRecommendation: () => void;
  aiRecApplied: boolean;
}

export const CampaignsScreen: React.FC<CampaignsScreenProps> = ({
  campaigns,
  creativeAssets,
  onOpenWizard,
  onToggleStatus,
  onApplyAiRecommendation,
  aiRecApplied,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const channelsList = [
    { label: 'All Channels', icon: null },
    { label: 'Google Ads', icon: 'search', color: 'text-tertiary' },
    { label: 'Meta', icon: 'public', color: 'text-primary' },
    { label: 'LinkedIn', icon: 'work', color: 'text-secondary' },
    { label: 'Email', icon: 'mail', color: 'text-outline' },
  ];

  const filteredCampaigns = campaigns.filter((c) => {
    // Channel filter
    if (selectedChannel !== 'All Channels') {
      const match = c.channels.some((ch) =>
        ch.toLowerCase().includes(selectedChannel.toLowerCase())
      );
      if (!match) return false;
    }
    // Status filter
    if (selectedStatus !== 'all' && c.status !== selectedStatus) {
      return false;
    }
    // Search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const match =
        c.name.toLowerCase().includes(term) ||
        c.target.toLowerCase().includes(term) ||
        c.objective.toLowerCase().includes(term) ||
        c.channels.some((ch) => ch.toLowerCase().includes(term));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <div className="px-gutter-mobile pt-3 pb-8 flex flex-col gap-3.5">
        {/* Top Action & Title Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface font-bold tracking-tight">
              Campaigns
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {campaigns.length} Total across 5 channels
            </p>
          </div>

          <button
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-label-md text-label-md shadow-md active:scale-95 transition-transform duration-150 cursor-pointer hover:opacity-95"
            id="open-wizard-btn"
            type="button"
            onClick={onOpenWizard}
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Campaign</span>
          </button>
        </div>

        {/* AI Optimization Recommendation Card */}
        <div className="rounded-2xl bg-surface-container-high p-3.5 shadow-sm relative overflow-hidden flex flex-col gap-2.5 border border-primary/20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                AI Pilot Recommendation
              </span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-semibold">
              +18% Yield
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface">
            Shift <span className="font-semibold text-primary">$35/day</span> from paused Meta ad sets to Google Search “SaaS marketing tools” group to capture high-intent buyers.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-label-md text-label-md shadow-xs active:opacity-90 cursor-pointer transition-all ${
                aiRecApplied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary text-on-primary hover:bg-secondary'
              }`}
              id="apply-ai-rec"
              type="button"
              onClick={onApplyAiRecommendation}
            >
              <span className="material-symbols-outlined text-[16px]">
                {aiRecApplied ? 'check_circle' : 'bolt'}
              </span>
              <span>{aiRecApplied ? 'Applied to Google Search Ads (+$35/day)' : 'Apply 1-Click Optimization'}</span>
            </button>
            <button
              className="w-9 h-9 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-dim transition-colors cursor-pointer"
              type="button"
              onClick={() => alert('Pilot Optimization Rules: Confidence threshold set at 92%. Automated rebalance interval: 15 min.')}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-2.5">
          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              className="w-full h-11 pl-9 pr-9 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-md shadow-inner focus:outline-none focus:bg-surface-container-low transition-colors"
              id="campaign-search"
              placeholder="Search campaigns, objectives, tags..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface cursor-pointer"
                type="button"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Channel Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {channelsList.map((ch) => (
              <button
                key={ch.label}
                className={`channel-chip px-3 py-1.5 rounded-full font-label-sm text-label-sm shrink-0 flex items-center gap-1 cursor-pointer transition-colors ${
                  selectedChannel === ch.label
                    ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                onClick={() => setSelectedChannel(ch.label)}
              >
                {ch.icon && (
                  <span className={`material-symbols-outlined text-[14px] ${ch.color}`}>
                    {ch.icon}
                  </span>
                )}
                <span>{ch.label}</span>
              </button>
            ))}
          </div>

          {/* Status Sub-Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="font-label-sm text-label-sm text-outline px-1">Status:</span>
            {(
              [
                { id: 'all', label: `All (${campaigns.length})` },
                { id: 'active', label: `Active (${campaigns.filter((c) => c.status === 'active').length})` },
                { id: 'paused', label: `Paused (${campaigns.filter((c) => c.status === 'paused').length})` },
                { id: 'draft', label: `Draft (${campaigns.filter((c) => c.status === 'draft').length})` },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                className={`status-chip px-2.5 py-1 rounded-lg font-label-sm text-label-sm cursor-pointer transition-colors ${
                  selectedStatus === st.id
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setSelectedStatus(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Campaigns List */}
        <div className="flex flex-col gap-3.5 mt-1">
          {filteredCampaigns.length === 0 ? (
            <div className="p-8 text-center bg-surface-container-lowest rounded-2xl">
              <span className="material-symbols-outlined text-[32px] text-outline">search_off</span>
              <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                No campaigns match your filters
              </p>
              <button
                onClick={() => {
                  setSelectedChannel('All Channels');
                  setSelectedStatus('all');
                  setSearchTerm('');
                }}
                className="mt-2 text-primary font-label-sm hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredCampaigns.map((camp) => (
              <div
                key={camp.id}
                className={`rounded-2xl bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3 relative border border-surface-container/60 transition-all ${
                  camp.status === 'paused' ? 'opacity-90' : ''
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                          camp.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : camp.status === 'paused'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-surface-container text-outline'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            camp.status === 'active'
                              ? 'bg-emerald-500 animate-ping'
                              : camp.status === 'paused'
                              ? 'bg-amber-500'
                              : 'bg-outline'
                          }`}
                        />
                        {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        ID: {camp.id}
                      </span>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                      {camp.name}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {camp.target}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={camp.status === 'active'}
                        onChange={() => onToggleStatus(camp.id)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container" />
                    </label>
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer"
                      onClick={() => alert(`Campaign Options for ${camp.name}`)}
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                </div>

                {/* Channels & Target Objective */}
                <div className="flex items-center flex-wrap gap-1.5">
                  {camp.channels.map((ch) => (
                    <span
                      key={ch}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[13px] text-tertiary">
                        {ch.toLowerCase().includes('google')
                          ? 'search'
                          : ch.toLowerCase().includes('meta')
                          ? 'public'
                          : ch.toLowerCase().includes('linked')
                          ? 'work'
                          : 'flag'}
                      </span>
                      {ch}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold ml-auto">
                    <span className="material-symbols-outlined text-[13px]">flag</span>
                    {camp.objective}
                  </span>
                </div>

                {/* Budget & Pacing Bar */}
                <div className="flex flex-col gap-1.5 bg-surface-container-low p-2.5 rounded-xl">
                  <div className="flex justify-between items-center font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Budget Spend</span>
                    <span className="font-mono-metric text-mono-metric text-on-surface font-semibold">
                      ${camp.budgetSpend.toLocaleString()}{' '}
                      <span className="text-outline font-normal">/ ${camp.budgetCap.toLocaleString()}</span>{' '}
                      ({camp.pacingPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-dim overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        camp.status === 'paused'
                          ? 'bg-outline'
                          : camp.pacingPercent > 80
                          ? 'bg-secondary-container'
                          : 'bg-primary-container'
                      }`}
                      style={{ width: `${Math.min(100, camp.pacingPercent)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-outline font-label-sm">
                    <span>
                      {camp.statusNote
                        ? camp.statusNote
                        : camp.startedDaysAgo
                        ? `Started ${camp.startedDaysAgo} days ago`
                        : 'Pacing on schedule'}
                    </span>
                    <span>
                      {camp.remainingDays ? `${camp.remainingDays} days remaining` : 'Optimal pacing'}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics Grid (4 items) */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="flex flex-col rounded-lg bg-surface-container p-2">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      {camp.metrics.value1}
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      {camp.metrics.label1}
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-surface-container p-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {camp.metrics.value2}
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      {camp.metrics.label2}
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-surface-container p-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {camp.metrics.value3}
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      {camp.metrics.label3}
                    </span>
                  </div>
                  <div className="flex flex-col rounded-lg bg-surface-container p-2">
                    <span
                      className={`font-headline-sm text-headline-sm font-bold ${
                        camp.metrics.value4.includes('x') && parseFloat(camp.metrics.value4) >= 3
                          ? 'text-emerald-600'
                          : 'text-on-surface'
                      }`}
                    >
                      {camp.metrics.value4}
                    </span>
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      {camp.metrics.label4}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-1">
                  <div
                    className={`flex items-center gap-1 font-label-sm text-label-sm ${
                      camp.status === 'paused'
                        ? 'text-outline'
                        : 'text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {camp.status === 'paused' ? 'pause_circle' : 'trending_up'}
                    </span>
                    <span>{camp.highlightBadge || 'Pacing verified'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer"
                      onClick={() => alert(`Editing parameters for ${camp.name}`)}
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span> Edit
                    </button>
                    <button
                      className="px-2.5 py-1.5 rounded-lg bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                      onClick={() => alert(`Detailed multi-touch attribution reports for ${camp.name}`)}
                    >
                      Analytics <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Visual Creative Assets Sneak Peek Banner */}
        <div className="rounded-2xl bg-surface-container-low p-3.5 shadow-sm mt-1 flex flex-col gap-2.5 border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Top Performing Creatives
            </span>
            <button
              onClick={() => alert('Opening Full Media Asset Library (38 visual creatives)')}
              className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              View Media Hub <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {creativeAssets.map((asset) => (
              <div
                key={asset.id}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                onClick={() => alert(`Selected creative: ${asset.badge} on ${asset.channel}`)}
              >
                <img
                  src={asset.imageUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-1 bg-surface-container-lowest/90 px-1 rounded text-[9px] font-bold text-on-surface">
                  {asset.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
