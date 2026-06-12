from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

from models import (
    Property, PropertyCreate, PropertyUpdate,
    Testimonial, TestimonialCreate,
    Contact, ContactCreate,
    PropertyInquiry, PropertyInquiryCreate
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

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
    property_data = await db.properties.find_one({"_id": property_id})
    if not property_data:
        raise HTTPException(status_code=404, detail="Property not found")
    property_data['_id'] = str(property_data['_id'])
    return property_data

@api_router.post("/properties", response_model=Property)
async def create_property(property_data: PropertyCreate):
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
        {"_id": property_id},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Property not found")
    
    result['_id'] = str(result['_id'])
    return Property(**result)

@api_router.delete("/properties/{property_id}")
async def delete_property(property_id: str):
    result = await db.properties.delete_one({"_id": property_id})
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

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def api_root():
    return {"message": "ZEGERS PROPIEDADES API", "status": "active"}

# ==================== ROOT ====================

@app.get("/")
async def root():
    return {
        "message": "ZEGERS PROPIEDADES API",
        "status": "active",
        "docs": "/docs",
        "api": "/api/"
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
