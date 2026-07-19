"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function NewCategoryPage(){


  const router = useRouter();



  const [name,setName] =
    useState("");



  const [loading,setLoading] =
    useState(false);






  async function handleSubmit(
    e:React.FormEvent
  ){

    e.preventDefault();


    if(!name){

      alert(
        "Veuillez entrer un nom"
      );

      return;

    }





    try{


      setLoading(true);



      const res =
        await fetch(

          "/api/admin/categories",

          {

            method:"POST",

            headers:{

              "Content-Type":
              "application/json"

            },


            body:JSON.stringify({

              name

            })

          }

        );





      const data =
        await res.json();





      if(!res.ok){


        alert(
          data.message ||
          "Erreur création"
        );


        return;


      }






      alert(
        "Catégorie ajoutée avec succès"
      );



      router.push(
        "/admin/categories"
      );




    }catch(error){


      console.error(error);


      alert(
        "Erreur serveur"
      );


    }
    finally{


      setLoading(false);


    }



  }







  return (


    <div className="p-8">





      <h1 className="text-3xl font-bold text-orange-500 mb-8">

        Ajouter une catégorie 📂

      </h1>







      <form

        onSubmit={handleSubmit}

        className="bg-white shadow rounded-xl p-8 max-w-xl"

      >




        <label className="font-semibold">

          Nom de la catégorie

        </label>




        <input

          type="text"

          placeholder="Ex: Chaussures"

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }

          className="w-full border p-3 rounded mt-2 mb-6"

        />







        <button

          disabled={loading}

          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"

        >


          {
            loading

            ? "Ajout..."

            : "Ajouter la catégorie"

          }


        </button>





      </form>





    </div>


  );


}