"use client";

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt?: string;
  user?: {
    name: string | null;
  };
};

type Props = {
  reviews: Review[];
};

export default function ReviewList({
  reviews,
}: Props) {
  return (
    <div className="mt-16 border-t pt-8">

      <h2 className="text-3xl font-bold mb-6">
        ⭐ Avis des clients
      </h2>

      {reviews.length === 0 ? (

        <p className="text-gray-600">
          Aucun avis pour le moment.
        </p>

      ) : (

        <div className="space-y-5">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="border rounded-xl p-5 shadow-sm"
            >

              <div className="flex justify-between">

                <strong>
                  {review.user?.name || "Client"}
                </strong>

                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>

              </div>

              <p className="mt-3 text-gray-700">
                {review.comment}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}