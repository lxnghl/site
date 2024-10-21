import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EditIcon = ({ onClick }) => {
    return (
        <button onClick={onClick} aria-label="Edit Todo">
            <FontAwesomeIcon icon={faEdit} style={{ color: '#F39C12', fontSize: '20px' }} /> {/* Light blue color */}
        </button>
    );
};

export default EditIcon;
