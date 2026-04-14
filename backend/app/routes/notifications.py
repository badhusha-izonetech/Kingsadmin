from fastapi import APIRouter
from app.database.db import get_db_connection

router = APIRouter()

@router.get("/")
def get_notifications():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notifications ORDER BY created_at DESC")
    notifications = cursor.fetchall()
    cursor.close()
    conn.close()
    return notifications

@router.get("/unread")
def get_unread_notifications():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notifications WHERE is_read = FALSE ORDER BY created_at DESC")
    notifications = cursor.fetchall()
    cursor.close()
    conn.close()
    return notifications

@router.get("/count")
def get_unread_count():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT COUNT(*) as count FROM notifications WHERE is_read = FALSE")
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return {"count": result['count']}

@router.put("/{notification_id}/read")
def mark_as_read(notification_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("UPDATE notifications SET is_read = TRUE WHERE id = %s", (notification_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Notification marked as read"}

@router.put("/read-all")
def mark_all_as_read():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("UPDATE notifications SET is_read = TRUE")
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "All notifications marked as read"}

@router.delete("/{notification_id}")
def delete_notification(notification_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("DELETE FROM notifications WHERE id = %s", (notification_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Notification deleted"}
