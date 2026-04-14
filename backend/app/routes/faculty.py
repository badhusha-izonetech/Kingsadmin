import json

from fastapi import APIRouter, HTTPException

from app.database.db import get_db_connection
from app.models.schemas import Faculty

router = APIRouter()


def _parse_json_column(value):
    if not value:
        return []
    try:
        return json.loads(value)
    except Exception:
        return []


@router.get("/")
def get_faculty():
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM faculty")
    faculty = cursor.fetchall()
    cursor.close()
    conn.close()

    for item in faculty:
        item["education"] = _parse_json_column(item.get("education"))
        item["key_achievements"] = _parse_json_column(item.get("key_achievements"))

    return faculty


@router.post("/")
def create_faculty(faculty: Faculty):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO faculty (
            name, specialization, image, email, about, education,
            key_achievements, contact_info, experience
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            faculty.name,
            faculty.specialization,
            faculty.image,
            faculty.email,
            faculty.about,
            json.dumps([education.model_dump() for education in faculty.education]),
            json.dumps([achievement.model_dump() for achievement in faculty.key_achievements]),
            faculty.contact_info,
            faculty.experience,
        ),
    )
    conn.commit()
    faculty_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id": faculty_id, **faculty.model_dump()}


@router.put("/{faculty_id}")
def update_faculty(faculty_id: int, faculty: Faculty):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE faculty
        SET name = %s, specialization = %s, image = %s, email = %s,
            about = %s, education = %s, key_achievements = %s,
            contact_info = %s, experience = %s
        WHERE id = %s
        """,
        (
            faculty.name,
            faculty.specialization,
            faculty.image,
            faculty.email,
            faculty.about,
            json.dumps([education.model_dump() for education in faculty.education]),
            json.dumps([achievement.model_dump() for achievement in faculty.key_achievements]),
            faculty.contact_info,
            faculty.experience,
            faculty_id,
        ),
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": faculty_id, **faculty.model_dump()}


@router.delete("/{faculty_id}")
def delete_faculty(faculty_id: int):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute("DELETE FROM faculty WHERE id = %s", (faculty_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Faculty deleted"}
