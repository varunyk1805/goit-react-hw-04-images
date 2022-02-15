import { useState } from 'react';
import PropTypes from 'prop-types';
import Search from '../../components/Icons';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handlleSubmit = event => {
        event.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    const handlleChange = event => {
        const { value } = event.target;
        setInputValue(value);
    }

    return (
        <>
            <header
                className={s.header}
            >
                <form
                    className={s.form}
                    onSubmit={handlleSubmit}
                >
                    <button
                        className={s.button}
                        type="submit"
                    >
                        <Search />
                        <span
                            className={s.buttonLabel}
                        >
                            Search
                        </span>
                    </button>
                    <input
                        className={s.input}
                        onChange={handlleChange}
                        type="text"
                        value={inputValue}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        </>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;