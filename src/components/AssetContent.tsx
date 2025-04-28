"use client";

import React from "react";
import Image from "next/image";
import { Asset } from "./AssetCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Info } from "lucide-react";

const COLORS = ["#6366F1", "#4F46E5", "#818CF8", "#A5B4FC", "#C7D2FE"];

interface AssetContentProps {
  asset: Asset;
}

export default function AssetContent({ asset }: AssetContentProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <Image
          src="/chartIcon.png"
          className="mx-auto mb-4 p-3 bg-gray-50 rounded-lg"
          alt="Asset Icon"
          width={120}
          height={120}
        />
        <div className="inline-flex items-center mb-2">
          <h1 className="text-3xl font-bold">{asset.title}</h1>
          <span className="ml-2 bg-gray-100 text-xs px-2 py-1 rounded">
            Layout
          </span>
        </div>
        <p className="text-gray-700 mb-4">{asset.description}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {asset.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ul className="flex divide-x divide-gray-200 text-center text-gray-600 mb-8">
        <li className="flex-1 px-4">
          <div className="text-xl font-semibold">{asset.used}</div>
          <div className="mt-1 text-sm inline-flex items-center justify-center">
            Used <Info size={14} className="ml-1 text-gray-400" />
          </div>
        </li>
        <li className="flex-1 px-4">
          <div className="text-xl font-semibold">{asset.type}</div>
          <div className="mt-1 text-sm">Type</div>
        </li>
        <li className="flex-1 px-4">
          <div className="text-xl font-semibold">{asset.pages}</div>
          <div className="mt-1 text-sm inline-flex items-center justify-center">
            Pages No. <Info size={14} className="ml-1 text-gray-400" />
          </div>
        </li>
        <li className="flex-1 px-4">
          <div className="text-xl font-semibold">
            {new Date(asset.lastUpdated).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
          <div className="mt-1 text-sm">Last Updated</div>
        </li>
      </ul>

      <div className="h-64 mb-8">
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

      <section>
        <h2 className="text-xl font-semibold mb-4">Business Questions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Question 1", "Question 2", "Question 3", "Question 4"].map(
            (q, idx) => (
              <div
                key={idx}
                className="p-4 rounded hover:bg-gray-100 transition"
              >
                <h3 className="font-bold mb-2">{q}</h3>
                <p className="text-sm text-gray-600">
                  Short description of the item goes nicely here.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
