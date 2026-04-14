from typing import List, Optional

from pydantic import BaseModel, Field


class AdminLogin(BaseModel):
    username: str
    password: str


class Education(BaseModel):
    degree: str
    institution: str
    year: str


class KeyAchievement(BaseModel):
    title: str
    image: Optional[str] = None
    about: str
    key_benefit: str
    description: str
    duration: str
    expertise: str
    success_rate: str


class Faculty(BaseModel):
    name: str
    specialization: str
    image: Optional[str] = None
    email: Optional[str] = None
    education: List[Education] = Field(default_factory=list)
    about: Optional[str] = None
    key_achievements: List[KeyAchievement] = Field(default_factory=list)
    contact_info: Optional[str] = None
    experience: Optional[str] = None


class Course(BaseModel):
    name: str
    duration: str
    price: Optional[str] = None
    image: Optional[str] = None
    description: Optional[str] = None
    details: Optional[str] = None


class Enquiry(BaseModel):
    studentName: str
    email: str
    phone: str
    college: str
    courseName: str


class ContactDetails(BaseModel):
    name: str
    email: str
    phone: str
    course: str
    subcourse: Optional[str] = None
    message: Optional[str] = None


class PopupMessage(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    status: str = "inactive"
    deadline: Optional[str] = None


class GalleryItem(BaseModel):
    title: str
    media_type: str
    file_url: str
    category: str


class TestimonialCreate(BaseModel):
    name: str
    designation: str
    content: str
    rating: int
    profile_image: Optional[str] = None
    status: str = "active"


class TestimonialUpdate(BaseModel):
    name: str
    designation: str
    content: str
    rating: int
    profile_image: Optional[str] = None
    status: str = "active"
