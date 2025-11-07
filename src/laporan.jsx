import React, { useState, useEffect } from 'react';

function Laporan() {
  const [dataRekapan, setDataRekapan] = useState([]);

  // Fungsi untuk me-load data dari localStorage
  const loadData = () => {
    const dataString = localStorage.getItem('rekapanData') || '[]';
    const dataParsed = JSON.parse(dataString);
    dataParsed.sort((a, b) => b.id - a.id); // Terbaru di atas
    setDataRekapan(dataParsed);
  };

  // useEffect ini akan berjalan 1x saat halaman dibuka
  useEffect(() => {
    loadData();
  }, []); // tanda [] berarti "jalankan 1x saja"

  // Fungsi Hapus Data
  const handleDelete = (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus rekapan ini?")) {
      return; 
    }
    try {
      const dataTersisa = dataRekapan.filter((item) => item.id !== id);
      localStorage.setItem('rekapanData', JSON.stringify(dataTersisa));
      setDataRekapan(dataTersisa);
      console.log("Rekapan berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  // Fungsi Tandai Selesai
  const handleSelesai = (id) => {
    try {
      const dataUpdated = dataRekapan.map((item) => {
        if (item.id === id) {
          return { ...item, status: 'Selesai' };
        }
        return item; 
      });
      localStorage.setItem('rekapanData', JSON.stringify(dataUpdated));
      setDataRekapan(dataUpdated);
      console.log("Rekapan ditandai selesai!");
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };


  return (
    <div>
      <h2>Manajemen Rekapan Layanan TI</h2>
      <p>Berikut adalah semua data yang tersimpan di browser Anda.</p>

      {dataRekapan.length === 0 ? (
        <p>Belum ada data rekapan yang tersimpan.</p>
      ) : (
        <table className="tabel-rekapan">
          <thead>
            <tr>
              <th>Jenis</th>
              <th>Pelapor</th>
              <th>Unit</th>
              <th>Prioritas</th>
              <th>Deskripsi</th>
              <th>Petugas</th>
              <th>Status</th>
              <th>Aksi</th> 
            </tr>
          </thead>
          <tbody>
            {dataRekapan.map((item) => (
              <tr key={item.id}>
                <td>{item.jenisLayanan}</td>
                <td>{item.pelapor}</td>
                <td>{item.unitKerja}</td>
                <td>{item.prioritas}</td>
                <td>{item.deskripsi}</td>
                <td>{item.petugas}</td>
                <td>
                  {item.status === 'Selesai' ? (
                    <span className="status-selesai">Selesai</span>
                  ) : (
                    <span className="status-baru">Baru</span>
                  )}
                </td>
                <td className="kolom-aksi">
                  {item.status !== 'Selesai' && (
                    <button 
                      className="btn-aksi btn-selesai"
                      onClick={() => handleSelesai(item.id)}
                    >
                      Selesai
                    </button>
                  )}
                  <button 
                    className="btn-aksi btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Laporan;