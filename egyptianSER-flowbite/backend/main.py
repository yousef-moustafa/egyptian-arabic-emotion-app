from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil, uuid, os
from asr_module import transcribe_file, clean_text

app = FastAPI()

# CORS settings for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    # Save file temporarily
    temp_filename = f"temp_{uuid.uuid4().hex}.wav"
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run transcription
    raw_text = transcribe_file(temp_filename)
    cleaned = clean_text(raw_text)

    # Delete temp file
    os.remove(temp_filename)

    return {
        "transcript": raw_text,
        "cleaned": cleaned
    }
