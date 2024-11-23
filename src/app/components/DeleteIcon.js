import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteIcon = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Delete Todo">
      <FontAwesomeIcon icon={faTrash} style={{ color: '#FF6F61', fontSize: '1.5rem' }} />
    </button>
  );
};

export default DeleteIcon;
