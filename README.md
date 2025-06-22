# Text-Speach: AI-Powered Speech-to-Text App

This project converts audio files into text using OpenAI's Whisper model, powered by a FastAPI backend and a React + TypeScript frontend styled with Tailwind CSS.

---

## 📁 Folder Structure

```
Text-Speach/
├── backend/
│   ├── venv/                  # Virtual environment
│   ├── main.py                # FastAPI application
│   ├── whisper_model.py       # Whisper transcription logic
│   ├── requirements.txt       # Backend dependencies
│   └── static/                # (Optional) Frontend build for production
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── types/             # Type definitions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   ├── tsconfig.json
```

---

## 🔧 Backend Setup

1. **Navigate & Setup venv:**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate  # For Windows
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the server:**
   ```bash
   uvicorn main:app --reload
   ```

---

## 🔧 Frontend Setup

1. **Create app with Vite + React + TypeScript:**
   ```bash
   npm create vite@latest frontend -- --template react-ts
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
   npx tailwindcss init -p
   ```

3. **Start frontend dev server:**
   ```bash
   npm run dev
   ```

---

## 🧠 Features

- Audio upload via drag & drop or click
- Language input and model size selection
- Real-time transcription display with segment breakdown
- View transcription history
- Copy transcript to clipboard

---

## 🛠 Tech Stack

- **Backend:** FastAPI, Whisper, Python
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Other:** Axios, UUID, CORS

---

## 🏁 Deployment Tips

- Build frontend:
  ```bash
  npm run build
  ```

- Copy frontend `dist/` to backend `static/`:
  ```bash
  cp -r dist ../backend/static
  ```

- Use production server like Gunicorn or serve via Nginx

---

## ✅ Health Check Endpoint

Visit:
```
http://localhost:8000/health/
```

---

## 🤝 Acknowledgements

- [OpenAI Whisper](https://github.com/openai/whisper)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Vite + Tailwind + React](https://vitejs.dev/)
