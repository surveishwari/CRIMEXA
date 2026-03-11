from flask import Flask, request, jsonify
import os

from evidence_detector import detect_evidence

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return "CRIMEXA AI SERVER RUNNING"


@app.route("/analyze_scene", methods=["POST"])
def analyze_scene():

    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files['image']

    filepath = os.path.join(UPLOAD_FOLDER, image.filename)

    image.save(filepath)

    objects = detect_evidence(filepath)

    # Crime prediction logic
    prediction = "Unknown"

    if "knife" in objects or "gun" in objects:
        prediction = "Weapon Assault"

    elif "person" in objects and "blood" in objects:
        prediction = "Homicide Reconstruction"

    elif "person" in objects:
        prediction = "Robbery Case"

    return jsonify({
        "prediction": prediction,
        "objects_detected": objects
    })


if __name__ == "__main__":
    app.run(debug=True)