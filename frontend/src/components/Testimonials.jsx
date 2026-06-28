export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Mitchell",
              role: "Coffee Enthusiast",
              text: "NOIR BREW has completely transformed my morning ritual. The depth of flavor in their Midnight Espresso is simply unmatched.",
            },
            {
              name: "James Chen",
              role: "Restaurant Owner",
              text: "As a chef, I appreciate the attention to detail. The Ethiopian Reserve has become our signature after-dinner coffee.",
            },
            {
              name: "Elena Rodriguez",
              role: "Food Blogger",
              text: "I've tried countless premium coffees, but NOIR BREW stands apart. The freshness, the aroma, the complexity of flavors.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="group bg-card/50 border border-border/50 backdrop-blur-sm rounded-xl transition-all duration-500 hover:bg-card hover:border-primary/30 hover:shadow-2xl"
            >
              <div className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-primary"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6">{t.text}</p>
                <div className="pt-6 border-t border-border/50">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
