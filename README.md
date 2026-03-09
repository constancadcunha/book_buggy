# Folio & Co.

A simple bookshop app built for UX evaluation. There are two versions: one that works properly and one that's deliberately broken with 18 usability bugs.

- Root directory: clean, working version
- `buggy/` directory: broken version for testing

## Running it

Just open `index.html` (or `buggy/index.html`) in a browser. No server needed. Cart data saves to localStorage.

To clear the cart: open console and run `localStorage.clear()`

## What it's for

This is for comparing UX evaluation methods on the same interface. The study uses three approaches:
- Heuristic evaluation (Nielsen's heuristics)
- Task analysis (completion rates, time, errors)
- Self-assessment manikin (emotional response)

Participants try to complete 5 tasks:
1. Find a book by searching for the author's name
2. Filter books by the "Science" genre
3. Add two books to cart
4. Remove one specific book from cart
5. Complete checkout

## The bugs

Full documentation in `buggy/BUGS.md`. Summary:


**Visibility/feedback issues:**
- Cart badge never updates when you add items
- No feedback when clicking "Add to cart" (no animation, no message)
- Genre filter buttons don't show which one is active
- Book count stays at "12" even when you filter

**Labeling problems:**
- "Add to cart" button is just a "+" with no label
- Prices are hidden on book cards (only visible in cart)
- Form fields have no labels, just placeholder text that disappears
- Search says "Search books..." but only searches titles, not authors

**Broken controls:**
- Can't change item quantities in cart, only delete
- "Edit cart" button on checkout doesn't work

**Critical failures:**
- Clicking "Remove" on an item deletes the wrong book
- "Place order" button is disabled and can't be clicked (checkout impossible)
- Order summary doesn't show before payment

**Missing validation:**
- No error messages on checkout form
- Card number field accepts letters
- Expiry accepts invalid dates like "99/99"

The critical bugs mean tasks 4 and 5 mostly fail in the buggy version.

## What's different between versions

See `buggy/COMPARISON.md` for a detailed comparison. Short version:

**HTML changes:**
- Removed "Cart" text label from navbar
- Removed all `<label>` tags from checkout form
- Hidden the order summary panel
- Disabled the checkout button

**CSS changes:**
- Made cart icon same color as other nav links (blends in)
- Removed active state styling for genre filters
- Hid book prices with `display: none`
- Made toast notifications invisible
- Hid quantity controls

**JavaScript changes:**
- Gutted `updateCartCount()` so it does nothing
- Made search only check book titles
- Removed all add-to-cart feedback (toast, button state)
- Made remove button always delete the last item instead of the clicked one
- Stripped out all form validation

## Tech stack

Plain HTML, CSS, and JavaScript. No frameworks. Uses localStorage for the cart.

## Expected results

Task completion in buggy version:
- Find by author: ~30% (search doesn't check authors)
- Filter by genre: ~80% (works but confusing)
- Add 2 books: ~70% (works but users aren't sure it worked)
- Remove item: ~20% (removes wrong item)
- Checkout: 0% (button disabled)

The buggy version should take 2-3x longer and score much worse on emotional response measures.

## Files

Clean version (root):
- 4 HTML pages
- 1 CSS file
- 5 JS files

Buggy version (buggy/):
- Same structure
- Plus BUGS.md, COMPARISON.md, and CHECKLIST.md

Only `books-data.js` is identical between versions.
