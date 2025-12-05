import { MessageCircle } from "lucide-react";
import { PHONE_NUMBER_2 } from "@icat/features/contactdetails/contactdetails.constants";

export function FloatingWhatsApp({
  phone = PHONE_NUMBER_2,
  message = "Hi! I’m looking for a rental car. Can you help me with the details?",
  position = "bottom-right",
  className = "",
}) {
  const encoded = message ? encodeURIComponent(message) : "";
  const whatsappUrl = `https://wa.me/${phone}?text=${encoded}`;

  const containerPositionClass =
    position === "bottom-left" ? "left-6" : "right-6";

  return (
    <div
      className={`fixed ${containerPositionClass} bottom-6 z-50 ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 justify-center w-auto h-14 px-5 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-200 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="text-sm font-bold">WhatsApp Us</span>
      </a>
    </div>
  );
}
