# Contratos de API - ZEGERS PROPIEDADES

## Datos Mockeados Actualmente (mock.js)
1. **Propiedades** - 1 departamento en Gómez Carreño
2. **Testimonios** - 3 testimonios de clientes
3. **Servicios** - 2 servicios (Compra y Venta, Arriendo)
4. **Formulario de contacto** - guardado en localStorage
5. **Consultas de propiedades** - guardado en localStorage

## Modelos de Base de Datos

### Property
```
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  type: String, // "Casa", "Departamento", "Oficina", "Local Comercial"
  status: String, // "Venta", "Arriendo"
  image: String, // URL principal
  images: [String], // Array de URLs
  parking: Number,
  expenses: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial
```
{
  _id: ObjectId,
  name: String,
  role: String,
  content: String,
  rating: Number,
  avatar: String,
  createdAt: Date
}
```

### Contact
```
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: Date
}
```

### PropertyInquiry
```
{
  _id: ObjectId,
  propertyId: String,
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date
}
```

## Endpoints de API

### Propiedades
- `GET /api/properties` - Listar todas las propiedades
- `GET /api/properties/:id` - Obtener una propiedad por ID
- `POST /api/properties` - Crear nueva propiedad
- `PUT /api/properties/:id` - Actualizar propiedad
- `DELETE /api/properties/:id` - Eliminar propiedad

### Testimonios
- `GET /api/testimonials` - Listar todos los testimonios
- `POST /api/testimonials` - Crear nuevo testimonio

### Contacto
- `POST /api/contacts` - Enviar formulario de contacto
- `GET /api/contacts` - Listar todos los contactos (admin)

### Consultas de Propiedades
- `POST /api/property-inquiries` - Enviar consulta sobre propiedad
- `GET /api/property-inquiries` - Listar todas las consultas (admin)

## Integración Frontend-Backend

### Archivos a Modificar
1. **src/data/mock.js** - Eliminar funciones de guardado en localStorage
2. **src/components/FeaturedProperties.jsx** - Usar API para propiedades
3. **src/components/Testimonials.jsx** - Usar API para testimonios
4. **src/components/Contact.jsx** - Usar API para contactos

### Nuevos Archivos
1. **src/services/api.js** - Funciones para llamadas a API
2. **backend/models/** - Modelos de MongoDB
3. **backend/routes/** - Rutas de API

## Datos Seed Iniciales
- 1 propiedad existente (Departamento Gómez Carreño)
- 3 testimonios existentes
- 2 servicios (solo frontend, no requiere backend)
