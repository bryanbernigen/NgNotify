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
        return;
    }
    console.log('success');// login success
    const result = await response.json();
    console.log(result);
    
};