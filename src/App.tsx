/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveTab, Campaign, Lead, NotificationItem, PulseItem } from './types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_LEADS,
  PULSE_FEED_ITEMS,
  NOTIFICATIONS_DATA,
  CREATIVE_ASSETS,
  COPY_LIBRARY,
} from './data/mockData';
import { Header } from './components/Header';
import { SideDrawer } from './components/SideDrawer';
import { BottomNav } from './components/BottomNav';
import { NotificationPopover } from './components/NotificationPopover';
import { QuickSearchModal } from './components/QuickSearchModal';
import { CopilotSheet } from './components/CopilotSheet';
import { CampaignWizardModal } from './components/CampaignWizardModal';
import { LeadDetailSheet } from './components/LeadDetailSheet';

import { DashboardScreen } from './screens/DashboardScreen';
import { CampaignsScreen } from './screens/CampaignsScreen';
import { LeadsScreen } from './screens/LeadsScreen';
import { AIStudioScreen } from './screens/AIStudioScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [pulseItems, setPulseItems] = useState<PulseItem[]>(PULSE_FEED_ITEMS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [creativeAssets] = useState(CREATIVE_ASSETS);
  const [libraryItems] = useState(COPY_LIBRARY);

  // Modals & Panels State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiRecApplied, setAiRecApplied] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'paused' : 'active';
          return {
            ...c,
            status: nextStatus,
            statusNote: nextStatus === 'paused' ? 'Paused manually' : 'Pacing resumed',
          };
        }
        return c;
      })
    );
    showToast('Campaign status updated');
  };

  const handleApplyAiRecommendation = () => {
    if (aiRecApplied) return;
    setAiRecApplied(true);

    // Update campaigns
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.name.includes('High-Intent B2B') || c.channels.includes('Google Ads')) {
          return {
            ...c,
            budgetSpend: c.budgetSpend + 35,
            metrics: {
              ...c.metrics,
              value1: `${parseInt(c.metrics.value1) + 14}`,
            },
          };
        }
        return c;
      })
    );

    // Add event to pulse
    const newPulse: PulseItem = {
      id: `pulse-${Date.now()}`,
      title: 'AI 1-Click Budget Shift Applied',
      time: 'Just now',
      description: 'Shifted $35/day from low-CTR Meta ad groups to Google Search high-intent keywords.',
      icon: 'bolt',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    };
    setPulseItems((prev) => [newPulse, ...prev]);

    showToast('Optimization Applied: +$35/day allocated to Google Search Ads');
  };

  const handleCampaignCreated = (newCamp: Campaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    showToast(`Campaign "${newCamp.name}" launched with AI Autopilot!`);
  };

  const handleUpdateLeadStage = (leadId: string, newStage: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStage } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStage } : null));
    }
    showToast(`Lead moved to "${newStage.toUpperCase()}" stage`);
  };

  const handleAddNewLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Lead "${newLead.name}" added to pipeline!`);
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col relative select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-60 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-body-sm font-medium animate-in fade-in slide-in-from-top-4 border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary-fixed text-[18px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent App Header */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleNotifs={() => setIsNotifsOpen(!isNotifsOpen)}
        unreadCount={unreadNotifsCount}
        onOpenProfile={() => setIsDrawerOpen(true)}
      />

      {/* Navigation Slide Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsDrawerOpen(false);
        }}
      />

      {/* Notifications Popover */}
      <NotificationPopover
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsRead}
        onClear={handleClearNotif}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        campaigns={campaigns}
        leads={leads}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onSelectLead={(lead) => setSelectedLead(lead)}
      />

      {/* AI Copilot Drawer */}
      <CopilotSheet
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onOpenCampaignWizard={() => {
          setIsCopilotOpen(false);
          setIsWizardOpen(true);
        }}
      />

      {/* Campaign Creation 5-Step Wizard Modal */}
      <CampaignWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCampaignCreated={handleCampaignCreated}
      />

      {/* Lead Details Slide-up Sheet */}
      <LeadDetailSheet
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStage={handleUpdateLeadStage}
      />

      {/* Main View Content Switcher */}
      <main className="flex flex-col relative w-full pt-16 pb-20 bg-surface flex-1 min-h-screen">
        {activeTab === 'dashboard' && (
          <DashboardScreen
            campaigns={campaigns}
            pulseItems={pulseItems}
            onOpenCopilot={() => setIsCopilotOpen(true)}
            onOpenWizard={() => setIsWizardOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'campaigns' && (
          <CampaignsScreen
            campaigns={campaigns}
            creativeAssets={creativeAssets}
            onOpenWizard={() => setIsWizardOpen(true)}
            onToggleStatus={handleToggleCampaignStatus}
            onApplyAiRecommendation={handleApplyAiRecommendation}
            aiRecApplied={aiRecApplied}
          />
        )}

        {activeTab === 'ai-studio' && (
          <AIStudioScreen
            libraryItems={libraryItems}
            onScheduleItem={(title) => {
              showToast(`Scheduled "${title.slice(0, 28)}..." for publishing`);
            }}
          />
        )}

        {activeTab === 'leads' && (
          <LeadsScreen
            leads={leads}
            onSelectLead={(lead) => setSelectedLead(lead)}
            onAddNewLead={handleAddNewLead}
            onUpdateStage={handleUpdateLeadStage}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenMenu={() => setIsDrawerOpen(true)}
      />
    </div>
  );
}
