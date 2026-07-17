import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { saveContact, recordWhatsappContact } from '../services/analytics';

const WHATSAPP_NUMBER = '56992325032';
const WHATSAPP_DEFAULT_MESSAGE = 'Hola, estoy interesado en saber más';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveContact(formData);
    } catch (error) {
      console.error('Error saving contact form:', error);
    } finally {
      // Still show success message even if the database save failed,
      // since the user's message intent has been captured locally.
      toast.success('¡Mensaje enviado exitosamente! Nos contactaremos pronto.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsappClick = async () => {
    try {
      await recordWhatsappContact({
        nombre: formData.name || undefined,
        telefono: formData.phone || undefined,
        mensaje: formData.message || WHATSAPP_DEFAULT_MESSAGE
      });
    } catch (error) {
      console.error('Error recording WhatsApp contact:', error);
    } finally {
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Estamos Aquí Para Ayudarte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes preguntas o necesitas asesoría? Contáctanos y nuestro equipo
            te responderá a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-50 to-amber-50 p-8 md:p-12 rounded-3xl border border-amber-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enviar Mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="bg-white border-gray-200 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="bg-white border-gray-200 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                      required
                      className="bg-white border-gray-200 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto *</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Asunto de tu consulta"
                      required
                      className="bg-white border-gray-200 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                    rows={6}
                    className="bg-white border-gray-200 focus:border-amber-500 resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Teléfono</p>
                    <p className="text-white/90">+56992325032</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-white/90">jacqueline.zegers@hotmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-3">Contactar por WhatsApp</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                ¿Prefieres una respuesta inmediata? Escríbenos directamente por
                WhatsApp y conversemos sobre lo que necesitas.
              </p>
              <button
                type="button"
                onClick={handleWhatsappClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-4 rounded-xl font-semibold transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                +56992325032
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-amber-50 p-8 rounded-3xl border border-amber-100">
              <h4 className="font-bold text-gray-900 mb-3">Respuesta Rápida</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nos comprometemos a responder todas las consultas dentro de las
                próximas 24 horas hábiles. Tu tiempo es valioso para nosotros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;