"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListingContent from "@/components/ListingContent";
import { useState } from "react";

const queryClient = new QueryClient();

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8 max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Library</h1>
        </header>

        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <ListingContent query={query}/>
      </div>
    </QueryClientProvider>
  );
}
