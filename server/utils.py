import os
import qrcode
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

REPORTS_DIR = os.path.join(os.path.dirname(__file__), 'reports')
if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)

def generate_pdf_report(case_id, data, ml_results):
    pdf_filename = f"report_{case_id}.pdf"
    pdf_path = os.path.join(REPORTS_DIR, pdf_filename)
    
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter
    
    # Header
    c.setFont("Helvetica-Bold", 24)
    c.drawString(50, height - 50, "FORENSIQ - Investigation Report")
    
    # Case Details
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 100, f"Case ID: {case_id}")
    
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 130, f"Case Title: {data.get('caseTitle', 'N/A')}")
    c.drawString(50, height - 150, f"Crime Type: {data.get('caseType', 'N/A')}")
    c.drawString(50, height - 170, f"Address: {data.get('address', 'N/A')}")
    c.drawString(50, height - 190, f"Priority Level: {data.get('priorityLevel', 'N/A')}")
    c.drawString(50, height - 210, f"Time of Crime: {data.get('timeOfCrime', 'N/A')}")
    c.drawString(50, height - 230, f"Number of Suspects: {data.get('numberOfSuspects', 'N/A')}")
    c.drawString(50, height - 250, f"Number of Victims: {data.get('numberOfVictims', 'N/A')}")
    
    # Officer Narrative
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 280, "Officer Narrative:")
    c.setFont("Helvetica", 10)
    narrative = data.get('officerNarrative', 'N/A')
    y_pos = height - 300
    for line in narrative.split('\n')[:5]:  # Limit to 5 lines
        c.drawString(70, y_pos, line[:80])  # Limit line length
        y_pos -= 15
    
    # AI Analysis Results
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_pos - 20, "AI Analysis Results")
    
    c.setFont("Helvetica", 12)
    c.drawString(50, y_pos - 50, f"Predicted Crime: {ml_results.get('predicted_crime', 'N/A')}")
    c.drawString(50, y_pos - 70, f"Overall Accuracy: {ml_results.get('overall_accuracy', 'N/A')}%")
    
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(colors.red if ml_results.get('priority') == 'CRITICAL' else colors.black)
    c.drawString(50, y_pos - 110, f"PRIORITY: {ml_results.get('priority', 'N/A').upper()}")
    
    c.save()
    return pdf_filename

def generate_qr_code(url, case_id):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    qr_filename = f"qr_{case_id}.png"
    qr_path = os.path.join(REPORTS_DIR, qr_filename)
    img.save(qr_path)
    
    return qr_filename
