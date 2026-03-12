// === Cart Page Behaviour ===

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Browse our collection and add some books</p>
        <a href="books.html" class="btn btn-primary">Browse Books</a>
      </div>
    `;
    document.getElementById('subtotal').textContent = '£0.00';
    document.getElementById('delivery').textContent = '—';
    document.getElementById('total').textContent = '£0.00';
    checkoutBtn.style.pointerEvents = 'none';
    checkoutBtn.style.opacity = '0.5';
    return;
  }
  
  // Re-enable checkout button
  checkoutBtn.style.pointerEvents = 'auto';
  checkoutBtn.style.opacity = '1';
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const delivery = subtotal >= 30 ? 0 : 2.99;
  const total = subtotal + delivery;
  
  document.getElementById('subtotal').textContent = `£${subtotal.toFixed(2)}`;
  document.getElementById('delivery').textContent = delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`;
  document.getElementById('total').textContent = `£${total.toFixed(2)}`;
  
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-cover" style="background: ${item.color}">
        <span>${item.title}</span>
      </div>
      <div class="cart-item-meta">
        <h3>${item.title}</h3>
        <p>${item.author}</p>
        <span class="price-each">£${item.price.toFixed(2)} each</span>
      </div>
      <div class="cart-item-actions">
        <span class="item-total">£${(item.price * item.qty).toFixed(2)}</span>
        
        <!-- BUG 11: Quantity controls are hidden via CSS, but HTML is still here -->
        <div class="qty-controls">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
        
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join('');
}

// Event delegation for cart actions
document.getElementById('cart-items').addEventListener('click', e => {
  // BUG 12: Remove button always deletes the last item, not the clicked one
  if (e.target.closest('.remove-btn')) {
    const cart = getCart();
    if (cart.length > 0) {
      // Always remove the LAST item in the cart array, ignoring the clicked item
      const lastItem = cart[cart.length - 1];
      removeFromCart(lastItem.id);
      renderCart();
    }
    return;
  }
  
  // Quantity controls are hidden anyway (BUG 11), but keep the logic
  const qtyBtn = e.target.closest('.qty-btn');
  if (qtyBtn) {
    const bookId = parseInt(qtyBtn.getAttribute('data-id'));
    const action = qtyBtn.getAttribute('data-action');
    const delta = action === 'inc' ? 1 : -1;
    updateQty(bookId, delta);
    renderCart();
  }
});

// Initial render
updateCartCount();
renderCart();
