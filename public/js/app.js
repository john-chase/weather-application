// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.textContent = ''
    msg2.textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            msg1.textContent = ''
            if(data.error){
                msg2.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})