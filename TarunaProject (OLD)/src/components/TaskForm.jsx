import { useState } from 'react';
export default function TaskForm({ onAddTask }) {
    const [judul, setJudul] = useState('');
    const [mapel, setMapel] = useState('Pemrograman Web');
    function handleSubmit(event) {
        event.preventDefault();
        const judulBersih = judul.trim();
        if (!judulBersih) return;
        const taskBaru = {
            id: Date.now(),
            judul: judulBersih,
            mapel,
            selesai: false,
        };
        onAddTask(taskBaru);
        setJudul('');
    }
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Contoh: Membuat halaman dashboard"
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
            />
            <select value={mapel} onChange={(event) => setMapel(event.target.value)}>
                <option>Pemrograman Web</option>
                <option>Basis Data</option>
                <option>PBO</option>
            </select>
            <button type="submit">+ Tambah Tugas</button>
        </form>
    );
}