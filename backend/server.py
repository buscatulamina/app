from fastapi import FastAPI, APIRouter, HTTPException, status, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import asyncio
import requests
from pathlib import Path
from typing import List
from datetime import datetime

from models import (
    Property, PropertyCreate, PropertyUpdate,
    Testimonial, TestimonialCreate,
    Contact, ContactCreate,
    PropertyInquiry, PropertyInquiryCreate,
    Visit, VisitCreate,
    WhatsappContact, WhatsappContactCreate
)


def get_client_ip(request: Request) -> str:
    """Extract the real client IP, taking proxies/load balancers into account."""
    if "X-Forwarded-For" in request.headers:
        return request.headers["X-Forwarded-For"].split(",")[0].strip()
    return request.client.host if request.client else "Unknown"


async def get_city_from_ip(ip: str):
    """Resolve an IP address to a city/country/region using the free ip-api.com service."""
    if not ip or ip in ("127.0.0.1", "localhost", "::1"):
        return {"ciudad": "Unknown", "pais": None, "region": None}

    def _lookup():
        try:
            response = requests.get(
                f"http://ip-api.com/json/{ip}",
                params={"fields": "status,message,country,regionName,city"},
                timeout=3,
            )
            data = response.json()
            if data.get("status") == "success":
                return {
                    "ciudad": data.get("city") or "Unknown",
                    "pais": data.get("country"),
                    "region": data.get("regionName"),
                }
        except Exception as e:
            logging.error(f"Error resolving IP geolocation for {ip}: {e}")
        return {"ciudad": "Unknown", "pais": None, "region": None}

    return await asyncio.to_thread(_lookup)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Add CORS middleware BEFORE including the router so it applies to all API routes
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== PROPERTIES ====================

@api_router.get("/properties", response_model=List[Property])
async def get_properties():
    properties = await db.properties.find().to_list(1000)
    for prop in properties:
        prop['_id'] = str(prop['_id'])
    return properties

@api_router.get("/properties/{property_id}")
async def get_property(property_id: str):
    property_data = await db.properties.find_one({"_id": ObjectId(property_id)})
    if not property_data:
        raise HTTPException(status_code=404, detail="Property not found")
    property_data['_id'] = str(property_data['_id'])
    return property_data

@api_router.post("/properties", response_model=Property, status_code=status.HTTP_201_CREATED)
async def create_property(property_data: PropertyCreate):
    # Validate required fields explicitly to return a clear 400 on missing data
    missing = [f for f in ("title", "description", "price", "location")
               if not getattr(property_data, f, None)]
    if missing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Missing required fields: {', '.join(missing)}"
        )

    property_dict = property_data.dict()
    property_dict['createdAt'] = datetime.utcnow()
    property_dict['updatedAt'] = datetime.utcnow()

    result = await db.properties.insert_one(property_dict)
    property_dict['_id'] = str(result.inserted_id)
    return Property(**property_dict)

@api_router.put("/properties/{property_id}", response_model=Property)
async def update_property(property_id: str, property_data: PropertyUpdate):
    update_data = {k: v for k, v in property_data.dict().items() if v is not None}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await db.properties.find_one_and_update(
        {"_id": ObjectId(property_id)},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Property not found")
    
    result['_id'] = str(result['_id'])
    return Property(**result)

@api_router.delete("/properties/{property_id}")
async def delete_property(property_id: str):
    result = await db.properties.delete_one({"_id": ObjectId(property_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property deleted successfully"}

# ==================== TESTIMONIALS ====================

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find().to_list(1000)
    for test in testimonials:
        test['_id'] = str(test['_id'])
    return testimonials

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial_data: TestimonialCreate):
    testimonial_dict = testimonial_data.dict()
    testimonial_dict['createdAt'] = datetime.utcnow()
    
    result = await db.testimonials.insert_one(testimonial_dict)
    testimonial_dict['_id'] = str(result.inserted_id)
    return Testimonial(**testimonial_dict)

# ==================== CONTACTS ====================

@api_router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate):
    contact_dict = contact_data.dict()
    contact_dict['createdAt'] = datetime.utcnow()
    
    result = await db.contacts.insert_one(contact_dict)
    contact_dict['_id'] = str(result.inserted_id)
    return Contact(**contact_dict)

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find().sort("createdAt", -1).to_list(1000)
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return contacts

# ==================== PROPERTY INQUIRIES ====================

@api_router.post("/property-inquiries", response_model=PropertyInquiry)
async def create_property_inquiry(inquiry_data: PropertyInquiryCreate):
    inquiry_dict = inquiry_data.dict()
    inquiry_dict['createdAt'] = datetime.utcnow()
    
    result = await db.property_inquiries.insert_one(inquiry_dict)
    inquiry_dict['_id'] = str(result.inserted_id)
    return PropertyInquiry(**inquiry_dict)

@api_router.get("/property-inquiries", response_model=List[PropertyInquiry])
async def get_property_inquiries():
    inquiries = await db.property_inquiries.find().sort("createdAt", -1).to_list(1000)
    for inquiry in inquiries:
        inquiry['_id'] = str(inquiry['_id'])
    return inquiries


# ==================== VISITS & ANALYTICS ====================

@api_router.post("/visits", response_model=Visit)
async def record_visit(visit_data: VisitCreate, request: Request):
    client_ip = get_client_ip(request)
    geo_data = await get_city_from_ip(client_ip)

    visit_dict = visit_data.dict()
    visit_dict['ip_address'] = client_ip
    visit_dict['ciudad'] = geo_data.get('ciudad')
    visit_dict['pais'] = geo_data.get('pais') or visit_dict.get('pais')
    visit_dict['region'] = geo_data.get('region') or visit_dict.get('region')
    visit_dict['timestamp'] = datetime.utcnow()

    result = await db.visits.insert_one(visit_dict)
    visit_dict['_id'] = str(result.inserted_id)
    return Visit(**visit_dict)

@api_router.get("/analytics/visits", response_model=List[Visit])
async def get_visits():
    visits = await db.visits.find().sort("timestamp", -1).to_list(10000)
    for visit in visits:
        visit['_id'] = str(visit['_id'])
    return visits

@api_router.get("/analytics/visits/stats")
async def get_visits_stats():
    total_visits = await db.visits.count_documents({})
    
    visits_by_city = await db.visits.aggregate([
        {"$group": {"_id": "$ciudad", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]).to_list(100)
    
    visits_by_device = await db.visits.aggregate([
        {"$group": {"_id": "$dispositivo", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]).to_list(100)
    
    return {
        "total_visits": total_visits,
        "by_city": visits_by_city,
        "by_device": visits_by_device
    }

# ==================== WHATSAPP CONTACTS ====================

@api_router.post("/whatsapp-contacts", response_model=WhatsappContact)
async def record_whatsapp_contact(contact_data: WhatsappContactCreate):
    contact_dict = contact_data.dict()
    contact_dict['timestamp'] = datetime.utcnow()
    
    result = await db.whatsapp_contacts.insert_one(contact_dict)
    contact_dict['_id'] = str(result.inserted_id)
    return WhatsappContact(**contact_dict)

@api_router.get("/analytics/whatsapp-contacts", response_model=List[WhatsappContact])
async def get_whatsapp_contacts():
    contacts = await db.whatsapp_contacts.find().sort("timestamp", -1).to_list(10000)
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return contacts

@api_router.get("/analytics/whatsapp-contacts/stats")
async def get_whatsapp_stats():
    total_contacts = await db.whatsapp_contacts.count_documents({})
    
    contacts_by_city = await db.whatsapp_contacts.aggregate([
        {"$group": {"_id": "$ciudad", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]).to_list(100)
    
    return {
        "total_contacts": total_contacts,
        "by_city": contacts_by_city
    }

@api_router.get("/analytics/conversion")
async def get_conversion_stats():
    total_visits = await db.visits.count_documents({})
    total_contacts = await db.whatsapp_contacts.count_documents({})
    
    conversion_rate = (total_contacts / total_visits * 100) if total_visits > 0 else 0
    
    return {
        "total_visits": total_visits,
        "total_contacts": total_contacts,
        "conversion_rate": round(conversion_rate, 2)
    }
# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "ZEGERS PROPIEDADES API", "status": "active"}

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
