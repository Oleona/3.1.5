const formNew = document.getElementById('formNew')
const newname = document.getElementById('newname')
const newlastname = document.getElementById('newlastname')
const newage = document.getElementById('newage')
const newemail = document.getElementById('newemail')
const newpassword = document.getElementById('newpassword')
const selectRoles = document.getElementById('selectRoles')
let newUser = document.getElementById("newuser-tab")

newUser.addEventListener('click', () => {

    selectRoles.innerHTML =
        `<option value="${listRolesfromDB[0].id}">${listRolesfromDB[0].name}</option>
            <option value="${listRolesfromDB[1].id}">${listRolesfromDB[1].name}</option>`
    Array.from(selectRoles.options).forEach(opt => {
        listRolesfromDB.forEach(role => {
            if (role.name === opt.text) {
                opt.selected = true
            }
        })
    })
})

formNew.addEventListener('submit', (e) => {
    let newlistRoles = roleArray(selectRoles)
    e.preventDefault()

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: newname.value,
            lastName: newlastname.value,
            age: parseInt(newage.value),
            email: newemail.value,
            password: newpassword.value,
            roles: newlistRoles
        })
    })
        .then(formNew.reset())
        .then(res => res.json())
        .then(data => show(data))
        .then(reloadShowAllUsers)
    $('.nav-tabs a[href="#userstable"]').tab('show')

})
