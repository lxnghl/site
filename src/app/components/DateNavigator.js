import React from 'react';

const DateNavigator = ({ currentDate, formatDate, setCurrentDate }) => {

  const handlePreviousDay = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setCurrentDate(formatDate(previousDate)); // Set the date in YYYY-MM-DD format
  };

  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(formatDate(nextDate)); // Set the date in YYYY-MM-DD format
  };

  const prettyDate = new Date(currentDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={handlePreviousDay}
        className="bg-blue-500 text-white py-2 px-4 w-24 rounded hover:bg-blue-600 transition"
      >
        Previous
      </button>
      <h2 className="text-lg md:text-xl font-semibold truncate text-black">{prettyDate}</h2>
      <button
        onClick={handleNextDay}
        className="bg-blue-500 text-white py-2 px-4 w-24 rounded hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  );
};

export default DateNavigator;
