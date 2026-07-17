import axios from 'axios';

const _rawBackendUrl = process.env.REACT_APP_BACKEND_URL || '';
const BACKEND_URL = _rawBackendUrl.startsWith('http') ? _rawBackendUrl : `https://${_rawBackendUrl}`;
const API = `${BACKEND_URL}/api`;

export const getVisitInfo = async () => {
  try {
    const userAgent = navigator.userAgent;
    const isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const dispositivo = isDevice ? 'mobile' : 'desktop';

    let navegador = 'Otro';
    if (userAgent.includes('Chrome')) navegador = 'Chrome';
    else if (userAgent.includes('Safari')) navegador = 'Safari';
    else if (userAgent.includes('Firefox')) navegador = 'Firefox';
    else if (userAgent.includes('Edge')) navegador = 'Edge';

    return {
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

export const saveContact = async (contactData) => {
  try {
    const response = await axios.post(`${API}/contacts`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error saving contact:', error);
    return null;
  }
};

const getPublicIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return 'Unknown';
  }
};

export const recordWhatsappContact = async (contactData) => {
  try {
    const ip = contactData.ip || await getPublicIp();
    const payload = { ...contactData, ip };
    const response = await axios.post(`${API}/whatsapp-contacts`, payload);
    return response.data;
  } catch (error) {
    console.error('Error recording WhatsApp contact:', error);
    return null;
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
