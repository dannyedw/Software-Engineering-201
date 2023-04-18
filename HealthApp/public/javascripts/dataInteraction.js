
function dataRequest(data, callback)
{
    const url = "/data";
    const requestOptions = {
        method: 'POST', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    let req = new Request(url, requestOptions);
    makeRequest(req, callback);
}

function makeRequest(req, callback)
{
    fetch(req)
    .then((response) => {
        try
        {
            response.json().then((result) => callback(result));
        }
        catch
        {
            let result = { error: "Unable to parse response", response: response };
            callback(result);
        }
    });
}