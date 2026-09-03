import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editJudul, setEditJudul] = useState(task.judul);

    const badgePrioritasClass = `badge badge-${task.prioritas ? task.prioritas.toLowerCase() : 'sedang'}`;

    function handleSimpan() {
        if (editJudul.trim() !== '') {
            onEdit(task.id, editJudul);
            setIsEditing(false);
        }
    }

    const formatDeadline = task.deadline
        ? new Date(task.deadline).toLocaleString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
        : '-';

    return (
        <article className={`task-card ${task.selesai ? 'done' : ''}`}>
            <div className="task-content" style={{ flexGrow: 1, marginRight: '16px' }}>
                <span className="badge">{task.mapel}</span>
                {task.prioritas && (
                    <span className={badgePrioritasClass} style={{ marginLeft: '6px' }}>
                        {task.prioritas}
                    </span>
                )}

                {isEditing ? (
                    <div style={{ marginTop: '8px', marginBottom: '4px' }}>
                        <input
                            type="text"
                            value={editJudul}
                            onChange={(e) => setEditJudul(e.target.value)}
                            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #1778a6' }}
                            autoFocus
                        />
                    </div>
                ) : (
                    <h3>{task.judul}</h3>
                )}

                <div style={{ fontSize: '12px', color: '#66717d', marginTop: '6px', marginBottom: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span><span style={{ opacity: 0.6 }}>Dibuat:</span> {task.tanggalDibuat || 'Data lama'}</span>
                    <span style={{ color: task.selesai ? '#66717d' : '#d32f2f', fontWeight: '500' }}>
                        ⏰ Deadline: {formatDeadline}
                    </span>
                </div>

                <p>{task.selesai ? 'Sudah selesai' : 'Belum selesai'}</p>
            </div>

            <div className="task-actions">
                {isEditing ? (
                    <button type="button" onClick={handleSimpan} style={{ background: '#4caf50', color: 'white' }}>
                        Simpan
                    </button>
                ) : (
                    <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button type="button" onClick={() => onToggle(task.id)}>
                    {task.selesai ? 'Batalkan' : 'Selesai'}
                </button>
                <button type="button" className="danger" onClick={() => onDelete(task.id)}>
                    Hapus
                </button>
            </div>
        </article>
    );
}