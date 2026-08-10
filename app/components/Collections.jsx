"use client";

import React, { useState } from "react";
import {
  FolderPlus,
  Package,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
  PenTool,
} from "lucide-react";

// Mock master product catalog
const catalogProducts = [
  { id: "p1", name: "Montblanc Meisterstück 149", category: "Fountain Pen" },
  { id: "p2", name: "Pelikan Souverän M800", category: "Fountain Pen" },
  { id: "p3", name: "Lamy 2000 Makrolon", category: "Fountain Pen" },
  { id: "p4", name: "Parker 51 Premium", category: "Ballpoint Pen" },
  { id: "p5", name: "Waterman Carène Glossy", category: "Rollerball Pen" },
  { id: "p6", name: "Pilot Custom 823 Amber", category: "Fountain Pen" },
  { id: "p7", name: "Visconti Homo Sapiens", category: "Fountain Pen" },
  { id: "p8", name: "Cross Townsand Black Lacquer", category: "Ballpoint Pen" },
];

const initialCollections = [
  {
    id: "c1",
    name: "Fountain Pen Flagships",
    productIds: ["p1", "p2", "p3", "p6"],
    createdAt: "2026-07-15",
  },
  {
    id: "c2",
    name: "Executive Ballpoints",
    productIds: ["p4", "p8"],
    createdAt: "2026-08-01",
  },
];

export default function Collections() {
  const [collectionName, setCollectionName] = useState("");
  const [selectedFormProduct, setSelectedFormProduct] = useState("");
  const [formProducts, setFormProducts] = useState([]);
  const [collections, setCollections] = useState(initialCollections);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

  // Accordion state for collection detail view
  const [expandedId, setExpandedId] = useState("c1");

  // State to track individual product selection inside expanded collection
  const [addToExistingProductMap, setAddToExistingProductMap] = useState({});

  // Add product to the form temporary state
  const handleAddProductToForm = (e) => {
    const prodId = e.target.value;
    if (!prodId) return;
    if (!formProducts.includes(prodId)) {
      setFormProducts((prev) => [...prev, prodId]);
    }
    setSelectedFormProduct("");
  };

  // Remove product from form temporary state
  const handleRemoveProductFromForm = (prodId) => {
    setFormProducts((prev) => prev.filter((id) => id !== prodId));
  };

  // Create new collection
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectionName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newCollection = {
        id: Date.now().toString(),
        name: collectionName.trim(),
        productIds: formProducts,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setCollections((prev) => [newCollection, ...prev]);
      setJustAdded(newCollection.id);
      setExpandedId(newCollection.id);
      setCollectionName("");
      setFormProducts([]);
      setIsSubmitting(false);

      setTimeout(() => setJustAdded(null), 2000);
    }, 400);
  };

  // Delete an entire collection
  const deleteCollection = (id) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  // Remove a single product from an existing collection
  const removeProductFromCollection = (collectionId, productId) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          return {
            ...col,
            productIds: col.productIds.filter((id) => id !== productId),
          };
        }
        return col;
      })
    );
  };

  // Add a product to an existing collection
  const handleAddProductToExisting = (collectionId) => {
    const productIdToAdd = addToExistingProductMap[collectionId];
    if (!productIdToAdd) return;

    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId && !col.productIds.includes(productIdToAdd)) {
          return {
            ...col,
            productIds: [...col.productIds, productIdToAdd],
          };
        }
        return col;
      })
    );

    setAddToExistingProductMap((prev) => ({
      ...prev,
      [collectionId]: "",
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-white/40 mb-1 tracking-wide">Catalog</p>
        <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Collections
        </h2>
        <p className="text-sm text-white/40 mt-2 max-w-lg">
          Group products into curated collections (e.g. Fountain Pens, Luxury
          Editions) to highlight featured items across the store.
        </p>
      </div>

      {/* Main grid: Form + Collections List */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ───────── Create Collection Form ───────── */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-7 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#b8935a]/10 border border-[#b8935a]/20">
                <FolderPlus className="w-5 h-5 text-[#d4b87a]" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90">
                  Create Collection
                </h3>
                <p className="text-xs text-white/40">
                  Build a custom group of products
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Collection Name */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Collection Name
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    required
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    placeholder="e.g., Fountain Pen Collection"
                    className="
                      w-full pl-11 pr-4 py-3 rounded-xl
                      bg-white/[0.04] border border-white/10
                      text-sm text-white placeholder:text-white/25
                      focus:outline-none focus:border-[#b8935a]/50 focus:ring-1 focus:ring-[#b8935a]/30
                      transition-all duration-300
                    "
                  />
                </div>
              </div>

              {/* Product Selection Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Select Products
                </label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <select
                    value={selectedFormProduct}
                    onChange={handleAddProductToForm}
                    className="
                      w-full pl-11 pr-10 py-3 rounded-xl appearance-none
                      bg-white/[0.04] border border-white/10
                      text-sm text-white
                      focus:outline-none focus:border-[#b8935a]/50 focus:ring-1 focus:ring-[#b8935a]/30
                      transition-all duration-300 cursor-pointer
                    "
                  >
                    <option value="" className="bg-[#121214] text-white/50">
                      Choose products to add...
                    </option>
                    {catalogProducts.map((prod) => (
                      <option
                        key={prod.id}
                        value={prod.id}
                        disabled={formProducts.includes(prod.id)}
                        className="bg-[#121214] text-white disabled:text-white/20"
                      >
                        {prod.name} ({prod.category})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-white/30" />
                  </div>
                </div>

                {/* Chips of Selected Products for the Form */}
                {formProducts.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formProducts.map((pId) => {
                      const prod = catalogProducts.find((p) => p.id === pId);
                      return (
                        <span
                          key={pId}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#b8935a]/15 text-[#d4b87a] border border-[#b8935a]/20"
                        >
                          <PenTool className="w-3 h-3" />
                          {prod?.name}
                          <button
                            type="button"
                            onClick={() => handleRemoveProductFromForm(pId)}
                            className="hover:text-red-400 transition-colors ml-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !collectionName.trim()}
                className="
                  w-full mt-2 py-3.5 rounded-xl
                  bg-gradient-to-r from-[#b8935a] to-[#9a7a45]
                  text-sm font-medium text-white
                  shadow-lg shadow-[#b8935a]/25
                  hover:shadow-[#b8935a]/40 hover:brightness-105
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Collection
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ───────── Collections List & Details ───────── */}
        <div className="xl:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/80 tracking-wide">
                  All Collections
                </h3>
                <p className="text-xs text-white/35 mt-0.5">
                  {collections.length} collection{collections.length !== 1 ? "s" : ""} active
                </p>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {collections.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-5 h-5 text-white/30" />
                  </div>
                  <p className="text-sm text-white/40">No collections created yet</p>
                  <p className="text-xs text-white/25 mt-1">
                    Create your first collection using the form on the left
                  </p>
                </div>
              ) : (
                collections.map((col) => {
                  const isExpanded = expandedId === col.id;
                  const isNew = justAdded === col.id;
                  const assignedProducts = col.productIds
                    .map((id) => catalogProducts.find((p) => p.id === id))
                    .filter(Boolean);

                  // Products NOT yet in this collection
                  const unassignedProducts = catalogProducts.filter(
                    (p) => !col.productIds.includes(p.id)
                  );

                  return (
                    <div
                      key={col.id}
                      className={`
                        transition-all duration-300
                        ${isNew ? "bg-[#b8935a]/10" : ""}
                      `}
                    >
                      {/* Collection Header Bar */}
                      <div
                        onClick={() => setExpandedId(isExpanded ? null : col.id)}
                        className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <Layers className="w-5 h-5 text-[#d4b87a]" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-white/90 truncate">
                                {col.name}
                              </p>
                              {isNew && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#d4b87a] bg-[#b8935a]/15 px-1.5 py-0.5 rounded">
                                  <CheckCircle2 className="w-3 h-3" />
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/35 mt-0.5">
                              Created {col.createdAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Product count badge */}
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#b8935a]/10 text-[#d4b87a] border border-[#b8935a]/20">
                            {col.productIds.length} Product{col.productIds.length !== 1 ? "s" : ""}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCollection(col.id);
                            }}
                            className="p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                            title="Delete collection"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="text-white/40">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Collection Details / Manage Products Accordion */}
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 bg-black/20 border-t border-white/5 space-y-4">
                          
                          {/* Add Product inline form */}
                          <div className="pt-2">
                            <label className="text-[11px] font-medium text-white/40 uppercase tracking-wider block mb-2">
                              Add Product to this Collection
                            </label>
                            <div className="flex items-center gap-2">
                              <div className="relative flex-1">
                                <select
                                  value={addToExistingProductMap[col.id] || ""}
                                  onChange={(e) =>
                                    setAddToExistingProductMap((prev) => ({
                                      ...prev,
                                      [col.id]: e.target.value,
                                    }))
                                  }
                                  className="
                                    w-full px-3 py-2 rounded-lg appearance-none
                                    bg-white/[0.04] border border-white/10
                                    text-xs text-white
                                    focus:outline-none focus:border-[#b8935a]/50
                                    transition-all cursor-pointer
                                  "
                                >
                                  <option value="" className="bg-[#121214] text-white/50">
                                    Select a product...
                                  </option>
                                  {unassignedProducts.map((p) => (
                                    <option key={p.id} value={p.id} className="bg-[#121214] text-white">
                                      {p.name} ({p.category})
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-white/30 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleAddProductToExisting(col.id)}
                                disabled={!addToExistingProductMap[col.id]}
                                className="
                                  px-3 py-2 rounded-lg
                                  bg-[#b8935a]/20 border border-[#b8935a]/30
                                  text-xs font-medium text-[#d4b87a]
                                  hover:bg-[#b8935a]/30 transition-all duration-300
                                  disabled:opacity-40 disabled:cursor-not-allowed
                                  flex items-center gap-1 shrink-0
                                "
                              >
                                <Plus className="w-3.5 h-3.5" />
                                Add
                              </button>
                            </div>
                          </div>

                          {/* List of Products inside this collection */}
                          <div>
                            <label className="text-[11px] font-medium text-white/40 uppercase tracking-wider block mb-2">
                              Items in Collection ({assignedProducts.length})
                            </label>

                            {assignedProducts.length === 0 ? (
                              <p className="text-xs text-white/30 italic py-2">
                                No products in this collection yet.
                              </p>
                            ) : (
                              <div className="space-y-1.5">
                                {assignedProducts.map((prod) => (
                                  <div
                                    key={prod.id}
                                    className="
                                      flex items-center justify-between
                                      px-3 py-2 rounded-xl
                                      bg-white/[0.02] border border-white/5
                                      hover:bg-white/[0.04] transition-colors
                                    "
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <PenTool className="w-3.5 h-3.5 text-[#d4b87a] shrink-0" />
                                      <span className="text-xs font-medium text-white/80 truncate">
                                        {prod.name}
                                      </span>
                                      <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">
                                        {prod.category}
                                      </span>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeProductFromCollection(col.id, prod.id)
                                      }
                                      className="
                                        p-1 rounded-md text-white/30
                                        hover:text-red-400 hover:bg-red-500/10
                                        transition-all duration-300
                                      "
                                      title="Remove from collection"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}