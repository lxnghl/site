import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

const RecurringIcon = ({ isRecurring, onClick }) => {
  const iconColor = isRecurring ? '#4CAF50' : '#B0BEC5'; // Green for enabled, Gray for disabled

  return (
    <button onClick={onClick} aria-label="Toggle Recurring Status">
      <FontAwesomeIcon icon={faRotateRight} style={{ color: iconColor, fontSize: '1.5rem' }} />
    </button>
  );
};

export default RecurringIcon;
