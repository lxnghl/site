export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  });
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  return `${time} ${formattedDate}`;
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
};
