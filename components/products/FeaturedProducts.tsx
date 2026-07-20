"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";

import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SortProducts from "./SortProducts";
import Pagination from "./Pagination";


export default function FeaturedProducts() {


  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  const [category, setCategory] = useState("Toutes");

  const [maxPrice, setMaxPrice] = useState(2000);

  const [sort, setSort] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);



  const productsPerPage = 4;



  const categories = [
    "Toutes",
    "Chaussures",
    "Ordinateurs",
    "Montres",
    "Audio",
    "Mobilier",
    "Accessoires",
    "Téléphones",
  ];





  useEffect(() => {


    async function loadProducts() {


      try {


        const res = await fetch("/api/products");


        const data = await res.json();



        setProducts(

          Array.isArray(data)

            ? data

            : data.products || []

        );



      } catch (error) {


        console.error(
          "Erreur lors du chargement des produits :",
          error
        );


      }


    }



    loadProducts();



  }, []);







  const productList = Array.isArray(products)

    ? products

    : [];







  const filteredProducts = productList

    .filter((product) => {



      const matchesSearch =

        product.name

          .toLowerCase()

          .includes(
            search.toLowerCase()
          );




      const matchesCategory =

        category === "Toutes" ||

       product.category.name === category





      const matchesPrice =

        product.price <= maxPrice;





      return (

        matchesSearch &&

        matchesCategory &&

        matchesPrice

      );



    })





    .sort((a, b) => {


      switch(sort){


        case "price-asc":

          return a.price - b.price;



        case "price-desc":

          return b.price - a.price;



        case "name-asc":

          return a.name.localeCompare(b.name);



        case "name-desc":

          return b.name.localeCompare(a.name);



        default:

          return 0;


      }


    });







  const totalPages = Math.ceil(

    filteredProducts.length /

    productsPerPage

  );





  const indexOfLastProduct =

    currentPage * productsPerPage;




  const indexOfFirstProduct =

    indexOfLastProduct -

    productsPerPage;





  const currentProducts =

    filteredProducts.slice(

      indexOfFirstProduct,

      indexOfLastProduct

    );







  return (


    <div>


      <SearchBar

        search={search}

        setSearch={(value)=>{


          setSearch(value);

          setCurrentPage(1);


        }}

      />





      <CategoryFilter

        categories={categories}

        selectedCategory={category}

        setSelectedCategory={(value)=>{


          setCategory(value);

          setCurrentPage(1);


        }}

      />






      <PriceFilter

        maxPrice={maxPrice}

        setMaxPrice={(value)=>{


          setMaxPrice(value);

          setCurrentPage(1);


        }}

      />






      <SortProducts

        sort={sort}

        setSort={setSort}

      />







      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">


        {currentProducts.length > 0 ? (


          currentProducts.map((product)=>(


            <ProductCard

              key={product.id}

              product={product}

            />


          ))



        ) : (


          <p className="col-span-full text-center text-gray-500">

            Aucun produit trouvé.

          </p>


        )}



      </div>







      <Pagination

        currentPage={currentPage}

        totalPages={totalPages}

        setCurrentPage={setCurrentPage}

      />



    </div>


  );


}