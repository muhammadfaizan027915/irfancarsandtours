import { Metadata } from "next";
import { TourCheckoutContent } from "@icat/features/contents/checkout";

export const metadata: Metadata = {
  title: "Checkout - Tours | Irfan Cars & Tours",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TourCheckoutPage() {
  return <TourCheckoutContent />;
}
