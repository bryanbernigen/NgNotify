userList = [
    {
        "user_id": 1,
        "email": "hai@gmail.com",
        "password": "123456",
        "username": "hai",
        "isAdmin": false,
    },
    {
        "user_id": 1,
        "email": "hai@gmail.com",
        "password": "123456",
        "username": "hai",
        "isAdmin": false,
    },
    {
        "user_id": 1,
        "email": "hai@gmail.com",
        "password": "123456",
        "username": "hai",
        "isAdmin": false,
    },
]

function appendData(jsonData) {
    var divContainer = document.getElementById("userTable");

    //columns to be displayed
    let displayColumns = ['user_id', 'email', "password", "username", "isAdmin"];
    
    //Create table header
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    for (let i = 0; i < displayColumns.length; i++) {
        let th = document.createElement('th');
        th.innerHTML = displayColumns[i];
        th.style.color = "#ffffff";
        th.style.fontFamily = "CircularStd-Light";
        th.style.fontSize = "16px";
        th.style.textAlign = "center";
        th.style.padding = "10px";
        th.style.borderBottom = "2px solid #ffffff";
        tr.appendChild(th);
    }
    table.style.borderCollapse = "collapse";
    table.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    table.style.width = "75vw";
    table.style.margin = "auto";
    table.appendChild(tr);

    //Create table body
    for (let i = 0; i < jsonData.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < displayColumns.length; j++) {
            let td = document.createElement('td');
            td.innerHTML = jsonData[i][displayColumns[j]];
            td.style.color = "#ffffff";
            td.style.fontFamily = "CircularStd-Light";
            td.style.fontSize = "14px";
            td.style.textAlign= "left";
            td.style.borderBottom = "1px solid #ffffff";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    divContainer.appendChild(table);

    return divContainer;
}