"use client";

import { useState } from "react";

export default function SetupAdminPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function becomeAdmin() {
    setMessage("");
    setLoading(true);

    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        setMessage("Vous devez d'abord vous connecter.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(savedUser);

      const response = await fetch("/api/setup-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          setupCode: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      // Mise à jour de l'utilisateur dans le navigateur
      const updatedUser = {
        ...user,
        role: "ADMIN",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Félicitations ! Vous êtes maintenant administrateur 🎉");

      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Erreur de connexion au serveur.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-2xl font-bold text-center mb-2">
          Configuration administrateur
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Entrez le code d'installation pour activer votre compte administrateur.
        </p>

        <input
          type="password"
          placeholder="Code d'installation"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={becomeAdmin}
          disabled={loading || !code}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
        >
          {loading
            ? "Activation en cours..."
            : "Devenir administrateur"}
        </button>

        {message && (
          <p className="mt-4 text-center font-medium">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}