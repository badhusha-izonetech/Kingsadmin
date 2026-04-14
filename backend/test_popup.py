import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.db import get_db_connection

def test_popup_functionality():
    print("Testing popup functionality...")
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if popup_messages table exists and has data
        cursor.execute("SHOW TABLES LIKE 'popup_messages'")
        table_exists = cursor.fetchone()
        
        if not table_exists:
            print("[ERROR] popup_messages table does not exist")
            return False
            
        print("[OK] popup_messages table exists")
        
        # Check table structure
        cursor.execute("DESCRIBE popup_messages")
        columns = cursor.fetchall()
        expected_columns = ['id', 'title', 'description', 'image', 'status', 'deadline', 'created_at']
        actual_columns = [col['Field'] for col in columns]
        
        for col in expected_columns:
            if col in actual_columns:
                print(f"[OK] Column '{col}' exists")
            else:
                print(f"[ERROR] Column '{col}' missing")
                return False
        
        # Test creating a sample popup
        cursor.execute("""
            INSERT INTO popup_messages (title, description, image, status, deadline) 
            VALUES (%s, %s, %s, %s, %s)
        """, (
            "Test Popup", 
            "This is a test popup message to verify functionality.", 
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
            "active",
            "2024-12-31"
        ))
        
        popup_id = cursor.lastrowid
        conn.commit()
        print(f"[OK] Test popup created with ID: {popup_id}")
        
        # Test getting active popup
        cursor.execute("SELECT * FROM popup_messages WHERE status = 'active' ORDER BY created_at DESC LIMIT 1")
        active_popup = cursor.fetchone()
        
        if active_popup:
            print(f"[OK] Active popup found: {active_popup['title']}")
        else:
            print("[ERROR] No active popup found")
            return False
        
        # Clean up test popup
        cursor.execute("DELETE FROM popup_messages WHERE id = %s", (popup_id,))
        conn.commit()
        print("[OK] Test popup cleaned up")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"[ERROR] Popup test failed: {e}")
        return False

if __name__ == "__main__":
    if test_popup_functionality():
        print("\n[SUCCESS] Popup functionality test passed!")
        print("\nHow to use popups:")
        print("1. Go to Admin Dashboard -> Popup Messages")
        print("2. Create a new popup with status 'active'")
        print("3. Users will see it on http://localhost:5173/")
        print("4. Popup appears automatically when page loads")
    else:
        print("\n[FAILED] Popup functionality test failed!")