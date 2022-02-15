import { GoSearch } from 'react-icons/go';
import s from './Icons.module.css';

const Search = () => {
    return (
        <>
            <GoSearch
                className={s.search}
            />
        </>
    );
};

export default Search;