import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import AssetCard, { Asset } from "./AssetCard";

type AssetQueryKey = ["assets", string];

const fetchAssets = async ({
  queryKey: [, textSearch],
}: QueryFunctionContext<AssetQueryKey>): Promise<Asset[]> => {
  const params = new URLSearchParams();
  if (textSearch) params.append("textSearch", textSearch);

  const endpoint = params.toString()
    ? `/api/assets?${params.toString()}`
    : `/api/assets`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch assets (${response.status}): ${response.statusText}`
    );
  }
  return response.json();
};

interface ListingContentProps {
  query: string;
}

export default function ListingContent({ query }: ListingContentProps) {
  const {
    data: assets = [],
    isLoading,
    isError,
    error,
  } = useQuery<Asset[], Error, Asset[], AssetQueryKey>({
    queryKey: ["assets", query],
    queryFn: fetchAssets,
  });

  if (isLoading) return <p>Loading assets…</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none p-0 m-0">
      {assets.map((asset) => (
        <li key={asset.id}>
          <AssetCard asset={asset} />
        </li>
      ))}
    </ul>
  );
}
