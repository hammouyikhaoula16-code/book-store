import React, { useState, useEffect } from 'react';
import api from './api';
import NavBar from './component/NavBar';
import Home from './pages/Home';
import FootBar from './component/FootBar';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from './pages/Login';
import CreateAcc from './pages/CreateAcc';
import PersonalInfo from './pages/PersonalInfo';
import BookReader from './pages/BookReader';
import FavBooks from './pages/FavBooks';
import RecoverPassword from './pages/RecoverPassword';

const Layout = ({ onSearch, darkMode, toggleDarkMode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors duration-300">
      <NavBar
        onSearch={onSearch}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main className="grow">
        <Outlet />
      </main>
      <FootBar />
    </div>
  );
};

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const fetchBooks = async (searchStr = '') => {
    setLoading(true);
    setCurrentPage(1);
    try {
      const response = await api.get('/books');
      const dbBooks = response.data;

      const formattedBooks = dbBooks.map(book => ({
        id: book.id,
        title: book.title,
        authors: book.authors || 'Unknown Author',
        publishYear: book.publish_year || 'N/A',
        pages: book.pages ? `${book.pages} pages` : 'N/A',
        coverUrl: book.cover_url || 'no cover',
        description: book.description || ''
      }));

      const searchTerm = searchStr.trim().toLowerCase();
      const filteredBooks = searchTerm
        ? formattedBooks.filter(book =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.authors.toLowerCase().includes(searchTerm)
        )
        : formattedBooks;

      setBooks(filteredBooks);
    } catch (err) {
      console.error("Failed fetching books from database:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentDisplayedBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout onSearch={fetchBooks} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />,
      children: [
        {
          path: "/",
          element: (
            <Home
              books={currentDisplayedBooks}
              loading={loading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalBooks={books.length}
              booksPerPage={booksPerPage}
            />
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <CreateAcc />,
        },
        {
          path: "/settings",
          element: <PersonalInfo />,
        },
        {
          path: "/read/:id",
          element: <BookReader />,
        },
        {
          path: "/favorites",
          element: <FavBooks />,
        },
        {
          path: "/recoverpass",
          element: <RecoverPassword />,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;