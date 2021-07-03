const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

//previous song
function prevSong() {
    if (songIndex <  0 ){
        songIndex = songs.length - 1;
    }
    songIndex--;
    loadSong(songs[songIndex]);
    playSong()
}

// Event Listeners to change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Update Progress Bar and time
function updateProgressBar(e) {
    if (isPlaying){

        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime );

        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60);


        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        currentTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;


        // Delay switching duration Element to avoid NaN
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

music.addEventListener('timeupdate',updateProgressBar)