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
        memberEmails.innerHTML += "<br>"+emails[mail]+"<button id=deleteEmail onclick=removeMail("+mail+") type=button>remove</button>";
    }
    document.getElementById("memberEmail").value = "";
}

document.getElementById("exitButtonCreateGroup").addEventListener("click",function(){
    overlay.style.display = "none";
	addGroupContainer.style.display = "none";
})
function removeMail(m){
    if(emails.length == 1){
        emails.shift();
        memberEmails.innerHTML = "";
    }else{
        var temp = emails[m];
        emails[m] = emails[0];
        emails[0] = temp;
        emails.shift();
        console.log(emails)
        memberEmails.innerHTML = "";
        for(mail in emails){
            memberEmails.innerHTML += "<br>"+emails[mail]+"<button id=deleteEmail type=button onclick=removeMail("+mail+")>remove</button>";
        }
    }
}

document.getElementById("submitGroupForm").addEventListener("click",function(){
    var groupName = document.getElementById("groupName").value;
    var description = document.getElementById("groupDescription").value;
    console.log(groupName);
    console.log(description);
    console.log(emails);

    overlay.style.display = "none";
	addGroupContainer.style.display = "none";
    memberEmails.innerHTML = "";
    document.getElementById("groupName").value        = "";
    document.getElementById("groupDescription").value = "";
})


