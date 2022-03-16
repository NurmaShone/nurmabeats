const player = document.querySelector('.player'),
startBtn = document.querySelector('.start'),
PrevBtn = document.querySelector('.prev'),
nextBtn = document.querySelector('.next'),
audio = document.querySelector('.audio'),
       progresscontainer = document.querySelector('.progress__container'),
       progress = document.querySelector('.progress'),
       title = document.querySelector('.song'),
       cover = document.querySelector('.cover__img'),
       imgSrc = document.querySelector('.img__src')

//Название песен
const songs = ['Doma', 'With You', 'Girl in Black']

//Песня по умолчанию 
let songIndex = 0
     
//init

function loadsong (song) {
       title.innerHTML = song
       audio.src = `audio/${song}.mp3`
       cover.src = `img/cover${songIndex + 1}.svg`
}
loadsong(songs[songIndex])
//Play
function playsong(){
       player.classList.add('play')
       audio.play()
       imgSrc.src = './img/pause.svg'
}

//Pause
function pauseSong(){
       player.classList.remove('play')
       audio.pause()
       imgSrc.src = './img/start.svg'
}
startBtn.addEventListener('click',() => {
       const isPlaying = player.classList.contains('play')
       if (isPlaying) {
              pauseSong()
       } else {
              playsong()
       }
       
})
//next song
function nextsong() {
       songIndex++
       
       if( songIndex > songs.length -1){
              songIndex = 0
       }
       loadsong(songs[songIndex])
       playsong()
}
nextBtn.addEventListener('click',nextsong)

//progress bar
function updateProgress (e){  
       const {duration,currentTime} = e.srcElement
       const progressPercent = (currentTime / duration )* 100
       progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate',updateProgress)
//Prev song 
function prevSong (){
       songIndex--

       if (songIndex < 0) {
              songIndex = songs.length -1
       }
       loadsong(songs[songIndex])
       playsong()
}
PrevBtn.addEventListener('click',prevSong)

//Progress bar 
function updateProgress(e) {
       const {duration, currentTime} = e.srcElement
       const progressPercent = (currentTime/duration) * 100
       progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

//set progress 
function setProgress (e) {
       const width = this.clientWidth
       const clickX = e.offsetX
       const duration = audio.duration
       audio.currentTime = (clickX / width) * duration
}
progresscontainer.addEventListener('click', setProgress)

//autoplay
audio.addEventListener('ended',nextsong)