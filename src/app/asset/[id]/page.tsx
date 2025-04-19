"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Asset } from "@/components/AssetCard";
import AssetContent from "@/components/AssetContent";
import Link from "next/link";

export default function AssetPage() {
  const { id } = useParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/assets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch asset ${id}`);
        return res.json() as Promise<Asset>;
      })
      .then((data) => setAsset(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-8 text-center">Loading asset…</p>;
  }
  if (error) {
    return <p className="p-8 text-center text-red-600">Error: {error}</p>;
  }
  if (!asset) {
    return <p className="p-8 text-center text-gray-600">Asset not found</p>;
  }

  return (
    <div className="py-6">
      <Link
        href={`/`}
        className="px-4 py-2 mx-5 mt-5 bg-blue-600 text-white rounded text-center"
      >
        Back to listing
      </Link>

      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          {loading ? "Loading..." : ""}
          {asset ? <AssetContent asset={asset} /> : "No data available"}
        </div>
      </div>
    </div>
  );
}
