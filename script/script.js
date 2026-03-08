/* ─────────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────────── */
const themeBtn = document.getElementById('theme-toggle');
const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  themeBtn.textContent = isDark ? '🌙' : '☀️';
};
themeBtn.addEventListener('click', toggleTheme);

/* ─────────────────────────────────────────────
   SPINNER
───────────────────────────────────────────── */
const displaySpinner = (show) => {
  document.getElementById('loading').classList.toggle('hidden', !show);
  document.getElementById('word-container').classList.toggle('hidden', show);
};

/* ─────────────────────────────────────────────
   REMOVE ACTIVE LESSON BUTTON
───────────────────────────────────────────── */
const removeActive = () =>
  document
    .querySelectorAll('.lesson-btn')
    .forEach((b) => b.classList.remove('active'));

/* ─────────────────────────────────────────────
   LOAD LESSONS
───────────────────────────────────────────── */
const loadLessons = async () => {
  try {
    const res = await fetch(
      'https://openapi.programming-hero.com/api/levels/all'
    );
    const data = await res.json();
    displayLessons(data.data);
  } catch (e) {
    console.error('Failed to load lessons', e);
  }
};

const displayLessons = (lessons) => {
  const container = document.getElementById('level-container');
  container.innerHTML = '';
  lessons.forEach((lesson) => {
    const btn = document.createElement('button');
    btn.className = 'lesson-btn';
    btn.id = `lesson-btn-${lesson.level_no}`;
    btn.textContent = `Lesson ${lesson.level_no}`;
    btn.addEventListener('click', () => loadLevelWord(lesson.level_no));
    container.appendChild(btn);
  });
};

/* ─────────────────────────────────────────────
   LOAD WORDS FOR LESSON
───────────────────────────────────────────── */
let currentWords = [];

const loadLevelWord = async (id) => {
  displaySpinner(true);
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/level/${id}`
    );
    const data = await res.json();
    currentWords = data.data || [];
    removeActive();
    document.getElementById(`lesson-btn-${id}`)?.classList.add('active');
    document.getElementById('search-input').value = '';
    displayLevelWords(currentWords);
    updateStats(currentWords.length, `Lesson ${id}`);
  } catch (e) {
    console.error('Failed to load words', e);
  } finally {
    displaySpinner(false);
  }
};

/* ─────────────────────────────────────────────
   RENDER WORD CARDS
───────────────────────────────────────────── */
const displayLevelWords = (words) => {
  const container = document.getElementById('word-container');
  container.innerHTML = '';

  if (!words.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="ri-search-eye-line"></i>
        <h3>No Words Found</h3>
        <p>Try a different search or select another lesson</p>
      </div>`;
    return;
  }

  words.forEach((word, i) => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.style.animationDelay = `${i * 40}ms`;
    const firstLetter = (word.word ?? 'U').charAt(0).toUpperCase();
    card.innerHTML = `
      <div class="card-header">
        <span class="card-ghost-letter">${firstLetter}</span>
        <div class="card-word">${word.word ?? 'Unknown'}</div>
        ${word.pronunciation
          ? `<div class="card-phonetic"><i class="ri-sound-module-line"></i>${word.pronunciation}</div>`
          : ''}
      </div>
      <div class="card-body">
        <div class="card-meaning-label">Meaning</div>
        <div class="card-meaning">${word.meaning ?? 'N/A'}</div>
      </div>
      <div class="card-footer">
        <button class="card-action-btn" title="Details" onclick="loadWordDetail(${word.id})">
          <i class="ri-information-2-line"></i> Details
        </button>
        <button class="card-action-btn" title="Pronounce" onclick="speakWord('${word.word}')">
          <i class="ri-volume-up-line"></i> Speak
        </button>
      </div>`;
    container.appendChild(card);
  });
};


/* ─────────────────────────────────────────────
   WORD DETAIL MODAL
───────────────────────────────────────────── */
const loadWordDetail = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/word/${id}`
    );
    const data = await res.json();
    displayWordDetails(data.data);
  } catch (e) {
    console.error('Failed to load word detail', e);
  }
};

const displayWordDetails = (word) => {
  const synonymChips = word.synonyms?.length
    ? word.synonyms.map((s) => `<span class="syn-chip">${s}</span>`).join('')
    : '<span style="color:var(--muted);font-size:.85rem;">No synonyms available</span>';

  document.getElementById('details-container').innerHTML = `
    <div class="modal-word">${word.word}</div>
    <div class="modal-label">Meaning</div>
    <div class="modal-text">${word.meaning ?? 'N/A'}</div>
    <div class="modal-label">Example</div>
    <div class="modal-text">"${word.sentence ?? 'N/A'}"</div>
    <div class="modal-label">Synonyms</div>
    <div class="synonyms-wrap">${synonymChips}</div>
  `;

  document.getElementById('word-modal').classList.add('open');
};

// Close modal
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('word-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  document.getElementById('word-modal').classList.remove('open');
}

/* ─────────────────────────────────────────────
   SPEECH
───────────────────────────────────────────── */
const speakWord = (word) => {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(word);
  u.lang = 'en-US';
  u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
};

/* ─────────────────────────────────────────────
   SEARCH
───────────────────────────────────────────── */
let searchTimeout;
document.getElementById('search-input').addEventListener('input', function () {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const q = this.value.trim().toLowerCase();
    if (!currentWords.length) return;
    const filtered = q
      ? currentWords.filter((w) => (w.word ?? '').toLowerCase().includes(q))
      : currentWords;
    displayLevelWords(filtered);
    updateStats(filtered.length, q ? `"${q}"` : null);
  }, 180);
});

document.getElementById('clear-search').addEventListener('click', () => {
  const input = document.getElementById('search-input');
  input.value = '';
  input.dispatchEvent(new Event('input'));
  input.focus();
});

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
const updateStats = (count, label) => {
  const bar = document.getElementById('stats-bar');
  bar.style.display = 'flex';
  document.getElementById('word-count').textContent = count;
  if (label) document.getElementById('active-label').textContent = label;
};
/* ─────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach((q) => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document
      .querySelectorAll('.faq-item')
      .forEach((i) => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
loadLessons();
