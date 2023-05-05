var groups = document.getElementById("groups");

function requestGroupInformation()
//this loops through all the groups the user is in and requests data
//it should then call the display group function
{
    data = {
        type: "group-request",
        content:{}
    }
    dataRequest(data, displayGroup)
}

function displayGroup(data)
{
    if (data.status != 200)
    {
        console.log(data.content)
    }
    else
    {
        if(Object.keys(data.content).length === 0)
        {
            console.log("No Groups");
        }
        else
        {
            for(let key in data.content)
        {
            currentGroup = data.content[key];

            groups.innerHTML += `<div><h1 id="divsID" class='collapsible'>` + key + `:` + ` Members: `+currentGroup.members.length+` ` + ` Group Goals: `+10+`</h1>
            <div class='content'><div class='groupDivs'id="` + key + "-info" + `"> Members<br> </div> <div class='groupDivs' id = "` + key + "-goals" + `"> Group Goals </div> </div> </div> <br>`;

            var membersSection = document.getElementById(key + "-info"); 
            var groupGoalsSection = document.getElementById(key + "-goals");    

            displayGroupInfo(currentGroup, key + "-info")
            displayGroupGoals(currentGroup, key + "-goals")

            for (var i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function() {
                  this.classList.toggle("active");
                  var content = this.nextElementSibling;
                  if (content.style.maxHeight){
                    content.style.maxHeight = null;
                  } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                  }
                });
              }
        }
        }
    }
}


function displayGroupInfo(data, divId)
{
    container = document.getElementById(divId);
    // members=[]
    // for (var i = 0; i < data.members.length; i++) {
    //     var member = data.members[i]
    //     members.push(member)
    // }
    console.log(data)
    for (var i = 0; i < data.members.length; i++) {
        var member = data.members[i]
        container.innerHTML += member+'<button id=somebutton type=button onclick="removeMember(\'' +member+ '\',\'' +data +'\',\'' +divId +'\')">remove</button><br>';
    
    }
    // container.innerHTML += '<br><br><input type=text id=membername placeholder=Member Name>';
    // var name = document.getElementById("membername").value
    // console.log(name)
    // container.innerHTML += '<button onclick=addMember("+name+ '\',\'' +data+"); type='button'> Add </button>';
}

function addMember(member,data){
    console.log(member);
    console.log(data);
    console.log("click")
}
function removeMember(member,data,div){
    // removes user from server
    // data ={
    //     type:"remove-user",
    //     content:{
    //         username:"Username"
    //     }
    // }
    // dataRequest(data,removeMemberHandler)
    // function removeMemberHandler(response){
    //     if(response.status !=200){
    //         console.log(response.content)
    //     }
    // }
    console.log(data)
    // container = document.getElementById(div);
    // var temp = members[member];
    // members[member] = members[0];
    // members[0] = temp;
    // members.pop[0];

    // for (var i = 0; i < data.members.length; i++) {
    //     var member = data.members[i]
    //     console.log(member)
    //     container.innerHTML += member+'<button id=somebutton type=button onclick="removeMember(\'' +member+ '\',\'' +data +'\',\'' +div +'\',\'' +members +'\')">remove</button><br>';
    
    // }


}

function displayGroupGoals(data, divId)
{
    container = document.getElementById(divId);
    //console.log(data);
    container.innerHTML = `<p>Hello goals here</p>`
}

requestGroupInformation()



var coll = document.getElementsByClassName("collapsible");
