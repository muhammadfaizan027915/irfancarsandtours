import {
  CarFront,
  ClipboardList,
  Users,
  MessageSquareWarning,
} from "lucide-react";

export const DashboardNavigationUrls = {
  BOOKINGS: "/dashboard",
  CARS: "/dashboard/cars",
  REGISTER_CAR: "/dashboard/cars/new",
  CUSTOMERS: "/dashboard/customers",
  COMPLAINTS: "/dashboard/complaints",
} as const;

export const DashboardNavigation = [
  {
    title: "Bookings",
    url: DashboardNavigationUrls.BOOKINGS,
    icon: ClipboardList,
    isRoot: true
  },
  {
    title: "Cars",
    url: DashboardNavigationUrls.CARS,
    icon: CarFront,
  },
  {
    title: "Customers",
    url: DashboardNavigationUrls.CUSTOMERS,
    icon: Users,
  },
  {
    title: "Complaints",
    url: DashboardNavigationUrls.COMPLAINTS,
    icon: MessageSquareWarning,
  },
];
