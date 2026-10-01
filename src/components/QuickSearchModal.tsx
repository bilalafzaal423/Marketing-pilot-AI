import React, { useState } from 'react';
import { Campaign, Lead, ActiveTab } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  leads: Lead[];
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectLead: (lead: Lead) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  leads,
  onNavigateTab,
  onSelectLead,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.channels.some((ch) => ch.toLowerCase().includes(query.toLowerCase())) ||
      c.objective.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.company.toLowerCase().includes(query.toLowerCase()) ||
      l.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-60 bg-inverse-surface/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col border border-surface-container animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-surface-container flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[22px] text-outline">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns, leads, channels, or keywords..."
            className="flex-1 bg-transparent text-body-lg text-on-surface outline-none placeholder:text-outline"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-outline hover:text-on-surface text-sm cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-dim cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {!query && (
            <div>
              <p className="px-2 pb-1 text-[11px] font-label-sm font-semibold uppercase tracking-wider text-outline">
                Navigation Shortcuts
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    onNavigateTab('dashboard');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-container text-on-surface text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">speed</span>
                  <span className="font-label-md text-label-md">Dashboard Overview</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('campaigns');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-container text-on-surface text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-secondary text-[20px]">rocket_launch</span>
                  <span className="font-label-md text-label-md">Active Campaigns</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('ai-studio');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-container text-on-surface text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                  <span className="font-label-md text-label-md">AI Content Studio</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('leads');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-surface-container text-on-surface text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#047857] text-[20px]">group</span>
                  <span className="font-label-md text-label-md">Leads &amp; CRM Pipeline</span>
                </button>
              </div>
            </div>
          )}

          {/* Matching Campaigns */}
          {filteredCampaigns.length > 0 && (
            <div>
              <p className="px-2 pb-1 text-[11px] font-label-sm font-semibold uppercase tracking-wider text-outline">
                Campaigns ({filteredCampaigns.length})
              </p>
              <div className="space-y-1">
                {filteredCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    onClick={() => {
                      onNavigateTab('campaigns');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-surface-container-low flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        rocket_launch
                      </span>
                      <div className="truncate">
                        <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                          {camp.name}
                        </p>
                        <p className="font-body-sm text-[11px] text-outline truncate">
                          {camp.channels.join(' • ')}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-surface-container text-primary font-semibold">
                      {camp.metrics.value4}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Leads */}
          {filteredLeads.length > 0 && (
            <div>
              <p className="px-2 pb-1 text-[11px] font-label-sm font-semibold uppercase tracking-wider text-outline">
                Leads &amp; Opportunities ({filteredLeads.length})
              </p>
              <div className="space-y-1">
                {filteredLeads.map((ld) => (
                  <div
                    key={ld.id}
                    onClick={() => {
                      onNavigateTab('leads');
                      onSelectLead(ld);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-surface-container-low flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={ld.avatar}
                        alt={ld.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="truncate">
                        <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                          {ld.name}
                        </p>
                        <p className="font-body-sm text-[11px] text-outline truncate">
                          {ld.role} @ {ld.company}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono-metric text-[12px] text-[#047857] font-semibold">
                      ${ld.estValueArr.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredCampaigns.length === 0 && filteredLeads.length === 0 && (
            <p className="py-6 text-center text-on-surface-variant text-body-sm">
              No matching records found for "{query}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
