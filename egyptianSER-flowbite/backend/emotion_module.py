# emotion_module.py

import numpy as np
import joblib
from funasr import AutoModel
import librosa
from sklearn.preprocessing import normalize

# Load Emotion2Vec model once
emotion2vec_model = AutoModel(model="iic/emotion2vec_base", disable_update=True)

# Load trained components
svm = joblib.load("best_emotion2vec_svm_retry.joblib")
scaler = joblib.load("best_scaler_retry.joblib")
label_encoder = joblib.load("label_encoder_retry.joblib")

def extract_emotion2vec(file_path: str) -> np.ndarray:
    """Extracts Emotion2Vec features from a .wav file."""
    try:
        waveform, sr = librosa.load(file_path, sr=16000)
        res = emotion2vec_model.generate(
            input=waveform,
            sampling_rate=sr,
            granularity="utterance",
            extract_embedding=True
        )
        if isinstance(res, list) and len(res) > 0 and isinstance(res[0], dict) and "feats" in res[0]:
            return np.array(res[0]["feats"])
    except Exception as e:
        print(f"[Emotion2Vec] Feature extraction failed: {e}")
    
    return np.zeros(768)  # fallback

def predict_emotion(file_path: str) -> dict:
    """Returns predicted emotion and full probability distribution."""
    features = extract_emotion2vec(file_path).reshape(1, -1)
    features_norm = normalize(features, norm='l2')
    features_scaled = scaler.transform(features_norm)

    pred_index = svm.predict(features_scaled)[0]
    pred_label = str(label_encoder.inverse_transform([pred_index])[0]).lower()

    scores = {}
    if hasattr(svm, "predict_proba"):
        probs = svm.predict_proba(features_scaled)[0]
        scores = {
            str(label_encoder.inverse_transform([i])[0]).lower(): float(prob)
            for i, prob in zip(svm.classes_, probs)
        }
    else:
        scores = {label_encoder.inverse_transform([i])[0]: 0.0 for i in svm.classes_}
        scores[pred_label] = 1.0

    print(f"[SVM] Predicted label: {pred_label}")
    print(f"[SVM] Probabilities: {scores}")

    return {
        "label": pred_label,
        "scores": scores
    }

