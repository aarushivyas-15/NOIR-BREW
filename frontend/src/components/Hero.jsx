import { Link } from "react-router-dom";

export default function Hero() {
  const scrollToStory = () => {
    const section = document.getElementById("our-story");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="../static/images/hero-coffee.jpg"
          alt="Premium coffee experience"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
            Artisan Coffee Roasters
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight mb-8">
            <span className="block">The Art of</span>

            <span className="block text-primary">Exceptional Coffee</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Hand-selected beans from the world's finest estates, expertly
            roasted to unlock complex flavors and aromas that define luxury in
            every cup.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ marginTop: "3rem" }}
          >
            <Link
              to="/shop"
              className="btn-primary-lg transition-all duration-300 hover:scale-105"
            >
              Shop Now
            </Link>

            <button
              onClick={scrollToStory}
              className="btn-outline-lg transition-all duration-300"
            >
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground tracking-wider uppercase">
          Scroll
        </span>

        <svg
          className="w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>

      {/* Decorative Blurs */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
}
