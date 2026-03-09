/* ====================================================
   checkout.js — order summary + form validation
   ==================================================== */

const DELIVERY = 2.99;

function fmt(n) { return '£' + n.toFixed(2); }

// ---- Populate order summary ----
function renderSummary() {
  const cart = getCart();
  const list = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('co-subtotal');
  const deliveryEl = document.getElementById('co-delivery');
  const totalEl = document.getElementById('co-total');

  if (cart.length === 0) {
    list.innerHTML = '<li style="color:var(--ink-soft);font-size:.85rem;">Your cart is empty.</li>';
    subtotalEl.textContent = fmt(0);
    deliveryEl.textContent = '—';
    totalEl.textContent = fmt(0);
    return;
  }

  list.innerHTML = cart.map(item => `
    <li class="checkout-item">
      <span class="checkout-item-name">${item.title}</span>
      <span class="checkout-item-qty">×${item.qty}</span>
      <span class="checkout-item-price">${fmt(item.price * item.qty)}</span>
    </li>
  `).join('');

  const subtotal = cartTotal();
  const delivery = subtotal >= 30 ? 0 : DELIVERY;
  subtotalEl.textContent = fmt(subtotal);
  deliveryEl.textContent = delivery === 0 ? 'Free' : fmt(delivery);
  totalEl.textContent = fmt(subtotal + delivery);
}

// ---- Card number formatting ----
document.getElementById('card-number').addEventListener('input', e => {
  // Strip non-digits
  let digits = e.target.value.replace(/\D/g, '').slice(0, 16);
  // Insert spaces every 4 digits
  e.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
});

// ---- Expiry formatting ----
document.getElementById('expiry').addEventListener('input', e => {
  let val = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
  e.target.value = val;
});

// ---- CVV — digits only ----
document.getElementById('cvv').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
});

// ---- Validation helpers ----
function setError(fieldId, errId, message) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errId);
  if (message) {
    field.classList.add('invalid');
    err.textContent = message;
  } else {
    field.classList.remove('invalid');
    err.textContent = '';
  }
  return !message;
}

function validateForm() {
  let valid = true;

  const name = document.getElementById('full-name').value.trim();
  if (!setError('full-name', 'err-full-name', name ? '' : 'Full name is required.')) valid = false;

  const email = document.getElementById('email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!setError('email', 'err-email', emailOk ? '' : 'Please enter a valid email address.')) valid = false;

  const address = document.getElementById('address').value.trim();
  if (!setError('address', 'err-address', address ? '' : 'Street address is required.')) valid = false;

  const city = document.getElementById('city').value.trim();
  if (!setError('city', 'err-city', city ? '' : 'City is required.')) valid = false;

  const postal = document.getElementById('postal').value.trim();
  if (!setError('postal', 'err-postal', postal ? '' : 'Postal code is required.')) valid = false;

  // Card number: 16 digits (spaces allowed)
  const cardRaw = document.getElementById('card-number').value.replace(/\s/g, '');
  const cardOk = /^\d{16}$/.test(cardRaw);
  if (!setError('card-number', 'err-card-number', cardOk ? '' : 'Please enter a valid 16-digit card number.')) valid = false;

  // Expiry: MM/YY, month 01-12, year >= current year
  const expiry = document.getElementById('expiry').value.trim();
  const expiryMatch = /^(\d{2})\/(\d{2})$/.test(expiry);
  let expiryOk = false;
  if (expiryMatch) {
    const [mm, yy] = expiry.split('/').map(Number);
    const now = new Date();
    const currentYY = now.getFullYear() % 100;
    const currentMM = now.getMonth() + 1;
    expiryOk = mm >= 1 && mm <= 12 && (yy > currentYY || (yy === currentYY && mm >= currentMM));
  }
  if (!setError('expiry', 'err-expiry', expiryOk ? '' : 'Please enter a valid expiry date (MM/YY).')) valid = false;

  // CVV: 3 digits
  const cvv = document.getElementById('cvv').value.trim();
  const cvvOk = /^\d{3}$/.test(cvv);
  if (!setError('cvv', 'err-cvv', cvvOk ? '' : 'CVV must be 3 digits.')) valid = false;

  return valid;
}

// Clear error on input
['full-name','email','address','city','postal','card-number','expiry','cvv'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const errEl = document.getElementById('err-' + id);
    if (errEl) errEl.textContent = '';
    document.getElementById(id).classList.remove('invalid');
  });
});

// ---- Form submit ----
document.getElementById('checkout-form').addEventListener('submit', e => {
  e.preventDefault();

  if (!validateForm()) {
    // Scroll to first error
    const firstInvalid = document.querySelector('.field-group input.invalid');
    if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Success
  clearCart();
  document.getElementById('checkout-form').hidden = true;
  document.getElementById('success-message').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Init ----
updateCartCount();
renderSummary();
