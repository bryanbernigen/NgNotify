var songs;
var albums;

window.onload = function() {
    getSongs();
    getAlbums();
    collapse();
    uploadImageAudio();
    
}

albumIDs = [
    {id: 1, name: "Album 1"},
    {id: 2, name: "Album 2"},
    {id: 3, name: "Album 3"},
    {id: 4, name: "Album 4"},
    {id: 5, name: "Album 5"},
    {id: 6, name: "Album 6"},
    {id: 7, name: "Album 7"},
    {id: 8, name: "Album 8"},
    {id: 9, name: "Album 9"},
    {id: 10, name: "Album 10"},
]

songInAlbum = [
    {id: 1, name: "Song 1"},
    {id: 2, name: "Song 2"},
    {id: 3, name: "Song 3"},
    {id: 4, name: "Song 4"},
    {id: 5, name: "Song 5"},
    {id: 6, name: "Song 6"},
    {id: 7, name: "Song 7"},
    {id: 8, name: "Song 8"},
    {id: 9, name: "Song 9"},
    {id: 10, name: "Song 10"},
]

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
    var div = document.getElementById("songid");
    for (let i = 0; i < songInAlbum.length; i++) {
        select = document.createElement("option");
        select.value = songInAlbum[i].song_id;
        select.innerHTML = songInAlbum[i].song_id + '. ' + songInAlbum[i].judul;
        select.style.fontFamily = "CircularStd-Light";
        div.appendChild(select);
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

function uploadImageAudio() {
    event.preventDefault();
    for (let i = 0; i < 4; i++) {
        var imgInputs = document.getElementById("imageupload"+i);
        imgInputs.addEventListener("change", function() {
            let imgReader = new FileReader();
            imgReader.addEventListener("load", () => {
                const uploadedImage = imgReader.result;
                console.log(uploadedImage);
                var divImage = document.getElementById("displayImage"+i);
                divImage.src = uploadedImage;
                divImage.style.width = "90%";
                divImage.style.padding = "10px";
                divImage.style.backgroundColor = "white";
                divImage.style.borderRadius = "10px";
                divImage.style.marginTop = "10px";
                divImage.style.marginBottom = "20px";
            });
            imgReader.readAsDataURL(this.files[0]);
        });
    };

    for (let i = 0; i < 2; i++) {
        var audioInputs = document.getElementById("audioupload"+i);
        audioInputs.addEventListener("change", function() {
            let audioReader = new FileReader();
            audioReader.addEventListener("load", () => {
                const uploadedAudio = audioReader.result;
                console.log(uploadedAudio);
            });
            audioReader.readAsDataURL(this.files[0]);
        });
    };
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
}

function editAlbum() {
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
    let genre = null;
    if(document.getElementById("genreea").value != ""){
        document.getElementById("genreea").value
    }
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
}

function autoDataSong(){
    song_id = document.getElementById("songides").value;
    for (let index = 0; index < songs.length; index++) {
        if(songs[index].id == song_id){
            choosen_song = songs[index];
            break; 
        }
    }
    document.getElementById("albumides").value = choosen_song.album_id;
    document.getElementById("songnamees").values = choosen_song.name;
    document.getElementById("singeres").value = choosen_song.singer;
    document.getELementById("tanggalterbites").value = choosen_song.tanggal_terbit;
    document.getElementById("genrees").value = choosen_song.genre;
    document.getElementById("durationes").value = choosen_song.duration;
}




function editSong() {

}

function addSong() {

}