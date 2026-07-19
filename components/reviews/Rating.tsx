"use client";

import { FaStar } from "react-icons/fa";

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          className={
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}