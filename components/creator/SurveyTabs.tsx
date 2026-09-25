"use client";

import React from "react";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface SurveyTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export const SurveyTabs: React.FC<SurveyTabsProps> = ({ tabs, active, onChange }) => (
  <div className="flex items-center gap-1 border-b border-border">
    {tabs.map((tab) => {
      const isActive = tab.id === active;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium font-sans transition-colors ${
            isActive ? "text-ink" : "text-ink-light hover:text-ink"
          }`}
        >
          {tab.label}
          <span
            className={`text-xs rounded-full px-1.5 py-0.5 ${
              isActive ? "bg-accent-lighter text-accent" : "bg-surface-active text-ink-light"
            }`}
          >
            {tab.count}
          </span>
          {isActive && (
            <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent rounded-full" />
          )}
        </button>
      );
    })}
  </div>
);

SurveyTabs.displayName = "SurveyTabs";