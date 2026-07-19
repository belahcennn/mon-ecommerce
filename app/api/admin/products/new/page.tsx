"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Charger les catégories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "/api/admin/categories"
        );

        const data = await response.json();

        setCategories(data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);



  // Ajouter le produit
  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);


    try {

      const response = await fetch(
        "/api/admin/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            description,
            price,
            image,
            stock,
            categoryId,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Erreur lors de la création du produit"
        );

        return;
      }


      router.push("/admin/products");


    } catch (error) {

      setError(
        "Une erreur est survenue"
      );


    } finally {

      setLoading(false);

    }
  }



  return (
    <main className="max-w-3xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Ajouter un nouveau produit
      </h1>


      <div className="bg-white shadow rounded-xl p-8">


        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-5">
            {error}
          </p>
        )}



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          <div>
            <label className="block text-black mb-2">
              Nom du produit
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-lg p-3 text-black"
              placeholder="Nom du produit"
              required
            />
          </div>



          <div>
            <label className="block text-black mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-lg p-3 text-black"
              placeholder="Description du produit"
            />
          </div>



          <div>
            <label className="block text-black mb-2">
              Prix
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full border rounded-lg p-3 text-black"
              placeholder="Prix"
              required
            />
          </div>



          <div>
            <label className="block text-black mb-2">
              Image
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="w-full border rounded-lg p-3 text-black"
              placeholder="/products/image.jpg"
              required
            />
          </div>



          <div>
            <label className="block text-black mb-2">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="w-full border rounded-lg p-3 text-black"
              placeholder="Stock"
              required
            />
          </div>



          <div>
            <label className="block text-black mb-2">
              Catégorie
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              className="w-full border rounded-lg p-3 text-black"
              required
            >

              <option value="">
                Choisir une catégorie
              </option>


              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>



          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >

            {loading
              ? "Ajout en cours..."
              : "Ajouter le produit"}

          </button>


        </form>


      </div>

    </main>
  );
}