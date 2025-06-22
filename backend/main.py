from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from whisper_model import model

import os
import shutil
import tempfile
import uuid
from datetime import datetime
from typing import Optional

app = FastAPI(
    title="Speech-to-Text API",
    description="API for transcribing audio files using OpenAI's Whisper model",
    version="1.0.0"
)

# CORS: Allow requests from all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount frontend files (for production builds)
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# In-memory storage of transcriptions (simulate database)
transcription_history = []

@app.post("/transcribe/")
async def transcribe(
    file: UploadFile = File(..., description="Audio file to transcribe"),
    language: Optional[str] = Query(None, description="Language code like 'en', 'hi' etc"),
    model_size: Optional[str] = Query("base", description="Whisper model size")
):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Only audio files are allowed")

    # Save audio file temporarily
    temp_dir = tempfile.mkdtemp()
    temp_path = os.path.join(temp_dir, file.filename or "temp_audio.wav")

    try:
        with open(temp_path, "wb") as out_file:
            shutil.copyfileobj(file.file, out_file)

        # Transcribe
        result = model.transcribe_audio(temp_path, language)

        # Save transcription metadata
        transcription_id = str(uuid.uuid4())
        history_entry = {
            "id": transcription_id,
            "filename": file.filename,
            "timestamp": datetime.utcnow().isoformat(),
            "language": result["language"],
            "text": result["text"],
            "model_size": model_size
        }
        transcription_history.append(history_entry)

        return {
            "id": transcription_id,
            "filename": file.filename,
            "transcription": result["text"],
            "language": result["language"],
            "segments": result["segments"],
            "model_size": model_size
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

@app.get("/history/")
async def get_history(limit: int = Query(10, ge=1, le=100)):
    return transcription_history[-limit:]

@app.get("/health/")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/")
async def serve_frontend():
    index_path = os.path.join("static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Frontend not built yet"}
