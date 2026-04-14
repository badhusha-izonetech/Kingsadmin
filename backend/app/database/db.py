import os
from typing import Optional

import mysql.connector
from mysql.connector import Error

try:
    from dotenv import load_dotenv

    load_dotenv()
except Exception:
    pass

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "dental_academy"),
    "port": int(os.getenv("DB_PORT", "3306")),
}


def _connect(include_database: bool = True):
    kwargs = {
        "host": DB_CONFIG["host"],
        "user": DB_CONFIG["user"],
        "password": DB_CONFIG["password"],
        "port": DB_CONFIG["port"],
    }
    if include_database:
        kwargs["database"] = DB_CONFIG["database"]
    return mysql.connector.connect(**kwargs)


def get_db_connection():
    try:
        return _connect(include_database=True)
    except Error as exc:
        print(f"MySQL connection error: {exc}")
        return None


def _insert_default_admin(cursor) -> None:
    cursor.execute("SELECT id FROM admin WHERE username = %s", ("admin",))
    if cursor.fetchone():
        return

    from passlib.context import CryptContext

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash("admin123")
    cursor.execute(
        "INSERT INTO admin (username, password) VALUES (%s, %s)",
        ("admin", hashed_password),
    )


def _seed_faculty(cursor) -> None:
    cursor.execute("SELECT COUNT(*) AS count FROM faculty")
    result = cursor.fetchone()
    if result and result["count"] > 0:
        return

    faculty_rows = [
        (
            "Dr. Rajesh Kumar",
            "Orthodontics",
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
            "rajesh@kingsdentalacademy.com",
            "Experienced orthodontics mentor",
            "[]",
            "[]",
            "+91 9876543210",
            "15 Years",
        ),
        (
            "Dr. Priya Sharma",
            "Endodontics",
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
            "priya@kingsdentalacademy.com",
            "Specialist in advanced endodontic workflows",
            "[]",
            "[]",
            "+91 9876543211",
            "12 Years",
        ),
    ]
    cursor.executemany(
        """
        INSERT INTO faculty (
            name, specialization, image, email, about, education,
            key_achievements, contact_info, experience
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        faculty_rows,
    )


def _seed_courses(cursor) -> None:
    cursor.execute("SELECT COUNT(*) AS count FROM courses")
    result = cursor.fetchone()
    if result and result["count"] > 0:
        return

    course_rows = [
        (
            "Advanced Implantology Fellowship",
            "250000",
            "6 Months",
            "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
            "Comprehensive implant placement program with hands-on practice.",
            "Includes surgical planning, live cases, and prosthetic rehabilitation.",
        ),
        (
            "Digital Dentistry Masterclass",
            "180000",
            "4 Months",
            "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
            "Digital workflows covering CAD/CAM, scanning, and smile design.",
            "Ideal for clinicians adopting modern chairside digital systems.",
        ),
    ]
    cursor.executemany(
        """
        INSERT INTO courses (name, price, duration, image, description, details)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        course_rows,
    )


def init_db() -> bool:
    try:
        bootstrap_connection = _connect(include_database=False)
        bootstrap_cursor = bootstrap_connection.cursor()
        bootstrap_cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_CONFIG['database']}`")
        bootstrap_cursor.close()
        bootstrap_connection.close()
    except Error as exc:
        print(f"Database bootstrap error: {exc}")
        return False

    connection = get_db_connection()
    if connection is None:
        return False

    try:
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS faculty (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                specialization VARCHAR(100) NOT NULL,
                image TEXT,
                email VARCHAR(100),
                about TEXT,
                education LONGTEXT,
                key_achievements LONGTEXT,
                contact_info VARCHAR(100),
                experience VARCHAR(50)
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                price VARCHAR(50),
                duration VARCHAR(50) NOT NULL,
                image TEXT,
                description TEXT,
                details TEXT
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS enquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                college VARCHAR(200) NOT NULL,
                course_name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS contact_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                course VARCHAR(100) NOT NULL,
                subcourse VARCHAR(100),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS popup_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                image VARCHAR(500),
                status ENUM('active', 'inactive') DEFAULT 'inactive',
                deadline DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                media_type ENUM('image', 'video') NOT NULL,
                file_url VARCHAR(500) NOT NULL,
                category VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS testimonials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                designation VARCHAR(100) NOT NULL,
                content TEXT NOT NULL,
                rating INT DEFAULT 5,
                profile_image TEXT,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS notifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        _insert_default_admin(cursor)
        _seed_faculty(cursor)
        _seed_courses(cursor)

        connection.commit()
        return True
    except Error as exc:
        print(f"Database initialization error: {exc}")
        return False
    finally:
        connection.close()
