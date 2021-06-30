const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

let isPlaying = false;

const  songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: ' Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: ' Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco',
        artist: ' Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Goodnight, Disco',
        artist: ' Jacinto Design',
    }

];


// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}


// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// PLay or Pause Event Listener
playBtn.addEventListener('click', () =>(isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`

}
// Current Song
let songIndex = 0;


// On Load - Select the first song
loadSong(songs[songIndex]);

//next song
function nextSong() {
    songIndex++;
    loadSong(songs[songIndex]);
    playSong()
}

//previous song
function prevSong() {
    songIndex--;
    loadSong(songs[songIndex]);
    playSong()
}

// Event Listeners to change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
