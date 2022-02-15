import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import s from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => {
    const [query, setQuery] = useState('');

    const handleSubmit = value => {
        setQuery(value);
    };
        
    return (
        <div className={s.app}>
            <Searchbar
                onSubmit={handleSubmit}
            />
            <ImageGallery
                queryValue={query}
            />
        </div>
    );
};

export default App;