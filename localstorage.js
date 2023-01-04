function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    // localStorage.setItem('phonenumber', number);
    const obj = {
        name,
        email,
        number
    }
    let obj_serialized = JSON.stringify(obj);
    localStorage.setItem(obj.email, obj_serialized);

    showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStoragekeys = Object.keys(localStorageObj);

    for(var i = 0;i<localStoragekeys.length; i++)
    {
        const keys = localStoragekeys[i];
        const userDetailsString = localStorageObj[keys];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj);
    }
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';

    const parentNode = document.getElementById('ListOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} 
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