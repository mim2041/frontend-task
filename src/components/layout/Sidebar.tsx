import { Venue } from "@/lib/api/venue";
import { Card } from "@/components/ui/Card";

interface DashboardStatsProps {
  venue: Venue;
}

export default function DashboardStats({ venue }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `${venue.revenue.toLocaleString()}`,
      icon: "💰",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Bookings",
      value: venue.bookings.toLocaleString(),
      icon: "📅",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Venue Capacity",
      value: venue.capacity.toLocaleString(),
      icon: "👥",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Average Rating",
      value: venue.rating.toFixed(1),
      icon: "⭐",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
