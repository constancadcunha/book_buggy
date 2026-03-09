// === Catalogue Page Behaviour ===

let activeGenre = 'all';
let searchQuery = '';

function renderBooks() {
  const grid = document.getElementById('book-grid');
  const resultCount = document.getElementById('result-count');
  
  const q = searchQuery.toLowerCase();
  
  const filtered = BOOKS.filter(book => {
    // BUG 8: Search only checks title, ignores author
    const matchesSearch = !q || book.title.toLowerCase().includes(q);
    // Original was: const matchesSearch = !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    
    const matchesGenre = activeGenre === 'all' || book.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });
  
  // BUG 4: Result count never updates - it's hardcoded to "Showing 12 of 12 books"
  // resultCount.textContent = `Showing ${filtered.length} of ${BOOKS.length} books`;
  // (This line is removed, so the HTML static text remains)
  
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-results">No books found matching your criteria.</p>';
    return;
  }
  
  const cart = getCart();
  const cartIds = cart.map(item => item.id);
  
  grid.innerHTML = filtered.map(book => `
    <div class="book-card">
      <div class="book-cover" style="background: ${book.color}">
        <span>${book.title}</span>
      </div>
      <div class="book-info">
        <h2 class="book-title">${book.title}</h2>
        <p class="book-author">${book.author}</p>
        <span class="genre-badge badge-${book.genre}">${book.genre}</span>
        <p class="book-price">£${book.price.toFixed(2)}</p>
        <button 
          class="add-to-cart-btn ${cartIds.includes(book.id) ? 'added' : ''}" 
          data-id="${book.id}"
        >
          ${cartIds.includes(book.id) ? '+' : '+'}
        </button>
      </div>
    </div>
  `).join('');
}

// BUG 2 & 5: Toast never shows, button text is always "+", button never changes color
function showToast(message) {
  // BUG 2: Toast function does nothing
  // const toast = document.getElementById('toast');
  // toast.textContent = message;
  // toast.classList.add('show');
  // clearTimeout(window.toastTimeout);
  // window.toastTimeout = setTimeout(() => {
  //   toast.classList.remove('show');
  // }, 2400);
}

// Event: Add to cart
document.getElementById('book-grid').addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;
  
  const bookId = parseInt(btn.getAttribute('data-id'));
  const book = BOOKS.find(b => b.id === bookId);
  
  if (book) {
    addToCart(book);
    // BUG 2: No visual feedback - button doesn't change, no toast
    // btn.classList.add('added');
    // btn.textContent = 'Added ✓';
    // showToast(`${book.title} added to cart`);
    
    // BUG 5: Button text remains "+" always (already set in HTML template above)
  }
});

// Event: Search input
document.getElementById('search-input').addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  renderBooks();
});

// Event: Genre filter chips
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    // BUG 3: Chips don't highlight - .active class is added but CSS doesn't style it
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeGenre = chip.getAttribute('data-genre');
    renderBooks();
  });
});

// Initial render
updateCartCount();
renderBooks();
