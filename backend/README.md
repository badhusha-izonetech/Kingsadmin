# Dental Academy Backend

## Setup Instructions

### 1. Install MySQL
Make sure MySQL is installed and running on your system.

### 2. Configure Database
Set these environment variables, or create a `.env` file in the backend folder:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=dental_academy
```

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
