from fastapi import APIRouter, HTTPException

from app.database.db import get_db_connection
from app.models.schemas import Course

router = APIRouter()


@router.get("/")
def get_courses():
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM courses")
    courses = cursor.fetchall()
    cursor.close()
    conn.close()
    return courses


@router.post("/")
def create_course(course: Course):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO courses (name, price, duration, image, description, details)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            course.name,
            course.price,
            course.duration,
            course.image,
            course.description,
            course.details,
        ),
    )
    conn.commit()
    course_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id": course_id, **course.model_dump()}


@router.put("/{course_id}")
def update_course(course_id: int, course: Course):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE courses
        SET name = %s, price = %s, duration = %s, image = %s, description = %s, details = %s
        WHERE id = %s
        """,
        (
            course.name,
            course.price,
            course.duration,
            course.image,
            course.description,
            course.details,
            course_id,
        ),
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": course_id, **course.model_dump()}


@router.delete("/{course_id}")
def delete_course(course_id: int):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = conn.cursor()
    cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Course deleted"}
