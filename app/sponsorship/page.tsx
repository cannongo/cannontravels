// app/sponsorship/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function SponsorshipPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim() && sponsorEmail.trim()) {
      setIsLinkGenerated(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 sm:px-10 py-12 space-y-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-widest px-3 py-1 bg-red-50 rounded-full border border-red-100 font-bold">
            Delegated Payment Gateway
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Third-Party <span className="text-[#DC2626]">Flight Sponsorship</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Generate secure payment links for sponsors, parents, or corporate partners. Sponsors can authorize and clear bookings instantly without registering an account.
          </p>
        </motion.div>

        {/* Generator Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold">
              <Icon icon="solar:card-send-bold-duotone" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Create Sponsorship Link</h3>
              <p className="text-xs text-slate-500 font-medium">Link your flight tracking reference to an external sponsor email.</p>
            </div>
          </div>

          {!isLinkGenerated ? (
            <form onSubmit={handleGenerateLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Flight Tracking Code / PNR</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., TRK-8812 or PNR-X7B9"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 font-mono font-bold text-slate-900 outline-none focus:border-[#DC2626]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sponsor Email Address</label>
                <input 
                  type="email"
                  required
                  placeholder="sponsor@corporate.com"
                  value={sponsorEmail}
                  onChange={(e) => setSponsorEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3.5 font-medium text-slate-900 outline-none focus:border-[#DC2626]"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl shadow-md shadow-red-600/20 transition-all cursor-pointer mt-2"
              >
                Generate Secure Payment Link
              </button>
            </form>
          ) : (
            <div className="space-y-4 py-4 text-center">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <Icon icon="solar:check-read-bold-duotone" className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Sponsorship Link Dispatched!</h3>
              <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                A secure checkout link has been sent to <span className="font-bold text-slate-900">{sponsorEmail}</span> for tracking code <span className="font-mono text-[#DC2626] font-bold">{trackingCode}</span>.
              </p>
              <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 break-all select-all">
                https://cannongo.top/pay/{trackingCode}
              </div>
              <button 
                onClick={() => setIsLinkGenerated(false)}
                className="text-xs font-bold text-[#DC2626] hover:underline pt-2 block mx-auto cursor-pointer"
              >
                Create Another Link
              </button>
            </div>
          )}
        </motion.div>

        {/* How it works info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <span className="text-xs font-mono text-[#DC2626] font-bold">STEP 1</span>
            <h4 className="font-bold text-slate-900 mt-2">Book Flight</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium">Select your preferred European or global route and obtain your tracking code.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <span className="text-xs font-mono text-[#DC2626] font-bold">STEP 2</span>
            <h4 className="font-bold text-slate-900 mt-2">Delegate Payment</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium">Input your sponsor&apos;s email above to route the secure authorization link.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <span className="text-xs font-mono text-[#DC2626] font-bold">STEP 3</span>
            <h4 className="font-bold text-slate-900 mt-2">Live Telemetry</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium">Once cleared by the sponsor, live flight tracking and e-tickets activate.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}