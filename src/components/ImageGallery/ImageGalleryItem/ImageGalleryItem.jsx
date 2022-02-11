import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {

    render() {
        const { images, query } = this.props;

        return (
            <>
                {images.map(image => {
                    const { id, webformatURL } = image;
                    return (
                        <li key={id} className={s.galleryItem}>
                            <img src={webformatURL} className={s.galleryImage} alt={query} />
                        </li>
                    )
                })}
            </>
        )
    }
}