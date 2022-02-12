import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import s from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {

    state = {
        query: '',
    };

    handleSubmit = query => {
        this.setState({ query });
    };

    render() {
        const { query } = this.state;
        const { handleSubmit } = this;
        
        return (
            <div className={s.app}>
                <Searchbar
                    onSubmit={handleSubmit}
                />
                <ImageGallery 
                    query={query}
                />
            </div>
        );
    };
};
