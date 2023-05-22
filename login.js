const formLog = document.querySelector('form')
const submit = document.querySelector('.submit')
const userForm = {};


function formContent() {
    
    const email = formLog.elements['email'].value;
    const password = formLog.elements['password'].value;
    userForm.email = email;
    userForm.password = password;
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
        body: JSON.stringify(userForm),
    })
    .then((response) => {
        if(response.ok) {
            console.log("Connexion validée")
            return response.json()
            
            .then((data) => {
                sessionStorage.setItem("userId", data.userId)
                sessionStorage.setItem("token", data.token)
                console.log(data)
                window.location.href = "/FrontEnd/index.html";
            })
        } else {
            console.log("Erreur E-mail/Mot de passe !")
            alert('Erreur E-mail/Mot de passe !')
            location.reload()
        }
    })
}


formLog.addEventListener('submit', function(event) {
    event.preventDefault()
    formContent()
    fetchUsers()
    console.log(userForm)
})


