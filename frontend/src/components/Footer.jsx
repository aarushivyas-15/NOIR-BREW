export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-bold tracking-wider text-foreground">
                NOIR BREW
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Experience the art of exceptional coffee. Hand-selected beans,
              expertly roasted for an unparalleled taste experience.
            </p>
          </div>
          {[
            {
              title: "Shop",
              links: [
                "All Products",
                "Best Sellers",
                "New Arrivals",
                "Subscriptions",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Our Story", "Careers", "Press"],
            },
            {
              title: "Support",
              links: ["Contact", "FAQ", "Shipping", "Returns"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-foreground mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground ">
            © 2026 NOIR BREW. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
