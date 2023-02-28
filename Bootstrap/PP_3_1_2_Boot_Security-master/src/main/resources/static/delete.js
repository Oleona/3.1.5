//DELETE USER
const modalDelete = $('#modalDelete')
const formDelete = document.getElementById('formDelete')
const delID = document.getElementById('delID')
const delfirstname = document.getElementById('delfirstname')
const dellastName = document.getElementById('dellastname')
const delage = document.getElementById('delage')
const delemail = document.getElementById('delemail')
const delselectRoles = document.getElementById('delselectRoles')
let idUserForDelete = 0

on(document,
    'click',
    '.btnDelete',
    e => {
        const rowToDelete = e.target.parentNode.parentNode
        idUserForDelete = rowToDelete.firstElementChild.innerHTML
        fetch(URL + "/" + idUserForDelete, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => getUserByIdForDelete(data))
        const getUserByIdForDelete = (user) => {
            delID.value = user.id
            delfirstname.value = user.name
            dellastName.value = user.lastName
            delage.value = user.age
            delemail.value = user.email
            delselectRoles.innerHTML = ` <option value="${user.rolesAsString}">${user.rolesAsString}</option>`
            modalDelete.modal('show')
        }
    })

formDelete.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(URL + "/" + idUserForDelete, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(reloadShowAllUsers)
    modalDelete.modal('hide')
})
