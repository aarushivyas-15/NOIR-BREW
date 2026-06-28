export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        {/* <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            About Noir Brew
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
            Crafted For Those Who
            <br />
            Appreciate Excellence
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            NOIR BREW was founded with one mission: to transform everyday coffee
            into an extraordinary coffee experience.
          </p>
        </div> */}

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <img
              src="../static/images/about-coffee.jpg"
              alt="Coffee"
              className="w-full h-[450px] md:h-[550px] object-cover rounded-3xl"
            />

            <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/30 rounded-2xl"></div>
          </div>

          {/* Right Content */}
          <div>
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Our Commitment
            </p>

            <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              More Than Coffee
            </h3>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We travel across renowned coffee-growing regions, building direct
              relationships with farmers who share our commitment to
              sustainability and quality.
            </p>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Every roast profile is carefully developed to unlock the unique
              character of each origin, creating rich, memorable flavors in
              every cup.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all">
                <h4 className="font-semibold text-foreground mb-2">
                  Ethical Sourcing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Direct partnerships with responsible farms.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all">
                <h4 className="font-semibold text-foreground mb-2">
                  Global Origins
                </h4>
                <p className="text-sm text-muted-foreground">
                  Premium beans selected from the world's most renowned coffee
                  regions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all">
                <h4 className="font-semibold text-foreground mb-2">
                  Award Winning
                </h4>
                <p className="text-sm text-muted-foreground">
                  Recognized for outstanding craftsmanship.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all">
                <h4 className="font-semibold text-foreground mb-2">
                  Fresh Delivery
                </h4>
                <p className="text-sm text-muted-foreground">
                  Roasted fresh and shipped quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Blur Effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
