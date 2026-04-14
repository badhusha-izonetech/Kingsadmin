from fastapi import APIRouter
from app.models.schemas import GalleryItem
from app.database.db import get_db_connection

router = APIRouter()

@router.get("/")
def get_gallery():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM gallery ORDER BY created_at DESC")
    items = cursor.fetchall()
    cursor.close()
    conn.close()
    return items

@router.get("/category/{category}")
def get_gallery_by_category(category: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM gallery WHERE category = %s ORDER BY created_at DESC", (category,))
    items = cursor.fetchall()
    cursor.close()
    conn.close()
    return items

@router.post("/")
def create_gallery_item(item: GalleryItem):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "INSERT INTO gallery (title, media_type, file_url, category) VALUES (%s, %s, %s, %s)",
        (item.title, item.media_type, item.file_url, item.category)
    )
    item_id = cursor.lastrowid
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": item_id, **item.dict()}

@router.put("/{item_id}")
def update_gallery_item(item_id: int, item: GalleryItem):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "UPDATE gallery SET title = %s, media_type = %s, file_url = %s, category = %s WHERE id = %s",
        (item.title, item.media_type, item.file_url, item.category, item_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": item_id, **item.dict()}

@router.delete("/{item_id}")
def delete_gallery_item(item_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("DELETE FROM gallery WHERE id = %s", (item_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Gallery item deleted"}
