import Navbar from "../components/Navbar.jsx";
import Cart from "../components/Cart.jsx";
import Hero from "../components/Hero.jsx";
import Products from "../components/Products.jsx";
import Story from "../components/Story.jsx";
import About from "../components/About.jsx";
import Gallery from "../components/Gallery.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <Cart />
      <Hero />
      <Products />
      <Story />
      <About />
      <Gallery />
      <Testimonials />
      <Footer />
    </>
  );
}

//import Navbar from "../components/Navbar";
// import Cart from "../components/Cart";
// import { useCart } from "../context/CartContext";

// const products = [
//   {
//     id: 1,
//     name: "Midnight Espresso",
//     desc: "Bold, intense, with notes of dark chocolate and caramel",
//     price: 32,
//     rating: 4.9,
//     image: "/static/images/coffee-1.jpg",
//     category: "espresso",
//     badge: "Best Seller",
//   },
//   {
//     id: 2,
//     name: "Ethiopian Reserve",
//     desc: "Fruity and floral with hints of bergamot and jasmine",
//     price: 38,
//     rating: 4.8,
//     image: "/static/images/coffee-2.jpg",
//     category: "espresso",
//     badge: "Single Origin",
//   },
//   {
//     id: 3,
//     name: "Cold Brew Blend",
//     desc: "Smooth, naturally sweet with subtle nutty undertones",
//     price: 28,
//     rating: 4.7,
//     image: "/static/images/coffee-3.jpg",
//     category: "cold-brew",
//     badge: "New Arrival",
//   },
// ];

// export default function Home() {
//   const { addToCart } = useCart();

//   return (
//     <div className="bg-background text-foreground">
//       <Navbar />
//       <Cart />

//       {/* hero */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src="/static/images/hero-coffee.jpg"
//             alt="hero"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
//           <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
//         </div>
//         <div className="relative z-10 container mx-auto px-6 pt-20 text-center max-w-4xl">
//           <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
//             Artisan Coffee Roasters
//           </p>
//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight mb-8">
//             <span className="block">The Art of</span>
//             <span className="block text-primary">Exceptional Coffee</span>
//           </h1>
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
//             Hand-selected beans from the world's finest estates, expertly
//             roasted to unlock complex flavors and aromas that define luxury in
//             every cup.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="/shop"
//               className="btn-primary-lg transition-all duration-300 hover:scale-105"
//             >
//               Shop Now
//             </a>
//             <button
//               className="btn-outline-lg transition-all duration-300"
//               onClick={() =>
//                 document
//                   .getElementById("our-story")
//                   ?.scrollIntoView({ behavior: "smooth" })
//               }
//             >
//               Our Story
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* products */}
//       <section id="products" className="py-24 md:py-32 relative">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
//               Our Collection
//             </p>
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
//               Curated for Perfection
//             </h2>
//             <p className="text-muted-foreground text-lg leading-relaxed">
//               Each blend is meticulously crafted to deliver an extraordinary
//               coffee experience, from bean to cup.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="group bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden rounded-xl transition-all duration-500 hover:bg-card hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
//               >
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
//                   {p.badge && (
//                     <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
//                       {p.badge}
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center gap-1 mb-3">
//                     <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
//                       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                     </svg>
//                     <span className="text-sm text-muted-foreground">
//                       {p.rating}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
//                     {p.name}
//                   </h3>
//                   <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
//                     {p.desc}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold text-foreground">
//                       ${p.price}
//                     </span>
//                     <button
//                       onClick={() => addToCart(p)}
//                       className="btn-add-to-cart"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <a
//               href="/shop"
//               className="btn-outline-lg transition-all duration-300"
//             >
//               View All Products
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* our story */}
//       <section id="our-story" className="relative overflow-hidden">
//         <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
//           <div className="absolute inset-0">
//             <img
//               src="/static/images/about-coffee.jpg"
//               alt="story"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
//           </div>
//           <div className="relative z-10 container mx-auto px-6 text-center">
//             <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
//               Our Story
//             </p>
//             <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
//               A Legacy of <span className="text-primary">Excellence</span>
//             </h2>
//             <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
//               From the first sip to the last, every NOIR BREW experience is
//               crafted with passion, precision, and an uncompromising pursuit of
//               perfection.
//             </p>
//           </div>
//         </div>
//         <div className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/20">
//           <div className="container mx-auto px-6 max-w-5xl">
//             {[
//               {
//                 year: "2008",
//                 title: "The Origins",
//                 img: "/static/images/story-origin.jpg",
//                 text: "Our journey began in the misty highlands of Ethiopia, where we discovered our first exceptional lot of Yirgacheffe beans.",
//               },
//               {
//                 year: "2012",
//                 title: "The Craft",
//                 img: "/static/images/story-roasting.jpg",
//                 text: "We established our roastery with a singular focus: to honor each bean's unique character through meticulous roasting profiles.",
//               },
//               {
//                 year: "Today",
//                 title: "The Promise",
//                 img: "/static/images/story-craft.jpg",
//                 text: "Every cup of NOIR BREW represents our unwavering commitment to excellence, sustainability, and the belief that great coffee transforms ordinary moments.",
//               },
//             ].map((chapter, i) => (
//               <div
//                 key={chapter.year}
//                 className={`flex flex-col lg:flex-row ${i === 1 ? "lg:flex-row-reverse" : ""} gap-8 lg:gap-16 items-center mb-24`}
//               >
//                 <div className="relative w-full lg:w-1/2">
//                   <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
//                     <img
//                       src={chapter.img}
//                       alt={chapter.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
//                     <div className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
//                       <span className="text-primary-foreground font-semibold tracking-wider">
//                         {chapter.year}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-1/2 text-center lg:text-left">
//                   <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
//                     {chapter.title}
//                   </h3>
//                   <p className="text-muted-foreground text-lg leading-relaxed">
//                     {chapter.text}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* testimonials */}
//       <section
//         id="testimonials"
//         className="py-24 md:py-32 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
//         <div className="container mx-auto px-6 relative">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
//               Testimonials
//             </p>
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
//               What Our Customers Say
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Mitchell",
//                 role: "Coffee Enthusiast",
//                 text: "NOIR BREW has completely transformed my morning ritual. The depth of flavor in their Midnight Espresso is simply unmatched.",
//               },
//               {
//                 name: "James Chen",
//                 role: "Restaurant Owner",
//                 text: "As a chef, I appreciate the attention to detail. The Ethiopian Reserve has become our signature after-dinner coffee.",
//               },
//               {
//                 name: "Elena Rodriguez",
//                 role: "Food Blogger",
//                 text: "I've tried countless premium coffees, but NOIR BREW stands apart. The freshness, the aroma, the complexity of flavors.",
//               },
//             ].map((t) => (
//               <div
//                 key={t.name}
//                 className="group bg-card/50 border border-border/50 backdrop-blur-sm rounded-xl transition-all duration-500 hover:bg-card hover:border-primary/30 hover:shadow-2xl"
//               >
//                 <div className="p-8">
//                   <div className="flex gap-1 mb-4">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className="w-4 h-4 fill-primary"
//                         viewBox="0 0 24 24"
//                       >
//                         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                       </svg>
//                     ))}
//                   </div>
//                   <p className="text-foreground leading-relaxed mb-6">
//                     {t.text}
//                   </p>
//                   <div className="pt-6 border-t border-border/50">
//                     <p className="font-semibold text-foreground">{t.name}</p>
//                     <p className="text-sm text-muted-foreground">{t.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* newsletter */}
//       <section className="py-24 md:py-32 relative overflow-hidden">
//         <div className="container mx-auto px-6">
//           <div className="relative max-w-4xl mx-auto">
//             <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-16 overflow-hidden">
//               <div className="relative text-center">
//                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
//                   Join the NOIR BREW Club
//                 </h2>
//                 <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
//                   Subscribe for exclusive offers, brewing tips, and early access
//                   to our newest limited-edition roasts.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="flex-1 bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground h-12 px-4 rounded-lg outline-none transition-colors focus:border-primary"
//                   />
//                   <button className="btn-primary-lg h-12 px-6">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* footer */}
//       <footer className="bg-secondary/30 border-t border-border/50">
//         <div className="container mx-auto px-6 py-16">
//           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
//             <div className="lg:col-span-2">
//               <a href="/" className="inline-block mb-6">
//                 <span className="text-2xl font-serif font-bold tracking-wider text-foreground">
//                   NOIR BREW
//                 </span>
//               </a>
//               <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
//                 Experience the art of exceptional coffee. Hand-selected beans,
//                 expertly roasted for an unparalleled taste experience.
//               </p>
//             </div>
//             {[
//               {
//                 title: "Shop",
//                 links: [
//                   "All Products",
//                   "Best Sellers",
//                   "New Arrivals",
//                   "Subscriptions",
//                 ],
//               },
//               {
//                 title: "Company",
//                 links: ["About Us", "Our Story", "Careers", "Press"],
//               },
//               {
//                 title: "Support",
//                 links: ["Contact", "FAQ", "Shipping", "Returns"],
//               },
//             ].map((col) => (
//               <div key={col.title}>
//                 <h3 className="font-semibold text-foreground mb-4">
//                   {col.title}
//                 </h3>
//                 <ul className="space-y-3">
//                   {col.links.map((link) => (
//                     <li key={link}>
//                       <a
//                         href="#"
//                         className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
//                       >
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-sm text-muted-foreground">
//               © 2026 NOIR BREW. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import Navbar from "../components/Navbar";
// import Cart from "../components/Cart";
// import { useCart } from "../context/CartContext";

// const products = [
//   {
//     id: 1,
//     name: "Midnight Espresso",
//     desc: "Bold, intense, with notes of dark chocolate and caramel",
//     price: 32,
//     rating: 4.9,
//     image: "/static/images/coffee-1.jpg",
//     category: "espresso",
//     badge: "Best Seller",
//   },
//   {
//     id: 2,
//     name: "Ethiopian Reserve",
//     desc: "Fruity and floral with hints of bergamot and jasmine",
//     price: 38,
//     rating: 4.8,
//     image: "/static/images/coffee-2.jpg",
//     category: "espresso",
//     badge: "Single Origin",
//   },
//   {
//     id: 3,
//     name: "Cold Brew Blend",
//     desc: "Smooth, naturally sweet with subtle nutty undertones",
//     price: 28,
//     rating: 4.7,
//     image: "/static/images/coffee-3.jpg",
//     category: "cold-brew",
//     badge: "New Arrival",
//   },
// ];

// export default function Home() {
//   const { addToCart } = useCart();

//   return (
//     <div className="bg-background text-foreground">
//       <Navbar />
//       <Cart />

//       {/* hero */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src="http://127.0.0.1:8000/static/images/hero-coffee.jpg"
//             alt="hero"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
//           <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
//         </div>

//         <div className="relative z-10 container mx-auto px-6 pt-20 text-center max-w-4xl">
//           <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
//             Artisan Coffee Roasters
//           </p>
//           <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-8">
//             The Art of <br />
//             <span className="text-primary">Exceptional Coffee</span>
//           </h1>
//           <p
//             className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
//             style={{ marginBottom: "3rem" }}
//           >
//             Hand-selected beans from the world's finest estates, expertly
//             roasted to unlock complex flavors.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a href="/shop" className="btn-primary-lg">
//               Shop Now
//             </a>
//             <button
//               className="btn-outline-lg"
//               onClick={() =>
//                 document
//                   .getElementById("our-story")
//                   ?.scrollIntoView({ behavior: "smooth" })
//   }
//             >
//               Our Story
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* products */}
//       <section id="products" className="py-24 md:py-32">
//         <div className="container mx-auto px-6">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
//               Our Collection
//             </p>
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
//               Curated for Perfection
//             </h2>
//             <p className="text-muted-foreground text-lg leading-relaxed">
//               Each blend is meticulously crafted to deliver an extraordinary
//               experience.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="group bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden rounded-xl transition-all duration-500 hover:bg-card hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2"
//               >
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={`http://127.0.0.1:8000${p.image}`}
//                     alt={p.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
//                   {p.badge && (
//                     <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
//                       {p.badge}
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center gap-1 mb-3">
//                     <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
//                       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                     </svg>
//                     <span className="text-sm text-muted-foreground">
//                       {p.rating}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
//                     {p.name}
//                   </h3>
//                   <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
//                     {p.desc}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold text-foreground">
//                       ${p.price}
//                     </span>
//                     <button
//                       onClick={() => addToCart(p)}
//                       className="btn-add-to-cart"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <a href="/shop" className="btn-outline-lg">
//               View All Products
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* our story */}
//       <section id="our-story" className="py-24 md:py-32 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
//         <div className="container mx-auto px-6 relative text-center">
//           <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
//             Our Story
//           </p>
//           <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
//             A Legacy of <span className="text-primary">Excellence</span>
//           </h2>
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//             From the first sip to the last, every NOIR BREW experience is
//             crafted with passion and an uncompromising pursuit of perfection.
//           </p>
//         </div>
//       </section>

//     </div>
//     {/* footer */}
//       <footer className="bg-secondary/30 border-t border-border/50">
//         <div className="container mx-auto px-6 py-16">
//           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
//             <div className="lg:col-span-2">
//               <a href="/" className="inline-block mb-6">
//                 <span className="text-2xl font-serif font-bold tracking-wider text-foreground">NOIR BREW</span>
//               </a>
//               <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">Experience the art of exceptional coffee. Hand-selected beans, expertly roasted for an unparalleled taste experience.</p>
//             </div>
//             {[
//               { title: 'Shop', links: ['All Products', 'Best Sellers', 'New Arrivals', 'Subscriptions'] },
//               { title: 'Company', links: ['About Us', 'Our Story', 'Careers', 'Press'] },
//               { title: 'Support', links: ['Contact', 'FAQ', 'Shipping', 'Returns'] },
//             ].map(col => (
//               <div key={col.title}>
//                 <h3 className="font-semibold text-foreground mb-4">{col.title}</h3>
//                 <ul className="space-y-3">
//                   {col.links.map(link => (
//                     <li key={link}><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">{link}</a></li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-sm text-muted-foreground">© 2026 NOIR BREW. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//        </div>
//   )

// }

// // import Navbar from "../components/Navbar";
// // import Cart from "../components/Cart";
// // import { useCart } from "../context/CartContext";

// // const products = [
// //   {
// //     id: 1,
// //     name: "Midnight Espresso",
// //     desc: "Bold, intense, with notes of dark chocolate and caramel",
// //     price: 32,
// //     rating: 4.9,
// //     image: "/static/images/coffee-1.jpg",
// //     category: "espresso",
// //     badge: "Best Seller",
// //   },
// //   {
// //     id: 2,
// //     name: "Ethiopian Reserve",
// //     desc: "Fruity and floral with hints of bergamot and jasmine",
// //     price: 38,
// //     rating: 4.8,
// //     image: "/static/images/coffee-2.jpg",
// //     category: "espresso",
// //     badge: "Single Origin",
// //   },
// //   {
// //     id: 3,
// //     name: "Cold Brew Blend",
// //     desc: "Smooth, naturally sweet with subtle nutty undertones",
// //     price: 28,
// //     rating: 4.7,
// //     image: "/static/images/coffee-3.jpg",
// //     category: "cold-brew",
// //     badge: "New Arrival",
// //   },
// // ];

// // export default function Home() {
// //   const { addToCart } = useCart();

// //   return (
// //     <div
// //       style={{ background: "var(--background)", color: "var(--foreground)" }}
// //     >
// //       <Navbar />
// //       <Cart />

// //       {/* hero */}
// //       <section
// //         style={{
// //           position: "relative",
// //           minHeight: "100vh",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           overflow: "hidden",
// //         }}
// //       >
// //         <div style={{ position: "absolute", inset: 0 }}>
// //           <img
// //             src="/static/images/hero-coffee.jpg"
// //             alt="hero"
// //             style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //           />
// //           <div
// //             style={{
// //               position: "absolute",
// //               inset: 0,
// //               background:
// //                 "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), var(--background))",
// //             }}
// //           />
// //         </div>
// //         <div
// //           style={{
// //             position: "relative",
// //             zIndex: 10,
// //             maxWidth: "900px",
// //             margin: "0 auto",
// //             padding: "5rem 1.5rem 0",
// //             textAlign: "center",
// //           }}
// //         >
// //           <p
// //             style={{
// //               color: "var(--primary)",
// //               fontWeight: 500,
// //               letterSpacing: "0.3em",
// //               textTransform: "uppercase",
// //               fontSize: "0.875rem",
// //               marginBottom: "1.5rem",
// //             }}
// //           >
// //             Artisan Coffee Roasters
// //           </p>
// //           <h1
// //             style={{
// //               fontSize: "clamp(2.5rem, 8vw, 5rem)",
// //               fontFamily: "Playfair Display, serif",
// //               fontWeight: 700,
// //               color: "var(--foreground)",
// //               lineHeight: 1.1,
// //               marginBottom: "1.5rem",
// //             }}
// //           >
// //             The Art of <br />
// //             <span style={{ color: "var(--primary)" }}>Exceptional Coffee</span>
// //           </h1>
// //           <p
// //             style={{
// //               fontSize: "1.125rem",
// //               color: "var(--muted-foreground)",
// //               maxWidth: "600px",
// //               margin: "0 auto 3rem",
// //               lineHeight: 1.7,
// //             }}
// //           >
// //             Hand-selected beans from the world's finest estates, expertly
// //             roasted to unlock complex flavors and aromas.
// //           </p>
// //           <div
// //             style={{
// //               display: "flex",
// //               gap: "1rem",
// //               justifyContent: "center",
// //               flexWrap: "wrap",
// //             }}
// //           >
// //             <a href="/shop" className="btn-primary-lg">
// //               Shop Now
// //             </a>
// //             <button
// //               className="btn-outline-lg"
// //               onClick={() =>
// //                 document
// //                   .getElementById("our-story")
// //                   ?.scrollIntoView({ behavior: "smooth" })
// //               }
// //             >
// //               Our Story
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* products */}
// //       <section id="products" style={{ padding: "6rem 0" }}>
// //         <div
// //           style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}
// //         >
// //           <div
// //             style={{
// //               textAlign: "center",
// //               maxWidth: "600px",
// //               margin: "0 auto 4rem",
// //             }}
// //           >
// //             <p
// //               style={{
// //                 color: "var(--primary)",
// //                 fontWeight: 500,
// //                 letterSpacing: "0.2em",
// //                 textTransform: "uppercase",
// //                 fontSize: "0.875rem",
// //                 marginBottom: "1rem",
// //               }}
// //             >
// //               Our Collection
// //             </p>
// //             <h2
// //               style={{
// //                 fontSize: "clamp(2rem, 4vw, 3rem)",
// //                 fontFamily: "Playfair Display, serif",
// //                 fontWeight: 700,
// //                 color: "var(--foreground)",
// //                 marginBottom: "1rem",
// //               }}
// //             >
// //               Curated for Perfection
// //             </h2>
// //             <p
// //               style={{
// //                 color: "var(--muted-foreground)",
// //                 fontSize: "1.125rem",
// //                 lineHeight: 1.7,
// //               }}
// //             >
// //               Each blend is meticulously crafted to deliver an extraordinary
// //               experience.
// //             </p>
// //           </div>

// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// //               gap: "2rem",
// //             }}
// //           >
// //             {products.map((p) => (
// //               <div
// //                 key={p.id}
// //                 className="group"
// //                 style={{
// //                   background:
// //                     "color-mix(in oklch, var(--card) 50%, transparent)",
// //                   border:
// //                     "1px solid color-mix(in oklch, var(--border) 50%, transparent)",
// //                   borderRadius: "0.75rem",
// //                   overflow: "hidden",
// //                   transition: "all 500ms",
// //                 }}
// //                 onMouseOver={(e) => {
// //                   e.currentTarget.style.background = "var(--card)";
// //                   e.currentTarget.style.transform = "translateY(-8px)";
// //                   e.currentTarget.style.boxShadow =
// //                     "0 25px 50px color-mix(in oklch, var(--primary) 5%, transparent)";
// //                 }}
// //                 onMouseOut={(e) => {
// //                   e.currentTarget.style.background =
// //                     "color-mix(in oklch, var(--card) 50%, transparent)";
// //                   e.currentTarget.style.transform = "translateY(0)";
// //                   e.currentTarget.style.boxShadow = "none";
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     position: "relative",
// //                     aspectRatio: "4/3",
// //                     overflow: "hidden",
// //                   }}
// //                 >
// //                   <img
// //                     src={`http://127.0.0.1:8000${p.image}`}
// //                     alt={p.name}
// //                     style={{
// //                       width: "100%",
// //                       height: "100%",
// //                       objectFit: "cover",
// //                       transition: "transform 700ms",
// //                     }}
// //                     onMouseOver={(e) =>
// //                       (e.currentTarget.style.transform = "scale(1.1)")
// //                     }
// //                     onMouseOut={(e) =>
// //                       (e.currentTarget.style.transform = "scale(1)")
// //                     }
// //                   />
// //                   {p.badge && (
// //                     <span
// //                       style={{
// //                         position: "absolute",
// //                         top: "1rem",
// //                         left: "1rem",
// //                         background:
// //                           "color-mix(in oklch, var(--primary) 90%, transparent)",
// //                         color: "var(--primary-foreground)",
// //                         padding: "0.25rem 0.75rem",
// //                         fontSize: "0.75rem",
// //                         fontWeight: 500,
// //                         borderRadius: "9999px",
// //                       }}
// //                     >
// //                       {p.badge}
// //                     </span>
// //                   )}
// //                 </div>
// //                 <div style={{ padding: "1.5rem" }}>
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "0.25rem",
// //                       marginBottom: "0.75rem",
// //                     }}
// //                   >
// //                     <svg
// //                       style={{
// //                         width: "1rem",
// //                         height: "1rem",
// //                         fill: "var(--primary)",
// //                       }}
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
// //                     </svg>
// //                     <span
// //                       style={{
// //                         fontSize: "0.875rem",
// //                         color: "var(--muted-foreground)",
// //                       }}
// //                     >
// //                       {p.rating}
// //                     </span>
// //                   </div>
// //                   <h3
// //                     style={{
// //                       fontSize: "1.25rem",
// //                       fontFamily: "Playfair Display, serif",
// //                       fontWeight: 600,
// //                       color: "var(--foreground)",
// //                       marginBottom: "0.5rem",
// //                     }}
// //                   >
// //                     {p.name}
// //                   </h3>
// //                   <p
// //                     style={{
// //                       color: "var(--muted-foreground)",
// //                       fontSize: "0.875rem",
// //                       marginBottom: "1rem",
// //                       lineHeight: 1.6,
// //                     }}
// //                   >
// //                     {p.desc}
// //                   </p>
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "space-between",
// //                     }}
// //                   >
// //                     <span
// //                       style={{
// //                         fontSize: "1.5rem",
// //                         fontWeight: 700,
// //                         color: "var(--foreground)",
// //                       }}
// //                     >
// //                       ${p.price}
// //                     </span>
// //                     <button
// //                       onClick={() => addToCart(p)}
// //                       className="btn-add-to-cart"
// //                     >
// //                       Add to Cart
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div style={{ textAlign: "center", marginTop: "3rem" }}>
// //             <a href="/shop" className="btn-outline-lg">
// //               View All Products
// //             </a>
// //           </div>
// //         </div>
// //       </section>

// //       {/* about */}
// //       <section
// //         id="our-story"
// //         style={{
// //           padding: "6rem 0",
// //           background: "color-mix(in oklch, var(--secondary) 20%, transparent)",
// //         }}
// //       >
// //         <div
// //           style={{
// //             maxWidth: "1200px",
// //             margin: "0 auto",
// //             padding: "0 1.5rem",
// //             textAlign: "center",
// //           }}
// //         >
// //           <p
// //             style={{
// //               color: "var(--primary)",
// //               fontWeight: 500,
// //               letterSpacing: "0.2em",
// //               textTransform: "uppercase",
// //               fontSize: "0.875rem",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             Our Story
// //           </p>
// //           <h2
// //             style={{
// //               fontSize: "clamp(2rem, 4vw, 3.5rem)",
// //               fontFamily: "Playfair Display, serif",
// //               fontWeight: 700,
// //               color: "var(--foreground)",
// //               marginBottom: "1.5rem",
// //             }}
// //           >
// //             A Legacy of{" "}
// //             <span style={{ color: "var(--primary)" }}>Excellence</span>
// //           </h2>
// //           <p
// //             style={{
// //               color: "var(--muted-foreground)",
// //               fontSize: "1.125rem",
// //               maxWidth: "700px",
// //               margin: "0 auto",
// //               lineHeight: 1.8,
// //             }}
// //           >
// //             From the first sip to the last, every NOIR BREW experience is
// //             crafted with passion, precision, and an uncompromising pursuit of
// //             perfection.
// //           </p>
// //         </div>
// //       </section>

// //       {/* footer */}
// //       <footer
// //         style={{
// //           background: "color-mix(in oklch, var(--secondary) 30%, transparent)",
// //           borderTop:
// //             "1px solid color-mix(in oklch, var(--border) 50%, transparent)",
// //           padding: "3rem 1.5rem",
// //           textAlign: "center",
// //         }}
// //       >
// //         <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
// //           © 2026 NOIR BREW. All rights reserved.
// //         </p>
// //       </footer>
// //     </div>
// //   );
// // }
