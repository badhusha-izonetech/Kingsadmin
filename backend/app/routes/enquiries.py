from fastapi import APIRouter, HTTPException

from app.database.db import get_db_connection
from app.models.schemas import Enquiry

router = APIRouter()


@router.get("/")
def get_enquiries():
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM enquiries ORDER BY created_at DESC")
    enquiries = cursor.fetchall()
    cursor.close()
    conn.close()
    return enquiries


@router.post("/")
def create_enquiry(enquiry: Enquiry):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT COUNT(*) AS count FROM enquiries WHERE email = %s",
        (enquiry.email,),
    )
    previous_count = cursor.fetchone()["count"]

    cursor.execute(
        """
        INSERT INTO enquiries (student_name, email, phone, college, course_name)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (
            enquiry.studentName,
            enquiry.email,
            enquiry.phone,
            enquiry.college,
            enquiry.courseName,
        ),
    )
    enquiry_id = cursor.lastrowid

    notification_type = "repeated_enquiry" if previous_count > 0 else "new_enquiry"
    notification_message = (
        f"Student {enquiry.studentName} sent another enquiry for {enquiry.courseName}"
        if previous_count > 0
        else f"New enquiry from {enquiry.studentName} for {enquiry.courseName}"
    )
    cursor.execute(
        "INSERT INTO notifications (type, message, is_read) VALUES (%s, %s, %s)",
        (notification_type, notification_message, False),
    )

    conn.commit()
    cursor.close()
    conn.close()
    return {"id": enquiry_id, **enquiry.model_dump()}


@router.delete("/{enquiry_id}")
def delete_enquiry(enquiry_id: int):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute("DELETE FROM enquiries WHERE id = %s", (enquiry_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Enquiry deleted"}
