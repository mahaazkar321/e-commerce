import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const MainLayout = () => {
  console.log("Rendering Header component");

  return (
    <>
    <ScrollToTop/>
    <Navbar/>
    
      <main>
        <Outlet /> {/* This is where nested routes (like HomePage) will be rendered */}
      </main>
      
      <Footer />
    </>
  );
};

export default MainLayout;
