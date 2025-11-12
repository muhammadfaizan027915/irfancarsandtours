export function Map() {
  return (
    <div className="px-2">
      <h1 className="text-4xl font-bold">Our Location</h1>
      <p className="text-sm text-muted-foreground">
        Raja Bazar, Rawalpindi, Punjab, Pakistan
      </p>

      <iframe
        className="w-full h-96 mt-6"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d207.6743314012138!2d73.12495325151268!3d33.61077091325886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM2JzM4LjYiTiA3M8KwMDcnMzAuNCJF!5e0!3m2!1sen!2s!4v1762971917437!5m2!1sen!2s"
        loading="lazy"
      ></iframe>
    </div>
  );
}
