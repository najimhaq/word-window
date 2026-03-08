# 📘 Word Window

> **শব্দ শিখুন, ভাষা জয় করুন** — Learn English vocabulary, one lesson at a time.

A beautifully designed, single-file English vocabulary learning web app built for Bangla speakers. No build tools, no framework — just open the HTML file in a browser and start learning.

---

## ✨ Features

- 📚 **Lesson-based vocabulary** — Load words by lesson from a live API
- 🔍 **Live search** — Filter words in real-time as you type
- 🔊 **Pronunciation** — Hear any word spoken aloud using the Web Speech API
- 📖 **Word details modal** — View meaning, example sentence, and synonyms
- 🌙 **Dark / Light mode** — Toggle with one click, adapts the full UI
- ❓ **FAQ accordion** — Common questions answered in Bengali & English
- 📱 **Fully responsive** — Works on mobile, tablet, and desktop

---

## 🚀 Getting Started

No installation required. This is a zero-dependency, single-file app.

**1. Clone or download the file**

```bash
git clone https://github.com/najimhaq/word-window
```

**2. Open in your browser**

```bash
# Simply open the file — no server needed
open index.html
```

Or drag and drop `index.html` into any modern browser.

> ⚠️ The Speak button requires a browser with Web Speech API support (Chrome, Edge, Safari, Firefox).

---

## 🗂️ Project Structure

```
word-window/
│
├── index.html   # Complete app — HTML, CSS, and JS in one file
└── README.md             # You are here
```

All styles and scripts are self-contained inside the single HTML file. No separate CSS or JS files are needed.

---

## 🛠️ Tech Stack

| Technology                                                   | Purpose                                 |
| ------------------------------------------------------------ | --------------------------------------- |
| HTML5                                                        | Structure                               |
| CSS3 (custom properties)                                     | Styling & dark mode                     |
| Vanilla JavaScript (ES6+)                                    | Logic & API calls                       |
| [DaisyUI v5](https://daisyui.com)                            | UI component base                       |
| [Tailwind CSS v4](https://tailwindcss.com)                   | Utility classes                         |
| [Remix Icons](https://remixicon.com)                         | Icon set                                |
| [Google Fonts](https://fonts.google.com)                     | Playfair Display · Sora · Hind Siliguri |
| [Programming Hero API](https://openapi.programming-hero.com) | Vocabulary data                         |

---

## 🌐 API Reference

All vocabulary data is fetched live from the [Programming Hero Open API](https://openapi.programming-hero.com).

| Endpoint              | Description                           |
| --------------------- | ------------------------------------- |
| `GET /api/levels/all` | Fetch all available lessons           |
| `GET /api/level/:id`  | Fetch all words for a specific lesson |
| `GET /api/word/:id`   | Fetch full details for a single word  |

---

## 🎨 Design Highlights

- **Playfair Display** serif font for an editorial, premium feel
- **Ghost letter watermark** on each word card — large decorative first letter in the card header
- **Sticky glass-morphism navbar** with backdrop blur
- **Springy card hover animation** using CSS cubic-bezier easing
- **Noise texture overlay** for subtle depth across the entire page
- **Split footer action buttons** with hover fill effects
- CSS variables for a fully themeable design system

---

## 📖 How to Use

1. **Select a Lesson** — Click any lesson button to load that lesson's vocabulary words
2. **Browse Cards** — Each card shows the word, phonetic pronunciation, and meaning
3. **Search** — Type in the search bar to filter words within the active lesson
4. **Hear it** — Click **Speak** on any card to hear the word pronounced
5. **Dive deeper** — Click **Details** to open a modal with the full meaning, an example sentence, and synonyms
6. **Toggle theme** — Click the 🌙 / ☀️ button in the top-right corner

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**

- GitHub: [@najimhaq](https://github.com/najimhaq/word-window)
- Email: mdnajimulhaque@gmail.com

---

<p align="center">Made with ❤️ for Bangla learners</p>
