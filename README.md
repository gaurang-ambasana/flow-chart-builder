## Live Hosted

https://flow-chart-builder-six.vercel.app/

## Installation

1. Clone or unzip the repository.
2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Start Development Server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Optionally: Run the build

   ```bash
   npm run build
   # or
   yarn build
   ```

   Once done.

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open http://localhost:3000 in your browser.

## 📐 Design & Building Choices

To make sure this application is fast, reliable, and easy to use, I made a few key decisions on the tools I used behind the scenes:

### 1. Why Next.js? (The Foundation)

Building a modern web app from absolute scratch requires setting up a lot of "plumbing" just to get a blank screen to load.

- **The Choice:** I used Next.js as the foundation for this project.
- **The Benefit:** Next.js is like a pre-packaged toolbox. It handles all the background setup and organization automatically so I could focus 100% of my time on building the actual visual flow features.

### 2. Why Zustand? (Keeping the App Fast)

When a user drags a shape across the screen, the application has to track its exact location dozens of times per second. If we used standard methods, the entire screen (including the side menus) would try to "refresh" with every tiny mouse movement. This makes applications feel very slow and glitchy.

- **The Choice:** I used a lightweight tool called Zustand to act as a central "control room" for managing the app's data.
- **The Benefit:** Zustand is smart enough to only update the exact part of the screen that needs to change (like the drawing board). The side menus ignore the movement, which keeps the app lightning fast.

### 3. Why React Flow? (The Interactive Canvas)

Building a drag-and-drop board from scratch—where connecting lines automatically stretch, bend, and stay attached to boxes as you move them—may take weeks of complex math and coding.

- **The Choice:** I used an industry-standard library called React Flow to power the main drawing board.
- **The Benefit:** React Flow handles all the heavy lifting of the canvas. It automatically takes care of zooming in and out, panning across the screen, and drawing the connecting lines. This allowed me to focus on building the specific features required for this assignment, rather than reinventing the wheel.

---