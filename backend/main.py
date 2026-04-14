from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import init_db
from app.routes import auth, contacts, courses, enquiries, faculty, gallery, notifications, popup, testimonials

app = FastAPI(title="Dental Academy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    init_db()


app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(faculty.router, prefix="/api/faculty", tags=["Faculty"])
app.include_router(courses.router, prefix="/api/courses", tags=["Courses"])
app.include_router(enquiries.router, prefix="/api/enquiries", tags=["Enquiries"])
app.include_router(contacts.router, prefix="/api/contacts", tags=["Contacts"])
app.include_router(popup.router, prefix="/api/popup", tags=["Popup"])
app.include_router(gallery.router, prefix="/api/gallery", tags=["Gallery"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(testimonials.router, prefix="/api/testimonials", tags=["Testimonials"])


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Dental Academy API"}
