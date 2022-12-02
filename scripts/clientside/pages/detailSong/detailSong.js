const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var song_id = urlParams.get('song_id');
var album_id;
var song = null;
var updated = false;
var restricted = true;

function getSong(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            songs = JSON.parse(this.responseText);
            if(songs["status"]){
                song = songs["data"];
                album_id = song.album_id;
                song.audio_path = song.audio_path.match(/(\/d\/)([-a-zA-Z0-9]+)(\/)/)[2];
                
                // console.log(songs["data"]["audio_path"]);
                appendData([songs["data"]]);
                playMusic();
            }else{
                appendData(songNotFound);
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/songapi/getsong?song_id="+song_id,true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function infoNavbarAdded(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                restricted = false;
                if(res['data'].isAdmin){
                    document.getElementById("uname").innerHTML = res['data'].username;
                }else{
                    document.getElementById("unameuwu").innerHTML = res['data'].username;
                }
                putNavbar(res['data'].isAdmin);
            }
            else {
                uname.innerHTML = "Guest";
                document.getElementById("loginout").innerHTML = "Login";
                putNavbar(false);
                checkRestricted();
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/auth/info",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function rerouteToDetailAlbum(){
    window.location.href = "http://localhost:8080/pages/detailAlbum/detailAlbum.html?album_id="+album_id;

}


songNotFound=[
    {
        "judul": "No Song Found",
        "penyanyi": "Unknown",
        "tanggal_terbit": "2000-01-01",
        "genre": "Unkonwn",
        "duration": "0",
        "audio_path": "https://docs.google.com/uc?export=download&id=1rjLV5Ogyz4AF6OGlmj46jDc6KYFpal-c",
        "image_path": "https://www.alfaromeo.it/content/dam/moc/common/404-error/mobile/mobile_404.png",
        "album_id": "0",
    },
];

audio = document.getElementById('addAudio');
playmusicBt1 = document.getElementById("play");
playmusicBt2 = document.getElementById("playmusic");
timelineAudio = document.getElementById("timelineAudio");
timelinePassed = document.getElementById("passedTime");
timelineRemain = document.getElementById("remainingTime");
soundButton = document.getElementById("vol");
soundVolume = document.getElementById("timelineVol");
repeatButton = document.getElementById("repeat");

function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login"){
      window.location.href = "http://localhost:8080/pages/login/login.html?page_type=detailsong&song_id="+urlParams.get('song_id');
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let res = JSON.parse(this.responseText);
          if (res["status"]) {
            window.location.href = "http://localhost:8080/pages/detailsong/detailsong.html?song_id="+song_id;
          }
        }
      };
      xhttp.open("POST", "http://localhost:8000/api/auth/logout", true);
      xhttp.setRequestHeader("Accept", "application/json");
      xhttp.withCredentials = true;
      xhttp.send();
    }
}

function appendData(songDetail) {
    var div1 = document.getElementById("albumPoster");
    div1.src = songDetail[0].image_path;
    div1.style.width = "15vw";
    div1.style.height = "15vw";
    div1.style.objectFit = "cover";

    var div2 = document.getElementById("albumTitle");
    div2.innerHTML += songDetail[0].judul;
    div2.style.width = "50vw";

    var div3 = document.getElementById("albumSinger");
    div3.innerHTML += songDetail[0].penyanyi;
    div3.style.fontFamily = "CircularStd-Bold";
    div3.style.color = "#FFFFFF";
    div3.style.width = "max-content";

    var div4 = document.getElementById("albumYear");
    div4.innerHTML += songDetail[0].tanggal_terbit;
    div4.style.fontFamily = "CircularStd-Medium";
    div4.style.color = "#FFFFFF";
    div4.style.width = "max-content";

    var div6 = document.getElementById("albumDuration");
    div6.innerHTML += formatTime(songDetail[0].duration);
    div6.style.fontFamily = "CircularStd-Light";
    div6.style.color = "#6C6C6C";
    div6.style.width = "max-content";

    var div7 = document.getElementById("songLyrics");
    for (let i = 0; i < songDetail[0].lyric.length; i++) {
        div7.innerHTML += songDetail[0].lyric[i] + "<br>";
    }
    div7.style.fontFamily = "CircularStd-Book";
    div7.style.fontSize = "16px";
    div7.style.color = "#B3B3B3";
    div7.style.marginBottom = "0.5vh";
}

function playMusic() {
    if (audio.paused == false) {
        audio.pause();
        audio.currentTime = 0;
    }
    
    var div8 = document.getElementById("addAudio");
    var div9 = document.getElementById("sourceAudio");
    div9.src = "https://docs.google.com/uc?export=download&id=" + song["audio_path"];
    // https://drive.google.com/file/d/1rjLV5Ogyz4AF6OGlmj46jDc6KYFpal-c/view?usp=sharing
    // yang dimasukkan bagian ID nya aja (setelah d/ dan sebelum /view)
    // div9.src = songDetail[num]["audio_path"];
    div8.load();

    timelinePassed.innerHTML = "0:00";
    timelinePassed.style.color = "white";
    timelinePassed.style.fontFamily = "CircularStd-Light";
    timelineRemain.innerHTML = "0:00";
    timelineRemain.style.color = "white";
    timelinePassed.style.fontFamily = "CircularStd-Light";

    audio.volume = 0.2;
    soundVolume.background = 'linear-gradient(to right, #1ED760 0%, #1ED760 ' + 20 + '%, #6C6C6C ' + 20 + '%, #6C6C6C 100%)';
    soundVolume.value = 20;

    var div10 = document.getElementById("musicPlayerPoster");
    for (let i=0; i < div10.length; i++) {
        div10[i].src = song.image_path;
        div10[i].style.width = "5vw";
        div10[i].style.height= "5vw";
        div10[i].style.objectFit = "cover";
        div10[i].href = "http://localhost:8080/pages/detailSong/detailSong.html?song_id="+song_id;
    }

    var div11 = document.getElementById("musicPlayerTitle");
    div11.innerHTML += song["judul"];
    div11.style.fontFamily = "CircularStd-Bold";
    div11.style.fontSize = "14px";
    div11.style.color = "#FFFFFF";
    div11.style.width = "max-content";

    var div12 = document.getElementsByClassName("musicPlayerSinger");
    for (let i=0; i < div12.length; i++) {
        div12[i].innerHTML = song["penyanyi"];
        div12[i].style.color = "#FFFFFF";
        div12[i].style.width = "max-content";
    }
    var div13 = document.getElementById("musicAlbum");
    div13.innerHTML = song["album"]["judul"];
    div13.style.color = "#FFFFFF";
    div13.style.width = "max-content";
}

function toggleAudioPlay () {
    // console.log(restricted);
    if (restricted){
        alert("Daily Free Trial Limit Reached, Login to Continue Listening");
        return;
    }
    if (!updated){
        updatePlayRestrict();
    }
    if (audio.paused || audio.played == undefined) {
        audio.play();
        playmusicBt1.className = "fas fa-pause play";
        playmusicBt2.className = "fas fa-pause playmusic";
    }
    else {
        audio.pause();
        playmusicBt1.className = "fas fa-play play";
        playmusicBt2.className = "fas fa-play playmusic";
    }
}

function changeTimelineAudioPosition () {
    const percentage = (100*audio.currentTime) / audio.duration;
    timelineAudio.style.background = 'linear-gradient(to right, #1ED760 0%, #1ED760 ' + percentage + '%, #6C6C6C ' + percentage + '%, #6C6C6C 100%)';
    timelineAudio.value = percentage;
    timelinePassed.innerHTML = Math.floor(Math.floor(audio.currentTime)/60) + ":" + (Math.floor(audio.currentTime)%60);
    timelinePassed.style.color = "white";
    timelinePassed.style.fontFamily = "CircularStd-Light";
    timelineRemain.innerHTML = Math.floor(Math.floor(audio.duration-audio.currentTime)/60) + ":" + (Math.floor(audio.duration-audio.currentTime)%60);
    timelinePassed.style.color = "white";
    timelinePassed.style.fontFamily = "CircularStd-Light";
}

function audioEnded () {
    audio.currentTime = 0;
    playmusicBt1.className = "fas fa-play play";
    playmusicBt2.className = "fas fa-play playmusic";
}

function changeSeekTimeline () {
    const time = (timelineAudio.value * audio.duration) / 100;
    audio.currentTime = time;
}

function toggleSound () {
    audio.muted = !audio.muted;
    soundButton.className = audio.muted ? "fas fa-volume-mute volume" : "fas fa-volume-up volume";
}

function rangeSoundVol () {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #1ED760 0%, #1ED760 ' + value + '%, #6C6C6C ' + value + '%, #6C6C6C 100%)';
    audio.volume = value/100;
    if (value == 0) {
        soundButton.className = "fas fa-volume-mute volume";
    }
    else {
        soundButton.className = "fas fa-volume-up volume";
    };
}

function toggleRepeat () {
    audio.loop = !audio.loop;
    repeatButton.className = audio.loop ? "fas fa-ban repeat" : "fas fa-redo-alt repeat";
}

audio.ontimeupdate = function() {changeTimelineAudioPosition()};
audio.onended = audioEnded;
playmusicBt1.addEventListener('click', toggleAudioPlay);
playmusicBt2.addEventListener('click', toggleAudioPlay);
timelineAudio.addEventListener('change', changeSeekTimeline);
soundButton.addEventListener('click', toggleSound);
soundVolume.addEventListener('change', rangeSoundVol);
repeatButton.addEventListener('click', toggleRepeat);

window.onload = function() {
    infoNavbarAdded();
    getSong();
}

function prevSongDetail(){
    if (parseInt(song_id) > 1){
        window.location.href = "http://localhost:8080/pages/detailsong/detailsong.html?song_id="+(parseInt(song_id)-1);
    }
}

function nextSongDetail(){
    window.location.href = "http://localhost:8080/pages/detailsong/detailsong.html?song_id="+(parseInt(song_id)+1);
}

function checkRestricted(){
    // current is guest
    
    let lastPlayed = localStorage.getItem("lastPlayed");
    let today = new Date();
    let daily = localStorage.getItem("dailyPlay");
    today.setHours(0,0,0,0);
    // resets if new day
    if (lastPlayed == null || new Date(lastPlayed) < today){
        localStorage.setItem("lastPlayed", today);
        localStorage.setItem("dailyPlay", 0);
        daily = 0;
    }
    if (daily == null || daily < 3){
        restricted = false;
    }
}

function updatePlayRestrict(){
    updated = true;
    // current is guest
    if (document.getElementById("loginout").innerHTML == "Login"){
        let daily = localStorage.getItem("dailyPlay");
        let lastPlayed = localStorage.getItem("lastPlayed");
        let today = new Date(); 
        daily = parseInt(daily);
        today.setHours(0,0,0,0);
        if (lastPlayed == null) {
            localStorage.setItem("lastPlayed", today);
        }
        else if (lastPlayed != today) {
            localStorage.setItem("lastPlayed", today);
            localStorage.setItem("dailyPlay", 0);
            daily = 0;
        }
        if(isNaN(daily)) {
            localStorage.setItem("dailyPlay", 1);
        } else if (daily < 3) {
            localStorage.setItem("dailyPlay", daily + 1);
        } else {
            alert("You have reached your daily play limit");
            return;
        }
    }
}