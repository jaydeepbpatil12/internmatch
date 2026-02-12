# 🎨 Tailwind CSS Animations - Quick Reference

## 🚀 Getting Started

Your Tailwind CSS setup now includes **30+ custom animations** ready to use! Just add the class names to any element.

---

## 📋 Animation Cheat Sheet

### 🌈 Gradient Animations
Perfect for backgrounds, hero sections, and CTAs.

```jsx
animate-gradient-x      // Horizontal gradient shift
animate-gradient-y      // Vertical gradient shift  
animate-gradient-xy     // Diagonal gradient shift
```

**Example:**
```jsx
<div className="bg-gradient-to-r from-green-600 to-emerald-600 animate-gradient-x">
  Animated Gradient Background
</div>
```

---

### 🎈 Floating Effects
Add depth and life to cards, icons, and decorative elements.

```jsx
animate-float           // Standard float (6s)
animate-float-slow      // Slower float (8s)
animate-float-delay     // Float with 3s delay
```

**Example:**
```jsx
<div className="animate-float-slow">
  <Icon className="text-green-500" />
</div>
```

---

### ✨ Shimmer & Shine
Premium effects for loading states and highlights.

```jsx
animate-shimmer         // Continuous shimmer
animate-shine           // Shine on hover
```

**Example:**
```jsx
<div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
  Content
</div>
```

---

### 💫 Glow & Pulse
Draw attention to important elements and CTAs.

```jsx
animate-pulse-slow      // Slow pulse (4s)
animate-glow            // Glow effect
animate-glow-pulse      // Combined glow + pulse
```

**Example:**
```jsx
<button className="bg-green-600 animate-glow-pulse">
  Premium CTA
</button>
```

---

### 🚀 Slide Animations
Smooth entrances from any direction.

```jsx
animate-slide-up        // Slide from bottom
animate-slide-down      // Slide from top
animate-slide-left      // Slide from right
animate-slide-right     // Slide from left
```

**Example:**
```jsx
<div className="animate-slide-up">
  Slides in from bottom
</div>
```

---

### 🌟 Fade Animations
Elegant, subtle entrances.

```jsx
animate-fade-in         // Simple fade in
animate-fade-in-up      // Fade + slide from bottom
animate-fade-in-down    // Fade + slide from top
```

**Example:**
```jsx
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Fades in from bottom with delay
</div>
```

---

### 📏 Scale Animations
Perfect for modals, cards, and interactive elements.

```jsx
animate-scale-in        // Zoom in entrance
animate-scale-up        // Scale up (for hover)
```

**Example:**
```jsx
<div className="animate-scale-in hover:scale-105 transition-transform">
  Interactive Card
</div>
```

---

### 🎪 Playful Animations
Add personality to badges, icons, and notifications.

```jsx
animate-bounce-slow     // Slow bounce (3s)
animate-wiggle          // Wiggle effect
```

**Example:**
```jsx
<div className="hover:animate-wiggle">
  Hover to wiggle
</div>
```

---

### 🔄 Rotation Animations
Great for loading indicators and decorative elements.

```jsx
animate-spin-slow       // Slow spin (3s)
animate-spin-slower     // Very slow spin (8s)
animate-tilt            // Subtle tilt
```

**Example:**
```jsx
<div className="animate-spin-slow">
  ⚙️ Loading...
</div>
```

---

### 📝 Text Effects
Make your text stand out.

```jsx
animate-text-shimmer    // Gradient text animation
animate-typing          // Typing effect
```

**Example:**
```jsx
<h1 className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent animate-text-shimmer">
  Shimmering Text
</h1>
```

---

## 🔥 Popular Combinations

### Premium Button
```jsx
<button className="
  bg-gradient-to-r from-green-600 to-emerald-600
  text-white px-8 py-4 rounded-lg font-bold
  animate-glow-pulse
  hover:scale-105
  transition-all
  shadow-lg hover:shadow-green-500/50
">
  Get Started
</button>
```

### Floating Card
```jsx
<div className="
  bg-[#112240] p-6 rounded-lg
  border border-gray-800
  animate-float-slow
  hover:border-green-500/50
  hover:shadow-xl hover:shadow-green-500/20
  transition-all duration-300
">
  Card Content
</div>
```

### Hover Lift Card
```jsx
<div className="
  bg-[#112240] p-6 rounded-lg
  border border-gray-800
  hover:border-green-500
  hover:-translate-y-2
  hover:shadow-xl hover:shadow-green-500/20
  transition-all duration-300
  cursor-pointer
">
  Interactive Card
</div>
```

### Staggered List
```jsx
{items.map((item, idx) => (
  <div 
    key={idx}
    className="animate-fade-in-up"
    style={{ animationDelay: `${idx * 0.1}s` }}
  >
    {item}
  </div>
))}
```

### Animated Icon
```jsx
<div className="group">
  <div className="bg-green-500/10 p-4 rounded-full group-hover:animate-wiggle">
    <Icon className="h-8 w-8 text-green-500" />
  </div>
</div>
```

### Loading Skeleton
```jsx
<div className="relative overflow-hidden h-4 bg-gray-700 rounded">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer"></div>
</div>
```

---

## 💡 Pro Tips

### 1. Stagger Delays
Create cascading effects for lists:
```jsx
style={{ animationDelay: `${index * 0.1}s` }}
```

### 2. Group Hover
Animate child elements on parent hover:
```jsx
<div className="group">
  <Icon className="group-hover:animate-wiggle" />
</div>
```

### 3. Combine with Transitions
Mix animations with Tailwind transitions:
```jsx
className="animate-float hover:scale-105 transition-transform"
```

### 4. Loading States
Use shimmer for skeleton screens:
```jsx
<div className="bg-gray-200 animate-shimmer h-4 w-full rounded"></div>
```

### 5. Premium CTAs
Make buttons irresistible:
```jsx
className="bg-gradient-to-r from-green-600 to-emerald-600 animate-glow-pulse hover:scale-105"
```

---

## 🎯 Animation Timing Guide

| Duration | Use Case | Examples |
|----------|----------|----------|
| **0.3s** | Quick interactions | Hover, click |
| **0.5-0.6s** | Standard entrances | Fade-in, slide |
| **2-4s** | Attention effects | Pulse, glow |
| **6-8s** | Ambient effects | Float, gradient |
| **Infinite** | Continuous | Shimmer, spin |

---

## 📱 View Live Examples

Visit `/animation-examples` in your app to see all animations in action!

```
http://localhost:5173/animation-examples
```

---

## 📚 More Resources

- **Full Guide**: `TAILWIND_ANIMATIONS_GUIDE.md`
- **Implementation Summary**: `ANIMATION_SUMMARY.md`
- **Demo Component**: `src/components/AnimationExamples.jsx`

---

## 🎨 Color Palette

Your custom green scale:
```jsx
green-50  to green-900   // Full range
from-green-600 to-emerald-600  // Gradient combo
```

---

**Happy Animating!** ✨

Remember: The best animations are the ones users barely notice but make the experience feel premium! 🚀
