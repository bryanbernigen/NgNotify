var username = undefined;

function infoNavbar(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            uname = document.getElementById("uname");
            if(res['status']){
                if(res['data'].isAdmin){
                    document.getElementById("uname").innerHTML = res['data'].username;
                }else{
                    document.getElementById("unameuwu").innerHTML = res['data'].username;
                }
                putNavbar(res['data'].isAdmin);
            }
            else {
                uname.innerHTML = "Guest";
                document.getElementById("loginout").innerHTML = "Login";
                putNavbar(false);
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/auth/info",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function putNavbar(isAdmin) {
    if (isAdmin) {
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

function redirectToSearchSortFilter() {
    window.location.href = "http://localhost:8080/pages/searchSortFilter/searchSortFilter.html";
}

function redirectToListUsers() {
    window.location.href = "http://localhost:8080/pages/listuser/listuser.html";
}

function formatTime(time){
    var date = new Date(0);
    date.setSeconds(time); // specify value for SECONDS here
    var timeString = date.toISOString().substring(11, 19);
    if(timeString[0] == "0" && timeString[1] == "0"){
        if(timeString[3] == "0" && timeString[4] == "0"){
            return timeString.substring(6,8);
        }
        else{
            return timeString.substring(3,8);
        }
    }
    else{
        return timeString;
    }
}