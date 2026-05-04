// ================================
//   AutoMatch — Main JS
// ================================

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.step, .testimonial, .pricing-card, .advisor__box');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- EXAMPLE TAGS ----
document.querySelectorAll('.example-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const textarea = document.getElementById('userInput');
    textarea.value = tag.dataset.text;
    textarea.focus();
    textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// ---- AI ADVISOR ----
const submitBtn    = document.getElementById('submitBtn');
const userInput    = document.getElementById('userInput');
const responseEl   = document.getElementById('response');
const responseBody = document.getElementById('responseBody');
const loadingEl    = document.getElementById('loading');

submitBtn?.addEventListener('click', async () => {
  const text = userInput.value.trim();
  if (!text) {
    userInput.style.borderColor = '#C0392B';
    setTimeout(() => (userInput.style.borderColor = ''), 1500);
    return;
  }

  // Show loading, hide previous response
  responseEl.style.display  = 'none';
  loadingEl.style.display   = 'block';
  submitBtn.disabled        = true;
  submitBtn.textContent     = 'Analyzing...';

  try {
    const reply = await callAdvisor(text);
    responseBody.textContent = reply;
    loadingEl.style.display  = 'none';
    responseEl.style.display = 'block';
    responseEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (err) {
    loadingEl.style.display  = 'none';
    responseBody.textContent = 'Something went wrong. Please try again or reach out via the contact form below.';
    responseEl.style.display = 'block';
    console.error(err);
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Get My Recommendations →';
  }
});

// Allow Ctrl+Enter / Cmd+Enter to submit
userInput?.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submitBtn.click();
});

async function callAdvisor(userMessage) {
  const systemPrompt = `You are AutoMatch, a warm, knowledgeable, and unbiased car buying advisor. You help people find vehicles that genuinely suit their lives — not just what's most popular or most profitable.

Your personality:
- Friendly, conversational, and reassuring — like a knowledgeable friend
- Honest about trade-offs, including reliability concerns, ownership costs, and common issues
- You never recommend something just because it's trendy or expensive
- You always tailor advice to the person's specific budget, lifestyle, and priorities

When recommending cars:
1. Give 2-4 specific vehicle recommendations with year ranges
2. For each car, briefly explain WHY it fits their needs
3. Mention one honest caveat or thing to watch out for
4. End with one practical buying tip (e.g. what to look for on a test drive, or a common issue to inspect)

Keep your response clear, warm, and under 350 words. Use plain text formatting — no markdown headers or bullet symbols, just short paragraphs.`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_GEMINI_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'API error');
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? 'No response received.';
}

// ---- CONTACT FORM (placeholder) ----
document.querySelector('.contact .btn--primary')?.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.contact .form-input');
  const filled = [...inputs].every(i => i.value.trim());
  if (!filled) {
    inputs.forEach(i => { if (!i.value.trim()) i.style.borderColor = '#C0392B'; });
    setTimeout(() => inputs.forEach(i => i.style.borderColor = ''), 2000);
    return;
  }
  alert('Thanks for reaching out! We\'ll get back to you shortly.');
  inputs.forEach(i => (i.value = ''));
});
