var groups = document.getElementById("groups");
//groups.addEventListener("click",func);
function selectGroup(groupname,groupsize,memberType,numberOfGoals){
    console.log(groupname);
    console.log(groupsize);
    console.log(memberType);
    console.log(numberOfGoals)
}
var groupname = "name";
var membersSize = 10;
var memberType = "Admin";
var numOfGoals = 5;

groups.innerHTML = `<div ><h1 id="divsID" onclick=selectGroup(`+"5" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>Group Name: `+groupname+` Number of Members: `+membersSize+` >  `+memberType+` Number of Group Goals `+numOfGoals+`  </h1></div> <br>`
groups.innerHTML += `<div> <br> <h1 id="divsID" onclick=selectGroup(`+"4" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>Group Name: `+4+` Number of Members: `+membersSize+` >  `+memberType+` Number of Group Goals `+numOfGoals+`  </h1> </div>`
groups.innerHTML += `<br> <h1 id="divsID" onclick=selectGroup(`+"3" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>Group Name: `+3+` Number of Members: `+membersSize+` >  `+memberType+` Number of Group Goals `+numOfGoals+`  </h1>`
groups.innerHTML += `<br> <h1 id="divsID" onclick=selectGroup(`+"2" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>Group Name: `+2+` Number of Members: `+membersSize+` >  `+memberType+` Number of Group Goals `+numOfGoals+`  </h1>`
groups.innerHTML += `<br> <h1 id="divsID" onclick=selectGroup(`+"1" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>Group Name: `+1+` Number of Members: `+membersSize+` >  `+memberType+` Number of Group Goals `+numOfGoals+`  </h1>`
// //form request of groups from backend
//     let data = {
// 		type: "group-request",
// 		content: {
// 		}
// 	};

// 	dataRequest(data, responseHandler);

// 	function responseHandler(response) {
// 		if (response.status != 200) {
// 			console.log(response.content)
// 		}for(let group of response.content){
//             groups.innerHTML = `Group Name: `+group['groupname']+` Number of Members: `+group['membersSize']+` >  `+group['memberType']+` Number of Group Goals`+group["numberGoals"]+` `
//     }
// 	}

function getUserGroups()
//this get all the groups that the user is in
{
    data = {
        type: "user-request",
        content: {requestKeys:["groups"]}
    }

    dataRequest(data, requestGroupInformation)
}

function requestGroupInformation(data)
//this loops through all the groups the user is in and requests data
//it should then call the display group function
{
    if(data.status != 200)
    {
        console.log(data);
    }
    else
    {
        if(data.content.groups.length === 0)
        {
            console.log("No Groups")
        }
        else
        {
            console.log(data.content);
            for(let group of data.content.groups)
            {
                data = {
                    type: "group-request",
                    content: data.content[group]
                }
                console.log(data);
                //dataRequest(data, displayGroup)
            }
        }
    }
}

function displayGroup(data)
{
    //this function should get the group data then paste it to a div
    //this div should have all of drop downs
    //this function will create a goal dropdown in this div
    //also leave a space for the group goals
}

getUserGroups();