/* ====================================================
   cart-page.js — cart page rendering & interactions
   ==================================================== */

const DELIVERY = 2.99;

function fmt(n) {
  return '£' + n.toFixed(2);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const deliveryEl = document.getElementById('delivery-cost');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <p style="margin-top:.75rem;"><a href="books.html">Browse our books →</a></p>
      </div>`;
    subtotalEl.textContent = fmt(0);
    deliveryEl.textContent = '—';
    totalEl.textContent = fmt(0);
    checkoutBtn.style.pointerEvents = 'none';
    checkoutBtn.style.opacity = '0.5';
    return;
  }

  checkoutBtn.style.pointerEvents = '';
  checkoutBtn.style.opacity = '';

  const subtotal = cartTotal();
  const delivery = subtotal >= 30 ? 0 : DELIVERY;
  const total = subtotal + delivery;

  subtotalEl.textContent = fmt(subtotal);
  deliveryEl.textContent = delivery === 0 ? 'Free' : fmt(delivery);
  totalEl.textContent = fmt(total);

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-cover" style="background:${item.color};">
        ${item.title}
      </div>
      <div class="cart-item-meta">
        <p class="cart-item-title">${item.title}</p>
        <p class="cart-item-author">${item.author}</p>
        <p class="cart-item-price">${fmt(item.price)} each</p>
      </div>
      <div class="cart-item-actions">
        <p class="item-total">${fmt(item.price * item.qty)}</p>
        <div class="qty-controls" aria-label="Quantity for ${item.title}">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-display" aria-live="polite">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}" aria-label="Remove ${item.title} from cart">Remove</button>
      </div>
    </div>
  `).join('');
}

// ---- Event delegation ----
document.getElementById('cart-items').addEventListener('click', e => {
  const removeBtn = e.target.closest('.remove-btn');
  if (removeBtn) {
    const id = parseInt(removeBtn.dataset.id, 10);
    removeFromCart(id);
    renderCart();
    return;
  }

  const qtyBtn = e.target.closest('.qty-btn');
  if (qtyBtn) {
    const id = parseInt(qtyBtn.dataset.id, 10);
    const delta = qtyBtn.dataset.action === 'inc' ? 1 : -1;
    updateQty(id, delta);
    renderCart();
  }
});

// ---- Init ----
updateCartCount();
renderCart();
