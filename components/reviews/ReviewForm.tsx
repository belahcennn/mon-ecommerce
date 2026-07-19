"use client";

import { useState } from "react";

type ReviewFormProps = {
  addReview: (review: {
    user: string;
    comment: string;
    rating: number;
  }) => void;
};

export default function ReviewForm({
  addReview,
}: ReviewFormProps) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user || !comment) return;

    addReview({
      user,
      comment,
      rating,
    });

    setUser("");
    setComment("");
    setRating(5);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">
        Ajouter un avis
      </h2>

      <input
        type="text"
        placeholder="Votre nom"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        placeholder="Votre commentaire"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-lg p-3"
        rows={4}
      />

      <div>
        <label className="font-semibold">
          Votre note :
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="ml-3 border rounded-lg p-2"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Envoyer l'avis
      </button>
    </form>
  );
}