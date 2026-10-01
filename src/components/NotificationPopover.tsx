import React from 'react';
import { NotificationItem } from '../types';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClear: (id: string) => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClear,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className="fixed top-16 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 rounded-2xl bg-surface-container-lowest p-space-md shadow-2xl backdrop-blur-xl border border-surface-container transition-all duration-200 animate-in fade-in zoom-in-95"
      id="notif-popover"
    >
      <div className="flex items-center justify-between pb-space-xs mb-space-xs border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Activity Alerts
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-semibold">
              {unreadCount} New
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-primary hover:underline font-label-sm mr-1 cursor-pointer"
            >
              Mark all read
            </button>
          )}
          <button
            aria-label="Close Alerts"
            className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container cursor-pointer transition-colors"
            id="btn-notif-close"
            type="button"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      <div className="space-y-space-xs max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="py-6 text-center text-on-surface-variant text-body-sm">
            No active alerts right now
          </p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                item.read ? 'bg-surface-container-low/50 opacity-75' : 'bg-surface-container-low shadow-xs'
              }`}
            >
              <span className={`material-symbols-outlined ${item.iconColor} text-[20px] mt-0.5 flex-shrink-0`}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-label-md font-semibold text-on-surface">
                  {item.title}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="font-label-sm text-label-sm text-outline">
                  {item.time}
                </span>
                <button
                  onClick={() => onClear(item.id)}
                  className="text-outline hover:text-error text-[10px] cursor-pointer"
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
