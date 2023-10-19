import { api_key, createCard } from '../../helper.js';

async function getMovieData(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getMovieDetails(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

$(() => {
    $('.search-input').on('keydown', async (event) => {
        if (event.key === 'Enter') {
            $('.search-btn').trigger('click');
        }
    });

    $('.search-btn').on('click', async () => {
        const result_container = $('.search-result');
        result_container.empty();

        const row = $('<div class="row"></div>');
        result_container.append(row);

        const query = $('.search-input').val();
        const data = await getMovieData(query);
        console.log(data);

        data.results.forEach(movie => {
            const col = $('<div class="col-sm-4 col-md-3 col-lg-2 my-2"></div>');
            const card = createCard(movie);
            col.append(card);
            row.append(col);
        });
    });
});
