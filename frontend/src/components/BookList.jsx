import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

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
    <div>
      <h1>Bookshelf</h1>
      {errorMessage && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author.name} in {book.category.name}
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
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
        <button type="submit">{editingId ? 'Update' : 'Add'} Book</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
      <h2>Add Author</h2>
      <input
        type="text"
        placeholder="Author Name"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
      />
      <button onClick={handleAddAuthor}>Add Author</button>
      <h2>Add Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
}

export default BookList;
