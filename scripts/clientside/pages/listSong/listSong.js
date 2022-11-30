var album_id;
var updated = false;
var restricted = true;
var songs = [
    {
        "judul": "Lemonade",
        "singer": "NCT 127",
        "audio_path": "hahaha.mp3",
        "image_path": "https://cdn.idntimes.com/content-images/community/2019/09/65957734-2447619898633179-2873692900906505834-n-f7a238bd572281e532df58d4c505ed19.jpg"
    }
];

window.onload = function() {
    infoNavbarAdded();
    getPremiumSongs();
}

function infoNavbarAdded(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            uname = document.getElementById("uname");
            if(res['status']){
                console.log(res['data']['username']);
                uname.innerHTML = 'pasp';
                username = res['data'].isAdmin;
                restricted = false;
                putNavbar(username);
            }
            else {
                uname.innerHTML = "guest";
                document.getElementById("loginout").innerHTML = "Login";
                // checkRestricted();
                putNavbar(false);
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/auth/info",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function putNavbar(isAdmin) {
    if (isAdmin) {
        document.getElementById("navCtAdmin").style.display = "block";
        document.getElementById("navCt").style.display = "none";
    }
    else {
        document.getElementById("navCtAdmin").style.display = "none";
        document.getElementById("navCt").style.display = "block";
    }
}

function getPremiumSongs(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let songs = JSON.parse(this.responseText);
            appendData(songs);
            playMusic(0);
        }
    };
    xhttp.open("GET", "http://localhost:3000/songs/", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

audio = document.getElementById('addAudio');
playmusicBt1 = document.getElementById("play");
playmusicBt2 = document.getElementById("playmusic");
timelineAudio = document.getElementById("timelineAudio");
timelinePassed = document.getElementById("passedTime");
timelineRemain = document.getElementById("remainingTime");
soundButton = document.getElementById("vol");
soundVolume = document.getElementById("timelineVol");
repeatButton = document.getElementById("repeat");

function appendData(songs) {
    var div7 = document.getElementById("detAlbumList");
    let displayColumns = ['#', 'TITLE', 'SINGER'];
    let columns = ['#', 'title', 'singer'];

    //Create table header
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    for (let i = 0; i < displayColumns.length; i++) {
        let th = document.createElement('th');
        th.innerHTML = displayColumns[i];
        th.style.color = "#B3B3B3";
        th.style.fontFamily = "CircularStd-Light";
        th.style.fontSize = "12px";
        th.style.textAlign = "left";
        th.style.padding = "16px";
        th.style.borderBottom = "0.5px solid #6C6C6C";
        if (i === 0) {
            th.style.width = "5%";
        }
        else if (i === 1) {
            th.style.width = "60%";
        }
        else {
            th.style.width = "35%";
        }
        tr.appendChild(th);
    }
    table.style.borderCollapse = "collapse";
    table.style.width = "70vw";
    table.style.margin = "auto";
    table.appendChild(tr);
    //Create table body
    for (let i = 0; i < songs.length; i++) {
        let tr = document.createElement('tr');
        // Rank
        let td1 = document.createElement('td');
        td1.innerHTML = '<i class="fas fa-play"></i>';
        td1.style.color = "#6C6C6C";
        td1.style.fontFamily = "CircularStd-Medium";
        td1.style.fontSize = "14px";
        td1.style.textAlign= "left";
        td1.style.padding= "16px";
        if (i === 0) {
            td1.style.marginTop = "24px";
        }
        td1.onclick = function() {
            playMusic(i);
        }
        if (td1.onmouseover) {
            td1.style.scale = "1.1";
        }
        tr.appendChild(td1);

        // Title - Singer
        let td2 = document.createElement('td');
        if(songs[i]["penyanyi"]!=null){
            td2.innerHTML = songs[i]["judul"] + ' ― ' + songs[i]["penyanyi"];
        }
        else{
            td2.innerHTML = songs[i]["judul"]
        }
        td2.style.color = "#FFFFFF";
        td2.style.fontFamily = "CircularStd-Medium";
        td2.style.fontSize = "14px";
        td2.style.textAlign= "left";
        td2.style.padding = "16px";
        td2.onclick = function() {
            playMusic(i);
        }
        tr.appendChild(td2);

        // Singer
        let td3 = document.createElement('td');
        td3.innerHTML = formatTime(songs[i]["duration"]);
        td3.style.color = "#6C6C6C";
        td3.style.fontFamily = "CircularStd-Medium";
        td3.style.fontSize = "14px";
        td3.style.textAlign= "left";
        td3.style.padding = "16px";
        tr.appendChild(td3);
        
        tr.onclick = function() {
            // Redirect detail song page
            window.location.href = "../detailSong/detailSong.html?song_id=" + songs[i]["song_id"];
        }
        if (tr.onmouseover) {
            tr.style.scale = "1.1";
        }
        table.appendChild(tr);
    }
    div7.appendChild(table);
}

function playMusic(num) {
    if (audio.paused == false) {
        audio.pause();
        audio.currentTime = 0;
    }
    var div8 = document.getElementById("addAudio");
    var div9 = document.getElementById("sourceAudio");
    div9.src = "https://docs.google.com/uc?export=download&id=" + songs[num]["audio_path"].match(/(\/d\/)([-a-zA-Z0-9]+)(\/)/)[2];
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
    div10.src = albumDetail["data"].image_path;
    div10.style.width = "5vw";
    div10.style.height = "5vw";
    div10.style.objectFit = "cover";

    var div11 = document.getElementById("musicPlayerTitle");
    div11.innerHTML = songs[num]["judul"];
    div11.style.fontFamily = "CircularStd-Bold";
    div11.style.fontSize = "14px";
    div11.style.color = "#FFFFFF";
    div11.style.width = "max-content";

    var div12 = document.getElementById("musicPlayerSinger");
    div12.innerHTML = songs[num]["penyanyi"];
    div12.style.fontFamily = "CircularStd-Light";
    div12.style.fontSize = "11px";
    div12.style.color = "#FFFFFF";
    div12.style.width = "max-content";
}

function toggleAudioPlay () {
    console.log(restricted);
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
    const time = (timeline.value * audio.duration) / 100;
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

function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login"){
      window.location.href = "http://localhost:8080/pages/login/login.html?page_type=detailalbum&album_id="+album_id;
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let res = JSON.parse(this.responseText);
          if (res["status"]) {
            window.location.href = "http://localhost:8080/pages/detailalbum/detailalbum.html?album_id="+album_id;
          }
        }
      };
      xhttp.open("POST", "http://localhost:8000/api/auth/logout", true);
      xhttp.setRequestHeader("Accept", "application/json");
      xhttp.withCredentials = true;
      xhttp.send();
    }
  }

function nextAlbum() {
    window.location.href = "http://localhost:8080/pages/detailalbum/detailalbum.html?album_id="+(parseInt(album_id)+1);
}

function prevAlbum() {
    if (album_id > 1) {
        window.location.href = "http://localhost:8080/pages/detailalbum/detailalbum.html?album_id="+(parseInt(album_id)-1);
    }
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