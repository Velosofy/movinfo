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

async function getTVData(query) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getTVDetails(tv_id) {
    const url = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


$(() => {
    var search_type = 'none';

    {
        $('.search-type').on('change', () => {
            search_type = $('.search-type').val();
            if (search_type === 'none') {
                $('.search-btn').attr('disabled', true);
                $('.search-input').attr('disabled', true);
                return;
            }
            $('.search-input').attr('disabled', false);
            $('.search-btn').attr('disabled', false);

            const input = $('.search-input');
            input.attr('placeholder', `Search ${search_type}...`);
        });
    }

    {
        $('.search-input').on('keydown', async (event) => {
            if (event.key === 'Enter') {
                $('.search-btn').trigger('click');
            }
        });

        $('.search-btn').on('click', async () => {
            console.log(search_type);
            const result_container = $('.search-result');
            result_container.empty();

            const row = $('<div class="row"></div>');
            result_container.append(row);

            const query = $('.search-input').val();

            var data;
            switch (search_type) {
                case 'movie':
                    data = await getMovieData(query);
                    break;
                case 'tv':
                    data = await getTVData(query);
                    break;
                default:
                    return;
            }

            data.results.forEach(result => {
                const col = $('<div class="col-sm-4 col-md-3 col-lg-2 my-2"></div>');
                const card = createCard(result);
                col.append(card);
                row.append(col);
            });
        });
    }
});
