var songs;
var albums;
var current_song_id;

window.onload = function() {
    infoNavbar();
    getSongs();
    getAlbums();
    collapse();
}

function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login") {
      window.location.href = "http://localhost:8080/pages/login/login.html?page_type=addData";
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let res = JSON.parse(this.responseText);
          if (res["status"]) {
            window.location.href = "http://localhost:8080/pages/addData/addData.html";
          }
        }
      };
      xhttp.open("POST", "http://localhost:8000/api/auth/logout", true);
      xhttp.setRequestHeader("Accept", "application/json");
      xhttp.withCredentials = true;
      xhttp.send();
    }
}

function addOptions(albumIDs, songInAlbum) {
    var divDocument = document.getElementsByClassName("albumid");
    for (let j = 0; j < divDocument.length; j++) {
        for (let i = 0; i < albumIDs.length; i++) {
            select = document.createElement("option");
            select.value = albumIDs[i].album_id;
            select.innerHTML = albumIDs[i].album_id + '. ' + albumIDs[i].judul;
            select.style.fontFamily = "CircularStd-Light";
            divDocument[j].appendChild(select);
        }
    }
    var div = document.getElementsByClassName("songid");
    for (let j = 0; j < div.length; j++) {
        for (let i = 0; i < songInAlbum.length; i++) {
            select = document.createElement("option");
            select.value = songInAlbum[i].song_id;
            select.innerHTML = songInAlbum[i].song_id + '. ' + songInAlbum[i].judul;
            select.style.fontFamily = "CircularStd-Light";
            div[j].appendChild(select);
        }
    }
}

function collapse() {
    var coll = document.getElementsByClassName("collapsibleTextWrapper");

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}

function getSongs(albums){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            songs = JSON.parse(this.responseText)['data'];
            addOptions(albums,songs);
        }
    };
    xhttp.open("GET","http://localhost:8000/api/songapi/showallsongs",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function getAlbums(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            albums = JSON.parse(this.responseText)['data'];
            getSongs(albums);
        }
    };
    xhttp.open("GET","http://localhost:8000/api/albumapi/showallalbum",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function loadImage(from, showWhere){
    document.getElementById("displayImage"+showWhere).src=document.getElementById("imageupload"+from).value;
    document.getElementById("displayImage"+showWhere).style.objectFit = "cover";
    document.getElementById("displayImage"+showWhere).style.width = "11.5vw";
    document.getElementById("displayImage"+showWhere).style.height = "11.5vw";
}

function clearInputsCollapse() {
    // window.location.reload();
    // var inputs = document.getElementsByTagName("input");
    // for (let index = 0; index < inputs.length; index++) {
    //     inputs[index].value = "";
    // }
    // let coll = document.getElementsByClassName("collapsibleTextWrapper");
    // for (let i = 0; i < coll.length; i++) {
    //     let content = coll[i].nextElementSibling;
    //     if (content.style.display === "block") {
    //         content.style.display = "none";
    //     }
    // }
}

function autoDataEditAlbum(){
    console.log('masuk auto data edit album');
    album_id = document.getElementById("albumidea").value;
    for (let index = 0; index < albums.length; index++) {
        if(albums[index].album_id == album_id){
            choosen_album = albums[index];
            break; 
        }
    }
    document.getElementById("albumnameea").value = choosen_album.judul;
    document.getElementById("singerea").value = choosen_album.penyanyi;
    document.getElementById("totaldurationea").value = choosen_album.total_duration;
    document.getElementById("genreea").value = choosen_album.genre;
    document.getElementById("tanggalterbitea").value = choosen_album.tanggal_terbit;
    document.getElementById("imageuploadea").value = choosen_album.image_path;
    document.getElementById("displayImage0").src = choosen_album.image_path;
    let imgs = document.getElementsByClassName("clippedImage");
    for (let index = 0; index < imgs.length; index++) {
        imgs[index].style.objectFit = "cover";
        imgs[index].style.width = "11.5vw";
        imgs[index].style.height = "11.5vw";
    }
}

function editAlbum() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                alert("Album sucessfully edited");
            }
            else{
                alert("edit failed");
            }
            //TODO: Refresh songs and albums after edit
        }
    };
    let genre = null;
    if(document.getElementById("genreea").value != ""){
        document.getElementById("genreea").value
    }
    if(document.getElementById("albumidea").value==""
    || document.getElementById("albumnameea").value==""
    || document.getElementById("singerea").value==""
    || document.getElementById("totaldurationea").value==""
    || document.getElementById("tanggalterbitea").value==""
    || document.getElementById("imageuploadea").value==""){
        alert("Please fill all the fields");
    }else{
    let data = {
            "album_id": document.getElementById("albumidea").value,
            "judul": document.getElementById("albumnameea").value,
            "penyanyi":document.getElementById("singerea").value,
            "total_duration":document.getElementById("totaldurationea").value,
            "image_path":document.getElementById("imageuploadea").value,
            "tanggal_terbit":document.getElementById("tanggalterbitea").value,
            "genre":genre,
        };
        console.log(data);
        xhttp.open("POST","http://localhost:8000/api/albumapi/editalbum",true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send(JSON.stringify(data));
    } 
    clearInputsCollapse();
}

function addAlbum() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                alert("album successfully added");
            }
            else{
                alert("failed to add album");
            }
            //TODO : Refresh songs and albums after add
        }
    };
    let genre = null;
    if(document.getElementById("genreea").value != ""){
        document.getElementById("genreea").value
    }
    if(document.getElementById("albumidaa").value=="" 
    || document.getElementById("albumnameaa").value=="" 
    || document.getElementById("singeraa").value=="" 
    || document.getElementById("totaldurationaa").value=="" 
    || document.getElementById("imageuploadaa").value=="" 
    || document.getElementById("tanggalterbitaa").value==""){
        alert("Please fill all the fields");   
    }else{
        let data = {
            "album_id": document.getElementById("albumidaa").value,
            "judul": document.getElementById("albumnameaa").value,
            "penyanyi":document.getElementById("singeraa").value,
            "total_duration":document.getElementById("totaldurationaa").value,
            "image_path":document.getElementById("imageuploadaa").value,
            "tanggal_terbit":document.getElementById("tanggalterbitaa").value,
            "genre":genre,
        };
        console.log(data);
        xhttp.open("POST","http://localhost:8000/api/albumapi/addalbum",true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send(JSON.stringify(data)); 
    }
    clearInputsCollapse();
}

function autoDataDeleteAlbum(){
    console.log('masuk auto data delete album');
    album_id = document.getElementById("albumidda").value;
    for (let index = 0; index < albums.length; index++) {
        if(albums[index].album_id == album_id){
            choosen_album = albums[index];
            break; 
        }
    }
    document.getElementById("albumnameda").value = choosen_album.judul;
    document.getElementById("singerda").value = choosen_album.penyanyi;
    document.getElementById("totaldurationda").value = choosen_album.total_duration;
    document.getElementById("genreda").value = choosen_album.genre;
    document.getElementById("tanggalterbitda").value = choosen_album.tanggal_terbit;
    document.getElementById("imageuploadda").value = choosen_album.image_path;
    loadImage('da','2');
}

function deleteAlbum() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                alert("album successfully deleted");
            }
            else{
                alert("failed to delete album");
            }
            //TODO : Refresh songs and albums after add
        }
    };
    let data = {
        "album_id": document.getElementById("albumidda").value,
    };
    if(data.album_id==3){
        console.log('album_id 3');
    }
    xhttp.open("POST","http://localhost:8000/api/albumapi/deletealbum",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data)); 
    clearInputsCollapse();
}

function autoDataEditSong(){
    console.log('masuk auto data edit album');
    song_id = document.getElementById("songides").value;
    console.log(song_id);
    current_song_id = song_id;
    for (let index = 0; index < songs.length; index++) {
        if(songs[index].song_id == song_id){
            choosen_song = songs[index];
            break; 
        }
    }
    document.getElementById("songnamees").value = choosen_song.judul;
    document.getElementById("singeres").value = choosen_song.penyanyi;
    document.getElementById("tanggalterbites").value = choosen_song.tanggal_terbit;
    document.getElementById("genrees").value = choosen_song.genre;
    document.getElementById("durationes").value = choosen_song.duration;
    document.getElementById("audiouploades").value = choosen_song.audio_path;
    document.getElementById("imageuploades").value = choosen_song.image_path;
    document.getElementById("albumides").value = choosen_song.album_id;
    loadImage('es','3');
}

function editSong() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                alert("edit  success");
            }
            else{
                alert("edit failed");
            }
            //TODO: Refresh songs and albums after edit
        }
    };
    let penyanyi = null;
    let genre = null;
    let image_path = null;
    let lyrics = null;
    let audioDuration = 0;
    if(document.getElementById("singeres").value != ""){
        penyanyi = document.getElementById("singeres").value;
    }
    if(document.getElementById("genrees").value != ""){
        genre = document.getElementById("genrees").value;
    }
    if(document.getElementById("imageuploades").value != ""){
        image_path = document.getElementById("imageuploades").value;
    }
    if(document.getElementById("audiouploades").value != "") {
        let audioSrc = document.getElementById("audiouploades").value;
        let audio = document.createElement("audio");
        audio.src = audioSrc;
        let audioDuration = audio.duration;
    }
    if(document.getElementById("lyrices").value != ""){
        lyrics = document.getElementById("lyrices").value.split("\n");
    }
    if(document.getElementById("songides").value == "" 
    || document.getElementById("songnamees").value == "" 
    || document.getElementById("durationes").value == "" 
    || document.getElementById("tanggalterbites").value == ""
    || document.getElementById("audiouploades").value == ""
    || document.getElementById("albumides").value == ""){
        alert("Please fill all the fields");
    }else{
    let data = {
            "song_id": document.getElementById("songides").value,
            "judul": document.getElementById("songnamees").value,
            "penyanyi":penyanyi,
            "tanggal_terbit":document.getElementById("tanggalterbites").value,
            "genre":genre,
            "duration":"0",
            "audio_path":document.getElementById("audiouploades").value,
            "image_path":image_path,
            "album_id":document.getElementById("albumides").value,
            "lyric":lyrics,
        };
        console.log(data);
        xhttp.open("POST","http://localhost:8000/api/songapi/editsong",true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send(JSON.stringify(data));
    } 
    clearInputsCollapse();
}


function addsong() {
    console.log("test");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                alert("song sucessfully added");
            }
            else{
                alert("failed to add song");
            }
            //TODO: Refresh songs and albums after edit
        }
    };
    let penyanyi = null;
    let genre = null;
    let image_path = null;
    let lyrics = null;
    if(document.getElementById("singeras").value != ""){
        penyanyi = document.getElementById("singeras").value;
    }
    if(document.getElementById("genreas").value != ""){
        genre = document.getElementById("genreas").value;
    }
    if(document.getElementById("imageuploadas").value != ""){
        image_path = document.getElementById("imageuploadas").value;
    }
    if(document.getElementById("lyricas").value != ""){
        lyrics = document.getElementById("lyricas").value.split("\n");
    }
    if(document.getElementById("songtitleas").value == "" 
    || document.getElementById("tanggalterbitas").value == ""
    || document.getElementById("audiouploadas").value == ""
    || document.getElementById("albumidas").value == ""){
        alert("Please fill all the fields");
    }else{
    let data = {
            "judul": document.getElementById("songtitleas").value,
            "penyanyi":penyanyi,
            "tanggal_terbit":document.getElementById("tanggalterbitas").value,
            "genre":genre,
            "duration":"0",
            "audio_path":document.getElementById("audiouploadas").value,
            "image_path":image_path,
            "album_id":document.getElementById("albumidas").value,
            "lyric":lyrics,
        };
        console.log(data);
        xhttp.open("POST","http://localhost:8000/api/songapi/addsong",true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send(JSON.stringify(data));
    } 
    clearInputsCollapse();
}

function autoDataDeleteSong(){
    song_id = document.getElementById("songidds").value;
    console.log(song_id);
    for (let index = 0; index < songs.length; index++) {
        if(songs[index].song_id == song_id){
            choosen_song = songs[index];
            break; 
        }
    }
    document.getElementById("songtitleds").value = choosen_song.judul;
    document.getElementById("singerds").value = choosen_song.penyanyi;
    document.getElementById("tanggalterbitds").value = choosen_song.tanggal_terbit;
    document.getElementById("genreds").value = choosen_song.genre;
    document.getElementById("durationds").value = choosen_song.duration;
    document.getElementById("audiouploadds").value = choosen_song.audio_path;
    document.getElementById("imageuploadds").value = choosen_song.image_path;
    document.getElementById("albumidds").value = choosen_song.album_id;
    loadImage('ds','5');
}

function deleteSong() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                alert("song successfully deleted");
            }
            else{
                alert("failed to delete song");
            }
            //TODO : Refresh songs and albums after add
        }
    };
    let data = {
        "song_id": document.getElementById("songidds").value,
    };
    xhttp.open("POST","http://localhost:8000/api/songapi/deletesong",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data)); 
    clearInputsCollapse();
}
