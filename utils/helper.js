export const api_key = '6a8bc9c90e6aefc939e86ed670e5c1b8';

export const ImageSize = {
    SMALL: {
        size: 'w500',
        baseUrl: 'https://image.tmdb.org/t/p/w500',
    },
    ORIGINAL: {
        size: 'original',
        baseUrl: 'https://image.tmdb.org/t/p/original',
    },
};

export function createCardWithCarousel(media, index, ImageSize) {
    return `
<div class="carousel-item${index === 0 ? ' active' : ''}">
    ${createCard(media, ImageSize)}
</div>
`
};

export function createCard(media, ImageSize) {
    return `
<div class="card">
    <img class="card-img img-fluid" src="${ImageSize.baseUrl}${media.poster_path}" alt="${media.title}">
</div>
`
};
