var groups = document.getElementById("groups");

function getAndFormatCurrentDate() {

    //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date- reference - For the date min and max value 
    //https://www.w3resource.com/javascript-exercises/javascript-date-exercise-2.php- Reference - helping form the yyyy-mm-dd format

	const CurrentDate = new Date();
	var year = CurrentDate.getFullYear();
	var month = CurrentDate.getMonth() + 1;
	var day = CurrentDate.getDate();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	
	return year + "-" + month + "-" + day;
}

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
        groups.innerHTML = ``;
        if(Object.keys(data.content).length === 0)
        {
            groups.innerHTML = `<h2>You are in no groups</h2>`;
        }
        else
        {
            for(let key in data.content)
        {
            currentGroup = data.content[key];
            div = key + "-info";
            let classForGoalAmount = key + "-goalAmount"
            groups.innerHTML += `<div><h1 id="divsID" class='collapsible ` + classForGoalAmount + `'>` + key + `:` + ` Members: `+(parseInt(currentGroup.members.length) + 1)+` ` + ` Group Goals: ?</h1>
            <div class='content'><div class='groupDivs'id="` + key + "-info" + `"> <h1>Members</h1><br>` + '<input type="text" id="addingMember'+div+
            '" placeholder="Enter Member here"> <button type="button" id="addMemberButton" onclick="addMember(\'' + div + '\' , \'' + key + '\')">Add Member</button></div>' +
            `<div class='groupDivs' id = "` + key + "-goals" + `"></div><br>
            <div id ="descLeaveGroupButtonContainer"><button type="button" id="description" onclick="DisplayDescription('${currentGroup.description}');">Description</button>
            <button type="button" id="LeaveGroupButton" onclick="LeaveGroup('${key}');">Leave Group</button></div> </div></div>`;

            var membersSection = document.getElementById(key + "-info"); 
            var groupGoalsSection = document.getElementById(key + "-goals");    

            displayGroupInfo(currentGroup, key + "-info", key)

            let groupReqData = {
                type: "group-goal-request",
                content: {
                    date: getAndFormatCurrentDate(),
                    groupName: key
                }
            }
            dataRequest(groupReqData, displayGroupGoals);

            //Reference for collapsible JS: https://www.w3schools.com/howto/howto_js_collapsible.asp
            //Reference for collapsible https://www.w3schools.com/howto/howto_js_collapsible.asp
            for (var i = 0; i < coll.length; i++) {
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


function displayGroupInfo(data, divId, groupName)
{
    container = document.getElementById(divId);
    container.innerHTML += '<div id = "memberContainer"><p>'+ data.owner +' 👑 </p></div>';
    for (var i = 0; i < data.members.length; i++) {
        var member = data.members[i]
        if(USERNAME === data.owner){
            container.innerHTML += '<div id = "memberContainer"><p>'+ member +'</p><button id="removeMemberButton" type=button onclick="removeMember(this, \'' +member + '\', \'' + groupName + '\')">Remove</button></div>'
        }else{
            container.innerHTML += '<div id = "memberContainer"><p>'+ member +'</p></div>'
        }  
    }
}

function addMember(divId, group){
    
    var newMember = document.getElementById("addingMember"+divId).value;


    //adds user to server
    data ={
        type:"group-invite",
        content:{
            groupname: group,
            usernameToAdd: newMember,
        }
    }
    dataRequest(data,addMemberHandler)
    function addMemberHandler(response){
        if(response.status !=200){
            console.log(response.content)
        }
    }
 
}

function removeMember(r,member, groupname){
    //parentDiv in this case would be <div id = "memberContainer"></div>
    let parentDiv = r.parentNode;
    parentDiv.remove();
  
    //removes user from server
    data ={
        type:"group-remove-member",
        content:{
            groupname: groupname,
            memberToRemove: member
        }
    }
    dataRequest(data,removeMemberHandler)
    function removeMemberHandler(response){
        console.log(response.content)

        if(response.status !=200){
        }
    }

}

const addDescriptionContainer = document.querySelector('#addDescriptionContainer');
function DisplayDescription(description){
    console.log(description);
    overlay.style.display = "block";
	addDescriptionContainer.style.display = "block";
    var descritpionInfo = document.getElementById("descriptionInfo");
    descritpionInfo.innerHTML = `<p>`+description+`</p>`;
    const removeDescriptionContainer = document.querySelector('#exitButtonDescription');
    removeDescriptionContainer.addEventListener("click",function(){
    overlay.style.display = "none";
	addDescriptionContainer.style.display = "none";
    })
}

function LeaveGroup(groupName){
    console.log("leaving group:"+groupName);

    data ={
        type:"group-remove-member",
        content:{
            groupname: groupName,
            memberToRemove: USERNAME
        }
    }
    dataRequest(data,removeMemberHandler)
    function removeMemberHandler(response){
        console.log(response.content)
        if(response.status !=200){
        }
    }
}

function displayGroupGoals(data)
{
    // let key = Object.keys(data.content)[0];
    let key = data.content.groupName
    let container = document.getElementById(key + '-goals')

    container.innerHTML = "";

    const h1 = document.createElement("h1");
    const textNode = document.createTextNode("Group Goals");
    h1.appendChild(textNode);
    container.appendChild(h1);

    let groupSummary = document.querySelectorAll("." + key + "-goalAmount")[0];
    let groupSummaryText = groupSummary.textContent;
    groupSummary.innerHTML = groupSummaryText.replace("?", data.content.goals.length);

    if(data.content.goals.length === 0)
    {
        container.innerHTML = `<h1>Group Goals</h1><p id ='noGroupGoalInfo'>No Goals to Show</p>`;
    }
    else
    {
        goals = data.content.goals;
        // console.log(goals);
        // console.log(key + " goals: ")
        var minDaysRemaining = 11;
        for (let i = 0; i < goals.length; i++)
        {
            currentGoal = goals[i];
            // /START    CREATE POPUP TO GET USER DATA THEN PUT IN SERVER AND UPDATE PAGE (update done by error reporter if used)
            var goal = document.createElement("p");
            var userIndex = currentGoal.users.indexOf(USERNAME)
            let friendGoalProgress = "";
            for(let j = 0; j < currentGoal.users.length; j++)
            {
                if(j != userIndex)
                {
                    friendGoalProgress = friendGoalProgress + currentGoal.users[j] + " - " + currentGoal.status[j] + "    ";
                }
            }

				if (currentGoal.type == "weight") {
					var goalProgress = ((weight - currentGoal.extraData[0][userIndex]) / (currentGoal.extraData[1] - currentGoal.extraData[0][userIndex])) * 100;
					if (currentGoal.status[userIndex] != "In Progress") {
						goal.innerHTML = "<p id ='groupGoalInfo'>Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: " + currentGoal.status[userIndex] + 
							 `<br> Friends Progress: ` + friendGoalProgress + "</p>";
					}
					else if (goalProgress >= 100) {
						data = {
							type: "group-goal-update",
							content: { goalId: currentGoal.goalId, status: "Goal Completed Successfully", groupName: key}
						};
						dataRequest(data, errorReporter);

                        goalProgress = 100;
						goal.innerHTML = "<p id ='groupGoalInfo'>Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: Goal Completed Successfully" + 
							+ "| Progress: " + currentGoal.extraData[0][userIndex] + ` <progress value="` + goalProgress + `" max="100"></progress> ` + currentGoal.extraData[1] +
							" " + `<br> Friends Progress: ` + friendGoalProgress + "</p>";

                        //SEND EMAIL FOR SUCCESSFUL GOAL COMPLETION
						//pass and archive/update goal

					}
					else if (currentGoal.endDate == getAndFormatCurrentDate()) {
						data = {
							type: "group-goal-update",
							content: { goalId: currentGoal.goalId, status: "Goal Failed", groupName: key}
						};
						dataRequest(data, errorReporter);

                        goal.innerHTML = "<p id ='groupGoalInfo'>Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: Goal Failed" + 
							 + " " + `<br> Friends Progress: ` + friendGoalProgress + "</p>";
						//fail and archive/update goal
					}
					else {
						daysRemaining = calculateRemaining(getAndFormatCurrentDate(),currentGoal.endDate);
						if(daysRemaining <= 10 && daysRemaining < minDaysRemaining)
						{
							minDaysRemaining = daysRemaining;
						}
                        let leaveGoalFuncton = `onclick = "leaveGoal('` + key + `',` + currentGoal.goalId + `)"`;

						goal.innerHTML = "<p id ='groupGoalInfo'>Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: " + currentGoal.status[userIndex]
							+ " | Days Remaining: " + daysRemaining +"| Progress: " + currentGoal.extraData[0][userIndex] + ` <progress value="` + goalProgress + `" max="100"></progress> ` + currentGoal.extraData[1] +
							" " + `<button type='button'  ` + leaveGoalFuncton + `id='leaveGoalButton' style ='margin: 5px 0'>Leave</button><br> Friends Progress: ` + friendGoalProgress;
					}
				}
				else {
					//other goal types will need to implement the alert minimum days
					console.log("not implemented yet");
				}
				container.appendChild(goal);
				if(minDaysRemaining === 1 && userDeadlineAlert === false)
				{
					alert(key + ": You have a goal deadline in " + minDaysRemaining + " day!");
					userDeadlineAlert = true;
				}
				else if(minDaysRemaining < 11 && userDeadlineAlert === false)
				{
					alert(key + ": You have a goal deadline in " + minDaysRemaining + " days!")
					userDeadlineAlert = true;
				}
        }
    }
    var addGoalButton = document.createElement("p");
    addGoalButton.innerHTML = `<button type='button' id='addGroupGoalButton'  onclick = displayAddGoalPopup('` + key +`')>Add Goal</button>`
    container.appendChild(addGoalButton);
}

function updateGroupSummary(noGoals, groupName)
{
    //iterate through divs and find correct group name?????
    console.log("Update user summary not implemented yet!");
}

function leaveGoal(groupName, goalID)
{
    //leave goal
    data = {
        type: "group-goal-delete-user",
        content: { goalId: goalID, groupName: groupName}
    };
    dataRequest(data, errorReporter);
}

function displayAddGoalPopup(groupName)
{
    groupInPopup = groupName;
    overlay.style.display = "block";
	addGoalContainer.style.display = "block";
    //create goal, send email to everybody and then add them to goal if accepted
}

function errorReporter(data)  //function that basicaly prints the error when put as callback function
{
	if (data.status != 200) {
		console.log(data.content);
	}
	requestGroupInformation(); //updates stuff as this function will wait for the request to finish
}

function saveUserInformation(data)
{
    if (data.status != 200)
    {
        console.log(content);
    }
    else
    {
        //Only weight needed currently
        // console.log(data.content);
        let weightKeys = Object.keys(data.content.weight);
        weight = data.content.weight[weightKeys[weightKeys.length - 1]]
    }
}

function calculateRemaining(current, deadline) {
	//var remain = deadline - current;
	deadline = deadline.split("-");
	current = current.split("-");
	remainingMonths = deadline[1] - current[1];
	remainingDays = deadline[2] - current[2];
	if (remainingMonths > 0) {
		if (remainingMonths == 1 || remainingMonths == 3 || remainingMonths == 5 || remainingMonths == 7 || remainingMonths == 8 || remainingMonths == 10 || remainingMonths == 12) {
			timeRemaining = (remainingMonths * 31) + remainingDays;
			return timeRemaining;
		} else if (remainingMonths == 2) {
			timeRemaining = (remainingMonths * 28) + remainingDays;
			return timeRemaining;
		} else if (remainingMonths == 4 || remainingMonths == 6 || remainingMonths == 9 || remainingMonths == 11) {
			timeRemaining = (remainingMonths * 30) + remainingDays;
			return timeRemaining;
		}
	} else {
		return remainingDays;
	}
}

///goal popup stuff
document.getElementById("exitButtonGoal").addEventListener("click", function () {
    document.getElementById("goalType").value = 'default';
	// document.getElementById("newGoalSuggestion").innerHTML = "";
	goalOutputDiv.innerHTML = "";
	overlay.style.display = "none";
	addGoalContainer.style.display = "none";
})

const goalSelect = document.getElementById("goalType");
const goalOutputDiv = document.getElementById("goalOutput");
const personalGoals = document.getElementById("personalGoals");

let currentDate = getAndFormatCurrentDate();
// if target weight than only 
goalSelect.addEventListener("change", (event) => {
	const selectedDiet = event.target.value;
	let data = "";

	switch (selectedDiet) {
		case "Target Weight":
			data = "<input type='text' id='target-Weight' name='weight' placeholder='Target Weight(KG)' required><br><input type='date' id='goalDate' name='deadline' value=" + currentDate + " min=" + currentDate + " max='2027-04-21'><br>";
			data += "<div id = 'goalFeedbackContainer'></div><input type='submit' id='addPGoal' value='Add Goal'>";
			break;
		default:
			// clear the variations div if no exercise is selected
			goalOutputDiv.innerHTML = "";
			return;
	}
	// update the goal ouput div with the selected exercise's data
	goalOutputDiv.innerHTML = data;


	document.getElementById('addPGoal').addEventListener("click", addingTargetWeight);

	function addingTargetWeight() {
		//next few lines are getting the information for the request
		const targetWeight = document.getElementById("target-Weight").value;
		const targetDate = document.getElementById("goalDate").value;

		var goalType = document.getElementById("goalType").value;
		if (goalType == "Target Weight") {
			goalType = "weight";
		}

		const startDate = getAndFormatCurrentDate();

		// validating that we got the correct values
		// console.log("Type: " + goalType);
		// console.log("startdate: " + startDate);
		// console.log("endDate: " + targetDate);
		// console.log("starting weight: " + startingWeight);
		// console.log("target weight: " + targetWeight);

        let goalFeedbackContainer = document.getElementById('goalFeedbackContainer');

		if(startDate === targetDate)
		{
			goalFeedbackContainer.innerHTML = "Current Date and target date are the same";
			return;
		}

		if(targetWeight === "")
		{
			goalFeedbackContainer.innerHTML = "Please enter a target weight";
			return;
		}

        if(targetWeight === weight)
		{
			goalFeedbackContainer.innerHTML = "Same target weight as current weight";
			return;
		}

		let data = {
            group: groupInPopup,
			type: goalType,
			startDate: startDate,
			endDate: targetDate,
			extraData: [[weight], targetWeight]
		};

		let request = {
			type: "group-goal-create",
			content: data
		};

        console.log(request);
		dataRequest(request, errorReporter);

        document.getElementById("goalType").value = 'default';
        document.getElementById("newGoalSuggestion").innerHTML = "";
        goalOutputDiv.innerHTML = "";
		overlay.style.display = "none";
		addGoalContainer.style.display = "none";
	}

    document.getElementById('addPGoal').addEventListener("click", addingTargetWeight);
});

//end of goal pop uup stuff

let weight = 0
requestGroupInformation()

var userDeadlineAlert = false;
var groupInPopup;

let userInfoReq = {
    type: "user-request",
    content: { requestKeys: ["firstName", "height", "weight", "bmi", "age"] }
};

dataRequest(userInfoReq, saveUserInformation);

var coll = document.getElementsByClassName("collapsible");