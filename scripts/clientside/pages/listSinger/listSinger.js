{/* <div className="onetone">
    { clicked 
        ? <div className="onetoneOverlay" onClick={() => setClicked(!clicked)} style={{"--artist_pic": "url("+creator_pic+")"} as React.CSSProperties} ></div>
        : <img className="onetoneImg" src={creator_pic} alt={creator_name} onClick={() => setClicked(!clicked)}/>
    }
    <div className="onetoneName">{creator_name}</div>
</div> */}

// let singerdata = [
//     {
//         "user_id": 1,
//         "username": "chaewon123",
//         "name": "Chae Won",
//         "creator_pic": "../../assets/basicimage.jpg"
//     },
//     {
//         "user_id": 2,
//         "username": "chaewon123",
//         "name": "Chae Won",
//         "creator_pic": "../../assets/basicimage.jpg"
//     },
//     {
//         "user_id": 3,
//         "username": "chaewon123",
//         "name": "Chae Won",
//         "creator_pic": "../../assets/basicimage.jpg"
//     },
// ];
let singerdata
let current_user;

window.onload = function() {
    // infoNavbarAdded();
    getSinger();
    
}

function infoNavbarAdded(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            uname = document.getElementById("uname");
            if(res['status']){
                console.log(res['data']['username']);
                uname.innerHTML = 'pasp';
                username = res['data'].isAdmin;
                current_user = res['data'].user_id
                restricted = false;
                putNavbar(username);
            }
            else {
                uname.innerHTML = "Haha";
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

function getSinger(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            singerdata = JSON.parse(this.responseText).data;
            appendData(singerdata);
        }
    };
    xhttp.open("GET","http://localhost:3000/singers/",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = false;
    xhttp.send();
}

function loginout() {
    if (document.getElementById("loginout").innerHTML == "Login"){
        window.location.href = "http://localhost:8080/pages/login/login.html";
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            if (res["status"]) {
                window.location.href = "http://localhost:8080/pages/listSinger/listSinger.html";
            }
            }
        };
        xhttp.open("POST", "http://localhost:8000/api/auth/logout", true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.withCredentials = true;
        xhttp.send();
    }
}

function searchByID(id) {
    for (let i = 0; i < singerdata.length; i++) {
        if (singerdata[i].user_id == id) {
            return singerdata[i].isSubscribed;
        }
    }
    return false;
}

function subscribe(id) {
    // <div id="onetoneOverlay" onclick="" style={{"--artist_pic": "url("+creator_pic+")"} as React.CSSProperties} /> \
    let search = searchByID(id);
    // already subscribed
    if (search == true) {
        redirectToPremiumSong();
    }
    // post update subscription
    else if (search == false) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(this.responseText);
                if (res["status"]) {
                    window.location.href = "http://localhost:8080/pages/listSinger/listSinger.html";
                }
            }
        };
        xhttp.open("POST", "http://localhost:3000/subscription/update/", true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.withCredentials = false;
        xhttp.send(JSON.stringify({
            "user_id": current_user,
            "creator_id": id
        }));
    }
}

function appendData(singerdata) {
    var mainContainer = document.getElementById("listSingerCt");
    let div = document.createElement("div");
    for (var i = 0; i < singerdata.length; i++) {
        if(!singerdata[i].image_path){
            singerdata[i].image_path = "../../assets/basicimage.jpg"
        }
        if (singerdata[i].status == "PENDING") {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgYellow" src="' + singerdata[i].image_path + '"/> \
                                <div id="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
        else if (singerdata[i].status == "ACCEPTED") {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgGreen" src="' + singerdata[i].image_path + '"/> \
                                <div id="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
        else if (singerdata[i].status == "REJECTED") {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgRed" src="' + singerdata[i].image_path + '"/> \
                                <div id="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
        else if (singerdata[i].status == "NONE") {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgWhite" src="' + singerdata[i].image_path + '"/> \
                                <div id="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
    }
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.flexWrap = "wrap";
    div.style.justifyContent = "center";
    div.style.alignItems = "flex-start";
    div.style.columnGap = "2vw";
    mainContainer.appendChild(div);

    var onetone = document.getElementById("onetone");
    onetone.style.display = "flex";
    onetone.style.flexDirection = "column";
    onetone.style.flexWrap = "wrap";
    onetone.style.justifyContent = "flex-start";
    onetone.style.alignItems = "center";

    var onetone = document.getElementById("onetoneImgRed");
    onetone.style.display = "block";
    onetone.style.borderRadius = "50%";
    onetone.style.width = "12.5vw";
    onetone.style.height = "12.5vw";
    onetone.style.marginBottom = "2vh";
    onetone.style.cursor = "pointer";
    onetone.style.objectFit = "cover";
    
    var onetone = document.getElementById("onetoneImgYellow");
    onetone.style.display = "block";
    onetone.style.borderRadius = "50%";
    onetone.style.width = "12.5vw";
    onetone.style.height = "12.5vw";
    onetone.style.marginBottom = "2vh";
    onetone.style.cursor = "pointer";
    onetone.style.objectFit = "cover";
    
    var onetone = document.getElementById("onetoneImgGreen");
    onetone.style.display = "block";
    onetone.style.borderRadius = "50%";
    onetone.style.width = "12.5vw";
    onetone.style.height = "12.5vw";
    onetone.style.marginBottom = "2vh";
    onetone.style.cursor = "pointer";
    onetone.style.objectFit = "cover";
    
    var onetone = document.getElementById("onetoneImgWhite");
    onetone.style.display = "block";
    onetone.style.borderRadius = "50%";
    onetone.style.width = "12.5vw";
    onetone.style.height = "12.5vw";
    onetone.style.marginBottom = "2vh";
    onetone.style.cursor = "pointer";
    onetone.style.objectFit = "cover";

    return div;
}
