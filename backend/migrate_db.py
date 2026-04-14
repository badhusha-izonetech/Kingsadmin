from app.database.db import get_db_connection

def migrate_database():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Add new columns to faculty table
        print("Adding new columns to faculty table...")
        
        # Check if columns exist before adding them
        cursor.execute("SHOW COLUMNS FROM faculty LIKE 'email'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE faculty ADD COLUMN email VARCHAR(255)")
            
        cursor.execute("SHOW COLUMNS FROM faculty LIKE 'education'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE faculty ADD COLUMN education JSON")
            
        cursor.execute("SHOW COLUMNS FROM faculty LIKE 'about'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE faculty ADD COLUMN about TEXT")
            
        cursor.execute("SHOW COLUMNS FROM faculty LIKE 'key_achievements'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE faculty ADD COLUMN key_achievements JSON")
        
        # Add date column to announcements table
        cursor.execute("SHOW COLUMNS FROM announcements LIKE 'date'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE announcements ADD COLUMN date DATE")
        
        # Create contact_details table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contact_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                course VARCHAR(255) NOT NULL,
                subcourse VARCHAR(255),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        print("Database migration completed successfully!")
        
    except Exception as e:
        print(f"Migration error: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    migrate_database()