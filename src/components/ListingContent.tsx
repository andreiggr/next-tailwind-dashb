import { useQuery } from "@tanstack/react-query";
import AssetCard, { Asset } from "./AssetCard";

const fetchAssets = async (): Promise<Asset[]> => {
  const res = await fetch("/api/assets");
  if (!res.ok) {
    console.log("err", res);
  }
  return res.json() as Promise<Asset[]>;
};

export default function ListingContent({ query }: { query: string }) {
  const {
    data: assets = [],
    isLoading,
    isError,
    error,
  } = useQuery<Asset[], Error>({
    queryKey: [query],
    queryFn: fetchAssets,
  });

  if (isLoading) {
    return <p>Loading assets...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }
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
