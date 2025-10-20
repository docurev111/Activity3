import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: '', authorId: '', categoryId: '' });
  const [editingId, setEditingId] = useState(null);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksRes, authorsRes, categoriesRes] = await Promise.all([
        api.getBooks(),
        api.getAuthors(),
        api.getCategories()
      ]);
      setBooks(booksRes.data);
      setAuthors(authorsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateBook(editingId, form);
      } else {
        await api.createBook(form);
      }
      setForm({ title: '', authorId: '', categoryId: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, authorId: book.author.id.toString(), categoryId: book.category.id.toString() });
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteBook(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setForm({ title: '', authorId: '', categoryId: '' });
    setEditingId(null);
  };

  const handleAddAuthor = async () => {
    if (newAuthor.trim()) {
      try {
        await api.createAuthor({ name: newAuthor });
        setNewAuthor('');
        setErrorMessage('');
        fetchData();
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to add author');
        }
      }
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await api.createCategory({ name: newCategory });
        setNewCategory('');
        setErrorMessage('');
        fetchData();
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to add category');
        }
      }
    }
  };

  return (
    <div className="bookshelf-container">
      <div className="bookshelf-header">
        <h1>Bookshelf</h1>
        <p>Manage your digital library with ease</p>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="content-grid">
        <div className="card">
          <h2>Books Collection</h2>
          {books.length === 0 ? (
            <div className="empty-state">No books yet. Add your first book below!</div>
          ) : (
            <ul className="books-list">
              {books.map(book => (
                <li key={book.id}>
                  <div className="book-info">
                    <div className="book-title">{book.title}</div>
                    <div className="book-meta">
                      by {book.author.name} • {book.category.name}
                    </div>
                  </div>
                  <div className="book-actions">
                    <button className="btn-edit" onClick={() => handleEdit(book)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(book.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Book Title</label>
              <input
                type="text"
                placeholder="Enter book title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <select
                value={form.authorId}
                onChange={(e) => setForm({ ...form, authorId: e.target.value })}
                required
              >
                <option value="">Select Author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Book' : 'Add Book'}
              </button>
              {editingId && (
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <div className="card quick-add-section">
            <h2>Quick Add Author</h2>
            <div className="quick-add-form">
              <input
                type="text"
                placeholder="Author name..."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <button className="btn-secondary" onClick={handleAddAuthor}>
                Add
              </button>
            </div>
            {authors.length > 0 && (
              <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
                <strong>Authors:</strong> {authors.map(a => a.name).join(', ')}
              </div>
            )}
          </div>

          <div className="card quick-add-section">
            <h2>Quick Add Category</h2>
            <div className="quick-add-form">
              <input
                type="text"
                placeholder="Category name..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button className="btn-secondary" onClick={handleAddCategory}>
                Add
              </button>
            </div>
            {categories.length > 0 && (
              <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
                <strong>Categories:</strong> {categories.map(c => c.name).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookList;
