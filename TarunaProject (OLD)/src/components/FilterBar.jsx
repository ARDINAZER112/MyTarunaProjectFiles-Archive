export default function FilterBar({ filter, onFilterChange }) {
    const pilihan = [
        { value: 'semua', label: 'Semua' },
        { value: 'belum', label: 'Belum Selesai' },
        { value: 'selesai', label: 'Selesai' },
    ];
    return (
        <div className="filter-bar">
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
    );
}