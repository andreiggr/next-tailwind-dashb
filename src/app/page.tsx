// src/app/page.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListingContent from "@/components/ListingContent";

const queryClient = new QueryClient();
const TABS = ["Featured", "KPI", "Layouts", "Storyboards"];

export default function LibraryPage() {
  const [query, setQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8 max-w-5xl mx-auto bg-white">
        <header className="relative mb-2">
          <h1 className="text-6xl font-bold text-center">Library</h1>
          <button className="absolute top-0 right-0 px-6 py-2 bg-gray-600 text-white text-sm rounded flex">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Request</span>
          </button>
        </header>

        <p className="text-center mb-6">
          Browse for assets needed to report and present analysis.
        </p>

        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <nav className="w-full mb-8 bg-gray-100 rounded-[5px] p-2 flex overflow-hidden">
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              className={`flex-1 text-center font-bold text-sm py-2 transition-colors ${
                idx === 0
                  ? "bg-white text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {query ? (
          <ListingContent query={query} />
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Featured</h2>
              <ListingContent query={query} />
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Trending</h2>
              <ListingContent query={query} />
            </section>
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
