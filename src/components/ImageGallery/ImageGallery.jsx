import { Component } from 'react';
import PixabayAPI from 'services/PixabayAPI';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';

import s from './ImageGallery.module.css';
import Button from 'components/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {

    state = {
        query: '',
        page: 1,
        images: [],
        error: null,
        status: STATUS.IDLE,
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const  prevPage  = prevState.page;
        const nextPage = this.state.page;
        
        if (prevQuery !== nextQuery || prevPage !== nextPage) {
            this.setState({query:this.props.query, status: STATUS.PENDING });
            setTimeout(() => {
                PixabayAPI(nextQuery, nextPage)
                    .then(images => this.setState({ images: [...prevState.images, ...images], status: STATUS.RESOLVED }))
                .catch(error => this.setState({error, status: STATUS.REJECTED}))
            }, 500 )
        }
    }

    handlleLoadMore = page => {
        this.setState({ page });
    }

    render() {
        const { images, query, status, error, page } = this.state;
        const { handlleLoadMore } = this;

        if (status === 'idle') {
            return (
                <div style={{ margin: '0 auto', }} >
                    Введіть запит для пошуку зображень
                </div>
            );
        };

        if (status === 'pending') {
            return (
                <>
                    <ul className={s.gallery}>
                        <ImageGalleryItem images={images} alt={query} />
                    </ul>
                    <Loader />
                </>
            );
        };

        if (status === 'resolved') {
            return (
                <>
                    <ul className={s.gallery}>
                        <ImageGalleryItem images={images} alt={query} />
                    </ul>
                    <Button onClick={handlleLoadMore} page={page}/>
                </>
            );
        };

        if (status === 'rejected') {
            return (
                <div className={s.error}>
                    {error.message}
                </div>
            );
        };
    }
}