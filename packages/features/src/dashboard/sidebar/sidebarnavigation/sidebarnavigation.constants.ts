import {
  CarFront,
  ClipboardList,
  Map,
  MessageSquareWarning,
  Users,
} from "lucide-react";

export const DashboardNavigationUrls = {
  BOOKINGS: "/dashboard/bookings",
  BOOKINGS_CARS: "/dashboard/bookings/cars",
  BOOKINGS_TOURS: "/dashboard/bookings/tours",
  CREATE_CAR_BOOKING: "/dashboard/bookings/cars/new",
  CREATE_TOUR_BOOKING: "/dashboard/bookings/tours/new",
  CARS: "/dashboard/cars",
  REGISTER_CAR: "/dashboard/cars/new",
  TOURS: "/dashboard/tours",
  CREATE_TOUR: "/dashboard/tours/create",
  CUSTOMERS: "/dashboard/customers",
  CREATE_CUSTOMER: "/dashboard/customers/create",
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
    title: "Tours",
    url: DashboardNavigationUrls.TOURS,
    icon: Map,
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
