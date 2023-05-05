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
            <div class='content'><div class='groupDivs'id="` + key + "-info" + `"> Members </div> <div class='groupDivs' id = "` + key + "-goals" + `"> Group Goals </div> </div> </div> <br>`;

            var membersSection = document.getElementById(key + "-info"); 
            var groupGoalsSection = document.getElementById(key + "-goals");    

            displayGroupInfo(currentGroup, key + "-info")
            displayGroupGoals(currentGroup, key + "-goals")

            for (var i = 0; i < coll.length; i++) {
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
        }
        }
    }
}

function displayGroupInfo(data, divId)
{
    container = document.getElementById(divId);
    console.log(data);
    container.innerHTML = `<p>Hello info here</p>`
}

function displayGroupGoals(data, divId)
{
    container = document.getElementById(divId);
    console.log(data);
    container.innerHTML = `<p>Hello goals here</p>`
}

requestGroupInformation()



var coll = document.getElementsByClassName("collapsible");
