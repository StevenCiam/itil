import React, { useState } from 'react'

// Definisikan state awal
const initialState = {
  jenisLayanan: '',
  pelapor: '',
  unitKerja: '',
  deskripsi: '',
  prioritas: 'Rendah',
  petugas: '', 
};

// Definisikan daftar petugas TI Anda di sini
const daftarPetugas = [
  'Andi Wijaya',
  'Budi Santoso',
  'Citra Lestari',
  'Dewi Sartika',
  'Eko Prasetyo',
  'PUSKOM'
];

function Formulir() {
  const [formData, setFormData] = useState(initialState);
  const [pesanSukses, setPesanSukses] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    try {
      const dataBaru = {
        ...formData,
        id: new Date().getTime(), 
        tanggal: new Date().toISOString(),
        status: 'Baru' // Tambahkan status 'Baru'
      };

      const dataRekapanLama = localStorage.getItem('rekapanData') || '[]';
      const parseDataLama = JSON.parse(dataRekapanLama);
      parseDataLama.push(dataBaru);
      localStorage.setItem('rekapanData', JSON.stringify(parseDataLama));
      
      console.log("Data berhasil disimpan ke localStorage!");

      setPesanSukses(true);
      setFormData(initialState);
      
      setTimeout(() => {
        setPesanSukses(false);
      }, 5000);

    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div> 
      <h2>Formulir Rekapan Layanan TI</h2>
      <p>Gunakan formulir ini untuk mencatat setiap permintaan atau insiden layanan TI. Data ini akan disimpan di browser Anda.</p>
      
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="jenisLayanan">Jenis Rekapan (Practice)</label>
          <select 
            id="jenisLayanan" 
            name="jenisLayanan" 
            value={formData.jenisLayanan}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Jenis --</option>
            <option value="Incident Management">Insiden (Layanan terputus/error)</option>
            <option value="Service Request">Permintaan Layanan (Instalasi, password reset)</option>
            <option value="Change Control">Permintaan Perubahan (Upgrade server, ganti sistem)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="pelapor">Nama Pelapor / User</label>
          <input 
            type="text" 
            id="pelapor" 
            name="pelapor" 
            value={formData.pelapor}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="unitKerja">Departemen / Unit Kerja</label>
          <input 
            type="text" 
            id="unitKerja" 
            name="unitKerja" 
            value={formData.unitKerja}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi Singkat Permasalahan/Permintaan</label>
          <textarea 
            id="deskripsi" 
            name="deskripsi" 
            rows="4"
            value={formData.deskripsi}
            onChange={handleChange}
            required 
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="prioritas">Prioritas</label>
          <select 
            id="prioritas" 
            name="prioritas"
            value={formData.prioritas}
            onChange={handleChange} 
            required
          >
            <option value="Rendah">Rendah (Low)</option>
            <option value="Sedang">Sedang (Medium)</option>
            <option value="Tinggi">Tinggi (High)</option>
            <option value="Kritis">Kritis (Critical)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="petugas">Ditugaskan Kepada (Petugas TI)</label>
          <select
            id="petugas"
            name="petugas"
            value={formData.petugas}
            onChange={handleChange}
          >
            <option value="">-- Pilih Petugas (Opsional) --</option>
            {daftarPetugas.map((nama) => (
              <option key={nama} value={nama}>
                {nama}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">Simpan Rekapan</button>
      </form>
      
      {pesanSukses && (
        <div className="pesan-sukses">
          <p><strong>Sukses!</strong> Data layanan telah direkam di browser Anda.</p>
        </div>
      )}

    </div>
  )
}

export default Formulir