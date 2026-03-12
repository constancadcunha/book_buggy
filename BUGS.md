# Folio & Co. — Buggy Version

## Complete Bug Documentation

This is the **buggy version** of the Folio & Co. bookshop. It contains **18 intentional usability bugs** designed for user experience evaluation using Heuristic Evaluation, Task Analysis, and Self-Assessment Manikin (SAM).

---

## File Structure

```
buggy/
├── index.html           — Homepage
├── books.html           — Catalogue page
├── cart.html            — Shopping cart
├── checkout.html        — Checkout form
├── style.css            — All styles (shared)
├── cart.js              — Cart logic (localStorage)
├── books-data.js        — 12 book objects
├── books.js             — Catalogue behaviour
├── cart-page.js         — Cart page behaviour
└── checkout.js          — Checkout behaviour
```

---

## The 18 Bugs (Mapped to Evaluation Methods)

### **Visibility / Feedback Bugs** (Nielsen Heuristic #1)

**BUG 1: Cart icon has no label, count badge never updates**
- **Location**: All pages — navbar
- **Implementation**: 
  - HTML: Removed `<span class="cart-label">Cart</span>` from the cart link
  - CSS: Made cart icon same color as other nav links (blends in)
  - JS (`cart.js`): `updateCartCount()` function is neutered — does nothing
  - All calls to `updateCartCount()` are commented out in `addToCart()`, `removeFromCart()`, `updateQty()`, `clearCart()`
- **Impact**: Users have no visual feedback when items are added; can't easily tell where the cart is

**BUG 2: Adding a book gives zero feedback**
- **Location**: `books.html` — catalogue grid
- **Implementation**:
  - JS (`books.js`): `showToast()` function is gutted — does nothing
  - Button never changes text or color after clicking (`.added` class not applied)
  - CSS: `.toast.show` has `opacity: 0` — always invisible
- **Impact**: Users don't know if their click worked

**BUG 3: Genre filter chips don't visually highlight when selected**
- **Location**: `books.html` — genre filters
- **Implementation**:
  - CSS (`style.css`): Removed `.chip.active` styling
  - JS still adds `.active` class, but CSS does nothing with it
- **Impact**: Users can't tell which filter is active

**BUG 4: Book count never updates when filtering**
- **Location**: `books.html` — result count text
- **Implementation**:
  - HTML: Hardcoded to "Showing 12 of 12 books"
  - JS (`books.js`): Line that updates `resultCount.textContent` is removed
- **Impact**: Static count provides no feedback when search/filter narrows results

---

### **Recognition / Labelling Bugs** (Nielsen Heuristic #6)

**BUG 5: "Add to Cart" button is just a "+" symbol**
- **Location**: `books.html` — book cards
- **Implementation**:
  - JS (`books.js`): Button text is always `"+"` in the template
  - No tooltip or aria-label
- **Impact**: Button purpose is unclear to new users

**BUG 6: Book prices hidden on catalogue cards**
- **Location**: `books.html` — book cards
- **Implementation**:
  - CSS (`style.css`): `.book-price { display: none; }`
- **Impact**: Users can't see prices until they open the cart

**BUG 7: Checkout form has no labels, only placeholder text**
- **Location**: `checkout.html` — all form fields
- **Implementation**:
  - HTML: All `<label>` elements removed from the form
  - Only `placeholder` attributes remain
- **Impact**: When user starts typing, placeholder disappears and they lose context about what field they're filling

**BUG 8: Search placeholder misleading, only searches titles**
- **Location**: `books.html` — search input
- **Implementation**:
  - HTML: Placeholder changed from "Search by title or author…" to "Search books..."
  - JS (`books.js`): Search filter only checks `book.title.toLowerCase().includes(q)`, ignores `book.author`
- **Impact**: Users expect to search authors but it silently fails

---

### **Control / Navigation Bugs** (Nielsen Heuristics #3 & #4)

**BUG 9: (Merged with BUG 1 — search input works but users might think it doesn't due to lack of feedback)**
- This bug was originally "search button is greyed out" but the original design had no search button
- The lack of result count updates (BUG 4) serves this purpose

**BUG 10: "Edit Cart" button in checkout tries to close window instead of navigating**
- **Location**: `checkout.html` — order summary panel
- **Implementation**:
  - JS (`checkout.js`): `editCartBtn` listener calls `e.preventDefault()` then `window.close()`
  - `window.close()` fails in most browsers (security restriction) — button does nothing, confusing user
- **Impact**: User is trapped on checkout page, can't go back to edit cart

**BUG 11: No way to edit cart quantity**
- **Location**: `cart.html` — cart items
- **Implementation**:
  - CSS (`style.css`): `.qty-controls { display: none; }`
  - HTML still renders the +/− buttons, but they're invisible
- **Impact**: Users can only remove items entirely, can't adjust quantity

---

### **Critical Task-Breaking Bugs**

**BUG 12: Remove button always deletes the last item in cart, not the clicked one**
- **Location**: `cart.html` — remove button
- **Implementation**:
  - JS (`cart-page.js`): Click handler ignores `data-id` from clicked button
  - Always gets cart array and removes `cart[cart.length - 1]` (last item)
- **Impact**: Users trying to remove "Book A" might see "Book B" disappear instead — extremely confusing

**BUG 13: Checkout "Place Order" button is permanently disabled**
- **Location**: `checkout.html` — submit button
- **Implementation**:
  - HTML: `<button type="submit" ... disabled>`
  - JS never enables it
- **Impact**: **Impossible to complete purchase** — total task failure

**BUG 14: No order summary shown before payment**
- **Location**: `checkout.html` — order summary panel
- **Implementation**:
  - HTML: `<aside class="order-summary-panel" style="display: none;">`
  - Entire left panel is hidden
- **Impact**: Users have no idea what they're paying for, can't verify their order

---

### **Error Handling Bugs** (Nielsen Heuristic #9)

**BUG 15: Submitting checkout with empty fields gives no error message**
- **Location**: `checkout.html` — form validation
- **Implementation**:
  - JS (`checkout.js`): Entire `validateForm()` function removed
  - Form submit handler just calls `return false;` silently
  - No inline error messages, no `.invalid` class applied, no scrolling to errors
- **Impact**: Form appears broken — clicks do nothing, no feedback

**BUG 16: Card number field accepts letters and random characters, no formatting**
- **Location**: `checkout.html` — card number input
- **Implementation**:
  - JS (`checkout.js`): Input event handler for card formatting removed
  - Original stripped non-digits and added spaces every 4 chars — now does nothing
- **Impact**: No input validation, accepts "abcd1234" as card number

**BUG 17: No validation on expiry date, accepts 99/99**
- **Location**: `checkout.html` — expiry input
- **Implementation**:
  - JS (`checkout.js`): Expiry formatting and validation removed
  - Original validated month (01-12) and year (≥ current) — now accepts anything
- **Impact**: Invalid dates like "99/99" or "00/00" accepted without warning

---

### **Emotional / SAM Triggers**

**BUG 18: (Covered by BUG 6 + BUG 13)**
- **Prices hidden until cart** (BUG 6) → creates uncertainty, raises user anxiety
- **Disabled checkout button** (BUG 13) → creates helplessness and frustration
- These two bugs specifically drive up **arousal** (stress) and **displeasure** on the SAM scale

---

## Expected Task Analysis Results

### **The 5 Tasks:**

1. **Find a book by a specific author using search**
   - **Clean version**: Works ✓
   - **Buggy version**: BUG 8 — search ignores authors, task fails or takes much longer

2. **Filter books by "Science" genre**
   - **Clean version**: Works ✓
   - **Buggy version**: BUG 3 (no visual feedback), BUG 4 (count never updates) — task succeeds but with higher error rate and time

3. **Add two books to cart**
   - **Clean version**: Works ✓
   - **Buggy version**: BUG 2 (no feedback), BUG 1 (cart count doesn't update), BUG 5 (unclear button) — task succeeds but with uncertainty

4. **Remove one specific book from cart**
   - **Clean version**: Works ✓
   - **Buggy version**: **BUG 12 (critical)** — removes wrong item, task fails or requires multiple attempts

5. **Complete checkout with details**
   - **Clean version**: Works ✓
   - **Buggy version**: **BUG 13 (critical)** — button disabled, **total task failure**
   - Also: BUG 7 (no labels), BUG 14 (no summary), BUG 15 (no validation), BUG 16/17 (no input formatting)

---

## Heuristic Evaluation Coverage

| Nielsen Heuristic | Bugs |
|------------------|------|
| H1: Visibility of system status | BUG 1, 2, 3, 4 |
| H3: User control & freedom | BUG 10, 11 |
| H4: Consistency & standards | BUG 8 (search behavior inconsistent with label) |
| H6: Recognition over recall | BUG 5, 6, 7, 8 |
| H9: Error prevention & recovery | BUG 15, 16, 17 |

Plus **critical usability failures** (BUG 12, 13, 14) that would be flagged under severity ratings.

---

## How to Use This Version

1. Open `buggy/index.html` in any browser (no server needed)
2. All cart state persists in `localStorage` (key: `folio_cart`)
3. To reset cart: Open browser DevTools → Console → `localStorage.clear()`

---

## Bug Severity Classification

### **Cosmetic (1):**
- BUG 3, 4

### **Minor (2):**
- BUG 1 (cart label), BUG 2, BUG 5, BUG 6, BUG 8

### **Major (3):**
- BUG 7, BUG 10, BUG 11, BUG 15, BUG 16, BUG 17

### **Catastrophic (4):**
- BUG 12 (removes wrong item), BUG 13 (order impossible), BUG 14 (no order visibility)

---

## Comparison with Clean Version

To see the difference:
- **Clean version**: Open `/Users/constancacunha/book_buggy/index.html` (root folder)
- **Buggy version**: Open `/Users/constancacunha/book_buggy/buggy/index.html` (this folder)

Both look **visually identical** at first glance — only interaction reveals the bugs.

---

**End of Bug Documentation**
