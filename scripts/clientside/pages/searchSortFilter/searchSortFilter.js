songList = [
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
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "album_id": "1",
    },
    {
        "Judul": "Anti fragile",
        "Penyanyi": "Le Sserafim",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
        "Duration": "232",
        "Audio_path": "https://www.youtube.com/watch?v=pyf8cbqyfPs",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "album_id": "1",
    },
]

albumList = [
    {
        "album_id": "1",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "2",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "3",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
        "Tanggal_terbit": "10/17/2022",
        "Genre": "Pop",
    },
    {
        "album_id": "4",
        "Judul": "Antifragile",
        "Penyanyi": "Le Sserafim",
        "Total_duration": "654",
        "Image_path": "../../assets/Spotify_Logo_CMYK_Green.png",
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

filterPop = document.getElementById("filterPop");
filterRock = document.getElementById("filterRock");
filterJazz = document.getElementById("filterJazz");
filterRnB = document.getElementById("filterRnB");
sortAtoZ = document.getElementById("sortAtoZ");
sortZtoA = document.getElementById("sortZtoA");

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
                    <img src="' + data[i].Image_path + '" class="cardImage"> \
                    <div class="songTitle">' + data[i].judul + '</div> \
                    <div class="singer">' + data[i].penyanyi + '</div> \
                    <div class="dateGenre"> \
                        <div class="date">' + data[i].Tanggal_terbit + '</div> \
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
    return div;
}

filterPop.addEventListener("click", function () {
    // Get the data (Album & Song)
    appendData(dataAlbum, "queryResultAlbum");
    appendData(dataSong, "queryResultSong");
});
filterRock.addEventListener("click", function () {
    // Get the data (Album & Song)
    appendData(dataAlbum, "queryResultAlbum");
    appendData(dataSong, "queryResultSong");
});
filterJazz.addEventListener("click", function () {
    // Get the data (Album & Song)
    appendData(dataAlbum, "queryResultAlbum");
    appendData(dataSong, "queryResultSong");
});
filterRnB.addEventListener("click", function () {
    // Get the data (Album & Song)
    appendData(dataAlbum, "queryResultAlbum");
    appendData(dataSong, "queryResultSong");
});
sortAtoZ.addEventListener("click", function () {
    // Get the data (Album & Song)
    appendData(dataAlbum, "queryResultAlbum");
    appendData(dataSong, "queryResultSong");
});
sortZtoA.addEventListener("click", function () {
    // Get the data (Album & Song)
    appendData(dataAlbum, "queryResultAlbum");
    appendData(dataSong, "queryResultSong");
});

window.onload = function() {
    appendData(albumList, "queryResultAlbum");
    appendData(songList, "queryResultSong");
}

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