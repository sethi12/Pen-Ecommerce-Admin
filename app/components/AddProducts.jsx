import React, { useEffect, useState } from "react";


const collectionOptions = ["Fountain Pen Flagships", "Executive Ballpoints", "Vintage Treasures", "Limited Edition 2026", "Daily Writers"];

export default function AddProduct({ onNavigateToAll, onAddProduct }) {
  // Form Field States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
const [brand, setBrand] = useState("");

const [brands, setBrands] = useState([]);
const [isLoadingBrands, setIsLoadingBrands] = useState(true);

const [collection, setCollection] = useState("");
const [collections, setCollections] = useState([]);
const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [condition, setCondition] = useState("fresh"); // 'fresh' | 'sale' | 'preowned'
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");

  // Array of Highlights
  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  // File & Preview States
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [otherImageFiles, setOtherImageFiles] = useState([]);
  const [otherImagePreviews, setOtherImagePreviews] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Highlight Handlers
  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setHighlights((prev) => [...prev, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const handleRemoveHighlight = (index) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // Main Image Upload Handler
  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setMainImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Multiple Images Upload Handler
  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setOtherImageFiles((prev) => [...prev, ...files]);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setOtherImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveOtherImage = (index) => {
    setOtherImageFiles((prev) => prev.filter((_, i) => i !== index));
    setOtherImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // FormData Submission Handler
 const handleSubmit = async (e) => {
  e.preventDefault();

if (
  !name.trim() ||
  !price ||
  !mainImageFile ||
  !brand ||
  !collection
) {
  return;
}

  try {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountedPrice", discountedPrice);
    formData.append("brand", brand);
    formData.append("collection", collection);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("stock", stock || "0");

    formData.append(
      "highlights",
      JSON.stringify(highlights)
    );

    // Main image
    formData.append(
      "mainImage",
      mainImageFile
    );

    // Gallery images
    otherImageFiles.forEach((file) => {
      formData.append(
        "otherImages",
        file
      );
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create product"
      );
    }

    console.log(
      "Product created:",
      data.product
    );

    // Reset form
    setName("");
    setDescription("");
    setPrice("");
    setDiscountedPrice("");
  setBrand(
  brands.length > 0
    ? brands[0].id
    : ""
);

setCollection(
  collections.length > 0
    ? collections[0].id
    : ""
);
    setCondition("fresh");
    setColor("");
    setStock("");

    setHighlights([]);
    setHighlightInput("");

    setMainImageFile(null);
    setMainImagePreview(null);

    setOtherImageFiles([]);
    setOtherImagePreviews([]);

    // Notify parent if you're still using it
    if (onAddProduct) {
      onAddProduct(data.product);
    }

    // Navigate to product list
    onNavigateToAll();

  } catch (error) {
    console.error(
      "Create product error:",
      error
    );

    alert(
      error.message ||
        "Failed to create product"
    );

  } finally {
    setIsSubmitting(false);
  }
};
useEffect(() => {
  const fetchBrands = async () => {
    try {
      setIsLoadingBrands(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/brands`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch brands"
        );
      }

      const fetchedBrands = data.brands || [];
      
      setBrands(fetchedBrands);

      // Automatically select first brand
      if (fetchedBrands.length > 0) {
        setBrand(fetchedBrands[0].id);
      }

    } catch (error) {
      console.error("Fetch brands error:", error);

      alert(
        error.message || "Failed to load brands"
      );

    } finally {
      setIsLoadingBrands(false);
    }
  };

  fetchBrands();
}, []);
useEffect(() => {
  const fetchCollections = async () => {
    try {
      setIsLoadingCollections(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collections`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch collections"
        );
      }

      const fetchedCollections =
        data.collections || [];

      setCollections(fetchedCollections);

      // Automatically select first collection
      if (fetchedCollections.length > 0) {
        setCollection(fetchedCollections[0].id);
      }

    } catch (error) {
      console.error(
        "Fetch collections error:",
        error
      );

      alert(
        error.message ||
          "Failed to load collections"
      );
    } finally {
      setIsLoadingCollections(false);
    }
  };

  fetchCollections();
}, []);
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Add New Product</h2>
          <p className="text-xs text-white/40 mt-1">Fill out all product specifications and media.</p>
        </div>
        <button
          type="button"
          onClick={onNavigateToAll}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-all"
        >
          All Products →
        </button>
      </div>

      {/* Form Setup */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section: Details & Media */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-sm font-medium text-[#d4b87a] uppercase tracking-wider">General Information</h3>

            {/* Product Name */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meisterstück 149 Fountain Pen"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:border-[#b8935a]"
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Product Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed description..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:border-[#b8935a] resize-none"
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-sm font-medium text-[#d4b87a] uppercase tracking-wider">Pricing & Stock</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-white/60 mb-1">Price ($) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="850.00"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:border-[#b8935a]"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Discounted Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  placeholder="780.00"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:border-[#b8935a]"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Stock (Numbers Only) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:border-[#b8935a]"
                />
              </div>
            </div>
          </div>

          {/* Image Uploads */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-sm font-medium text-[#d4b87a] uppercase tracking-wider">Product Media</h3>

            {/* Single Main Image */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Main Cover Image (Single) *</label>
              {mainImagePreview ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <img src={mainImagePreview} alt="Main" className="w-14 h-14 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setMainImageFile(null);
                      setMainImagePreview(null);
                    }}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleMainImageChange}
                  className="block w-full text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-[#b8935a]/20 file:text-[#d4b87a] hover:file:bg-[#b8935a]/30"
                />
              )}
            </div>

            {/* Multiple Other Images */}
            <div className="pt-2">
              <label className="block text-xs text-white/60 mb-1">Other Gallery Images (Multiple)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleOtherImagesChange}
                className="block w-full text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
              />

              {otherImagePreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {otherImagePreviews.map((img, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/10">
                      <img src={img} alt="Gallery" className="w-full h-16 object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveOtherImage(idx)}
                        className="absolute top-1 right-1 bg-black/80 text-red-400 text-[10px] px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Attributes & Submit */}
        <div className="space-y-6">
          
          {/* Taxonomy & Condition */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-sm font-medium text-[#d4b87a] uppercase tracking-wider">Classification</h3>

            {/* Brand Dropdown */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Brand Dropdown</label>
           <select
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
  disabled={isLoadingBrands || brands.length === 0}
  className="w-full px-4 py-2.5 rounded-xl bg-[#18181b] border border-white/10 text-sm text-white focus:outline-none disabled:opacity-50"
>
  {isLoadingBrands ? (
    <option value="">
      Loading brands...
    </option>
  ) : brands.length === 0 ? (
    <option value="">
      No brands available
    </option>
  ) : (
    <>
      <option value="">
        Select a brand
      </option>

      {brands.map((brandItem) => (
        <option
          key={brandItem.id}
          value={brandItem.id}
        >
          {brandItem.name}
        </option>
      ))}
    </>
  )}
</select>
            </div>

            {/* Collection Dropdown */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Collection Dropdown</label>
      <select
  value={collection}
  onChange={(e) =>
    setCollection(e.target.value)
  }
  disabled={
    isLoadingCollections ||
    collections.length === 0
  }
  className="
    w-full px-4 py-2.5 rounded-xl
    bg-[#18181b]
    border border-white/10
    text-sm text-white
    focus:outline-none
    disabled:opacity-50
  "
>
  {isLoadingCollections ? (
    <option value="">
      Loading collections...
    </option>
  ) : collections.length === 0 ? (
    <option value="">
      No collections available
    </option>
  ) : (
    <>
      <option value="">
        Select a collection
      </option>

      {collections.map((collectionItem) => (
        <option
          key={collectionItem.id}
          value={collectionItem.id}
        >
          {collectionItem.name}
        </option>
      ))}
    </>
  )}
</select>
            </div>

            {/* Three Condition Radio Buttons */}
            <div>
              <label className="block text-xs text-white/60 mb-2">Condition Tag</label>
              <div className="grid grid-cols-3 gap-2">
                {["fresh", "sale", "preowned"].map((type) => (
                  <label
                    key={type}
                    className={`py-2 px-3 text-center rounded-xl border text-xs capitalize cursor-pointer transition-all ${
                      condition === type
                        ? "bg-[#b8935a]/20 border-[#b8935a] text-[#d4b87a]"
                        : "bg-white/[0.03] border-white/10 text-white/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={type}
                      checked={condition === type}
                      onChange={(e) => setCondition(e.target.value)}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Color & Array Highlights */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-sm font-medium text-[#d4b87a] uppercase tracking-wider">Attributes</h3>

            {/* Color */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Color / Finish</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Jet Black / Gold"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white focus:outline-none focus:border-[#b8935a]"
              />
            </div>

            {/* Array Highlights */}
            <div>
              <label className="block text-xs text-white/60 mb-1">Highlights (Array)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHighlight())}
                  placeholder="e.g. 18K Gold Nib"
                  className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="px-3 py-2 rounded-xl bg-[#b8935a]/20 border border-[#b8935a]/30 text-xs text-[#d4b87a]"
                >
                  + Add
                </button>
              </div>

              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {highlights.map((h, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-white/80 flex items-center gap-1.5">
                      {h}
                      <button type="button" onClick={() => handleRemoveHighlight(i)} className="text-red-400">✕</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b8935a] to-[#9a7a45] text-sm font-medium text-white shadow-lg hover:brightness-105 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Submitting FormData..." : "Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
}