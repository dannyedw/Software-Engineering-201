
const form = document.getElementById("fSignUp");
form.addEventListener("submit", signUp);

const usernameInUseDiv = document.getElementById("usernameInUseWarning");
const pUsernameInUseWarning = document.createElement("p");
pUsernameInUseWarning.innerHTML = "Username in use";


function signUp()
{
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;
    const bmi = document.getElementById("bmi").value;

    if (password != passwordConfirm)
    {
        //tell user theyre a dummy
        alert("Passwords do not match");
        return;
    }

    let data = {
        type: "user-signup",
        content: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }
    };

    if (height != "") data.content.height = height;
    if (weight != "") data.content.weight = weight;
    if (age != "") data.content.age = age;
    if (bmi != "") data.content.bmi = bmi;

    const url = "/signUp";
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
        usernameInUseDiv.append(pUsernameInUseWarning);
    }

    /*
    if(response.status === 403)
    {
        
    } */
}
