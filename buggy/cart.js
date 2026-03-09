// === Shared Cart Logic ===
// Manages cart state in localStorage across all pages

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('folio_cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('folio_cart', JSON.stringify(cart));
}

function addToCart(book) {
  const cart = getCart();
  const existing = cart.find(item => item.id === book.id);
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  
  saveCart(cart);
  // BUG 1: Cart count never updates - removed updateCartCount() call
  // updateCartCount();  // This line is commented out!
}

function removeFromCart(bookId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== bookId);
  saveCart(cart);
  // BUG 1: Cart count never updates
  // updateCartCount();  // This line is commented out!
}

function updateQty(bookId, delta) {
  const cart = getCart();
  const item = cart.find(item => item.id === bookId);
  
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    saveCart(cart);
    // BUG 1: Cart count never updates
    // updateCartCount();  // This line is commented out!
  }
}

function cartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function cartItemCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// BUG 1: updateCartCount does nothing - it's been neutered
function updateCartCount() {
  // This function now does nothing, so the cart badge never updates
  // const count = cartItemCount();
  // const badges = document.querySelectorAll('#cart-count');
  // badges.forEach(badge => {
  //   badge.textContent = count;
  //   badge.setAttribute('data-count', count);
  // });
}

function clearCart() {
  localStorage.removeItem('folio_cart');
  // BUG 1: Cart count never updates
  // updateCartCount();  // This line is commented out!
}
