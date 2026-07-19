"use client";

type Props = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">

      <button
        onClick={() => setSelectedCategory("Tous")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          selectedCategory === "Tous"
            ? "bg-orange-500 text-white"
            : "bg-gray-200 text-black hover:bg-orange-200"
        }`}
      >
        Tous
      </button>


      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-black hover:bg-orange-200"
          }`}
        >
          {category}
        </button>
      ))}


    </div>
  );
}