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


var data = document.getElementById("dietForm")
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