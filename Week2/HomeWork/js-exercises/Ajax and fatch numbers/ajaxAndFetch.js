let fact = document.querySelector('#fact')
let factText = document.querySelector('#factText')
let numerInput = document.querySelector('#numberInput')
// numerInput.addEventListener('input', getFactAjax);
numerInput.addEventListener('input', getFactFetch);
// function getFactAjax() {
//     let number = numerInput.value;
    
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://numbersapi.com/'+ number)
//     xhr.onload = function(){
//         if (this.status == 200 && number != ''){
//            // console.log(this.responseText)
//             fact.style.display = 'block'
//             factText.innerText = this.responseText
//         }
//     }
//     xhr.send()
// }
function getFactFetch() {
    let number = numerInput.value;
    fetch('http://numbersapi.com/'+ number)
    .then(response => response.text())
    .then(data => {
       // console.log(data)
        if(number != ''){
            fact.style.display = 'block'
            factText.innerText = data
        }
    })
    .catch(err => console.log(err))
}