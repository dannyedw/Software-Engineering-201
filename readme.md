
# Software Engineering 2.01 Health App
## Sever Interaction
The server responds to GET and POST requests on relevant routes. This can easily be changed and updated, but here's how it currently works:
Upon logging in, the server will send a "super secret" loginID number which is used when making requests to the server which require being logged in (anything to do with groups, editing user info etc.). The loginID should be stored so it can be accessed again later, the likely best place would be in session storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

Here is an example of asking the server for a user's details.
First, we need to be logged in and have the loginID. Then we need to form a JSON object with the appropriate data (see further down for the names of all the user data fields):
```
const requestBody = {
    loginID: loginID,   //required to verify the user's access to the data
    username: alexf13,  //the user we want the data about
    data: [             //the items of data we want about the user
        "firstName",
        "lastName",
        "weight"
    ]
};

const url = "/userDashboard/data";  //an example, will probably add a route for just getting data unrelated to any specific page
const requestOptions = {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
};

fetch(url, requestOptions).then((response) => {
    //handle response here, can also replace this anonymous function with a pointer to an existing one, the response parameter will need to be in that function
    //as an example, just blast the response in the user's face
    let responseData = response.json();
    alert(responseData);
    /*
    response would look something like
    {
        "firstName": "Alex",
        "lastName": "Faulkner",
        "weight": "none of your business"
    }
    */
});
```
A few important things to note:
* in the body of the requestOptions, we need to "stringify" the object containing the data we want to send
* the response object is returned as an output stream, we need to convert it into a JSON object to be able to read from it
* most of this can be abstracted away into a function for making a request to the server, with the type (GET or POST) and the data being specified as parameters

I have set the server to provide hopefully useful response details, which will appear in the browser console (F12) automatically. You can expand the errors to view the message.

### User data parameters, case sensitive:
* loginID
* username
* firstName
* lastName
* password
* height
* weight
* bmi
* age

### Group data parameters:
* to be implemented later