import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  console.log("Rendering Header component");

  return (
    <>
    <Navbar/>
    
      <main>
        <Outlet /> {/* This is where nested routes (like HomePage) will be rendered */}
      </main>
      
      <Footer />
    </>
  );
};

export default MainLayout;
