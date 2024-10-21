import React from 'react';

const AddTodo = ({ newTask, setNewTask, handleAddTodo }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        name='addNewTask'
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
        className="border rounded p-2 flex-grow mr-2"
      />
      <button
        onClick={handleAddTodo}
        className="bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 transition"
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
