
const form = document.getElementById("fSignUp");
form.addEventListener("submit", signUp);

const inpUsername = document.getElementById("username");
const inpEmail = document.getElementById("email");
const inpPasswordConfirm = document.getElementById("passwordConfirm");

inpUsername.onchange = () => {
    inpUsername.setCustomValidity("");
    inpUsername.reportValidity();
}

inpEmail.onchange = () => {
    inpEmail.setCustomValidity("");
    inpEmail.reportValidity();
}

inpPasswordConfirm.onchange = () => {
    inpPasswordConfirm.setCustomValidity("");
    inpPasswordConfirm.reportValidity();
}

function signUp()
{
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = inpUsername.value;
    const email = inpEmail.value;
    const password = document.getElementById("password").value;
    const passwordConfirm = inpPasswordConfirm.value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;
    const bmi = document.getElementById("bmi").value;

    if (password != passwordConfirm)
    {
        //tell user theyre a dummy
        inpPasswordConfirm.setCustomValidity("Passwords do not match");
        inpPasswordConfirm.reportValidity();
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
        //awkward but have to do it like this to work with the auto redirect, cant just use makeRequest in dataInteraction
        response.json().then(displaySignupFailMessage);
    }
}

function displaySignupFailMessage(content)
{
    if (content.type === "username")
    {
        inpUsername.setCustomValidity(content.message);
        inpUsername.reportValidity();
    }
    else if (content.type === "email")
    {
        inpEmail.setCustomValidity(content.message);
        inpEmail.reportValidity();
    }
    else
    {
        //something bork
        console.log(content);
    }
}