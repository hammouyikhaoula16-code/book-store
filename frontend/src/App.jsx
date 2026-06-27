import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './component/NavBar';
import Home from './pages/Home';
import FootBar from './component/FootBar';


function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  // 1. Track the current page state (Page 1 or Page 2)
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const fetchBooks = async (searchStr) => {
    setLoading(true);
    setCurrentPage(1);
    try {
      const searchTerm = searchStr.trim() ? encodeURIComponent(searchStr) : 'harry';
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}`);
      const results = response.data.docs.slice(0, 12);

      const formattedBooks = results.map(book => ({
        id: book.key,
        title: book.title,
        authors: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        publishYear: book.first_publish_year || 'N/A',
        pages: book.number_of_pages_median ? `${book.number_of_pages_median} pages` : 'N/A',
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : 'N'
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks('harry');
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;


  const currentDisplayedBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">

      <NavBar onSearch={fetchBooks} />

      <main className="grow">

        <Home
          books={currentDisplayedBooks}
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalBooks={books.length}
          booksPerPage={booksPerPage}
        />
      </main>

      <FootBar />
    </div>
  );
}

export default App;