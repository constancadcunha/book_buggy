/* ====================================================
   books.js — catalogue page logic
   ==================================================== */

let activeGenre = 'all';
let searchQuery = '';

function renderBooks() {
  const grid = document.getElementById('book-grid');
  const countEl = document.getElementById('result-count');

  const filtered = BOOKS.filter(book => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q);

    const matchesGenre =
      activeGenre === 'all' || book.genre === activeGenre;

    return matchesSearch && matchesGenre;
  });

  countEl.textContent = `Showing ${filtered.length} of ${BOOKS.length} books`;

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-results">No books match your search. Try a different term or genre.</p>';
    return;
  }

  grid.innerHTML = filtered.map(book => `
    <article class="book-card" data-id="${book.id}">
      <div class="book-cover" style="background:${book.color};">
        <span class="book-cover-title">${book.title}</span>
      </div>
      <div class="book-info">
        <h2 class="book-title">${book.title}</h2>
        <p class="book-author">${book.author}</p>
        <span class="genre-badge badge-${book.genre.replace(/\s/g, '-')}">${book.genre}</span>
        <p class="book-price">£${book.price.toFixed(2)}</p>
      </div>
      <button
        class="add-to-cart-btn"
        aria-label="Add ${book.title} to cart"
        data-id="${book.id}"
      >Add to Cart</button>
    </article>
  `).join('');

  // Mark already-in-cart buttons
  const cart = getCart();
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    const id = parseInt(btn.dataset.id, 10);
    if (cart.find(i => i.id === id)) {
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
    }
  });
}

// ---- Toast ----
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---- Add to cart handler ----
document.getElementById('book-grid').addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;

  const id = parseInt(btn.dataset.id, 10);
  const book = BOOKS.find(b => b.id === id);
  if (!book) return;

  addToCart(book);

  btn.textContent = 'Added ✓';
  btn.classList.add('added');

  showToast(`"${book.title}" added to cart`);
});

// ---- Search ----
document.getElementById('search-input').addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  renderBooks();
});

// ---- Genre filters ----
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeGenre = chip.dataset.genre;
    renderBooks();
  });
});

// ---- Init ----
updateCartCount();
renderBooks();
