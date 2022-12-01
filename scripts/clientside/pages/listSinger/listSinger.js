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

let singerdata;
let current_user;

window.onload = function() {
    infoNavbarAdded();
    
}

setInterval(polling, 10 * 1000);

function polling(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            var newsingerdata = JSON.parse(this.responseText).data;
            for(let i = 0; i < newsingerdata.length; i++){
                if(newsingerdata[i].status !== singerdata[i].status){
                    window.location.reload();
                }
            }
        }
    };
    let data = {
        "user_id": current_user
    }
    xhttp.open("POST","http://localhost:3000/singers/",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = false;
    xhttp.send(JSON.stringify(data));
}

function infoNavbarAdded(){
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
                restricted = false;
                username = res['data'].isAdmin;
                current_user = res['data'].user_id
                putNavbar(res['data'].isAdmin);
                getSinger();
            }
            else {
                uname.innerHTML = "guest";
                document.getElementById("loginout").innerHTML = "Login";
                checkRestricted();
                current_user = 0; //kalo belom login user_id = 0 (aka ga bisa akses)
                putNavbar(false);
                getSinger();
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
    let data = {
        "user_id": current_user
    }
    xhttp.open("POST","http://localhost:3000/singers/",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = false;
    xhttp.send(JSON.stringify(data));
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
            return singerdata[i].status == "ACCEPTED";
        }
    }
    return false;
}

function redirectToPremiumSongForSinger(id) {
    window.location.href = "http://localhost:8080/pages/listSong/listSong.html?content=" + id;
}

function removeList() {
    var list = document.getElementsByClassName("onetone");
    while (list.length > 0) {
        list[0].parentNode.removeChild(list[0]);
    }
}
function subscribe(id) {
    console.log("test");
    let search = searchByID(id);
    // already subscribed
    if (search == true) {
        redirectToPremiumSongForSinger(id);
    }
    // post update subscription
    else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("in");
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(this.responseText, "text/xml");
                let res = JSON.parse(this.responseText);
                
                console.log(res);
                removeList();
                window.location.reload();
                // document.getElementById(listSingerCt).innerHTML = "";
                // getSinger();
                // appendData(singerdata);
            } else if(this.readyState == 4 ){
                console.log("in else");
            }
        };
        xhttp.open("POST", "http://localhost:3000/subscription/subscribe/", true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = false;
        let data = {
            "current_user": current_user,
            "id": id
        }
        xhttp.send(JSON.stringify(data));
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
                                <div class="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
        else if (singerdata[i].status == "ACCEPTED") {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgGreen" src="' + singerdata[i].image_path + '"/> \
                                <div class="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
        else if (singerdata[i].status == "REJECTED") {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgRed" src="' + singerdata[i].image_path + '"/> \
                                <div class="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
        else {
            div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                                <img class="onetoneImgWhite" src="' + singerdata[i].image_path + '"/> \
                                <div class="onetoneName"> ' + singerdata[i].name + '</div> \
                            </div>';
        }
    }
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.flexWrap = "wrap";
    div.style.justifyContent = "center";
    div.style.alignItems = "flex-start";
    div.style.columnGap = "2vw";
    div.style.rowGap = "2vw";
    mainContainer.appendChild(div);

    var onetone = document.getElementsByClassName("onetone");
    for (let j = 0; j < onetone.length; j++) {
        onetone[j].style.display = "flex";
        onetone[j].style.flexDirection = "column";
        onetone[j].style.flexWrap = "wrap";
        onetone[j].style.justifyContent = "flex-start";
        onetone[j].style.alignItems = "center";
    }

    var onetonered = document.getElementsByClassName("onetoneImgRed");
    for (let j = 0; j < onetonered.length; j++) {
        onetonered[j].style.display = "block";
        onetonered[j].style.borderRadius = "50%";
        onetonered[j].style.width = "12.5vw";
        onetonered[j].style.height = "12.5vw";
        onetonered[j].style.marginBottom = "2vh";
        onetonered[j].style.cursor = "pointer";
        onetonered[j].style.objectFit = "cover";
        onetonered[j].style.border = "medium solid #FF0000";
    }
    
    var onetoneyel = document.getElementsByClassName("onetoneImgYellow");
    for (let j = 0; j < onetoneyel.length; j++) {
        onetoneyel[j].style.display = "block";
        onetoneyel[j].style.borderRadius = "50%";
        onetoneyel[j].style.width = "12.5vw";
        onetoneyel[j].style.height = "12.5vw";
        onetoneyel[j].style.marginBottom = "2vh";
        onetoneyel[j].style.cursor = "pointer";
        onetoneyel[j].style.objectFit = "cover";
        onetoneyel[j].style.border = "medium solid #FFD700";
    }
    
    var onetonegr = document.getElementsByClassName("onetoneImgGreen");
    for (let j = 0; j < onetonegr.length; j++) {
        onetonegr[j].style.display = "block";
        onetonegr[j].style.borderRadius = "50%";
        onetonegr[j].style.width = "12.5vw";
        onetonegr[j].style.height = "12.5vw";
        onetonegr[j].style.marginBottom = "2vh";
        onetonegr[j].style.cursor = "pointer";
        onetonegr[j].style.objectFit = "cover";
        onetonegr[j].style.border = "medium solid #1ED760";
    }
    
    var onetonewh = document.getElementsByClassName("onetoneImgWhite");
    for (let j = 0; j < onetonewh.length; j++) {
        onetonewh[j].style.display = "block";
        onetonewh[j].style.borderRadius = "50%";
        onetonewh[j].style.width = "12.5vw";
        onetonewh[j].style.height = "12.5vw";
        onetonewh[j].style.marginBottom = "2vh";
        onetonewh[j].style.cursor = "pointer";
        onetonewh[j].style.objectFit = "cover";
        onetonewh[j].style.border = "medium solid #FFFFFF";
    }

    var onetoneName = document.getElementsByClassName("onetoneName");
    for (let j = 0; j < onetoneName.length; j++) {
        onetoneName[j].style.fontFamily = "CircularStd-Book";
    }

    return div;
}
