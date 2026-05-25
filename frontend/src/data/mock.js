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
    image: 'https://customer-assets.emergentagent.com/job_property-broker-13/artifacts/85zagh4r_IMG_4517.jpeg',
    images: [
      'https://customer-assets.emergentagent.com/job_property-broker-13/artifacts/85zagh4r_IMG_4517.jpeg',
      'https://customer-assets.emergentagent.com/job_property-broker-13/artifacts/gpe3no3i_IMG_4518.jpeg',
      'https://customer-assets.emergentagent.com/job_property-broker-13/artifacts/y9bzvv2z_IMG_4514.jpeg',
      'https://customer-assets.emergentagent.com/job_property-broker-13/artifacts/1spv25jg_IMG_4515.jpeg',
      'https://customer-assets.emergentagent.com/job_property-broker-13/artifacts/n22916wr_IMG_4516%201.jpeg'
    ],
    parking: 1,
    expenses: 100000
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