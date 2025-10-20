#  Bookshelf API + UI

A full-stack web application for managing a digital bookshelf with books, authors, and categories.

##  Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + NestJS + TypeScript
- **Database**: SQLite
- **API Documentation**: Swagger

##  Features

-  CRUD operations for Books, Authors, and Categories
-  Relationship management (Books linked to Authors and Categories)
-  Duplicate entry prevention with error handling
-  Interactive Swagger API documentation
-  Real-time UI updates

##  Installation

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd frontend
npm install
```

##  Running the Application

### Start Backend (Port 8000)
```powershell
cd backend
npm run start:dev
```

### Start Frontend (Port 5173)
```powershell
cd frontend
npm run dev
```

##  Access Points

- **Frontend UI**: http://localhost:5173
- **API Documentation**: http://localhost:8000/api
- **Backend API**: http://localhost:8000

##  Usage

1. **Add Authors**: Enter author names in the "Add Author" section
2. **Add Categories**: Enter category names in the "Add Category" section
3. **Add Books**: Fill in book title, select author and category, then submit
4. **Edit/Delete**: Use the buttons next to each book to modify or remove entries

---
