"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function NewProductPage(){


  const router = useRouter();



  const [categories,setCategories] =
    useState<any[]>([]);



  const [uploading,setUploading] =
    useState(false);




  const [form,setForm] = useState({

    name:"",
    description:"",
    price:"",
    image:"",
    stock:"",
    categoryId:"",

  });






  useEffect(()=>{


    loadCategories();


  },[]);







  async function loadCategories(){


    const res =
      await fetch(
        "/api/categories"
      );


    const data =
      await res.json();


    setCategories(data);


  }









  async function uploadImage(
    e:React.ChangeEvent<HTMLInputElement>
  ){



    const file =
      e.target.files?.[0];



    if(!file) return;





    const formData =
      new FormData();



    formData.append(
      "file",
      file
    );





    setUploading(true);





    const res =
      await fetch(

        "/api/upload",

        {

          method:"POST",

          body:formData

        }

      );





    const data =
      await res.json();





    setForm({

      ...form,

      image:data.url

    });




    setUploading(false);



  }









  async function handleSubmit(
    e:React.FormEvent
  ){


    e.preventDefault();





    const res =
      await fetch(

        "/api/admin/products",

        {


          method:"POST",


          headers:{


            "Content-Type":
            "application/json"


          },


          body:JSON.stringify(form)


        }

      );







    const data =
      await res.json();






    if(res.ok){


      alert(
        "Produit ajouté avec succès"
      );



      router.push(
        "/admin/products"
      );



    }

    else{


      alert(
        data.message ||
        "Erreur ajout produit"
      );


    }



  }








  return (


    <div className="p-8">





      <h1 className="text-3xl font-bold text-orange-500 mb-8">

        Ajouter un produit ➕

      </h1>







      <form

        onSubmit={handleSubmit}

        className="bg-white shadow rounded-xl p-8 max-w-xl"

      >






        <input


          className="w-full border p-3 rounded mb-4"


          placeholder="Nom du produit"


          value={form.name}


          onChange={(e)=>

            setForm({

              ...form,

              name:e.target.value

            })

          }


          required


        />








        <textarea


          className="w-full border p-3 rounded mb-4"


          placeholder="Description"


          value={form.description}


          onChange={(e)=>

            setForm({

              ...form,

              description:e.target.value

            })

          }


        />








        <input


          type="number"


          className="w-full border p-3 rounded mb-4"


          placeholder="Prix (€)"


          value={form.price}


          onChange={(e)=>

            setForm({

              ...form,

              price:e.target.value

            })

          }


          required


        />








        <input


          type="number"


          className="w-full border p-3 rounded mb-4"


          placeholder="Stock"


          value={form.stock}


          onChange={(e)=>

            setForm({

              ...form,

              stock:e.target.value

            })

          }


          required


        />








        <label className="font-semibold">

          Image du produit 📸

        </label>





        <input


          type="file"


          accept="image/*"


          onChange={uploadImage}


          className="w-full border p-3 rounded mt-2 mb-4"


        />






        {
          uploading && (

            <p className="text-orange-500 mb-4">

              Upload de l'image...

            </p>

          )
        }







        {
          form.image && (

            <img

              src={form.image}

              alt="preview"

              className="w-40 h-40 object-cover rounded mb-4"

            />

          )
        }









        <select


          className="w-full border p-3 rounded mb-6"


          value={form.categoryId}


          onChange={(e)=>

            setForm({

              ...form,

              categoryId:e.target.value

            })

          }


          required


        >



          <option value="">

            Choisir une catégorie

          </option>




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


          disabled={uploading}


          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"


        >

          Ajouter le produit


        </button>






      </form>






    </div>


  );


}