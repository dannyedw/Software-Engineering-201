var groupss = document.getElementById("groups");
//groups.addEventListener("click",func);
function selectGroup(groupname,groupsize,memberType,numberOfGoals){
    console.log(groupname);
    console.log(groupsize);
    console.log(memberType);
    console.log(numberOfGoals)
}

var groupname = "name";
groupname = groupname.charAt(0).toUpperCase() + groupname.slice(1);
var membersSize = 10;
var memberType = "Admin";
var numOfGoals = 5;

// groupss.innerHTML = `<div><h1 id="divsID" class='collapsible'>` + groupname + `:` + ` Members: `+membersSize+` ` + ` Group Goals: `+numOfGoals+`</h1>
// <div class='content'><div id="membersDiv"> Members </div> <div id = "groupGoalsDiv"> Group Goals </div> </div> </div> <br>`;
//groups.innerHTML += `<div><h1 id="divsID" class='collapsible' onclick=selectGroup(`+"2" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>` + groupname + `:` + ` Members: `+membersSize+` ` + ` Group Goals: `+numOfGoals+`  </h1></div></div>`;



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
    groupIncrement = 0;
    console.log(data.content);
    for(var key in data.content)
        {
            group = data.content[key]

            console.log(key)
            //if(key===USERNAME)

            groupss.innerHTML += `<div><h1 id="divsID" class='collapsible'>` + key + `:` + ` Members: `+group.members.length+` ` + ` Group Goals: `+10+`</h1>
            <div class='content'><div id="membersDiv"> Members </div> <div id = "groupGoalsDiv"> Group Goals </div> </div> </div> <br>`;
            var membersSection = document.getElementById("membersDiv"); 
            var groupGoalsSection = document.getElementById("groupGoalsDiv");       
            membersSection.innerHTML = `<p>this is the members section</p>`;
        }
    

    //this function should get the group data then paste it to a div
    //this div should have all of drop downs
    //this function will create a goal dropdown in this div
    //also leave a space for the group goals
    //if user is admin have delete button for members
}

dataTest = {"content": {
    DannyGsgroup: {
        owner: "DannyGee",
        description: " fsfsfs",
        members: ["alexf13"]
    },
    DannyGsgroup2: {
        owner: "DannyGee2",
        description: "info",
        members: ["someotheruser","someotheruser2"]
    }
}}
// getUserGroups(data);

displayGroup(dataTest);

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    console.log("clicking")
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}