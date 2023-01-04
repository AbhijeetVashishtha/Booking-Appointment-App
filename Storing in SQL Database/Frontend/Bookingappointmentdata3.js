function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const obj = {
        name,
        email,
        number
    }
    axios.post("http://localhost:4000/user/add-user", obj)
    .then((response) => {
        console.log(response);
        showNewUserOnScreen(response.data.newUserDetail);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>";
        console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:4000/user/get-users")
    .then((response) => {
        console.log(response);
        for(var i =0;i<response.data.allUsers.length;i++)
        {
            showNewUserOnScreen(response.data.allUsers[i]);
        }
    })
    .catch((err) => {
        console.log(err)
    });
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('number').value = '';

    const parentNode = document.getElementById('ListOfUsers');
    const childHTML = `<li id=${user.id}> ${user.name} - ${user.email} - ${user.phonenumber}
                       <button onclick = deleteUser('${user.id}')>Delete User </button>
                       <button onclick = editUser('${user.email}','${user.name}','${user.phonenumber}','${user.id}')>Edit user</button>
                       </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUser(email, name, number, userID){
    axios.get(`http://localhost:4000/user/edit-user/${userID}`)
    .then(() => {
        document.getElementById('username').value = name;
        document.getElementById('email').value = email;
        document.getElementById('number').value = number;
        deleteUser(userID)
    })
    .catch((err) => {
        console.log(err);
    }) 
} 

function deleteUser(userID){
    axios.delete(`http://localhost:4000/user/delete-user/${userID}`)
    .then((response) => {
        removeUserFromScreen(userID);
    })
    .catch((err) => {
        console.log(err);
    });
}

function removeUserFromScreen(userID){
    const parentNode = document.getElementById('ListOfUsers');
    const childElementToBeDeleted = document.getElementById(userID);

    parentNode.removeChild(childElementToBeDeleted);
}