const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity= document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(nameCity.value==='' || nameCountry.value ===''){
        showError('Ambos campos son obligarotios...');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

function callAPI(city, country){
    const apiId = 'ac4e1c9d0e5f8c69c468ac58d8be91bb';
    const url = `http://api.openweathermap.org/data/2.0/weather?q=${city},${country}&appid=${apiId}`;
//    api.openweathermap.org/data/2.0/weather?q={city name},{state code},{country code}&appid={API key}
http://api.openweathermap.org/data/2.0/weather?q=bogota,Colombia&appid=c4e1c9d0e5f8c69c468ac58d8be91bb   
fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            console.log(dataJSON);
        })

}

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML= message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}