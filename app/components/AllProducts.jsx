"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  X,
  Package,
  Image as ImageIcon,
  Filter,
} from "lucide-react";

const PRODUCTS_PER_PAGE = 10;

export default function AllProducts({
  products = [],
  onNavigateToAdd,
  onNavigateToEdit,
  onDeleteProduct,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCollection, setSelectedCollection] =
    useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [collections, setCollections] = useState([]);
  /*
   * --------------------------------------------------
   * UNIQUE BRANDS
   * --------------------------------------------------
   */
  useEffect(() => {
  const fetchBrands = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/brands`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch brands"
        );
      }

      setBrands(data.brands || []);
    } catch (error) {
      console.error("Fetch brands error:", error);
    }
  };

  fetchBrands();
}, []);

useEffect(() => {
  const fetchCollections = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collections`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch collections"
        );
      }

      setCollections(data.collections || []);
    } catch (error) {
      console.error(
        "Fetch collections error:",
        error
      );
    }
  };

  fetchCollections();
}, []);
  /*
   * --------------------------------------------------
   * UNIQUE COLLECTIONS
   * --------------------------------------------------
   */

const collectionMap = useMemo(() => {
  return new Map(
    collections.map((collection) => [
      collection.id,
      collection.name,
    ])
  );
}, [collections]);


  /*
   * --------------------------------------------------
   * FILTER PRODUCTS
   * --------------------------------------------------
   */

const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const brandMatches =
      selectedBrand === "all" ||
      product.brand === selectedBrand;

    const collectionMatches =
      selectedCollection === "all" ||
      product.collection === selectedCollection;

    return brandMatches && collectionMatches;
  });
}, [
  products,
  selectedBrand,
  selectedCollection,
]);


  /*
   * --------------------------------------------------
   * PAGINATION
   * --------------------------------------------------
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / PRODUCTS_PER_PAGE
    )
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [
    filteredProducts,
    currentPage,
  ]);


  /*
   * Reset page whenever filters change
   */

  const handleBrandFilter = (value) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  };

  const handleCollectionFilter = (value) => {
    setSelectedCollection(value);
    setCurrentPage(1);
  };


  /*
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

const handleDelete = async (e, productId) => {
  e.stopPropagation();

  console.log("Deleting product ID:", productId);

  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log("Delete response:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete product"
      );
      
    }

    // Remove from UI after successful deletion
    if (onDeleteProduct) {
      onDeleteProduct(productId);
    }

  } catch (error) {
    console.error("Delete product error:", error);
    alert(error.message || "Failed to delete product");
  }
};

  /*
   * --------------------------------------------------
   * EDIT
   * --------------------------------------------------
   */

  const handleEdit = (e, product) => {
    e.stopPropagation();

    if (onNavigateToEdit) {
      onNavigateToEdit(product);
    }
  };

const brandMap = useMemo(() => {
  return new Map(
    brands.map((brand) => [
      brand.id,
      brand.name,
    ])
  );
}, [brands]);

  /*
   * --------------------------------------------------
   * EMPTY STATE
   * --------------------------------------------------
   */

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              All Products
            </h2>

            <p className="text-xs text-white/40 mt-1">
              Displaying all registered catalog items
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToAdd}
            className="
              px-4 py-2.5 rounded-xl
              bg-gradient-to-r from-[#b8935a] to-[#9a7a45]
              text-xs font-medium text-white
              shadow-md hover:brightness-105
              transition-all
            "
          >
            + Add Product
          </button>
        </div>

        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <Package className="w-8 h-8 mx-auto text-white/20 mb-4" />

          <p className="text-sm text-white/40">
            No products available in database.
          </p>

          <button
            onClick={onNavigateToAdd}
            className="text-xs text-[#d4b87a] mt-3 hover:underline"
          >
            Add your first product
          </button>
        </div>
      </div>
    );
  }


  /*
   * --------------------------------------------------
   * MAIN UI
   * --------------------------------------------------
   */

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">

        <div>
          <h2 className="text-2xl font-semibold text-white">
            All Products
          </h2>

          <p className="text-xs text-white/40 mt-1">
            Showing {filteredProducts.length} of{" "}
            {products.length} products
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToAdd}
          className="
            px-4 py-2.5 rounded-xl
            bg-gradient-to-r from-[#b8935a] to-[#9a7a45]
            text-xs font-medium text-white
            shadow-md hover:brightness-105
            transition-all
          "
        >
          + Add Product
        </button>

      </div>


      {/* ================================================
          FILTERS
      ================================================= */}

      <div
        className="
          p-4 rounded-2xl
          bg-white/[0.03]
          border border-white/10
          flex flex-col sm:flex-row
          gap-3
        "
      >

        <div className="flex items-center gap-2 text-white/40">
          <Filter className="w-4 h-4" />

          <span className="text-xs">
            Filters
          </span>
        </div>


        {/* Brand */}

        <select
          value={selectedBrand}
          onChange={(e) =>
            handleBrandFilter(e.target.value)
          }
          className="
            flex-1
            px-3 py-2.5
            rounded-xl
            bg-[#18181b]
            border border-white/10
            text-xs text-white
            focus:outline-none
          "
        >
          <option value="all">
            All Brands
          </option>

          {brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>


        {/* Collection */}

        <select
          value={selectedCollection}
          onChange={(e) =>
            handleCollectionFilter(e.target.value)
          }
          className="
            flex-1
            px-3 py-2.5
            rounded-xl
            bg-[#18181b]
            border border-white/10
            text-xs text-white
            focus:outline-none
          "
        >
          <option value="all">
            All Collections
          </option>

{collections.map((collection) => (
  <option
    key={collection.id}
    value={collection.id}
  >
    {collection.name}
  </option>
))}
        </select>


        {/* Clear filters */}

        {(selectedBrand !== "all" ||
          selectedCollection !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSelectedBrand("all");
              setSelectedCollection("all");
              setCurrentPage(1);
            }}
            className="
              px-4 py-2
              rounded-xl
              border border-white/10
              text-xs text-white/50
              hover:text-white
              hover:bg-white/5
              transition-all
            "
          >
            Clear
          </button>
        )}

      </div>


      {/* ================================================
          NO FILTER RESULTS
      ================================================= */}

      {filteredProducts.length === 0 ? (

        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">

          <Package className="w-7 h-7 mx-auto text-white/20 mb-3" />

          <p className="text-sm text-white/40">
            No products match your filters.
          </p>

          <button
            onClick={() => {
              setSelectedBrand("all");
              setSelectedCollection("all");
              setCurrentPage(1);
            }}
            className="text-xs text-[#d4b87a] mt-3 hover:underline"
          >
            Clear filters
          </button>

        </div>

      ) : (

        <>
          {/* ============================================
              PRODUCT LIST
          ============================================ */}

          <div className="grid grid-cols-1 gap-5">

            {paginatedProducts.map((item) => (

              <div
                key={item.id}
                onClick={() =>
                  setSelectedProduct(item)
                }
                className="
                  p-5 sm:p-6
                  rounded-2xl
                  bg-white/[0.03]
                  border border-white/10
                  hover:bg-white/[0.05]
                  hover:border-white/15
                  transition-all
                  cursor-pointer
                  group
                "
              >

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                  {/* ==================================
                      IMAGE
                  ================================== */}

                  <div
                    className="
                      w-full sm:w-32
                      h-32
                      rounded-xl
                      bg-black/50
                      border border-white/10
                      p-2
                      shrink-0
                      flex items-center justify-center
                      overflow-hidden
                    "
                  >

                    {item.mainImage?.url ? (
                      <img
                        src={item.mainImage.url}
                        alt={item.name}
                        className="
                          max-h-full
                          max-w-full
                          object-contain
                          rounded-lg
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <ImageIcon className="w-7 h-7 text-white/20" />
                    )}

                  </div>


                  {/* ==================================
                      PRODUCT INFO
                  ================================== */}

                  <div className="flex-1 min-w-0 space-y-2">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>

                      <span
                        className={`
                          text-[10px]
                          font-bold
                          px-2 py-0.5
                          rounded
                          uppercase
                          tracking-wider
                          ${
                            item.condition === "fresh"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : item.condition === "sale"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          }
                        `}
                      >
                        {item.condition}
                      </span>

                    </div>


                    <p className="text-xs text-white/50 line-clamp-2">
                      {item.description ||
                        "No description."}
                    </p>


                    {/* TAXONOMY */}

                    <div className="flex flex-wrap gap-2 pt-1">

    <span className="bg-white/5 px-2 py-1 rounded border border-white/5 text-[11px] text-white/60">
  Brand:{" "}
  <strong className="text-white">
    {brands.find(
      (brand) => brand.id === item.brand
    )?.name || "Unknown"}
  </strong>
</span>

                      <span className="bg-white/5 px-2 py-1 rounded border border-white/5 text-[11px] text-white/60">
                        Collection:{" "}
                        <strong className="text-white">
                          {item.collection ||
                            "None"}
                        </strong>
                      </span>

                      {item.color && (
                        <span className="bg-white/5 px-2 py-1 rounded border border-white/5 text-[11px] text-white/60">
                          Color:{" "}
                          <strong className="text-white">
                            {item.color}
                          </strong>
                        </span>
                      )}

                      <span className="bg-white/5 px-2 py-1 rounded border border-white/5 text-[11px] text-white/60">
                        Stock:{" "}
                        <strong className="text-[#d4b87a]">
                          {item.stock} units
                        </strong>
                      </span>

                    </div>


                    {/* HIGHLIGHTS */}

                    {item.highlights?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">

                        {item.highlights
                          .slice(0, 4)
                          .map((highlight, index) => (
                            <span
                              key={index}
                              className="
                                text-[10px]
                                px-2 py-0.5
                                rounded
                                bg-[#b8935a]/10
                                text-[#d4b87a]
                              "
                            >
                              • {highlight}
                            </span>
                          ))}

                        {item.highlights.length > 4 && (
                          <span className="text-[10px] text-white/30">
                            +{item.highlights.length - 4}
                            {" "}more
                          </span>
                        )}

                      </div>
                    )}

                  </div>


                  {/* ==================================
                      PRICE + ACTIONS
                  ================================== */}

                  <div
                    className="
                      w-full
                      lg:w-auto
                      flex
                      lg:flex-col
                      items-center
                      lg:items-end
                      justify-between
                      gap-4
                      border-t
                      lg:border-t-0
                      border-white/10
                      pt-4
                      lg:pt-0
                      shrink-0
                    "
                  >

                    <div className="text-left lg:text-right">

                      <div className="text-xl font-bold text-white">
                        ₹
                        {Number(
                          item.discountedPrice ||
                            item.price ||
                            0
                        ).toLocaleString("en-IN")}
                      </div>

                      {item.discountedPrice && (
                        <div className="text-xs text-white/40 line-through">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </div>
                      )}

                    </div>


                    {/* ACTION BUTTONS */}

                    <div className="flex items-center gap-2">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={(e) =>
                          handleEdit(e, item)
                        }
                        className="
                          p-2.5
                          rounded-xl
                          bg-white/5
                          border border-white/10
                          text-white/40
                          hover:text-[#d4b87a]
                          hover:bg-[#b8935a]/10
                          hover:border-[#b8935a]/20
                          transition-all
                        "
                        title="Edit product"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={(e) =>
                          handleDelete(
                            e,
                            item.id
                          )
                        }
                        className="
                          p-2.5
                          rounded-xl
                          bg-white/5
                          border border-white/10
                          text-white/40
                          hover:text-red-400
                          hover:bg-red-500/10
                          hover:border-red-500/20
                          transition-all
                        "
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>

                </div>

                {/* Click hint */}

                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view full product details
                </div>

              </div>

            ))}

          </div>


          {/* ============================================
              PAGINATION
          ============================================ */}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">

              <p className="text-xs text-white/30">
                Page {currentPage} of {totalPages}
              </p>


              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(1, page - 1)
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    border border-white/10
                    text-white/40
                    hover:text-white
                    hover:bg-white/5
                    disabled:opacity-20
                    disabled:cursor-not-allowed
                  "
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>


                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    className={`
                      min-w-8
                      h-8
                      rounded-lg
                      text-xs
                      transition-all
                      ${
                        currentPage === page
                          ? "bg-[#b8935a] text-white"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {page}
                  </button>

                ))}


                <button
                  type="button"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    border border-white/10
                    text-white/40
                    hover:text-white
                    hover:bg-white/5
                    disabled:opacity-20
                    disabled:cursor-not-allowed
                  "
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          )}

        </>
      )}


      {/* ================================================
          PRODUCT DETAILS MODAL
      ================================================= */}

      {selectedProduct && (
        <div
          className="
            fixed inset-0
            z-50
            bg-black/70
            backdrop-blur-md
            flex items-center justify-center
            p-4
          "
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="
              w-full
              max-w-4xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              bg-[#111113]
              border border-white/10
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#111113]/95 backdrop-blur border-b border-white/10">

              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30">
                  Product Details
                </p>

                <h3 className="text-lg font-semibold text-white mt-1">
                  {selectedProduct.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="
                  p-2
                  rounded-xl
                  text-white/40
                  hover:text-white
                  hover:bg-white/5
                "
              >
                <X className="w-5 h-5" />
              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="p-6 space-y-8">

              {/* IMAGES */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* MAIN IMAGE */}

                <div
                  className="
                    aspect-square
                    rounded-2xl
                    bg-black/50
                    border border-white/10
                    p-5
                    flex items-center justify-center
                  "
                >
                  {selectedProduct.mainImage?.url ? (
                    <img
                      src={
                        selectedProduct
                          .mainImage.url
                      }
                      alt={
                        selectedProduct.name
                      }
                      className="
                        max-w-full
                        max-h-full
                        object-contain
                      "
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-white/20" />
                  )}
                </div>


                {/* GALLERY */}

                <div>

                  <p className="text-xs text-white/40 mb-3">
                    Gallery Images
                  </p>

                  {selectedProduct.otherImages
                    ?.length > 0 ? (

                    <div className="grid grid-cols-3 gap-2">

                      {selectedProduct.otherImages.map(
                        (image, index) => (
                          <div
                            key={index}
                            className="
                              aspect-square
                              rounded-xl
                              overflow-hidden
                              bg-black/50
                              border border-white/10
                            "
                          >
                            <img
                              src={image.url}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="
                                w-full
                                h-full
                                object-cover
                              "
                            />
                          </div>
                        )
                      )}

                    </div>

                  ) : (

                    <div className="text-xs text-white/25">
                      No gallery images.
                    </div>

                  )}

                </div>

              </div>


              {/* BASIC INFORMATION */}

              <div>

                <p className="text-xs uppercase tracking-widest text-white/30 mb-4">
                  Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <DetailItem
                    label="Product ID"
                    value={selectedProduct.id}
                  />

                <DetailItem
  label="Brand"
  value={
    brandMap.get(selectedProduct.brand) ||
    "—"
  }
/>

                  <DetailItem
                    label="Collection"
                    value={
                      selectedProduct.collection ||
                      "—"
                    }
                  />

                  <DetailItem
                    label="Condition"
                    value={
                      selectedProduct.condition ||
                      "—"
                    }
                  />

                  <DetailItem
                    label="Color"
                    value={
                      selectedProduct.color ||
                      "—"
                    }
                  />

                  <DetailItem
                    label="Stock"
                    value={`${selectedProduct.stock || 0} units`}
                  />

                  <DetailItem
                    label="Price"
                    value={`₹${Number(
                      selectedProduct.price || 0
                    ).toLocaleString("en-IN")}`}
                  />

                  <DetailItem
                    label="Discounted Price"
                    value={
                      selectedProduct
                        .discountedPrice
                        ? `₹${Number(
                            selectedProduct.discountedPrice
                          ).toLocaleString(
                            "en-IN"
                          )}`
                        : "—"
                    }
                  />

                </div>

              </div>


              {/* DESCRIPTION */}

              <div>

                <p className="text-xs uppercase tracking-widest text-white/30 mb-3">
                  Description
                </p>

                <p className="text-sm leading-7 text-white/60">
                  {selectedProduct.description ||
                    "No description available."}
                </p>

              </div>


              {/* HIGHLIGHTS */}

              <div>

                <p className="text-xs uppercase tracking-widest text-white/30 mb-3">
                  Highlights
                </p>

                {selectedProduct.highlights
                  ?.length > 0 ? (

                  <div className="flex flex-wrap gap-2">

                    {selectedProduct.highlights.map(
                      (highlight, index) => (
                        <span
                          key={index}
                          className="
                            px-3 py-1.5
                            rounded-lg
                            bg-[#b8935a]/10
                            border border-[#b8935a]/20
                            text-xs
                            text-[#d4b87a]
                          "
                        >
                          {highlight}
                        </span>
                      )
                    )}

                  </div>

                ) : (
                  <p className="text-xs text-white/25">
                    No highlights added.
                  </p>
                )}

              </div>


              {/* DATES */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <DetailItem
                  label="Created"
                  value={
                    selectedProduct.createdAt
                      ? new Date(
                          selectedProduct.createdAt
                        ).toLocaleString()
                      : "—"
                  }
                />

                <DetailItem
                  label="Last Updated"
                  value={
                    selectedProduct.updatedAt
                      ? new Date(
                          selectedProduct.updatedAt
                        ).toLocaleString()
                      : "—"
                  }
                />

              </div>


              {/* ACTIONS */}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">

                <button
                  type="button"
                  onClick={(e) =>
                    handleEdit(
                      e,
                      selectedProduct
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4 py-2.5
                    rounded-xl
                    bg-[#b8935a]/10
                    border border-[#b8935a]/20
                    text-xs
                    text-[#d4b87a]
                    hover:bg-[#b8935a]/20
                  "
                >
                  <Pencil className="w-4 h-4" />
                  Edit Product
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    handleDelete(
                      e,
                      selectedProduct.id
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4 py-2.5
                    rounded-xl
                    bg-red-500/10
                    border border-red-500/20
                    text-xs
                    text-red-400
                    hover:bg-red-500/20
                  "
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Product
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}


/*
 * ----------------------------------------------------
 * DETAIL ITEM
 * ----------------------------------------------------
 */

function DetailItem({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
      <p className="text-[10px] uppercase tracking-wider text-white/25">
        {label}
      </p>

      <p className="text-xs text-white/70 mt-1 break-all">
        {value}
      </p>
    </div>
  );
}