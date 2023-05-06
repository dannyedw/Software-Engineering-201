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
            <div class='content'><div class='groupDivs'id="` + key + "-info" + `"> Members <br> <input type="text" id="addingMember" placeholder="Enter Member"><button type="button" id="addMember" onclick="addMember('${currentGroup},${key + "-info"}')">Add Member</button> <br></div>
            <div class='groupDivs' id = "` + key + "-goals" + `"> Group Goals </div><br>
            <button type="button" id="description" onclick="DisplayDescription('${currentGroup.description}');">Description</button><br>
            <button type="button" id="LeaveGroupButton" onclick="LeavegGroup('${key}');">LeaveGroup</button> </div></div>`;

            var membersSection = document.getElementById(key + "-info"); 
            var groupGoalsSection = document.getElementById(key + "-goals");    

            displayGroupInfo(currentGroup, key + "-info")
            displayGroupGoals(currentGroup, key + "-goals")

            for (var i = 0; i < coll.length; i++){
                coll[i].addEventListener("click", function() {
                  this.classList.toggle("active");
                  var content = this.nextElementSibling;
                  if(content.style.maxHeight){
                    content.style.maxHeight = null;
                  }else{
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

    for (var i = 0; i < data.members.length; i++) {
        var member = data.members[i]
      
        container.innerHTML += member+'<button id=somebutton type=button onclick="removeMember(\'' +i+ '\',\'' +data.members +'\',\'' +divId +'\')">remove</button><br>';
    
    }
    // container.innerHTML += '<br><br><input type=text id=membername placeholder=Member Name>';
    // var name = document.getElementById("membername").value
    // console.log(name)
    // container.innerHTML += '<button onclick=addMember("+name+ '\',\'' +data+"); type='button'> Add </button>';
}

function addMember(data,divId){
    data = data.split(',')
    console.log(data)
    var member = document.getElementById("addingMember").value;
    data.push(member)
    container = document.getElementById(divId);
    container.innerHTML = "";
    
    for (var i = 0; i < data.members.length; i++) {
        var member = data[i]
      
        container.innerHTML += member+'<button id=somebutton type=button onclick="removeMember(\'' +i+ '\',\'' +data.members +'\',\'' +divId +'\')">remove</button><br>';
    
    }
}
function removeMember(member,data,div){
    data = data.split(',')
  
    // removes user from server
    // data ={
    //     type:"remove-user",
    //     content:{
    //         username:"USERNAME"
    //     }
    // }
    // dataRequest(data,removeMemberHandler)
    // function removeMemberHandler(response){
    //     if(response.status !=200){
    //         console.log(response.content)
    //     }
    // }
 
    container = document.getElementById(div);
    if(data.length == 1){
        data.pop[0];
        data.shift();
        container.innerHTML="";
    }else{
        const temp = data[member];
        data[member] = data[0];
        data[0] = temp;
        data.pop[0];
        
        data.shift()
        console.log(data)
        container.innerHTML="";
    for (var i = 0; i < data.length; i++) {
        var member = data[i]
        container.innerHTML += member+'<button id=somebutton type=button onclick="removeMember(\'' +member+ '\',\'' +data +'\',\'' +div +'\')">remove</button><br>';
       }
    }
}


const addDescriptionContainer = document.querySelector('#addDescriptionContainer');
function DisplayDescription(description){
    console.log(description);
    overlay.style.display = "block";
	addDescriptionContainer.style.display = "block";
    var descritpionInfo = document.getElementById("descriptionInfo");
    descritpionInfo.innerHTML = ``+description+``;
    const removeDescriptionContainer = document.querySelector('#exitButtonDescription');
    removeDescriptionContainer.addEventListener("click",function(){
    overlay.style.display = "none";
	addDescriptionContainer.style.display = "none";
    })
}

function LeavegGroup(groupName){
    console.log("leaving group:"+groupName);
     // removes user from server
    // data ={
    //     type:"group-delete",
    //     content:{
    //         groupname:groupName
    //     }
    // }
    // dataRequest(data,leaveGroupHandler)
    // function leaveGroupHandler(response){
    //     if(response.status !=200){
    //         console.log(response.content)
    //     }
    // }
}


function displayGroupGoals(data, divId)
{
    container = document.getElementById(divId);
    container.innerHTML = `<p>Hello goals here</p>`
}

requestGroupInformation()



var coll = document.getElementsByClassName("collapsible");
