import { ImageSize, createCard } from '../../utils/helper.js';
import { getMovieData, getTVData } from '../../utils/tmdb.js';

$(() => {
    const searchData = async (query, search_type) => {
        if (search_type === 'movie') {
            return await getMovieData(query);
        } else if (search_type === 'tv') {
            return await getTVData(query);
        }
    };

    var search_type = 'none';
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

    $('.search-input').on('keydown', (event) => {
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

        const data = await searchData(query, search_type);

        if (data.total_results === 0) {
            row.append('<h1 class="text-center">No result found</h1>');
            return;
        }

        data.results.forEach(result => {
            const col = $('<div class="col-sm-4 col-md-3 col-lg-2 my-2"></div>');
            const card = createCard(result, ImageSize.SMALL);
            col.append(card);
            row.append(col);
        });
    });
});
