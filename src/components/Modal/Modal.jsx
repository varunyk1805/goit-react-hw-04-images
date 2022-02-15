import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        window.addEventListener('keydown', handlleKeyDown);
        return () => {
            window.removeEventListener('keydown', handlleKeyDown);
        }
    });
    
    const handlleKeyDown = event => {
        if (event.code === 'Escape') {
            onClose();
        };
    };

    const handlleOverlay = event => {
        if (event.target === event.currentTarget) {
            onClose();
        };
    };

    return createPortal(
        <div
            className={s.overlay}
            onClick={handlleOverlay}
        >
            <div
                className={s.modal}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Modal;