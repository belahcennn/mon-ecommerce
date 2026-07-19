"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "E-SHOP",
    email: "contact@eshop.com",
    phone: "+212 6 12 34 56 78",
    address: "Agadir, Maroc",
    delivery: "Gratuite à partir de 500 DH",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    alert("Paramètres enregistrés avec succès !");
  }

  return (
    <main className="max-w-5xl">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Paramètres de la boutique
      </h1>

      <div className="bg-white rounded-xl shadow p-8 space-y-6">

        <div>
          <label className="block font-semibold mb-2">
            Nom de la boutique
          </label>

          <input
            type="text"
            name="storeName"
            value={settings.storeName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Téléphone
          </label>

          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Adresse
          </label>

          <input
            type="text"
            name="address"
            value={settings.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Livraison
          </label>

          <input
            type="text"
            name="delivery"
            value={settings.delivery}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Enregistrer les modifications
        </button>

      </div>

    </main>
  );
}