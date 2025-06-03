"use client";

import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Venue } from "@/lib/api/venue";
import { Card } from "@/components/ui/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VenueChartProps {
  venue: Venue;
}

export default function VenueChart({ venue }: VenueChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);

  const data: ChartData<"line"> = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Bookings",
        data: venue?.stats?.daily,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "Weekly Average",
        data: venue?.stats?.weekly,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Venue Performance Overview",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card>
      <div className="h-[400px]">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Daily Average</p>
          <p className="text-lg font-semibold text-blue-600">
            {Math.round(
              venue?.stats?.daily.reduce((a, b) => a + b, 0) /
                venue?.stats?.daily.length
            )}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Weekly Total</p>
          <p className="text-lg font-semibold text-green-600">
            {venue?.stats?.weekly.reduce((a, b) => a + b, 0)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Monthly Projection</p>
          <p className="text-lg font-semibold text-purple-600">
            {Math.round(venue?.stats?.monthly.reduce((a, b) => a + b, 0) * 4)}
          </p>
        </div>
      </div>
    </Card>
  );
}
