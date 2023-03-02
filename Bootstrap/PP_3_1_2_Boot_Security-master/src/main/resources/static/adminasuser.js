const admincontainer = document.getElementById("adminasuser")
let resultadminasuser = ''
const adminURL = 'http://localhost:8080/api/admin/'

const showadminasuser = (user) => {
    $('#userEmail').append(user.email);
    $('#userUserRole').append(user.rolesAsString)
    resultadminasuser += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.rolesAsString}</td>
         </tr> `

    admincontainer.innerHTML = resultadminasuser
}

fetch('api/user/', {headers: {'Content-type': 'application/json'},}
)
    .then(response => response.json())
    .then(adminasuser => showadminasuser(adminasuser))







