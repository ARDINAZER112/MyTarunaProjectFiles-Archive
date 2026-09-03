import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
    const [judul, setJudul] = useState('');
    const [mapel, setMapel] = useState('Pemrograman Web');
    const [prioritas, setPrioritas] = useState('Sedang');

    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const judulBersih = judul.trim();

        if (!judulBersih) {
            setError('Judul tugas tidak boleh kosong!');
            return;
        }
        if (!deadline) {
            setError('Tentukan deadline tugas!');
            return;
        }

        const waktuSekarang = new Date().toLocaleString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        const taskBaru = {
            id: Date.now(),
            judul: judulBersih,
            mapel,
            prioritas,
            deadline,
            tanggalDibuat: waktuSekarang,
            selesai: false,
        };

        onAddTask(taskBaru);
        setJudul('');
        setPrioritas('Sedang');
        setDeadline('');
        setError('');
    }

    return (
        <div>
            <form
                className="task-form"
                onSubmit={handleSubmit}
                style={{ marginBottom: error ? '10px' : '14px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
            >
                <input
                    type="text"
                    placeholder="Contoh: Membuat halaman dashboard"
                    value={judul}
                    onChange={(event) => {
                        setJudul(event.target.value);
                        if (error) setError('');
                    }}
                    style={{ flexGrow: 1, minWidth: '200px' }}
                />

                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => {
                        setDeadline(e.target.value);
                        if (error) setError('');
                    }}
                    style={{ color: deadline ? '#17202a' : '#66717d' }}
                />

                <select value={mapel} onChange={(event) => setMapel(event.target.value)}>
                    <option>Pemrograman Web</option>
                    <option>Basis Data</option>
                    <option>PBO</option>
                </select>
                <select value={prioritas} onChange={(event) => setPrioritas(event.target.value)}>
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                </select>
                <button type="submit">+ Tambah</button>
            </form>

            {error && (
                <p style={{ color: '#d32f2f', fontSize: '13px', margin: '0 0 14px 14px' }}>
                    {error}
                </p>
            )}
        </div>
    );
}