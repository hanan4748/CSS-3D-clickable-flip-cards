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

---
