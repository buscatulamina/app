from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Visit(BaseModel):
    id: Optional[str] = Field(default=None, alias='_id')
    ip: Optional[str] = None
    ip_address: Optional[str] = None
    ciudad: Optional[str] = None
    pais: Optional[str] = None
    region: Optional[str] = None
    dispositivo: Optional[str] = None
    navegador: Optional[str] = None
    user_agent: Optional[str] = None
    referer: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class VisitCreate(BaseModel):
    ip: Optional[str] = None
    ciudad: Optional[str] = None
    pais: Optional[str] = None
    region: Optional[str] = None
    dispositivo: Optional[str] = None
    navegador: Optional[str] = None
    user_agent: Optional[str] = None
    referer: Optional[str] = None
