import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const api = {
  // Books
  getBooks: () => axios.get(`${API_BASE}/books`),
  getBook: (id) => axios.get(`${API_BASE}/books/${id}`),
  createBook: (data) => axios.post(`${API_BASE}/books`, data),
  updateBook: (id, data) => axios.put(`${API_BASE}/books/${id}`, data),
  deleteBook: (id) => axios.delete(`${API_BASE}/books/${id}`),

  // Authors
  getAuthors: () => axios.get(`${API_BASE}/authors`),
  getAuthor: (id) => axios.get(`${API_BASE}/authors/${id}`),
  createAuthor: (data) => axios.post(`${API_BASE}/authors`, data),
  updateAuthor: (id, data) => axios.put(`${API_BASE}/authors/${id}`, data),
  deleteAuthor: (id) => axios.delete(`${API_BASE}/authors/${id}`),

  // Categories
  getCategories: () => axios.get(`${API_BASE}/categories`),
  getCategory: (id) => axios.get(`${API_BASE}/categories/${id}`),
  createCategory: (data) => axios.post(`${API_BASE}/categories`, data),
  updateCategory: (id, data) => axios.put(`${API_BASE}/categories/${id}`, data),
  deleteCategory: (id) => axios.delete(`${API_BASE}/categories/${id}`),
};
