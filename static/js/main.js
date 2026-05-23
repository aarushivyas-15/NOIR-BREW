// ─── CART STATE ───
let cartItems = [];

// ─── HEADER SCROLL ───
// ─── HEADER SCROLL ───
window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  if (!header) return;
  if (window.scrollY > 50) {
    header.style.background = "var(--background)";
    header.style.borderBottom =
      "1px solid color-mix(in oklch, var(--border) 50%, transparent)";
  } else {
    header.style.background = "transparent";
    header.style.borderBottom = "none";
  }
});
window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  if (window.scrollY > 50) {
    header.style.background = "var(--background)";
    header.style.borderBottom = "1px solid var(--border)";
  } else {
    header.style.background = "transparent";
    header.style.borderBottom = "none";
  }
});

// ─── MOBILE MENU ───
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");
  const isOpen = menu.classList.contains("open");
  if (isOpen) {
    menu.classList.remove("open");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  } else {
    menu.classList.add("open");
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  }
}
function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");
  menu.classList.remove("open");
  menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
}

// ─── CART FUNCTIONS ───
function openCart() {
  const sidebar = document.getElementById("cart-sidebar");
  const backdrop = document.getElementById("cart-backdrop");
  sidebar.classList.remove("translate-x-full");
  backdrop.classList.remove("opacity-0", "pointer-events-none");
  backdrop.classList.add("opacity-100");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const sidebar = document.getElementById("cart-sidebar");
  const backdrop = document.getElementById("cart-backdrop");
  sidebar.classList.add("translate-x-full");
  backdrop.classList.add("opacity-0", "pointer-events-none");
  backdrop.classList.remove("opacity-100");
  document.body.style.overflow = "";
}

function addToCart(id, name, price, image, category) {
  const existing = cartItems.find((i) => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ id, name, price, image, category, quantity: 1 });
  }
  updateCartUI();
  openCart();

  // POST to backend
  fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, price, image, category, quantity: 1 }),
  }).catch(() => {});
}

function removeItem(id) {
  cartItems = cartItems.filter((i) => i.id !== id);
  updateCartUI();
  fetch(`/api/cart/${id}`, { method: "DELETE" }).catch(() => {});
}

function updateQty(id, delta) {
  const item = cartItems.find((i) => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cartItems = cartItems.filter((i) => i.id !== id);
  }
  updateCartUI();
}

function clearCart() {
  cartItems = [];
  updateCartUI();
  fetch("/api/cart", { method: "DELETE" }).catch(() => {});
}

function updateCartUI() {
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  // Badge
  document.getElementById("cart-badge").textContent = totalItems;

  // Header count
  const headerCount = document.getElementById("header-cart-count");
  if (totalItems > 0) {
    headerCount.textContent = totalItems;
    headerCount.classList.remove("hidden");
    headerCount.classList.add("flex");
  } else {
    headerCount.classList.add("hidden");
    headerCount.classList.remove("flex");
  }

  const emptyEl = document.getElementById("cart-empty");
  const listEl = document.getElementById("cart-list");
  const footerEl = document.getElementById("cart-footer");

  if (cartItems.length === 0) {
    emptyEl.classList.remove("hidden");
    listEl.classList.add("hidden");
    footerEl.classList.add("hidden");
    return;
  }

  emptyEl.classList.add("hidden");
  listEl.classList.remove("hidden");
  footerEl.classList.remove("hidden");

  listEl.innerHTML = cartItems
    .map(
      (item) => `
    <div class="flex gap-4 p-4 rounded-xl border" style="background-color: color-mix(in oklch, var(--muted) 30%, transparent); border-color: color-mix(in oklch, var(--border) 50%, transparent);">
      <div class="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="flex-1" style="min-width:0;">
        <h3 style="font-weight:500;color:var(--foreground);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</h3>
        <p style="font-size:0.875rem;color:var(--muted-foreground);text-transform:capitalize;">${item.category.replace("-", " ")}</p>
        <p style="color:var(--primary);font-weight:600;margin-top:0.25rem;">$${item.price.toFixed(2)}</p>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;">
        <button onclick="removeItem(${item.id})" style="padding:0.25rem;border:none;background:none;color:var(--muted-foreground);cursor:pointer;border-radius:0.25rem;transition:color 200ms;" onmouseover="this.style.color='var(--destructive)'" onmouseout="this.style.color='var(--muted-foreground)'">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
        <div style="display:flex;align-items:center;gap:0.5rem;background-color:var(--muted);border-radius:0.5rem;">
          <button onclick="updateQty(${item.id},-1)" style="padding:0.375rem;border:none;background:none;cursor:pointer;color:var(--foreground);border-radius:0.375rem 0 0 0.375rem;transition:background 200ms;" onmouseover="this.style.background='var(--background)'" onmouseout="this.style.background='none'">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span style="font-size:0.875rem;font-weight:500;width:1.5rem;text-align:center;">${item.quantity}</span>
          <button onclick="updateQty(${item.id},1)" style="padding:0.375rem;border:none;background:none;cursor:pointer;color:var(--foreground);border-radius:0 0.375rem 0.375rem 0;transition:background 200ms;" onmouseover="this.style.background='var(--background)'" onmouseout="this.style.background='none'">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  document.getElementById("cart-subtotal").textContent =
    `$${totalPrice.toFixed(2)}`;
  document.getElementById("cart-total").textContent =
    `$${totalPrice.toFixed(2)}`;
}

// ─── NEWSLETTER ───
function handleSubscribe() {
  const input = document.getElementById("newsletter-email");
  const btn = document.getElementById("subscribe-btn");
  const text = document.getElementById("subscribe-text");
  const arrow = document.getElementById("subscribe-arrow");
  const check = document.getElementById("subscribe-check");

  const email = input.value.trim();
  if (!email || !email.includes("@")) {
    input.style.borderColor = "oklch(0.577 0.245 27.325)";
    setTimeout(() => {
      input.style.borderColor = "";
    }, 1500);
    return;
  }

  btn.disabled = true;
  text.textContent = "Subscribed";
  arrow.classList.add("hidden");
  check.classList.remove("hidden");
  input.value = "";

  fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).catch(() => {});

  setTimeout(() => {
    btn.disabled = false;
    text.textContent = "Subscribe";
    arrow.classList.remove("hidden");
    check.classList.add("hidden");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("newsletter-email");
  if (emailInput) {
    emailInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSubscribe();
    });
  }
});

// ─── FADE-UP SCROLL ANIMATION ───
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
});
