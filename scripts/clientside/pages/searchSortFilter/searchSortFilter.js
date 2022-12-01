const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var query = urlParams.get('query');
var order_by_title = urlParams.get('order_by_title');
var order_by_year = urlParams.get('order_by_year');
var order_by = null;
var order_type = null;
var filter_genre = null;
var songs = null;
var totalPageAlbum = null;
var totalPageSong = null;
var currentPageAlbum = null;
var currentPageSong = null;

function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login") {
      window.location.href = "http://localhost:8080/pages/login/login.html?page_type=searchsortfilter";
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let res = JSON.parse(this.responseText);
          if (res["status"]) {
            window.location.href = "http://localhost:8080/pages/searchsortfilter/searchsortfilter.html";
          }
        }
      };
      xhttp.open("POST", "http://localhost:8000/api/auth/logout", true);
      xhttp.setRequestHeader("Accept", "application/json");
      xhttp.withCredentials = true;
      xhttp.send();
    }
}

window.onload = function() {

    document.getElementById("searchInput").value = query;
    if(urlParams.get('filter_genre')==null){
        setGenre('None');
    }else{
        setGenre(urlParams.get('filter_genre'));
    }
    if(order_by_title != null){
        setOrder('judul', order_by_title);
    }
    else if(order_by_year != null){
        setOrder('tahun', order_by_year);
    }
    else{
        setOrder("judul", "ASC");
    }
    infoNavbar();
    selectSong(1);
    selectAlbum(1);
}

function querySong(){
    param = '';
    query = document.getElementById("searchInput").value;
    if(query != "" && query != null){
        param += 'query='+query+'&';
    }else{
        query = document.getElementById("searchInput2").value;
        if(query != null && query != ''){
            param += 'query='+query+'&';
        }
    }
    
    if(order_by_title != null && order_by_title != ''){
        param += 'order_by_title='+order_by_title+'&';
    }
    if(order_by_year != null && order_by_year != ''){
        param += 'order_by_year='+order_by_year+'&';
    }
    if(filter_genre != null && filter_genre != 'None'){
        param += 'filter_genre='+filter_genre+'&';
    }
    window.location.href = "http://localhost:8080/pages/searchsortfilter/searchsortfilter.html?" + param;
}

function selectAlbum(numPage){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            currentPageAlbum = numPage;
            if(res['status']){
                albums = res['data'];
                totalPageAlbum = res['data']['pages'];
                clearAlbum();
                appendData(albums['albums'], "queryResultAlbum");
            }
            else{
                clearAlbum();
                appendData(albumNotFound, "queryResultAlbum");
            };
            // clearAlbum();
        }
    };

    let data = {
        "query" : query,
        "order_by_year": order_by_year,
        "filter_genre": filter_genre,
        "order_by_title": order_by_title,
    };
    xhttp.open("POST","http://localhost:8000/api/albumapi/queryalbum/"+numPage+"/8/",true);
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
            currentPageSong = numPage;
            if(res['status']){
                songs = res['data'];
                totalPageSong = res['data']['pages'];
                clearSong();
                appendData(songs['songs'], "queryResultSong");
            }
            else{
                clearSong();
                appendData(songNotFound, "queryResultSong");
            };
            // clearSong();
        }
    };
    let data = {
        "query" : query,
        "order_by_year": order_by_year,
        "filter_genre": filter_genre,
        "order_by_title": order_by_title,
    };
    xhttp.open("POST","http://localhost:8000/api/songapi/querysong/"+numPage+"/8/",true);
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

function clearAlbum() {
    let qAchild = document.getElementById("queryResultAlbum");
    while (qAchild.firstChild) {
        qAchild.removeChild(qAchild.firstChild);
    }
    document.getElementById("queryResultAlbum").innerHTML = "";
    var pageAlbumContainer = document.getElementById("pagenumAlbum");
    while (pageAlbumContainer.firstChild) {
        pageAlbumContainer.removeChild(pageAlbumContainer.firstChild);
    }
    document.getElementById("pagenumAlbum").innerHTML = "";
}

function clearSong() {
    let qSchild = document.getElementById("queryResultSong");
    while (qSchild.firstChild) {
        qSchild.removeChild(qSchild.firstChild);
    }
    document.getElementById("pagenumSong").innerHTML = "";
    var pageSongContainer = document.getElementById("pagenumSong");
    while (pageSongContainer.firstChild) {
        pageSongContainer.removeChild(pageSongContainer.firstChild);
    }
    document.getElementById("pagenumSong").innerHTML = "";
}

function appendData(data, target) {
    var mainContainer = document.getElementById(target);
    for (var i = 0; i < data.length; i++) {
        if (data[i].penyanyi == null) {
            data[i].penyanyi = "-";
        }
        if(data[i].genre == null){
            data[i].genre = "-";
        }
        if(data[i].image_path == null){
            data[i].image_path = "../../assets/basicimage.jpg";
        }if(target=='queryResultAlbum'){
            mainContainer.innerHTML += '<div class="card" id='+ data[i].album_id+' onclick="reroutealbum(this.id)"> \
                    <img src="' + data[i].image_path + '" class="cardImage"> \
                    <div class="songTitle">' + data[i].judul + '</div> \
                    <div class="singer">' + data[i].penyanyi + '</div> \
                    <div class="dateGenre"> \
                        <div class="date">' + data[i].tanggal_terbit + '</div> \
                        <div class="genre">' + data[i].genre + '</div> \
                    </div> \
                </div>';
        }
        else{
            mainContainer.innerHTML += '<div class="card" id='+ data[i].song_id+' onclick="reroutesong(this.id)"> \
                    <img src="' + data[i].image_path + '" class="cardImage"> \
                    <div class="songTitle">' + data[i].judul + '</div> \
                    <div class="singer">' + data[i].penyanyi + '</div> \
                    <div class="dateGenre"> \
                        <div class="date">' + data[i].tanggal_terbit + '</div> \
                        <div class="genre">' + data[i].genre + '</div> \
                    </div> \
                </div>';
        }
        
    }
    mainContainer.style.display = "flex";
    mainContainer.style.flexDirection = "row";
    mainContainer.style.flexWrap = "wrap";
    mainContainer.style.justifyContent = "center";
    mainContainer.style.alignItems = "flex-start";
    mainContainer.style.color = "white";

    if (target == "queryResultAlbum") {
        paginationAlbum();    
    }
    else {
        paginationSong();
    }
};

function reroutealbum(id){
    window.location.href = "http://localhost:8080/pages/detailAlbum/detailAlbum.html?album_id="+id;
}

function reroutesong(id){
    window.location.href = "http://localhost:8080/pages/detailSong/detailSong.html?song_id="+id;
}

function paginationAlbum() {
    var pageAlbumContainer = document.getElementById("pagenumAlbum");
    for (i = 0; i < totalPageAlbum; i++) {
        if (i == currentPageAlbum-1) {
            pageAlbumContainer.innerHTML += '<div class="pageCurr" style="background-color: #282828; color: white;">' + (i+1) + '</div>';
        }
        else {
            pageAlbumContainer.innerHTML += '<div class="page" onclick="selectAlbum(' + (i+1) + ')">' + (i + 1) + '</div>';
        }
    }
}

function paginationSong() {
    var pageSongContainer = document.getElementById("pagenumSong");
    for (i = 0; i < totalPageSong; i++) {
        if (i == currentPageSong-1) {
            pageSongContainer.innerHTML += '<div class="pageCurr" style="background-color: #282828; color: white;">' + (i+1) + '</div>';
        }
        else {
            pageSongContainer.innerHTML += '<div class="page" onclick="selectSong(' + (i+1) + ')">' + (i + 1) + '</div>';
        }
    }
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
    if(order_by_year!=null && order_by_year != ''){
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
    else if(order_by_title!=null && order_by_title != ''){
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