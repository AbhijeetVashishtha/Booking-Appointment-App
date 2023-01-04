function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const obj = {
        name,
        email,
        number
    }

    axios.post('https://crudcrud.com/api/71fb783823064f9eac14a98f1056f633/appointmentdata', obj)
    .then((response) => {
        showNewUserOnScreen(response.data);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>";
        console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get('https://crudcrud.com/api/71fb783823064f9eac14a98f1056f633/appointmentdata')
    .then((response) => {
        for(var i =0;i<response.data.length;i++)
        {
            showNewUserOnScreen(response.data[i]);
        }
    })
    .catch((err) => console.log(err));
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';

    const parentNode = document.getElementById('ListOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} - ${user.number}
                       <button onclick = deleteItem('${user.email}')>Delete User </button>
                       <button onclick = editUserdetails('${user.email}','${user.name}','${user.number}')>Edit user</button>
                       </li>`;
    
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUserdetails(email, name, number){
    document.getElementById('email').value = email;
    document.getElementById('name').value = name;
    document.getElementById('number').value = number;

    deleteItem(email);
}

function deleteItem(email){
    console.log(email);
    localStorage.removeItem(email);
    removeUserFromScreen(email);
}

function removeUserFromScreen(email){
    const parentNode = document.getElementById('ListOfUsers');
    const childElementToBeDeleted = document.getElementById(email);

    parentNode.removeChild(childElementToBeDeleted);
}