{/* <div className="onetone">
    { clicked 
        ? <div className="onetoneOverlay" onClick={() => setClicked(!clicked)} style={{"--artist_pic": "url("+creator_pic+")"} as React.CSSProperties} ></div>
        : <img className="onetoneImg" src={creator_pic} alt={creator_name} onClick={() => setClicked(!clicked)}/>
    }
    <div className="onetoneName">{creator_name}</div>
</div> */}

window.onload = function() {
    infoNavbarAdded();
    getSinger();
}

let singerdata;
let current_user;

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
                checkRestricted();
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
            singer = JSON.parse(this.responseText);
            if (singer["data"]) {
                singerdata = singer["data"];
                appendData();
            }
        }
    };
    xhttp.open("GET","http://localhost:3000/singers/",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
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

let subscribed = [];

function subscribe(id) {
    // <div id="onetoneOverlay" onclick="" style={{"--artist_pic": "url("+creator_pic+")"} as React.CSSProperties} /> \
    subscribed.push(id);
    // TODO: post update subscription

    // TODO: pop from singerdata if a singer has been subscribed by a user

    appendData();
}

function appendData() {
    var mainContainer = document.getElementById("listSingerCt");
    let div = document.createElement("div");
    for (var i = 0; i < singerdata.length; i++) {
        div.innerHTML += '<div class="onetone" id="'+singerdata[i].user_id+'" onclick="subscribe(this.id)"> \
                            <img class="onetoneImg" src="' + singerdata[i].creator_pic + '/> \
                            <div id="onetoneName"> ' + singerdata[i].name + '</div> \
                        </div>'
    }
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.flexWrap = "wrap";
    div.style.justifyContent = "center";
    div.style.alignItems = "flex-start";

    var onetone = document.getElementById("onetone");
    onetone.style.display = "flex";
    onetone.style.flexDirection = "column";
    onetone.style.flexWrap = "wrap";
    onetone.style.justifyContent = "flex-start";
    onetone.style.alignItems = "center";

    var onetone = document.getElementById("onetoneImg");
    onetone.style.display = "block";
    onetone.style.borderRadius = "50%";
    onetone.style.width = "12.5vw";
    onetone.style.height = "12.5vw";
    onetone.style.marginBottom = "2vh";
    onetone.style.cursor = "pointer";
    
    mainContainer.appendChild(div);
    return div;
}
