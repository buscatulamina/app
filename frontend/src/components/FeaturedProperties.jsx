import React, { useState, useEffect } from 'react';
import { Bed, Bath, Maximize, MapPin, Heart, ExternalLink, ChevronLeft, ChevronRight, X, Map, Trash2, MessageCircle } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { getProperties, createPropertyInquiry, deleteProperty } from '../services/api';
import { useAuth } from '../context/AuthContext';
import MapComponent from './MapComponent';

const PropertyGallery = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images.length]);

  return (
    <>
      <div className="relative overflow-hidden cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={images[0]}
          alt="Propiedad"
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {images.length} fotos
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button — top-right, always visible */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-20 flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
            aria-label="Cerrar galería"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[80vh] mx-auto px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Foto ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center text-white/80 text-sm mt-4 font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors z-10"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
};

const PropertyCard = ({ property, onDelete }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty(property.id || property._id);
      toast.success('Propiedad eliminada exitosamente.');
      onDelete(property.id || property._id);
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Error al eliminar la propiedad. Por favor intenta nuevamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      await createPropertyInquiry({
        propertyId: property.id,
        ...formData
      });
      toast.success('¡Consulta enviada exitosamente! Nos contactaremos pronto.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Error al enviar la consulta. Por favor intenta nuevamente.');
      console.error('Error:', error);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200">
      <PropertyGallery images={property.images || [property.image]} />
      <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0">
            {property.status}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-900">
            {property.type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
          </button>

          {isAuthenticated && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label="Eliminar propiedad"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-5 w-5 text-gray-700 hover:text-red-600" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar propiedad?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. La propiedad <strong>{property.title}</strong> será eliminada permanentemente del sistema.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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

        {(property.parking > 0 || property.expenses > 0) && (
          <div className="mb-4 space-y-2">
            {property.parking > 0 && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Estacionamiento:</span> {property.parking}
              </p>
            )}
            {property.expenses > 0 && (
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

          <div className="flex items-center gap-2">
            {/* Map button */}
            <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-300 hover:border-amber-500 hover:text-amber-600"
                  title="Ver en mapa"
                  aria-label="Ver en mapa"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4">
                  <DialogTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    Ubicación de la propiedad
                  </DialogTitle>
                  <DialogDescription>{property.title}</DialogDescription>
                </DialogHeader>
                <div className="px-6 pb-6">
                  <MapComponent
                    latitude={property.latitude}
                    longitude={property.longitude}
                    title={property.title}
                  />
                  {property.location && (
                    <p className="mt-3 text-sm text-gray-600 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      {property.location}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>

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
                <Button
                  type="button"
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a
                    href={`https://wa.me/56992325032?text=${encodeURIComponent(`Quisiera consultar sobre esta propiedad: ${property.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar por WhatsApp
                  </a>
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedProperties = ({ cityFilter }) => {
  const [filter, setFilter] = useState('Todos');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  const handlePropertyDeleted = (deletedId) => {
    setProperties((prev) => prev.filter((p) => (p.id || p._id) !== deletedId));
  };

  let filteredProperties = filter === 'Todos' 
    ? properties 
    : properties.filter(p => p.status === filter);

  if (cityFilter) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }

  return (
    <section id="properties" className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Propiedades</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            {cityFilter ? `Propiedades en ${cityFilter}` : 'Propiedades Destacadas'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {cityFilter 
              ? `Explora las propiedades disponibles en ${cityFilter}.`
              : 'Explora nuestra selección de propiedades premium en las mejores ubicaciones.'
            }
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
            <PropertyCard key={property.id} property={property} onDelete={handlePropertyDeleted} />
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