import { Component } from 'react';
import PropTypes from 'prop-types';
import PixabayAPI from 'services/PixabayAPI';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

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
        totalPages: 0,
        error: null,
        status: STATUS.IDLE,
        isModal: false,
        idImage: '',
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const prevPage  = prevState.page;
        const nextPage = this.state.page;
        const prevImages = prevState.images;
        const prevQueryEdited = prevQuery.replace(/\s+/g, ' ').trim().toLowerCase();
        const nextQueryEdited = nextQuery.replace(/\s+/g, ' ').trim().toLowerCase();
        
        if (prevQueryEdited !== nextQueryEdited) {
            const startPage = 1;
            this.setState({ query: nextQuery, page: startPage, images: [], status: STATUS.PENDING });

            PixabayAPI(nextQuery, startPage)
                .then(data => {
                    const { images, totalPages } = data;
                    this.setState({ images, totalPages, status: STATUS.RESOLVED });
                })
                .catch(error => this.setState({ error, totalPages: 0, status: STATUS.REJECTED }))
        };

        if (prevPage !== nextPage && nextPage !== 1) {
            this.setState({ page: nextPage, status: STATUS.PENDING });
            
            PixabayAPI(nextQuery, nextPage)
                .then(data => {
                    const { images } = data;
                    this.setState({ images: [...prevImages, ...images], status: STATUS.RESOLVED })
                })
            .catch(error => this.setState({error, status: STATUS.REJECTED}))
        };
    };

    handlleLoadMore = page => {
        this.setState({ page });
    };

    toggleModal = () => {
        const { isModal } = this.state;
        this.setState({ isModal: !isModal });
    };

    findID = event => {
        const { id } = event.target;
        this.setState({ idImage: +id });
        this.toggleModal();
    };
    
    findImagebyID = () => {
        const { images, idImage } = this.state;
        if (idImage) {
            return images.find(image => image.id === idImage);
        };
    };

    render() {
        const { images, query, page, totalPages, status, error, isModal } = this.state;
        const { handlleLoadMore, toggleModal, findID } = this;
        const findedImage = this.findImagebyID();

        if (status === 'idle') {
            return (
                <span
                    className={s.message}
                >
                    Enter an image search query
                </span>
            );
        };

        if (status === 'pending') {
            return (
                <>
                    <ul
                        className={s.gallery}
                    >
                        <ImageGalleryItem
                            images={images}
                            alt={query} 
                            />
                    </ul>
                    <Loader />
                </>
            );
        };

        if (status === 'resolved') {
            return (
                <>
                    <ul
                        className={s.gallery}
                    >
                        <ImageGalleryItem
                            images={images}
                            alt={query}
                            onClick={findID} 
                        />
                    </ul>
                    {totalPages !== page
                        ?
                        <Button
                            onClick={handlleLoadMore}
                            page={page} 
                        />
                        :
                        <span
                            className={s.message}
                        >
                            Showing all images for "{query}"
                        </span> 
                    }
                    {isModal &&
                        <Modal
                            onClose={toggleModal}
                        >
                            <img
                                src={findedImage.largeImageURL}
                                className={s.galleryImage}
                                alt={query} 
                            />
                        </Modal>
                    }
                </>
            );
        };

        if (status === 'rejected') {
            return (
                <span
                    className={s.message}
                >
                    {error.message}
                </span>
            );
        };
    };
};

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
};