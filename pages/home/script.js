import { ImageSize, createCardWithCarousel } from '../../utils/helper.js';
import { getMovieDiscover, getTVDiscover } from '../../utils/tmdb.js';

const movieCarouselContainer = $("#movie-carousel .carousel-inner");
var movieSlideWidth = movieCarouselContainer.find(".carousel-item").first().outerWidth(true);
var movieScrollPosition = 0;
const tvCarouselContainer = $("#tv-carousel .carousel-inner");
var tvSlideWidth = tvCarouselContainer.find(".carousel-item").first().outerWidth(true);
var tvScrollPosition = 0;

await getMovieDiscover().then(data => {
    data.results.slice(0, 10).forEach((movie, index) => {
        $('.movie-collection').append(createCardWithCarousel(movie, index, ImageSize.SMALL));
    })
});

await getTVDiscover().then(data => {
    data.results.slice(0, 10).forEach((tv, index) => {
        $('.tv-collection').append(createCardWithCarousel(tv, index, ImageSize.SMALL));
    });
});

$(() => {
    if ($(window).width() >= 768) {
        $("#movie-carousel, #tv-carousel").removeClass("slide");
    }

    $("#movie-carousel .carousel-control-prev").on("click", function () {
        movieScrollPosition -= movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);
        if (movieScrollPosition <= 0) {
            $(this).hide();
        }
        $("#movie-carousel .carousel-control-next").show();
    });
    $("#movie-carousel .carousel-control-next").on("click", function () {
        movieScrollPosition += movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);
        if (movieScrollPosition >= movieCarouselContainer[0].scrollWidth - movieCarouselContainer.width()) {
            $(this).hide();
        }
        $("#movie-carousel .carousel-control-prev").show();
    });

    $("#tv-carousel .carousel-control-prev").on("click", function () {
        tvScrollPosition -= tvSlideWidth;
        tvCarouselContainer.stop().animate({ scrollLeft: tvScrollPosition }, 1000);
        if (tvScrollPosition <= 0) {
            $(this).hide();
        }
        $("#tv-carousel .carousel-control-next").show();
    });

    $("#tv-carousel .carousel-control-next").on("click", function () {
        tvScrollPosition += tvSlideWidth;
        tvCarouselContainer.stop().animate({ scrollLeft: tvScrollPosition }, 1000);
        if (tvScrollPosition >= tvCarouselContainer[0].scrollWidth - tvCarouselContainer.width()) {
            $(this).hide();
        }
        $("#tv-carousel .carousel-control-prev").show();
    });
});

$(window).on('resize', function () {
    if ($(window).width() >= 768) {
        $("#movie-carousel, #tv-carousel").removeClass("slide");

        movieSlideWidth = movieCarouselContainer.find(".carousel-item").first().outerWidth(true);
        movieScrollPosition = Math.round(movieCarouselContainer.scrollLeft() / movieSlideWidth) * movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);

        tvSlideWidth = tvCarouselContainer.find(".carousel-item").first().outerWidth(true);
        tvScrollPosition = Math.round(tvCarouselContainer.scrollLeft() / tvSlideWidth) * tvSlideWidth;
        tvCarouselContainer.stop().animate({ scrollLeft: tvScrollPosition }, 1000);
    } else {
        $("#movie-carousel, #tv-carousel").addClass("slide");
    }
});
