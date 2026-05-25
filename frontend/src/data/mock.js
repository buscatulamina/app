export const mockProperties = [
  {
    id: '1',
    title: 'Departamento 4D 2B en Gómez Carreño',
    description: 'Amplio departamento con 4 dormitorios, 2 baños completos y 1 estacionamiento. Gastos comunes $100.000.',
    price: 500000,
    location: 'Gómez Carreño, Viña del Mar',
    bedrooms: 4,
    bathrooms: 2,
    area: 90,
    type: 'Departamento',
    status: 'Arriendo',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    parking: 1,
    expenses: 100000
  },
  {
    id: '7',
    title: 'Casa Moderna en Las Condes',
    description: 'Hermosa casa con acabados de lujo, jardín amplio y vista panorámica.',
    price: 450000000,
    location: 'Las Condes, Santiago',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: 'Casa',
    status: 'Venta',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
  },
  {
    id: '2',
    title: 'Departamento Exclusivo en Providencia',
    description: 'Moderno departamento con excelente ubicación y amenidades premium.',
    price: 180000000,
    location: 'Providencia, Santiago',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    type: 'Departamento',
    status: 'Venta',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
  },
  {
    id: '3',
    title: 'Oficina Corporativa en El Golf',
    description: 'Espacio corporativo ideal para empresas en crecimiento.',
    price: 3500000,
    location: 'El Golf, Santiago',
    bedrooms: 0,
    bathrooms: 2,
    area: 150,
    type: 'Oficina',
    status: 'Arriendo',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
  },
  {
    id: '4',
    title: 'Casa de Playa en Zapallar',
    description: 'Espectacular casa frente al mar con acceso privado a la playa.',
    price: 680000000,
    location: 'Zapallar, Valparaíso',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    type: 'Casa',
    status: 'Venta',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'
  },
  {
    id: '5',
    title: 'Penthouse de Lujo en Vitacura',
    description: 'Increíble penthouse con terraza panorámica y jacuzzi privado.',
    price: 520000000,
    location: 'Vitacura, Santiago',
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    type: 'Departamento',
    status: 'Venta',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
  },
  {
    id: '6',
    title: 'Local Comercial en Bellavista',
    description: 'Excelente local en zona de alto tráfico peatonal.',
    price: 2800000,
    location: 'Bellavista, Santiago',
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    type: 'Local Comercial',
    status: 'Arriendo',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
  }
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'María González',
    role: 'Compradora',
    content: 'Excelente servicio. Me ayudaron a encontrar la casa de mis sueños en tiempo récord. Muy profesionales y atentos.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=0D8ABC&color=fff'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Inversionista',
    content: 'Llevo años trabajando con ellos. Su conocimiento del mercado y asesoría han sido fundamentales para mis inversiones.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=7C3AED&color=fff'
  },
  {
    id: '3',
    name: 'Francisca Silva',
    role: 'Vendedora',
    content: 'Vendieron mi propiedad en menos de un mes al mejor precio. Súper recomendados!',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Francisca+Silva&background=059669&color=fff'
  }
];

export const mockServices = [
  {
    id: '1',
    title: 'Compra y Venta',
    description: 'Asesoría integral en procesos de compra y venta de propiedades residenciales y comerciales.',
    icon: 'home'
  },
  {
    id: '2',
    title: 'Arriendo',
    description: 'Gestión completa de arriendos con garantías y administración de propiedades.',
    icon: 'key'
  },
  {
    id: '3',
    title: 'Tasaciones',
    description: 'Valuación profesional de propiedades con informes detallados y fundamentados.',
    icon: 'calculator'
  },
  {
    id: '4',
    title: 'Inversiones',
    description: 'Asesoría especializada en inversiones inmobiliarias y análisis de rentabilidad.',
    icon: 'trendingUp'
  },
  {
    id: '5',
    title: 'Asesoría Legal',
    description: 'Acompañamiento legal en todas las etapas del proceso inmobiliario.',
    icon: 'scale'
  },
  {
    id: '6',
    title: 'Financiamiento',
    description: 'Apoyo en la gestión de créditos hipotecarios con las mejores condiciones.',
    icon: 'piggyBank'
  }
];

export const saveContactForm = (formData) => {
  const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  const newContact = {
    id: Date.now().toString(),
    ...formData,
    createdAt: new Date().toISOString()
  };
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  return newContact;
};

export const savePropertyInquiry = (propertyId, formData) => {
  const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  const newInquiry = {
    id: Date.now().toString(),
    propertyId,
    ...formData,
    createdAt: new Date().toISOString()
  };
  inquiries.push(newInquiry);
  localStorage.setItem('inquiries', JSON.stringify(inquiries));
  return newInquiry;
};