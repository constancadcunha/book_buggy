# Folio & Co. Bookshop — Bug Comparison Guide

This document provides a side-by-side comparison of the **clean** and **buggy** versions to help evaluators understand exactly what differs between the two versions.

---

## Quick Reference: Where Each Bug Lives

| Bug # | Page | Component | Type |
|-------|------|-----------|------|
| 1 | All pages | Cart icon & badge | Visibility |
| 2 | books.html | Add to cart feedback | Visibility |
| 3 | books.html | Genre filter chips | Visibility |
| 4 | books.html | Result count | Visibility |
| 5 | books.html | Add to cart button label | Recognition |
| 6 | books.html | Book price display | Recognition |
| 7 | checkout.html | Form field labels | Recognition |
| 8 | books.html | Search functionality | Recognition |
| 10 | checkout.html | Edit Cart button | Control |
| 11 | cart.html | Quantity controls | Control |
| 12 | cart.html | Remove button logic | Critical |
| 13 | checkout.html | Place Order button | Critical |
| 14 | checkout.html | Order summary panel | Critical |
| 15 | checkout.html | Form validation | Error handling |
| 16 | checkout.html | Card number formatting | Error handling |
| 17 | checkout.html | Expiry validation | Error handling |

---

## File-by-File Changes

### **index.html**
| Element | Clean Version | Buggy Version |
|---------|---------------|---------------|
| Cart link | `<svg>` + `<span>Cart</span>` + badge | `<svg>` + badge only (no "Cart" text) |

### **books.html**  
| Element | Clean Version | Buggy Version |
|---------|---------------|---------------|
| Search placeholder | "Search by title or author…" | "Search books..." |
| Result count | Updates dynamically | Static: "Showing 12 of 12 books" |

### **cart.html**
| Element | Clean Version | Buggy Version |
|---------|---------------|---------------|
| Cart link | Has "Cart" label | No "Cart" label |

### **checkout.html**
| Element | Clean Version | Buggy Version |
|---------|---------------|---------------|
| Order summary panel | Visible (default) | `style="display: none;"` |
| Form fields | All have `<label>` elements | No `<label>` elements (only placeholders) |
| Place Order button | Enabled | `disabled` attribute added |

---

### **style.css**

| CSS Rule | Clean Version | Buggy Version |
|----------|---------------|---------------|
| `.cart-link` | `.cart-label` styled distinctly, accent color | Same color as nav links, blends in |
| `.chip.active` | Red background, white text | **Rule removed** — no visual difference |
| `.book-price` | `display: block` | `display: none` |
| `.add-to-cart-btn.added` | Green background, checkmark | **Same as default** — stays red |
| `.toast.show` | `opacity: 1`, visible | `opacity: 0` — invisible |
| `.qty-controls` | `display: flex` | `display: none` |

---

### **cart.js**

| Function | Clean Version | Buggy Version |
|----------|---------------|---------------|
| `addToCart()` | Calls `updateCartCount()` at end | **Call commented out** |
| `removeFromCart()` | Calls `updateCartCount()` at end | **Call commented out** |
| `updateQty()` | Calls `updateCartCount()` at end | **Call commented out** |
| `updateCartCount()` | Updates all cart badges with current count | **Function body commented out** — does nothing |
| `clearCart()` | Calls `updateCartCount()` at end | **Call commented out** |

---

### **books-data.js**
✅ **Identical** — no changes

---

### **books.js**

| Section | Clean Version | Buggy Version |
|---------|---------------|---------------|
| Search filter | `book.title.includes(q) \|\| book.author.includes(q)` | `book.title.includes(q)` only |
| Result count update | `resultCount.textContent = ...` | **Line removed** |
| `showToast()` | Shows toast for 2.4s | **Function body removed** — does nothing |
| Add to cart handler | Adds `.added` class, changes text to "Added ✓", calls `showToast()` | **All feedback logic removed** |
| Button text template | `"Add to Cart"` / `"Added ✓"` | `"+"` always |

---

### **cart-page.js**

| Section | Clean Version | Buggy Version |
|---------|---------------|---------------|
| Remove button handler | `removeFromCart(bookId)` using clicked button's `data-id` | **Always removes last item**: `cart[cart.length - 1]` |
| Quantity controls markup | Rendered and visible | Rendered but **hidden via CSS** |

---

### **checkout.js**

| Section | Clean Version | Buggy Version |
|---------|---------------|---------------|
| `renderSummary()` | Populates order summary panel | Same (but panel is hidden in HTML) |
| Card number input handler | Strips non-digits, formats with spaces | **Handler removed** |
| Expiry input handler | Strips non-digits, formats MM/YY | **Handler removed** |
| CVV input handler | Strips non-digits, max 3 | **Handler removed** |
| `validateForm()` | Validates all 8 fields, returns true/false | **Function removed entirely** |
| Field error clearing | Each field has `input` listener to clear `.invalid` | **All listeners removed** |
| Form submit handler | Calls `validateForm()`, shows errors or clears cart | **Just returns false silently** |
| Edit Cart button | Navigates to `cart.html` | Calls `e.preventDefault()` then `window.close()` (fails) |
| Place Order button | Enabled by default | **`disabled` in HTML** |

---

## Testing Checklist for Evaluators

Use this checklist to confirm you're seeing all the bugs:

### Visibility Bugs
- [ ] Cart icon has no "Cart" label text
- [ ] Cart count badge never changes (stays at 0 even after adding books)
- [ ] Clicking "+" on a book gives no feedback (no toast, button stays same)
- [ ] Genre filter chips don't change color when clicked
- [ ] "Showing X of 12 books" stays at 12 even when filtering

### Recognition Bugs
- [ ] "Add to cart" button is just a "+" symbol
- [ ] Book prices are missing from catalogue cards
- [ ] Checkout form fields have no labels (only placeholders that vanish)
- [ ] Search finds "Sapiens" but not "Harari" (author ignored)

### Control Bugs
- [ ] Cart items have no quantity +/− buttons (only "Remove")
- [ ] "Edit Cart" button in checkout does nothing when clicked

### Critical Bugs
- [ ] Removing the first book in cart deletes the last one instead
- [ ] "Place Order" button is greyed out and can't be clicked
- [ ] Checkout page shows no order summary (right panel missing)

### Error Handling Bugs
- [ ] Clicking "Place Order" (if enabled) with empty fields does nothing — no error messages
- [ ] Card number field accepts "abcd1234"
- [ ] Expiry field accepts "99/99"

---

## Expected Metrics

### Task Completion Rates (Clean vs Buggy)

| Task | Clean | Buggy | Blocking Bugs |
|------|-------|-------|---------------|
| Find book by author | 100% | ~30% | BUG 8 |
| Filter by genre | 100% | ~80% | BUG 3, 4 (non-blocking but confusing) |
| Add 2 books to cart | 100% | ~70% | BUG 1, 2, 5 (causes uncertainty) |
| Remove specific book | 100% | ~20% | **BUG 12 (critical)** |
| Complete checkout | 100% | **0%** | **BUG 13 (critical)** |

### Expected Time-on-Task Increase
- **Clean**: ~3-5 minutes for all 5 tasks
- **Buggy**: ~8-15 minutes (many give up on tasks 4 & 5)

### Expected SAM Scores
- **Clean**: Valence = 7-8 (pleasant), Arousal = 3-4 (calm), Dominance = 7-8 (in control)
- **Buggy**: Valence = 2-4 (unpleasant), Arousal = 7-8 (stressed), Dominance = 2-3 (helpless)

---

## Running the Study

### Setup
1. **Clean URL**: `book_buggy/index.html` (root folder)  
2. **Buggy URL**: `book_buggy/buggy/index.html` (buggy subfolder)

### Procedure (Within-Subjects Design)
1. **Session A** — Clean version:
   - Complete 5 tasks
   - Fill SAM survey
   - Clear localStorage: `localStorage.clear()`
2. **Break** (5-10 minutes)
3. **Session B** — Buggy version:
   - Complete same 5 tasks
   - Fill SAM survey
   - Heuristic evaluation (if using expert evaluators)

### Data to Collect
- ✅ Task completion (success/fail per task)
- ✅ Time per task
- ✅ Error count (clicks that don't achieve intent)
- ✅ SAM ratings (1-9 scale: valence, arousal, dominance)
- ✅ Heuristic violations (evaluator notes)

---

**End of Comparison Guide**
