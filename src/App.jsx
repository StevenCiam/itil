import React from 'react';
import { Outlet } from 'react-router-dom';

// Impor header dan footer
import Header from './header.jsx'; 
import Footer from './footer.jsx'; 

function App() {
  return (
    <>
      <Header /> {/* Header ini sudah ada navigasinya */}
      
      <main>
        {/* Konten halaman (Home/Formulir/Laporan) akan muncul di sini */}
        <div className="container-main">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;