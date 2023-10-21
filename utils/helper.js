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

export function createCardWithCarousel(media, type, index, ImageSize) {
    return `
<div class="carousel-item${index === 0 ? ' active' : ''}">
    ${createCard(media, type, ImageSize)}
</div>
`
};

export function createCard(media, type, ImageSize) {
    return `
<a href="../detail/index.html?type=${type}&id=${media.id}">
    <div class="card">
        <img class="card-img img-fluid" src="${ImageSize.baseUrl}${media.poster_path}" alt="${media.title}">
    </div>
</a>
`
};

function getAirDate(data) {
    if (data.in_production) {
        return `${getPrettyDate(data.first_air_date)} - Present`;
    } else {
        return `${getPrettyDate(data.first_air_date)} - ${getPrettyDate(data.last_air_date)}`;
    }
}

export function createDetailCardMovie(data, reviews) {
    const review = reviews.total_results > 0 ? reviews.results[Math.floor(Math.random() * reviews.total_results)] : null;
    return `
<div class="card my-2">
    <div class="row g-0">
        <div class="col-lg-4">
            <img src=https://image.tmdb.org/t/p/original${data.poster_path}
             alt=${data.title} class="card-image img-fluid rounded-start w-100 h-100 object-fit-cover">
        </div>
        <div class="col-lg-8">
            <div class="card-body">
                <h3 class="card-title">
                    ${data.title}
                </h3>
                <p class="card-tagline">
                    ${data.tagline}
                </p>

                <h5>Overview</h5>
                <p class="ms-4 card-overview">
                    ${data.overview}
                </p>

                <h5>Rating</h5>
                <p class="ms-4 card-rating">
                    ${data.vote_average.toPrecision(2)} / 10
                </p>

                <h5>Release Date</h5>
                <p class="ms-4 card-release-date">
                    ${getPrettyDate(data.release_date)}
                </p>

                <h5>Runtime</h5>
                <p class="ms-4 card-runtime">
                    ${getPrettyTime(data.runtime)}
                </p>

                <h5>Genre</h5>
                <p class="ms-4 card-genre">
                    ${data.genres.map(genre => genre.name).join(', ')}
                </p>

                <h5>Review</h5>
                <div class="card-review">
                    ${review ? `
                    <h6 class="card-review-author">
                        by ${review.author}
                    </h6>
                    <p class="card-review-content-text">
                        ${review.content}
                    </p>
                    ` : `
                    <h6 class="card-review-author">
                        No review found
                    </h6>
                    `}
                </div>
            </div>
        </div>
    </div>
</div>
`
}

export function createDetailCardTV(data, reviews) {
    const review = reviews.total_results > 0 ? reviews.results[Math.floor(Math.random() * reviews.total_results)] : null; console.log(reviews.total_results);
    return `
<div class="card my-2">
    <div class="row g-0">
        <div class="col-lg-4">
            <img src=https://image.tmdb.org/t/p/original${data.poster_path}
             alt=${data.name} class="card-image img-fluid rounded-start w-100 h-100 object-fit-cover">
        </div>
        <div class="col-lg-8">
            <div class="card-body">
                <h3 class="card-title">
                    ${data.name}
                </h3>
                <p class="card-tagline">
                    ${data.tagline}
                </p>


                <h5>Overview</h5>
                <p class="ms-4 card-overview">
                    ${data.overview}
                </p>
                
                <h5>Rating</h5>
                <p class="ms-4 card-rating">
                    ${data.vote_average.toPrecision(2)} / 10
                </p>

                <h5>Air Date</h5>
                <p class="ms-4 card-air-date">
                    ${getAirDate(data)}
                </p>

                <h5>Total of Episodes</h5>
                <p class="ms-4 card-episodes">
                    ${data.number_of_episodes} in ${data.number_of_seasons} seasons
                </p>

                <h5>Genre</h5>
                <p class="ms-4 card-genre">
                    ${data.genres.map(genre => genre.name).join(', ')}
                </p>

                <h5>Review</h5>
                <div class="card-review">
                    ${review ? `
                    <h6 class="card-review-author">
                        by ${review.author}
                    </h6>
                    <p class="card-review-content-text">
                        ${review.content}
                    </p>
                    ` : `
                    <h6 class="card-review-author">
                        No review found
                    </h6>
                    `}
                </div>
            </div>
        </div>
    </div>
</div>
`
}

export function getPrettyTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours}h ${minutes}m`;
};

export function getPrettyDate(date) {
    const [year, month, day] = date.split('-');
    const dayName = new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long' });
    return `${dayName}, ${day} ${monthName} ${year}`;
}