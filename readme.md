
# Software Engineering 2.01 Health App
## Sever Interaction
The server responds to GET and POST requests sent to /data. I have created a somewhat friendly interface to make requests
easier to deal with. It is in the file public/javascripts/dataInteraction.js which will need to be included in the pug
on any page it is accessed.

There are two functions, dataRequest and dataSubmit:
* dataRequest is used when requesting data from the server, e.g. about a user or group.
* dataSubmit is used when sending data to the server for processing, such as updating user info, group creation/deletion etc.

Both functions have the same parameters, data and callback.
* data should be a JSON object containing a "type" and a "content"
    * type is used by the server to figure out what to do with the values in "content"
    * content will be specific to the request (for example, an array of strings specifying the user data fields being requested)
* callback is the function the result of the request is sent to.

The result will contain a status number which can be used to identify if the request was a success, along with content
which will be either a message with information about the success/failure of a request, or the data which was requested.
This will be specific to the request type, for example a GET with type "user" will return a JSON with fields corresponding
to those requested, e.g. in the request data you have ["firstName", "lastName"], the response content will look something like
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
* user-update
* group-create (not yet implemented)
* group-delete (not yet implemented)

### User data parameters:
* username*
* firstName
* lastName
* password*
* height
* weight
* bmi
* age

*username cannot be requested as it is used as the index for the user data, and must already be known to be logged in and
able to request data (the user can currently only request data about themself. when groups are added, i will add
functionality for requesting info about other group members to display the're name for example). password can't be
requested because security (ignore the fact that the database is a plaintext json file).

### Group data parameters:
* not yet implemented