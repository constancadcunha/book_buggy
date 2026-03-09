// === Checkout Page Behaviour ===

function renderSummary() {
  const cart = getCart();
  const list = document.getElementById('checkout-items');
  
  if (cart.length === 0) {
    list.innerHTML = '<li style="padding: 20px; text-align: center; color: #767676;">Your cart is empty</li>';
    document.getElementById('co-subtotal').textContent = '£0.00';
    document.getElementById('co-delivery').textContent = '—';
    document.getElementById('co-total').textContent = '£0.00';
    return;
  }
  
  list.innerHTML = cart.map(item => `
    <li class="checkout-item">
      <span class="item-name">${item.title}</span>
      <span class="item-qty">×${item.qty}</span>
      <span class="item-price">£${(item.price * item.qty).toFixed(2)}</span>
    </li>
  `).join('');
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const delivery = subtotal >= 30 ? 0 : 2.99;
  const total = subtotal + delivery;
  
  document.getElementById('co-subtotal').textContent = `£${subtotal.toFixed(2)}`;
  document.getElementById('co-delivery').textContent = delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`;
  document.getElementById('co-total').textContent = `£${total.toFixed(2)}`;
}

// BUG 16: Card number input accepts anything, no formatting
// (Original had formatting logic here - now removed)
// BUG 17: Expiry input accepts anything, including 99/99
// (Original had formatting logic here - now removed)

// BUG 15: No validation logic at all
// The validateForm function is removed entirely

// All field error-clearing listeners are removed (BUG 15)
// In the original, each input had an event listener to clear errors on typing

// BUG 10: Edit Cart button breaks instead of going back
const editCartBtn = document.getElementById('edit-cart-btn');
if (editCartBtn) {
  editCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // BUG 10: Instead of navigating to cart.html, it does something wrong
    // Let's make it attempt to close the window (which won't work in most browsers, causing confusion)
    window.close(); // This will fail in most contexts, leaving user confused
  });
}

// Form submit
const form = document.getElementById('checkout-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // BUG 15: No validation - form does nothing when submitted with empty fields
    // Just return silently, no error messages, no feedback
    // (In the original, validateForm() would run and show errors)
    
    // The form just sits there, no feedback
    return false;
  });
}

// BUG 13: Place Order button is disabled in HTML and can never be clicked anyway

// Initial render
updateCartCount();
renderSummary();
