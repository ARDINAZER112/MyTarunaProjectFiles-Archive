export default function Header({ total, selesai, belum }) {
    return (
        <header className="app-header">
            <div>
                <p className="eyebrow">REACT PROJECT XI RPL</p>
                <h1>TaskBoard Kelas</h1>
                <p>Catat, kerjakan, dan pantau progres tugasmu.</p>
            </div>
            <div className="stats">
                <strong>{selesai}/{total}</strong>
                <span>tugas selesai</span>
                <span style={{ display: 'block', fontSize: '11px', marginTop: '4px', color: '#ffb3b3' }}>
                    {belum} belum selesai
                </span>
            </div>
        </header>
    );
}