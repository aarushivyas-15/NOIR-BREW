import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Midnight Espresso",
    description: "Bold, intense, with notes of dark chocolate and caramel",
    price: 32,
    rating: 4.9,
    image: "../static/images/coffee-1.jpg",
    badge: "Best Seller",
    category: "espresso",
  },
  {
    id: 2,
    name: "Ethiopian Reserve",
    description: "Fruity and floral with hints of bergamot and jasmine",
    price: 38,
    rating: 4.8,
    image: "../static/images/coffee-2.jpg",
    badge: "Single Origin",
    category: "espresso",
  },
  {
    id: 3,
    name: "Cold Brew Blend",
    description: "Smooth, naturally sweet with subtle nutty undertones",
    price: 28,
    rating: 4.7,
    image: "../static/images/coffee-3.jpg",
    badge: "New Arrival",
    category: "cold-brew",
  },
];

export default function Products() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <section id="products" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Our Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Curated for Perfection
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Each blend is meticulously crafted to deliver an extraordinary
            coffee experience, from bean to cup.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden rounded-xl transition-all duration-500 hover:bg-card hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>

                <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {product.rating}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Quick Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center  rounded-sm border py-2 px-4  text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
    </section>
  );
}
