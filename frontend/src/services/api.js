import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Properties
export const getProperties = async () => {
  const response = await axios.get(`${API}/properties`);
  return response.data;
};

export const getProperty = async (id) => {
  const response = await axios.get(`${API}/properties/${id}`);
  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await axios.post(`${API}/properties`, propertyData);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await axios.put(`${API}/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await axios.delete(`${API}/properties/${id}`);
  return response.data;
};

// Testimonials
export const getTestimonials = async () => {
  const response = await axios.get(`${API}/testimonials`);
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await axios.post(`${API}/testimonials`, testimonialData);
  return response.data;
};

// Contacts
export const createContact = async (contactData) => {
  const response = await axios.post(`${API}/contacts`, contactData);
  return response.data;
};

export const getContacts = async () => {
  const response = await axios.get(`${API}/contacts`);
  return response.data;
};

// Property Inquiries
export const createPropertyInquiry = async (inquiryData) => {
  const response = await axios.post(`${API}/property-inquiries`, inquiryData);
  return response.data;
};

export const getPropertyInquiries = async () => {
  const response = await axios.get(`${API}/property-inquiries`);
  return response.data;
};
