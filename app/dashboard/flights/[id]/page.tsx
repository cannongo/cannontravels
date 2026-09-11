

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

function FlightCheckoutContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightId = params.id;
  const cabin = searchParams.get("cabin") || "economy";

  const [flight, setFlight] = useState<any>(null);
  const [isLoadingFlight, setIsLoadingFlight] = useState(true);
  const [paymentMode, setPaymentMode] = useState<"self" | "delegated">("self");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successLink, setSuccessLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await api.get(`/flights/${flightId}`);
        setFlight(response.data.flight);
      } catch (error: any) {
        setErrorMessage("Could not load flight parameters.");
      } finally {
        setIsLoadingFlight(false);
      }
    };
    if (flightId) fetchFlightDetails();

    // Safety timeout fallback (forces loader to stop after 4 seconds)
    const timer = setTimeout(() => setIsLoadingFlight(false), 4000);
    return () => clearTimeout(timer);
  }, [flightId]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const price = flight.pricing?.[cabin] || flight.pricing?.economy || 0;

      const payload = {
        flightNumber: flight.flightNo,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        amount: price,
        paymentMethod: paymentMode,
        payerEmail: paymentMode === "delegated" ? sponsorEmail : undefined
      };

      // 1. Create the booking record first
      const response = await api.post("/bookings", payload);
      const bookingData = response.data.data;

      if (paymentMode === "delegated") {
        const trackingCode = bookingData.trackingCode;
        setSuccessLink(`${window.location.origin}/pay/${trackingCode}`);
      } else {
        // 2. Initialize payment invoice using the admin's active gateway setting
        const paymentRes = await api.post("/payments/initialize", {
          bookingId: bookingData._id
        });

        // 3. Redirect user directly to the active checkout URL
        if (paymentRes.data.checkoutUrl) {
          window.location.href = paymentRes.data.checkoutUrl;
        } else {
          router.push("/dashboard/bookings");
        }
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to process booking issuance.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoadingFlight) {
    return (
      <div className="min-h-[50vh] flex flex-col gap-4 items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        <p className="text-sm font-bold text-slate-500">Fetching flight parameters...</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Flight not found or no longer active.</h2>
        <Link href="/dashboard/flights" className="inline-block px-6 py-3 bg-[#DC2626] text-white font-bold rounded-xl text-sm">
          Return to Inventory
        </Link>
      </div>
    );
  }

  const price = flight.pricing?.[cabin] || flight.pricing?.economy || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <Link href="/dashboard/flights" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
        <Icon icon="lucide:arrow-left" className="w-4 h-4" />
        <span>Back to Inventory</span>
      </Link>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm flex items-center gap-2">
          <Icon icon="lucide:alert-circle" className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Complete Flight Issuance</h1>
            <p className="text-sm text-slate-600 mt-1">Review your flight segment and choose how you would like to settle payment.</p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMode("self")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentMode === "self"
                      ? "border-[#DC2626] bg-red-50/40 text-slate-900 shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-bold text-sm block mb-0.5">Self Checkout</span>
                  <span className="text-xs text-slate-500 font-medium">Pay securely via active platform gateway</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode("delegated")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentMode === "delegated"
                      ? "border-[#DC2626] bg-red-50/40 text-slate-900 shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-bold text-sm block mb-0.5">Delegated Payment</span>
                  <span className="text-xs text-slate-500 font-medium">Generate a secure link for a third-party sponsor</span>
                </button>
              </div>
            </div>

            {paymentMode === "delegated" && (
              <div className="space-y-2 animate-in fade-in">
                <label className="block text-xs font-bold text-slate-700 uppercase">Sponsor Email Address</label>
                <input 
                  type="email" 
                  value={sponsorEmail}
                  onChange={(e) => setSponsorEmail(e.target.value)}
                  placeholder="sponsor@company.com" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium outline-none focus:border-[#DC2626]"
                />
                <p className="text-xs text-slate-500">We will dispatch the delegated payment link to this email with live flight tracking token.</p>
              </div>
            )}

            {successLink && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Delegated Link Generated & Email Dispatched!</p>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={successLink} className="w-full bg-white border border-emerald-300 rounded-lg p-2 text-xs font-mono text-slate-800" />
                  <button 
                    type="button"
                    onClick={() => navigator.clipboard.writeText(successLink)}
                    className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-base rounded-full shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{paymentMode === "self" ? "Proceed to Secure Checkout" : "Generate Sponsor Link"}</span>
                  <Icon icon="lucide:arrow-right" className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md h-fit">
          <h3 className="font-bold text-lg border-b border-white/10 pb-4">Booking Summary</h3>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-slate-400 text-xs uppercase font-mono block">Flight Item</span>
              <span className="font-bold text-base">{flight.flightNo} ({flight.origin} → {flight.destination})</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs uppercase font-mono block">Airline & Route</span>
              <span className="font-medium text-slate-300">{flight.airline} ({flight.originCity} to {flight.destinationCity})</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs uppercase font-mono block">Selected Cabin</span>
              <span className="font-bold capitalize text-emerald-400">{cabin} Class</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs uppercase font-mono block">Passenger Protection</span>
              <span className="font-medium text-slate-300">Included (Biometric Fast-Track & Delay Shield)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Total Fare</span>
            <span className="text-2xl font-black text-white">${price}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <FlightCheckoutContent />
    </Suspense>
  );
}