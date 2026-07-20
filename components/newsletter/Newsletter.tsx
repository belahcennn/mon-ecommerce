"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setMessage("Veuillez entrer votre adresse email.");
      return;
    }

    setMessage("✅ Merci ! Vous êtes maintenant inscrit à notre newsletter.");
    setEmail("");
  }

  return (
    <section className="bg-orange-500 py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-black mb-8">
        Recevez nos promotions
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full max-w-xl px-4 py-4 rounded-lg outline-none"
        />

        <button
          type="submit"
          className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
        >
          S'abonner
        </button>
      </form>

      {message && (
        <p className="mt-6 text-white font-semibold">
          {message}
        </p>
      )}
    </section>
  );
}