
const email = document.getElementsByName('email')[0];
const password = document.getElementsByName('password')[0];


const user = {
    email: email,
    password: password
}

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
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
}
fetchUsers();


