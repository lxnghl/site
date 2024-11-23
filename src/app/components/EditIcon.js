import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const EditIcon = ({ onClick }) => {
    return (
        <button onClick={onClick} aria-label="Edit Todo">
            {/* <FontAwesomeIcon icon={faEdit} style={{ color: '#F39C12', fontSize: '20px' }} />  */}
            <FontAwesomeIcon icon={faPencil} style={{color: "#FFD43B", fontSize: '1.5rem'}} />
        </button>
    );
};

export default EditIcon;
