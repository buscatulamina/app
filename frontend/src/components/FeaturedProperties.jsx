import React, { useState } from 'react';
import { mockProperties } from '../data/mock';
import { Bed, Bath, Maximize, MapPin, Heart, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { savePropertyInquiry } from '../data/mock';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInquiry = (e) => {
    e.preventDefault();
    savePropertyInquiry(property.id, formData);
    toast.success('¡Consulta enviada exitosamente! Nos contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsDialogOpen(false);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0">
            {property.status}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-900">
            {property.type}
          </Badge>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
          {property.bedrooms > 0 && (
            <div className="flex items-center text-gray-700">
              <Bed className="h-5 w-5 mr-1 text-amber-600" />
              <span className="text-sm font-medium">{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center text-gray-700">
            <Bath className="h-5 w-5 mr-1 text-amber-600" />
            <span className="text-sm font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Maximize className="h-5 w-5 mr-1 text-amber-600" />
            <span className="text-sm font-medium">{property.area} m²</span>
          </div>
        </div>

        {(property.parking || property.expenses) && (
          <div className="mb-4 space-y-2">
            {property.parking && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Estacionamiento:</span> {property.parking}
              </p>
            )}
            {property.expenses && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Gastos Comunes:</span> {formatPrice(property.expenses)}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Precio</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                Consultar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Consultar Propiedad</DialogTitle>
                <DialogDescription>
                  {property.title} - {formatPrice(property.price)}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInquiry} className="space-y-4 mt-4">
                <Input
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Mensaje (opcional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                  Enviar Consulta
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedProperties = () => {
  const [filter, setFilter] = useState('Todos');

  const filteredProperties = filter === 'Todos' 
    ? mockProperties 
    : mockProperties.filter(p => p.status === filter);

  return (
    <section id="properties" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Propiedades</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explora nuestra selección de propiedades premium en las mejores ubicaciones.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            {['Todos', 'Venta', 'Arriendo'].map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant={filter === status ? 'default' : 'outline'}
                className={filter === status 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0'
                  : 'border-gray-300 hover:border-amber-500 hover:text-amber-600'
                }
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay propiedades disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;