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

async def add_properties():
    print("Agregando propiedades adicionales...")
    
    new_properties = [
        {
            "_id": "2",
            "title": "Casa de Campo en Olmué",
            "description": "Hermosa casa rodeada de naturaleza, con amplio jardín y vista a los cerros. Ideal para vida tranquila y familiar.",
            "price": 220000000,
            "location": "Olmué, Valparaíso",
            "bedrooms": 3,
            "bathrooms": 2,
            "area": 180.0,
            "type": "Casa",
            "status": "Venta",
            "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
            "images": [
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
                "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800"
            ],
            "parking": 2,
            "expenses": 0,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "_id": "3",
            "title": "Casa Moderna en Limache",
            "description": "Casa nueva con terminaciones de primera, patio amplio y excelente conectividad. Sector residencial tranquilo.",
            "price": 185000000,
            "location": "Limache, Valparaíso",
            "bedrooms": 4,
            "bathrooms": 3,
            "area": 165.0,
            "type": "Casa",
            "status": "Venta",
            "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
            "images": [
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
            ],
            "parking": 2,
            "expenses": 0,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "_id": "4",
            "title": "Departamento en Villa Alemana",
            "description": "Cómodo departamento en condominio con áreas verdes, piscina y excelente ubicación cerca de servicios.",
            "price": 350000,
            "location": "Villa Alemana, Valparaíso",
            "bedrooms": 2,
            "bathrooms": 1,
            "area": 65.0,
            "type": "Departamento",
            "status": "Arriendo",
            "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "images": [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
                "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
            ],
            "parking": 1,
            "expenses": 80000,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    for prop in new_properties:
        existing = await db.properties.find_one({"_id": prop["_id"]})
        if existing:
            print(f"  Ya existe: {prop['title']}")
        else:
            await db.properties.insert_one(prop)
            print(f"  Agregada: {prop['title']}")
    
    print("Listo!")

if __name__ == "__main__":
    asyncio.run(add_properties())
    client.close()
