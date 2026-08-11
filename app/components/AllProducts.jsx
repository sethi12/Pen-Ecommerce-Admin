import React from "react";

export default function AllProducts({ products, onNavigateToAdd, onDeleteProduct }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">All Products</h2>
          <p className="text-xs text-white/40 mt-1">
            Displaying all registered catalog items ({products.length})
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b8935a] to-[#9a7a45] text-xs font-medium text-white shadow-md hover:brightness-105 transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Product List */}
      {products.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm text-white/40">No products available in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col lg:flex-row gap-6 items-start justify-between"
            >
              {/* Media & Key Info */}
              <div className="flex flex-col sm:flex-row gap-5 flex-1">
                {/* Main Cover Image */}
                <div className="w-32 h-32 rounded-xl bg-black/50 border border-white/10 p-2 shrink-0 flex items-center justify-center">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>

                {/* Main Specs */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        item.condition === "fresh"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : item.condition === "sale"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      }`}
                    >
                      {item.condition}
                    </span>
                  </div>

                  <p className="text-xs text-white/50 line-clamp-2">{item.description || "No description."}</p>

                  {/* Taxonomy & Stock Badges */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-white/60 pt-1">
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
                      Brand: <strong className="text-white">{item.brand}</strong>
                    </span>
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
                      Collection: <strong className="text-white">{item.collection}</strong>
                    </span>
                    {item.color && (
                      <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
                        Color: <strong className="text-white">{item.color}</strong>
                      </span>
                    )}
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
                      Stock: <strong className="text-[#d4b87a]">{item.stock} units</strong>
                    </span>
                  </div>

                  {/* Highlights Array Tag Display */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#b8935a]/10 text-[#d4b87a]">
                          • {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Other Gallery Images Preview */}
                  {item.otherImages && item.otherImages.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] text-white/40 mb-1">Gallery Images ({item.otherImages.length}):</p>
                      <div className="flex gap-2">
                        {/* {item.otherImages.map((galImg, gIdx) => (
                          <img
                            key={gIdx}
                            src={galImg}
                            alt="Gallery preview"
                            className="w-10 h-10 object-cover rounded-lg border border-white/10 bg-black/40"
                          />
                        ))} */}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0 gap-4 shrink-0">
                <div className="text-left lg:text-right">
                  <div className="text-xl font-bold text-white">
                    ${item.discountedPrice || item.price}
                  </div>
                  {item.discountedPrice && (
                    <div className="text-xs text-white/40 line-through">${item.price}</div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteProduct(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 hover:bg-red-500/20 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}