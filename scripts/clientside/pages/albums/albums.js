function initPage(){
    getAlbums();
    infoNavbar();
}

function getAlbums(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            albums = JSON.parse(this.responseText);
            appendData(albums['data']);
        }
    };
    xhttp.open("GET","http://localhost:8000/api/albumapi/showallalbum",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}


function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login") {
      window.location.href = "http://localhost:8080/pages/login/login.html?page_type=albums";
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let res = JSON.parse(this.responseText);
          if (res["status"]) {
            window.location.href = "http://localhost:8080/pages/albums/albums.html";
          }
        }
      };
      xhttp.open("POST", "http://localhost:8000/api/auth/logout", true);
      xhttp.setRequestHeader("Accept", "application/json");
      xhttp.withCredentials = true;
      xhttp.send();
    }
}

albumList = [
    {
        "album_id": "1",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "2",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "3",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "4",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "5",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "6",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "7",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/sample-song-image.jpg",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
]

function appendData(data) {
    var mainContainer = document.getElementById("albumCards");
    let div = document.createElement("div");
    for (var i = 0; i < data.length; i++) {
        if(data[i]['genre'] == null){
            data[i]['genre'] = "-";
        }
        div.innerHTML += '<div class="card" id="'+data[i].album_id+'" onclick="reroute(this.id)"> \
                    <img src="' + data[i].image_path + '" class="cardImage"> \
                    <div class="albumTitle">' + data[i].judul + '</div> \
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

function reroute(albumid){
    window.location.href = "http://localhost:8080/pages/detailAlbum/detailAlbum.html?album_id="+albumid;
}