export default function Newsletter() {
  return (
    <section className="bg-orange-500 py-16">

      <div className="max-w-xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          Recevez nos promotions
        </h2>

        <input
          type="email"
          placeholder="Votre email"
          className="mt-8 w-full rounded-lg p-4 text-black"
        />

        <button className="mt-5 bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold">
          S&apos;abonner
        </button>

      </div>

    </section>
  );
}