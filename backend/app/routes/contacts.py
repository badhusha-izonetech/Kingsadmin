from fastapi import APIRouter, HTTPException
from app.models.schemas import ContactDetails
from app.database.db import get_db_connection

router = APIRouter()

@router.get("/")
def get_contacts():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM contact_details ORDER BY created_at DESC")
    contacts = cursor.fetchall()
    cursor.close()
    conn.close()
    return contacts

@router.post("/")
def create_contact(contact: ContactDetails):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """INSERT INTO contact_details (name, email, phone, course, subcourse, message) 
           VALUES (%s, %s, %s, %s, %s, %s)""",
        (contact.name, contact.email, contact.phone, contact.course, contact.subcourse, contact.message)
    )
    conn.commit()
    contact_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id": contact_id, **contact.dict()}

@router.delete("/{contact_id}")
def delete_contact(contact_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM contact_details WHERE id = %s", (contact_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Contact deleted"}