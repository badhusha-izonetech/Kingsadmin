from fastapi import APIRouter, HTTPException
from app.models.schemas import TestimonialCreate, TestimonialUpdate
from app.database.db import get_db_connection
from typing import List

router = APIRouter()

@router.get("/")
def get_testimonials():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM testimonials ORDER BY created_at DESC")
    testimonials = cursor.fetchall()
    cursor.close()
    conn.close()
    return testimonials

@router.get("/active")
def get_active_testimonials():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM testimonials WHERE status = 'active' ORDER BY created_at DESC")
    testimonials = cursor.fetchall()
    cursor.close()
    conn.close()
    return testimonials

@router.post("/")
def create_testimonial(testimonial: TestimonialCreate):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "INSERT INTO testimonials (name, designation, content, rating, profile_image, status) VALUES (%s, %s, %s, %s, %s, %s)",
        (testimonial.name, testimonial.designation, testimonial.content, testimonial.rating, testimonial.profile_image, testimonial.status)
    )
    testimonial_id = cursor.lastrowid
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": testimonial_id, "message": "Testimonial created successfully"}

@router.put("/{testimonial_id}")
def update_testimonial(testimonial_id: int, testimonial: TestimonialUpdate):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "UPDATE testimonials SET name = %s, designation = %s, content = %s, rating = %s, profile_image = %s, status = %s WHERE id = %s",
        (testimonial.name, testimonial.designation, testimonial.content, testimonial.rating, testimonial.profile_image, testimonial.status, testimonial_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Testimonial updated successfully"}

@router.delete("/{testimonial_id}")
def delete_testimonial(testimonial_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("DELETE FROM testimonials WHERE id = %s", (testimonial_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Testimonial deleted successfully"}