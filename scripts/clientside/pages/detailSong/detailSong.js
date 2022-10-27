songDetail = [
    {
        "title": "Nxde",
        "singer": "(G)-IDLE",
        "duration": "2:58",
        "audio_path": "http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4",
        "image_path": "../../assets/sample-song-image.jpg",
        "release_date": "2022-10-17",
        "lyrics": ["Why you think that 'bout nude? 'Cause your view's so rude","Think outside the box, then you'll like it","Hello, my name is 예삐, 예삐요 (hello)","말투는 멍청한 듯 몸매는 sexy, sexy요"," \
                    그럼, 다이아 박힌 티아라 하나에","내가 퍽이나 웃게 (S.Y.), 퍽이나 웃게 (ooh)","뒤틀려버린 로렐라이, don't need no man (yah)","철학에 미친 독서광 (huh), self-made woman","싸가지없는 이 story에 무지 황당한"," \
                    야유하는 관객들, you tricked me, you're a liar","아, 발가벗겨져 버린 movie star (movie star)","아, 별빛이 깨져버린 밤","꼴이 볼품없대도, 망가진다 해도 (uh)","다신 사랑받지 못한대도","쉿, yes, I'm a nude"," \
                    Nude (따따랏따라)","Yes, I'm a nude","Nude (I don't give a love)","Baby, how do I look? (야)","How do I look? (야)","아리따운 날 입고, 따따랏따라", "Baby, how do I look? (야)", "How do I look? (야)"],
        "album": "I Love",
    },
]

audio = document.getElementById('addAudio');
playmusicBt1 = document.getElementById("play");
playmusicBt2 = document.getElementById("playmusic");
timelineAudio = document.getElementById("timelineAudio");
timelinePassed = document.getElementById("passedTime");
timelineRemain = document.getElementById("remainingTime");
soundButton = document.getElementById("vol");
soundVolume = document.getElementById("timelineVol");
repeatButton = document.getElementById("repeat");

var song_id = 1;
function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login"){
      window.location.href = "http://localhost:8080/pages/login/login.html?page_type=detailsong&song_id="+song_id;
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

function appendData() {
    var div1 = document.getElementById("albumPoster");
    div1.src = songDetail[0].image_path;
    div1.style.width = "15vw";

    var div2 = document.getElementById("albumTitle");
    div2.innerHTML += songDetail[0].title;
    div2.style.width = "50vw";

    var div3 = document.getElementById("albumSinger");
    div3.innerHTML += songDetail[0].singer;
    div3.style.fontFamily = "CircularStd-Bold";
    div3.style.color = "#FFFFFF";
    div3.style.width = "max-content";

    var div4 = document.getElementById("albumYear");
    div4.innerHTML += songDetail[0].release_date;
    div4.style.fontFamily = "CircularStd-Medium";
    div4.style.color = "#FFFFFF";
    div4.style.width = "max-content";

    var div6 = document.getElementById("albumDuration");
    div6.innerHTML += songDetail[0].duration;
    div6.style.fontFamily = "CircularStd-Light";
    div6.style.color = "#6C6C6C";
    div6.style.width = "max-content";
    
    var div7 = document.getElementById("songLyrics");
    for (let i = 0; i < songDetail[0].lyrics.length; i++) {
        div7.innerHTML += songDetail[0].lyrics[i] + "<br>";
    }
    div7.style.fontFamily = "CircularStd-Book";
    div7.style.fontSize = "16px";
    div7.style.color = "#B3B3B3";
    div7.style.marginBottom = "0.5vh";
}

function playMusic(num) {
    if (audio.paused == false) {
        audio.pause();
        audio.currentTime = 0;
    }
    
    var div8 = document.getElementById("addAudio");
    var div9 = document.getElementById("sourceAudio");
    div9.src = songDetail[num]["audio_path"];
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

    var div10 = document.getElementsByClassName("musicPlayerPoster");
    for (let i=0; i < div10.length; i++) {
        div10[i].src = songDetail[num].image_path;
        div10[i].style.width = "5vw";
    }

    var div11 = document.getElementById("musicPlayerTitle");
    div11.innerHTML += songDetail[num]["title"];
    div11.style.fontFamily = "CircularStd-Bold";
    div11.style.fontSize = "14px";
    div11.style.color = "#FFFFFF";
    div11.style.width = "max-content";

    var div12 = document.getElementsByClassName("musicPlayerSinger");
    for (let i=0; i < div12.length; i++) {
        div12[i].innerHTML += songDetail[num]["singer"];
        div12[i].style.color = "#FFFFFF";
        div12[i].style.width = "max-content";
    }
    
    var div13 = document.getElementById("musicAlbum");
    div13.innerHTML += songDetail[num]["album"];
    div13.style.color = "#FFFFFF";
    div13.style.width = "max-content";
}

function toggleAudioPlay () {
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
    infoNavbar();
    appendData();
    playMusic(0);
}