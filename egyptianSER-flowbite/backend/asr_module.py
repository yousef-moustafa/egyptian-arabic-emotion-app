# asr_module.py

import torch
import librosa
import numpy as np
from transformers import AutoProcessor, AutoModelForCTC

# Optional: Only import ollama if you're using the cleaning step
try:
    import ollama
    OLLAMA_ENABLED = True
except ImportError:
    OLLAMA_ENABLED = False

# Constants
SAMPLING_RATE = 16000  # Expected by the model

# Load HuBERT model and processor once
asr_processor = AutoProcessor.from_pretrained("omarxadel/hubert-large-arabic-egyptian")
asr_model = AutoModelForCTC.from_pretrained("omarxadel/hubert-large-arabic-egyptian")

def transcribe_file(audio_path: str) -> str:
    """
    Transcribes a .wav file using the HuBERT ASR model.
    
    Args:
        audio_path (str): Path to the input .wav file.
    
    Returns:
        str: Transcribed text in Egyptian Arabic.
    """
    try:
        # Load and preprocess audio
        audio_data, sr = librosa.load(audio_path, sr=SAMPLING_RATE)
        input_values = asr_processor(audio_data, return_tensors="pt", sampling_rate=SAMPLING_RATE).input_values
        
        # Inference
        with torch.no_grad():
            logits = asr_model(input_values).logits

        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = asr_processor.batch_decode(predicted_ids)[0]
        return transcription
    except Exception as e:
        print(f"ASR Error: {e}")
        return "Transcription failed."

def clean_text(text: str) -> str:
    """
    Optionally cleans Egyptian Arabic text using Ollama (if available).
    
    Args:
        text (str): Raw transcription.
    
    Returns:
        str: Cleaned Egyptian Arabic text (or raw if Ollama is unavailable).
    """
    if not OLLAMA_ENABLED:
        return text  # Skip if Ollama not installed

    prompt = f"""
    You are an Egyptian Arabic text cleaning tool. Follow these rules:
    1. Correct ONLY spelling/grammar errors in the user's Egyptian Arabic sentence.
    2. Preserve the Egyptian dialect (e.g., use "مش" not "ليس").
    3. Return ONLY the corrected text, no explanations or formatting.
    
    Clean this Egyptian Arabic text: {text}
    """

    try:
        response = ollama.chat(model="command-r7b-arabic", messages=[{"role": "user", "content": prompt}])
        cleaned_text = response["message"]["content"].strip()
        return cleaned_text.replace('"', '').replace("“", "").replace("”", "")
    except Exception as e:
        print(f"Ollama Error: {e}")
        return text
