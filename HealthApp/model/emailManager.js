
const database = require("./database");

//https://nodemailer.com/about/#example
const nodemailer = require("nodemailer");

let account = {
    user: 'webprogramming2f@gmail.com', //reusing account from year 1 web dev cw2, no point making another one
    pass: 'bwrmnaffoqzcfadh' //app password so i dont think you can do anything stupid to the account (and if you can, dont. pls)
};

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: account.user,
        pass: account.pass
    }
});

function notifyEmailVerification(username)
{
    const table = database.getTable("PENDINGUSER");
    const user = table[username];
    if (!user) 
    {
        console.log("Failed to send email due to invalid username: " + username);
        return;
    }

    const emailAddress = user.email;
    const subject = "ASCEND - Verify email";
    const text = "Please click the link to verify your email and finish creating your account:\n" +
        "https://localhost:3000/verifyUser/" + username;

    sendEmail(emailAddress, subject, text);
}


function notifyAccountCreation(username)
{
    const table = database.getTable("USER");
    const user = table[username];
    if (!user) 
    {
        console.log("Failed to send email due to invalid username: " + username);
        return;
    }

    const emailAddress = user.email;
    const subject = "Welcome to ASCEND Health";
    const text = "Hello " + user.firstName + ",\n" + 
        "Thank you for signing up to ASCEND Health"

    sendEmail(emailAddress, subject, text);
}

function notifyGroupInvitation(username, groupname)
{
    const table = database.getTable("USER");
    if (!table[username]) 
    {
        console.log("Failed to send email due to invalid username: " + username);
        return;
    }

    const emailAddress = table[username].email;
    const subject = "ASCEND - Group invitation from " + groupname;
    const text = "You have been invited to join " + groupname + " on ASCEND Health.\n" + 
    "Click the link to accept your invite: https://localhost:3000/joinGroup/" + groupname;

    sendEmail(emailAddress, subject, text);
}

function notifyGroupDeletion(username, groupname)
{
    const table = database.getTable("USER");
    if (!table[username])
    {
        console.log("Failed to send email due to invalid username: " + username);
        return;
    }

    const emailAddress = table[username].email;
    const subject = "ASCEND - A group you were in has been deleted";
    const text = "Group " + groupname + " on ASCEND Health has been deleted by the owner.";

    sendEmail(emailAddress, subject, text);
}


function sendEmail(emailAddress, subject, text)
{
    let mailOptions = {
        from: "ASCEND Health",
        to: emailAddress,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
    });
}

exports.notifyEmailVerification = notifyEmailVerification;
exports.notifyAccountCreation = notifyAccountCreation;
exports.notifyGroupInvitation = notifyGroupInvitation;
exports.notifyGroupDeletion = notifyGroupDeletion;