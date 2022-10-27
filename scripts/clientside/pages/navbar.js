function infoNavbar(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            username = document.getElementById("uname");
            if(res['status']){
                echos = res['data'];
                username.innerHTML = res['data']['username'];
            }
            else {
                username.innerHTML = "Guest";
                document.getElementById("loginout").innerHTML = "Login";
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/auth/info",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function putNavbar() {
    let username = document.getElementById("uname").innerHTML;
    if (username == 'admin') {
        document.getElementById("navCtAdmin").style.display = "block";
        document.getElementById("navCt").style.display = "none";
    }
    else {
        document.getElementById("navCtAdmin").style.display = "none";
        document.getElementById("navCt").style.display = "block";
    }
}

function redirectToAlbum(){
    window.location.href = "http://localhost:8080/pages/albums/albums.html";
}

function redirectToHome(){
    window.location.href = "http://localhost:8080/pages/home/home.html";
}

function redirectToAddSongAlbum() {
    window.location.href = "http://localhost:8080/pages/addData/addData.html";
}