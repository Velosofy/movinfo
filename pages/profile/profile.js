const userData = {
    name: '', 
    birthday: '12/08/2004',
    email: 'cindyaurelia@gmail.com',
    mobileNumber: '08125476389',
};

const userDatabase = [
    {
        userName: 'cindy',
        userPassword: 'password',
    },
];

// Fungsi untuk mengisi elemen-elemen HTML dengan data dinamis
function fillUserData() {
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-birthday').textContent = userData.birthday;
    document.getElementById('user-email').textContent = userData.email;
    document.getElementById('user-mobile-number').textContent = userData.mobileNumber;
}

// Fungsi untuk login
function checkLogin() {
    console.log('checkLogin() called')
    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;

    const user = userDatabase.find(user => user.userName === username && user.userPassword === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        userData.name = username; 
        fillUserData();

        // Redirect to homepage
        setTimeout(function () {
            window.location = '../home/index.html';
        });
    } else {
        showModal();
    }
}

function showModal() {
    $('#staticBackdrop').removeClass('d-none');
    event.preventDefault();
    $('#staticBackdrop').modal('show');
}

function showLoggedModal() {
    $('#staticBackdropLogged').removeClass('d-none');
    $('#staticBackdropLogged').modal('show');
}

function displayNone() {
    $('#staticBackdrop').addClass('d-none');
}

function redirectLogged() {
    $('#staticBackdropLogged').addClass('d-none');
    setTimeout(function () {
        window.location = '../home/index.html';
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully');
}

$(() => {
    console.log('CALLED')
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showLoggedModal();
    }

    // Now let's implement the part for fetching favorite movies
    const maxTitleLength = 40;

    // TODO: fetch favMoviesIds from somewhere (e.g., a database or an API)
    let favMoviesIds = [575264, 155, 4141, 980489, 346698, 129];
    let favMovies = [];

    const fetchPromises = [];
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YThiYzljOTBlNmFlZmM5MzllODZlZDY3MGU1YzFiOCIsInN1YiI6IjYyMzFhY2IwYzNiZmZlMDA0NmNmYjEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.knnJ5iOi-BUn9qRyVbdZEbpO-UqRIIQolNBPYJ3ilug'; 

    for (let i = 0; i < favMoviesIds.length; i++) {
        const currId = favMoviesIds[i];
        const detailsURL = `https://api.themoviedb.org/3/movie/${currId}?language=en-US`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + apiKey
            }
        };

        fetchPromises.push(
            fetch(detailsURL, options)
                .then(res => res.json())
                .then(json => {
                    let movieTitle = json.original_title;
                    if (movieTitle.length > maxTitleLength) {
                        json.original_title = movieTitle.substring(0, maxTitleLength + 1) + '...';
                    }

                    favMovies.push(json);
                })
                .catch(err => console.error('Fetch movie details error: ' + err))
        );
    }

    // Wait for all promises to resolve
    Promise.all(fetchPromises)
        .then(() => {
            // You can use the `favMovies` data as needed, for example, displaying it in your profile page
            let favMovieContainer = document.getElementById('favorite-movie-container');
            favMovies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                favMovieContainer.appendChild(movieCard);
            });
        })
        .catch(err => {
            console.error('Promise.all error: ' + err);
        });
});

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
 
    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-banner');
    moviePoster.src = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
    
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const movieTitle = document.createElement('div');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.original_title;

    const movieDetailsBottom = document.createElement('div');
    movieDetailsBottom.classList.add('movie-details-bottom');

    const movieRatingContainer = document.createElement('div');
    movieRatingContainer.classList.add('movie-rating-container');

    const ratingIcon = document.createElement('img');  
    ratingIcon.classList.add('rating-icon');
    ratingIcon.src = '../images/star.png';
    
    const movieRating = document.createElement('span');
    movieRating.classList.add('movie-rating');
    movieRating.textContent = movie.vote_average.toFixed(1);

    const favoriteIcon = document.createElement('img');  
    favoriteIcon.classList.add('favorite-icon');
    favoriteIcon.src = '../images/heart-solid.png';

    movieRatingContainer.appendChild(ratingIcon);
    movieRatingContainer.appendChild(movieRating);

    movieDetailsBottom.appendChild(movieRatingContainer);
    movieDetailsBottom.appendChild(favoriteIcon);

    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(movieDetailsBottom);

    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieDetails);
    
    // Menambahkan properti "favorite" ke objek film
    movie.favorite = true;

    // Menambahkan event listener untuk mengubah status favorit saat ikon hati diklik
    favoriteIcon.addEventListener('click', () => {
        if (movie.favorite) {
            favoriteIcon.src = '../images/heart-outline.png'; // Mengganti gambar hati menjadi "heart-outline.png"
            setTimeout(() => {
                // Menghilangkan tampilan film dari daftar favorit setelah jeda
                movieCard.style.display = 'none';
            }, 500); // Ubah angka ini untuk mengatur durasi jeda dalam milidetik
            movie.favorite = false;
        } else {
            movie.favorite = true;
            favoriteIcon.src = '../images/heart-solid.png'; // Mengganti gambar hati menjadi "heart-solid.png"
        }
     });

    return movieCard;
}
