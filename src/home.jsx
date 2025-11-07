import React from 'react';
import { Link } from 'react-router-dom'; // Gunakan Link untuk tombol

function Home() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>ANALISIS KESIAPAN INFRASTRUKTUR TI PADA PT. ARCOMIX UNIKARYA UNGGULINDO UTAMA MENGGUNAKAN FRAMEWORK ITIL</h1>
        <p className="subtitle">Sistem Pendukung untuk Manajemen Rekapan Layanan TI</p>
        
        {/* Tombol ini mengarah ke halaman laporan */}
        <Link to="/laporan" className="cta-button">
          Lihat Manajemen Rekapan
        </Link>
      </div>
    </section>
  );
}

export default Home;