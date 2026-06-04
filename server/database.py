import sqlite3
import json
import os
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash

DB_PATH = os.path.join(os.path.dirname(__file__), 'crimexa.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
      CREATE TABLE IF NOT EXISTS officers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        badge TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        department TEXT,
        rank TEXT,
        role TEXT DEFAULT 'investigator',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    ''')

    cursor.execute('''
      CREATE TABLE IF NOT EXISTS cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_number TEXT UNIQUE,
        title TEXT NOT NULL,
        location TEXT,
        latitude REAL,
        longitude REAL,
        crime_date TEXT,
        crime_type TEXT,
        status TEXT DEFAULT 'active',
        priority TEXT DEFAULT 'medium',
        officer_id INTEGER REFERENCES officers(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    ''')

    cursor.execute('''
      CREATE TABLE IF NOT EXISTS evidence (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER REFERENCES cases(id),
        type TEXT,
        file_url TEXT,
        description TEXT,
        file_hash TEXT,
        officer_id INTEGER REFERENCES officers(id),
        collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    ''')

    cursor.execute('''
      CREATE TABLE IF NOT EXISTS analysis_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER REFERENCES cases(id),
        crime_type TEXT,
        risk_level TEXT,
        risk_score INTEGER,
        arrest_probability REAL,
        anomaly_score REAL,
        nlp_category TEXT,
        full_result_json TEXT,
        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    ''')

    cursor.execute('''
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER REFERENCES cases(id),
        pdf_url TEXT,
        qr_url TEXT,
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    ''')
    
    conn.commit()
    conn.close()

def create_officer(badge, name, email, password, department, rank, role):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO officers (badge, name, email, password_hash, department, rank, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (badge, name, email, generate_password_hash(password), department, rank, role))
        conn.commit()
        officer_id = cursor.lastrowid
        success = True
    except sqlite3.IntegrityError:
        success = False
        officer_id = None
    conn.close()
    return success, officer_id

def verify_officer(badge_or_email, password):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT id, password_hash, name, role, badge FROM officers WHERE badge = ? OR email = ?', (badge_or_email, badge_or_email))
    row = cursor.fetchone()
    conn.close()
    if row and check_password_hash(row[1], password):
        return {"id": row[0], "name": row[2], "role": row[3], "badge": row[4]}
    return None

def save_case(data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO cases (case_number, title, location, latitude, longitude, crime_date, crime_type, officer_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('case_number'), data.get('title'), data.get('location'), 
        data.get('latitude'), data.get('longitude'), data.get('crime_date'), 
        data.get('crime_type'), data.get('officer_id')
    ))
    conn.commit()
    case_id = cursor.lastrowid
    conn.close()
    return case_id

init_db()
