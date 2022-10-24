const login = async () => {
    event.preventDefault();
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    const response = await fetch("http://localhost:8000/api/auth/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email": email, "password": password}),
    });
    if (!response.ok){
        failInfo();
        return;
    }
    else {
        result = await response.json();
        console.log('success'); // login success
        if (result.status == false){
            failInfo();
        }
        else{
            window.location = "http://localhost:8080/pages/home/home.html";
            console.log(result.data);
        }
        
    }
};

function failInfo(){
    var mainContainer = document.getElementById("failprompt");
    let div = document.createElement("div");
    div.innerHTML +=    '<div class="loginFail"> \
                            <img src="../../assets/icons8-warning-67.png" /> \
                            <div class="incorrectUnamePass">Incorrect username or password.</div> \
                        </div>';
    mainContainer.appendChild(div);
};