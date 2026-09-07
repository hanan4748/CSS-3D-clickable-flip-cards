# 3D Interactive Flip Cards

> Created for **Task 1** of the Lime-Light Internship Programme.

👉 **[View the Live Demo](https://hanan4748.github.io/CSS-3D-clickable-flip-cards/)**

---

## About the Project

This project is an interactive showcase built around **pure CSS 3D flip cards**. 

Instead of a flat product display, each card can be clicked to smoothly turn around in 3D space, revealing detailed engineering specifications and pre-order options on the back.

The showcase features three futuristic gadgets from the **Aether Spatial Series**:

- 🎧 **Aether Auralis X1** — Spatial audio headphones with hybrid active noise cancellation and ultra-low latency.
- ⌚ **Titan Chrono V2** — A titanium kinetic smartwatch with a holographic micro-OLED dial and biometric sensors.
- 👓 **Aether Optix Pro** — Ultra-light augmented reality glasses featuring dual 4K waveguide displays.

---

## How It Works

The core flip effect is built with **pure CSS / SCSS** and works without needing JavaScript:

1. **The Checkbox Trick**: Each card contains a hidden `<input type="checkbox">`. The buttons are `<label>` elements linked to the checkbox. Clicking a button toggles the checkbox on or off.
2. **The 3D Flip**: The card container has `perspective: 1600px` to create real depth. When the checkbox is `:checked`, CSS rotates the card with `transform: rotateY(180deg)`.
3. **Two-Sided Faces**: Both faces use `backface-visibility: hidden;` and `transform-style: preserve-3d;`, ensuring you only see the side currently facing you.
4. **Floating Layers (`translateZ`)**: Inner titles, badges, and buttons use `transform: translateZ(...)` so they pop out toward you in physical layers during the animation.

### Extra Polish (via `script.js`)
- **Procedural Sound**: Generates a soft sci-fi swoosh when cards flip using the Web Audio API (no external MP3 files required).
- **Subtle Mouse Tilt**: Tilts slightly with your cursor to highlight the layered 3D depth.
- **Keyboard Friendly**: You can tab through the cards and flip them using the `Enter` or `Space` key.
- **Quick Controls**: Includes buttons to flip or reset all cards at once.

---

## Project Structure

```text
CSS-3D-clickable-flip-cards/
├── index.html         # Semantic markup with the pure CSS checkbox mechanism
├── style.scss         # Source SCSS with variables, nesting, and 3D transforms
├── style.css          # Compiled CSS ready for all browsers and GitHub Pages
├── script.js          # Progressive enhancements (audio, mouse tilt, keyboard support)
├── .nojekyll          # Ensures GitHub Pages serves all assets directly
└── assets/
    └── images/        # High-resolution product images
        ├── headphones.jpg
        ├── smartwatch.jpg
        └── arglasses.jpg
```

---

## Testing on CodePen

If you want to view or modify this project on [CodePen](https://codepen.io/):

1. Paste the HTML into the **HTML** editor.
2. Click the gear icon next to **CSS**, set the **CSS Preprocessor** to **SCSS**, and paste the contents of `style.scss`.
3. The 3D interactive flip cards will run instantly.
