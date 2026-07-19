import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function POST(
  req: Request
){

  try{


    const formData =
      await req.formData();



    const file =
      formData.get("file") as File;



    if(!file){

      return NextResponse.json(
        {
          message:"Aucune image"
        },
        {
          status:400
        }
      );

    }





    const bytes =
      await file.arrayBuffer();



    const buffer =
      Buffer.from(bytes);





    const filename =
      Date.now() +
      "-" +
      file.name.replaceAll(" ","-");





    const uploadPath =
      path.join(
        process.cwd(),
        "public/uploads",
        filename
      );





    fs.writeFileSync(
      uploadPath,
      buffer
    );






    return NextResponse.json({

      url:
      `/uploads/${filename}`

    });





  }catch(error){


    console.error(error);



    return NextResponse.json(

      {
        message:"Erreur upload"
      },

      {
        status:500
      }

    );


  }


}