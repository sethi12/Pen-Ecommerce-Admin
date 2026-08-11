import React, { useState } from "react";
import AddProduct from "./AddProducts";
import AllProducts from "./AllProducts";

const initialProducts = [
  {
    id: "prod-1",
    name: "Montblanc Meisterstück 149 Gold Trim",
    description: "Piston fountain pen with 18K gold nib, hand-crafted rhodium-coated inlay.",
    price: "850",
    discountedPrice: "780",
    brand: "Montblanc",
    collection: "Fountain Pen Flagships",
    condition: "fresh",
    color: "Jet Black / Gold",
    highlights: ["18K Gold Nib", "Piston Filler", "Handcrafted in Germany"],
    stock: "12",
    mainImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&auto=format&fit=crop&q=80",
    otherImages: [
      "https://images.unsplash.com/photo-1568805610918-f3a19512008d?w=300&auto=format&fit=crop&q=80"
    ]
  }
];

export default function Products() {
  const [currentPage, setCurrentPage] = useState("add"); // 'add' | 'all'
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 font-sans">
      {currentPage === "add" ? (
        <AddProduct
          onNavigateToAll={() => setCurrentPage("all")}
          onAddProduct={handleAddProduct}
        />
      ) : (
        <AllProducts
          products={products}
          onNavigateToAdd={() => setCurrentPage("add")}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
}