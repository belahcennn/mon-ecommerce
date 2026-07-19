const categories = [
  "Électronique",
  "Mode",
  "Chaussures",
  "Beauté",
  "Maison",
  "Sport",
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">
        Catégories populaires
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition"
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}