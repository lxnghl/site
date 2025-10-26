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
        className="border rounded p-2 grow mr-2 text-black"
      />
      <button
        onClick={handleAddTodo}
        className="text-white py-2 px-4 rounded"
        style={{ background: '#4CAF50'}}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
