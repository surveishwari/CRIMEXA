from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ---------------- DATA STORAGE ----------------
cases = []
suspects = []
evidence = []
reports = []

case_id_counter = 1
suspect_id_counter = 1
evidence_id_counter = 1
report_id_counter = 1

# ---------------- UTILS ----------------
def find_by_id(collection, _id):
    """Helper to find item by ID"""
    for item in collection:
        if item["id"] == _id:
            return item
    return None

# ---------------- DASHBOARD ----------------
@app.route("/stats", methods=["GET"])
def stats():
    return jsonify({
        "cases": len(cases),
        "suspects": len(suspects),
        "evidence": len(evidence),
        "reports": len(reports)
    })

# ---------------- CASES ----------------
@app.route("/cases", methods=["GET"])
def get_cases():
    return jsonify(cases)

@app.route("/cases", methods=["POST"])
def add_case():
    global case_id_counter
    data = request.json

    if not data.get("title") or not data.get("status"):
        return jsonify({"error": "Title and status are required"}), 400

    new_case = {
        "id": case_id_counter,
        "title": data["title"],
        "status": data["status"],
        "suspects": [],
        "evidence": [],
        "timeline": []
    }
    case_id_counter += 1
    cases.append(new_case)
    return jsonify(new_case), 201

@app.route("/cases/<int:case_id>", methods=["GET"])
def get_case(case_id):
    case = find_by_id(cases, case_id)
    if not case:
        return jsonify({"error": "Case not found"}), 404
    return jsonify(case)

@app.route("/cases/<int:case_id>", methods=["PUT"])
def update_case(case_id):
    case = find_by_id(cases, case_id)
    if not case:
        return jsonify({"error": "Case not found"}), 404

    data = request.json
    case["title"] = data.get("title", case["title"])
    case["status"] = data.get("status", case["status"])
    return jsonify(case)

@app.route("/cases/<int:case_id>", methods=["DELETE"])
def delete_case(case_id):
    global cases
    case = find_by_id(cases, case_id)
    if not case:
        return jsonify({"error": "Case not found"}), 404
    cases = [c for c in cases if c["id"] != case_id]
    return jsonify({"message": "Case deleted successfully"})

# ---------------- SUSPECTS ----------------
@app.route("/suspects", methods=["GET"])
def get_suspects():
    return jsonify(suspects)

@app.route("/suspects", methods=["POST"])
def add_suspect():
    global suspect_id_counter
    data = request.json
    if not data.get("name") or not isinstance(data.get("age"), int):
        return jsonify({"error": "Name and valid age are required"}), 400

    new_suspect = {
        "id": suspect_id_counter,
        "name": data["name"],
        "age": data["age"]
    }
    suspect_id_counter += 1
    suspects.append(new_suspect)
    return jsonify(new_suspect), 201

# ---------------- EVIDENCE ----------------
@app.route("/evidence", methods=["GET"])
def get_evidence():
    return jsonify(evidence)

@app.route("/evidence", methods=["POST"])
def add_evidence():
    global evidence_id_counter
    data = request.json
    if not data.get("name") or not data.get("type"):
        return jsonify({"error": "Name and type are required"}), 400

    new_evidence = {
        "id": evidence_id_counter,
        "name": data["name"],
        "type": data["type"]
    }
    evidence_id_counter += 1
    evidence.append(new_evidence)
    return jsonify(new_evidence), 201

# ---------------- LINK SUSPECT ----------------
@app.route("/cases/<int:case_id>/suspect/<int:suspect_id>", methods=["POST"])
def link_suspect(case_id, suspect_id):
    case = find_by_id(cases, case_id)
    suspect = find_by_id(suspects, suspect_id)

    if not case:
        return jsonify({"error": "Case not found"}), 404
    if not suspect:
        return jsonify({"error": "Suspect not found"}), 404

    if suspect_id not in case["suspects"]:
        case["suspects"].append(suspect_id)
    return jsonify({"message": "Suspect linked successfully"})

# ---------------- LINK EVIDENCE ----------------
@app.route("/cases/<int:case_id>/evidence/<int:evidence_id>", methods=["POST"])
def link_evidence(case_id, evidence_id):
    case = find_by_id(cases, case_id)
    ev = find_by_id(evidence, evidence_id)

    if not case:
        return jsonify({"error": "Case not found"}), 404
    if not ev:
        return jsonify({"error": "Evidence not found"}), 404

    if evidence_id not in case["evidence"]:
        case["evidence"].append(evidence_id)
    return jsonify({"message": "Evidence linked successfully"})

# ---------------- TIMELINE ----------------
@app.route("/cases/<int:case_id>/timeline", methods=["POST"])
def add_timeline(case_id):
    case = find_by_id(cases, case_id)
    if not case:
        return jsonify({"error": "Case not found"}), 404

    data = request.json
    event = data.get("event")
    if not event:
        return jsonify({"error": "Event is required"}), 400

    case["timeline"].append(event)
    return jsonify({"message": "Timeline event added"})

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)