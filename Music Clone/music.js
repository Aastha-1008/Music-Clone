console.log("hi aastha");

let songIndex = 0;
let audioElement = new Audio('/Song/Perfect.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif =document.getElementById('gif');
let masterSongName =document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Perfect", filePath: "Song/1.mp3", coverPath: "./musicimage/1.jpg"},
    {songName: "All of Me", filePath: "Song/2.mp3", coverPath: "./musicimage/2.jpg"},
    {songName: "Closer", filePath: "Song/3.mp3", coverPath: "./musicimage/3.png"},
    {songName: "If the World Was Ending ", filePath: "Song/4.mp3", coverPath: "./musicimage/4.jpg"},
    {songName: "Say You Won't Let Go", filePath: "Song/5.mp3", coverPath: "./musicimage/5.jpg"},
    {songName: "Somebody's Me", filePath: "Song/6.mp3", coverPath: "./musicimage/6.jfif"},
    {songName: "Wake Me Up When September Ends", filePath: "Song/7.mp3", coverPath: "./musicimage/7.jfif"},

]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1 ; 
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }

})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex-1].songName;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Song/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `Song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1 ; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex = 7
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `Song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1 ; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
