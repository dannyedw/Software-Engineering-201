var groups = document.getElementById("groups");
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

let newDiv = document.createElement("div");


groups.innerHTML = `<div><h1 id="divsID" class='collapsible'>` + groupname + `:` + ` Members: `+membersSize+` ` + ` Group Goals: `+numOfGoals+`</h1>
<div class='content'><p> sadnasfasfasfasf </p> </div> </div>`;
//groups.innerHTML += `<div><h1 id="divsID" class='collapsible' onclick=selectGroup(`+"2" + ","+"membersSize"+","+"memberType"+","+"numOfGoals"+`);>` + groupname + `:` + ` Members: `+membersSize+` ` + ` Group Goals: `+numOfGoals+`  </h1></div></div>`;

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
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