from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Property(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    title: str
    description: str
    price: float
    location: str
    image: Optional[str] = None
    images: Optional[List[str]] = []
    bedrooms: Optional[int] = 0
    bathrooms: Optional[int] = 0
    area: Optional[float] = 0
    type: Optional[str] = None
    status: Optional[str] = None
    parking: Optional[int] = 0
    expenses: Optional[float] = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class PropertyCreate(BaseModel):
    title: str
    description: str
    price: float
    location: str
    image: Optional[str] = None
    images: Optional[List[str]] = []
    bedrooms: Optional[int] = 0
    bathrooms: Optional[int] = 0
    area: Optional[float] = 0
    type: Optional[str] = None
    status: Optional[str] = None
    parking: Optional[int] = 0
    expenses: Optional[float] = 0

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    location: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    area: Optional[float] = None
    type: Optional[str] = None
    status: Optional[str] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    parking: Optional[int] = None
    expenses: Optional[float] = None