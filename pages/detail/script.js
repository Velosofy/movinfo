import { getMovieDetails, getTVDetails, getMovieReviews, getTVReviews } from '../../utils/tmdb.js';
import { createDetailCardMovie, createDetailCardTV } from '../../utils/helper.js';

$(() => {
    const handleSearch = async () => {
        const id = $('.search-input').val();
        window.history.pushState({}, document.title, `?id=${id}`);
        const data = await getTVDetails(id) ?? await getMovieDetails(id);
        const reviews = await getTVReviews(id) ?? await getMovieReviews(id);

        if (!data) {
            $('.detail-container').html('<h1>No result found</h1>');
            return;
        }

        if (data.seasons) {
            $('.detail-container').html(createDetailCardTV(data, reviews));
        } else {
            $('.detail-container').html(createDetailCardMovie(data, reviews));
        }
    };

    $('.search-btn').on('click', handleSearch);

    $('.search-input').on('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        $('.search-input').val(id);
        handleSearch();
    }
});