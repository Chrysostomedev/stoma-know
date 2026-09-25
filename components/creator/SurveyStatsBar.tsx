"use client";

import React from "react";

interface StatItem {
  label: string;
  value: number | string;
}

interface SurveyStatsBarProps {
  items: StatItem[];
}

export const SurveyStatsBar: React.FC<SurveyStatsBarProps> = ({ items }) => (
  <div className="flex items-stretch rounded-lg border border-border bg-surface divide-x divide-border">
    {items.map((item) => (
      <div key={item.label} className="flex-1 px-6 py-4">
        <p className="font-display font-bold text-2xl text-ink leading-none mb-1.5">
          {item.value}
        </p>
        <p className="text-sm text-ink-light font-sans">{item.label}</p>
      </div>
    ))}
  </div>
);

SurveyStatsBar.displayName = "SurveyStatsBar";