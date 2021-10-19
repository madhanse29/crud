
document.body.innerHTML=` 
<div class="user-form">
<input class="add-user-name" placeholder="Enter Your Name"/>
<input class="add-user-avatar" placeholder="Enter Your user avatar"/>
<button onclick="addUsers()">ADD USERS</button>
</div>
 <section class="user-list"></section>`
async function getData()
{
const data= await fetch("https://6166c4e913aa1d00170a6719.mockapi.io/users/");
const users=await data.json();

const usercontainer=document.querySelector(".user-list");
usercontainer.innerHTML="";//tO erase the old data.
users.forEach((user) => {
usercontainer.innerHTML+=`<div class="user-contaier">
 <img  class="user-avatar" src=${user.avatar } alt=${user.name}>
 <div>
 <h1 class="user-name">${user.name}</h1>
 <button onclick="toggleEdit(${user.id})">EDIT</button>
 <button onclick="deleteUser(${user.id})">DELETE</button>
 <div class="edit-user-form edit-${user.id}">
 <input value=${user.name} class="edit-${user.id}-username" placeholder="Enter your Name"/>
 <input value=${user.avatar} class="edit-${user.id}-useravatar" placeholder="Enter your Avatar"/>
 <button onclick="edituser(${user.id})">Save</button>
 </div>
 </div>  
 </div>`
});
console.log(users);
}

getData();

async function deleteUser(usersId){
console.log("deleting",usersId);
const data= await fetch
("https://6166c4e913aa1d00170a6719.mockapi.io/users/"+usersId,
{method:"DELETE"}
);
getData();

};

async function addUsers(){
console.log("Adding Users");
const n1=document.querySelector(".add-user-name").value;
const n2=document.querySelector(".add-user-avatar").value;
const data= await fetch
("https://6166c4e913aa1d00170a6719.mockapi.io/users/",
{method:"POST",
headers:{ "Content-Type": "application/json"},
body:JSON.stringify({name:n1,avatar:n2})
}
);
getData();

};

async function toggleEdit(usersId){
const editUserform= document.querySelector(`.edit-${usersId}`);
editUserform.style.display= editUserform.style.display==='block'?'none':'block';   

};

async function edituser(userId){
console.log("Adding Users");
const n1=document.querySelector(`.edit-${userId}-username`).value;
const n2=document.querySelector(`.edit-${userId}-useravatar`).value;
const data= await fetch
("https://6166c4e913aa1d00170a6719.mockapi.io/users/" +userId,
{method:"PUT",
headers:{ "Content-Type": "application/json"},
body:JSON.stringify({name:n1,avatar:n2})
}
);
getData();
};





