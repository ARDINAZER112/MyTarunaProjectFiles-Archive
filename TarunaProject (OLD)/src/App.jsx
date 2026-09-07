import { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, judul: 'Membuat desain halaman login', mapel: 'Web', selesai: false },
    { id: 2, judul: 'Membuat class Product', mapel: 'PBO', selesai: true },
  ]);
  const [filter, setFilter] = useState('semua');
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
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'selesai') return task.selesai;
    if (filter === 'belum') return !task.selesai;
    return true;
  });
  const selesaiCount = tasks.filter((task) => task.selesai).length;
  const belumCount = tasks.length - selesaiCount;
  return (
    <div className="app-shell">
      <Header total={tasks.length} selesai={selesaiCount} />
      <TaskForm onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}