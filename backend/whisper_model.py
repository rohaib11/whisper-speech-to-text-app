import whisper
from typing import Optional

class WhisperModel:
    def __init__(self, model_size: str = "base"):
        self.model = whisper.load_model(model_size)

    def transcribe_audio(self, file_path: str, language: Optional[str] = None) -> dict:
        try:
            result = self.model.transcribe(
                file_path,
                language=language,
                fp16=False  # Disable FP16 for CPU compatibility
            )
            return {
                "text": result["text"],
                "language": result.get("language", None),
                "segments": result.get("segments", [])
            }
        except Exception as e:
            raise ValueError(f"Transcription failed: {str(e)}")

# Singleton instance to be used across the app
model = WhisperModel()
