const formLog = document.querySelector('form')
const submit = document.querySelector('.submit')
const userForm = {};


function formContent() {
    const email = formLog.elements['email'].value;
    const password = formLog.elements['password'].value;
    userForm.email = email;
    userForm.password = password;
}
// formContent()

// const user = {
//     email: 'sophie.bluel@test.tld',
//     password: 'S0phie'
// }

async function fetchUsers() {
    
    const fetchUser = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(userForm),
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
}
// fetchUsers()

formLog.addEventListener('submit', function(event) {
    event.preventDefault()
    formContent()
    fetchUsers()
    console.log(userForm)
})

