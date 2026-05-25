from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class Contact(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str