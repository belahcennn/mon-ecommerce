"use client";

import Rating from "./Rating";


const reviews = [
  {
    id:1,
    name:"Ahmed",
    comment:"Très bon produit, qualité excellente.",
    rating:5,
  },

  {
    id:2,
    name:"Sara",
    comment:"Livraison rapide et produit conforme.",
    rating:4,
  },

  {
    id:3,
    name:"Youssef",
    comment:"Je recommande ce produit.",
    rating:5,
  }
];


export default function ReviewList(){

  return (

    <div className="mt-10">


      <h2 className="text-2xl font-bold mb-6">
        Avis clients
      </h2>


      <div className="space-y-5">


        {reviews.map((review)=>(
          
          <div
            key={review.id}
            className="border rounded-xl p-5"
          >

            <h3 className="font-bold">
              {review.name}
            </h3>


            <Rating rating={review.rating}/>


            <p className="mt-3 text-black">
              {review.comment}
            </p>


          </div>

        ))}


      </div>


    </div>

  );
}