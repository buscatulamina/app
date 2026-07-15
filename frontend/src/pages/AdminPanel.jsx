import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
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

const AdminPanel = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    latitude: '',
    longitude: '',
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
      latitude: '',
      longitude: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'],
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
        area: formData.area ? parseFloat(formData.area) : 0,
        type: formData.type,
        status: formData.status,
        parking: formData.parking ? parseInt(formData.parking) : 0,
        expenses: formData.expenses ? parseFloat(formData.expenses) : 0,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
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
      latitude: property.latitude || '',
      longitude: property.longitude || '',
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expenses">Gastos</Label>
                    <Input id="expenses" name="expenses" type="number" value={formData.expenses} onChange={handleChange} />
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitud</Label>
                    <Input id="latitude" name="latitude" type="number" step="any" value={formData.latitude} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitud</Label>
                    <Input id="longitude" name="longitude" type="number" step="any" value={formData.longitude} onChange={handleChange} />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
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
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(prop._id || prop.id)}
                                  className="bg-red-600"
                                >
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
