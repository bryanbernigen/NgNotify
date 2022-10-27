var songs

function initPage(){
    getSongs();
    infoNavbar();
    putNavbar();
}

function loginout(){
    if (document.getElementById("loginout").innerHTML == "Login"){
        window.location.href = "http://localhost:8080/pages/login/login.html";
    }
    else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                let res = JSON.parse(this.responseText);
                if(res['status']){
                    window.location.href = "http://localhost:8080/pages/home/home.html";
                }
            }
        };
        xhttp.open("POST","http://localhost:8000/api/auth/logout",true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.withCredentials = true;
        xhttp.send();
    }
}

function getSongs(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            songs = JSON.parse(this.responseText);
            if(songs['status']){
                appendData(songs['data']);
            }else{
                appendData(songNotFound);
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/songapi/showallsongs",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function searchSong(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            songs = JSON.parse(this.responseText);
            appendData(songs['data']);
        }
    };
    xhttp.open("GET","http://localhost:8000/api/songapi/show10songs",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

songNotFound=[
    {
        "judul": "No Song Found",
        "penyanyi": "Unknown",
        "tanggal_terbit": "2000-01-01",
        "genre": "Unkonwn",
        "duration": "0",
        "audio_path": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "image_path": "https://www.alfaromeo.it/content/dam/moc/common/404-error/mobile/mobile_404.png",
        "album_id": "0",
    },
];

musicList = [
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/sample-song-image.jpg",
        "album_id": "1",
    },
]

function appendData(data) {
    var mainContainer = document.getElementById("songCards");
    let div = document.createElement("div");
    for (var i = 0; i < data.length; i++) {
        if (data[i].penyanyi == null) {
            data[i].penyanyi = "-";
        }
        if(data[i].genre == null){
            data[i].genre = "-";
        }
        if(data[i].image_path == null){
            data[i].image_path = "../../assets/basicimage.jpg";
        }
        div.innerHTML += '<div class="card" id="'+ data[i].song_id+'" onclick="rerouteToDetailSong(this.id)"> \
                    <img src="' + data[i].image_path + '" style="width: 11.5vw; height: 11.5vw; object-fit: cover;" class="cardImage" /> \
                    <div class="songTitle">' + data[i].judul + '</div> \
                    <div class="singer">' + data[i].penyanyi + '</div> \
                    <div class="dateGenre"> \
                        <div class="date">' + data[i].tanggal_terbit + '</div> \
                        <div class="genre">' + data[i].genre + '</div> \
                    </div> \
                </div>';
    }
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.flexWrap = "wrap";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    mainContainer.appendChild(div);
    return div;
}

function test(){
    if (localStorage.getItem("test") === null) {
        localStorage.setItem("test", 1);
    }
    else {
        localStorage.test = Number(localStorage.test) + 1;
    }
}

function searchSong(){
    query = document.getElementById("querysong").value;
    window.location.href = "http://localhost:8080/pages/searchsortfilter/searchsortfilter.html?query=" + query;
}

document.getElementById("querysong")
    .addEventListener("keyup", function(event) {
    console.log("searching");
    event.preventDefault();
    // If the user presses the "Enter" key on the keyboard
    if (event.keyCode == 13) {
      // Trigger the button element with a click
      document.getElementById("songqueryimg").click();
    }
  });

function rerouteToDetailSong(id){
    window.location.href = "http://localhost:8080/pages/detailsong/detailsong.html?song_id=" + id;
}