"use client";

import React, { useEffect, useState } from "react";
import {
  Loader2,
  Phone,
  UserRound,
  CalendarDays,
  Inbox,
} from "lucide-react";

function WholeSale() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wholesale-enquiries`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch wholesale enquiries"
          );
        }

        setEnquiries(data.enquiries || []);
      } catch (error) {
        console.error(
          "Fetch wholesale enquiries error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-2xl font-semibold text-white">
          Wholesale Enquiries
        </h2>

        <p className="text-xs text-white/40 mt-1">
          {enquiries.length} wholesale{" "}
          {enquiries.length === 1
            ? "enquiry"
            : "enquiries"}{" "}
          received
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#b8935a]" />
        </div>
      ) : enquiries.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Inbox className="w-5 h-5 text-white/30" />
          </div>

          <p className="text-sm text-white/40">
            No wholesale enquiries yet
          </p>

          <p className="text-xs text-white/25 mt-1">
            New enquiries will appear here.
          </p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">

                  <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-widest text-white/35">
                    Name / Establishment
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-widest text-white/35">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-widest text-white/35">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-medium uppercase tracking-widest text-white/35">
                    Submitted
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">

                {enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >

                    {/* Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <UserRound className="h-4 w-4 text-white/40" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white/85">
                            {enquiry.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-white/25">
                            ID: {enquiry.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Phone className="h-3.5 w-3.5 text-white/30" />
                        {enquiry.contact}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-lg border border-[#b8935a]/20 bg-[#b8935a]/10 px-2.5 py-1 text-[10px] font-medium capitalize text-[#d4b87a]">
                        {enquiry.status || "new"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <CalendarDays className="h-3.5 w-3.5 text-white/25" />
                        {formatDate(enquiry.createdAt)}
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-white/5 md:hidden">

            {enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <UserRound className="h-4 w-4 text-white/40" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white/85">
                        {enquiry.name}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {enquiry.contact}
                      </p>
                    </div>

                  </div>

                  <span className="shrink-0 rounded-lg border border-[#b8935a]/20 bg-[#b8935a]/10 px-2 py-1 text-[10px] capitalize text-[#d4b87a]">
                    {enquiry.status || "new"}
                  </span>

                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-white/30">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Submitted {formatDate(enquiry.createdAt)}
                </div>

              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}

export default WholeSale;