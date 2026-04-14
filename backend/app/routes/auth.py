from fastapi import APIRouter, HTTPException
from app.models.schemas import AdminLogin
from app.database.db import get_db_connection
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "dental_academy_secret_key_2024"
ALGORITHM = "HS256"

@router.post("/login")
def login(credentials: AdminLogin):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM admin WHERE username = %s", (credentials.username,))
    admin = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not admin or not pwd_context.verify(credentials.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode(
        {"sub": admin["username"], "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    
    return {"token": token, "username": admin["username"]}
