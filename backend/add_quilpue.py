import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def add_quilpue():
    existing = await db.properties.find_one({"_id": "5"})
    if existing:
        print("Propiedad ya existe")
        return
    
    property_data = {
        "_id": "5",
        "title": "Casa Familiar en Quilpué",
        "description": "Acogedora casa en sector residencial de Quilpué, con jardín, quincho y excelente conectividad.",
        "price": 165000000,
        "location": "Quilpué, Valparaíso",
        "bedrooms": 3,
        "bathrooms": 2,
        "area": 140.0,
        "type": "Casa",
        "status": "Venta",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "images": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
        ],
        "parking": 2,
        "expenses": 0,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    await db.properties.insert_one(property_data)
    print(f"Agregada: {property_data['title']}")

if __name__ == "__main__":
    asyncio.run(add_quilpue())
    client.close()
