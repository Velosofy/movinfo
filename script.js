const api_key = '6a8bc9c90e6aefc939e86ed670e5c1b8';

var movieCarouselContainer;
var movieSlideWidth;
let movieScrollPosition = 0;

var tvCarouselContainer;
var tvSlideWidth;
let tvScrollPosition = 0;

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        const moviesDiv = $('.movie-collection');
        data.results.slice(0, 10).forEach((movie, index) => {
            const movieCarousel = $('<div>').attr({
                class: 'carousel-item' + (index === 0 ? ' active' : '')
            });
            const movieDiv = $('<div>').attr({
                class: 'card'
            });
            const poster = $('<img>').attr({
                class: 'movie-image img-fluid',
                src: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                alt: movie.title
            });

            movieDiv.append(poster);
            movieCarousel.append(movieDiv);
            moviesDiv.append(movieCarousel);
        });
    })
    .then(() => {
        movieCarouselContainer = $("#movie-carousel .carousel-inner");
        movieSlideWidth = movieCarouselContainer.find(".carousel-item").first().outerWidth(true);
    })
    .catch(err => console.error(err));

fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`)
    .then(response => response.json())
    .then(data => {
        const tvsDiv = $('.tv-collection');
        data.results.slice(0, 10).forEach((tv, index) => {
            const tvCarousel = $('<div>').attr({
                class: 'carousel-item' + (index === 0 ? ' active' : '')
            });
            const tvDiv = $('<div>').attr({
                class: 'card'
            });
            const poster = $('<img>').attr({
                class: 'tv-image img-fluid',
                src: `https://image.tmdb.org/t/p/original${tv.poster_path}`,
                alt: tv.title
            });

            tvDiv.append(poster);
            tvCarousel.append(tvDiv);
            tvsDiv.append(tvCarousel);
        });
    })
    .then(() => {
        tvCarouselContainer = $("#tv-carousel .carousel-inner");
        tvSlideWidth = tvCarouselContainer.find(".carousel-item").first().outerWidth(true);
    })
    .catch(err => console.error(err));


$(document).ready(function () {
    $("#movie-carousel .carousel-control-next").on("click", function () {
        movieScrollPosition += movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);
        if (movieScrollPosition >= movieCarouselContainer[0].scrollWidth - movieCarouselContainer.width()) {
            $(this).hide();
        }
        $("#movie-carousel .carousel-control-prev").show();
    });

    $("#movie-carousel .carousel-control-prev").on("click", function () {
        movieScrollPosition -= movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);
        if (movieScrollPosition <= 0) {
            $(this).hide();
        }
        $("#movie-carousel .carousel-control-next").show();
    });
});
