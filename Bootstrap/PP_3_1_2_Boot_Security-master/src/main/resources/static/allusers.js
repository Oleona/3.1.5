const URL = 'http://localhost:8080/api/admin'
let result = ''

const show = (listUsers) => {
    const container = document.getElementById("data")
    const users = Array.from(listUsers)
    users.forEach(user => {
        result += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.rolesAsString}</td>
<td class="text text-white">
                <a class="btnEdit btn btn-info">Edit</a>
            </td>
            <td class="text text-white">
                <a class="btnDelete btn btn-danger">Delete</a>
            </td>      
         </tr> `
    })
    container.innerHTML = result
}

fetch(URL, {headers: {'Content-type': 'application/json'},}
)
    .then(response => response.json())
    .then(data => show(data))
