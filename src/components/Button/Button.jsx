import { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {

    handlleClick = () => {
        const { onClick, page } = this.props;
        onClick(page + 1);
    }

    render() {
        const { handlleClick } = this;

        return (
            <div className={s.loadMore}>
                <button type='button' className={s.button} onClick={handlleClick}>Load more...</button>
            </div>
        )
    }
}
