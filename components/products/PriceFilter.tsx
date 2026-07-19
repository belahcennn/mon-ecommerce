type PriceFilterProps = {
  maxPrice: number;
  setMaxPrice: (price: number) => void;
};

export default function PriceFilter({
  maxPrice,
  setMaxPrice,
}: PriceFilterProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-orange-500">
  💰 Prix maximum : ${maxPrice}
</label>
      <input
        type="range"
        min={0}
        max={2000}
        step={50}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
    </div>
  );
}