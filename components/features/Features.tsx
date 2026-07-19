export default function Features() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h2 className="text-3xl font-bold mb-10">
        Pourquoi nous choisir ?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-xl shadow">
          🚚 Livraison rapide
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          🔒 Paiement sécurisé
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          ⭐ Produits de qualité
        </div>

      </div>

    </section>
  );
}