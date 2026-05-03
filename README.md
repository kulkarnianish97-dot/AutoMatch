# 🚗 AutoMatch — Car Buying Advisor

A warm, comforting website that helps people find their perfect car through an AI-powered advisor. No dealership pressure, no confusing filters — just honest, personalized guidance.

## Features

- **AI Advisor** — Users describe their needs in plain English and get tailored vehicle recommendations powered by Claude
- **Example prompts** — Quick-tap tags to get started fast
- **How It Works** section — Clear 3-step explainer
- **Pricing tiers** — Free, Deep Dive ($29), and 1-on-1 Call ($59)
- **Testimonials** — Social proof section
- **Contact form** — Simple reach-out form
- **Fully responsive** — Works on mobile, tablet, and desktop

## Design

Warm amber, cream, and brown color palette with Playfair Display serif headings and Lato body text. Soft shadows, rounded cards, and subtle animations create a trustworthy, cozy feel.

## Project Structure

```
carguide/
├── index.html        # Main page
├── css/
│   └── style.css     # All styles (CSS variables, responsive)
├── js/
│   └── main.js       # Interactions + Anthropic API call
└── README.md
```

## Setup

1. Clone or download this repo
2. Open `index.html` in a browser — the static site works immediately
3. To enable the AI Advisor, you need an Anthropic API key. In `js/main.js`, the `callAdvisor()` function calls `https://api.anthropic.com/v1/messages`. For production, **proxy this through your own backend** so your API key is never exposed in the browser.

## Production Notes

- Move the Anthropic API call to a server-side function (Node.js, Python, etc.) and call your own `/api/advise` endpoint from the frontend
- Add rate limiting to prevent abuse
- Connect the contact form to an email service (e.g. Resend, Formspree, EmailJS)

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build step
- Google Fonts (Playfair Display + Lato)
- Anthropic Claude API (claude-sonnet-4)
