// this creates the group creation pop up window
function groupCreation(){
    overlay.style.display = "block";
	addGroupContainer.style.display = "block";
}

document.getElementById('createGroupButton').addEventListener("click",groupCreation);

const overlay = document.querySelector('.overlay');
const addGroupContainer = document.querySelector('#addGroupContainer');


// member emails section
// const memberEmails = document.getElementById("memberEmails")
// memberEmails.innerHTML = "<input type='text' id= 'memberEmail' name='members-email' placeholder='Member Email' required='' size='30px'>"

// document.getElementById("addMemberEmail").addEventListener("click",addMemberEmail);
// emails = [];
// function addMemberEmail(){
//     const email = document.getElementById("memberEmail").value;
//     emails.push(email);
//     //memberEmails.innerHTML = "";
//     for(mail in emails){
//         memberEmails.innerHTML += "<br>"+emails[mail]+"";
//     }
//     //memberEmails.innerHTML = "<input type='text' id= 'memberEmail' name='members-email' placeholder='Member Email' required='' size='30px'><button type='button' id='addMemberEmail'>ADD</button>"
// }
