import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({onClick, page}) => {

    const handlleClick = () => {
        onClick(page + 1);
    };

    return (
        <div
            className={s.loadMore}>
            <button
                type='button'
                className={s.button}
                onClick={handlleClick}
            >
                Load more
            </button>
        </div>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
};

export default Button;