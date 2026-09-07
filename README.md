# AETHER // Next-Gen Spatial Hardware
## CSS 3D Clickable Flip Cards (Lime-Light TechLead Internship — Task 1)

[![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-brightgreen)](https://pages.github.com/)
[![CSS 3D](https://img.shields.io/badge/CSS-3D%20Transforms-blue)](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)
[![SCSS](https://img.shields.io/badge/Preprocessor-SCSS-pink)](https://sass-lang.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Task 1 Assignment**: Design and implement interactive CSS 3D clickable flip cards to promote/advertise a product of choice, study GitHub Pages deployment, and host the live project.

---

## 🌟 Live Demo & Preview
- **Live GitHub Pages URL**: `https://<your-github-username>.github.io/<your-repo-name>/`
- **CodePen Ready**: Both `style.scss` (for CodePen with SCSS Preprocessor) and `style.css` (compiled vanilla CSS) are provided.

---

## 🚀 Product Concept: AETHER Flagship Hardware Series
A futuristic showcase for three bleeding-edge spatial computing and bio-kinetic wearables:
1. **Aether Auralis X1** — Spatial Neuro-Acoustic Headset with Planar-Bio drivers, hybrid ANC, and lossless quantum link.
2. **Titan Chrono V2** — Grade 5 titanium DLC kinetic smartwatch with holographic Micro-OLED dial and satellite telemetry.
3. **Aether Optix Pro** — Neural augmented reality smart glasses with dual 4K holographic waveguides in a 42g titanium frame.

---

## 🧠 Technical Architecture & CSS 3D Mechanics

The core 3D flip card mechanism is implemented using **100% Pure CSS / SCSS** with zero required JavaScript:

### 1. The Pure CSS Checkbox State Hack
```html
<article class="flip-card">
  <!-- Invisible state controller -->
  <input type="checkbox" id="card-1" class="flip-toggle" />
  
  <div class="card-content">
    <!-- FRONT FACE -->
    <div class="card-front">
      ...
      <label for="card-1" class="flip-btn">Explore Tech Specs</label>
    </div>

    <!-- BACK FACE -->
    <div class="card-back">
      ...
      <label for="card-1" class="return-btn">Return to Overview</label>
    </div>
  </div>
</article>
```

### 2. 3D Perspective & Preservation
- **`perspective: 1600px`**: Establishes the 3D viewing frustum on the card container.
- **`transform-style: preserve-3d`**: Propagates the 3D space from the card down to child elements.
- **`backface-visibility: hidden`**: Hides the opposing face when turned away from the camera.

```scss
.flip-card {
  perspective: 1600px;

  .flip-toggle {
    display: none;

    // Flip the card when checked
    &:checked ~ .card-content {
      transform: rotateY(180deg);
    }
  }

  .card-content {
    transform-style: preserve-3d;
    transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .card-front, .card-back {
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .card-back {
    transform: rotateY(180deg);
  }
}
```

### 3. Multi-Layer 3D Parallax (`translateZ`)
To make the cards feel genuinely tactile in physical 3D space:
- Inner content containers use `transform: translateZ(60px)` to float forward from the card plane.
- Floating tags and buttons use `transform: translateZ(40px)` and elevate to `translateZ(50px)` on hover.

### 4. Progressive Enhancements (in `script.js`)
- **Web Audio API Synth**: Procedural audio swoop on flip (no external media dependencies).
- **Subtle Mouse Parallax**: Tasteful gyro/mouse tilt that enhances the multi-layer depth.
- **Keyboard Accessibility**: Full Spacebar and Enter key support on `<label>` elements.
- **Quick Controls**: "Flip All Cards" and "Reset to Front" toolbar for testing and review.

---

## 🛠️ How to Test on CodePen

1. Open [CodePen](https://codepen.io/pen/).
2. Paste the contents of `index.html` (the `<main>` container or full markup) into the **HTML** panel.
3. In the **CSS** panel:
   - Click the gear icon (Settings).
   - In **CSS Preprocessor**, select **SCSS**.
   - Paste the contents of `style.scss`.
4. Click **Save & Close** to preview the live 3D animation.

---

## 🌐 How to Deploy to GitHub Pages (Mandatory Requirement)

Follow these steps to deploy and submit to Egon:

### Step 1: Initialize Git and Commit
Open PowerShell / Terminal in this project directory:
```bash
git init
git add .
git commit -m "Task 1: CSS 3D clickable flip cards with responsive design and SCSS"
```

### Step 2: Create a New GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g. `css-3d-flip-cards` or `aether-flip-cards`).
3. Set visibility to **Public**.
4. Click **Create repository**.

### Step 3: Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. On GitHub, go to your repository **Settings**.
2. In the left navigation, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Branch**:
   - Select `main` branch.
   - Select `/ (root)` folder.
   - Click **Save**.
4. Wait 1–2 minutes, then refresh the page. You will see:
   > *"Your site is live at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`"*

---

## 📩 Task 1 Submission Format

When responding back to Egon:
```text
Dear Egon and Mentors,

I have completed Task 1: CSS 3D Clickable Flip Cards.

- GitHub Repository: https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>
- Live GitHub Pages Demo: https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/

Project Highlights:
- Built with pure CSS/SCSS 3D transforms, perspective, and the checkbox hack.
- Feature multi-layer 3D parallax depth with translateZ.
- Promotes the "Aether Spatial Hardware" series (headphones, smartwatch, AR glasses).
- Fully responsive across mobile, tablet, and desktop viewports.
- Enhanced with keyboard accessibility and zero-dependency procedural audio synthesis.

Best regards,
[Your Name]
```
