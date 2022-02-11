import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

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
            <>
                <Searchbar
                    onSubmit={handleSubmit}
                />
                <ImageGallery 
                    query={query}
                />
            </>
        );
    };
};
