var debounce;
var emailValid = false;
var usernameValid = false;
function checkEmail(){
    clearTimeout(debounce);
	debounce = setTimeout(function () {
        checkUniqueEmail();
        revalidateEmail();
	}, 500);
}

function checkUniqueEmail(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200 ){
            let res = JSON.parse(this.responseText);
            // console.log(res)
            if(res['status']){
                //set border to #1ED760
                document.getElementById('email').style.border = "2px solid #1ED760";
                //TODO: add message below input box saying email is available (#1ED760)
                document.getElementById('invalid1').style.display = "block";
                document.getElementById('invalid1').src = "../../assets/icons8-checkmark-52.png";
                document.getElementById('incorrect1').style.display = "block";
                document.getElementById('incorrect1').innerHTML = "Email is available.";
                document.getElementById('incorrect1').style.color = "#1ED760";
                emailValid = true;
            }
            else{
                //set border to red
                document.getElementById('email').style.border = "2px solid red";
                //TODO: add message below input box saying email is taken (red)
                document.getElementById('invalid1').style.display = "block";
                document.getElementById('invalid1').src = "../../assets/icons8-warning-67-red.png";
                document.getElementById('incorrect1').style.display = "block";
                document.getElementById('incorrect1').innerHTML = "Incorrect username or password.";
                document.getElementById('incorrect1').style.color = "red";
                emailValid = false;
            }
        }
    };
    let email = document.getElementById("email").value
    xhttp.open("GET","http://localhost:8000/api/register/checkemail?email="+email,true)
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function revalidateEmail(){
    let email = document.getElementById("email").value;
    if (email == document.getElementById("emailconfirm").value) {
        //set border to #1ED760
        document.getElementById('emailconfirm').style.border = "2px solid #1ED760";
        document.getElementById('invalid2').style.display = "block";
        document.getElementById('invalid2').src = "../../assets/icons8-checkmark-52.png";
        document.getElementById('incorrect2').style.display = "block";
        document.getElementById('incorrect2').innerHTML = "Confirmation success.";
        document.getElementById('incorrect2').style.color = "#1ED760";
    }
    else{
        //set border to red
        document.getElementById('emailconfirm').style.border = "2px solid red";
        // TOOD: add message below input box saying email is not the same (red)
        document.getElementById('invalid2').style.display = "block";
        document.getElementById('invalid2').src = "../../assets/icons8-warning-67-red.png";
        document.getElementById('incorrect2').style.display = "block";
        document.getElementById('incorrect2').innerHTML = "Incorrect username or password.";
        document.getElementById('incorrect2').style.color = "red";
    }
}

function checkUsername(){
    clearTimeout(debounce);
    if (validateUsername()) {
        debounce = setTimeout(function () {
            checkUniqueUsername();
        }, 500);
    } else{
        //set border to red
        document.getElementById('uname').style.border = "2px solid red";
        // TODO: add message below input box saying username is invalid can only characters, numbers, and underscores (red)
        document.getElementById('invalid3').style.display = "block";
        document.getElementById('invalid3').src = "../../assets/icons8-warning-67-red.png";
        document.getElementById('incorrect3').style.display = "block";
        document.getElementById('incorrect3').innerHTML = "Incorrect username or password.";
        document.getElementById('incorrect3').style.color = "red";
    }
}

function checkUniqueUsername(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200 ){
            let res = JSON.parse(this.responseText);
            // console.log(res)
            if(res['status']){
                //set border to #1ED760
                document.getElementById('uname').style.border = "2px solid #1ED760";
                //TODO: add message below input box saying email is available (#1ED760)
                document.getElementById('invalid3').style.display = "block";
                document.getElementById('invalid3').src = "../../assets/icons8-checkmark-52.png";
                document.getElementById('incorrect3').style.display = "block";
                document.getElementById('incorrect3').innerHTML = "Username is available.";
                document.getElementById('incorrect3').style.color = "#1ED760";
                usernameValid = true;
            }
            else{
                //set border to red
                document.getElementById('uname').style.border = "2px solid red";
                //TODO: add message below input box saying email is taken (red)
                document.getElementById('invalid3').style.display = "block";
                document.getElementById('invalid3').src = "../../assets/icons8-warning-67-red.png";
                document.getElementById('incorrect3').style.display = "block";
                document.getElementById('incorrect3').innerHTML = "Incorrect username or password.";
                document.getElementById('incorrect3').style.color = "red";
                usernameValid = false;
            }
        }
    };
    let username = document.getElementById("uname").value
    xhttp.open("GET","http://localhost:8000/api/register/checkusername?username="+username,true)
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send();
}

function register(){
    if (emailValid && usernameValid && validateUsername && document.getElementById("email").value == document.getElementById("emailconfirm").value) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState==4){
                if(this.status==200){
                    let res = JSON.parse(this.responseText);
                    // console.log(res)
                    if(res['status']){
                        // console.log("register success");
                        // window.location.href = "http://localhost:8080/pages/login/login.html";
                        // TODO: tell user that they have successfully registered + redirect to login page
                        // redirect page shows a message saying that they have successfully registered
                        login(document.getElementById("email").value, document.getElementById("password").value);
                    }
                    else{
                        // console.log("register failed");
                        // TOOD : tell user that they have failed to register
                        failInfo();
                    }
                }
                else{
                    // console.log("register failed");
                    // TOOD : tell user that they have failed to register
                    failInfo();
                }
            }
        };
        let data = {
            "username": document.getElementById("uname").value,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value,
        }
        xhttp.open("POST","http://localhost:8000/api/register",false);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.withCredentials = true;
        xhttp.send(JSON.stringify(data));
    }
    else{
        // console.log("register failed");
        // TODO : tell user that they have failed to register since they have not filled out the form correctly
        failInfo();
    }
}

function login(email, password){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4){
            if(this.status==200){
                let res = JSON.parse(this.responseText);
                // console.log(res)
                if(res['status']){
                    // console.log("login success");
                    window.location = "http://localhost:8080/pages/home/home.html";
                }
                else{
                    // console.log("login failed");
                    failInfo();
                }
            }
            else{
                // console.log("login failed");
                failInfo();
            }
        }
    };
    let data = {
        "email": email,
        "password": password,
    };
    xhttp.open("POST","http://localhost:8000/api/auth/login",true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(data));
}

function validateUsername() {
    let username = document.getElementById("uname").value;
    return username.match(/^[a-zA-Z0-9_]+$/);
}

function failInfo(){
    var mainContainer = document.getElementById("failPrompt")
    mainContainer.innerHTML +=  '<div class="loginFail"> \
                                    <img src="../../assets/icons8-warning-67.png" /> \
                                    <div class="incorrectUnamePass">Fail to Register.</div> \
                                </div>';
    mainContainer.style.width = "100%";
    mainContainer.style.display = "flex";
    mainContainer.style.justifyContent = "center";
    mainContainer.style.alignItems = "center";
    mainContainer.style.flexDirection = "row";
    mainContainer.style.flexWrap = "nowrap";
};