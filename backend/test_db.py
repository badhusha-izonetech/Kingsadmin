import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.db import get_db_connection, init_db

def test_database():
    print("Testing database connection...")
    
    # Initialize database
    try:
        init_db()
        print("[OK] Database initialized successfully")
    except Exception as e:
        print(f"[ERROR] Database initialization failed: {e}")
        return False
    
    # Test connection
    try:
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT COUNT(*) as count FROM admin")
            result = cursor.fetchone()
            print(f"[OK] Database connection successful. Admin count: {result['count']}")
            cursor.close()
            conn.close()
            return True
        else:
            print("[ERROR] Failed to get database connection")
            return False
    except Exception as e:
        print(f"[ERROR] Database connection test failed: {e}")
        return False

if __name__ == "__main__":
    if test_database():
        print("\nAll tests passed! Backend is ready to start.")
    else:
        print("\nTests failed! Please check your database configuration.")