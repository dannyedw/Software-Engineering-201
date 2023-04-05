
const form = document.getElementById("fSignUp");
form.addEventListener("submit", signUp);


function signUp()
{
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;
    const bmi = document.getElementById("bmi").value;

    if (password != passwordConfirm)
    {
        //tell user theyre a dummy
        alert("passwords do not match");
        return;
    }

    let data = {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
    };

    if (height != "") data.height = height;
    if (weight != "") data.weight = weight;
    if (age != "") data.age = age;
    if (bmi != "") data.bmi = bmi;

    console.log(data);

    fetch("/signUp",
    { method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        console.log(response.json());
    });
}