'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchVenue } from '@/lib/redux/slices/venueSlice';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

export default function DetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentVenue, loading, error } = useAppSelector((state) => state.venue);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchVenue(params.id as string));
    }
  }, [dispatch, params.id]);

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
            onClick={() => router.push('/dashboard')}
            className="mt-4 btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 text-primary-600 hover:text-primary-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {currentVenue && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentVenue.name}</h1>
              <p className="mt-2 text-gray-600">{currentVenue.address}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <h3 className="text-lg font-semibold mb-2">Capacity</h3>
                <p className="text-3xl font-bold text-primary-600">
                  {currentVenue.capacity.toLocaleString()}
                </p>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-green-600">
                  ${currentVenue.revenue.toLocaleString()}
                </p>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {currentVenue.bookings.toLocaleString()}
                </p>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-yellow-600">
                    {currentVenue.rating}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(currentVenue.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {currentVenue.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm text-gray-600 mb-1">Daily Average</h4>
                  <p className="text-xl font-semibold">
                    {currentVenue.stats.daily.reduce((a, b) => a + b, 0) / currentVenue.stats.daily.length}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600 mb-1">Weekly Average</h4>
                  <p className="text-xl font-semibold">
                    {currentVenue.stats.weekly.reduce((a, b) => a + b, 0) / currentVenue.stats.weekly.length}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600 mb-1">Monthly Average</h4>
                  <p className="text-xl font-semibold">
                    {currentVenue.stats.monthly.reduce((a, b) => a + b, 0) / currentVenue.stats.monthly.length}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}