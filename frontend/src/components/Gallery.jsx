const galleryImages = [
  {
    src: "../static/images/gallery-1.jpg",
    alt: "Coffee roasting process",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "../static/images/gallery-2.jpg",
    alt: "Coffee and pastry",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "../static/images/gallery-3.jpg",
    alt: "Coffee plantation",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "../static/images/gallery-4.jpg",
    alt: "Pour over coffee",
    className: "md:col-span-2 md:row-span-1",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
            The NOIR BREW Experience
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A glimpse into our world of coffee artistry, from farm to cup.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-foreground font-medium">{image.alt}</p>
              </div>

              {/* Glass effect border on hover */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-2xl transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
