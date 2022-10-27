const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var query = urlParams.get('query');
var order_by_title = urlParams.get('order_by_title');
var order_by_year = urlParams.get('order_by_year');
var order_by = null;
var order_type = null;
var filter_genre = null;
var songs = null;

function test(){
    console.log('aa');
}

window.onload = function() {
    document.getElementById("searchInput").value = query;
    selectSong(1);
    selectAlbum(1);
    if(urlParams.get('filter_genre')==null){
        setGenre('None');
    }else{
        setGenre(urlParams.get('filter_genre'));
    }
    if(order_by_title != null){
        setOrder('title', order_by_title);
    }
    else if(order_by_year != null){
        setOrder('tahun', order_by_year);
    }
    else{
        setOrder("title", "ASC");
    }
}

function querySong(){
    param = '';
    query = document.getElementById("searchInput").value;
    if(query != null){
        param += 'query='+query+'&';
    }
    if(order_by_title != null){
        param += 'order_by_title='+order_by_title+'&';
    }
    if(order_by_year != null){
        param += 'order_by_year='+order_by_year+'&';
    }
    if(filter_genre != null || filter_genre != 'None'){
        param += 'filter_genre='+filter_genre+'&';
    }
    window.location.href = "http://localhost:8080/pages/searchsortfilter/searchsortfilter.html?" + param;
}

var totalPageAlbum = 1;
var totalPageSong = 1;

function selectAlbum(numPage){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                albums = res['data'];
                totalPageAlbum = res['pages'];
                if (numPage > 1) {
                    clearCol();
                }
                appendData(albums['albums'], "queryResultAlbum");
            }
            else{
                appendData(albumNotFound, "queryResultAlbum");
            }
        }
    };

    let data = {
        "query" : query,
        "order_by_year": order_by_year,
        "filter_genre": filter_genre,
        "order_by_title": order_by_title,
    };
    xhttp.open("POST","http://localhost:8000/api/albumapi/queryalbum/"+numPage,true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data)); 
}

function selectSong(numPage){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                songs = res['data'];
                totalPageSong = res['pages'];
                if (numPage > 1) {
                    clearCol();
                }
                appendData(songs['songs'], "queryResultSong");
            }
            else{
                appendData(songNotFound, "queryResultSong");
            }
        }
    };
    let data = {
        "query" : query,
        "order_by_year": order_by_year,
        "filter_genre": filter_genre,
        "order_by_title": order_by_title,
    };
    xhttp.open("POST","http://localhost:8000/api/songapi/querysong/"+numPage,true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data)); 
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
albumNotFound=[{
    "album_id": "0",
    "judul": "No Album Found",
    "penyanyi": "Unknown",
    "total_duration": "0",
    "image_path": "https://www.alfaromeo.it/content/dam/moc/common/404-error/mobile/mobile_404.png",
    "tanggal_terbit": "2000-01-01",
    "genre": "Unkonwn",
}];

filterPop = document.getElementById("filterPop");
filterRock = document.getElementById("filterRock");
filterJazz = document.getElementById("filterJazz");
filterRnB = document.getElementById("filterRnB");
sortAtoZ = document.getElementById("sortAtoZ");
sortZtoA = document.getElementById("sortZtoA");

function clearCol() {
    document.getElementById("queryResultSong").innerHTML = "";
    document.getElementById("queryResultAlbum").innerHTML = "";
}

function appendData(data, target) {
    var mainContainer = document.getElementById(target);
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
        div.innerHTML += '<div class="card"> \
                    <img src="' + data[i].image_path + '" class="cardImage"> \
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
    div.style.color = "white";
    mainContainer.appendChild(div);

    var pageAlbumContainer = document.getElementById("pagenumAlbum");
    for (i = 0; i < totalPageAlbum; i++) {
        pageAlbumContainer.innerHTML += '<div class="page" onclick="selectAlbum(' + (i + 1) + ')">' + (i + 1) + '</div>';
    }

    var pageSongContainer = document.getElementById("pagenumSong");
    for (i = 0; i < totalPageSong; i++) {
        pageSongContainer.innerHTML += '<div class="page" onclick="selectSong(' + (i + 1) + ')">' + (i + 1) + '</div>';
    }

    return div;
}

function setGenre(inputGenre){
    if(inputGenre == filter_genre){
        filter_genre = null;
        document.getElementById("filter"+inputGenre).style.backgroundColor = "#282828";
        document.getElementById("filterNone").style.backgroundColor = "green";

    }else{
        if(filter_genre != null){
            document.getElementById("filter"+filter_genre).style.backgroundColor = "#282828";
        }
        document.getElementById("filterNone").style.backgroundColor = "#282828";
        document.getElementById("filter"+inputGenre).style.backgroundColor = "green";
        filter_genre = inputGenre;
    }
}

function setOrder(type,order){
    if(order_by_year!=null){
        if(type=="judul"){
            document.getElementById("sorttahun"+order_by_year).style.backgroundColor = "#282828";
            document.getElementById("sortjudul"+order).style.backgroundColor = "green";
            order_by_year = null;
            order_by_title = order;
        }else{
            document.getElementById("sorttahun"+order_by_year).style.backgroundColor = "#282828";
            document.getElementById("sorttahun"+order).style.backgroundColor = "green";
            order_by_year = order;
        }
    }
    else if(order_by_title!=null){
        if(type=="judul"){
            document.getElementById("sortjudul"+order_by_title).style.backgroundColor = "#282828";
            document.getElementById("sortjudul"+order).style.backgroundColor = "green";
            order_by_title = order;
        }else{
            document.getElementById("sortjudul"+order_by_title).style.backgroundColor = "#282828";
            document.getElementById("sorttahun"+order).style.backgroundColor = "green";
            order_by_year = order;
            order_by_title = null;
        }
    }
    else{
        order_by_title = "ASC";
        document.getElementById("sortjudulASC").style.backgroundColor = "green";
    }
}
document.getElementById("filterNone")
    .addEventListener("click", function () {
    setGenre("None");
});
document.getElementById("filterPop")
    .addEventListener("click", function () {
    setGenre("Pop");
});
document.getElementById("filterRock")
    .addEventListener("click", function () {
    setGenre("Rock");
});
document.getElementById("filterJazz")
    .addEventListener("click", function () {
    setGenre("Jazz");
});
document.getElementById("filterRnB")
    .addEventListener("click", function () {
    setGenre("RnB");
});
document.getElementById("sortjudulASC")
    .addEventListener("click", function () {
    setOrder("judul","ASC");
});
document.getElementById("sortjudulDESC")
    .addEventListener("click", function () {
    setOrder("judul","DESC");
});
document.getElementById("sorttahunASC")
    .addEventListener("click", function () {
    setOrder("tahun","ASC");
});
document.getElementById("sorttahunDESC")
    .addEventListener("click", function () {
    setOrder("tahun","DESC");
});
document.getElementById("searchInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    // If the user presses the "Enter" key on the keyboard
    if (event.keyCode == 13) {
      // Trigger the button element with a click
      document.getElementById("searchInputImg").click();
    }
});

// function searchFilter() {
//     event.preventDefault();
//     var input = document.getElementById("searchInput");
//     var filter = input.value.toUpperCase();
//     console.log(filter);
//     var resultContainer = document.getElementById("queryResult");
//     resultContainer.innerHTML = "";
//     for (i = 0; i < songList.length; i++) {
//         if (songList[i].Judul.toUpperCase().indexOf(filter) > -1) {
//             resultContainer.innerHTML += `
//             <div class="song">
//                 <div class="song-image">
//                     <img src="${songList[i].Image_path}" alt="">
//                 </div>
//                 <div class="song-info">
//                     <div class="song-title">
//                         <h3>${songList[i].Judul}</h3>
//                     </div>
//                     <div class="song-artist">
//                         <h4>${songList[i].Penyanyi}</h4>
//                     </div>
//                     <div class="song-duration">
//                         <h4>${songList[i].Tanggal_terbit}</h4>
//                     </div>
//                     <div class="song-genre">
//                         <h4>${songList[i].Genre}</h4>
//                     </div>
//                 </div>
//             </div>`
//             resultContainer.style.display = "flex";
//             resultContainer.style.flexDirection = "row";
//             resultContainer.style.flexWrap = "wrap";
//             resultContainer.style.justifyContent = "center";
//             resultContainer.style.alignItems = "center";
//         }
//         if (songList[i].Penyanyi.toUpperCase().indexOf(filter) > -1) {
//             resultContainer.innerHTML += `
//             <div class="song">
//                 <div class="song-image">
//                     <img src="${songList[i].Image_path}" alt="">
//                 </div>
//                 <div class="song-info">
//                     <div class="song-title">
//                         <h3>${songList[i].Judul}</h3>
//                     </div>
//                     <div class="song-artist">
//                         <h4>${songList[i].Penyanyi}</h4>
//                     </div>
//                     <div class="song-duration">
//                         <h4>${songList[i].Tanggal_terbit}</h4>
//                     </div>
//                     <div class="song-genre">
//                         <h4>${songList[i].Genre}</h4>
//                     </div>
//                 </div>
//             </div>`
//             resultContainer.style.display = "flex";
//             resultContainer.style.flexDirection = "row";
//             resultContainer.style.flexWrap = "wrap";
//             resultContainer.style.justifyContent = "center";
//             resultContainer.style.alignItems = "center";
//         }
//     }
//     for (i = 0; i < albumList.length; i++) {
//         if (albumList[i].Judul.toUpperCase().indexOf(filter) > -1) {
//             resultContainer.innerHTML += `
//             <div class="song">
//                 <div class="song-image">
//                     <img src="${albumList[i].Image_path}" alt="">
//                 </div>
//                 <div class="song-info">
//                     <div class="song-title">
//                         <h3>${albumList[i].Judul}</h3>
//                     </div>
//                     <div class="song-artist">
//                         <h4>${albumList[i].Penyanyi}</h4>
//                     </div>
//                     <div class="song-duration">
//                         <h4>${albumList[i].Total_duration}</h4>
//                     </div>
//                 </div>
//             </div>`
//             resultContainer.style.display = "flex";
//             resultContainer.style.flexDirection = "row";
//             resultContainer.style.flexWrap = "wrap";
//             resultContainer.style.justifyContent = "center";
//             resultContainer.style.alignItems = "center";
//         }
//     }
// }