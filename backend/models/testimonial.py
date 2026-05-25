from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Testimonial(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    name: str
    role: str
    content: str
    rating: int
    avatar: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int
    avatar: str