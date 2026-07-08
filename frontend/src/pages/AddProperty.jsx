import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Home, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { createProperty } from '../services/api';

const CITIES = ['Viña del Mar', 'Quilpué', 'Villa Alemana', 'Olmué'];

const PROPERTY_TYPES = ['Casa', 'Departamento', 'Terreno', 'Oficina', 'Local Comercial'];

const PROPERTY_STATUSES = ['Venta', 'Arriendo'];

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop';

const AddProperty = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'Casa',
    status: 'Venta',
    parking: '',
    expenses: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      toast.error('Por favor completa todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        location: formData.location,
        image: formData.image.trim() || DEFAULT_IMAGE,
        images: formData.image.trim() ? [formData.image.trim()] : [DEFAULT_IMAGE],
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms, 10) : 0,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms, 10) : 0,
        area: formData.area ? parseFloat(formData.area) : 0,
        type: formData.type,
        status: formData.status,
        parking: formData.parking ? parseInt(formData.parking, 10) : 0,
        expenses: formData.expenses ? parseFloat(formData.expenses) : 0,
      };

      await createProperty(payload);

      toast.success('¡Propiedad publicada exitosamente!');
      navigate('/');
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Error al publicar la propiedad. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-white">
      {/* Decorative blobs */}
      <div className="fixed top-1/4 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="fixed bottom-1/4 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      {/* Top bar */}
      <div className="bg-black/80 backdrop-blur-xl shadow-2xl py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </button>
          <div className="flex items-center gap-2 text-white font-semibold">
            <Home className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400">Zegers</span>
            <span>Propiedades</span>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-10">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Nueva publicación
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mt-3 mb-3">
            Agregar Propiedad
          </h1>
          <p className="text-gray-500 text-base">
            Completa el formulario para publicar una nueva propiedad en el sitio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6"
        >
          {/* ── Required fields ── */}
          <div className="space-y-1">
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Ej: Casa moderna con jardín en Viña del Mar"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">
              Descripción <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe la propiedad: características, estado, entorno..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="price">
                Precio (CLP) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                placeholder="Ej: 150000000"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>
                Ciudad <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.location}
                onValueChange={(val) => handleSelectChange('location', val)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Tipo de propiedad</Label>
              <Select
                value={formData.type}
                onValueChange={(val) => handleSelectChange('type', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => handleSelectChange('status', val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Optional fields ── */}
          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Detalles opcionales
            </p>

            <div className="space-y-1 mb-4">
              <Label htmlFor="image">URL de imagen</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={formData.image}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-400 mt-1">
                Si no ingresas una imagen se usará una foto de referencia.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label htmlFor="bedrooms">Dormitorios</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="bathrooms">Baños</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="area">
                  m²
                </Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="0"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="parking">Estacionam.</Label>
                <Input
                  id="parking"
                  name="parking"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.parking}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300 hover:border-amber-500 hover:text-amber-600"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg font-semibold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Publicando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Publicar propiedad
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
