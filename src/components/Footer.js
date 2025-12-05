import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} 2025 MIA™ — Masses Identification Assistant
      </div>
    </footer>
  );
};

export default Footer;