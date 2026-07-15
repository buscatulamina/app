import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Plus, Upload, X, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../services/api';

const CITIES = ['Viña del Mar', 'Quilpué', 'Villa Alemana', 'Olmué', 'Limache'];
const PROPERTY_TYPES = ['Casa', 'Departamento', 'Terreno', 'Oficina', 'Local Comercial'];
const PROPERTY_STATUSES = ['Venta', 'Arriendo'];

// Coordenadas para cada ciudad
const CITY_COORDINATES = {
  'Viña del Mar': { lat: -33.0290, lng: -71.5520 },
  'Quilpué': { lat: -33.0350, lng: -71.4442 },
  'Villa Alemana': { lat: -33.0531, lng: -71.4589 },
  'Olmué': { lat: -32.8867, lng: -71.3689 },
  'Limache': { lat: -32.7417, lng: -71.2683 },
};

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_PHOTOS = 10;

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const AdminPanel = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'Casa',
    status: 'Venta',
    parking: '',
    expenses: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      toast.error('Error al cargar propiedades');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const selected = Array.from(e.target.files || []);

    const invalid = selected.filter((f) => !ACCEPTED_IMAGE_TYPES.includes(f.type));
    if (invalid.length > 0) {
      toast.error('Solo se permiten imágenes en formato JPG, PNG, WebP o GIF.');
      e.target.value = '';
      return;
    }

    const combined = [...photoFiles, ...selected];
    if (combined.length > MAX_PHOTOS) {
      toast.error(`Puedes subir un máximo de ${MAX_PHOTOS} fotos.`);
      e.target.value = '';
      return;
    }

    const newPreviews = selected.map((f) => URL.createObjectURL(f));
    setPhotoFiles(combined);
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photoPreviews[index]);
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      type: 'Casa',
      status: 'Venta',
      parking: '',
      expenses: '',
    });
    setEditingId(null);
    setPhotoFiles([]);
    setPhotoPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    try {
      let images = ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'];

      if (photoFiles.length > 0) {
        images = await Promise.all(photoFiles.map(fileToBase64));
      }

      const coords = CITY_COORDINATES[formData.location] || { lat: null, lng: null };

      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        image: images[0],
        images,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
        area: formData.area ? parseFloat(formData.area) : 0,
        type: formData.type,
        status: formData.status,
        parking: formData.parking ? parseInt(formData.parking) : 0,
        expenses: formData.expenses ? parseFloat(formData.expenses) : 0,
        latitude: coords.lat,
        longitude: coords.lng,
      };

      if (editingId) {
        await updateProperty(editingId, payload);
        toast.success('Propiedad actualizada');
      } else {
        await createProperty(payload);
        toast.success('Propiedad creada');
      }

      setIsDialogOpen(false);
      resetForm();
      await fetchProperties();
    } catch (error) {
      toast.error(editingId ? 'Error al actualizar' : 'Error al crear');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (property) => {
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      area: property.area || '',
      type: property.type,
      status: property.status,
      parking: property.parking || '',
      expenses: property.expenses || '',
    });
    setEditingId(property._id || property.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      toast.success('Propiedad eliminada');
      await fetchProperties();
    } catch (error) {
      toast.error('Error al eliminar');
      console.error(error);
    }
  };

  const openNewProperty = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getMapUrl = () => {
    const coords = CITY_COORDINATES[formData.location];
    if (!coords) return null;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${coords.lat},${coords.lng}&zoom=13&size=300x250&style=feature:all|element:labels|visibility:off&markers=color:red|${coords.lat},${coords.lng}&key=AIzaSyDummyKey`;
  };

  // Alternativa: usar OpenStreetMap sin API key
  const getOpenStreetMapUrl = () => {
    const coords = CITY_COORDINATES[formData.location];
    if (!coords) return null;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.05},${coords.lat - 0.05},${coords.lng + 0.05},${coords.lat + 0.05}&layer=mapnik&marker=${coords.lat},${coords.lng}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-white">
      <div className="fixed top-1/4 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="fixed bottom-1/4 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      <div className="bg-black/80 backdrop-blur-xl shadow-2xl py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </button>
          <h1 className="text-white font-semibold">Panel de Administración</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Gestión</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Propiedades</h2>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openNewProperty}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Propiedad
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Propiedad' : 'Nueva Propiedad'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Título de la propiedad"
                    required
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    rows={3}
                    required
                  />
                </div>

                {/* Precio y Ciudad */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ciudad *</Label>
                    <Select value={formData.location} onValueChange={(val) => handleSelectChange('location', val)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              {/* Mapa de Ubicación */}
{formData.location && (
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      <MapPin className="h-4 w-4 text-amber-600" />
      Ubicación
    </Label>
    <div className="border-2 border-amber-200 rounded-lg overflow-hidden bg-gray-100 h-64">
      <iframe
        width="100%"
        height="256"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://maps.openstreetmap.org/export/embed.html?bbox=${CITY_COORDINATES[formData.location].lng - 0.05},${CITY_COORDINATES[formData.location].lat - 0.05},${CITY_COORDINATES[formData.location].lng + 0.05},${CITY_COORDINATES[formData.location].lat + 0.05}&layer=mapnik&marker=${CITY_COORDINATES[formData.location].lat},${CITY_COORDINATES[formData.location].lng}`}
        style={{ border: 'none' }}
      />
    </div>
    <p className="text-xs text-gray-500">📍 Ubicación: {formData.location}</p>
  </div>
)}

                {/* Tipo y Estado */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={formData.type} onValueChange={(val) => handleSelectChange('type', val)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select value={formData.status} onValueChange={(val) => handleSelectChange('status', val)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_STATUSES.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Detalles de la propiedad */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Dormitorios</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Baños</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">m²</Label>
                    <Input id="area" name="area" type="number" value={formData.area} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking">Estacionamiento</Label>
                    <Input id="parking" name="parking" type="number" value={formData.parking} onChange={handleChange} />
                  </div>
                </div>

                {/* Gastos */}
                <div className="space-y-2">
                  <Label htmlFor="expenses">Gastos</Label>
                  <Input id="expenses" name="expenses" type="number" value={formData.expenses} onChange={handleChange} />
                </div>

                {/* Upload de Fotos */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <Label>Fotos de la propiedad</Label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Upload className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">Haz clic para seleccionar fotos</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP o GIF · Máximo {MAX_PHOTOS} fotos</p>
                    </div>
                    {photoFiles.length > 0 && (
                      <span className="text-xs font-semibold text-amber-600">{photoFiles.length} foto{photoFiles.length !== 1 ? 's' : ''}</span>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    multiple
                    className="hidden"
                    onChange={handlePhotoChange}
                  />

                  {photoPreviews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                      {photoPreviews.map((src, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square border border-gray-200">
                          <img src={src} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Principal</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-amber-500 to-orange-600">
                    {isSubmitting ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando propiedades...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay propiedades. Crea una nueva.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ubicación</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {properties.map(prop => (
                      <tr key={prop._id || prop.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{prop.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{prop.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatPrice(prop.price)}</td>
                        <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded">{prop.status}</span></td>
                        <td className="px-6 py-4 text-sm text-gray-600">{prop.type}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(prop)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar propiedad?</AlertDialogTitle>
                                <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(prop._id || prop.id)} className="bg-red-600">
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
