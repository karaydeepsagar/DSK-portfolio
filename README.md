<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=D10000&height=200&section=header&text=DSK%20Portfolio&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Cloud%20Architect%20%7C%20DevOps%20Engineer&descAlignY=58&descAlign=50" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Outfit&weight=700&size=28&duration=3000&pause=1000&color=D10000&center=true&vCenter=true&multiline=true&width=700&height=80&lines=Building+Resilient+Cloud+Infrastructure;Automating+Everything.+Breaking+Nothing.)](https://git.io/typing-svg)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-kds--personal--portfolio.vercel.app-D10000?style=for-the-badge&labelColor=141414)](https://kds-personal-portfolio.vercel.app/)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/karaydeepsagar)
&nbsp;
[![Resume](https://img.shields.io/badge/Resume-Download%20PDF-22c55e?style=for-the-badge&logo=googledrive&logoColor=white)](https://kds-personal-portfolio.vercel.app/Resume.pdf)

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)

</div>

---

## ✨ What Makes This Portfolio Stand Out

<table>
<tr>
<td width="50%">

### 🎬 Animated Intro
Full-screen particle intro with GPU-optimised triangle system. 120 particles on desktop, auto-reduced on mobile for smooth 60fps.

### 🪐 DevOps Atom
Three concentric orbiting rings of cloud & DevOps icons (Docker, K8s, AWS, Azure, GCP, Terraform, Datadog…) — the centrepiece of the Hero section.

### 🖱️ Velocity Liquid Cursor
Custom cursor with stretch/squash physics based on movement speed. White dot in dark mode, black in light mode. Zero React re-renders via RAF loop.

### 🌗 Dark / Light Theme
System-aware with instant manual toggle. All components fully theme-reactive.

</td>
<td width="50%">

### ⚡ Performance First
- Lazy-loaded sections via React `Suspense`
- `willChange: transform` + `translateZ(0)` GPU hints
- Grain overlay and float animations disabled on mobile
- Font `display=fallback` prevents incognito jitter

### 📬 Working Contact Form
EmailJS integration — fully functional, no backend required. Credentials guarded with env-var validation.

### 📦 Production Ready
Multi-stage Dockerfile → Nginx. `vercel.json` SPA routing. OpenGraph + Twitter card meta. `canonical` URL set.

### 📱 Fully Responsive
Mobile, tablet, desktop, landscape — all breakpoints handled via a custom `useBreakpoint` hook.

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
[![My Skills](https://skillicons.dev/icons?i=react,vite,js,html,css&theme=dark)](https://skillicons.dev)

### Animations & UI
[![My Skills](https://skillicons.dev/icons?i=figma&theme=dark)](https://skillicons.dev)
&nbsp;
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
&nbsp;
![Lucide](https://img.shields.io/badge/Lucide%20React-F56565?style=for-the-badge)
&nbsp;
![React Icons](https://img.shields.io/badge/React%20Icons-E91E63?style=for-the-badge&logo=react&logoColor=white)

### DevOps & Deployment
[![My Skills](https://skillicons.dev/icons?i=docker,vercel,nginx,git,github&theme=dark)](https://skillicons.dev)

### Services
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B35?style=for-the-badge)

</div>

---

## 📂 Project Structure

```
DSK-portfolio/
│
├── 📁 public/
│   └── Resume.pdf                  # Downloadable CV
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── DSKIntro.jsx            # ✨ Full-screen particle intro
│   │   ├── Navbar.jsx              # 🔲 Floating pill navbar + animated logo
│   │   ├── Hero.jsx                # 🪐 Hero + 3-ring DevOps atom
│   │   ├── Projects.jsx            # 💼 Featured projects grid
│   │   ├── Experience.jsx          # 📅 Professional timeline
│   │   ├── Skills.jsx              # 🧠 Categorised skill tags
│   │   ├── Education.jsx           # 🎓 Education cards
│   │   ├── Blog.jsx                # 📝 Technical articles grid
│   │   ├── Contact.jsx             # 📬 EmailJS contact form
│   │   ├── CustomCursor.jsx        # 🖱️  Velocity-liquid cursor (RAF loop)
│   │   ├── PremiumEffects.jsx      # 🎞️  Grain overlay + scroll progress bar
│   │   ├── IndustrialBackground.jsx
│   │   ├── SpotlightCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ErrorBoundary.jsx
│   │
│   ├── 📁 context/
│   │   └── ThemeContext.jsx        # 🌗 Global dark/light theme
│   │
│   ├── 📁 data/
│   │   └── portfolioData.js        # 📊 All content (experience, projects, skills…)
│   │
│   ├── 📁 hooks/
│   │   └── useBreakpoint.js        # 📐 Responsive + performance reduction flags
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── 🐳 Dockerfile                   # Multi-stage build → Nginx
├── nginx.conf                      # SPA routing config
├── vite.config.js
├── vercel.json                     # Vercel SPA routing rewrites
└── .env.example                    # EmailJS credential template
```

---

## 🚀 Local Development

### Prerequisites

![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat-square&logo=npm&logoColor=white)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/karaydeepsagar/DSK-portfolio.git
cd DSK-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your EmailJS credentials

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Environment Variables

The contact form is powered by [EmailJS](https://www.emailjs.com/). Create a `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Vercel deployment:** Add the same keys under **Project Settings → Environment Variables** in the Vercel dashboard.

---

## 🐳 Docker

```bash
# Build image
docker build -t dsk-portfolio .

# Run container
docker run -d -p 8080:80 --name dsk-portfolio dsk-portfolio
```

Open [http://localhost:8080](http://localhost:8080)

---

## ☁️ Deployment

Deployed on **Vercel** via Git integration.

```json
// vercel.json — SPA routing (already configured)
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Push to `main` → Vercel auto-deploys. Zero config needed.

---

## 📬 Contact

<div align="center">

| Platform | Link |
|---|---|
| 📧 Email | [karaydeepsagar@gmail.com](mailto:karaydeepsagar@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/karaydeepsagar](https://linkedin.com/in/karaydeepsagar) |
| 🌐 Portfolio | [kds-personal-portfolio.vercel.app](https://kds-personal-portfolio.vercel.app/) |

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=D10000&height=120&section=footer&animation=fadeIn" width="100%"/>

**© 2026 Deep Sagar Karay. All rights reserved.**

*Built with React · Powered by Vite · Deployed on Vercel*

</div>


---

## Features

- **Animated Intro** — Full-screen DSK intro with particle system, GPU-optimised for mobile
- **DevOps Atom** — Three-ring orbiting icon cluster in the Hero section
- **Custom Cursor** — Velocity-liquid cursor with stretch/squash physics and theme awareness
- **Dark / Light Theme** — System-aware with manual toggle
- **Sections** — Hero, Projects, Experience, Skills, Education, Blog, Contact
- **Contact Form** — Powered by EmailJS (no backend required)
- **Resume Download** — Direct PDF download from Hero CTA
- **Lazy Loading** — All non-critical sections code-split with React Suspense
- **Dockerized** — Multi-stage production build served via Nginx
- **Deployed on Vercel** — CI/CD via Vercel Git integration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Animations | Framer Motion 11 |
| Icons | Lucide React, React Icons (SI, VSC) |
| Fonts | Inter, Outfit (Google Fonts) |
| Contact | EmailJS (`@emailjs/browser`) |
| Containerisation | Docker + Nginx |
| Deployment | Vercel |

---

## Project Structure

```
DSK-portfolio/
├── public/
│   └── Resume.pdf              # Downloadable CV
├── src/
│   ├── components/
│   │   ├── DSKIntro.jsx        # Full-screen intro animation
│   │   ├── Navbar.jsx          # Floating pill navbar + logo
│   │   ├── Hero.jsx            # Hero section + DevOps atom
│   │   ├── Projects.jsx        # Featured projects grid
│   │   ├── Experience.jsx      # Professional timeline
│   │   ├── Skills.jsx          # Categorised skill tags
│   │   ├── Education.jsx       # Education cards
│   │   ├── Blog.jsx            # Technical articles grid
│   │   ├── Contact.jsx         # EmailJS contact form
│   │   ├── CustomCursor.jsx    # Velocity-liquid cursor
│   │   ├── PremiumEffects.jsx  # Grain overlay + scroll bar
│   │   ├── IndustrialBackground.jsx
│   │   ├── SpotlightCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ErrorBoundary.jsx
│   ├── context/
│   │   └── ThemeContext.jsx    # Global dark/light theme
│   ├── data/
│   │   └── portfolioData.js    # All content (experience, projects, skills…)
│   ├── hooks/
│   │   └── useBreakpoint.js    # Responsive + performance flags
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile
├── nginx.conf
├── vite.config.js
├── vercel.json
└── .env.example
```

---

## Local Development

### Prerequisites
- Node.js v18+
- npm

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/karaydeepsagar/DSK-portfolio.git
cd DSK-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in your EmailJS credentials (see Environment Variables section)

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Environment Variables

The contact form uses [EmailJS](https://www.emailjs.com/). Create a `.env` file at the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> When deploying to Vercel, add these same keys under **Settings → Environment Variables** in your Vercel project dashboard.

---

## Docker

Run the production build in a lightweight Nginx container — no Node.js required.

```bash
# Build the image
docker build -t dsk-portfolio .

# Run the container
docker run -d -p 8080:80 --name dsk-portfolio dsk-portfolio
```

Open [http://localhost:8080](http://localhost:8080)

---

## Deployment (Vercel)

The project is deployed via Vercel's Git integration. `vercel.json` configures SPA routing so all paths resolve to `index.html`.

```json
// vercel.json (already configured)
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Push to `main` — Vercel auto-deploys.

---

## License

This project is for personal use. All content, graphics, and data belong to Deep Sagar Karay.

