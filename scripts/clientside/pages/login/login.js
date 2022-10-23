const login = async () => {
    event.preventDefault();
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    console.log(email);
    const response = await fetch("http://localhost:8000/api/auth/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email": email, "password": password}),
    });
    if (!response.ok){
        console.log('fail');// login fail
        var mainContainer = document.getElementById("albumCards");
        let div = document.createElement("div");
        div.innerHTML +=    '<div class="loginFail"> \
                                <img src="../../assets/icons8-warning-67.png" /> \
                                <div class="incorrectUnamePass">Incorrect username or password.</div> \
                            </div>';
        mainContainer.appendChild(div);
        return;
    }
    else {
        console.log('success'); // login success
        console.log(response);
        window.location = "http://localhost:8080/pages/home/home.html";
    }
};