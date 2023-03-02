let resultShowUser = ''

const showUser = (user) => {
    const showUserContainer = document.getElementById("dataUser")
    $('#userEmail').append(user.email);
    $('#userUserRole').append(user.rolesAsString)
    resultShowUser += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.rolesAsString}</td>
         </tr> `

    showUserContainer.innerHTML = resultShowUser
}

fetch('api/user/')
    .then(response => response.json())
    .then(data => showUser(data))

