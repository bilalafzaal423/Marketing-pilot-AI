import React from 'react';
import { ActiveTab } from '../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSettings?: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
}) => {
  return (
    <aside
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      id="drawer-menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        id="drawer-backdrop"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-[84%] max-w-[320px] bg-surface-container-lowest shadow-2xl flex flex-col transform transition-transform duration-300 ease-out z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="drawer-panel"
      >
        {/* Header / Brand in Drawer */}
        <div className="pt-safe px-space-md pb-space-sm bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-center gap-2">
              <img
                alt="Market Pilot AI Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UmKlyBB1a4Qi77qpeGg0dkRAdp0XHXx9GKI2w_YMHAIi-3UowCHsgGEmvPxPd6_PhvquAjbohSY8a5oJNGT-oq3-J55JNlpcBbNsieYnfI7TgHDGYm1BI9BRPBqoEfdbwJulVbcM8vNQDVjc5fx8Q3xvgDD4NDhzguFmyXX22-0rvduPTMW_LJgFlkQk0e9T81hksXisAnIZjqGhj0Wv84iKlX57u0YO8Io1etROHs63YAxo6B2rQ-E-CA"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Market Pilot <span className="text-primary font-bold">AI</span>
              </span>
            </div>
            <button
              aria-label="Close Drawer"
              className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
              id="btn-drawer-close"
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Organization Switcher Card */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container text-on-surface">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="font-label-md text-label-md truncate font-semibold">
                Acme Growth Co
              </span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              unfold_more
            </span>
          </div>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-space-md py-space-sm space-y-space-md">
          {/* Core */}
          <nav className="space-y-1">
            <p className="px-2 py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Core
            </p>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container text-body-md'
              }`}
              onClick={() => {
                onSelectTab('dashboard');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Dashboard</span>
            </button>

            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container text-body-md'
              }`}
              onClick={() => {
                onSelectTab('campaigns');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              <span>Campaigns</span>
            </button>

            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'ai-studio'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container text-body-md'
              }`}
              onClick={() => {
                onSelectTab('ai-studio');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>AI Content Studio</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('campaigns');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              <span>Social Media</span>
            </button>
          </nav>

          {/* Growth & Performance */}
          <nav className="space-y-1">
            <p className="px-2 py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Growth &amp; Performance
            </p>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('dashboard');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">travel_explore</span>
              <span>SEO Suite</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('campaigns');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              <span>Advertising Ads</span>
            </button>

            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container text-body-md'
              }`}
              onClick={() => {
                onSelectTab('leads');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">group</span>
              <span>Leads CRM</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('dashboard');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">insights</span>
              <span>Analytics</span>
            </button>
          </nav>

          {/* Operations */}
          <nav className="space-y-1">
            <p className="px-2 py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Operations
            </p>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('ai-studio');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Calendar</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('dashboard');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span>Reports</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-body-md text-left transition-colors cursor-pointer"
              onClick={() => {
                onSelectTab('campaigns');
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span>Integrations</span>
            </button>
          </nav>
        </div>

        {/* Footer info & Account */}
        <div className="pb-safe p-space-md bg-surface-container-lowest flex flex-col gap-space-xs border-t border-surface-container">
          <div className="flex items-center justify-between py-1 text-on-surface-variant text-body-sm cursor-pointer hover:text-on-surface">
            <span className="flex items-center gap-2 font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">help</span> Help &amp; Support
            </span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">dark_mode</span> Theme
            </span>
            <div className="h-6 w-11 rounded-full bg-surface-container-high p-0.5 flex items-center justify-start cursor-pointer">
              <div className="h-5 w-5 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px] text-on-surface">light_mode</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-space-xs mt-space-xs border-t border-surface-container">
            <div className="flex items-center gap-2 min-w-0">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw"
              />
              <div className="min-w-0 flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                  Sarah Chen
                </span>
                <span className="font-label-sm text-label-sm text-outline truncate">
                  sarah.chen@acme.io
                </span>
              </div>
            </div>
            <button
              aria-label="Logout"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-error hover:bg-error-container/20 transition-colors cursor-pointer"
              type="button"
              onClick={() => alert('Signed out of Acme Growth Co session')}
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
