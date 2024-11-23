import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CompletedIcon = ({ isCompleted, onClick }) => {
  const iconColor = isCompleted ? '#4CAF50' : '#B0BEC5'; // Green for completed, grey for not

  return (
    <button
      onClick={onClick}
      aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{
          color: iconColor,
          fontSize: '1.5rem',
        }}
      />
    </button>
  );
};

export default CompletedIcon;
