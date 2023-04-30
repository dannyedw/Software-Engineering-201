// this creates the group creation pop up window
function groupCreation(){
    overlay.style.display = "block";
	addGroupContainer.style.display = "block";
}

document.getElementById('createGroupButton').addEventListener("click",groupCreation);

const overlay = document.querySelector('.overlay');
const addGroupContainer = document.querySelector('#addGroupContainer');


//member emails section
const memberEmails = document.getElementById("memberEmails")


document.getElementById("addMemberEmail").addEventListener("click",addMemberEmail);
emails = [];
function addMemberEmail(){
    const email = document.getElementById("memberEmail").value;
    emails.push(email);
    memberEmails.innerHTML = "";
    for(mail in emails){
        memberEmails.innerHTML += "<br>"+emails[mail]+"<button id=deleteEmail type=button>remove</button>";
    }
    document.getElementById("memberEmail").value = "";
}

document.getElementById("exitButtonCreateGroup").addEventListener("click",function(){
    overlay.style.display = "none";
	addGroupContainer.style.display = "none";
})
document.getElementById("deleteEmail").addEventListener("click",function(){
    memberEmails.innerHTML = "";
    var temp = emails[removeMail];
    emails[removeMail] = emails[0];
    emails[0] = temp;
    emails.shift();
    for(mail in emails){
        memberEmails.innerHTML += "<br>"+emails[mail]+"<button id=deleteEmail type=button onclick="+deleteEmail()+">delete</button>";
    }
})


