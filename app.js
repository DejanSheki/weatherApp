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
                console.log(value[1]);
                    const { temp, pod } = value[0].data[0];
                    const { description, icon } = value[0].data[0].weather;
                    const { city_name } = value[0];
                    const { aqi, pm25, pm10, o3, no2, so2, pollen_level_tree, pollen_level_grass, pollen_level_weed, mold_level } = value[1].data[0];

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
                    tree.textContent = pollen_level_tree;
                    grass.textContent = pollen_level_grass;
                    weed.textContent = pollen_level_weed;
                    mold.textContent = mold_level;

                    // AQI parameters
                    console.log(aqi);
                    if (aqi <= 50) {
                        airQuality.style.color = "#01e800";
                    } else if (aqi >= 51 && aqi <= 100) {
                        airQuality.style.color = "#ffff00";
                    } else if (aqi >= 101 && aqi <= 150) {
                        airQuality.style.color = "#ff8a00";
                    } else if (aqi >= 151 && aqi <= 200) {
                        airQuality.style.color = "#ff0500";
                    } else if (aqi >= 201 && aqi <= 300) {
                        airQuality.style.color = "#9a48a1";
                    } else if (aqi > 301) {
                        airQuality.style.color = "#890127";
                    }
                    // PM2.5
                    if (pm25 <= 30) {
                        airPm25.style.color = "#01e800";
                    } else if (pm25 >= 31 && pm25 <= 60) {
                        airPm25.style.color = "#ffff00";
                    } else if (pm25 >= 61 && pm25 <= 90) {
                        airPm25.style.color = "#ff8a00";
                    } else if (pm25 >= 91 && pm25 <= 120) {
                        airPm25.style.color = "#ff0500";
                    } else if (pm25 >= 121 && pm25 <= 250) {
                        airPm25.style.color = "#9a48a1";
                    } else if (pm25 > 250) {
                        airPm25.style.color = "#890127";
                    }
                    //PM1.0
                    if (pm10 <= 50) {
                        airPm10.style.color = "#01e800";
                    } else if (pm10 >= 51 && pm10 <= 100) {
                        airPm10.style.color = "#ffff00";
                    } else if (pm10 >= 101 && pm10 <= 250) {
                        airPm10.style.color = "#ff8a00";
                    } else if (pm10 >= 251 && pm10 <= 350) {
                        airPm10.style.color = "#ff0500";
                    } else if (pm10 >= 351 && pm10 <= 430) {
                        airPm10.style.color = "#9a48a1";
                    } else if (pm10 > 430) {
                        airPm10.style.color = "#890127";
                    }
                    // NO2
                    if (no2 <= 40) {
                        airNo2.style.color = "#01e800";
                    } else if (no2 >= 41 && no2 <= 80) {
                        airNo2.style.color = "#ffff00";
                    } else if (no2 >= 81 && no2 <= 180) {
                        airNo2.style.color = "#ff8a00";
                    } else if (no2 >= 181 && no2 <= 280) {
                        airNo2.style.color = "#ff0500";
                    } else if (no2 >= 281 && no2 <= 400) {
                        airNo2.style.color = "#9a48a1";
                    } else if (no2 > 400) {
                        airNo2.style.color = "#890127";
                    }
                    //O3
                    if (o3 <= 50) {
                        airO3.style.color = "#01e800";
                    } else if (o3 >= 51 && o3 <= 100) {
                        airO3.style.color = "#ffff00";
                    } else if (o3 >= 101 && o3 <= 168) {
                        airO3.style.color = "#ff8a00";
                    } else if (o3 >= 169 && o3 <= 208) {
                        airO3.style.color = "#ff0500";
                    } else if (o3 >= 209 && o3 <= 748) {
                        airO3.style.color = "#9a48a1";
                    } else if (o3 > 748) {
                        airO3.style.color = "#890127";
                    }

                    // SO2
                    if (so2 <= 40) {
                        airSo2.style.color = "#01e800";
                    } else if (so2 >= 41 && so2 <= 80) {
                        airSo2.style.color = "#ffff00";
                    } else if (so2 >= 81 && so2 <= 380) {
                        airSo2.style.color = "#ff8a00";
                    } else if (so2 >= 381 && so2 <= 800) {
                        airSo2.style.color = "#ff0500";
                    } else if (so2 >= 801 && so2 <= 1600) {
                        airSo2.style.color = "#9a48a1";
                    } else if (so2 > 1600) {
                        airSo2.style.color = "#890127";
                    }
                    // Pollen tree
                    if (pollen_level_tree == 1) {
                        tree.style.color = "#01e800";
                    } else if (pollen_level_tree == 2) {
                        tree.style.color = "#ffff00";
                    } else if (pollen_level_tree == 3) {
                        tree.style.color = "#ff8a00";
                    } else if (pollen_level_tree == 4) {
                        tree.style.color = "#ff0500";
                    }
                    // Pollen weed
                    if (pollen_level_weed == 1) {
                        weed.style.color = "#01e800";
                    } else if (pollen_level_weed == 2) {
                        weed.style.color = "#ffff00";
                    } else if (pollen_level_weed == 3) {
                        weed.style.color = "#ff8a00";
                    } else if (pollen_level_weed == 4) {
                        weed.style.color = "#ff0500";
                    }
                    // Pollen grass
                    if (pollen_level_grass == 1) {
                        grass.style.color = "#01e800";
                    } else if (pollen_level_grass == 2) {
                        grass.style.color = "#ffff00";
                    } else if (pollen_level_grass == 3) {
                        grass.style.color = "#ff8a00";
                    } else if (pollen_level_grass == 4) {
                        grass.style.color = "#ff0500";
                    }
                    // Pollen mold
                    if (mold_level == 1) {
                        mold.style.color = "#01e800";
                    } else if (mold_level == 2) {
                        mold.style.color = "#ffff00";
                    } else if (mold_level == 3) {
                        mold.style.color = "#ff8a00";
                    } else if (mold_level == 4) {
                        mold.style.color = "#ff0500";
                    }


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
