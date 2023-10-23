fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCWOA1ZGywLbqmigxE4Qlvuw&maxResults=30&order=viewCount&q=Official%20Trailer&type=video&key=AIzaSyD4HUP267Bp_XJ5nV4Xi0hbappSF8NMNLU")
.then((result) => {
    return result.json();
}).then((data) => {
    console.log(data);
    let videos = data.items;
    console.log(videos);

    let num = Math.floor(Math.random() * 30);
    let videoPlayer = document.querySelector('#youtubeVideo');
    let videoLink = 'https://www.youtube.com/embed/' + videos[num].id.videoId;
    videoPlayer.setAttribute('src', videoLink);
})