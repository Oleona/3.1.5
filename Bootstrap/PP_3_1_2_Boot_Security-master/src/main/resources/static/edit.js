//EDIT USER
const modalEdit = $('#modalEdit')
const formEdit = document.getElementById('formEdit')
const editID = document.getElementById('ID')
const firstname = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const age = document.getElementById('age')
const editemail = document.getElementById('email')
const password = document.getElementById('password')
const edselectRoles = document.getElementById('edselectRoles')
let listRolesfromDB = []
let idUserForEdit = 0
let savedUserRoles = ""

function Role(id, name) {
    this.id = id;
    this.name = name;
}

fetch(URL + "/role", {method: 'GET'})
    .then(response => response.json())
    .then(data => getRoles(data))

const getRoles = (role) => {
    Array.from(role).forEach(r => {
        listRolesfromDB.push(new Role(r.id, r.name.substring(5)))
    })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, ev => {
        if (ev.target.closest(selector)) {
            handler(ev)
        }
    })
}

on(document, 'click', '.btnEdit', e => {
    const rowToEdit = e.target.parentNode.parentNode
    idUserForEdit = rowToEdit.firstElementChild.innerHTML
    fetch(URL + "/" + idUserForEdit, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        editID.value = user.id
        firstname.value = user.name
        lastName.value = user.lastName
        age.value = user.age
        editemail.value = user.email
        password.value = user.password
        savedUserRoles = user.roles
        edselectRoles.innerHTML =
            `<option value="${listRolesfromDB[0].id}">${listRolesfromDB[0].name}</option>
                <option value="${listRolesfromDB[1].id}">${listRolesfromDB[1].name}</option>`
        Array.from(edselectRoles.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })

        modalEdit.modal('show')
    }
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(edselectRoles)
    if (listRoles.length == 0) {
        listRoles = savedUserRoles
    }
    fetch(URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idUserForEdit,
            name: firstname.value,
            lastName: lastName.value,
            age: age.value,
            email: editemail.value,
            password: password.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(reloadShowAllUsers)
    modalEdit.modal('hide')
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: listRolesfromDB[i].id}
            array.push(role)
        }
    }
    return array
}
const reloadShowAllUsers = () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            result = ''
            show(data)
        })
}