import { Component } from 'react';
import PixabayAPI from '../../services/PixabayAPI';
import ImageGalleryItem from './ImageGalleryItem';

import s from './ImageGallery.module.css';

// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default class ImageGallery extends Component {

    state = {
        query: '',
        images: [],
        error: null,
        // status: STATUS.IDLE,
    };

    componentDidUpdate(prevProps) {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;

        // console.log(nextQuery);

        if (prevQuery !== nextQuery) {
            PixabayAPI(nextQuery)
                .then(images => this.setState({images}))
        }
        
    }



    render() {
        // console.log(this.props.query);
        const { images,query } = this.state;

        return (
            <>
                <ul className={s.gallery}>
                    <ImageGalleryItem images={images} alt={query} />
                </ul>
            </>
        );
    }
}