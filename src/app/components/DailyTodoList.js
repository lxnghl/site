import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import DateNavigator from './DateNavigator';
import AddTodo from './AddTodo';
import { formatDate, formatDateTime } from '../../lib/DateFormatter';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/authAtoms';
import { todoListAtom } from '../atoms/authAtoms';
import RecurringIcon from './RecurringIcon';
import CompletedIcon from './CompletedIcon';

const DailyTodoList = () => {
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const [newTask, setNewTask] = useState('');
  const [editTodoId, setEditTodoId] = useState(null); // Track which todo is being edited
  const [editTask, setEditTask] = useState(''); // Track the edited task text
  const [user] = useAtom(userAtom);

  useEffect(() => {
    loadTodos(currentDate);
  }, [currentDate]);

  // Load todos for the current date from Supabase
  const loadTodos = async (date) => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('date', date) // Filter by the current date in YYYY-MM-DD format
      .eq('owner', user.id);

    if (error) {
      console.error('Error loading todos:', error);
      setTodoList([]);
    } else {
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
      owner: user.id
    };

    // Insert the new todo into Supabase
    const { error } = await supabase
      .from('todos')
      .insert([newTodo]);

    if (error) {
      console.error('Error adding todo:', error);
    } else {
      setNewTask(''); // Clear the input after successful insertion
      loadTodos(currentDate); // Re-fetch the todos for the current date
    }
  };

  const handleToggleTodo = async (id, currentCompleted) => {
    const updatedCompleted = !currentCompleted;
    const completedAt = updatedCompleted ? new Date().toISOString() : null;

    const { error } = await supabase
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

    const { error } = await supabase
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

  const handleToggleRecurring = async (todoId, currentState) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ isRecurring: !currentState })
        .eq('id', todoId);

      if (error) {
        console.error('Error toggling recurring status:', error);
        return;
      }

      // Update the local state to reflect the change
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === todoId ? { ...todo, isRecurring: !currentState } : todo
        )
      );
    } catch (err) {
      console.error('Unexpected error toggling recurring status:', err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow overflow-auto">
      <div className="w-full md:w-3/5 bg-white shadow-2xl rounded-lg p-8 mb-2">
        <DateNavigator currentDate={currentDate} formatDate={formatDate} setCurrentDate={setCurrentDate} />

        <AddTodo newTask={newTask} setNewTask={setNewTask} handleAddTodo={handleAddTodo} />

        <ul className="space-y-2">
          {todoList.length > 0 ? (
            [...todoList] // Create a copy to avoid mutating the original array
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by `createdAt` descending
              .map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center space-x-4 p-4 bg-gray-100 rounded"
                >
                  <CompletedIcon
                    isCompleted={todo.completed}
                    onClick={() => handleToggleTodo(todo.id, todo.completed)}
                  />

                  <div className="flex-grow text-black">
                    {editTodoId === todo.id && editTask.completed !== false ? (
                      <input
                        type="text"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        onBlur={() => handleUpdateTodo(todo.id)} // Update on blur
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateTodo(todo.id); // Trigger update on Enter key
                          }
                        }}
                        className="border rounded p-2 w-full mr-2"
                      />
                    ) : (
                      <span>
                        {todo.task}
                      </span>
                    )}

                    <div className="flex flex-col text-gray-500 text-xs">
                      <span>{`Created: ${formatDateTime(todo.createdAt)}`}</span>
                      {todo.completedAt && (
                        <span>{`Done: ${formatDateTime(todo.completedAt)}`}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">  {/* Wrap icons here */}
                    <RecurringIcon
                      isRecurring={todo.isRecurring}
                      onClick={() => handleToggleRecurring(todo.id, todo.isRecurring)}
                    />
                    <EditIcon
                      onClick={() => handleEdit(todo)}
                    />
                    <DeleteIcon
                      onClick={() => handleDeleteTodo(todo.id)}
                    />
                  </div>
                </li>
              ))
          ) : (
            <li className="p-4 bg-gray-100 rounded text-black">No tasks for this day</li>
          )}
        </ul>

      </div>
    </div>
  );

};

export default DailyTodoList;
