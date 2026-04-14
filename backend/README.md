# Dental Academy Backend

## Setup Instructions

<<<<<<< HEAD
### 1. Install MySQL
Make sure MySQL is installed and running on your system.

### 2. Configure Database
Update the database credentials in `app/database/db.py`:
```python
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "root",  # Change this to your MySQL password
    "database": "dental_academy"
}
```
=======
### 1. Install PostgreSQL
Make sure PostgreSQL is installed and running on your system.

### 2. Configure Database
Copy `.env.example` to `.env` and update credentials:
```bash
cp .env.example .env
```
Set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `.env`.
>>>>>>> 878fd9ce2dbbc4db0e28974bd4b4cd0c08bfc81f

### 3. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the Server
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at: http://localhost:8000

### 5. Default Admin Credentials
- Username: `admin`
- Password: `admin123`

### API Documentation
Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database Tables
The application will automatically create the following tables:
- `admin` - Admin users
- `faculty` - Faculty members
- `courses` - Available courses
- `enquiries` - Student enquiries
