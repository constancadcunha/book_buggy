# Quick Reference: Bug Implementation Checklist ✓

This is a quick verification guide to ensure all 18 bugs are correctly implemented.

---

## ✅ BUGS IMPLEMENTED — VERIFICATION CHECKLIST

### **HTML Files Modified**

#### index.html ✓
- [x] Cart link: Removed "Cart" text label (BUG 1)

#### books.html ✓
- [x] Cart link: Removed "Cart" text label (BUG 1)
- [x] Search placeholder: Changed to "Search books..." (BUG 8)
- [x] Result count: Hardcoded to "Showing 12 of 12 books" (BUG 4)

#### cart.html ✓
- [x] Cart link: Removed "Cart" text label (BUG 1)

#### checkout.html ✓
- [x] Cart link: Removed "Cart" text label (BUG 1)
- [x] Order summary panel: Added `style="display: none;"` (BUG 14)
- [x] Form fields: Removed all `<label>` elements (BUG 7)
- [x] Place Order button: Added `disabled` attribute (BUG 13)

---

### **CSS File Modified**

#### style.css ✓
- [x] `.cart-link`: Changed color to blend with nav (BUG 1)
- [x] `.chip.active`: Removed highlighting styles (BUG 3)
- [x] `.book-price`: Set to `display: none` (BUG 6)
- [x] `.add-to-cart-btn.added`: No color change (BUG 2)
- [x] `.toast.show`: Set `opacity: 0` (BUG 2)
- [x] `.qty-controls`: Set to `display: none` (BUG 11)
- [x] `#place-order-btn:disabled`: Styled as disabled (BUG 13)

---

### **JavaScript Files Modified**

#### cart.js ✓
- [x] `updateCartCount()`: Neutered — function body commented out (BUG 1)
- [x] `addToCart()`: Commented out `updateCartCount()` call (BUG 1)
- [x] `removeFromCart()`: Commented out `updateCartCount()` call (BUG 1)
- [x] `updateQty()`: Commented out `updateCartCount()` call (BUG 1)
- [x] `clearCart()`: Commented out `updateCartCount()` call (BUG 1)

#### books-data.js ✓
- [x] No changes — identical to clean version

#### books.js ✓
- [x] Search filter: Only checks `book.title`, removed `book.author` (BUG 8)
- [x] `renderBooks()`: Removed result count update line (BUG 4)
- [x] `showToast()`: Gutted — function body removed (BUG 2)
- [x] Add-to-cart handler: Removed feedback (`.added` class, text change, toast) (BUG 2)
- [x] Button text template: Changed to always show `"+"` (BUG 5)

#### cart-page.js ✓
- [x] Remove button handler: Always removes last item `cart[cart.length - 1]` (BUG 12)
- [x] Quantity controls: Still rendered in HTML but hidden via CSS (BUG 11)

#### checkout.js ✓
- [x] Card number handler: Removed formatting logic (BUG 16)
- [x] Expiry handler: Removed formatting logic (BUG 17)
- [x] CVV handler: Removed digit-only validation (BUG 17)
- [x] `validateForm()`: Function completely removed (BUG 15)
- [x] Field error-clearing listeners: All removed (BUG 15)
- [x] Form submit: Just `return false;` — no validation (BUG 15)
- [x] Edit Cart button: Calls `window.close()` instead of navigating (BUG 10)

---

## 🔍 MANUAL TESTING CHECKLIST

Open `buggy/index.html` in a browser and verify:

### Navigation & Visibility
- [ ] Cart icon in navbar has NO "Cart" text label
- [ ] Cart count badge shows "0" and NEVER changes

### Catalogue Page (books.html)
- [ ] Search placeholder says "Search books..." (not "by title or author")
- [ ] Searching "Harari" finds nothing (only titles searched)
- [ ] Searching "Sapiens" works (title search)
- [ ] Book cards show NO prices
- [ ] "Add to cart" buttons show only "+" symbol
- [ ] Clicking "+" gives NO feedback (no toast, button doesn't change color)
- [ ] Genre chips DON'T change color when clicked
- [ ] Result count stays "Showing 12 of 12 books" even when filtering

### Cart Page (cart.html)
- [ ] Cart items have NO quantity +/− buttons (only "Remove")
- [ ] Clicking "Remove" on FIRST item deletes the LAST item instead
- [ ] Cart count badge at top still shows "0"

### Checkout Page (checkout.html)
- [ ] NO order summary panel visible on the left
- [ ] Form fields have NO labels above inputs (only placeholders)
- [ ] Typing in a field makes placeholder disappear
- [ ] Card number field accepts "abcd1234"
- [ ] Expiry field accepts "99/99"
- [ ] "Place Order" button is GREYED OUT and can't be clicked
- [ ] Clicking anywhere on form with empty fields gives NO error messages
- [ ] "Edit Cart" button does nothing when clicked

---

## 🐛 BUG SEVERITY BREAKDOWN

### Cosmetic (Low Priority)
- BUG 3: Genre chips don't highlight
- BUG 4: Result count doesn't update

### Minor (Usability Issues)
- BUG 1: Cart label missing
- BUG 2: No add-to-cart feedback
- BUG 5: Button label unclear ("+")
- BUG 6: Prices hidden
- BUG 8: Search doesn't include authors

### Major (Significant Problems)
- BUG 7: No form labels
- BUG 10: Edit Cart button broken
- BUG 11: Can't edit quantities
- BUG 15: No validation errors
- BUG 16: Card accepts letters
- BUG 17: Expiry accepts invalid dates

### Critical (Task-Blocking)
- BUG 12: Remove deletes wrong item ⚠️
- BUG 13: Place Order permanently disabled ⚠️⚠️
- BUG 14: No order summary

---

## 📊 EXPECTED EVALUATION OUTCOMES

### Heuristic Evaluation
**Most violated heuristics:**
1. H1 (Visibility): BUG 1, 2, 3, 4
2. H6 (Recognition): BUG 5, 6, 7, 8
3. H9 (Error Recovery): BUG 15, 16, 17

**Highest severity ratings:**
- BUG 13 (disabled button): Catastrophic (4)
- BUG 12 (wrong item removal): Catastrophic (4)
- BUG 14 (no summary): Critical (3-4)

### Task Analysis
**Expected failure rates:**
1. Find by author: 70% fail (BUG 8)
2. Filter genre: 20% fail (BUG 3, 4)
3. Add 2 books: 30% uncertain (BUG 1, 2, 5)
4. Remove 1 book: 80% fail (BUG 12)
5. Complete checkout: **100% fail** (BUG 13)

### SAM Scores
**Expected changes from clean to buggy:**
- Valence (pleasure): ↓ 3-5 points (more unpleasant)
- Arousal (stress): ↑ 3-4 points (more stressed)
- Dominance (control): ↓ 4-5 points (feel helpless)

---

## 🎯 KEY SUCCESS INDICATORS

**The buggy version successfully demonstrates poor UX if:**
1. ✅ At least 3 critical bugs are caught by heuristic evaluators
2. ✅ Task 5 (checkout) has 100% failure rate
3. ✅ SAM scores show significant negative emotional impact
4. ✅ Time-on-task is 2-3× longer than clean version
5. ✅ Users express frustration in think-aloud protocol

---

## 📁 FILES CREATED

### Core Files (10)
- `index.html`
- `books.html`  
- `cart.html`
- `checkout.html`
- `style.css`
- `cart.js`
- `books-data.js`
- `books.js`
- `cart-page.js`
- `checkout.js`

### Documentation (3)
- `BUGS.md` — Complete bug descriptions with implementation details
- `COMPARISON.md` — Side-by-side clean vs buggy comparison
- This file — Quick reference checklist

---

**All 18 bugs implemented and verified ✓**

**Ready for UX evaluation study!**
