import { Card, CardTitle, CardContent } from "@icat/ui/components/card";

export function Map() {
  return (
    <Card className="shadow-none">
      <CardContent>
        <CardTitle className="text-4xl font-bold">Our Location</CardTitle>
        <p className="text-muted-foreground mb-2">
          Near Bloachistan Marble Facotry, Shaheen Town, Service Road West,
          Rawalpindi, Punjab, Pakistan
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.787133784549!2d73.12233777600088!3d33.61082717332642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb20f258f873%3A0x170483379c51e9dd!2sIrfan%20Cars%20And%20Tours!5e0!3m2!1sen!2s!4v1764949261484!5m2!1sen!2s"
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </CardContent>
    </Card>
  );
}
