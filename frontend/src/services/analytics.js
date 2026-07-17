import axios from 'axios';

const _rawBackendUrl = process.env.REACT_APP_BACKEND_URL || '';
const BACKEND_URL = _rawBackendUrl.startsWith('http') ? _rawBackendUrl : `https://${_rawBackendUrl}`;
const API = `${BACKEND_URL}/api`;

export const getVisitInfo = async () => {
  try {
    const geoResponse = await axios.get('https://ipapi.co/json/');
    const { ip, city, country_name, region } = geoResponse.data;
    
    const userAgent = navigator.userAgent;
    const isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const dispositivo = isDevice ? 'mobile' : 'desktop';
    
    let navegador = 'Otro';
    if (userAgent.includes('Chrome')) navegador = 'Chrome';
    else if (userAgent.includes('Safari')) navegador = 'Safari';
    else if (userAgent.includes('Firefox')) navegador = 'Firefox';
    else if (userAgent.includes('Edge')) navegador = 'Edge';
    
    return {
      ip,
      ciudad: city || null,
      pais: country_name || null,
      region: region || null,
      dispositivo,
      navegador,
      user_agent: userAgent,
      referer: document.referrer || null
    };
  } catch (error) {
    console.error('Error getting visit info:', error);
    return null;
  }
};

export const recordVisit = async (visitData) => {
  try {
    const response = await axios.post(`${API}/visits`, visitData);
    return response.data;
  } catch (error) {
    console.error('Error recording visit:', error);
  }
};

export const recordWhatsappContact = async (contactData) => {
  try {
    const response = await axios.post(`${API}/whatsapp-contacts`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error recording WhatsApp contact:', error);
  }
};

export const getVisits = async () => {
  try {
    const response = await axios.get(`${API}/analytics/visits`);
    return response.data;
  } catch (error) {
    console.error('Error getting visits:', error);
    return [];
  }
};

export const getVisitsStats = async () => {
  try {
    const response = await axios.get(`${API}/analytics/visits/stats`);
    return response.data;
  } catch (error) {
    console.error('Error getting visits stats:', error);
    return null;
  }
};

export const getWhatsappContacts = async () => {
  try {
    const response = await axios.get(`${API}/analytics/whatsapp-contacts`);
    return response.data;
  } catch (error) {
    console.error('Error getting WhatsApp contacts:', error);
    return [];
  }
};

export const getWhatsappStats = async () => {
  try {
    const response = await axios.get(`${API}/analytics/whatsapp-contacts/stats`);
    return response.data;
  } catch (error) {
    console.error('Error getting WhatsApp stats:', error);
    return null;
  }
};

export const getConversionStats = async () => {
  try {
    const response = await axios.get(`${API}/analytics/conversion`);
    return response.data;
  } catch (error) {
    console.error('Error getting conversion stats:', error);
    return null;
  }
};
