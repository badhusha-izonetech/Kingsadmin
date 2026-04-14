from fastapi import APIRouter
from app.models.schemas import PopupMessage
from app.database.db import get_db_connection

router = APIRouter()

@router.get("/")
def get_popups():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM popup_messages ORDER BY created_at DESC")
    popups = cursor.fetchall()
    cursor.close()
    conn.close()
    return popups

@router.get("/active")
def get_active_popup():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM popup_messages WHERE status = 'active' ORDER BY created_at DESC LIMIT 1")
    popup = cursor.fetchone()
    cursor.close()
    conn.close()
    return popup

@router.post("/")
def create_popup(popup: PopupMessage):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "INSERT INTO popup_messages (title, description, image, status, deadline) VALUES (%s, %s, %s, %s, %s)",
        (popup.title, popup.description, popup.image, popup.status, popup.deadline)
    )
    popup_id = cursor.lastrowid
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": popup_id, **popup.dict()}

@router.put("/{popup_id}")
def update_popup(popup_id: int, popup: PopupMessage):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "UPDATE popup_messages SET title = %s, description = %s, image = %s, status = %s, deadline = %s WHERE id = %s",
        (popup.title, popup.description, popup.image, popup.status, popup.deadline, popup_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": popup_id, **popup.dict()}

@router.delete("/{popup_id}")
def delete_popup(popup_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("DELETE FROM popup_messages WHERE id = %s", (popup_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Popup deleted"}
