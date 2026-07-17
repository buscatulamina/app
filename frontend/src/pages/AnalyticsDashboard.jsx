import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  getVisits, getVisitsStats, getWhatsappContacts,
  getWhatsappStats, getConversionStats
} from '../services/analytics';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [visitsData, setVisitsData] = useState([]);
  const [visitsStats, setVisitsStats] = useState(null);
  const [whatsappContacts, setWhatsappContacts] = useState([]);
  const [whatsappStats, setWhatsappStats] = useState(null);
  const [conversionStats, setConversionStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    try {
      setLoading(true);
      const [visits, vStats, contacts, wStats, conversion] = await Promise.all([
        getVisits(),
        getVisitsStats(),
        getWhatsappContacts(),
        getWhatsappStats(),
        getConversionStats()
      ]);

      setVisitsData(visits);
      setVisitsStats(vStats);
      setWhatsappContacts(contacts);
      setWhatsappStats(wStats);
      setConversionStats(conversion);
      toast.success('Analytics cargados');
    } catch (error) {
      toast.error('Error cargando analytics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const COLORS = ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#ef4444'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-white">
      <div className="fixed top-1/4 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="fixed bottom-1/4 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-xl shadow-2xl py-4 px-4 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Admin
          </button>
          <h1 className="text-white font-semibold text-lg">📊 Analytics Dashboard</h1>
          <button
            onClick={fetchAllAnalytics}
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors text-sm font-medium"
            title="Actualizar datos"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Total Visitas</p>
            <p className="text-4xl font-bold text-amber-600 mt-2">{conversionStats?.total_visits || 0}</p>
            <p className="text-xs text-gray-400 mt-1">En total</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Contactos WhatsApp</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{conversionStats?.total_contacts || 0}</p>
            <p className="text-xs text-gray-400 mt-1">Personas interesadas</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Tasa de Conversión</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{conversionStats?.conversion_rate || 0}%</p>
            <p className="text-xs text-gray-400 mt-1">Contactos / Visitas</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Ciudades</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">{visitsStats?.by_city?.length || 0}</p>
            <p className="text-xs text-gray-400 mt-1">Únicas visitadas</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visitas por Ciudad */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📍 Visitas por Ciudad</h3>
            {visitsStats?.by_city && visitsStats.by_city.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={visitsStats.by_city}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="_id" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                    formatter={(value) => [value, 'Visitas']}
                  />
                  <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">📭 Sin datos de visitas</p>
            )}
          </div>

          {/* Dispositivos */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📱 Dispositivos Utilizados</h3>
            {visitsStats?.by_device && visitsStats.by_device.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={visitsStats.by_device}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, count }) => `${name}: ${count}`}
                  >
                    {visitsStats.by_device.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Visitas']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">📭 Sin datos de dispositivos</p>
            )}
          </div>
        </div>

        {/* Tabla de Visitas */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">👥 Visitantes Recientes (Últimas 50)</h3>
            {visitsData.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportToCSV(visitsData, 'visitas.csv')}
                className="border-amber-300 text-amber-600 hover:bg-amber-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar CSV
              </Button>
            )}
          </div>
          {visitsData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">IP</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Ciudad</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">País</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Dispositivo</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Navegador</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visitsData.slice(0, 50).map((visit, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">{visit.ip}</td>
                      <td className="px-4 py-3 text-gray-600">{visit.ciudad || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{visit.pais || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          visit.dispositivo === 'mobile' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {visit.dispositivo === 'mobile' ? '📱 Mobile' : '💻 Desktop'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{visit.navegador || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        {new Date(visit.timestamp).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visitsData.length > 50 && (
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Mostrando 50 de {visitsData.length} visitas
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">📭 Sin visitas registradas aún</p>
          )}
        </div>

        {/* Tabla de Contactos WhatsApp */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">💬 Contactos WhatsApp (Últimos 50)</h3>
            {whatsappContacts.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportToCSV(whatsappContacts, 'contactos-whatsapp.csv')}
                className="border-green-300 text-green-600 hover:bg-green-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar CSV
              </Button>
            )}
          </div>
          {whatsappContacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">IP</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Ciudad</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Edad</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Teléfono</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Mensaje</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {whatsappContacts.slice(0, 50).map((contact, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">{contact.ip}</td>
                      <td className="px-4 py-3 text-gray-600">{contact.ciudad || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 font-medium">{contact.nombre || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{contact.edad || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">{contact.telefono || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{contact.mensaje || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                        {new Date(contact.timestamp).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {whatsappContacts.length > 50 && (
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Mostrando 50 de {whatsappContacts.length} contactos
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">📭 Sin contactos WhatsApp aún</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
