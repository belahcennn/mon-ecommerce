type SortProductsProps = {
  sort: string;
  setSort: (value: string) => void;
};

export default function SortProducts({
  sort,
  setSort,
}: SortProductsProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">
        ↕️ Trier par
      </label>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full md:w-64 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Par défaut</option>
        <option value="price-asc">Prix : croissant</option>
        <option value="price-desc">Prix : décroissant</option>
        <option value="name-asc">Nom : A → Z</option>
        <option value="name-desc">Nom : Z → A</option>
      </select>
    </div>
  );
}