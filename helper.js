export const api_key = '6a8bc9c90e6aefc939e86ed670e5c1b8';

export function createCard(media, index) {
    return `
<div class="carousel-item${index === 0 ? ' active' : ''}">
    <div class="card">
        <img class="movie-image img-fluid" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="${media.title}">
    </div>
</div>
`
};

