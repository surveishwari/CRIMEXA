from reportlab.pdfgen import canvas
import qrcode

def generate_report(data):
    file_name = "crime_report.pdf"
    c = canvas.Canvas(file_name)
    c.drawString(100,750,"CRIMEXA Crime Report")
    c.drawString(100,720,f"Crime: {data['prediction']}")
    c.drawString(100,700,f"Confidence: {data['confidence']}")
    c.drawString(100,680,f"Risk Score: {data['final_risk']}")
    c.drawString(100,660,f"Threat Level: {data['threat_level']}")
    c.save()

    # Generate QR code for report verification
    qr = qrcode.make("http://server.com/reports/"+file_name)
    qr.save("report_qr.png")
    return file_name