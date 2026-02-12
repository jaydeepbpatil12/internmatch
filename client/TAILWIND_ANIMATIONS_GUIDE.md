# Tailwind CSS Animations Guide

This guide showcases all the custom Tailwind CSS animations available in your project. Use these classes to create stunning, dynamic effects throughout your application.

## 🎨 Gradient Animations

Perfect for backgrounds, buttons, and hero sections.

```jsx
// Horizontal gradient animation
<div className="bg-gradient-to-r from-green-600 to-emerald-600 animate-gradient-x">
  Animated Gradient
</div>

// Vertical gradient animation
<div className="bg-gradient-to-b from-green-600 to-emerald-600 animate-gradient-y">
  Animated Gradient
</div>

// Diagonal gradient animation
<div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 animate-gradient-xy">
  Animated Gradient
</div>
```

## 🎈 Floating & Hover Effects

Add life to cards, icons, and interactive elements.

```jsx
// Standard floating effect
<div className="animate-float">
  Floating Element
</div>

// Slower floating effect
<div className="animate-float-slow">
  Slow Float
</div>

// Floating with delay (great for staggered animations)
<div className="animate-float-delay">
  Delayed Float
</div>
```

## ✨ Shimmer & Shine Effects

Perfect for loading states, highlights, and premium effects.

```jsx
// Shimmer effect (great for loading placeholders)
<div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
  Content
</div>

// Shine effect
<div className="relative overflow-hidden group">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
  Hover me
</div>
```

## 💫 Pulse & Glow Effects

Draw attention to CTAs, notifications, and important elements.

```jsx
// Slow pulse
<button className="animate-pulse-slow">
  Pulsing Button
</button>

// Glow effect
<button className="animate-glow">
  Glowing Button
</button>

// Glow pulse (combines both)
<button className="bg-green-600 animate-glow-pulse">
  Premium CTA
</button>
```

## 🚀 Slide Animations

Great for page transitions and element entrances.

```jsx
// Slide up
<div className="animate-slide-up">
  Slides from bottom
</div>

// Slide down
<div className="animate-slide-down">
  Slides from top
</div>

// Slide left
<div className="animate-slide-left">
  Slides from right
</div>

// Slide right
<div className="animate-slide-right">
  Slides from left
</div>
```

## 🌟 Fade Animations

Smooth, elegant entrances for content.

```jsx
// Simple fade in
<div className="animate-fade-in">
  Fades in
</div>

// Fade in from bottom
<div className="animate-fade-in-up">
  Fades in from bottom
</div>

// Fade in from top
<div className="animate-fade-in-down">
  Fades in from top
</div>

// With staggered delay
<div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
  First item
</div>
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Second item
</div>
```

## 📏 Scale Animations

Perfect for modals, cards, and interactive elements.

```jsx
// Scale in (zoom in effect)
<div className="animate-scale-in">
  Scales in
</div>

// Scale up on hover
<div className="hover:animate-scale-up">
  Hover to scale
</div>

// Combined with other effects
<button className="animate-scale-in hover:scale-105 transition-transform">
  Interactive Button
</button>
```

## 🎪 Bounce & Wiggle

Add playfulness to badges, icons, and notifications.

```jsx
// Slow bounce
<div className="animate-bounce-slow">
  Bouncing Badge
</div>

// Wiggle effect
<div className="hover:animate-wiggle">
  Hover to wiggle
</div>

// Icon wiggle on hover
<Icon className="group-hover:animate-wiggle" />
```

## 🔄 Rotation Animations

Great for loading indicators and decorative elements.

```jsx
// Slow spin
<div className="animate-spin-slow">
  ⚙️
</div>

// Very slow spin
<div className="animate-spin-slower">
  🌍
</div>

// Subtle tilt
<div className="animate-tilt">
  Tilting element
</div>
```

## 📝 Text Effects

Make your text stand out.

```jsx
// Text shimmer (gradient text animation)
<h1 className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-text-shimmer">
  Shimmering Text
</h1>

// Typing effect
<div className="overflow-hidden whitespace-nowrap animate-typing">
  Typing animation...
</div>
```

## 🎨 Background Effects

Animated backgrounds for sections.

```jsx
// Background pan
<div className="bg-[url('pattern.png')] animate-bg-pan">
  Panning background
</div>
```

## 🔥 Combining Animations

Create complex, stunning effects by combining animations:

```jsx
// Premium button
<button className="
  bg-gradient-to-r from-green-600 to-emerald-600
  animate-glow-pulse
  hover:scale-105
  transition-all
  shadow-lg
  hover:shadow-green-500/50
">
  Premium CTA
</button>

// Floating card with glow
<div className="
  animate-float-slow
  hover:shadow-green-500/20
  transition-shadow
  duration-500
">
  Floating Card
</div>

// Animated feature card
<div className="
  animate-fade-in-up
  hover:border-green-500/50
  hover:-translate-y-2
  transition-all
  duration-300
  group
">
  <Icon className="group-hover:animate-wiggle" />
  Feature Card
</div>

// Staggered list items
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

## 🎯 Best Practices

1. **Don't Overdo It**: Use animations purposefully. Too many can overwhelm users.

2. **Performance**: Prefer `transform` and `opacity` animations (GPU-accelerated).

3. **Accessibility**: Consider users with motion sensitivity. Add this to your CSS:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
     }
   }
   ```

4. **Stagger Animations**: Use delays for list items to create a cascading effect:
   ```jsx
   style={{ animationDelay: `${index * 0.1}s` }}
   ```

5. **Combine with Transitions**: Mix animations with Tailwind transitions for smooth interactions:
   ```jsx
   className="animate-fade-in-up hover:scale-105 transition-transform duration-300"
   ```

## 🌈 Color Palette

Your custom green color scale:
- `green-50` to `green-900` - Full range of green shades
- Use with gradients: `from-green-600 to-emerald-600`

## 🎬 Animation Timing

- **Fast**: 0.3s - Quick interactions (hover, click)
- **Medium**: 0.5-0.6s - Standard entrances (fade-in, slide)
- **Slow**: 2-8s - Background effects (gradient, float)
- **Infinite**: Continuous effects (pulse, glow, shimmer)

## 💡 Pro Tips

1. **Hover States**: Combine animations with hover for interactive feedback
   ```jsx
   className="hover:animate-wiggle hover:scale-105"
   ```

2. **Group Hover**: Animate child elements on parent hover
   ```jsx
   <div className="group">
     <Icon className="group-hover:animate-wiggle" />
   </div>
   ```

3. **Loading States**: Use shimmer for skeleton screens
   ```jsx
   <div className="bg-gray-200 animate-shimmer h-4 w-full rounded"></div>
   ```

4. **CTAs**: Make buttons irresistible with glow effects
   ```jsx
   className="animate-glow-pulse bg-gradient-to-r from-green-600 to-emerald-600"
   ```

5. **Cards**: Add depth with floating and hover effects
   ```jsx
   className="animate-float-slow hover:-translate-y-2 transition-all"
   ```

---

**Remember**: The best animations are the ones users barely notice but make the experience feel premium and polished! 🚀
