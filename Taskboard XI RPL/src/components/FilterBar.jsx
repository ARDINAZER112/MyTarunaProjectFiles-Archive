export default function FilterBar({ filter, onFilterChange, search, onSearchChange }) {
    const pilihan = [
        { value: 'semua', label: 'Semua' },
        { value: 'belum', label: 'Belum Selesai' },
        { value: 'selesai', label: 'Selesai' },
    ];

    return (
        <div className="filter-bar" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {pilihan.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        className={filter === item.value ? 'active' : ''}
                        onClick={() => onFilterChange(item.value)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder="Cari tugas..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ border: '1px solid #d4dee8', borderRadius: '8px', padding: '8px 12px', flexGrow: 1, maxWidth: '250px' }}
            />
        </div>
    );
}