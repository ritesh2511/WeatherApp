const cityForm = document.querySelector('.change-location');

const card = document.querySelector('.card');

const details = document.querySelector('.details');

const time = document.querySelector('img.time');

const icon = document.querySelector('.icon img');

const updateUI = (data) =>{
    const cityDets = data.cityDetails;
    const weather = data.weather;


    //destructure properties

    // const {cityDetails, weather} = data;

    //update details temp

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    let timeSrc = null;

    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }
    else{
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async(city) =>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather }; // object shorthand notation

}


cityForm.addEventListener('submit', e =>{
    //prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city


    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});