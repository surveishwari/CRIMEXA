from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
import io

app = Flask(__name__)

model = YOLO("yolov8n.pt")

@app.route("/")
def home():
    return "CRIMEXA AI Backend Running"


@app.route("/analyze_scene", methods=["POST"])
def analyze_scene():

    file = request.files["image"]

    image_bytes = file.read()
    image = Image.open(io.BytesIO(image_bytes))

    results = model(image)

    detected_objects = []

    for r in results:
        for box in r.boxes:
            cls = int(box.cls)
            name = model.names[cls]
            detected_objects.append(name)

    prediction = predict_crime(detected_objects)

    return jsonify({
        "prediction": prediction,
        "objects_detected": detected_objects
    })


def predict_crime(objects):

    if "knife" in objects or "gun" in objects:
        return "Weapon Assault"

    if "person" in objects and "tv" in objects:
        return "Burglary Case"

    if "person" in objects and "handbag" in objects:
        return "Robbery Reconstruction"

    return "Unknown Crime"


if __name__ == "__main__":
    app.run(debug=True)