function login(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4){
            if(this.status==200){
                let res = JSON.parse(this.responseText);
                // console.log(res)
                if(res['status']){
                    // console.log("login success");
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    let page_type = urlParams.get('page_type');
                    if(page_type==null){
                        page_type = '';
                    }
                    let album_id = urlParams.get('album_id');
                    if(album_id==null){
                        album_id = '';
                    }
                    let song_id = urlParams.get('song_id');
                    if(song_id==null){
                        song_id='';
                    }
                    if(page_type){
                        window.location = "http://localhost:8080/pages/" + page_type+"/" + page_type + ".html?album_id="+album_id+"&song_id="+song_id;
                    }
                    else{
                        window.location = "http://localhost:8080/pages/home/home.html";
                    }
                    //TODO: redirect to home page
                }
                else{
                    // console.log("login failed");
                    failInfo();
                    //TODO: tell user that they have failed to login
                }
            }
            else{
                // console.log("login failed");
                failInfo();
            }
        }
    };
    let data = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value,
    };
    xhttp.open("POST","http://localhost:8000/api/auth/login",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
}

function failInfo(){
    var mainContainer = document.getElementById("failPrompt")
    mainContainer.innerHTML +=  '<div class="loginFail"> \
                                    <img src="../../assets/icons8-warning-67.png" /> \
                                    <div class="incorrectUnamePass">Incorrect username or password.</div> \
                                </div>';
    mainContainer.style.width = "100%";
    mainContainer.style.display = "flex";
    mainContainer.style.justifyContent = "center";
    mainContainer.style.alignItems = "center";
    mainContainer.style.flexDirection = "row";
    mainContainer.style.flexWrap = "nowrap";
};

function checklogin(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            let res = JSON.parse(this.responseText);
            if(res['status']){
                // console.log("login success");
                window.location = "http://localhost:8080/pages/home/home.html";
            }
        }
    };
    xhttp.open("GET","http://localhost:8000/api/auth/info",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}