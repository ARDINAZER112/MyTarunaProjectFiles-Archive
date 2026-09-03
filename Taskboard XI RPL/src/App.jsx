import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      judul: 'Membuat desain halaman login',
      mapel: 'Pemrograman Web',
      prioritas: 'Sedang',
      deadline: '2026-10-15T09:00',
      tanggalDibuat: '27 Agt 2026, 08:00',
      selesai: false
    },
    {
      id: 2,
      judul: 'Membuat class Product',
      mapel: 'PBO',
      prioritas: 'Tinggi',
      deadline: '2026-11-20T12:00',
      tanggalDibuat: '27 Agt 2026, 08:30',
      selesai: true
    },
  ]);

  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  function handleAddTask(taskBaru) {
    setTasks((prevTasks) => [...prevTasks, taskBaru]);
  }

  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, selesai: !task.selesai } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleEditTask(id, judulBaru) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, judul: judulBaru } : task
      )
    );
  }

  function handleHapusSemuaSelesai() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.selesai));
  }

  const filteredTasks = tasks.filter((task) => {
    let matchFilter = true;
    if (filter === 'selesai') matchFilter = task.selesai === true;
    if (filter === 'belum') matchFilter = task.selesai === false;

    const teksJudul = task.judul ? task.judul.toLowerCase() : '';
    const teksCari = search ? search.toLowerCase() : '';
    const matchSearch = teksJudul.includes(teksCari);

    return matchFilter && matchSearch;
  });

  const selesaiCount = tasks.filter((task) => task.selesai).length;
  const belumCount = tasks.length - selesaiCount;

  return (
    <div className="app-shell">
      <Header
        total={tasks.length}
        selesai={selesaiCount}
        belum={belumCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <TaskForm onAddTask={handleAddTask} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      {selesaiCount > 0 && (
        <div style={{ textAlign: 'right', marginBottom: '12px' }}>
          <button
            onClick={handleHapusSemuaSelesai}
            style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: '#fff0f0', color: '#a52d2d', cursor: 'pointer', fontSize: '13px' }}
          >
            Bersihkan Tugas Selesai
          </button>
        </div>
      )}

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}