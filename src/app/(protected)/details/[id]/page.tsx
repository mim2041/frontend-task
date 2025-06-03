"use client";
import React, { useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Users,
  Wifi,
  Car,
  Tag,
  ArrowLeft,
  Image,
} from "lucide-react";
import Header from "@/components/layout/Header";

// Mock data based on the API response format
const venueData = {
  id: 40,
  name: "Mymensingh Turf Center 40",
  address: "Road-42, Mymensingh",
  contact: "01628064758",
  description: "Well-maintained turf in Mymensingh",
  location: { name: "Mymensingh" },
  country: { name: "Bangladesh" },
  images: [
    {
      id: 151,
      image_url:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      is_cover_image: 1,
    },
    {
      id: 152,
      image_url:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
      is_cover_image: 0,
    },
    {
      id: 153,
      image_url:
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop",
      is_cover_image: 0,
    },
  ],
  amenities: [
    { id: 3, name: "Wi-Fi", image: "wifi-icon" },
    { id: 4, name: "Parking", image: "parking-icon" },
  ],
  turf: [
    {
      id: 79,
      name: "Turf 1 - Venue 40",
      status: "inactive",
      categories: [
        {
          id: 1,
          name: "Cricket",
          capacities: [{ id: 3, name: "4x4" }],
        },
      ],
    },
    {
      id: 80,
      name: "Turf 2 - Venue 40",
      status: "inactive",
      categories: [
        {
          id: 1,
          name: "Cricket",
          capacities: [
            { id: 1, name: "2x2" },
            { id: 2, name: "3x3" },
            { id: 3, name: "4x4" },
          ],
        },
      ],
    },
  ],
  turf_time_slots: [
    {
      id: 118,
      slot_type: "Morning",
      start_time: "06:00:00",
      end_time: "12:00:00",
    },
    {
      id: 119,
      slot_type: "Afternoon",
      start_time: "12:00:00",
      end_time: "18:00:00",
    },
    {
      id: 120,
      slot_type: "Evening",
      start_time: "18:00:00",
      end_time: "23:59:59",
    },
  ],
  turf_slot_pricing: [
    {
      start_time: "06:00:00",
      end_time: "07:00:00",
      weekday_price: "1000.00",
      weekend_price: "1200.00",
      time_slots: { slot_type: "Morning" },
    },
    {
      start_time: "12:00:00",
      end_time: "13:00:00",
      weekday_price: "1200.00",
      weekend_price: "1500.00",
      time_slots: { slot_type: "Afternoon" },
    },
    {
      start_time: "18:00:00",
      end_time: "19:00:00",
      weekday_price: "1500.00",
      weekend_price: "1800.00",
      time_slots: { slot_type: "Evening" },
    },
  ],
  discounts: [
    {
      id: 118,
      start_date: "2025-06-05",
      end_date: "2025-07-07",
      discount_type: "percentage",
      discount_value: "14.00",
      description: "Weekend bonus discount",
    },
  ],
  turf_reviews: [
    {
      id: 120,
      rating: 4,
      comment: "Awesome place for a football match!",
      status: "approved",
      user: { name: "Ashik Hassan" },
    },
    {
      id: 118,
      rating: 5,
      comment: "Good place for casual matches, but needs maintenance.",
      status: "rejected",
      user: { name: "Aminul" },
    },
  ],
};

const VenueDetailsPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("Morning");

  const averageRating =
    venueData.turf_reviews.reduce((acc, review) => acc + review.rating, 0) /
    venueData.turf_reviews.length;
  const approvedReviews = venueData.turf_reviews.filter(
    (review) => review.status === "approved"
  );

  const formatPrice = (price: string) =>
    `৳${parseFloat(price).toLocaleString()}`;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {venueData.name}
              </h1>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {venueData.address}, {venueData.location.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group">
              <img
                src={venueData.images[activeImageIndex]?.image_url}
                alt="Venue main"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {venueData.images.slice(1, 3).map((image, index) => (
                <div
                  key={image.id}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveImageIndex(index + 1)}
                >
                  <img
                    src={image.image_url}
                    alt={`Venue ${index + 2}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Venue Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {venueData.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{venueData.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {venueData.contact}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {venueData.location.name}, {venueData.country.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {venueData.turf_reviews.length} reviews
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t pt-6 mt-10">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600 " />
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {venueData.amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200"
                    >
                      {amenity.name === "Wi-Fi" ? (
                        <Wifi className="w-4 h-4" />
                      ) : (
                        <Car className="w-4 h-4" />
                      )}
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Turf Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-green-600" />
                Available Turfs
              </h3>
              <div className="grid gap-4">
                {venueData.turf.map((turf) => (
                  <div
                    key={turf.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {turf.name}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          turf.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {turf.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {turf.categories.map((category) => (
                        <div key={category.id} className="text-sm">
                          <span className="font-medium text-gray-700">
                            {category.name}:
                          </span>
                          {category.capacities.map((capacity) => (
                            <span
                              key={capacity.id}
                              className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              {capacity.name}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Customer Reviews
              </h3>
              <div className="space-y-4">
                {approvedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {review.user?.name || "Anonymous"}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-24">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Pricing & Availability
              </h3>

              {/* Time Slot Selector */}
              <div className="mb-4">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  {venueData.turf_time_slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedTimeSlot(slot.slot_type)}
                      className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                        selectedTimeSlot === slot.slot_type
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {slot.slot_type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price List */}
              <div className="space-y-3">
                {venueData.turf_slot_pricing
                  .filter(
                    (pricing) =>
                      pricing.time_slots.slot_type === selectedTimeSlot
                  )
                  .slice(0, 3)
                  .map((pricing, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatTime(pricing.start_time)} -{" "}
                          {formatTime(pricing.end_time)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Weekday: {formatPrice(pricing.weekday_price)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Weekend: {formatPrice(pricing.weekend_price)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Book Now
              </button>
            </div>

            {/* Active Discounts */}
            {venueData.discounts.length > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg border border-orange-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-800">
                  <Tag className="w-5 h-5" />
                  Active Offers
                </h3>
                {venueData.discounts.map((discount) => (
                  <div
                    key={discount.id}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-orange-800">
                        {discount.discount_type === "percentage"
                          ? `${discount.discount_value}% OFF`
                          : `৳${discount.discount_value} OFF`}
                      </span>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        Until {new Date(discount.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {discount.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
