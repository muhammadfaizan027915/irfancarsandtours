export function Map() {
  return (
    <div className="px-2">
      <h1 className="text-4xl font-bold">Our Location</h1>
      <p className="text-sm text-muted-foreground">
        Raja Bazar, Rawalpindi, Punjab, Pakistan
      </p>

      <iframe
        className="w-full h-96 mt-6"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13288.539840035934!2d73.07594429999999!3d33.6277425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94dbedc63c77%3A0xe154899b615a6372!2sAlkhidmat%20Raazi%20hospital%20Rawalpindi!5e0!3m2!1sen!2s!4v1756546696993!5m2!1sen!2s"
        loading="lazy"
      ></iframe>
    </div>
  );
}
