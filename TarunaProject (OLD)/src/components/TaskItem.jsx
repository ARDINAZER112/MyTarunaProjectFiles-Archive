export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <article className={`task-card ${task.selesai ? 'done' : ''}`}>
            <div className="task-content">
                <span className="badge">{task.mapel}</span>
                <h3>{task.judul}</h3>
                <p>{task.selesai ? 'Sudah selesai' : 'Belum selesai'}</p>
            </div>
            <div className="task-actions">
                <button type="button" onClick={() => onToggle(task.id)}>
                    {task.selesai ? 'Batalkan' : 'Tandai Selesai'}
                </button>
                <button type="button" className="danger" onClick={() => onDelete(task.id)}>
                    Hapus
                </button>
            </div>
        </article>
    );
}
