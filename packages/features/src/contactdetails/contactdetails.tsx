import { Phone, Mail } from "lucide-react";
import {
  PHONE_NUMBER_1,
  PHONE_NUMBER_2,
  EMAIL_ADDRESS,
} from "./contactdetails.constants";
import { Card, CardTitle, CardContent } from "@icat/ui/components/card";

export function ContactDetails() {
  return (
    <Card className="shadow-none">
      <CardContent>
        <CardTitle className="text-4xl font-bold">Contact Details</CardTitle>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold mt-4">Phone Numbers:</h2>

          <div className="flex gap-8">
            <a href={`tel:${PHONE_NUMBER_1}`}>
              <Phone size={14} className="inline" /> {PHONE_NUMBER_1}
            </a>
            <a href={`tel:${PHONE_NUMBER_2}`}>
              <Phone size={14} className="inline" /> {PHONE_NUMBER_2}
            </a>
          </div>

          <h2 className="text-xl font-bold mt-4">Email Address:</h2>

          <a href={`mailto:${EMAIL_ADDRESS}`}>
            <Mail size={14} className="inline" /> {EMAIL_ADDRESS}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
