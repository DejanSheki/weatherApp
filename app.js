window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let temperatureDescription = document.querySelector('.temperature-description');
            let temperatureDegree = document.querySelector('.temperature-degree');
            let cityName = document.querySelector('.location-timezone');
            let iconDescription = document.querySelector('.icon');
            let airQuality = document.querySelector('.aqi');
            let airPm25 = document.querySelector('.pm25');
            let airPm10 = document.querySelector('.pm10');
            let airO3 = document.querySelector('.o3');
            let airNo2 = document.querySelector('.no2');
            let airSo2 = document.querySelector('.so2');
            let airCo = document.querySelector('.co');
            let predominant = document.querySelector('.predominant');
            let tree = document.querySelector('.tree');
            let grass = document.querySelector('.grass');
            let weed = document.querySelector('.weed');
            let mold = document.querySelector('.mold');

            // const proxy = 'https://cors-anywhere.herokuapp.com'
            const apiWeather = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lat=${lat}&lon=${long}`;
            const apiAirQuality = `https://air-quality.p.rapidapi.com/current/airquality?lon=${long}&lat=${lat}`;


            Promise.all([
                    fetch(apiWeather, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-key": "00a36c815amshe6c56b94c38c7a2p19bd28jsn1f3f126b68e4",
                            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
                        }
                    })
                    .then(value => value.json()),

                    fetch(apiAirQuality, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-key": "00a36c815amshe6c56b94c38c7a2p19bd28jsn1f3f126b68e4",
                            "x-rapidapi-host": "air-quality.p.rapidapi.com"
                        }
                    })
                    .then(value => value.json())
                ])
                .then((value) => {
                    console.log(value[0]);
                    const { temp, city_name, pod } = value[0].data[0];
                    const { description, icon } = value[0].data[0].weather;
                    const { aqi, pm25, pm10, o3, no2, so2, co, predominant_pollen_type, pollen_level_tree, pollen_level_grass, pollen_level_weed, mold_level } = value[1].data[0];

                    temperatureDegree.textContent = temp;
                    cityName.textContent = city_name;
                    temperatureDescription.textContent = description;
                    iconDescription.innerHTML = `<img src=" https://www.weatherbit.io/static/img/icons/${icon}.png" alt="Weather">`;
                    airQuality.textContent = aqi;
                    airPm25.textContent = pm25.toFixed(2);
                    airPm10.textContent = pm10.toFixed(2);
                    airO3.textContent = o3.toFixed(2);
                    airNo2.textContent = no2.toFixed(2);
                    airSo2.textContent = so2.toFixed(2);
                    airCo.textContent = co.toFixed(2);
                    predominant.textContent = predominant_pollen_type;
                    tree.textContent = pollen_level_tree;
                    grass.textContent = pollen_level_grass;
                    weed.textContent = pollen_level_weed;
                    mold.textContent = mold_level;


                    switch (pod) {
                        case 'd':
                            document.body.style.backgroundImage = "linear-gradient(190deg, rgb(109,159,241), rgb(3, 13, 70))";
                            break;

                        case 'n':
                            document.body.style.backgroundImage =
                                'linear-gradient(190deg, rgb(4, 58, 146), rgb(4, 8, 31))';
                            break;
                    }
                })

            .catch(err => {
                console.error(err);
            });
        });
    }

});