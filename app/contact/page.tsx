
"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col bg-white text-slate-900 min-h-screen selection:bg-red-100 selection:text-red-900">
      <Navbar />

      {/* Hero / Header Section */}
      <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-red-50 text-[#DC2626] text-[12px] sm:text-[14px] tracking-[0.12em] uppercase mb-4 font-bold border border-red-100">
            CANNONTRAVELS CONCIERGE DESK
          </span>
          <h1 className="font-mazzard text-[38px] sm:text-[52px] lg:text-[58px] text-[#0f172a] leading-[1.08] tracking-tight font-black">
            Connect With Our <br />
            <span className="text-[#DC2626]">Flight & Payment Desk</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-slate-600 text-[14px] sm:text-[16px] leading-relaxed font-medium">
            Have questions regarding flight bookings, delegated third-party sponsor payments, or live WebSocket telemetry tracking? Our global support team is available 24/7.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 bg-slate-900 text-white rounded-[32px] p-8 sm:p-10 border border-slate-800 flex flex-col justify-between h-full shadow-lg"
          >
            <div>
              <h2 className="font-mazzard text-[26px] tracking-tight text-white font-bold">
                Direct Channels
              </h2>
              <p className="mt-2 text-slate-400 text-[14px] leading-relaxed font-medium">
                Reach out through any of our secure channels or visit our global support centers.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    <Icon icon="solar:letter-bold-duotone" className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-red-400 font-bold block">
                      Secure Support Email
                    </span>
                    <span className="text-white font-medium text-[15px]">
                      support@cannongo.top
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    <Icon icon="solar:chat-round-bold-duotone" className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-red-400 font-bold block">
                      Live Telemetry Desk
                    </span>
                    <span className="text-white font-medium text-[15px]">
                      WebSocket Socket Monitoring (24/7)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] uppercase tracking-wider text-red-400 font-bold block">
                      Headquarters
                    </span>
                    <span className="text-white font-medium text-[15px]">
                      Paris Aviation Hub, France
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-800">
              <span className="text-[13px] text-slate-400 block font-medium">
                Typical response window: <strong className="text-white">Under 60 minutes</strong> for active bookings & sponsors.
              </span>
            </div>
          </motion.div>

          {/* Right Column: Secure Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-12 border border-slate-200 shadow-sm"
          >
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 text-[#DC2626] rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-red-100">
                  ✓
                </div>
                <h3 className="font-mazzard text-[28px] text-[#0f172a] font-black">Inquiry Dispatched</h3>
                <p className="text-slate-600 max-w-md mx-auto text-[15px] font-medium">
                  Thank you for reaching out. A dedicated concierge from our flight desk will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-7 py-3 bg-[#DC2626] text-white font-bold rounded-full text-[14px] hover:bg-[#B91C1C] transition-all shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-all text-[14px] font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-all text-[14px] font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">
                    Inquiry Category
                  </label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-all text-[14px] bg-white text-slate-800 font-medium">
                    <option>Flight Booking & Reservations</option>
                    <option>Delegated Third-Party Payment (Sponsorship)</option>
                    <option>Real-Time Telemetry & Tracking Code Support</option>
                    <option>Corporate Travel & Agency Partnership</option>
                    <option>General Support Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">
                    Message / PNR Reference (Optional)
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide details regarding your flight, tracking code, or payment inquiry..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-all text-[14px] resize-none font-medium text-slate-900"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[15px] rounded-full transition-all shadow-md shadow-red-600/20 cursor-pointer"
                >
                  Submit Secure Inquiry
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}