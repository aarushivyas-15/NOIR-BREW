export default function Story() {
  return (
    <section id="our-story" className="relative overflow-hidden ">
      {/* Hero Story Banner */}

      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/static/images/about-coffee.jpg"
            alt="The art of coffee craftsmanship"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Our Story
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            A Legacy of <span className="text-primary">Excellence</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From the first sip to the last, every NOIR BREW experience is
            crafted with passion, precision, and an uncompromising pursuit of
            perfection.
          </p>
        </div>
      </div>

      {/* OUR STORY */}

      {/* Timeline */}
      <div className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Chapter 1 */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-24">
              <div className="relative w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img
                    src="../static/images/story-origin.jpg"
                    alt="The Origins"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 bg-primary/90 px-4 py-2 rounded-full">
                    <span className="text-primary-foreground font-semibold tracking-wider">
                      2008
                    </span>
                  </div>
                </div>

                <div className="absolute -z-10 top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  The Origins
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our journey began in the misty highlands of Ethiopia, where we
                  discovered our first exceptional lot of Yirgacheffe beans.
                  That single cupping session changed everything.
                </p>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center mb-24">
              <div className="relative w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img
                    src="../static/images/story-roasting.jpg"
                    alt="The Craft"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 bg-primary/90 px-4 py-2 rounded-full">
                    <span className="text-primary-foreground font-semibold tracking-wider">
                      2012
                    </span>
                  </div>
                </div>

                <div className="absolute -z-10 top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  The Craft
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  We established our roastery with a singular focus: to honor
                  each bean's unique character through meticulous roasting
                  profiles developed over thousands of hours.
                </p>
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <div className="relative w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img
                    src="../static/images/story-craft.jpg"
                    alt="The Promise"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 bg-primary/90 px-4 py-2 rounded-full">
                    <span className="text-primary-foreground font-semibold tracking-wider">
                      Today
                    </span>
                  </div>
                </div>

                <div className="absolute -z-10 top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
              </div>

              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  The Promise
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every cup of NOIR BREW represents our unwavering commitment to
                  excellence, sustainability, and the belief that great coffee
                  can transform ordinary moments into extraordinary ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
