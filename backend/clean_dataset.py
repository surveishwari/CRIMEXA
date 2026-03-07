import pandas as pd

# ==============================
# LOAD DATA
# ==============================

file_path = "datasets/indian_crime_data_2023.xlsx"

# Skip first 4 rows (NCRB header rows)
df = pd.read_excel(file_path, skiprows=4)

# Remove completely empty rows
df = df.dropna(how="all")

# Remove completely empty columns
df = df.dropna(axis=1, how="all")

# Reset index
df = df.reset_index(drop=True)

print("Original Shape:", df.shape)

# ==============================
# REMOVE STATE & TOTAL ROWS
# ==============================

# Remove rows where District column is NaN
df = df[df.iloc[:, 1].notna()]

# Remove rows that contain 'Total' or 'State'
df = df[~df.iloc[:, 1].astype(str).str.contains("Total", case=False)]
df = df[~df.iloc[:, 1].astype(str).str.contains("State", case=False)]

# ==============================
# SELECT IMPORTANT COLUMNS
# ==============================

# NCRB Standard Positions (usually consistent)

district_col = 1
murder_col = 2
robbery_col = 10
theft_col = 15
total_col = df.shape[1] - 1   # Last column = Total IPC Crimes

df_clean = df.iloc[:, [district_col, murder_col, robbery_col, theft_col, total_col]]

df_clean.columns = [
    "District",
    "Murder",
    "Robbery",
    "Theft",
    "Total_IPC_Crime"
]

# ==============================
# CLEAN DATA TYPES
# ==============================

for col in ["Murder", "Robbery", "Theft", "Total_IPC_Crime"]:
    df_clean[col] = pd.to_numeric(df_clean[col], errors="coerce").fillna(0).astype(int)

# ==============================
# SAVE FINAL CSV
# ==============================

df_clean.to_csv("datasets/final_crime_dataset_2023.csv", index=False)

print("✅ CLEAN DATASET CREATED SUCCESSFULLY!")
print("Final Shape:", df_clean.shape)