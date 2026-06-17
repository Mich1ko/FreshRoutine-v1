# Guide: Implementing Watermark Illustrations in Cards

This guide outlines the professional design and implementation steps for adding faded background illustrations (watermarks) behind card content. This pattern creates a rich, premium aesthetic (as seen in dashboard headers, Pomodoro widgets, and Day Agenda cards) without interfering with text readability or user interactivity.

---

## 💡 The Core Technique

To place an illustration behind a card's content, we use CSS absolute positioning and stacking contexts. The formula is:

1. **Card Container**: Must be `relative` and `overflow-hidden`.
2. **Card Content**: Must be wrapped in a container that sits above the watermark (`relative z-10`).
3. **Watermark Illustration**: Must be absolute-positioned, layered below the content (`absolute z-0`), set to ignore click events (`pointer-events-none`), and set to a low opacity (typically `5%` to `15%`).

---

## 🛠️ Step-by-Step Implementation Guide

Here is exactly how to build it using Tailwind CSS:

### Step 1: Prepare the Card Container
The card container needs to contain the watermark and prevent it from spilling outside the card's rounded borders.
- Add `relative` so absolute-positioned children align to this card.
- Add `overflow-hidden` to mask any part of the illustration that extends beyond the card's edges.

```jsx
<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  {/* Content and watermark will go here */}
</div>
```

### Step 2: Layer the Interactive Content
If content sits directly on top of an absolute-positioned element, sometimes browser click events can hit the image instead of your text or buttons.
- Wrap all your text, inputs, and buttons in a single wrapper div.
- Add `relative z-10` to this wrapper to guarantee it sits on top.

```jsx
<div className="relative z-10">
  <h3 className="text-lg font-bold">Card Title</h3>
  <p className="text-sm text-slate-500">Interactive content goes here...</p>
  <button className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg">Action</button>
</div>
```

### Step 3: Insert the Faded Watermark Illustration
Now, place the SVG or image directly inside the card container (next to your content wrapper).
- Add `absolute` to position it freely.
- Add `z-0` to layer it behind the content wrapper (`z-10`).
- Add `pointer-events-none` **(CRITICAL)**: This makes the image invisible to click/mouse events, ensuring users can still highlight text or click buttons directly over the illustration.
- Add `select-none` so the image cannot be accidentally dragged or selected by the user.
- Add a low opacity like `opacity-10` ($10\%$ opacity) or custom Tailwind class like `opacity-[0.08]` ($8\%$ opacity) to keep it subtle.
- Size and position it (e.g. `right-0 bottom-0 w-32 h-32`).

```jsx
{/* Watermark Illustration */}
<div className="absolute right-0 bottom-0 z-0 pointer-events-none select-none opacity-[0.08] text-amber-500">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="128" 
    height="128" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    {/* SVG paths representing your illustration */}
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
</div>
```

---

## ⚡ Tailwind CSS Class Cheat Sheet

| Class | Purpose | Why it matters |
| :--- | :--- | :--- |
| `relative` | Context Anchor | Tells the absolute watermark to position itself relative to this card. |
| `overflow-hidden` | Boundary Mask | Clips any illustration that is oversized or offset. |
| `absolute` | Out of Flow | Lifts the image out of the document flow so it doesn't push text away. |
| `z-0` / `z-10` | Layering | Controls the depth (Z-axis). Low Z-index goes behind. |
| `pointer-events-none` | Click-through | Allows user clicks to pass straight through the image to underlying buttons or text. |
| `select-none` | No Selection | Prevents blue highlighting overlays when users double-click near it. |
| `opacity-5` to `opacity-15` | Subtlety | Fades the illustration into the background so it is not distracting. |

---

## 🎨 Complete Component Examples

### 1. Todo List Card (With Clipboard Illustration)
```jsx
export function TodoCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white px-5 py-4 shadow-sm">
      
      {/* 1. Content on top */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Todo List</span>
          <h3 className="text-base font-semibold text-slate-800 mt-1">Today's Priorities</h3>
          <p className="text-xs text-slate-400 mt-1">Track your important tasks.</p>
        </div>
        
        <div className="mt-4 flex gap-2">
          <input type="text" className="flex-1 text-xs border rounded-lg px-3 py-2" placeholder="Add task..." />
          <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-medium">Add</button>
        </div>
      </div>

      {/* 2. Faded Watermark behind content */}
      <div className="absolute -right-4 -bottom-4 z-0 pointer-events-none select-none opacity-[0.06] text-indigo-900">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      </div>

    </div>
  );
}
```

### 2. Pomodoro Card (With Timer Illustration)
```jsx
export function PomodoroCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white px-5 py-4 shadow-sm">
      
      {/* 1. Content on top */}
      <div className="relative z-10">
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Pomodoro</span>
        <h3 className="text-base font-semibold text-slate-800 mt-1">Focus Cycle</h3>
        
        <div className="my-6 text-center">
          <span className="text-3xl font-bold text-slate-700">25:00</span>
        </div>
        
        <div className="flex justify-center gap-2">
          <button className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold">Start</button>
          <button className="border text-slate-500 px-4 py-1.5 rounded-lg text-xs">Pause</button>
        </div>
      </div>

      {/* 2. Faded Watermark behind content */}
      <div className="absolute -right-6 -top-6 z-0 pointer-events-none select-none opacity-[0.08] text-orange-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <px path d="M12 6v6l4 2" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4 12H2" />
          <path d="M22 12h-2" />
        </svg>
      </div>

    </div>
  );
}
```

---

## 🖼️ Method 2: Faded Raster Images (PNG / JPG / External SVGs)

If you are using a raster graphic (like a custom PNG, illustration image file, or an external SVG file) instead of inline code, a professional developer uses **CSS Masking** or a **Gradient Overlay** to create a smooth, feathered fade-out effect.

### Approach A: CSS Masking (Modern & Background-Agnostic)
This is the gold standard used by senior developers. By using CSS `mask-image`, you make the image itself transparent towards the edges. This works flawlessly even if your card has a dark mode, a gradient background, or a textured layout.

#### Tailwind CSS Implementation:
```jsx
export function CustomImageCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      
      {/* 1. Content */}
      <div className="relative z-10">
        <h3>Card Content</h3>
      </div>

      {/* 2. Watermark Image with CSS Mask Fade */}
      <img
        src="/illustrations/clock.png"
        alt=""
        className="absolute -right-4 -bottom-4 w-40 h-40 z-0 opacity-[0.07] pointer-events-none select-none object-contain
                   [mask-image:linear-gradient(to_top_left,rgba(0,0,0,1)_20%,rgba(0,0,0,0)_100%)]
                   [-webkit-mask-image:linear-gradient(to_top_left,rgba(0,0,0,1)_20%,rgba(0,0,0,0)_100%)]"
      />
      
    </div>
  );
}
```

*   **How the mask works**: The `linear-gradient(to top left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)` tells the browser: "Make the bottom-right corner (fully visible/opaque) and gradually fade it to 0 opacity (fully transparent) towards the top-left corner."
*   **Arbitrary Class Syntax**: Tailwind allows inline CSS arbitrary values like `[mask-image:...]` which maps directly to CSS properties.

---

### Approach B: Gradient Overlay (Traditional & High Browser Compatibility)
If you need compatibility with older browsers that do not support CSS Masks, you place the image inside a container, and then overlay a gradient container *on top of it* that matches the card's background color.

#### Tailwind CSS Implementation:
```jsx
export function OverlayImageCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      
      {/* 1. Content */}
      <div className="relative z-10">
        <h3>Card Content</h3>
      </div>

      {/* 2. Watermark Image with Color Fade Overlay */}
      <div className="absolute -right-4 -bottom-4 w-40 h-40 z-0 pointer-events-none select-none">
        {/* The raw image */}
        <img
          src="/illustrations/clock.png"
          alt=""
          className="w-full h-full object-contain opacity-10"
        />
        {/* The Fade Overlay (Fades from card-bg color 'white' into transparent) */}
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/40 to-white" />
      </div>
      
    </div>
  );
}
```

*   **How the overlay works**: The image opacity is set to `10%`. A second div is absolute-positioned exactly on top of it (`absolute inset-0`). It uses a gradient that starts as transparent at the bottom-right and transitions to solid card background color (`to-white`) at the top-left, effectively blending the image into the background.

---

## 🎨 Best Practices & Design Tips
1. **Match Colors**: Use the main accent color of the card for the watermark SVG text color class (e.g., `text-indigo-500` for the indigo card, `text-orange-500` for the orange card).
2. **Negative Offsets**: Shift the illustration slightly off-screen (e.g., `-right-6 -bottom-6`) to create a cropped, organic aesthetic. It looks far more natural than centering it perfectly in the corner.
3. **Stroke Weight**: Use thin stroke weights (`strokeWidth="1"` or `strokeWidth="1.25"`) for your SVGs so they look light and elegant, rather than thick or bulky.
4. **Use Inline SVGs**: SVG elements scale cleanly to any size and can be easily customized dynamically using CSS colors and opacity classes.
5. **Always Set `pointer-events-none`**: This prevents the image or mask from stealing clicks from interactive elements under it.

