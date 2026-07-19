"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage(){

  const router = useRouter();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [message,setMessage] = useState("");

  const [loading,setLoading] = useState(false);



  async function handleLogin(e:React.FormEvent){

    e.preventDefault();


    setLoading(true);

    setMessage("");



    try {


      const response = await fetch("/api/login",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify({

          email,

          password

        })

      });



      const data = await response.json();



      if(response.ok){


        setMessage("Connexion réussie ✅");


        // temporaire
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        setTimeout(()=>{

          router.push("/account");

        },1000);



      }else{


        setMessage(data.message);


      }



    }catch(error){


      setMessage("Erreur serveur");


    }finally{

      setLoading(false);

    }


  }




return (

<div className="min-h-screen bg-gray-100 flex items-center justify-center">


<form
onSubmit={handleLogin}
className="bg-white p-8 rounded-xl shadow-lg w-96"
>


<h1 className="text-3xl font-bold text-center mb-6">
Connexion
</h1>



<input

className="border p-3 w-full rounded mb-4"

placeholder="Email"

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>




<input

className="border p-3 w-full rounded mb-4"

placeholder="Mot de passe"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




<button

disabled={loading}

className="bg-orange-500 hover:bg-orange-600 text-white w-full p-3 rounded"

>

{loading ? "Connexion..." : "Se connecter"}

</button>



{message && (

<p className="text-center mt-4">

{message}

</p>

)}




<p className="mt-5 text-center">

Pas de compte ?

<Link
href="/register"
className="text-blue-600 ml-2"
>
Inscription
</Link>

</p>



</form>


</div>

)

}