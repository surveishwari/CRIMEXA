import os
from reportlab.pdfgen import canvas
import qrcode
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPORT_DIR = os.path.join(BASE_DIR, "..", "reports")

if not os.path.exists(REPORT_DIR):
    os.makedirs(REPORT_DIR)


def generate_report(data):

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    pdf_path = os.path.join(REPORT_DIR, f"crime_report_{timestamp}.pdf")

    c = canvas.Canvas(pdf_path)

    c.setFont("Helvetica", 16)
    c.drawString(100, 750, "CRIMEXA Crime Prediction Report")

    c.setFont("Helvetica", 12)

    c.drawString(100, 710, f"Predicted Crime: {data['prediction']}")
    c.drawString(100, 690, f"Confidence: {data['confidence']} %")
    c.drawString(100, 670, f"Final Risk Score: {data['final_risk']}")
    c.drawString(100, 650, f"Threat Level: {data['threat_level']}")

    c.drawString(100, 620, f"Generated On: {datetime.now()}")

    c.save()

    # QR Code
    qr_data = f"Crime Report: {data['prediction']} | Risk: {data['final_risk']}"

    qr = qrcode.make(qr_data)

    qr_path = os.path.join(REPORT_DIR, f"qr_{timestamp}.png")

    qr.save(qr_path)

    return pdf_path, qr_path