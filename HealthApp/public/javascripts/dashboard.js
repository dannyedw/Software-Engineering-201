function addExercise() {
  overlay.style.display = "block";
  addExerciseContainer.style.display = "block";
  }
  function addDiet() {
  overlay.style.display = "block";
  addDietContainer.style.display = "block";
  }
  function addGoal() {
  overlay.style.display = "block";
  addGoalContainer.style.display = "block";
  }
  
  //gets the div's so we can hide/unhide them
  const overlay = document.querySelector('.overlay');
  const addExerciseContainer = document.querySelector('#addExerciseContainer');
  const addDietContainer = document.querySelector('#addDietContainer');
  const addGoalContainer = document.querySelector('#addGoalContainer');
  const addCustomDietsContainer = document.querySelector('#addCustomDietsContainer')
  

  //links the buttons to the functions
  document.getElementById("addGoalButton").addEventListener("click", addGoal)
  document.getElementById("addExerciseButton").addEventListener("click", displayWarning)
  document.getElementById("addDietButton").addEventListener("click", displayWarning)
  
  function displayWarning(){
    var warning = document.getElementById("dateWarning")
    warning.innerHTML = '<h1>Please Select a Date!</h1>'
  }

  document.getElementById("addCustomDiet").addEventListener("click", function(){
  overlay.style.display = "block";
  addCustomDietsContainer.style.display = "block";
  })


  //add a anonymas function to each exit button to hide the popup
  document.getElementById("exitButtonExercise").addEventListener("click", function () {
  overlay.style.display = "none";
  addExerciseContainer.style.display = "none";
  document.getElementById("variations").innerHTML = "";
  })
  document.getElementById("exitButtonDiet").addEventListener("click", function () {
  overlay.style.display = "none";
  addDietContainer.style.display = "none";
  })
  document.getElementById("exitButtonGoal").addEventListener("click", function () {
  overlay.style.display = "none";
  addGoalContainer.style.display = "none";
  })

  document.getElementById("exitButtonGoal").addEventListener("click", function () {
  overlay.style.display = "none";
  addGoalContainer.style.display = "none";
  })
  
  document.getElementById("exitCustomDiets").addEventListener("click", function(){
    overlay.style.display = "none";
    addCustomDietsContainer.style.display = "none";
    })

  document.getElementById("backToAddDiet").addEventListener("click", function(){
    addCustomDietsContainer.style.display = "none";
    addDietContainer.style.display = "block";
  })
  

// this is the exercise section of code //

// retrieves the exercise table and makes the Header
var exerciseTable = document.getElementById("exerciseTable");
exerciseTable.innerHTML = 
"<tr>"+
  "<th>Exercise Set</th>" +
  "<th>Exercise Name</th>" +
  "<th>Time</th>" +
  "<th>Distance/Reps</th>" +
"</tr>";

// Gets both of the divs in the exercise panel
const exerciseSelect = document.getElementById("exercises");
const variationsDiv = document.getElementById("variations");

// if upper body,lower body or cardio is selected then a different set of inputs is available for each
exerciseSelect.addEventListener("change", (event) =>
{
  const selectedExercise = event.target.value;
  let data = "";

  switch(selectedExercise)
  {
    case "Upper Body":
      data = "<input type='text' id='exerciseName' name='exercise-name' placeholder='Exercise Name'><br><input type='text' id='tim' name='time' placeholder='Time (Minutes)'><br><input type='text' id='rep' name='reps' placeholder='Reps'><br>";
      data += "<input type='submit' id ='adde' value='Add Exercise'>";
      break;
    case "Lower Body":
      data = "<input type='text' id='exerciseName' name='exercise-name' placeholder='Exercise Name'><br><input type='text' id='tim' name='time' placeholder='Time (Minutes)'><br><input type='text' id='rep' name='reps' placeholder='Reps'><br>";
      data += "<input type='submit' id ='adde' value='Add Exercise'>";
      break;
    case "Cardio":
      data = "<input type='text' id='exerciseName' name='exercise-name' placeholder='Exercise Name'><br><input type='text' id='tim' name='time' placeholder='Time (Minutes)'><br><input type='text' id='rep' name='distance' placeholder='Distance (Meters)'><br>";
      data += "<input type='submit' id ='adde' value='Add Exercise'>";
      break;
    default:
      // clear the variations div if no exercise is selected
      variationsDiv.innerHTML = "";
      return;
  }
  // update the variations div with the selected exercise's data
  variationsDiv.innerHTML = data;
  
}); 

// If exercise set is added to your main panel then they are inserted into the table
var data = document.getElementById("exerciseForm")
const extraDiv = document.getElementById("extra");
data.addEventListener('submit',(e)=>{
e.preventDefault();

overlay.style.display = "none";
addExerciseContainer.style.display = "none";
var name  = document.getElementById("exerciseName").value;
var time = document.getElementById("tim").value;
var reps = document.getElementById("rep").value;
const selectedExercise = document.getElementById("exercises").value;
var dateValue = document.getElementById("date").value;

let data = {
  type: "exercise-submit",
  content: {
    date: dateValue,
    set: selectedExercise,
    name: name,
    time: time,
    amount: reps
  }
};

dataRequest(data,responseHandler);

function responseHandler(response){
  if(response.status != 200){
    console.log(reponse.content)
  }
}

//gets the div from the panel to add the inputted requirements into table
exerciseTable.innerHTML = exerciseTable.innerHTML +"<td>"+selectedExercise+"</td> <td>"+name+"</td> <td>"+time+"</td> <td>"+reps+"</td>";
})



//retrives the date selected
const mainDate = document.getElementById("dataForm");
    mainDate.addEventListener("change", (event) =>{
      exerciseTable.innerHTML = "<tr>"+
      "<th>Exercise Set</th>" +
      "<th>Exercise Name</th>" +
      "<th>Time</th>" +
      "<th>Distance/Reps</th>" +
      "</tr>";
      var foodTab = document.getElementById("foodTable");
      foodTab.innerHTML = 
      "<tr>"+
      "<th>Meal type</th>" +
      "<th>Meal name</th>" +
      "<th>Calories</th>" +
      "</tr>";
    var dateValue = document.getElementById("date").value;
    getPersonalGoals();
    
    //links the buttons to the functions
    document.getElementById("addExerciseButton").removeEventListener("click", displayWarning);
    document.getElementById("addDietButton").removeEventListener("click", displayWarning);
    document.getElementById("addExerciseButton").addEventListener("click", addExercise);
    document.getElementById("addDietButton").addEventListener("click", addDiet);
    var warning = document.getElementById("dateWarning");
    warning.innerHTML = '';

    let data = {
      type: "exercise-request",
      content: {
          date:dateValue
      }
    };

    dataRequest(data,responseHandler)

    function responseHandler(response){
      if(response.status != 200){
        console.log(response.content);
      }else{
      for(let ex of response.content){
        const selectedExercise = document.getElementById("exercises").value;
        exerciseTable.innerHTML = exerciseTable.innerHTML +"<td>"+ex["set"]+"</td> <td>"+ex["name"]+"</td> <td>"+ex["time"]+"</td> <td>"+ex["amount"]+"</td>";
      }
    }
  }
  let dietData = {
    type: "diet-request",
    content: {
        date:dateValue
    }
  };

  dataRequest(dietData,responseHandle)

  function responseHandle(response){
    if(response.status != 200){
      console.log(response.content);
    }else{
    for(let diet of response.content.foods){
      var foodTab = document.getElementById("foodTable");
      foodTab.innerHTML = foodTab.innerHTML + "<td>"+diet["meal-type"]+"</td> <td>"+diet["name"]+"</td> <td>"+diet["calories"]+"</td>"; 
    }
    // alert("total calories: " + response.content.totalCalories);
  }
}
  })

// this is the diet section of code //
//total calories and the div section for total calorie display area
var totalCalories = 0;
var totalCalorieDiv = document.getElementById("calorieTotal");

// food table of outputted results in the dashboard panel with headers for table
var foodTab = document.getElementById("foodTable");
foodTab.innerHTML = 
"<tr>"+
  "<th>Meal type</th>" +
  "<th>Meal name</th>" +
  "<th>Calories</th>" +
"</tr>";

//This is the table and headers for the selection of food the user can choose from
var divs = document.getElementById("dietTable");
divs.innerHTML = 
"<tr>"+
  "<th>Meal Type</th>" +
  "<th>Meal Name</th>" +
  "<th>Calories</th>" +
"</tr>";

//HardCoded for example
var mealType = "Breakfast";
var nam     = "Cereal";
var calories = 120;

let dataaa = {
  type: "food-request",
  content:{}
};

dataRequest(dataaa,responseHandler);

function responseHandler(response){
  if(response.status != 200){
    console.log(response.content)
  }
  else{
    for(let diet of response.content){
      console.log(diet)
      divs.innerHTML = divs.innerHTML + '<tr onclick="submitDiet(\''+diet['meal-type']+'\',\''+diet['name']+'\',\''+diet['calories']+'\');"> <td>'+diet['meal-type']+'</td> <td>'+diet['name']+'</td> <td>'+diet['calories']+'</td> </tr>';
    }
  }
}

//creates row to the selection of food
divs.innerHTML = divs.innerHTML + '<tr onclick="submitDiet(\''+mealType+'\',\''+nam+'\',\''+calories+'\');"> <td>'+mealType+'</td> <td>'+nam+'</td> <td>'+calories+'</td> </tr>';

//This adds the calorie count to the total and adds the selected food item to the dashboard panel
const dietDiv = document.getElementById("diets");

function submitDiet(type,name,calories){
  foodTab.innerHTML = foodTab.innerHTML + "<td>"+type+"</td> <td>"+name+"</td> <td>"+calories+"</td>"; 
  overlay.style.display = "none";
  addDietContainer.style.display = "none";
  totalCalories += Number(calories);
  totalCalorieDiv.innerHTML = "Total Calorie Count " + totalCalories;
  var dateValue = document.getElementById("date").value;

  //submitting diet client side
  let data = {
    type: "diet-submit",
    content: {
      date: dateValue,
      foodID:"d7"
    }
  };
  
  dataRequest(data,responseHandler);
  
  function responseHandler(response){
    if(response.status != 200){
      console.log(reponse.content)
    }
  }

}

//removes the diet container when meal is selected
var data = document.getElementById("dietsForm")
data.addEventListener('submit',(e)=>{
e.preventDefault();
addDietContainer.style.display = "none";
})
//this removes the custom diet tab when meal is created and submitted
var dataForms = document.getElementById("CustomDietsForm")
dataForms.addEventListener('submit',(e)=>{
e.preventDefault();

overlay.style.display = "none";
addExerciseContainer.style.display = "none";
addCustomDietsContainer.style.display = "none";

//variables for three input options in custom diet panel
var mealName = document.getElementById("foodTypes").value
var calories = document.getElementById("calories").value
var mealType = document.getElementById("mealType").value

//adds calorie count of custom to total
totalCalories += Number(calories);
totalCalorieDiv.innerHTML = "Total Calorie Count " + totalCalories;

//submits custom diet to main dashboard panel of Meals Eaten for the day
//https://itecnote.com/tecnote/javascript-passing-dynamic-parameter-to-a-javascript-function-using-innerhtml/ reference for how to add mutiple parameters in inner html
const extraDiv = document.getElementById("extra");
divs.innerHTML = divs.innerHTML + '<tr onclick="submitDiet(\''+mealType+'\',\''+mealName+'\',\''+calories+'\');"> <td>'+mealType+'</td> <td>'+mealName+'</td> <td>'+calories+'</td> </tr>';
foodTab.innerHTML = foodTab.innerHTML + "<td>"+mealType+"</td> <td>"+mealName+"</td> <td>"+calories+"</td>"; 

var dateValue = document.getElementById("date").value;

//submitting the custom food to the backend 
//submitting diet client side
let dataa = {
  type: "diet-submit",
  content: {
    date: dateValue,
    foodID:"d7"
  }
};

dataRequest(dataa,responseHandler);

function responseHandler(response){
  if(response.status != 200){
    console.log(reponse.content)
  }
}

let data = {
  type: "food-submit",
  content: {
    name:mealName,
    calories:calories,
    "meal-type":mealType
  }
};

dataRequest(data,responseHandler);

function responseHandler(response){
  if(response.status != 200){
    console.log(reponse.content)
  }
}


})

////Goal Section
const goalSelect = document.getElementById("goalType");
const goalOutputDiv = document.getElementById("goalOutput");
const personalGoals = document.getElementById("personalGoals");


//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date- reference - For the date min and max value 
//https://www.w3resource.com/javascript-exercises/javascript-date-exercise-2.php- Reference - helping form the yyyy-mm-dd format
const CurrentDate = new Date();
var year  = CurrentDate.getFullYear();
var month = CurrentDate.getMonth()+1;
var day  = CurrentDate.getDate();
var selectionDay = CurrentDate.getDate()+1;
if(date<10){
  day = "0"+date;
}if(selectionDay<10){
  selectionDay = "0"+selectionDay;
}
if(month<10){
  month = "0"+month;
}
SelectionDate = year + "-" + month + "-" + selectionDay
formatCurrentDate = year + "-" + month + "-" + day
// if target weight than only 
goalSelect.addEventListener("change", (event) =>
{
  const selectedDiet = event.target.value;
  let data = "";

  switch(selectedDiet)
  {
    case "Target Weight":
      data = "<input type='text' id='target-Weight' name='weight' placeholder='Target Weight(KG)'><br><input type='date' id='goalDate' name='deadline' value="+SelectionDate+" min="+formatCurrentDate+" max='2027-04-21'><br>";
      data += "<input type='submit' id='addPGoal' value='Add Goal'>";
      break;
    default:
      // clear the variations div if no exercise is selected
      goalOutputDiv.innerHTML = "";
      return;
  }
  // update the goal ouput div with the selected exercise's data
  goalOutputDiv.innerHTML = data;

  
  document.getElementById('addPGoal').addEventListener("click",addingTargetWeight);

function calculateRemaining(current,deadline){
  //var remain = deadline - current;
  deadline = deadline.split("-");
  current = current.split("-");
  remainingMonths = deadline[1]-current[1];
  remainingDays = deadline[2]-current[2];
  if(remainingMonths > 0){
    if(remainingMonths == 1 || remainingMonths == 3 || remainingMonths == 5 || remainingMonths == 7 || remainingMonths == 8 || remainingMonths == 10 || remainingMonths == 12 ){
      timeRemaining = (remainingMonths * 31) + remainingDays; 
      return timeRemaining;
    }else if(remainingMonths == 2){
      timeRemaining = (remainingMonths * 28) + remainingDays; 
      return timeRemaining;
    }else if(remainingMonths == 4 || remainingMonths == 6 || remainingMonths == 9 || remainingMonths == 11){
      timeRemaining = (remainingMonths * 30) + remainingDays; 
      return timeRemaining;
    }
  }else{
    return remainingDays;
  }
}

  function addingTargetWeight(){
    //next few lines are getting the information for the request
    const targetWeight = document.getElementById("target-Weight").value;
    const targetDate = document.getElementById("goalDate").value;

    //i know this is probaby very bad but callback functions were annoying
    let userInfo = document.getElementById("userInformation").textContent;
    const startingWeight = userInfo.split(" ")[5].split("kg")[0];

    var goalType = document.getElementById("goalType").value;
    if(goalType == "Target Weight")
    {
      goalType = "weight";
    }

    const startDate = getAndFormatCurrentDate(); 

    // validating that we got the correct values
    // console.log("Type: " + goalType);
    // console.log("startdate: " + startDate);
    // console.log("endDate: " + targetDate);
    // console.log("starting weight: " + startingWeight);
    // console.log("target weight: " + targetWeight);

    let data = {
      type: goalType,
      startDate: startDate,
      endDate: targetDate,
      extraData: [startingWeight, targetWeight]
    };

    let request = {
      type: "personal-goal-create",
      content: data
    };

    dataRequest(request, errorReporter);

    overlay.style.display = "none";
    addGoalContainer.style.display = "none";

    getPersonalGoals(); //update goals once we have added one
  }
  
}); 

function errorReporter(data)  //function that basicaly prints the error when put as callback function
{
  if (data.status != 200)
  {
    console.log(data.content);
  }
  getPersonalGoals(); //updates stuff as this function will wait for the request to finish
}

function getPersonalGoals() //this gets the goals that are not expired by this date
{
  var dateValue = document.getElementById("date").value;
  if(dateValue)
  {
    let dataTest = {
      type: "personal-goal-request",
      content: {
          date:dateValue
        }
      };
      
    dataRequest(dataTest,displayPersonalGoals)
    }
}

function displayPersonalGoals(data)  //this displays the goals in the goal container
{
  if(data.status != 200)
  {
    console.log(data.response);
  }
  else
  {
    let personalGoalContainer = document.getElementById("personalGoals");
    personalGoalContainer.innerHTML = "";
    let personalGoals = data.content;

    //i know this is probaby very bad but callback functions were annoying
    let userInfo = document.getElementById("userInformation").textContent;
    let currentWeight = userInfo.split(" ")[5].split("kg")[0];

    for(let i = 0; i < personalGoals.length; i++)
    {
      let currentGoal = personalGoals[i];
      var goal = document.createElement("p");
      if(currentGoal.type == "weight")
      {
        var goalProgress = ((currentWeight-currentGoal.extraData[0])/(currentGoal.extraData[1]-currentGoal.extraData[0]))*100;
        if(currentGoal.status != "In Progress")
        {
          goal.innerHTML = "Archived goal: Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: " + currentGoal.status;
        }
        else if(goalProgress >= 100)
        {
          data = {
            type: "personal-goal-update",
            content: {goalId: currentGoal.goalId, status: "Goal Completed Successfully"}
          };
          dataRequest(data,errorReporter);

          goal.innerHTML = "Archived goal: Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: Goal Completed Successfully";
          //pass and archive/update goal

        }
        else if(currentGoal.endDate == getAndFormatCurrentDate())
        {
          data = {
            type: "personal-goal-update",
            content: {goalId: currentGoal.goalId, status: "Goal Failed"}
          };
          dataRequest(data,errorReporter);

          goal.innerHTML = "Archived goal: Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: Goal Failed";
          //fail and archive/update goal
        }
        else{
          goal.innerHTML = "Get to a weight of " + currentGoal.extraData[1] + "kg by " + currentGoal.endDate + " | Status: " + currentGoal.status
        + " | Progress: " + currentGoal.extraData[0] + ` <progress value="`+ goalProgress +`" max="100"></progress> ` + currentGoal.extraData[1] +
        " " + `<button type='button' onclick = "deletePersonalGoal(` + currentGoal.goalId + `)" style ='margin: 5px 0'>Delete</button>`;
        }
      }
      else
      {
        console.log("not implemented yet");
      }
      personalGoalContainer.appendChild(goal);
    }
  }
  
}

function deletePersonalGoal(goalId1)
{
  let data3 = {
    type: "personal-goal-delete",
    content: {goalId: goalId1}
  };
  dataRequest(data3, errorReporter);
}

function getAndFormatCurrentDate()
{
  const CurrentDate = new Date();
  var year  = CurrentDate.getFullYear();
  var month = CurrentDate.getMonth()+1;
  var day  = CurrentDate.getDate();
  if(date<10){
    day = "0"+date;
  }
  if(month<10){
    month = "0"+month;
  }
  return year + "-" + month + "-" + day; 
}

function getUserInformation(){
  let data = {
    type: "user-request",
    content: {requestKeys:["firstName","height","weight","bmi","age"]}
  };

  dataRequest(data, displayUserInformation);
}

function displayUserInformation(userInformation){
  let firstName = userInformation.content.firstName;
  let height = userInformation.content.height;
  let weight = userInformation.content.weight;
  let bmi = userInformation.content.bmi;
  let age = userInformation.content.age;

  let userInformationTitleContainer = document.getElementById("userInformationTitle");
  let userInformationContainer = document.getElementById("userInformation");
  let adviceContainer = document.getElementById("userAdvice");

  if(height != 0 && weight !=0)
  {
    var newBmi = weight/((height/100)**2);
    newBmi = newBmi.toFixed(1);

    if(isNaN(newBmi))
    {
      newBmi = 0
    }
  
    if (newBmi != bmi)
    {
      let data = {
        type: "user-update",
        content: {bmi: newBmi}
      };
      dataRequest(data,getUserInformation);
    }
  }

  //`<button type='button' onclick="displayHeightUpdate()">Update</button>`
  //`<button type='button' onclick="displayWeightUpdate()">Update</button>`
  //`<button type='button' onclick="displayAgeUpdate()">Update</button>`

  userInformationTitleContainer.innerHTML = firstName + "'s Information: ";
  userInformationContainer.innerHTML = "Height: " + height + "cm " + " | Weight: " + weight + "kg " + " | Age: " + age + " | BMI: " + bmi + '<br>'
  + `<button type='button' onclick="displayHeightUpdate()" id='heightUpdateButton'>Update</button>` + `<button type='button' onclick="displayWeightUpdate()" id='weightUpdateButton'>Update</button>` + `<button type='button' onclick="displayAgeUpdate()" id='ageUpdateButton'>Update</button>`;

  if (bmi<=18){
    adviceContainer.innerHTML = "Feedback: BMI Low - You need to gain weight (a healthy BMI should be between 10 and 24)";
  }
  else if(bmi >= 19 && bmi <= 24){
    adviceContainer.innerHTML = "Feedback: You are Healthy";
  }
  else if(bmi >= 25 && bmi <= 29)
  {
    adviceContainer.innerHTML = "Feedback: BMI Overweight - You need to lose some weight (a healthy BMI should be between 10 and 24)";
  }
  else{
    adviceContainer.innerHTML = "Feedback: BMI Obese - You need to immedialty lose weight as you are very unhealthy (a healthy BMI should be between 10 and 24)";
  }
  getPersonalGoals();
}

function displayHeightUpdate()
{
  let adviceContainer = document.getElementById("userAdvice");
  adviceContainer.innerHTML = "Enter new Height(cm): " + `<input type="text" id="newHeight" name="newHeight">
  <button type='button' onclick = "updateHeight()" style ='margin: 5px 0'>Update</button>
  <button type='button' onclick="getUserInformation()" id='cancelAdding'>Cancel</button>`;
}

function displayWeightUpdate()
{
  let adviceContainer = document.getElementById("userAdvice");
  adviceContainer.innerHTML = "Enter new Weight(kg): " + `<input type="text" id="newWeight" name="newWeight">
  <button type='button' onclick = "updateWeight()" style ='margin: 5px 0'>Update</button>
  <button type='button' onclick="getUserInformation()" id='cancelAdding'>Cancel</button>`;
}

function displayAgeUpdate()
{
  let adviceContainer = document.getElementById("userAdvice");
  adviceContainer.innerHTML = "Enter new Age: " + `<input type="text" id="newAge" name="newAge">
  <button type='button' onclick = "updateAge()" style ='margin: 5px 0'>Update</button>
  <button type='button' onclick="getUserInformation()" id='cancelAdding'>Cancel</button>`;
}

function updateHeight()
{
  let error = false;
  try
  {
    var newHeight = document.getElementById("newHeight").value;
    if ((newHeight > 304 || newHeight <= 0) || isNaN(newHeight))    //you cant be over 10 foot
    {
      error = true;
    }
  }
  catch
  {
    error = true;
  }

  if(error)
  {
    let adviceContainer = document.getElementById("userAdvice");
    adviceContainer.innerHTML = "Enter new Height(cm): " + `<input type="text" id="newHeight" name="newHeight"><button type='button' onclick= "updateHeight()" style ='margin: 5px 0'>Update</button>` + " Invalid Entry";
  }
  else
  {
    let data = {
      type: "user-update",
      content: {height: newHeight}
    };
    dataRequest(data,getUserInformation);
  }
}

function updateWeight()
{
  let error = false;
  try
  {
    var newWeight = document.getElementById("newWeight").value;
    if ((newWeight > 500 || newWeight <= 0) || isNaN(newWeight))    //you cant be over 500kg
    {
      error = true;
    }
  }
  catch
  {
    error = true
  }

  if(error)
  {
    let adviceContainer = document.getElementById("userAdvice");
    adviceContainer.innerHTML = "Enter new Weight(kg): " + `<input type="text" id="newWeight" name="newWeight"><button type='button' onclick= "updateWeight()" style ='margin: 5px 0'>Update</button>` + " Invalid Entry";
  }
  else
  {
    let data = {
      type: "user-update",
      content: {weight: newWeight}
    };
    dataRequest(data,getUserInformation);
  }
}

function updateAge()
{
  let error = false;
  try
  {
    var newAge = document.getElementById("newAge").value;
    if ((newAge > 150 || newAge <= 0) || isNaN(newAge))    //you cant be over 150 years
    {
      error = true;
    }
  }
  catch
  {
    error = true
  }

  if(error)
  {
    let adviceContainer = document.getElementById("userAdvice");
    adviceContainer.innerHTML = "Enter new Age: " + `<input type="text" id="newAge" name="newAge"><button type='button' onclick= "updateAge()" style ='margin: 5px 0'>Update</button>` + " Invalid Entry";
  }
  else
  {
    let data = {
      type: "user-update",
      content: {age: newAge}
    };
    dataRequest(data,getUserInformation);
  }
}

getUserInformation();

//gives the date a default value to todays date
var date = document.getElementById("date")
date.value = getAndFormatCurrentDate();  