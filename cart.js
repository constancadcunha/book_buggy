/* ====================================================
   cart.js — shared cart utilities (localStorage)
   ==================================================== */

const CART_KEY = 'folio_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
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
  updateCartCount();
}

function removeFromCart(bookId) {
  const cart = getCart().filter(item => item.id !== bookId);
  saveCart(cart);
  updateCartCount();
}

function updateQty(bookId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === bookId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter(i => i.id !== bookId));
  } else {
    saveCart(cart);
  }
  updateCartCount();
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const count = cartItemCount();
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
    el.dataset.count = count;
  });
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}
