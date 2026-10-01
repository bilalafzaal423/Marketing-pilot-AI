import React from 'react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onToggleNotifs: () => void;
  unreadCount: number;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenSearch,
  onToggleNotifs,
  unreadCount,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-xs max-w-7xl mx-auto">
        {/* Left: Drawer toggle and Logo */}
        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Open Navigation Menu"
            className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
            id="btn-drawer-open"
            type="button"
            onClick={onOpenDrawer}
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <div className="flex items-center gap-1.5 cursor-pointer">
            <img
              alt="Market Pilot AI Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UmKlyBB1a4Qi77qpeGg0dkRAdp0XHXx9GKI2w_YMHAIi-3UowCHsgGEmvPxPd6_PhvquAjbohSY8a5oJNGT-oq3-J55JNlpcBbNsieYnfI7TgHDGYm1BI9BRPBqoEfdbwJulVbcM8vNQDVjc5fx8Q3xvgDD4NDhzguFmyXX22-0rvduPTMW_LJgFlkQk0e9T81hksXisAnIZjqGhj0Wv84iKlX57u0YO8Io1etROHs63YAxo6B2rQ-E-CA"
            />
            <div className="flex items-center gap-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                Market Pilot
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[10px] tracking-wide uppercase font-semibold">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Search, Notifications, Profile */}
        <div className="flex items-center gap-1">
          <button
            aria-label="Quick Search"
            className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
            type="button"
            onClick={onOpenSearch}
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            aria-label="Notifications"
            className="w-11 h-11 relative flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
            id="btn-notif-toggle"
            type="button"
            onClick={onToggleNotifs}
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            className="w-11 h-11 flex items-center justify-center ml-0.5 cursor-pointer active:scale-95 transition-transform"
            type="button"
            onClick={onOpenProfile}
          >
            <img
              alt="Sarah Chen Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/20 hover:ring-primary transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm_oVV0dVusN7tp5zpdhlM4rNTOnG_O5w4kXxmsGvY6RkXAbq4O09RHOVBByH4adO-eYskb5jqbAYgZvitWUF1x1NNVP-Ipd5k3flN0nEUxw0XxfYv5iJ5H4rslJLcI98p3V4XQsqZfxbFv8DVGKf3zSQ9_cbphUMFQePvkEp6lW_UPhUyUGnRZOJba15wKS6mqGZMwivIfFNB0wp96MsAyX5p_NoV_t4NjF1JcS0J9evWa3rNVOBXCw"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
