import React, { useState } from 'react';
import { Lead } from '../types';

interface LeadsScreenProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onAddNewLead: (newLead: Lead) => void;
  onUpdateStage: (leadId: string, newStage: Lead['status']) => void;
}

export const LeadsScreen: React.FC<LeadsScreenProps> = ({
  leads,
  onSelectLead,
  onAddNewLead,
  onUpdateStage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | Lead['status']>('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [sortBy, setSortBy] = useState<'recent' | 'value' | 'score'>('recent');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead form state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadRole, setNewLeadRole] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadArr, setNewLeadArr] = useState(20000);

  // Filter & Sort
  const filteredLeads = leads
    .filter((l) => {
      if (activeStatusFilter !== 'all' && l.status !== activeStatusFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'value') return b.estValueArr - a.estValueArr;
      if (sortBy === 'score') return b.score - a.score;
      return 0; // recent
    });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany) return;

    const created: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadName,
      role: newLeadRole || 'Decision Maker',
      company: newLeadCompany,
      score: 85,
      isHot: true,
      status: 'new',
      source: 'Direct Inbound / Quick CRM',
      sourceIcon: 'person_add',
      estValueArr: newLeadArr,
      assignedTo: {
        name: 'Sarah Chen',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw',
      },
      email: newLeadEmail || `${newLeadName.toLowerCase().replace(/\s+/g, '.')}@${newLeadCompany.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: '+1 (415) 555-0182',
      location: 'San Francisco, CA',
      companySize: '50 - 100 Employees',
      technologies: ['Google Ads', 'HubSpot', 'Segment'],
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD3eOmMoFhSJqvQ1yhzWbE1FpJreapt19XM_oJHUxEabh47HZlB0VzidBoRvEWnmJyZ1fTmZfEph-cQMbwvTdtH6mxHhTWxiER8jPVj2fvx_hSJqRfglQxLBxcdEtKgewSm9b4ObggoxyNoKYEYBfpYiUFgDa0Pwy9qduvCniAdYrI9_RpligZjKjG7Tm-zIj0ruJi8USmwXJhIDFstshKKcSvR5vrhnI-EuSeENKql6JJ3GTLkeOGoJQ',
      timeline: [
        {
          title: 'Lead Registered into Market Pilot',
          time: 'Just now',
          description: 'Added via CRM Command Center for rapid outbound engagement.',
          type: 'submission',
        },
      ],
    };

    onAddNewLead(created);
    setShowAddModal(false);
    setNewLeadName('');
    setNewLeadRole('');
    setNewLeadCompany('');
    setNewLeadEmail('');
  };

  const kanbanColumns: { stage: Lead['status']; title: string; color: string }[] = [
    { stage: 'new', title: 'New', color: 'bg-primary' },
    { stage: 'contacted', title: 'Contacted', color: 'bg-secondary-container' },
    { stage: 'qualified', title: 'Qualified (SQL)', color: 'bg-[#047857]' },
    { stage: 'proposal', title: 'Proposal Sent', color: 'bg-tertiary-container' },
    { stage: 'won', title: 'Won', color: 'bg-[#006693]' },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10">
      {/* Top Ambient Glow Decorator */}
      <div className="relative w-full overflow-hidden px-gutter-mobile py-space-sm">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-16 w-44 h-44 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header Context Strip */}
        <div className="flex items-center justify-between gap-space-xs mb-space-sm">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface font-bold tracking-tight">
                Leads &amp; CRM
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Sync Active
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              High-intent opportunities scored by Pilot AI
            </p>
          </div>

          <button
            aria-label="Add new lead"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-on-primary shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-secondary"
            id="btn-quick-lead"
            type="button"
            onClick={() => setShowAddModal(true)}
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
          </button>
        </div>

        {/* Leads Pipeline KPI Overview */}
        <div className="flex flex-col gap-space-sm">
          {/* High Value Big Metric Card */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm relative overflow-hidden border border-surface-container/60">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Total Pipeline Value
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-display-hero-mobile text-display-hero-mobile text-on-surface font-bold tracking-tight">
                    $248,500
                  </span>
                  <span className="inline-flex items-center font-label-sm text-label-sm font-semibold text-[#047857]">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>+18.4%
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">monetization_on</span>
              </div>
            </div>

            {/* Funnel Progression Bar */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Pipeline Distribution</span>
                <span className="font-mono-metric text-mono-metric font-semibold text-primary">
                  1,842 Total
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high flex overflow-hidden p-0.5 gap-0.5">
                <div className="h-full rounded-sm bg-primary" style={{ width: '35%' }} title="New: 35%" />
                <div className="h-full rounded-sm bg-secondary-container" style={{ width: '25%' }} title="Contacted: 25%" />
                <div className="h-full rounded-sm bg-[#047857]" style={{ width: '20%' }} title="Qualified: 20%" />
                <div className="h-full rounded-sm bg-tertiary-container" style={{ width: '12%' }} title="Proposal: 12%" />
                <div className="h-full rounded-sm bg-[#006693]" style={{ width: '8%' }} title="Won: 8%" />
              </div>

              {/* Funnel Legend Micro */}
              <div className="flex items-center justify-between text-[10px] font-label-sm text-on-surface-variant px-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  New 35%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary-container" />
                  Cont. 25%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#047857]" />
                  Qual. 20%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                  Prop. 12%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#006693]" />
                  Won 8%
                </span>
              </div>
            </div>
          </div>

          {/* Metric Micro Cards Stack (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-space-xs">
            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">New Leads</span>
                <span className="material-symbols-outlined text-primary text-[18px]">fiber_new</span>
              </div>
              <div className="mt-2">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">342</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">This month</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Qualified (SQL)</span>
                <span className="material-symbols-outlined text-[#047857] text-[18px]">verified</span>
              </div>
              <div className="mt-2">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">518</div>
                <p className="font-body-sm text-body-sm text-[#047857] mt-0.5 font-medium">+24 this week</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Conv. Rate</span>
                <span className="material-symbols-outlined text-tertiary-container text-[18px]">pie_chart</span>
              </div>
              <div className="mt-2">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">28.1%</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Industry: 19%</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Active Pool</span>
                <span className="material-symbols-outlined text-secondary text-[18px]">group_work</span>
              </div>
              <div className="mt-2">
                <div className="font-headline-md text-headline-md font-bold text-on-surface">1,842</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Global audience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="px-gutter-mobile flex flex-col gap-space-xs mt-space-xs">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container transition-all"
            id="lead-search-input"
            placeholder="Search by lead name, company, email..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            aria-label="Voice Search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary cursor-pointer"
            type="button"
            onClick={() => alert('Voice search ready')}
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>

        {/* Filter chips scrollable row */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          <button
            className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold shadow-sm transition-colors cursor-pointer ${
              activeStatusFilter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveStatusFilter('all')}
          >
            All Statuses
          </button>

          <button
            className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 cursor-pointer ${
              activeStatusFilter === 'new'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveStatusFilter('new')}
          >
            <span>New</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-primary font-bold text-[10px]">
              {leads.filter((l) => l.status === 'new').length}
            </span>
          </button>

          <button
            className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 cursor-pointer ${
              activeStatusFilter === 'contacted'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveStatusFilter('contacted')}
          >
            <span>Contacted</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-[10px]">
              {leads.filter((l) => l.status === 'contacted').length}
            </span>
          </button>

          <button
            className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 cursor-pointer ${
              activeStatusFilter === 'qualified'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveStatusFilter('qualified')}
          >
            <span>Qualified</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#ECFDF5] text-[#047857] font-bold text-[10px]">
              {leads.filter((l) => l.status === 'qualified').length}
            </span>
          </button>

          <button
            className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 cursor-pointer ${
              activeStatusFilter === 'proposal'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveStatusFilter('proposal')}
          >
            <span>Proposal</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-tertiary-container font-bold text-[10px]">
              {leads.filter((l) => l.status === 'proposal').length}
            </span>
          </button>

          <button
            className={`filter-chip flex-shrink-0 px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 cursor-pointer ${
              activeStatusFilter === 'won'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveStatusFilter('won')}
          >
            <span>Won</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-[#006693] font-bold text-[10px]">
              {leads.filter((l) => l.status === 'won').length}
            </span>
          </button>
        </div>

        {/* Sort & Mode View Bar */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="text-outline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'value' | 'score')}
              className="bg-transparent font-semibold text-on-surface outline-none cursor-pointer"
            >
              <option value="recent">Recent activity</option>
              <option value="value">Highest ARR</option>
              <option value="score">Lead Score</option>
            </select>
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-surface-container-high p-0.5 rounded-lg">
            <button
              aria-label="Card List View"
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 text-label-sm font-label-sm transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              id="toggle-list"
              type="button"
              onClick={() => setViewMode('list')}
            >
              <span className="material-symbols-outlined text-[16px]">view_agenda</span>
              <span>List</span>
            </button>
            <button
              aria-label="Kanban View"
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 text-label-sm font-label-sm transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              id="toggle-kanban"
              type="button"
              onClick={() => setViewMode('kanban')}
            >
              <span className="material-symbols-outlined text-[16px]">view_column</span>
              <span>Kanban</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leads Stream or Kanban Board */}
      <div className="px-gutter-mobile flex flex-col gap-space-sm mt-space-sm pb-space-lg">
        {viewMode === 'list' ? (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="lead-item rounded-2xl bg-surface-container-lowest shadow-sm p-space-md flex flex-col gap-space-xs transition-all cursor-pointer hover:shadow-md border border-surface-container/60 active:scale-[0.99]"
              onClick={() => onSelectLead(lead)}
            >
              {/* Top Row: Avatar + Name + Pill */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={lead.avatar}
                      alt={lead.name}
                      className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-1 ring-surface-container"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-on-primary ring-2 ring-surface-container-lowest ${
                        lead.status === 'qualified' || lead.status === 'won'
                          ? 'bg-[#10B981]'
                          : lead.status === 'proposal'
                          ? 'bg-tertiary-container'
                          : 'bg-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[10px]">
                        {lead.status === 'qualified' || lead.status === 'won'
                          ? 'check'
                          : lead.status === 'proposal'
                          ? 'send'
                          : 'forum'}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                        {lead.name}
                      </span>
                      {lead.isHot ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] font-label-sm text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px] text-[#F59E0B]">
                            local_fire_department
                          </span>
                          {lead.score}/100 Hot
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[10px] font-bold">
                          {lead.score}/100
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {lead.role} @ <span className="font-semibold text-on-surface">{lead.company}</span>
                    </p>
                  </div>
                </div>

                {/* Status Pill */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] font-bold flex-shrink-0 ${
                    lead.status === 'qualified'
                      ? 'bg-[#ECFDF5] text-[#047857]'
                      : lead.status === 'proposal'
                      ? 'bg-surface-container-high text-tertiary-container'
                      : lead.status === 'won'
                      ? 'bg-primary-fixed text-primary'
                      : 'bg-surface-container-high text-secondary'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {lead.status === 'qualified'
                    ? 'Qualified SQL'
                    : lead.status === 'proposal'
                    ? 'Proposal Sent'
                    : lead.status === 'won'
                    ? 'Won Deal'
                    : lead.status === 'contacted'
                    ? 'Contacted'
                    : 'New Lead'}
                </span>
              </div>

              {/* Source & Attribution Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                  <span className="material-symbols-outlined text-[13px] text-primary">
                    {lead.sourceIcon || 'ads_click'}
                  </span>
                  {lead.source}
                </span>
              </div>

              {/* Key Metrics Row */}
              <div className="mt-1 pt-2 bg-surface-container-low/60 rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                    Est. Value
                  </span>
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">
                    ${lead.estValueArr.toLocaleString()}{' '}
                    <span className="text-outline font-normal text-body-sm">ARR</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {lead.assignedTo.avatar ? (
                      <img
                        alt={lead.assignedTo.name}
                        className="w-6 h-6 rounded-full object-cover"
                        src={lead.assignedTo.avatar}
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-secondary-container text-on-primary flex items-center justify-center font-bold text-[10px]">
                        {lead.assignedTo.initials || 'SC'}
                      </span>
                    )}
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      {lead.assignedTo.name}
                    </span>
                  </div>

                  <button
                    aria-label="Open Lead Sheet"
                    className="open-sheet-btn ml-1 w-8 h-8 rounded-lg bg-surface-container-lowest text-primary shadow-sm flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLead(lead);
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Quick Micro Contact Row */}
              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1 pt-0.5">
                <span className="flex items-center gap-1 text-[11px] truncate max-w-[190px]">
                  <span className="material-symbols-outlined text-[14px] text-outline">mail</span>
                  {lead.email}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[14px] text-outline">call</span>
                  {lead.phone}
                </span>
              </div>
            </div>
          ))
        ) : (
          /* Kanban Board View */
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 -mx-gutter-mobile px-gutter-mobile">
            {kanbanColumns.map((col) => {
              const colLeads = leads.filter((l) => l.status === col.stage);
              const colArrTotal = colLeads.reduce((acc, curr) => acc + curr.estValueArr, 0);

              return (
                <div
                  key={col.stage}
                  className="w-72 flex-shrink-0 bg-surface-container-low/70 rounded-2xl p-3 flex flex-col gap-2.5 border border-surface-container"
                >
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${col.color}`} />
                      <h4 className="font-label-md text-label-md font-bold text-on-surface">
                        {col.title}
                      </h4>
                      <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                        {colLeads.length}
                      </span>
                    </div>
                    <span className="font-mono-metric text-[11px] text-outline">
                      ${(colArrTotal / 1000).toFixed(0)}k
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-0.5">
                    {colLeads.map((ld) => (
                      <div
                        key={ld.id}
                        onClick={() => onSelectLead(ld)}
                        className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container hover:shadow-md cursor-pointer transition-all flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                            {ld.name}
                          </span>
                          <span className="font-mono-metric text-[11px] text-[#047857] font-semibold">
                            ${(ld.estValueArr / 1000).toFixed(0)}k
                          </span>
                        </div>
                        <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                          {ld.role} @ {ld.company}
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-surface-container-low text-[11px]">
                          <span className="text-outline">{ld.score}/100 score</span>
                          <div className="flex gap-1">
                            {col.stage !== 'new' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const prevStages: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'won'];
                                  const curIdx = prevStages.indexOf(ld.status);
                                  if (curIdx > 0) onUpdateStage(ld.id, prevStages[curIdx - 1]);
                                }}
                                className="w-5 h-5 rounded bg-surface-container flex items-center justify-center hover:bg-surface-dim"
                                title="Move Left"
                              >
                                ‹
                              </button>
                            )}
                            {col.stage !== 'won' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const nextStages: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'won'];
                                  const curIdx = nextStages.indexOf(ld.status);
                                  if (curIdx < nextStages.length - 1) onUpdateStage(ld.id, nextStages[curIdx + 1]);
                                }}
                                className="w-5 h-5 rounded bg-surface-container flex items-center justify-center hover:bg-surface-dim"
                                title="Move Right"
                              >
                                ›
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {colLeads.length === 0 && (
                      <div className="py-6 text-center border-2 border-dashed border-surface-container-high rounded-xl text-outline text-body-sm">
                        No leads in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Lead Quick Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateLead}
            className="bg-surface-container-lowest rounded-2xl shadow-2xl p-5 max-w-md w-full flex flex-col gap-3.5 border border-surface-container"
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">person_add</span>
                Capture New Opportunity
              </span>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center cursor-pointer hover:bg-surface-dim"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jordan Rivera"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Job Role / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. VP Marketing or CMO"
                  value={newLeadRole}
                  onChange={(e) => setNewLeadRole(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Acme HyperGrowth"
                  value={newLeadCompany}
                  onChange={(e) => setNewLeadCompany(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="jordan@acme.com"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Estimated Contract Value (ARR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-headline-sm text-outline">$</span>
                  <input
                    type="number"
                    value={newLeadArr}
                    onChange={(e) => setNewLeadArr(Number(e.target.value))}
                    className="w-full h-10 pl-7 pr-3 rounded-xl bg-surface-container font-headline-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-md cursor-pointer hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md font-semibold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer hover:bg-secondary"
              >
                <span className="material-symbols-outlined text-[18px]">add_task</span>
                <span>Save Lead</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
