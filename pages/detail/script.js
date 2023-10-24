import { getMovieDetails, getTVDetails, getMovieReviews, getTVReviews } from '../../utils/tmdb.js';
import { createDetailCardMovie, createDetailCardTV } from '../../utils/helper.js';

$(() => {
    const srcHeartOutline = "../../pages/images/heart-outline.png";
    const srcHeartSolid = "../../pages/images/heart-solid.png"

    function handleFavorite(data, typeData) {
        console.log(data);
        const newData = {
            type: typeData,
            id: data.id,
            user: localStorage.getItem("currentUser"),
            title: typeData == "Movie" ? data.title : data.name,
            vote_average: data.vote_average.toPrecision(2),
            poster_path: data.poster_path,
        }

        const heartImage = document.getElementById("heartImage");

        var db = [];
        try {
            db = localStorage.getItem("dbFavorite");
            if (db == null) {
                localStorage.setItem("dbFavorite", JSON.stringify([newData]));
            } else {
                db = JSON.parse(db);

                const finder = db.some((file) => {
                    return file.user === newData.user && file.id === newData.id
                })
                const found = finder === true;

                if (found) {
                    const newArray = db.filter((file) => {
                        return file.user !== newData.user && file.id !== newData.id
                    })
                    localStorage.setItem("dbFavorite", JSON.stringify(newArray));
                    heartImage.src = srcHeartOutline;
                } else {
                    db.push(newData);
                    localStorage.setItem("dbFavorite", JSON.stringify(db));
                    heartImage.src = srcHeartSolid;
                }
            }
        } catch (e) {
            db = []
            console.log(e)
        }
    }

    const getHeartFilled = (data) => {
        let db = [];
        try {
            db = localStorage.getItem("dbFavorite");
            if (db == null) {
                return false;
            } else {
                db = JSON.parse(db);
                const finder = db.some((file) => {
                    return file.user === localStorage.getItem("currentUser") && file.id === data.id
                })
                const found = finder === true;
                console.log(found)

                if (found) {
                    return true;
                } else {
                    return false;
                }

            }
        } catch (e) {
            console.log(e)
            return false;
        }
    }

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

            var heartFilled = getHeartFilled(data);
            
            $('.detail-container').html(createDetailCardMovie(data, reviews, heartFilled));
            $('.heart-container').on('click', () => handleFavorite(data, "Movie"));

        } else if (type === 'TV') {
            data = await getTVDetails(id);
            if (!data) {
                $('.detail-container').html(`<h1>No result found</h1>`);
                return;
            }
            var heartFilled = getHeartFilled(data);
            const reviews = await getTVReviews(id);
            $('.detail-container').html(createDetailCardTV(data, reviews, heartFilled));

            $('.heart-container').on('click', () => handleFavorite(data, "TV"));
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
        $('.search-input').attr('placeholder', `Input ${search_type} TMDB ID`);
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
