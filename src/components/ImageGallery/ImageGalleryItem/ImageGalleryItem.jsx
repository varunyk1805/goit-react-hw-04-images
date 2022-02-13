import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({images, query, onClick}) => {
    return (
        <>
            {images.map(image => {
                const { id, webformatURL } = image;
                return (
                    <li
                        key={id}
                        className={s.galleryItem}
                    >
                        <img
                            src={webformatURL}
                            id={id}
                            className={s.galleryImage}
                            alt={query}
                            onClick={onClick}
                        />
                    </li>
                );
            })}
        </>
    );
};

ImageGalleryItem.propTypes = {
    images: PropTypes.array.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;