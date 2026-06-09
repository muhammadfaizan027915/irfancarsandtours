import { Metadata } from "next";
import { CarCheckoutContent } from "@icat/features/contents/checkout";

export const metadata: Metadata = {
  title: "Checkout - Cars | Irfan Cars & Tours",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CarCheckoutPage() {
  return <CarCheckoutContent />;
}
