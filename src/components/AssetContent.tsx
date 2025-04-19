'use client';

import React from 'react';
import { Asset } from './AssetCard';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#6366F1', '#4F46E5', '#818CF8', '#A5B4FC', '#C7D2FE'];

interface AssetContentProps {
  asset: Asset;
}

export default function AssetContent({ asset }: AssetContentProps) {
  return (
    <div className="bg-white w-full">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{asset.title}</h1>
        <p className="text-gray-700">{asset.description}</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        {asset.tags.map(tag => (
          <span
            key={tag}
            className="bg-gray-100 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-x-8 text-sm text-gray-600 mb-6">
        <li><strong>Used:</strong> {asset.used}</li>
        <li><strong>Type:</strong> {asset.type}</li>
        <li><strong>Pages:</strong> {asset.pages}</li>
        <li>
          <strong>Last Updated:</strong>{' '}
          {new Date(asset.lastUpdated).toLocaleDateString()}
        </li>
      </ul>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Legend verticalAlign="bottom" height={36} />
            <Pie
              data={asset.kpiData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name}: ${(percent! * 100).toFixed(0)}%`
              }
            >
              {asset.kpiData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
);
}
