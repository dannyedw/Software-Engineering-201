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