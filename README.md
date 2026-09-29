# Sanskriti Gupta, portfolio

Personal site for Sanskriti Gupta, full-stack engineer and CS student at VIT Bhopal.

Built with React 19, Vite and Tailwind CSS v4, with no animation or 3D libraries.

The effects are React Bits components rewritten to be light:

- Dither (hero and contact) and FaultyTerminal (toolbox) are plain WebGL shaders.
  They pause off screen, render at reduced resolution, and drop to 30fps on phones.
- CurvedLoop, BlurText, CountUp, SpotlightCard and TiltedCard are small React
  components with CSS. Tilt, spotlight and the cursor glow switch off on touch screens.
- Everything respects the "reduce motion" system setting.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Editing content

All copy (projects, experience, stats, toolbox, links) lives in `src/data.js`.
Project images are in `public/images`, the resume is `public/resume.pdf`.

## Shell

Press `` ` `` or Ctrl/Cmd + K anywhere on the page to open a small terminal.
Try `help`, `projects`, `skills` or `contact`.
