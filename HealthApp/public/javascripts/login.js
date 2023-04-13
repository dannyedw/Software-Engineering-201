
const form = document.getElementById("fLogin");
form.addEventListener("submit", login);


function login()
{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let data = {
        type: "user-login",
        content: {
            username: username,
            password: password
        }
    };

    const url = "/login";
    const requestOptions = {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url, requestOptions).then(responseHandler);
}

function responseHandler(response)
{
    if (response.status === 200)
    {
        window.location.href = response.url;
    }
    else
    {
        console.log(response.json());
    }
}