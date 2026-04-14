from app.database.db import get_db_connection

def seed_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if data already exists
    cursor.execute("SELECT COUNT(*) FROM faculty")
    if cursor.fetchone()[0] > 0:
        print("Data already exists. Skipping seed.")
        return
    
    # Seed Faculty
    faculty_data = [
        ("Dr. Rajesh Kumar", "Director & Chief Implantologist", "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"),
        ("Dr. Priya Sharma", "Head of Digital Dentistry", "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"),
        ("Dr. Anil Menon", "Senior Prosthodontist", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"),
        ("Dr. Kavita Nair", "Oral Surgery Specialist", "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"),
    ]
    
    cursor.executemany(
        "INSERT INTO faculty (name, specialization, image) VALUES (%s, %s, %s)",
        faculty_data
    )
    
    # Seed Courses
    courses_data = [
        ("Implant Fellowship", "₹2,50,000", "6 Months", "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop"),
        ("Digital Dentistry", "₹1,80,000", "3 Months", "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"),
        ("Weekend Workshop", "₹45,000", "2 Days", "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"),
        ("Advanced Prosthodontics", "₹3,00,000", "12 Months", "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop"),
    ]
    
    cursor.executemany(
        "INSERT INTO courses (name, price, duration, image) VALUES (%s, %s, %s, %s)",
        courses_data
    )
    
    conn.commit()
    cursor.close()
    conn.close()
    print("Sample data seeded successfully!")

if __name__ == "__main__":
    seed_data()
