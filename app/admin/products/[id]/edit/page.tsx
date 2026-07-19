"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditProductPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id;



  const [categories,setCategories] =
    useState<any[]>([]);



  const [form,setForm] = useState({

    name:"",
    description:"",
    price:"",
    image:"",
    stock:"",
    categoryId:"",

  });



  const [loading,setLoading] =
    useState(true);






  useEffect(()=>{


    loadProduct();

    loadCategories();


  },[]);








  async function loadProduct(){


    const res =
      await fetch(
        `/api/admin/products/${id}`
      );


    const data =
      await res.json();




    setForm({

      name:data.name,

      description:data.description || "",

      price:String(data.price),

      image:data.image,

      stock:String(data.stock),

      categoryId:String(data.categoryId),


    });



    setLoading(false);


  }







  async function loadCategories(){


    const res =
      await fetch(
        "/api/categories"
      );


    const data =
      await res.json();


    setCategories(data);


  }









  async function handleSubmit(
    e:React.FormEvent
  ){


    e.preventDefault();




    const res =
      await fetch(

        `/api/admin/products/${id}`,

        {


          method:"PUT",


          headers:{


            "Content-Type":
            "application/json"


          },


          body:JSON.stringify(form)


        }

      );






    if(res.ok){


      alert(
        "Produit modifié avec succès"
      );


      router.push(
        "/admin/products"
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

        Modifier le produit ✏️

      </h1>







      <form

        onSubmit={handleSubmit}

        className="bg-white shadow rounded-xl p-8 max-w-xl"

      >





        <input

          className="w-full border p-3 rounded mb-4"

          value={form.name}

          onChange={(e)=>

            setForm({

              ...form,

              name:e.target.value

            })

          }

          placeholder="Nom"

        />






        <textarea

          className="w-full border p-3 rounded mb-4"

          value={form.description}

          onChange={(e)=>

            setForm({

              ...form,

              description:e.target.value

            })

          }

          placeholder="Description"

        />







        <input

          className="w-full border p-3 rounded mb-4"

          type="number"

          value={form.price}

          onChange={(e)=>

            setForm({

              ...form,

              price:e.target.value

            })

          }

          placeholder="Prix"

        />







        <input

          className="w-full border p-3 rounded mb-4"

          value={form.image}

          onChange={(e)=>

            setForm({

              ...form,

              image:e.target.value

            })

          }

          placeholder="Image"

        />







        <input

          className="w-full border p-3 rounded mb-4"

          type="number"

          value={form.stock}

          onChange={(e)=>

            setForm({

              ...form,

              stock:e.target.value

            })

          }

          placeholder="Stock"

        />







        <select

          className="w-full border p-3 rounded mb-6"

          value={form.categoryId}

          onChange={(e)=>

            setForm({

              ...form,

              categoryId:e.target.value

            })

          }

        >



          {
            categories.map((cat)=>(


              <option

                key={cat.id}

                value={cat.id}

              >

                {cat.name}

              </option>


            ))
          }



        </select>







        <button

          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"

        >

          Enregistrer les modifications

        </button>





      </form>




    </div>


  );


}