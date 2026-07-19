"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditCategoryPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id;




  const [name,setName] =
    useState("");



  const [loading,setLoading] =
    useState(true);





  useEffect(()=>{

    loadCategory();

  },[]);







  async function loadCategory(){


    try{


      const res =
        await fetch(
          `/api/admin/categories/${id}`
        );



      const data =
        await res.json();




      setName(
        data.name
      );



    }catch(error){


      console.error(error);


    }
    finally{

      setLoading(false);

    }


  }








  async function handleSubmit(
    e:React.FormEvent
  ){


    e.preventDefault();




    const res =
      await fetch(

        `/api/admin/categories/${id}`,

        {


          method:"PUT",


          headers:{


            "Content-Type":
            "application/json"


          },


          body:JSON.stringify({

            name

          })


        }

      );







    if(res.ok){


      alert(
        "Catégorie modifiée avec succès"
      );


      router.push(
        "/admin/categories"
      );


    }

    else{


      alert(
        "Erreur modification"
      );


    }



  }








  if(loading){


    return (

      <div className="p-8">

        Chargement...

      </div>

    );

  }







  return (


    <div className="p-8">





      <h1 className="text-3xl font-bold text-orange-500 mb-8">

        Modifier la catégorie ✏️

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


          value={name}


          onChange={(e)=>

            setName(
              e.target.value
            )

          }


          className="w-full border p-3 rounded mt-2 mb-6"


        />








        <button

          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"

        >

          Enregistrer les modifications

        </button>





      </form>






    </div>


  );


}