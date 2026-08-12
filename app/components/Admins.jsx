"use client";

import React, { useState ,useEffect} from "react";
import {
  Mail,
  Lock,
  Shield,
  UserPlus,
  Trash2,
  Crown,
  Eye,
  Pencil,
  CheckCircle2,
} from "lucide-react";

const roleConfig = {
  owner: {
    label: "Owner",
    icon: Crown,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  editor: {
    label: "Editor",
    icon: Pencil,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  viewer: {
    label: "Viewer",
    icon: Eye,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
};



export default function Admins() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
 const [admins, setAdmins] = useState([]);
 const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) return;

  try {
    setIsSubmitting(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admins`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add admin");
    }

    const newAdmin = data.admin;

    // Add the admin returned by Firestore
    setAdmins((prev) => [newAdmin, ...prev]);

    // Show "New" indicator
    setJustAdded(newAdmin.id);

    // Reset form
    setEmail("");
    setPassword("");
    setRole("viewer");

    setTimeout(() => {
      setJustAdded(null);
    }, 2000);
  } catch (error) {
    console.error("Add admin error:", error);

    alert(error.message || "Failed to add admin");
  } finally {
    setIsSubmitting(false);
  }
};
useEffect(() => {
  const fetchAdmins = async () => {
    try {
      setIsLoadingAdmins(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admins`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch admins"
        );
      }

      setAdmins(data.admins || []);

    } catch (error) {
      console.error("Fetch admins error:", error);

      alert(
        error.message || "Failed to load admins"
      );

    } finally {
      setIsLoadingAdmins(false);
    }
  };

  fetchAdmins();
}, []);

const removeAdmin = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admins/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete admin");
    }

    // Remove from UI only after successful database deletion
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));

  } catch (error) {
    console.error("Delete admin error:", error);

    alert(error.message || "Failed to delete admin");
  }
};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-white/40 mb-1 tracking-wide">Management</p>
        <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Admins
        </h2>
        <p className="text-sm text-white/40 mt-2 max-w-lg">
          Invite team members and assign roles. Owners have full control, Editors
          can modify content, Viewers can only observe.
        </p>
      </div>

      {/* Main grid: Form + List */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ───────── Add Admin Form ───────── */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-7 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#b8935a]/10 border border-[#b8935a]/20">
                <UserPlus className="w-5 h-5 text-[#d4b87a]" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90">
                  Add New Admin
                </h3>
                <p className="text-xs text-white/40">
                  Grant access to the dashboard
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@penzone.in"
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

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              {/* Role Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">
                  Role
                </label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="
                      w-full pl-11 pr-10 py-3 rounded-xl appearance-none
                      bg-white/[0.04] border border-white/10
                      text-sm text-white
                      focus:outline-none focus:border-[#b8935a]/50 focus:ring-1 focus:ring-[#b8935a]/30
                      transition-all duration-300 cursor-pointer
                    "
                  >
                    <option value="owner" className="bg-[#121214] text-white">
                      Owner — Full access
                    </option>
                    <option value="editor" className="bg-[#121214] text-white">
                      Editor — Can modify content
                    </option>
                    <option value="viewer" className="bg-[#121214] text-white">
                      Viewer — Read only
                    </option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-white/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Role preview pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.keys(roleConfig).map((r) => {
                  const cfg = roleConfig[r];
                  const Icon = cfg.icon;
                  const isSelected = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                        border transition-all duration-300
                        ${
                          isSelected
                            ? `${cfg.bg} ${cfg.color}`
                            : "bg-white/[0.03] border-white/10 text-white/40 hover:text-white/70"
                        }
                      `}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cfg.label}
                    </button>
                  );
                })}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !email.trim() || !password.trim()}
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
                    Adding…
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Add Admin
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ───────── Admins List ───────── */}
<div className="xl:col-span-3">
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">

    {/* Header */}
    <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-white/80 tracking-wide">
          Team Members
        </h3>

        <p className="text-xs text-white/35 mt-0.5">
          {admins.length} admin{admins.length !== 1 ? "s" : ""} registered
        </p>
      </div>
    </div>


    {/* Admin List */}
    <div className="divide-y divide-white/5">

      {admins.length === 0 ? (
        <div className="px-6 py-16 text-center">

          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-5 h-5 text-white/30" />
          </div>

          <p className="text-sm text-white/40">
            No admins yet
          </p>

          <p className="text-xs text-white/25 mt-1">
            Add your first team member
          </p>

        </div>
      ) : (

        admins.map((admin) => {

          const cfg = roleConfig[admin.role];

          // Safety fallback in case an unexpected role exists
          if (!cfg) {
            return null;
          }

          const Icon = cfg.icon;

          const isNew = justAdded === admin.id;


          return (
            <div
              key={admin.id}
              className={`
                px-6 py-4 flex items-center gap-4
                transition-all duration-500
                ${
                  isNew
                    ? "bg-[#b8935a]/10"
                    : "hover:bg-white/[0.02]"
                }
              `}
            >

              {/* Avatar */}
              <div
                className="
                  w-10 h-10 rounded-xl
                  bg-gradient-to-br from-white/10 to-white/5
                  border border-white/10
                  flex items-center justify-center
                  shrink-0
                "
              >
                <span className="text-sm font-semibold text-white/70">
                  {admin.email?.charAt(0).toUpperCase()}
                </span>
              </div>


              {/* Admin Information */}
              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">

                  <p className="text-sm font-medium text-white/90 truncate">
                    {admin.email}
                  </p>

                  {isNew && (
                    <span
                      className="
                        inline-flex items-center gap-1
                        text-[10px] font-medium
                        text-[#d4b87a]
                        bg-[#b8935a]/15
                        px-1.5 py-0.5
                        rounded
                      "
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      New
                    </span>
                  )}

                </div>

                <p className="text-xs text-white/35 mt-0.5">
                  Added{" "}
                  {admin.createdAt
                    ? new Date(admin.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>

              </div>


              {/* Role */}
              <div
                className={`
                  hidden sm:inline-flex
                  items-center gap-1.5
                  px-2.5 py-1
                  rounded-lg
                  text-xs font-medium
                  border
                  ${cfg.bg}
                  ${cfg.color}
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                {cfg.label}
              </div>


              {/* Delete */}
              <button
                type="button"
                onClick={() => removeAdmin(admin.id)}
                className="
                  p-2 rounded-lg
                  text-white/25
                  hover:text-red-400
                  hover:bg-red-500/10
                  transition-all duration-300
                "
                title="Remove admin"
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