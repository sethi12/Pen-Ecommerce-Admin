"use client";

import React, { useState } from "react";
import {
  Home,
  Users,
  Package,
  Layers,
  Award,
  LogOut,
  TrendingUp,
  ShoppingBag,
  Eye,
  Star,
  ArrowUpRight,
  Sparkles,
  ListOrdered
} from "lucide-react";
import Admins from "../components/Admins";
import Brands from "../components/Brands";
import Collections from "../components/Collections";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "admins", label: "Admins", icon: Users },
  { id: "products", label: "Products", icon: Package },
  { id: "collections", label: "Collections", icon: Layers },
  { id: "orders", label: "Orders", icon: ListOrdered },
  { id: "brands", label: "Brands", icon: Award },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#b8935a]/8 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#c9a86a]/6 blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] rounded-full bg-white/3 blur-[80px]" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* ───────── Left Sidebar ───────── */}
        <aside className="w-64 shrink-0 flex flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl">
          {/* Logo */}
          <div className="px-6 py-7 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#b8935a] to-[#8a6d3d] flex items-center justify-center shadow-lg shadow-[#b8935a]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">PenZone</h1>
                <p className="text-[11px] text-white/40 tracking-widest uppercase">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#b8935a]/20 to-[#b8935a]/5 text-[#e8d5b0] border border-[#b8935a]/30 shadow-lg shadow-[#b8935a]/10"
                        : "text-white/50 hover:text-white/90 hover:bg-white/5 border border-transparent"
                    }
                  `}
                >
                  <Icon
                    className={`w-[18px] h-[18px] transition-colors ${
                      isActive ? "text-[#d4b87a]" : "text-white/40 group-hover:text-white/70"
                    }`}
                  />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4b87a]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-3 pb-6">
            <button
              onClick={() => {
                // Add your logout logic here
                console.log("Logging out...");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                         text-red-400/70 hover:text-red-300 hover:bg-red-500/10
                         border border-transparent hover:border-red-500/20
                         transition-all duration-300"
            >
              <LogOut className="w-[18px] h-[18px]" />
              Logout
            </button>
          </div>
        </aside>

        {/* ───────── Right Content ───────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {activeTab === "home" && <HomeContent />}
            {activeTab === "admins" && <Admins/>}
            {activeTab === "products" && <Placeholder title="Products" description="Add, edit, and organize your pen inventory." />}
            {activeTab === "collections" && <Collections/>}
            {activeTab === "brands" &&<Brands />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─────────────────── Home Content ─────────────────── */
function HomeContent() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₹12.4L",
      change: "+18.2%",
      icon: TrendingUp,
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
    },
    {
      label: "Orders",
      value: "1,284",
      change: "+12.5%",
      icon: ShoppingBag,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      label: "Page Views",
      value: "48.2K",
      change: "+9.1%",
      icon: Eye,
      color: "from-violet-500/20 to-violet-500/5",
      iconColor: "text-violet-400",
    },
    {
      label: "Avg. Rating",
      value: "4.92",
      change: "+0.3",
      icon: Star,
      color: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
    },
  ];

  const recentOrders = [
    { id: "#PZ-2841", customer: "Arjun Mehta", product: "Obsidian Noir", amount: "₹8,900", status: "Shipped" },
    { id: "#PZ-2840", customer: "Priya Sharma", product: "Brass Heritage", amount: "₹12,400", status: "Processing" },
    { id: "#PZ-2839", customer: "Rahul Verma", product: "Midnight Clip", amount: "₹6,750", status: "Delivered" },
    { id: "#PZ-2838", customer: "Ananya Patel", product: "Gold Leaf Edition", amount: "₹18,200", status: "Shipped" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-white/40 mb-1 tracking-wide">Welcome back</p>
          <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/30 uppercase tracking-widest">Today</p>
          <p className="text-sm text-white/60">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="
                relative overflow-hidden rounded-2xl
                bg-white/[0.04] backdrop-blur-xl
                border border-white/10
                p-5 group
                hover:border-white/20 hover:bg-white/[0.06]
                transition-all duration-500
              "
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${stat.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400/90 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                <p className="text-sm text-white/40 mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured / Hero card */}
        <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 min-h-[320px] flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b8935a]/10 via-transparent to-transparent" />
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#b8935a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-[#d4b87a] bg-[#b8935a]/10 border border-[#b8935a]/20 px-3 py-1.5 rounded-full mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Featured
            </span>
            <h3 className="text-2xl font-semibold tracking-tight mb-3 max-w-md">
              A pen that earns its ink.
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Brass-weighted, hand-balanced, and built to outlast the notebooks it fills.
              Every barrel is turned, polished, and tested before it leaves the bench.
            </p>
          </div>

          <div className="relative flex items-center gap-4 mt-8">
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b8935a] to-[#9a7a45] text-sm font-medium text-white shadow-lg shadow-[#b8935a]/25 hover:shadow-[#b8935a]/40 transition-shadow">
              View Collection
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-white/15 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all">
              Craftsmanship
            </button>
          </div>
        </div>

        {/* Quick stats / Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col">
          <h4 className="text-sm font-medium text-white/70 mb-5 tracking-wide">Top Performing</h4>
          <div className="space-y-4 flex-1">
            {[
              { name: "Obsidian Noir", sales: 342, pct: 92 },
              { name: "Brass Heritage", sales: 287, pct: 78 },
              { name: "Gold Leaf Edition", sales: 198, pct: 64 },
              { name: "Midnight Clip", sales: 156, pct: 51 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/80">{item.name}</span>
                  <span className="text-white/40">{item.sales}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#b8935a] to-[#d4b87a]"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h4 className="text-sm font-medium text-white/70 tracking-wide">Recent Orders</h4>
          <button className="text-xs text-[#d4b87a] hover:text-[#e8d5b0] transition-colors">
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/30 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white/90">{order.id}</td>
                  <td className="px-6 py-4 text-white/60">{order.customer}</td>
                  <td className="px-6 py-4 text-white/60">{order.product}</td>
                  <td className="px-6 py-4 text-white/90">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex px-2.5 py-1 rounded-lg text-xs font-medium
                        ${
                          order.status === "Delivered"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : order.status === "Shipped"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-amber-500/10 text-amber-400"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Placeholder for other tabs ─────────────────── */
function Placeholder({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <Sparkles className="w-7 h-7 text-[#d4b87a]/60" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight mb-2">{title}</h2>
      <p className="text-white/40 max-w-md">{description}</p>
      <p className="mt-6 text-xs text-white/25 tracking-widest uppercase">Coming soon</p>
    </div>
  );
}