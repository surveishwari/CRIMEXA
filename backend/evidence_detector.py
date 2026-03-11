from ultralytics import YOLO
import cv2

# Load pretrained YOLO model
model = YOLO("yolov8n.pt")

def detect_evidence(image_path):

    results = model(image_path)

    detected_objects = []

    for r in results:
        for box in r.boxes:
            class_id = int(box.cls)
            label = model.names[class_id]
            detected_objects.append(label)

    return detected_objects