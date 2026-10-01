import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMenu,
}) => {
  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container"
      data-active-classes="text-primary font-semibold"
    >
      <div className="flex justify-around items-center h-16 px-gutter-mobile max-w-7xl mx-auto">
        {/* Dashboard */}
        <button
          aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 transition-colors cursor-pointer ${
            activeTab === 'dashboard'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => onSelectTab('dashboard')}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">speed</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>

        {/* Campaigns */}
        <button
          aria-current={activeTab === 'campaigns' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 transition-colors cursor-pointer ${
            activeTab === 'campaigns'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => onSelectTab('campaigns')}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
          <span className="font-label-sm text-label-sm">Campaigns</span>
        </button>

        {/* AI Studio */}
        <button
          aria-current={activeTab === 'ai-studio' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 transition-colors cursor-pointer ${
            activeTab === 'ai-studio'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => onSelectTab('ai-studio')}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
          <span className="font-label-sm text-label-sm">AI Studio</span>
        </button>

        {/* Leads */}
        <button
          aria-current={activeTab === 'leads' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 transition-colors cursor-pointer ${
            activeTab === 'leads'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          onClick={() => onSelectTab('leads')}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">group</span>
          <span className="font-label-sm text-label-sm">Leads</span>
        </button>

        {/* Menu (Open Drawer) */}
        <button
          className="flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          id="btn-drawer-bottom"
          type="button"
          onClick={onOpenMenu}
        >
          <span className="material-symbols-outlined text-[24px]">grid_view</span>
          <span className="font-label-sm text-label-sm">Menu</span>
        </button>
      </div>
    </nav>
  );
};
