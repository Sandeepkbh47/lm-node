const username = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')

username.addEventListener('blur', function () {
    const regex = /^[a-zA-Z\s]+$/
    if (!regex.test(name.value)) {
        alert('Invalid name')
    }
})

email.addEventListener('blur', function () {
    const regex = /^[a-z\d\.]+@[a-z\d]{2,}\.[a-z]{2,3}$/
    if (!regex.test(email.value.toLowerCase())) {
        alert('Invalid email')
        socket.emit('message', 'Invalid name')
    }
    email.value = email.value.toLowerCase()
})
password.addEventListener('blur', function () {
    const combined = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}/
    console.log(password.value.length)
    if (!combined.test(password.value)) {
        alert('Invalid password')
    }
})



function largest(arr, n) {

    let result = Array.from(new Set(arr)).sort((a, b) => b - a)[n - 1]
    if (!result) {
        return "Invalid value"
    }
    return result
}

console.log(largest([5, 23, 4, 5], 1))


const socket = io.connect('http://127.0.0.1:3000')

socket.on('message', (msg) => {
    console.log(msg)
})

// fetch('http://localhost:3000/api/v1/tours', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "name": "Shimla package",
//         "price": 15000,
//         "location": [42.7222937, 74.8485286]
//     })
// }).then(res => res.json())
//     .then(res => console.log(res));

function loadjs() {
    // fetch('http://localhost:3000/api/v1/download/app.js').then(res => {
    //     console.log(res)
    // })
    socket.emit('message', new Date().toString())
}
