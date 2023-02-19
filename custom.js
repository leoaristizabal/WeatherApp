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
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
//    api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
http://api.openweathermap.org/data/2.0/weather?q=bogota,Colombia&appid=ac4e1c9d0e5f8c69c468ac58d8be91bb   

fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404'){
                showError('Ciudad no encontrada...')
            } else{
                clearHTML();
                showWeather(dataJSON);
            }
            //console.log(dataJSON);
        })
        .catch(error=>{
            console.log(error);
        })

}

function showWeather(data){
    const {name,main:{temp, temp_min, temp_max}, weather:[arr]}= data;
   
    const degrees = kelvinToCentigrades(temp);
    const min = kelvinToCentigrades(temp_min);
    const max = kelvinToCentigrades(temp_max);
    
    const content = document.createElement('div');
    content.innerHTML = `
        <p>Agrega ciudad y pais</p>
        <h4>Clima en ${name}</h4>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="Icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);
    
    // console.log(name);
    // console.log(temp);
    // console.log(temp_max);
    // console.log(temp_min);
    // console.log(arr.icon);
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

function kelvinToCentigrades(temp){
    return parseInt (temp - 273.15);
}

function clearHTML(){
    result.innerHTML='';
}