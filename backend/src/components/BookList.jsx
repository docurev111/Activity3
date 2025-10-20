import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books').then((res) => setBooks(res.data));
  }, []);

  return (
    <div>
      <h2>📚 Bookshelf</h2>
      <ul>
        {books.map((b) => (
          <li key={b.id}>{b.title} — {b.author?.name} ({b.category?.name})</li>
        ))}
      </ul>
    </div>
  );
}
