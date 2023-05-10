// this creates the group creation pop up window
function groupCreation(){
    overlay.style.display = "block";
	addGroupContainer.style.display = "block";
}
// exits group creation  pop up
document.getElementById("exitButtonCreateGroup").addEventListener("click",function(){
    overlay.style.display = "none";
	addGroupContainer.style.display = "none";
})

document.getElementById('createGroupButton').addEventListener("click",groupCreation);

const overlay = document.querySelector('.overlay');
const addGroupContainer = document.querySelector('#addGroupContainer');


//member emails section
const memberEmails = document.getElementById("memberEmails")

// adds emails to the list of emails
document.getElementById("addMemberEmail").addEventListener("click",addMemberEmail);
emails = [];
function addMemberEmail(){
    const email = document.getElementById("memberEmail").value;
    emails.push(email);
    memberEmails.innerHTML = "";
    for(mail in emails){
        memberEmails.innerHTML += "<br>"+emails[mail]+"<button id=deleteEmail onclick=removeMail("+mail+") type=button>Remove</button>";
    }
    document.getElementById("memberEmail").value = "";
}
// removes the email
function removeMail(m){
    if(emails.length == 1){
        emails.shift();
        memberEmails.innerHTML = "";
    }else{
        var temp = emails[m];
        emails[m] = emails[0];
        emails[0] = temp;
        emails.shift();
    
        memberEmails.innerHTML = "";
        for(mail in emails){
            memberEmails.innerHTML += "<br>"+emails[mail]+"<button id=deleteEmail type=button onclick=removeMail("+mail+")>Remove</button>";
        }
    }
}
//submits group information to the backend
document.getElementById("submitGroupForm").addEventListener("click",function(){
    var groupName = document.getElementById("groupName").value;
    var description = document.getElementById("groupDescription").value;
  

    overlay.style.display = "none";
	addGroupContainer.style.display = "none";
    memberEmails.innerHTML = "";
    document.getElementById("groupName").value        = "";
    document.getElementById("groupDescription").value = "";

    //form submission to backend
    let data = {
		type: "group-create",
		content: {
            groupname:groupName,
            description:description,
            members:emails
		}
	};

	dataRequest(data, responseHandler);

	function responseHandler(response) {
		if (response.status != 200) {
			console.log(response.content)
		}
	}

})


