import { getMovieDetails, getTVDetails, getMovieReviews, getTVReviews } from '../../utils/tmdb.js';
import { createDetailCardMovie, createDetailCardTV } from '../../utils/helper.js';

$(() => {
    const handleSearch = async () => {
        const id = $('.search-input').val();
        const type = $('.search-type').val();
        window.history.replaceState({}, document.title, `?type=${type}&id=${id}`);

        $('.detail-container').html(`
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        `);

        var data;
        if (type === 'Movie') {
            data = await getMovieDetails(id);
            if (!data) {
                $('.detail-container').html(`<h1>No result found</h1>`);
                return;
            }
            const reviews = await getMovieReviews(id);
            $('.detail-container').html(createDetailCardMovie(data, reviews));
        } else if (type === 'TV') {
            data = await getTVDetails(id);
            if (!data) {
                $('.detail-container').html(`<h1>No result found</h1>`);
                return;
            }
            const reviews = await getTVReviews(id);
            $('.detail-container').html(createDetailCardTV(data, reviews));
        }
    };

    var search_type = 'none';
    $('.search-type').on('change', () => {
        search_type = $('.search-type').val();
        if (search_type === 'none') {
            $('.search-input').attr('placeholder', 'Select search type');
            $('.search-btn').attr('disabled', true);
            $('.search-input').attr('disabled', true);
            return;
        }
        $('.search-input').attr('disabled', false);
        $('.search-btn').attr('disabled', false);
        $('.search-input').attr('placeholder', `Input ${search_type} IMDB ID`);
    });

    $('.search-btn').on('click', handleSearch);

    $('.search-input').on('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id') && urlParams.has('type')) {
        $('.search-input').val(urlParams.get('id'));
        $('.search-type').val(urlParams.get('type'));
        $('.search-type').trigger('change');
        handleSearch();
    }
});
