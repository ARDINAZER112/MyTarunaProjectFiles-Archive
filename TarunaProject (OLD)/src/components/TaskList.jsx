import TaskItem from './TaskItem';
export default function TaskList({ tasks, onToggle, onDelete }) {
    if (tasks.length === 0) {
        return <p className="empty-state">Tidak ada tugas pada kategori ini.</p>;
    }
    return (
        <section className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
}
