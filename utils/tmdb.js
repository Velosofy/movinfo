import { api_key } from './helper.js';

export async function getMovieDiscover() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export async function getTVDiscover() {
    const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=500&with_original_language=en&api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export async function getMovieData(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export async function getMovieDetails(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export async function getTVData(query) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export async function getTVDetails(tv_id) {
    const url = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
