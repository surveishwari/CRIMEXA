from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import os
from risk_engine import calculate_final_risk

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "crime_model.pkl")
model = joblib.load(MODEL_PATH)

# Load location & crime classes for decoding
CLASSES_PATH = os.path.join(BASE_DIR, "..", "models", "crime_classes.pkl")
crime_classes = joblib.load(CLASSES_PATH)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        location = int(data["location"])
        hour = int(data["hour"])
        month = int(data["month"])
        arrest = int(data["arrest"])
        domestic = int(data["domestic"])
        state = data["state"]

        features = pd.DataFrame({
            "location":[location],
            "hour":[hour],
            "month":[month],
            "arrest":[arrest],
            "domestic":[domestic]
        })

        pred_idx = model.predict(features)[0]
        prediction = crime_classes.inverse_transform([pred_idx])[0]

        probs = model.predict_proba(features)[0]
        confidence = float(np.max(probs)*100)

        final_risk = calculate_final_risk(confidence, state)

        # Threat level
        if final_risk < 40: threat="LOW"
        elif final_risk<70: threat="MEDIUM"
        else: threat="HIGH"

        return jsonify({
            "status":"success",
            "prediction": prediction,
            "confidence": round(confidence,2),
            "final_risk": round(final_risk,2),
            "threat_level": threat
        })

    except Exception as e:
        return jsonify({"status":"error","message":str(e)})

if __name__=="__main__":
    app.run(debug=True)