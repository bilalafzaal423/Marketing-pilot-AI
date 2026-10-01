import React, { useState } from 'react';
import { Lead } from '../types';

interface LeadDetailSheetProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStage: (leadId: string, newStage: Lead['status']) => void;
  onSendEmail?: (lead: Lead) => void;
}

export const LeadDetailSheet: React.FC<LeadDetailSheetProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdateStage,
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen || !lead) return null;

  const handleOpenAiEmail = () => {
    setEmailBody(
      `Hi ${lead.name.split(' ')[0]},\n\n` +
      `I noticed your interest in multi-channel attribution and budget automation at ${lead.company}. Based on your tech stack with ${lead.technologies.slice(0, 2).join(' and ')}, Market Pilot can help recover ~18% in blended ad spend in the first 14 days.\n\n` +
      `Would you have 15 minutes this Thursday to walk through our customized pilot data for ${lead.company}?\n\n` +
      `Best regards,\nSarah Chen | Acme Growth Co`
    );
    setShowEmailModal(true);
    setEmailSent(false);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSent(false);
    }, 1200);
  };

  const stages: { label: string; value: Lead['status'] }[] = [
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Qualified SQL', value: 'qualified' },
    { label: 'Proposal Sent', value: 'proposal' },
    { label: 'Won', value: 'won' },
    { label: 'Lost', value: 'lost' },
  ];

  return (
    <div className="fixed inset-0 z-50 transition-all duration-300" id="lead-slide-panel">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        id="panel-backdrop"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-surface-container-lowest rounded-t-3xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-out z-10 overflow-hidden max-w-2xl mx-auto"
        id="panel-sheet"
      >
        {/* Handle and Header */}
        <div className="px-gutter-mobile pt-3 pb-2 flex flex-col items-center bg-surface-container-low flex-shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-outline-variant/60 mb-2 cursor-grab" />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${
                  lead.status === 'qualified'
                    ? 'bg-[#ECFDF5] text-[#047857]'
                    : lead.status === 'proposal'
                    ? 'bg-surface-container-high text-tertiary-container'
                    : 'bg-surface-container-high text-primary'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {lead.status.toUpperCase()} • {lead.score}/100 {lead.isHot ? '🔥 Hot Lead' : 'Score'}
              </span>
            </div>
            <button
              aria-label="Close details"
              className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center hover:text-on-surface transition-colors cursor-pointer"
              id="btn-close-sheet"
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-gutter-mobile py-space-sm space-y-space-md flex-1">
          {/* Identity */}
          <div className="flex items-start gap-3.5">
            <img
              className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-1 ring-surface-container-high"
              src={lead.avatarDetail || lead.avatar}
              alt={lead.name}
            />
            <div className="flex flex-col min-w-0 flex-1">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">
                {lead.name}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                {lead.role} @ <span className="text-primary font-semibold">{lead.company}</span>
              </p>
              <div className="flex items-center gap-2 mt-1 font-body-sm text-body-sm text-outline">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {lead.location}
                </span>
                <span>•</span>
                <span className="text-[#047857] font-semibold font-mono-metric">
                  ${lead.estValueArr.toLocaleString()} ARR
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="grid grid-cols-2 gap-2">
            <a
              className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2 text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              href={`mailto:${lead.email}`}
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-[10px] text-outline">Email Address</p>
                <p className="font-label-md text-label-md truncate font-medium">{lead.email}</p>
              </div>
            </a>

            <a
              className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2 text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              href={`tel:${lead.phone}`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#047857]/10 text-[#047857] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]">call</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-[10px] text-outline">Phone Number</p>
                <p className="font-label-md text-label-md truncate font-medium">{lead.phone}</p>
              </div>
            </a>
          </div>

          {/* Firmographics & Stack */}
          <div className="p-space-sm rounded-2xl bg-surface-container-low flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-outline">
                Firmographics &amp; Stack
              </span>
              <span className="font-label-sm text-[11px] text-primary flex items-center gap-0.5 font-medium">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Enriched by Pilot
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm py-1 border-b border-surface-container">
              <span className="text-on-surface-variant">Company Size:</span>
              <span className="font-semibold text-on-surface">{lead.companySize}</span>
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                Detected Technologies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {lead.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-[11px] font-medium shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-outline">
                Activity Timeline
              </span>
              <span className="font-label-sm text-[11px] text-outline">Real-time telemetry</span>
            </div>
            <div className="relative pl-6 space-y-3.5 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {lead.timeline.map((event, idx) => (
                <div key={idx} className="relative flex flex-col gap-0.5">
                  <span
                    className={`absolute -left-6 top-1 w-3 h-3 rounded-full ring-4 ring-surface-container-lowest ${
                      event.type === 'ai'
                        ? 'bg-primary animate-ping'
                        : event.type === 'email'
                        ? 'bg-secondary-container'
                        : 'bg-primary'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <p className="font-label-md text-label-md font-semibold text-on-surface">
                      {event.title}
                    </p>
                    <span className="font-label-sm text-[10px] text-outline">{event.time}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-gutter-mobile bg-surface-container-lowest shadow-lg flex flex-col gap-2 flex-shrink-0 border-t border-surface-container">
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`tel:${lead.phone}`}
              className="h-11 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container flex items-center justify-center gap-1.5 font-label-md text-label-md font-semibold active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#047857]">call</span>
              Call
            </a>
            <button
              onClick={handleOpenAiEmail}
              className="h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center gap-1.5 font-label-md text-label-md font-semibold shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-secondary"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              AI Email
            </button>
            <button
              onClick={() => alert(`Calendar booking invite initiated with ${lead.name} (${lead.email})`)}
              className="h-11 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container flex items-center justify-center gap-1.5 font-label-md text-label-md font-semibold active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary-container">
                calendar_today
              </span>
              Book
            </button>
          </div>

          {/* Stage Move Dropdown selector */}
          <div className="relative">
            <select
              value={lead.status}
              onChange={(e) => onUpdateStage(lead.id, e.target.value as Lead['status'])}
              className="w-full h-11 px-3 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold appearance-none outline-none cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              {stages.map((st) => (
                <option key={st.value} value={st.value}>
                  Move Stage: {st.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-3 material-symbols-outlined text-[18px] text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* AI Email Composer Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-60 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-5 max-w-lg w-full flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  AI Personalized Email to {lead.name}
                </span>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[11px] text-outline font-semibold">Recipient:</span>
              <p className="font-body-sm text-body-sm text-on-surface bg-surface-container-low p-2 rounded-lg">
                {lead.name} &lt;{lead.email}&gt;
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[11px] text-outline font-semibold">Draft Message:</span>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={8}
                className="w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface border border-surface-container outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-md cursor-pointer hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={emailSent}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md font-semibold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer hover:bg-secondary transition-all"
              >
                {emailSent ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Send Pitch</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
