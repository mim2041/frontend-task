"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchVenue } from "@/lib/redux/slices/venueSlice";
import Header from "@/components/layout/Header";
import DashboardStats from "@/components/dashboard/DashboardStats";
import VenueChart from "@/components/dashboard/VenueChart";
import { Spinner } from "@/components/ui/Spinner";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { currentVenue, loading, error } = useAppSelector(
    (state) => state.venue
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchVenue("40"));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchVenue("40"))}
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s an overview of your venue performance
          </p>
        </div>

        {currentVenue && (
          <>
            <DashboardStats venue={currentVenue} />
            <div className="mt-8">
              <VenueChart venue={currentVenue} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
