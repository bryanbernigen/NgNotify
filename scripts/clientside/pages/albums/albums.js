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
        div.innerHTML += '<div class="card"> \
                    <img src="' + data[i].Image_path + '" class="cardImage"> \
                    <div class="albumTitle">' + data[i].Judul + '</div> \
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