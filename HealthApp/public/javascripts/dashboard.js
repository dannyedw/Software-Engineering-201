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
  document.getElementById("addExerciseButton").addEventListener("click", addExercise)
  document.getElementById("addDietButton").addEventListener("click", addDiet)
  document.getElementById("addGoalButton").addEventListener("click", addGoal)
  
  

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
  




// this is the exercise section of code //
const exerciseSelect = document.getElementById("exercises");
const variationsDiv = document.getElementById("variations");

exerciseSelect.addEventListener("change", (event) =>
{
  const selectedExercise = event.target.value;
  let data = "";

  switch(selectedExercise)
  {
    case "Upper Body":
      data = "<input type='text' id='exerciseName' name='exercise-name' placeholder='Exercise Name'><br><input type='text' id='tim' name='time' placeholder='Time (Minutes)'><br><input type='text' id='rep' name='reps' placeholder='Reps'>";
      break;
    case "Lower Body":
      data = "<input type='text' id='exerciseName' name='exercise-name' placeholder='Exercise Name'><br><input type='text' id='tim' name='time' placeholder='Time (Minutes)'><br><input type='text' id='rep' name='reps' placeholder='Reps'>";
      break;
    case "Cardio":
      data = "<input type='text' id='exerciseName' name='exercise-name' placeholder='Exercise Name'><br><input type='text' id='tim' name='time' placeholder='Time (Minutes)'><br><input type='text' id='rep' name='distance' placeholder='Distance (Meters)'>";
      break;
    default:
      // clear the variations div if no exercise is selected
      variationsDiv.innerHTML = "";
      return;
  }
  // update the variations div with the selected exercise's data
  variationsDiv.innerHTML = data;
  
}); 
//document.getElementById("adde").addEventListener("submit", function(){


var data = document.getElementById("exerciseForm")
data.addEventListener('submit',(e)=>{
e.preventDefault();

overlay.style.display = "none";
addExerciseContainer.style.display = "none";
var name  = document.getElementById("exerciseName").value;
var time = document.getElementById("tim").value;
var reps = document.getElementById("rep").value;

const extraDiv = document.getElementById("extra");
extraDiv.innerHTML = extraDiv.innerHTML + "<br>" + " " + name + " - " + time + " - " + reps;
})

const mainDate = document.getElementById("dataForm");
    mainDate.addEventListener("change", (event) =>{
    var s = document.getElementById("date").value;
    //dataSubmit(data, responseHandler);
    console.log(s)
  })


// this is the diet section of code
var divs = document.getElementById("dietTable");
divs.innerHTML = 
"<tr>"+
  "<th>food type</th>" +
  "<th>meal name</th>" +
  "<th>calories</th>" +
"</tr>";

var mealType = "Brekfast";
var nam     = "Cereal";
var calories = "120";

divs.innerHTML = divs.innerHTML + `<tr onclick="submitDiet()">` + "<td>"+mealType+"</td> <td>"+nam+"</td> <td>"+calories+"</td>";

const dietDiv = document.getElementById("diets");
function submitDiet(){
  dietDiv.innerHTML = dietDiv.innerHTML + "<br>" + mealType + " - " + nam + " - " + calories; 
  overlay.style.display = "none";
  addDietContainer.style.display = "none";
}

var data = document.getElementById("dietsForm")
data.addEventListener('submit',(e)=>{
e.preventDefault();
addDietContainer.style.display = "none";
//dietDiv.innerHTML = dietDiv.innerHTML + "<br>" + mealType + " - " + nam + " - " + calories;
})

var dataForms = document.getElementById("CustomDietsForm")
dataForms.addEventListener('submit',(e)=>{
e.preventDefault();
console.log("hello")
overlay.style.display = "none";
addExerciseContainer.style.display = "none";
addCustomDietsContainer.style.display = "none";

var mealType = document.getElementById("foodTypes").value
var calories = document.getElementById("calories").value
var mealName = document.getElementById("mealType").value


const extraDiv = document.getElementById("extra");
divs.innerHTML = divs.innerHTML + `<tr onclick="submitDiet()">` + "<td>"+mealType+"</td> <td>"+mealName+"</td> <td>"+calories+"</td>";
dietDiv.innerHTML = dietDiv.innerHTML + "<br>" + " " + mealType + " - " + mealName + " - " + calories; 
})
