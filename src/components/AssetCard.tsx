"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, Tag } from "lucide-react";
import AssetContent from "./AssetContent";

export interface Asset {
  id: string;
  title: string;
  description: string;
  tags: string[];
  used: number;
  type: string;
  pages: number;
  lastUpdated: string;
  kpiData: { name: string; value: number }[];
}

interface AssetCardProps {
  asset: Asset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(asset.lastUpdated).toLocaleDateString();

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer border border-gray-200 rounded-lg p-4 flex items-center hover:shadow transition"
      >
        <Image
          src="/chartIcon.png"
          className="p-3 bg-gray-100 rounded-lg"
          alt="Asset Icon"
          width={80}
          height={80}
        />
        <div className="ml-4">
          <h3 className="font-medium text-lg">{asset.title}</h3>
          <p className="text-sm text-gray-600">{asset.description}</p>
          <p className="text-xs text-gray-400 mt-2">{date}</p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
            <div className="absolute top-4 right-4">
              <button className="text-gray-500 hover:text-gray-700 mr-6">
                <LinkIcon size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <AssetContent asset={asset} />

            <div className="mt-8 space-y-4">
              <Link
                href={`/asset/${asset.id}`}
                className="block w-full text-center px-4 py-2 bg-gray-900 text-white rounded"
              >
                View item
              </Link>
              <button className="flex items-center justify-center w-full px-4 py-2 bg-gray-900 text-white rounded">
                <Tag size={16} className="mr-2" />
                Favorite item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
