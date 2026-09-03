import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setCurrentPage(1);
    }, [tasks]);

    if (tasks.length === 0) {
        return <p className="empty-state">Tidak ada tugas yang sesuai.</p>;
    }

    const totalPages = Math.ceil(tasks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <section>
            <div className="task-list">
                {currentTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>

                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        style={{
                            padding: '6px 12px', border: '1px solid #d4dee8', borderRadius: '6px',
                            background: currentPage === 1 ? '#e9ecef' : 'white',
                            color: currentPage === 1 ? '#a0aab5' : '#173a5e',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        &laquo;
                    </button>

                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            type="button"
                            onClick={() => setCurrentPage(number)}
                            style={{
                                padding: '6px 12px',
                                border: '1px solid #d4dee8',
                                borderRadius: '6px',
                                background: currentPage === number ? '#173a5e' : 'white',
                                color: currentPage === number ? 'white' : '#173a5e',
                                cursor: 'pointer',
                                fontWeight: currentPage === number ? 'bold' : 'normal',
                                transition: 'all 0.2s'
                            }}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        style={{
                            padding: '6px 12px', border: '1px solid #d4dee8', borderRadius: '6px',
                            background: currentPage === totalPages ? '#e9ecef' : 'white',
                            color: currentPage === totalPages ? '#a0aab5' : '#173a5e',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        &raquo;
                    </button>
                </div>
            )}
        </section>
    );
}