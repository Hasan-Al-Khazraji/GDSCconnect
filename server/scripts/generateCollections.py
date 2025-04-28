import firebase_admin
from firebase_admin import credentials, firestore
import json  # Ensure this is imported before using it

# Load firebase_credentials.json
with open('d:\\TIM\\GDSC Connect\\GDSCconnect\\server\\firebase_credentials.json', 'r') as f:
    credentials_data = json.load(f)

cred = credentials.Certificate(credentials_data)
firebase_admin.initialize_app(cred)

db = firestore.client()

# Create 001 to 250 documents
for i in range(1, 251):
    doc_id = f"{i:03}"  
    doc_ref = db.collection('users').document(doc_id)
    doc_ref.set({
        'email': '',
        'profile': ['', '', '', '']  # name, school, linkedin, github
    })

print("Finished")