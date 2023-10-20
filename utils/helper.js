export const api_key = '6a8bc9c90e6aefc939e86ed670e5c1b8';

export function createCardWithCarousel(media, index) {
    return `
<div class="carousel-item${index === 0 ? ' active' : ''}">
    <div class="card">
        <img class="card-img img-fluid" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="${media.title}">
    </div>
</div>
`
};

export function createCard(media) {
    return `
<div class="card">
    <img class="card-img img-fluid" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="${media.title}">
</div>
`
};
