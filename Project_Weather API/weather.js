//This function is needed to carry out API operations
//Boca Raton Link: https://api.open-meteo.com/v1/forecast?latitude=26.17&longitude=-80.20&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York
//Fort Lauderdale Link: https://api.open-meteo.com/v1/forecast?latitude=26.12&longitude=-80.14&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York
async function fetchData(){
    let url = "https://api.open-meteo.com/v1/forecast?latitude=26.17&longitude=-80.20&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_Yorkhttps://api.open-meteo.com/v1/forecast?latitude=26.17&longitude=-80.20&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York";
    let response = await fetch(url);
    let users = await response.json();

    console.log(users) // Use this so summon the entire API


    //Timezone information
    let temporal = [users.current_weather.time];
    let latnlon = [users.latitude,users.longitude];
    // let timezoneinfo
    document.getElementById("location").innerHTML = latnlon 
    document.getElementById("time").innerHTML = temporal
    

    //Wind information
    let windspeed = ("Windspeed: "+ [users.current_weather.windspeed] + " mph 💨");
    let winddirectiondegree = parseInt(users.current_weather.winddirection);
    let winddirection = 0
    if(0 <= winddirectiondegree <= 90){
        winddirection = "NE 🧭";
    }
    if(90 <= winddirectiondegree <= 180){
        winddirection = "SE 🧭";
    }
    if(180 <= winddirectiondegree <= 270){
        winddirection = "SW 🧭";
    }
    if(270 <= winddirectiondegree <= 360){
        winddirection = "NW 🧭";
    }

    let windstats = ("Wind Direction: " +winddirectiondegree+ winddirection)
    document.getElementById("windspeed").innerHTML = windspeed
    document.getElementById("windirection").innerHTML = windstats

    //Temp information
    let temp = (["Current Temp: "+ users.current_weather.temperature] + " \u00B0F  ");
    let high = (["Today's High: "+users.daily.temperature_2m_max[0]] + " \u00B0F  🔥");
    let low = (["Today's Low: "+users.daily.temperature_2m_min[0]] + " \u00B0F  ❄️");

    document.getElementById("temperature").innerHTML = temp
    document.getElementById("high").innerHTML = high
    document.getElementById("low").innerHTML = low

    
    // let precipitation
    let weathercode = ('Weathercode: ' + [users.current_weather.weathercode]);
    let precipitation = ("Rain Chance: " + users.hourly.precipitation_probability[0]+"% 🌧️ ");
    document.getElementById("precipitation").innerHTML = precipitation
    document.getElementById("weathercode").innerHTML = weathercode
    

    //Sunrise&Sunset and Daynight
    let sunrise= ("Sunrise:"+(users.daily.sunrise[0]));
    let sunset = ("Sunset:"+(users.daily.sunset[0]));
    let daynight = (users.hourly.is_day[0])
    if (daynight == 0){
        document.getElementById("dayornight").innerHTML = ("It is daytime!");
    }
    else{
        document.getElementById("dayornight").innerHTML = ("It is Nighttime!");
    }
    

    document.getElementById("sunrise").innerHTML = sunrise
    document.getElementById("sunset").innerHTML = sunset


}

fetchData()
