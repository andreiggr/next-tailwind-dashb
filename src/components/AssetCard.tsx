'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AssetContent from './AssetContent';

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

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer border border-gray-200 rounded p-4 flex items-center hover:shadow transition min-h-30"
      >
        <Image src="/file.svg" alt="" width={40} height={40} />
        <div className="ml-4">
          <h3 className="font-medium text-lg">{asset.title}</h3>
          <p className="text-sm text-gray-600">{asset.description}</p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <AssetContent asset={asset} />

            <div className="flex space-x-4 mt-6">
              <Link
                href={`/asset/${asset.id}`}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-center"
              >
                View Full Asset
              </Link>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded">
                Favorite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
