import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



// ==========================
// GET UN PRODUIT
// ==========================

export async function GET(

  req:Request,

  {params}:{params:Promise<{id:string}>}

){


  try{


    const {id}=await params;



    const product =
      await prisma.product.findUnique({

        where:{

          id:Number(id)

        },

        include:{

          category:true

        }

      });




    if(!product){


      return NextResponse.json(

        {
          message:"Produit introuvable"
        },

        {
          status:404
        }

      );

    }





    return NextResponse.json(product);




  }catch(error){


    console.error(error);


    return NextResponse.json(

      {
        message:"Erreur récupération produit"
      },

      {
        status:500
      }

    );


  }


}






// ==========================
// PUT MODIFIER PRODUIT
// ==========================

export async function PUT(

req:Request,

{params}:{params:Promise<{id:string}>}

){


try{


const {id}=await params;


const body =
await req.json();




const product =
await prisma.product.update({

where:{

id:Number(id)

},


data:{


name:body.name,

description:body.description,

price:Number(body.price),

image:body.image,

stock:Number(body.stock),

categoryId:Number(body.categoryId)


}


});



return NextResponse.json(product);



}catch(error){


console.error(error);


return NextResponse.json(

{
message:"Erreur modification"
},

{
status:500
}

);


}


}







// ==========================
// DELETE SUPPRIMER PRODUIT
// ==========================

export async function DELETE(

req:Request,

{params}:{params:Promise<{id:string}>}

){


try{


const {id}=await params;



await prisma.product.delete({

where:{

id:Number(id)

}

});




return NextResponse.json({

message:"Produit supprimé"

});





}catch(error){


console.error(error);



return NextResponse.json(

{
message:"Erreur suppression"
},

{
status:500
}

);


}


}