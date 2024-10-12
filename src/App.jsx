import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsList from './components/PostsList';
import NewPostForm from './components/NewPostForm';
import AppNavbar from './components/Navbar';
import About from './components/About';
import './index.css'; // Import global styles
import './App.css';   // Import component-specific styles

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="enlarge-shrink-text">NEW MESSAGE</h1>
              <NewPostForm />
              <PostsList />
            </div>
          } />
          <Route path="/create" element={<NewPostForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;