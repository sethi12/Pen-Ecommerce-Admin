"use client";

import React, { useEffect, useState } from "react";
import AddProduct from "./AddProducts";
import AllProducts from "./AllProducts";

export default function Products() {
  const [currentPage, setCurrentPage] = useState("add");
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  /*
   * --------------------------------------------------
   * FETCH PRODUCTS
   * --------------------------------------------------
   */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error(
          "Fetch products error:",
          error
        );

        alert(
          error.message ||
            "Failed to load products"
        );
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);


  /*
   * --------------------------------------------------
   * ADD PRODUCT
   * --------------------------------------------------
   */

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [
      newProduct,
      ...prev,
    ]);

    // Go to product list after adding
    setCurrentPage("all");
  };


  /*
   * --------------------------------------------------
   * DELETE PRODUCT
   * --------------------------------------------------
   */

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete product"
        );
      }

      // Remove only after backend deletion succeeds
      setProducts((prev) =>
        prev.filter(
          (product) => product.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete product"
      );
    }
  };


  /*
   * --------------------------------------------------
   * EDIT PRODUCT
   * --------------------------------------------------
   *
   * We'll connect this when EditProduct.jsx
   * is created.
   */

  const handleEditProduct = (product) => {
    console.log(
      "Edit product:",
      product
    );

    // Later:
    // setSelectedProduct(product);
    // setCurrentPage("edit");
  };


  /*
   * --------------------------------------------------
   * LOADING
   * --------------------------------------------------
   */

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 font-sans flex items-center justify-center">

        <div className="text-center">

          <div
            className="
              w-7 h-7
              mx-auto
              border-2
              border-white/10
              border-t-[#b8935a]
              rounded-full
              animate-spin
            "
          />

          <p className="text-xs text-white/40 mt-4">
            Loading products...
          </p>

        </div>

      </div>
    );
  }


  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 font-sans">

      {currentPage === "add" ? (

        <AddProduct
          onNavigateToAll={() =>
            setCurrentPage("all")
          }
          onAddProduct={
            handleAddProduct
          }
        />

      ) : (

        <AllProducts
          products={products}

          onNavigateToAdd={() =>
            setCurrentPage("add")
          }

          onDeleteProduct={
            handleDeleteProduct
          }

          onNavigateToEdit={
            handleEditProduct
          }
        />

      )}

    </div>
  );
}