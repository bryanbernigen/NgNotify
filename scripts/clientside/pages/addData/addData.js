window.onload = function() {
    addOptions();
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

function addOptions() {
    var divDocument = document.getElementsByClassName("albumid");
    for (let j = 0; j < divDocument.length; j++) {
        for (let i = 0; i < albumIDs.length; i++) {
            select = document.createElement("option");
            select.value = albumIDs[i].id;
            select.innerHTML = albumIDs[i].id + '. ' + albumIDs[i].name;
            select.style.fontFamily = "CircularStd-Light";
            divDocument[j].appendChild(select);
        }
    }
    var div = document.getElementById("songid");
    for (let i = 0; i < songInAlbum.length; i++) {
        select = document.createElement("option");
        select.value = songInAlbum[i].id;
        select.innerHTML = songInAlbum[i].id + '. ' + songInAlbum[i].name;
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

function editAlbum() {

}

function addAlbum() {

}

function deleteAlbum() {

}

function editSong() {

}

function addSong() {

}

function deleteAlbum() {
    
}