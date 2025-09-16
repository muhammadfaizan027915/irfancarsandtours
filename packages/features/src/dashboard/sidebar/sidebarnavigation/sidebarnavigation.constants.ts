import {
  CarFront,
  ClipboardList,
  Users,
  MessageSquareWarning,
} from "lucide-react";

export const DashboardNavigationUrls = {
  BOOKINGS: "/dashboard",
  CARS: "/dashboard/cars",
  USERS: "/dashboard/users",
  COMPLAINTS: "/dashboard/complaints",
} as const;

export const DashboardNavigation = [
  {
    title: "Bookings",
    url: DashboardNavigationUrls.BOOKINGS,
    icon: ClipboardList,
  },
  {
    title: "Cars",
    url: DashboardNavigationUrls.CARS,
    icon: CarFront,
  },
  {
    title: "Users",
    url: DashboardNavigationUrls.USERS,
    icon: Users,
  },
  {
    title: "Complaints",
    url: DashboardNavigationUrls.COMPLAINTS,
    icon: MessageSquareWarning,
  },
];
