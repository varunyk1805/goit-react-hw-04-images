import { Component } from 'react';
import PropTypes from 'prop-types';
import Search from 'components/Icons';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {

    state = {
        inputValue: '',
    };

    handlleSubmit = event => {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { inputValue } = this.state;
        onSubmit(inputValue);
        this.setState({ inputValue: '' });
    };

    handlleChange = event => {
        const { value } = event.target;
        this.setState({ inputValue: value });
    }

    render() {
        const { inputValue } = this.state;
        const { handlleChange, handlleSubmit } = this;
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
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};