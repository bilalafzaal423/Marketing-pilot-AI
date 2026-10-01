import React, { useState } from 'react';
import { Campaign } from '../types';

interface CampaignWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

export const CampaignWizardModal: React.FC<CampaignWizardModalProps> = ({
  isOpen,
  onClose,
  onCampaignCreated,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form State
  const [campaignTitle, setCampaignTitle] = useState('Growth Inbound Sprint 2025');
  const [objective, setObjective] = useState<'leads' | 'sales' | 'awareness' | 'traffic'>('leads');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'Google Ads',
    'LinkedIn',
    'Meta (FB & IG)',
  ]);
  const [dailyBudget, setDailyBudget] = useState(150);
  const [durationDays, setDurationDays] = useState(30);
  const [locations, setLocations] = useState<string[]>(['United States', 'United Kingdom', 'Canada']);
  const [industries, setIndustries] = useState<string[]>(['B2B SaaS', 'Marketing Tech', 'Director+ Level']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const stepLabels = [
    'Step 1 of 5: Primary Objective',
    'Step 2 of 5: Active Channels',
    'Step 3 of 5: Audience Targeting',
    'Step 4 of 5: Budget & Yield',
    'Step 5 of 5: Review & Launch',
  ];

  const nextLabels = [
    'Continue to Channels',
    'Continue to Audience',
    'Continue to Budget',
    'Review Campaign',
    'Launch Campaign Now',
  ];

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleLaunch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newCampaign: Campaign = {
        id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: campaignTitle || 'New Growth Campaign',
        target: `Target: ${industries.join(', ')} in ${locations.join(', ')}`,
        channels: selectedChannels.length ? selectedChannels : ['Google Ads', 'LinkedIn'],
        objective:
          objective === 'leads'
            ? 'Lead Gen'
            : objective === 'sales'
            ? 'Sales MRR'
            : objective === 'awareness'
            ? 'Awareness'
            : 'Website Traffic',
        budgetSpend: 0,
        budgetCap: dailyBudget * durationDays,
        pacingPercent: 1,
        status: 'active',
        startedDaysAgo: 0,
        remainingDays: durationDays,
        metrics: {
          label1: 'Leads',
          value1: '0',
          label2: 'CPL',
          value2: '$10.20',
          label3: 'Conv. Rate',
          value3: '0%',
          label4: 'ROAS',
          value4: 'Target 4.5x',
        },
        highlightBadge: 'AI Budget Auto-Shift ON',
        autoShiftAi: true,
      };

      onCampaignCreated(newCampaign);
      setIsSubmitting(false);
      onClose();
      setCurrentStep(1);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 transition-opacity duration-300" id="campaign-wizard-modal">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm cursor-pointer"
        id="wizard-backdrop"
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div
        className="absolute bottom-0 inset-x-0 max-h-[88vh] bg-surface-container-lowest rounded-t-3xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-out max-w-2xl mx-auto"
        id="wizard-panel"
      >
        {/* Header & Stepper bar */}
        <div className="px-5 pt-3 pb-3 flex flex-col items-center border-b border-surface-container bg-surface-container-low rounded-t-3xl relative">
          <div className="w-12 h-1.5 rounded-full bg-outline-variant mb-2" />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shadow-xs">
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              </span>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  New Campaign Wizard
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  {stepLabels[currentStep - 1]}
                </span>
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-dim transition-colors cursor-pointer"
              id="close-wizard-btn"
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* 5-Step Visual Stepper Bar */}
          <div className="w-full grid grid-cols-5 gap-1.5 mt-3">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`step-indicator h-1.5 rounded-full transition-all ${
                  step <= currentStep ? 'bg-primary-container' : 'bg-surface-container'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* STEP 1: OBJECTIVES */}
          {currentStep === 1 && (
            <div className="wizard-step flex flex-col gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  What is your primary goal?
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Market Pilot AI calibrates bidding and copy models to this goal.
                </p>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container text-on-surface font-body-md focus:bg-surface-container-low focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. Q4 Enterprise Acceleration"
                />
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                {/* Lead Gen */}
                <label
                  onClick={() => setObjective('leads')}
                  className={`objective-card p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    objective === 'leads'
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">person_add</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        Generate Qualified Leads
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        High-intent form fills, booked demos, inquiries
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="objective"
                    checked={objective === 'leads'}
                    onChange={() => setObjective('leads')}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </label>

                {/* Sales */}
                <label
                  onClick={() => setObjective('sales')}
                  className={`objective-card p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    objective === 'sales'
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-dim text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        Increase Sales / MRR
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Self-serve checkouts and direct subscriptions
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="objective"
                    checked={objective === 'sales'}
                    onChange={() => setObjective('sales')}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </label>

                {/* Awareness */}
                <label
                  onClick={() => setObjective('awareness')}
                  className={`objective-card p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    objective === 'awareness'
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-dim text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        Brand Awareness &amp; Reach
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Maximize video impressions &amp; category recall
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="objective"
                    checked={objective === 'awareness'}
                    onChange={() => setObjective('awareness')}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </label>

                {/* Traffic */}
                <label
                  onClick={() => setObjective('traffic')}
                  className={`objective-card p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    objective === 'traffic'
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-dim text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">ads_click</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        Website Traffic
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Send users to landing pages and blog guides
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="objective"
                    checked={objective === 'traffic'}
                    onChange={() => setObjective('traffic')}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: CHANNELS */}
          {currentStep === 2 && (
            <div className="wizard-step flex flex-col gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Select Active Channels
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Market Pilot AI cross-allocates budget automatically across selections.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Google Ads */}
                <div
                  onClick={() => toggleChannel('Google Ads')}
                  className={`channel-card p-3 rounded-2xl flex flex-col gap-2 cursor-pointer transition-all ${
                    selectedChannels.includes('Google Ads')
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[24px] text-tertiary">search</span>
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('Google Ads')}
                      readOnly
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Google Ads</span>
                    <span className="font-label-sm text-label-sm text-emerald-600 font-semibold">Ready • 98% Match</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div
                  onClick={() => toggleChannel('LinkedIn')}
                  className={`channel-card p-3 rounded-2xl flex flex-col gap-2 cursor-pointer transition-all ${
                    selectedChannels.includes('LinkedIn')
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[24px] text-secondary">work</span>
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('LinkedIn')}
                      readOnly
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface">LinkedIn Ads</span>
                    <span className="font-label-sm text-label-sm text-emerald-600 font-semibold">Ready • High Intent</span>
                  </div>
                </div>

                {/* Meta */}
                <div
                  onClick={() => toggleChannel('Meta (FB & IG)')}
                  className={`channel-card p-3 rounded-2xl flex flex-col gap-2 cursor-pointer transition-all ${
                    selectedChannels.includes('Meta (FB & IG)')
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[24px] text-primary">public</span>
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('Meta (FB & IG)')}
                      readOnly
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Meta (FB &amp; IG)</span>
                    <span className="font-label-sm text-label-sm text-outline">Scale &amp; Retargeting</span>
                  </div>
                </div>

                {/* Email Flow */}
                <div
                  onClick={() => toggleChannel('Email Flow')}
                  className={`channel-card p-3 rounded-2xl flex flex-col gap-2 cursor-pointer transition-all ${
                    selectedChannels.includes('Email Flow')
                      ? 'bg-primary-fixed/50 ring-2 ring-primary shadow-xs'
                      : 'bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[24px] text-outline">mail</span>
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('Email Flow')}
                      readOnly
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Email Flow</span>
                    <span className="font-label-sm text-label-sm text-outline">Optional Drip</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-high flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">sync_alt</span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  Multi-touch attribution will track unified leads across all checked networks.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: AUDIENCE TARGETING */}
          {currentStep === 3 && (
            <div className="wizard-step flex flex-col gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Define Target Audience
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  AI synthesizes prospective personas across the chosen ad networks.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Locations */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    Geographic Locations
                  </label>
                  <div className="p-2 rounded-xl bg-surface-container flex flex-wrap items-center gap-1.5">
                    {locations.map((loc) => (
                      <span
                        key={loc}
                        className="px-2 py-1 rounded-lg bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center gap-1"
                      >
                        {loc}
                        <button
                          onClick={() => setLocations(locations.filter((l) => l !== loc))}
                          className="hover:text-error cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        const val = prompt('Enter country name:');
                        if (val) setLocations([...locations, val]);
                      }}
                      className="text-primary font-body-sm text-[12px] px-2 py-1 font-medium hover:underline cursor-pointer"
                    >
                      + Add country
                    </button>
                  </div>
                </div>

                {/* Industry & Job Functions */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    Industry &amp; Job Functions
                  </label>
                  <div className="p-2 rounded-xl bg-surface-container flex flex-wrap items-center gap-1.5">
                    {industries.map((ind) => (
                      <span
                        key={ind}
                        className="px-2 py-1 rounded-lg bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center gap-1 font-medium"
                      >
                        {ind}
                        <button
                          onClick={() => setIndustries(industries.filter((i) => i !== ind))}
                          className="hover:text-error cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        const val = prompt('Enter role or industry:');
                        if (val) setIndustries([...industries, val]);
                      }}
                      className="text-primary font-body-sm text-[12px] px-2 py-1 font-medium hover:underline cursor-pointer"
                    >
                      + Add role/niche
                    </button>
                  </div>
                </div>

                {/* Age Range Slider Preview */}
                <div className="flex flex-col gap-1.5 bg-surface-container-low p-3 rounded-xl">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Age Bracket</span>
                    <span className="text-primary font-semibold">28 – 54 Years</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="65"
                    defaultValue="45"
                    className="accent-primary w-full cursor-pointer"
                  />
                  <span className="font-body-sm text-[11px] text-outline">
                    Targeting accounts with budget authority within senior leadership roles.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET & PREDICTIVE YIELD */}
          {currentStep === 4 && (
            <div className="wizard-step flex flex-col gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Budget &amp; Schedule
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Real-time simulation of expected marketing outputs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">Daily Budget</span>
                  <div className="flex items-center gap-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">$</span>
                    <input
                      type="number"
                      value={dailyBudget}
                      onChange={(e) => setDailyBudget(Number(e.target.value))}
                      className="w-full bg-transparent font-headline-sm text-headline-sm text-on-surface font-bold focus:outline-none"
                    />
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">Flexible pacing</span>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">Duration</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-16 bg-transparent font-headline-sm text-headline-sm text-on-surface font-bold focus:outline-none"
                    />
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Days</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">
                    Total: ${dailyBudget * durationDays}
                  </span>
                </div>
              </div>

              {/* AI Predictive Yield Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary-fixed/60 via-surface-container-high to-surface-container flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">insights</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    AI Projected Yield
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Estimated Leads</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">
                      {Math.round((dailyBudget * durationDays) / 10.5)} – {Math.round((dailyBudget * durationDays) / 8.5)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Estimated CPL</span>
                    <span className="font-headline-md text-headline-md text-emerald-600 font-bold">$10.20</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-[12px] pt-1 border-t border-primary/10">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  <span>Based on 144,000 similar B2B SaaS campaigns in the Market Pilot network.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & LAUNCH */}
          {currentStep === 5 && (
            <div className="wizard-step flex flex-col gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Review &amp; Ignite
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Confirm configuration. AI Pilot will optimize ad delivery every 15 minutes.
                </p>
              </div>

              {/* Summary Breakdown Box */}
              <div className="flex flex-col gap-2 bg-surface-container-low p-3.5 rounded-2xl">
                <div className="flex justify-between items-center py-1 border-b border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">Campaign Name</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    {campaignTitle}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">Objective</span>
                  <span className="font-label-md text-label-md font-bold text-primary capitalize">
                    {objective === 'leads' ? 'Qualified Leads' : objective}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">Active Channels</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    {selectedChannels.join(', ') || 'Google Ads'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">Total Budget</span>
                  <span className="font-label-md text-label-md font-bold text-emerald-600">
                    ${(dailyBudget * durationDays).toLocaleString()} (${dailyBudget}/day)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-label-sm text-label-sm text-outline">Autopilot Bidding</span>
                  <span className="font-label-md text-label-md font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">smart_toy</span> Enabled
                  </span>
                </div>
              </div>

              {/* Launch CTA */}
              <button
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-headline-sm font-bold shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer"
                type="button"
                onClick={handleLaunch}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                      progress_activity
                    </span>
                    <span>Launching with AI Pilot...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                    <span>Launch Campaign with AI Pilot</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between gap-3">
          <button
            className={`px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1 transition-all cursor-pointer ${
              currentStep === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-surface-container-high'
            }`}
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span>Back</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-md active:opacity-90 cursor-pointer hover:bg-secondary transition-colors"
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            >
              <span>{nextLabels[currentStep - 1]}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-md active:opacity-90 cursor-pointer hover:bg-emerald-700 transition-colors"
              type="button"
              onClick={handleLaunch}
              disabled={isSubmitting}
            >
              <span>Launch Campaign</span>
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
