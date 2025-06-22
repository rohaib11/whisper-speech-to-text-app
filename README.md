# 🎤 Text-Speach: AI-Powered Speech-to-Text App

![FastAPI](https://img.shields.io/badge/backend-FastAPI-green)
![React](https://img.shields.io/badge/frontend-React-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Convert speech to text using OpenAI Whisper with a beautiful modern frontend built using React, TypeScript, and Tailwind CSS.

---

## 📁 Folder Structure

```
Text-Speach/
├── backend/
│   ├── venv/
│   ├── main.py
│   ├── whisper_model.py
│   ├── requirements.txt
│   └── static/                # built frontend goes here
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   ├── tsconfig.json
```

---

## 🔧 Backend Setup

1. Create and activate virtual environment:

```bash
cd backend
python -m venv venv
./venv/Scripts/activate  # On Windows
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start backend:

```bash
uvicorn main:app --reload
```

Access: [http://localhost:8000](http://localhost:8000)

---

## 🔧 Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init -p
```

2. Start frontend dev server:

```bash
npm run dev
```

Access: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Features

- Audio upload (drag/drop or file picker)
- Whisper model language + size options
- Live transcription with segments
- Copy transcription
- History of transcribed audio

---

## ✅ Health Check

```http
GET http://localhost:8000/health/
```

Returns server status and timestamp.

---

## 📷 Screenshot

![image](https://github.com/user-attachments/assets/e0df141a-4237-492b-9f0c-1ceaf94775b5)

---

## 🚀 Deployment

1. Build frontend:

```bash
cd frontend
npm run build
```

2. Copy `dist/` to backend static:

```bash
cp -r dist ../backend/static
```

3. Serve using Gunicorn, Nginx, or similar.

---

## 🤝 Acknowledgements

- [OpenAI Whisper](https://github.com/openai/whisper)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
