// Creating mock api

document.body.innerHTML=`
<div class ="addform">
<input class ="addusrname" placeholder="enteryourname"/>
<input class ="addusrurl" placeholder="enteryoururl"/>
<button onclick="addusr()">ADD</button>
</div>
<section class="usercontent"></section>`

async function getallusers() {
    const data = await fetch ("https://6166c4e913aa1d00170a6719.mockapi.io/users");
    const users = await data.json();
    const usercontainer =document.querySelector(".usercontent")

usercontainer.innerHTML="";

    users.forEach((user)=>{
    usercontainer.innerHTML+= `
    
    <div class="userlist">
   
    <img class="usravatar"src="${user.avatar}"/>
    <div class="edit">
    <h1 class="usrname">${user.name}</h1>
    <button onclick="toggleedit(${user.id})">Edit</button>
    <button onclick="deleteusr(${user.id})">Delete</button>
   <div class="editusr-form edit-${user.id}">
    <input value= "${user.name}"class ="edit-${user.id}-addusrname" placeholder="enteryourname"/>
    <input value= "${user.avatar}" class ="edit-${user.id}-addusrurl" placeholder="enteryoururl"/>
    <button onclick="saveusr()">SAVE</button>
    </div>
    </div>
    </div>
    `;
});
    console.log (users);
    
}
getallusers();

async function deleteusr(userid){
console.log("deleting", userid);
const data = await fetch("https://6166c4e913aa1d00170a6719.mockapi.io/users/"+  userid,
{ method : "DELETE"}
);
getallusers();
}

async function addusr(){
    console.log("addimg..")
    const name = document.querySelector(".addusrname").value;
    const avatar= document.querySelector(".addusrurl").value;
console.log(name,avatar);

// method : post
// data: body-stringify
const data = await fetch("https://6166c4e913aa1d00170a6719.mockapi.io/users/",
{method:"POST",
headers: { "Content-Type": "application/json"},
body: JSON.stringify({name:name,avatar:avatar})
}

);
getallusers();
}

function toggleedit(userId){
    console.log("edit");
    const editusrform = document.querySelector(`.edit-${userId}`);
editusrform.style.display =
editusrform.style.display === "block" ? "none" : "block";
}

async function saveusr(userId) {

    console.log("addimg..")
    const name = document.querySelector(`edit-${userId}-addusrname`).value;
    const avatar= document.querySelector(
        `edit-${userId}-addusrurl`).value;
console.log(name,avatar);


    const data = await fetch("https://6166c4e913aa1d00170a6719.mockapi.io/users/",
{
    method:"PUT",
headers: { "Content-Type": "application/json"},
body: JSON.stringify({name:name,avatar:avatar}),
}
    );
    getallusers();
}