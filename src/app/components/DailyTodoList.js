import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import DateNavigator from './DateNavigator';
import AddTodo from './AddTodo';
import { formatDate, formatDateTime } from '../../lib/DateFormatter';

const DailyTodoList = () => {
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTodoId, setEditTodoId] = useState(null); // Track which todo is being edited
  const [editTask, setEditTask] = useState(''); // Track the edited task text

  useEffect(() => {
    loadTodos(currentDate);
  }, [currentDate]);

  // Load todos for the current date from Supabase
  const loadTodos = async (date) => {
    // console.log('Loading todos for date:', date); // Debug log
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('date', date); // Filter by the current date in YYYY-MM-DD format

    if (error) {
      console.error('Error loading todos:', error);
      setTodoList([]);
    } else {
      // console.log('Fetched todos:', data); // Debug log
      setTodoList(data);
    }
  };

  const handleAddTodo = async () => {
    if (!newTask.trim()) return; // Do not add empty tasks

    const newTodo = {
      task: newTask,
      completed: false,
      createdAt: new Date().toISOString(), // Ensure this matches your database column name
      date: currentDate, // Use the current date in YYYY-MM-DD format
    };

    // Insert the new todo into Supabase
    const { data, error } = await supabase
      .from('todos')
      .insert([newTodo]);

    if (error) {
      console.error('Error adding todo:', error);
    } else {
      // Clear the input after successful insertion
      setNewTask('');

      // Fetch the todos again to reflect the newly added todo
      loadTodos(currentDate); // Re-fetch the todos for the current date
    }
  };

  const handleToggleTodo = async (id, currentCompleted) => {
    const updatedCompleted = !currentCompleted;
    const completedAt = updatedCompleted ? new Date().toISOString() : null;

    const { data, error } = await supabase
      .from('todos')
      .update({ completed: updatedCompleted, completedAt: completedAt })
      .eq('id', id);

    if (error) {
      console.error('Error updating todo:', error);
    } else {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedCompleted, completedAt } : todo
        )
      );
    }
  };

  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (confirmDelete) {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting todo:", error);
      } else {
        // Update the local state to remove the deleted todo
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
      }
    }
  };

  const handleEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditTask(todo.task);
  };

  const handleUpdateTodo = async (id) => {
    if (!editTask.trim()) return; // Prevent saving empty task

    const { data, error } = await supabase
      .from('todos')
      .update({ task: editTask })
      .match({ id });

    if (error) {
      console.error('Error updating todo:', error);
    } else {
      setTodoList((prev) => prev.map(todo => (todo.id === id ? { ...todo, task: editTask } : todo)));
      setEditTodoId(null); // Reset edit state
      setEditTask(''); // Clear input
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="w-full md:w-3/5 bg-white shadow-lg rounded-lg p-6">
        <DateNavigator currentDate={currentDate} formatDate={formatDate} setCurrentDate={setCurrentDate}/>

        <AddTodo newTask={newTask} setNewTask={setNewTask} handleAddTodo={handleAddTodo} />

        {/* To-do list */}
        <ul className="space-y-2">
          {todoList.length > 0 ? (
            todoList.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center space-x-4 p-4 bg-gray-100 rounded"
              >
                <input
                  id={todo.id}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, todo.completed)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />

                <div className="flex-grow text-black">

                  {editTodoId === todo.id && editTask.completed != false ? (
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      onBlur={() => handleUpdateTodo(todo.id)} // Update on blur
                      className="border rounded p-2 flex-grow mr-2"
                    />
                  ) : (
                    <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                      {todo.task}
                    </span>
                  )}

                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>{`Created: ${formatDateTime(todo.createdAt)}`}</span>
                    <span>{todo.completedAt ? `Done: ${formatDateTime(todo.completedAt)}` : null}</span>
                  </div>
                </div>

                <EditIcon onClick={() => handleEdit(todo)} />
                <DeleteIcon onClick={() => handleDeleteTodo(todo.id)} />

              </li>
            ))
          ) : (
            <li className="p-4 bg-gray-100 rounded">No tasks for this day</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DailyTodoList;
