from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class PropertyInquiry(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    propertyId: str
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = ""
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class PropertyInquiryCreate(BaseModel):
    propertyId: str
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = ""