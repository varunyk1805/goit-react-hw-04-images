import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PixabayAPI from '../../services/PixabayAPI';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from '../Loader';
import Modal from '../Modal';

import s from './ImageGallery.module.css';
import Button from '../Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ queryValue }) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [isModal, setIsModal] = useState(false);
    const [idImage, setIdImages] = useState('');

    useEffect(() => {
        if (query !== queryValue) {          
            setQuery(queryValue);
            setImages([]);
            setPage(1);
            setStatus(STATUS.PENDING);
            
            PixabayAPI(queryValue, 1)
                .then(data => {
                    const { images, totalPages } = data;
             
                    setImages(images);
                    setTotalPages(totalPages);
                    setStatus(STATUS.RESOLVED);
                })
                .catch(error => {
                    setError(error);
                    setTotalPages(0);
                    setStatus(STATUS.REJECTED);
                })
            return;
        };

        if (page !== 1) {
            setPage(page);
            setStatus(STATUS.PENDING);
                
            PixabayAPI(query, page)
                .then(data => {
                    const { images } = data;
                    setImages(prev => [...prev, ...images]);
                    setStatus(STATUS.RESOLVED);
                })
                .catch(error => {
                    setError(error);
                    setStatus(STATUS.REJECTED);
                });
            return;
        };

    }, [query, queryValue, page])

    const handlleLoadMore = page => {
        setPage(page);
    };

    const toggleModal = () => {
        setIsModal(!isModal);
    };

    const findID = event => {
        const { id } = event.target;
        setIdImages(+id);
        toggleModal();
    };
    
    const findedImage = (() => {
        if (idImage) {
            return images.find(image => image.id === idImage);
        };
    })();

    switch (status) {

        case 'idle':
            return (
                <span
                    className={s.message}
                >
                    Enter an image search query
                </span>
            );
                    
        case 'pending':
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
        
        case 'resolved':
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
        
        case 'rejected':
            return (
                <span
                    className={s.message}
                >
                    {error.message}
                </span>
            );
        
        default:
            return;
    };  
};

ImageGallery.propTypes = {
    queryValue: PropTypes.string.isRequired,
};

export default ImageGallery;