
# Software Engineering 2.01 Health App
## Sever Interaction
The server responds to GET and POST requests sent to /data. I have created a somewhat friendly interface to make requests
easier to deal with. It is in the file public/javascripts/dataInteraction.js which will need to be included in the pug
on any page it is accessed, look at the signUp page for an example of how its used. This is the only page to currently
interact with the server.

There are two functions, dataRequest and dataSubmit:
* dataRequest is used when requesting data from the server, e.g. about a user or group.
* dataSubmit is used when sending data to the server for processing, such as signup, login, group creation etc.

Both functions have the same parameters, data and callback. data should be a JSON object containing a "type" and a "content".
"type" is used by the server to figure out what to do with the values in "content". For example, here is the data for a
signup request:
```
let data = {
    type: "user-signup",
    content: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    }
};
```
callback is the function the result of the request is sent to. The result will contain a status number which can be used
to identify if the request was a success, along with content which will be either a message with information about the
success/failure of a request, or the data which was requested. This will be specific to the request type, for example user
signup just sends back a message saying either the signup was successful, or a reason why it wasn't (e.g. username taken).
user-data-request will return a JSON with fields corresponding to those requested, e.g. in the request data you have
["firstName", "lastName"], the response content will look something like
```
{
    "firstName": alex,
    "lastName": faulkner
}
```

### Valid dataRequest types
* user
* group (not yet implemented)

### Valid dataSubmit types
* user-login
* user-signup
* user-update
* group-create (not yet implemented)
* group-delete (not yet implemented)

### User data parameters:
* loginID*
* username*
* firstName
* lastName
* password*
* height
* weight
* bmi
* age

*these values cannot be requested with a data request (because we wouldn't want to compromise the security of our plaintext
json database storing everything unencrypted now would we)

### Group data parameters:
* not yet implemented