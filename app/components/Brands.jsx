"use client";

import React, { useState ,useEffect} from "react";
import {
  Tag,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Building2,
  X,
} from "lucide-react";


export default function Brands() {
  const [brandName, setBrandName] = useState("");
const [logoFile, setLogoFile] = useState(null);
const [logoPreview, setLogoPreview] = useState(null);
 const [brands, setBrands] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

const handleLogoChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Validate size
  if (file.size > 5 * 1024 * 1024) {
    alert("Image must be smaller than 5MB");
    return;
  }

  // Validate type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG, WEBP and SVG images are allowed");
    return;
  }

  setLogoFile(file);

  // Create preview
  const reader = new FileReader();

  reader.onloadend = () => {
    setLogoPreview(reader.result);
  };

  reader.readAsDataURL(file);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!brandName.trim() || !logoFile) return;

  try {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append(
      "name",
      brandName.trim()
    );

    formData.append(
      "logo",
      logoFile
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create brand"
      );
    }

    const newBrand = data.brand;

    // Add returned brand to UI
    setBrands((prev) => [
      newBrand,
      ...prev,
    ]);

    setJustAdded(newBrand.id);

    // Reset form
    setBrandName("");
    setLogoFile(null);
    setLogoPreview(null);

    // Clear New indicator
    setTimeout(() => {
      setJustAdded(null);
    }, 2000);

  } catch (error) {
    console.error("Add brand error:", error);

    alert(
      error.message || "Failed to create brand"
    );

  } finally {
    setIsSubmitting(false);
  }
};

const removeBrand = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete brand"
      );
    }

    // Remove from UI only after successful deletion
    setBrands((prev) =>
      prev.filter((brand) => brand.id !== id)
    );

  } catch (error) {
    console.error("Delete brand error:", error);

    alert(
      error.message || "Failed to delete brand"
    );
  }
};
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

      alert(
        error.message || "Failed to load brands"
      );
    }
  };

  fetchBrands();
}, []);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-white/40 mb-1 tracking-wide">Catalog</p>
        <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Brands
        </h2>
        <p className="text-sm text-white/40 mt-2 max-w-lg">
          Manage manufacturer profiles and brand partners displayed across the
          PenZone catalog.
        </p>
      </div>

      {/* Main grid: Form + List */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ───────── Add Brand Form ───────── */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-7 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#b8935a]/10 border border-[#b8935a]/20">
                <Building2 className="w-5 h-5 text-[#d4b87a]" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90">
                  Add New Brand
                </h3>
                <p className="text-xs text-white/40">
                  Create a brand profile for your products
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Brand Name */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Brand Name
                </label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g., Parker, WaterMan..."
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

              {/* Brand Logo Upload */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Brand Logo
                </label>

                {logoPreview ? (
                  <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 p-1.5 flex items-center justify-center shrink-0">
                        <img
                          src={logoPreview}
                          alt="Brand logo preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white/80 truncate">
                          Logo Selected
                        </p>
                        <p className="text-[10px] text-[#d4b87a] mt-0.5">
                          Ready to upload
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
  setLogoPreview(null);
  setLogoFile(null);
}}
                      className="p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/10 transition-all duration-300"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    className="
                      group relative flex flex-col items-center justify-center
                      rounded-xl border border-dashed border-white/15 bg-white/[0.02]
                      p-6 text-center cursor-pointer
                      hover:border-[#b8935a]/50 hover:bg-white/[0.04]
                      transition-all duration-300
                    "
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform duration-300">
                      <Upload className="w-4 h-4 text-[#d4b87a]" />
                    </div>
                    <p className="text-xs font-medium text-white/80">
                      Click to upload logo
                    </p>
                    <p className="text-[10px] text-white/35 mt-1">
                      PNG, SVG, JPG, or WEBP (Max 5MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !brandName.trim() || !logoPreview}
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
                    Saving…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Brand
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ───────── Brands List ───────── */}
        <div className="xl:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/80 tracking-wide">
                  Brand Directory
                </h3>
                <p className="text-xs text-white/35 mt-0.5">
                  {brands.length} brand{brands.length !== 1 ? "s" : ""} registered
                </p>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {brands.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-5 h-5 text-white/30" />
                  </div>
                  <p className="text-sm text-white/40">No brands added yet</p>
                  <p className="text-xs text-white/25 mt-1">
                    Add your first brand profile on the left
                  </p>
                </div>
              ) : (
                brands.map((brand) => {
                  const isNew = justAdded === brand.id;

                  return (
                    <div
                      key={brand.id}
                      className={`
                        px-6 py-4 flex items-center gap-4
                        transition-all duration-500
                        ${isNew ? "bg-[#b8935a]/10" : "hover:bg-white/[0.02]"}
                      `}
                    >
                      {/* Logo Thumbnail Container */}
                      <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Brand Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white/90 truncate">
                            {brand.name}
                          </p>
                          {isNew && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#d4b87a] bg-[#b8935a]/15 px-1.5 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" />
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/35 mt-0.5">
                          Added {brand.createdAt}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeBrand(brand.id)}
                        className="
                          p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10
                          transition-all duration-300
                        "
                        title="Remove brand"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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