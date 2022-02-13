import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handlleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlleKeyDown);
    };

    handlleKeyDown = event => {
        const { onClose } = this.props;
        if (event.code === 'Escape') {
            onClose();
        };
    };

    handlleOverlay = event => {
        const { onClose } = this.props;
        if (event.target === event.currentTarget) {
            onClose();
        };
    };

    render() {
        return createPortal(
            <div
                className={s.overlay}
                onClick={this.handlleOverlay}
            >
                <div
                    className={s.modal}
                >
                    {this.props.children}
                </div>
            </div>,
            modalRoot
        );
    };
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};