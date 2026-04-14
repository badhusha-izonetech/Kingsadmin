import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.db import get_db_connection

def test_enquiry_system():
    print("Testing enquiry system...")
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if enquiries table exists
        cursor.execute("SHOW TABLES LIKE 'enquiries'")
        table_exists = cursor.fetchone()
        
        if not table_exists:
            print("[ERROR] enquiries table does not exist")
            return False
            
        print("[OK] enquiries table exists")
        
        # Check table structure
        cursor.execute("DESCRIBE enquiries")
        columns = cursor.fetchall()
        expected_columns = ['id', 'student_name', 'email', 'phone', 'college', 'course_name', 'created_at']
        actual_columns = [col['Field'] for col in columns]
        
        for col in expected_columns:
            if col in actual_columns:
                print(f"[OK] Column '{col}' exists")
            else:
                print(f"[ERROR] Column '{col}' missing")
                return False
        
        # Test creating a sample enquiry
        cursor.execute("""
            INSERT INTO enquiries (student_name, email, phone, college, course_name) 
            VALUES (%s, %s, %s, %s, %s)
        """, (
            "Test Student", 
            "test@example.com",
            "+91 9876543210",
            "Test Dental College",
            "Advanced Implantology Fellowship"
        ))
        
        enquiry_id = cursor.lastrowid
        conn.commit()
        print(f"[OK] Test enquiry created with ID: {enquiry_id}")
        
        # Test getting enquiries
        cursor.execute("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 1")
        latest_enquiry = cursor.fetchone()
        
        if latest_enquiry:
            print(f"[OK] Latest enquiry found: {latest_enquiry['student_name']} - {latest_enquiry['course_name']}")
        else:
            print("[ERROR] No enquiries found")
            return False
        
        # Check if notification was created
        cursor.execute("SELECT * FROM notifications WHERE message LIKE %s ORDER BY created_at DESC LIMIT 1", 
                      (f"%{latest_enquiry['student_name']}%",))
        notification = cursor.fetchone()
        
        if notification:
            print(f"[OK] Notification created: {notification['message']}")
        else:
            print("[WARNING] No notification found (this might be expected)")
        
        # Clean up test enquiry
        cursor.execute("DELETE FROM enquiries WHERE id = %s", (enquiry_id,))
        conn.commit()
        print("[OK] Test enquiry cleaned up")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"[ERROR] Enquiry test failed: {e}")
        return False

if __name__ == "__main__":
    if test_enquiry_system():
        print("\n[SUCCESS] Enquiry system test passed!")
        print("\nHow to test enquiries:")
        print("1. Go to http://localhost:5173/ (main website)")
        print("2. Click 'Enquire Now' on any course")
        print("3. Fill in the form and submit")
        print("4. Go to Admin Dashboard -> Course Enquiries")
        print("5. New enquiry should appear within 3 seconds!")
    else:
        print("\n[FAILED] Enquiry system test failed!")