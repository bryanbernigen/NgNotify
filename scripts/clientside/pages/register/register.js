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
            console.log(res)
            if(res['status']){
                //set border to green
                document.getElementById('email').style.border = "2px solid green";
                //TODO: add message below input box saying email is available (green)
                emailValid = true;
            }
            else{
                //set border to red
                document.getElementById('email').style.border = "2px solid red";
                //TODO: add message below input box saying email is taken (red)
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
        //set border to green
        document.getElementById('emailconfirm').style.border = "2px solid green";
    }
    else{
        //set border to red
        document.getElementById('emailconfirm').style.border = "2px solid red";
        // TOOD: add message below input box saying email is not the same (red)
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
    }
}

function checkUniqueUsername(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200 ){
            let res = JSON.parse(this.responseText);
            console.log(res)
            if(res['status']){
                //set border to green
                document.getElementById('uname').style.border = "2px solid green";
                //TODO: add message below input box saying email is available (green)
                usernameValid = true;
            }
            else{
                //set border to red
                document.getElementById('uname').style.border = "2px solid red";
                //TODO: add message below input box saying email is taken (red)
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
                    console.log(res)
                    if(res['status']){
                        console.log("register success");
                        window.location.href = "http://localhost:8080/pages/login/login.html";
                        // TODO: tell user that they have successfully registered + redirect to login page
                        // redirect page shows a message saying that they have successfully registered
                    }
                    else{
                        console.log("register failed");
                        // TOOD : tell user that they have failed to register
                    }
                }
                else{
                    console.log("register failed");
                    // TOOD : tell user that they have failed to register
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
        console.log("register failed");
        // TODO : tell user that they have failed to register since they have not filled out the form correctly
    }
}

function validateUsername() {
    let username = document.getElementById("uname").value;
    return username.match(/^[a-zA-Z0-9_]+$/);
}