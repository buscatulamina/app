from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class WhatsappContact(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    ip: str
    ciudad: Optional[str] = None
    edad: Optional[int] = None
    nombre: Optional[str] = None
    telefono: Optional[str] = None
    mensaje: Optional[str] = None
    propiedad_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class WhatsappContactCreate(BaseModel):
    ip: str
    ciudad: Optional[str] = None
    edad: Optional[int] = None
    nombre: Optional[str] = None
    telefono: Optional[str] = None
    mensaje: Optional[str] = None
    propiedad_id: Optional[str] = None
