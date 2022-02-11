import axios from 'axios';

const KEY = '24701819-0d7586ce1f39ad56fcdaf1d5e';
const IMAGE_TYPE = 'image_type';
const ORIENTATION = 'horizontal';
const PER_PAGE = 12;

const PixabayAPI = query => {
    
    const params = {
        q: query,
        page: 1,
        key: KEY,
        image_type: IMAGE_TYPE,
        orientation: ORIENTATION,
        per_page: PER_PAGE,
    };

    return axios.get('https://pixabay.com/api/', { params: { ...params } })
        .then(response => {
            if (response.data.total) {
                return (response.data.hits.map(image => {
                    const { id, webformatURL, largeImageURL } = image;
                    return { id, webformatURL, largeImageURL };
                }));
            };

            return Promise.reject(new Error(`Зображень за запитом "${query}" не знайдено`));
        });
};

export default PixabayAPI;