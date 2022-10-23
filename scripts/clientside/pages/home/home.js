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
        div.innerHTML += '<div class="card"> \
                    <img src="' + data[i].Image_path + '" class="cardImage"> \
                    <div class="songTitle">' + data[i].Judul + '</div> \
                    <div class="singer">' + data[i].Penyanyi + '</div> \
                    <div class="dateGenre"> \
                        <div class="date">' + data[i].Tanggal_terbit + '</div> \
                        <div class="genre">' + data[i].Genre + '</div> \
                    </div> \
                </div>';
        console.log(data[i]);
    }
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.flexWrap = "wrap";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    mainContainer.appendChild(div);
    return div;
}