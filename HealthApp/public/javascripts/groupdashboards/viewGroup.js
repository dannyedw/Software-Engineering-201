var groups = document.getElementById("groups");

function getAndFormatCurrentDate() {
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
        if(Object.keys(data.content).length === 0)
        {
            console.log("No Groups");
        }
        else
        {
            for(let key in data.content)
        {
            let currentGroup = data.content[key];
            console.log(currentGroup);

            groups.innerHTML += `<div><h1 id="divsID" class='collapsible'>` + key + `:` + ` Members: `+ currentGroup.members.length +` ` + ` Group Goals: `+10+`</h1>
            <div class='content'><div class='groupDivs'id="` + key + "-info" + `"> Members </div> <div class='groupDivs' id = "` + key + "-goals" + `"> Group Goals </div> </div> </div> <br>`;

            var membersSection = document.getElementById(key + "-info"); 
            var groupGoalsSection = document.getElementById(key + "-goals");    

            displayGroupInfo(currentGroup, key + "-info")

            let groupReqData = {
                type: "group-goal-request",
                content: {
                    date: getAndFormatCurrentDate(),
                    groupName: key
                }
            }
            dataRequest(groupReqData, displayGroupGoals);

            for (var i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function() {
                //   console.log("clicking")
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
    // console.log(data);
    container.innerHTML = `<p>Hello info here</p>`
}

function displayGroupGoals(data)
{
    // let key = Object.keys(data.content)[0];
    let key = data.content.groupName
    let container = document.getElementById(key + '-goals')
    container.innerHTML = "";
    if(data.content.goals.length === 0)
    {
        container.innerHTML = `No Goals to Show`
    }
    else
    {
        goals = data.content.goals;
        console.log(key + " goals: ")
        var minDaysRemaining = 11;
        for (let i = 0; i < goals.length; i++)
        {
            currentGoal = goals[i];
            console.log(currentGoal);
            ///START
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
					var goalProgress = ((weight - currentGoal.extraData[0]) / (currentGoal.extraData[1] - currentGoal.extraData[0])) * 100;
					if (currentGoal.status[userIndex] != "In Progress") {
						goal.innerHTML = "Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: " + currentGoal.status[userIndex] + 
							 `<br> Friends Progress: ` + friendGoalProgress;
					}
					else if (goalProgress >= 100) {
						data = {
							type: "group-goal-update",
							content: { goalId: currentGoal.goalId, status: "Goal Completed Successfully", groupName: key}
						};
						dataRequest(data, errorReporter);

                        goalProgress = 100;
						goal.innerHTML = "Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: Goal Completed Successfully" + 
							+ "| Progress: " + currentGoal.extraData[0] + ` <progress value="` + goalProgress + `" max="100"></progress> ` + currentGoal.extraData[1] +
							" " + `<br> Friends Progress: ` + friendGoalProgress;
						//pass and archive/update goal

					}
					else if (currentGoal.endDate == getAndFormatCurrentDate()) {
						data = {
							type: "group-goal-update",
							content: { goalId: currentGoal.goalId, status: "Goal Failed", groupName: key}
						};
						dataRequest(data, errorReporter);

                        goal.innerHTML = "Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: Goal Failed" + 
							 + " " + `<br> Friends Progress: ` + friendGoalProgress;
						//fail and archive/update goal
					}
					else {
						daysRemaining = calculateRemaining(getAndFormatCurrentDate(),currentGoal.endDate);
						if(daysRemaining <= 10 && daysRemaining < minDaysRemaining)
						{
							minDaysRemaining = daysRemaining;
						}
                        let leaveGoalFuncton = `onclick = "leaveGoal('` + key + `',` + currentGoal.goalId + `)"`;

						goal.innerHTML = "Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: " + currentGoal.status[userIndex]
							+ " | Days Remaining: " + daysRemaining +"| Progress: " + currentGoal.extraData[0] + ` <progress value="` + goalProgress + `" max="100"></progress> ` + currentGoal.extraData[1] +
							" " + `<button type='button'  ` + leaveGoalFuncton + ` style ='margin: 5px 0'>Leave</button><br> Friends Progress: ` + friendGoalProgress;
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

            ///END
        }
    }
}

function updateGroupSummary(noGoals, groupName)
{
    //iterate through divs and find correct group name?????
    console.log("Update user summary not implemented yet!");
}

function leaveGoal(groupName, goalID)
{
    console.log("Not implemented yet");
    //leave goal
    data = {
        type: "group-goal-delete-user",
        content: { goalId: currentGoal.goalId, groupName: key}
    };
    dataRequest(data, errorReporter);
}

function createGoal()
{
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
        console.log(data.content);
        weight = data.content.weight;
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

let weight = 0
requestGroupInformation()

var userDeadlineAlert = false;

let userInfoReq = {
    type: "user-request",
    content: { requestKeys: ["firstName", "height", "weight", "bmi", "age"] }
};

dataRequest(userInfoReq, saveUserInformation);

var coll = document.getElementsByClassName("collapsible");
