export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">


      <h1 className="text-4xl font-bold mb-8 text-orange-500">
        Contactez-nous
      </h1>



      <div className="bg-white shadow rounded-xl p-8">


        <p className="text-black mb-6">
          Vous avez une question ? Notre équipe est à votre
          disposition.
        </p>



        <div className="space-y-4">


          <p>
            📧 Email :
            <span className="font-semibold">
              contact@eshop.com
            </span>
          </p>


          <p>
            📞 Téléphone :
            <span className="font-semibold">
              +212 6 XX XX XX XX
            </span>
          </p>


          <p>
            📍 Adresse :
            <span className="font-semibold">
              Maroc
            </span>
          </p>


        </div>



        <form className="mt-8 space-y-4">


          <input
            type="text"
            placeholder="Votre nom"
            className="w-full border rounded-lg p-3"
          />


          <input
            type="email"
            placeholder="Votre email"
            className="w-full border rounded-lg p-3"
          />


          <textarea
            placeholder="Votre message"
            className="w-full border rounded-lg p-3 h-32"
          />


          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Envoyer
          </button>


        </form>


      </div>


    </main>
  );
}