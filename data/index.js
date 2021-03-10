
const search = document.querySelector('.search-column');
const links = document.querySelector('.links');
const linksList = document.querySelectorAll('.links li');
const now = document.getElementById("now");
const nowColumn = document.querySelector('.now-column');
const timeShow = document.querySelector('.time');
const windShow = document.querySelector('.wind');
const windGustShow = document.querySelector('.wind-gust');
const nowTemp = document.querySelector('.now-temp');
const weatherText = document.querySelector('.weather-text');
const tempUnit = document.querySelector('.temp-unit');
const nowAirqua = document.querySelector('.now-airqua');
const currentAirQua = document.querySelector('.currentair-qua');
const currentAirText = document.querySelector('.currentair-text');
const todayCast = document.querySelector('.today-forecast div');
const nightCast = document.querySelector('.tonight-forecast div');
const morrowCast = document.querySelector('.tomorrow-forecast div');
const todayCastTile = document.querySelector('.today-forecast');
const linkColumn = document.querySelectorAll('.link-column');
const first = document.querySelectorAll('.first');
const second = document.querySelectorAll('.second');
const third = document.querySelectorAll('.third');
const dailyTile = document.querySelectorAll('.daily');
const airquaRating = document.querySelector('.currentqua-rating');
const currentAirQuaVal = document.querySelector('.currentqua-val');
const city = document.querySelector('.city');
const cityTemp = document.querySelector('.city-temp');
const cityIcon = document.querySelector('.city-icon');
const navLoc = document.querySelector('.nav-loc');
const navLink = document.querySelectorAll('.nav-link');
const menuButton = document.querySelector('.menu-button');
const settingTile = document.querySelector('.setting-tile');
const metricChange = document.querySelector('.metric');
const metricDisplay =document.querySelector('.metric-display');
const closeSettings = document.querySelector('.settings-close');
const metricChoice = document.querySelectorAll('.metric span');
const navInput = document.querySelector('.nav-input');
const addLocation = document.querySelector('.addlocation');
const moreDetails = document.querySelectorAll('.more-details');
const countryRadar = document.querySelector(".country-radar");
const layerMap = document.querySelectorAll(".maplayer");
const nowIcon = document.querySelector('.now-icon');
const todayIcon = document.querySelector('.today-icon');
const tonightIcon = document.querySelector('.tonight-icon');
const tomorrowIcon = document.querySelector('.tomorrow-icon');
const hourIcon = document.querySelectorAll('.hour-icon');
const dailyIcon = document.querySelectorAll('.daily-icon');
const nowAirQuaNum = document.querySelector('.airqua-number');
const airquaNumber = document.querySelector('.airquality-number');
const hourAngleDown = document.querySelectorAll('.hour-angledown');
const hourSlide = document.querySelectorAll('.hour-slide');
const descriptionText = document.querySelectorAll('.description-text');
const descriptionTitle = document.querySelectorAll(".description-title");
const body = document.querySelector(".body");
const nav = document.querySelector("nav");
const container = document.querySelector(".container");
const furtherAhead = document.querySelector(".further-ahead");
const newsTileDiv = document.querySelectorAll(".news-tile div");
const newsListLink = document.querySelectorAll(".news-list a");
const onLink = document.querySelectorAll(".on-link");
const weatherNewsDiv = document.querySelectorAll(".weather-news div a");
const mapState = document.querySelectorAll(".map-state");
const currentAirQualityColour = document.querySelector(".currentairquality-colour");
const airQuaColour = document.querySelector(".airquacolour");
const settingsWeather = document.querySelector(".settings-weather");
const settingsLink = document.querySelectorAll(".settings-link");



let metricUnit;
for(let m=0; m < metricChoice.length; m++){
    metricChoice[m].addEventListener('click', (e)=>{
       if(e.target.getAttribute("data-metric") === "01"){
           metricDisplay.children[0].textContent = "Imperial (F, mph, in)"; 
           metricUnit = "false";
           if(isNaN(input) === false){
            //foreCast(input, metricUnit);
            hourlyCast(input, metricUnit);
            dailyForecast(input, metricUnit);
            cityData(input);
        }
           else{ 
            //foreCast(dataKey, metricUnit);
            hourlyCast(dataKey, metricUnit);
            dailyForecast(dataKey, metricUnit);
            cityData(dataKey);
        }
       } 
       else if(e.target.getAttribute("data-metric") === "02"){
        metricDisplay.children[0].textContent = "Metric(&8451, Km/H, Mm)";
        metricUnit = "true";
        if(isNaN(input) === false){
            //foreCast(input, metricUnit);
            hourlyCast(input, metricUnit);
            dailyForecast(input, metricUnit);
            cityData(input);
        }
        else{
        //foreCast(dataKey, metricUnit);
        hourlyCast(dataKey, metricUnit);
        dailyForecast(dataKey, metricUnit);
        cityData(dataKey);
    }
       }
    })
}


let input = sessionStorage.getItem("input");
let link = sessionStorage.getItem("data-link");


if(link !== null){
    console.log("got here");
    if(link === "01"){
        for(let j=0; j < linkColumn.length; j++){
            let linkColumns = linkColumn[j];
            body.style.display = "block";
            classRemove(linkColumns, "active");
            classAdd(linkColumn[3], "active");
            navLoc.style.display = "none";
            links.style.display = "none";
            classAdd(nav, "islink");
            classAdd(container, "islink");
            classAdd(furtherAhead, "islink");
            addNews();

            if(localStorage.getItem("onLinkRadar")){
                getRecentLocation();
                 
              }

              else{
                getGeolocation();
              }
        } 
    }

    else if(link === "03"){
        for(let j=0; j < linkColumn.length; j++){
            let linkColumns = linkColumn[j];
            body.style.display = "block";
            classRemove(linkColumns, "active");
            classAdd(linkColumn[6], "active");
            classAdd(nav, "islink");
            classAdd(container, "islink");
            classAdd(furtherAhead, "islink");
            navLoc.style.display = "none";
            links.style.display = "none";
            addNews();
        } 
    }
}

else{
window.addEventListener('load', ()=>{
    getDataKey(input)
    addNews()
});
}

let localizedName;
let area;
let dataKey;

function getDataKey(input){

if(isNaN(input) === false){
    /*let stringInput = input.toString();*/
   // foreCast(input, "true");
    hourlyCast(input, "true");
    dailyForecast(input, "true");
    cityData(input);
}


else{
/*
const cache = localStorage.getItem(input);
if(cache){
    return Promise.resolve(JSON.parse(cache));
}
localStorage.setItem(input, JSON.stringify(data));*/
const api = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${input}&apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG`;
fetch(api)
.then(response =>{
    return response.json();
})
.then(data =>{
    body.style.display = "block";
    for(let i = 0; i < data.length; i++){
      let list = document.createElement('li');         
             let datum = data[i];
            localizedName = datum.LocalizedName;
              let country = datum.Country.ID;
              area = datum.AdministrativeArea.LocalizedName;
              let text = `${localizedName} ${area}, ${country}`;
             list.textContent = text;
             search.appendChild(list);
             let key = datum.Key;
             list.setAttribute("data-key", key);
             classAdd(search, 'active');
             navLoc.style.display = "none";
             links.style.display = "none";
             classAdd(nav, "islink");
             classAdd(container, "islink");
             classAdd(furtherAhead, "islink");
             list.addEventListener('click', (e)=>{
              dataKey = e.target.getAttribute("data-key");
                //foreCast(dataKey, "true");
                hourlyCast(dataKey, "true")
                dailyForecast(dataKey, "true");
                cityData(dataKey);
                //body.style.display = "none";
                
             })
    }
})
}
            

}

function classRemove(element, name) {
    element.className = element.className.replace(name, "");
}

function classAdd(element, name) {
    let arr;
    arr = element.className.split(" ");
    if(arr.indexOf(name) == -1) {
        element.className += " " + name;
    }
    }

function toggling(element, name) {
        let classCall = element.className.split(' ');
        let index = classCall.indexOf(name);
    
        if(index >= 0) classCall.splice(index, 1);
        else classCall.push(name);
        element.className = classCall.join(" ");
}    

function airQualityCheck(airQuaVal, airquaElement, colourElement) {
    if(airQuaVal >= 0 && airQuaVal <= 19){
    airquaElement.textContent = `The air quality is ideal for most individuals; enjoy your normal outdoor activities.`;
    colourElement.style.background = "lime";
    }

    else if(airQuaVal >= 20 && airQuaVal <= 49){
        airquaElement.textContent = `The air quality is generally acceptable for most individuals. 
        However, sensitive groups may experience minor to moderate symptoms from long-term exposure.`;
        colourElement.style.background = "yellow";

    }

    else if(airQuaVal >= 50 && airQuaVal <= 99){
        airquaElement.textContent = `The air has reached a high level of pollution and is unhealthy for sensitive groups. 
        Reduce time spent outside if you are feeling symptoms such as difficulty breathing or throat irritation.`;
        colourElement.style.background = "orangered";

    }

    else if(airQuaVal >= 100 && airQuaVal <= 149){
        airquaElement.textContent = `Health effects can be immediately felt by sensitive groups. 
        Healthy individuals may experience difficulty breathing and throat irritation with prolonged exposure. Limit outdoor activity.`;
        colourElement.style.background = "darkred";

    }

    else if(airQuaVal >= 150 && airQuaVal <= 249){
        airquaElement.textContent = `Health effects will be immediately felt by sensitive groups and should avoid outdoor activity. 
        Healthy individuals are likely to experience difficulty breathing and throat irritation; consider staying indoors and rescheduling outdoor activities.`;
        colourElement.style.background = "palevioletred";

    }

    else if(airQuaVal >= 250){
        airquaElement.textContent = `Any exposure to the air, even for a few minutes, can lead to serious health effects on everybody. Avoid outdoor activities.`;
        colourElement.style.background = "purple";

    }
}

for(let i =0 ; i < linksList.length; i++){
  linksList[i].addEventListener('click', (e)=>{
      classRemove(nowColumn, "active");
      for(let j =0; j < linkColumn.length; j++){
   let linkColumns = linkColumn[j];
   if(linkColumns.getAttribute("data-link") === e.target.getAttribute("data-link")){
       classAdd(linkColumns, "active")
   }
   else{
       classRemove(linkColumns, "active");
   }

   for(let k =0; k < navLink.length; k++){
    let navLinks = navLink[k];
    if(navLinks.getAttribute("data-link") === e.target.getAttribute("data-link")){
        navLinks.style.display ="none";
    }
    else{
        navLinks.style.display = "block";
        navLinks.style.display = "flex";
       
    }

 }


}
  })

}

for(let i=0; i < navLink.length; i++){
    let navLinks = navLink[i];
    navLinks.addEventListener('click', (e)=>{
        for(let j=0; j < linkColumn.length; j++){
            let linkColumns = linkColumn[j];
        if(linkColumns.getAttribute("data-link") === e.currentTarget.getAttribute("data-link")){
            classAdd(linkColumns, "active");
        }
        else{
            classRemove(linkColumns, "active");
        }
        
    }
    })
}


for(let i=0; i < settingsLink.length; i++){
    let settingsLinks = settingsLink[i];
    settingsLinks.addEventListener('click', (e)=>{
        for(let j=0; j < linkColumn.length; j++){
            let linkColumns = linkColumn[j];
        if(linkColumns.getAttribute("data-link") === e.currentTarget.getAttribute("data-link")){
            classAdd(linkColumns, "active");
            settingTile.style.display = "none";
        }
        else{
            classRemove(linkColumns, "active");
        }
        
    }
    })
}




for(let i=0; i < moreDetails.length; i++){
    moreDetails[i].addEventListener('click', ()=>{
        for(let j =0; j < linkColumn.length; j++){
            classRemove(linkColumn[j], "active");
            classAdd(linkColumn[4], "active");
            navLink[2].style.display = "none";
        }

        
    })
}


menuButton.addEventListener('click', ()=>{
settingTile.style.display = 'block';
})

closeSettings.addEventListener('click', ()=>{
    settingTile.style.display = "none";
})

metricDisplay.addEventListener('click', ()=>{
    toggling(metricChange, 'show');
})



function foreCast(dataKey, metricBool, time){ 
   

const apiCurrent = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${dataKey}?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&details=true&metric=${metricBool}`;
fetch(apiCurrent)
.then(reply =>{
    return reply.json();
})
.then(currentLoc =>{
    
   let dailyCast = currentLoc.DailyForecasts;
   navLoc.style.display = "block";
  
   cityTemp.textContent = dailyCast[0].RealFeelTemperature.Minimum.Value.toFixed() + `\u00B0`;
   classRemove(search, "active");
  
   /*for(let j=0; j < linkColumn.length; j++){
    let linkColumns = linkColumn[j];
    classRemove(linkColumns, "active");
} */
   classAdd(nowColumn, "active");
   links.style.display = "block";
   links.style.display = "flex";
   
   
   
   

   //use callback to get time of day value and get gmt in the savedata function
   //also get to decide the api to call deoending on wha is clicked
 
  if(time === false){
   let windDirection = dailyCast[0].Night.Wind.Direction.Localized;
   let windUnit = dailyCast[0].Night.Wind.Speed.Unit;
   let windVal = dailyCast[0].Night.Wind.Speed.Value;
   windShow.textContent = `${windDirection} ${windVal} ${windUnit}`; 

   let windGustVal = dailyCast[0].Night.WindGust.Speed.Value;
   let windGustUnit = dailyCast[0].Night.WindGust.Speed.Unit;
   windGustShow.textContent = `${windGustVal} ${windGustUnit}`;
      
  weatherText.textContent = dailyCast[0].Night.ShortPhrase;
  todayCastTile.style.display = "none";

  let iconNumber = dailyCast[0].Night.Icon.toString();

  if(iconNumber.length === 1){
    nowIcon.src = `https://developer.accuweather.com/sites/default/files/0${iconNumber}-s.png`;
    cityIcon.src = `https://developer.accuweather.com/sites/default/files/0${iconNumber}-s.png`;
  }
  else{
    nowIcon.src = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
    cityIcon.src =  `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
  }
}
else{
   let windDirection = dailyCast[0].Day.Wind.Direction.Localized;
   let windUnit = dailyCast[0].Day.Wind.Speed.Unit;
   let windVal = dailyCast[0].Day.Wind.Speed.Value;
   windShow.textContent = `${windDirection} ${windVal} ${windUnit}`; 

   let windGustVal = dailyCast[0].Day.WindGust.Speed.Value;
   let windGustUnit = dailyCast[0].Day.WindGust.Speed.Unit;
   windGustShow.textContent = `${windGustVal} ${windGustUnit}`;
      
  weatherText.textContent = dailyCast[0].Day.ShortPhrase;
  todayCastTile.style.display = "block";
  let iconNumber = dailyCast[0].Day.Icon.toString();

 
  if(iconNumber.length === 1){
    nowIcon.src = `https://developer.accuweather.com/sites/default/files/0${iconNumber}-s.png`;
    cityIcon.src = `https://developer.accuweather.com/sites/default/files/0${iconNumber}-s.png`;
  }
  else{
    nowIcon.src = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
    cityIcon.src =  `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
  }
 

}


  nowTemp.textContent = dailyCast[0].RealFeelTemperature.Minimum.Value.toFixed() + `\u00B0`;
  tempUnit.textContent = dailyCast[0].Temperature.Maximum.Unit;

  nowAirqua.textContent = dailyCast[0].AirAndPollen[0].Category;
  currentAirQua.textContent = dailyCast[0].AirAndPollen[0].Category;
  let airQuaVal = dailyCast[0].AirAndPollen[0].Value;
  nowAirQuaNum.textContent = airQuaVal;
  airquaNumber.textContent = airQuaVal;

  airQualityCheck(airQuaVal, currentAirText, currentAirQualityColour);


todayCast.children[0].children[1].textContent = dailyCast[0].Temperature.Maximum.Value.toFixed() +`\u00B0`;
todayCast.children[1].textContent = dailyCast[0].Day.ShortPhrase;
let todayIconNumber = dailyCast[0].Day.Icon.toString();
(todayIconNumber.length === 1) ? todayIcon.src = `https://developer.accuweather.com/sites/default/files/0${todayIconNumber}-s.png` : todayIcon.src = `https://developer.accuweather.com/sites/default/files/${todayIconNumber}-s.png`;


nightCast.children[0].children[1].textContent = dailyCast[0].Temperature.Minimum.Value.toFixed() + `\u00B0`;
nightCast.children[1].textContent = dailyCast[0].Night.ShortPhrase;
let tonightIconNumber = dailyCast[0].Night.Icon.toString();
(tonightIconNumber.length === 1) ? tonightIcon.src = `https://developer.accuweather.com/sites/default/files/0${tonightIconNumber}-s.png` : tonightIcon.src = `https://developer.accuweather.com/sites/default/files/${tonightIconNumber}-s.png`;

morrowCast.children[0].children[1].textContent = dailyCast[1].Temperature.Maximum.Value.toFixed() + `\u00B0`;
morrowCast.children[1].textContent = dailyCast[1].Day.ShortPhrase;
let tomorrowIconNumber = dailyCast[1].Day.Icon.toString();
(tomorrowIconNumber.length === 1) ? tomorrowIcon.src = `https://developer.accuweather.com/sites/default/files/0${tomorrowIconNumber}-s.png` : tomorrowIcon.src = `https://developer.accuweather.com/sites/default/files/${tomorrowIconNumber}-s.png`


   
})

body.style.display = "block";
classRemove(nav, "islink");
classRemove(container, "islink");
classRemove(furtherAhead, "islink");
for(i=0; i < onLink.length; i++){
    classRemove(onLink[i], "on-link");
    classAdd(onLink[i], "nav-link");
}
}

let timeofDay;

function hourlyCast(dataKey, metricBool){
localStorage.setItem("onLinkRadar", dataKey);
const apiOne = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${dataKey}?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&details=true&metric=${metricBool}`;
fetch(apiOne)
.then(val =>{
    return val.json();
})
.then(hourly =>{
    for(let k = 0; k < 6; k++){
        first[k].children[2].textContent = hourly[k].Temperature.Value.toFixed() + `\u00B0`;
        first[k].children[3].textContent = hourly[k].IconPhrase;
        first[k].children[4].textContent = hourly[k].PrecipitationProbability + `%`;
        let hourIconNumber = hourly[k].WeatherIcon.toString();
        (hourIconNumber.length === 1) ? hourIcon[k].src = `https://developer.accuweather.com/sites/default/files/0${hourIconNumber}-s.png` : hourIcon[k].src = `https://developer.accuweather.com/sites/default/files/${hourIconNumber}-s.png`;
        

        second[k].children[0].children[1].textContent = hourly[k].Rain.Value + " " + hourly[k].Rain.Unit;
        second[k].children[1].children[1].textContent = hourly[k].UVIndex + " " +  hourly[k].UVIndexText;
        second[k].children[2].children[1].textContent = hourly[k].Wind.Direction.Localized + " " + hourly[k].Wind.Speed.Value + " " + hourly[k].Wind.Speed.Unit;
        second[k].children[3].children[1].textContent = hourly[k].WindGust.Speed.Value + " " + hourly[k].WindGust.Speed.Unit;
        second[k].children[4].children[1].textContent = hourly[k].RelativeHumidity + ` %`;

        third[k].children[0].children[1].textContent = hourly[k].IndoorRelativeHumidity + ` %`;
        third[k].children[1].children[1].textContent = hourly[k].DewPoint.Value + `\u00B0` + " " + hourly[k].DewPoint.Unit;
        third[k].children[2].children[1].textContent = hourly[k].CloudCover + ` %`;
        third[k].children[3].children[1].textContent = hourly[k].Visibility.Value + " " + hourly[k].Visibility.Unit;
        third[k].children[4].children[1].textContent = hourly[k].Ceiling.Value + " " + hourly[k].Ceiling.Unit;
        
      
        
    }
    timeofDay = hourly[0].IsDaylight;
    foreCast(dataKey, metricBool, timeofDay);
})

}



function dailyForecast(dataKey, metricBool){
    const apiTwo = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${dataKey}?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&details=true&metric=${metricBool}`;
                 fetch(apiTwo)
                 .then(value =>{
                     return value.json();
                 })
                 .then(daily =>{                 
                     for(let l =0; l < daily.DailyForecasts.length; l++){
                        let day = daily.DailyForecasts[l];
                         dailyTile[l].children[2].children[0].textContent = day.Temperature.Maximum.Value.toFixed() + `\u00B0`;
                         dailyTile[l].children[2].children[1].textContent = `/` + day.Temperature.Minimum.Value.toFixed() + `\u00B0`;
                         
                         (timeofDay === false) ? dailyTile[l].children[3].textContent = day.Night.ShortPhrase: dailyTile[l].children[3].textContent = day.Day.ShortPhrase;
                         (timeofDay === false) ? dailyTile[l].children[4].textContent = day.Day.PrecipitationProbability + ` %` :dailyTile[l].children[4].textContent = day.Day.PrecipitationProbability + ` %`;
                         let dailyIconNumber;
                         (timeofDay === false) ?  dailyIconNumber = day.Day.Icon.toString() : dailyIconNumber = day.Night.Icon.toString();
            
                        (dailyIconNumber.length === 1) ? dailyIcon[l].src = `https://developer.accuweather.com/sites/default/files/0${dailyIconNumber}-s.png` : dailyIcon[l].src = `https://developer.accuweather.com/sites/default/files/${dailyIconNumber}-s.png`;  
                        
                                        
                     }

                     airquaRating.textContent = daily.DailyForecasts[0].AirAndPollen[0].Category;
                     currentAirQuaVal;
                     let airQuaValue = daily.DailyForecasts[0].AirAndPollen[0].Value;
                     airQualityCheck(airQuaValue, currentAirQuaVal, airQuaColour);
                 })
}

let dayString;
function cityData(dataKey){
const apiThree = `http://dataservice.accuweather.com/locations/v1/${dataKey}?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&details=true`;
fetch(apiThree)
.then(city =>{
    return city.json();
})
.then(cities =>{
    let data = cities.LocalizedName + ", "  + cities.AdministrativeArea.LocalizedName;
    city.textContent = data;
    settingsWeather.textContent = data + " Weather";
    saveDataToLocalStorage(data, dataKey);
    //saveDataToLocalStorage(null, dataKey);


let offset = cities.Details.StationGmtOffset;
   let time = new Date();
   let offsetTimeHour = time.getUTCHours() + offset;
   let offsetTimeMinutes = time.getUTCMinutes();
   let timeMeridian;
   offsetTimeHour > 12 ? timeMeridian = "PM" : timeMeridian = "AM";  
   let currentTimeHour = offsetTimeHour.toLocaleString('en-us', {hour: "numeric", hour12: true});
   let currentTimeMinutes = offsetTimeMinutes.toLocaleString('en-us', {minutes: "numeric"});
   timeShow.textContent = currentTimeHour + `:` + currentTimeMinutes + ` ` + timeMeridian;
   
   for(let k =0; k < 6; k++){
    let timeHourMeridian;
    let offsetHour = offsetTimeHour + k;
    offsetHour > 12 ? timeHourMeridian = "PM" : timeHourMeridian = "AM"; 
    let currentHour =  offsetHour.toLocaleString('en-us', {hour: "numeric", hour12: true});
    first[k].children[0].textContent = currentHour + " " + timeHourMeridian;
   }

  let offsetMili = time.getUTCMilliseconds() + (offset * 3600 * 1000);
   let getDate = new Date();
   let setMilli = getDate.setMilliseconds(offsetMili)
   let day = new Date(setMilli).getDay();
  /* let month = new Date(setMilli).getMonth();
   let date = new Date(setMilli).getDate();*/
   
   
  for(let k=0; k < dailyTile.length; k++){
   stringDay(day + k);
   dailyTile[k].children[0].textContent = dayString;
} 

let country = cities.Country.LocalizedName;
let region = cities.Region.LocalizedName;
addLocation.innerHTML += `
<span><i class="fa fa-angle-right"></i></span>
<span>${region}</span>
<span><i class="fa fa-angle-right"></i></span>
<span>${country}</span>
<span><i class="fa fa-angle-right"></i></span>
<span>${cities.LocalizedName}</span>`;
let lat = cities.GeoPosition.Latitude;
let long = cities.GeoPosition.Longitude;
weatherRadar(country, lat, long)



  
})
}



navInput.addEventListener('input', (e)=>{
    let val = e.target.value;
   if(val.length > 0){
navInput.addEventListener('keyup', (e)=>{
        if(e.keyCode === 13){
        sessionStorage.setItem("input", val);    
        location.reload();
    }
    })
}
})



function saveDataToLocalStorage(data, dataKey)
{  
        let keyArray = [];
        keyArray = JSON.parse(localStorage.getItem('previousKeys')) || [];
        if(keyArray.includes(dataKey)){}
        else{
        if(keyArray.length > 5){
                keyArray.pop();
                keyArray.unshift(dataKey);
        localStorage.setItem('previousKeys', JSON.stringify(keyArray));
        console.log(JSON.parse(localStorage.getItem('previousKeys')))
        }
        else{
        keyArray.push(dataKey);
        localStorage.setItem('previousKeys', JSON.stringify(keyArray));
        console.log(JSON.parse(localStorage.getItem('previousKeys')))
    }
    }

    let locArray = [];
    locArray = JSON.parse(localStorage.getItem('previousLocations')) || [];
    if(locArray.includes(data)){}
    else{
    if(locArray.length > 5){
            locArray.pop();
            locArray.unshift(data);
    localStorage.setItem('previousLocations', JSON.stringify(locArray));
    }
    else{
    locArray.push(data);
    localStorage.setItem('previousLocations', JSON.stringify(locArray));
}

}
}




function stringDay(day) {
    switch (day) {
        case 0:
            dayString = "Sunday";
            break;
    
       case 1:
           dayString = "Monday";
           break;
       
       case 2:
           dayString = "Tuesday";
           break;

       case 3:
         dayString = "Wednesday";
         break;
         
       case 4:
        dayString = "Thursday";
        break;

        case 5:
        dayString = "Friday";
        break;  

        case 6:
        dayString = "Saturday";
    }

   

  }


  function weatherRadar(country, lat, long){
    countryRadar.textContent = country.toUpperCase() + ` WEATHER RADAR`;
    let map = L.map('map').setView([lat, long], 13);       
    const attribution =  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> `;
     const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
    const tiles = L.tileLayer(tileUrl, {attribution});
    setTimeout(function () { map.invalidateSize() }, 4000);
    console.log(map.invalidateSize());
    tiles.addTo(map);          
    
  }


  for(let l = 0; l < first.length; l++){
    let firstElements = first[l];
    firstElements.addEventListener('click', (event)=>{
            let targets = event.target;
            for(let m = 0; m < hourSlide.length; m++){
            let hourSlides = hourSlide[m];
            let hourAngleDowns = hourAngleDown[m];
            if(hourSlides.getAttribute('data-slide') === targets.getAttribute('data-slide') || hourSlides.getAttribute('data-slide') === event.currentTarget.getAttribute('data-slide') ){         
              toggling(hourSlides, 'show');
              toggling(hourAngleDowns, "rotate");    
                
             } else{
                classRemove(hourSlides, 'show');
                classRemove(hourAngleDowns, "rotate");
             }
            }
        
    })
  }


  for(let i = 0; i < descriptionTitle.length; i++){
      descriptionTitle[i].addEventListener('click', (e)=>{
       if(e.currentTarget.getAttribute("data-active") === "01"){
           classRemove(descriptionText[1], "active"); 
           classAdd(descriptionText[0], "active");
       }
       else if(e.currentTarget.getAttribute("data-active") === '02'){ 
           classRemove(descriptionText[0], "active"); 
           classAdd(descriptionText[1], "active");
           }
      })
  }

  function addNews() {
      const newsApi = `https://content.guardianapis.com/search?q=weather&tag=environment/environment&api-key=bf2fde55-838e-4a37-a4f3-09f720dbec2d`;
      fetch(newsApi)
      .then(response =>{
          return response.json();
      })
      .then(newsData=>{
          for(let i = 0; i < newsTileDiv.length; i++){
          let newsResponse = newsData.response.results[i];
            newsTileDiv[i].children[0].textContent =   newsResponse.sectionName;
            newsTileDiv[i].children[1].textContent = newsResponse.webTitle;
            newsListLink[i].href = newsResponse.webUrl;
          }
newsColumn();
         
               

      })
  }

  /*function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}*/



    for(i=0; i < onLink.length; i++){
        classRemove(onLink[i], "nav-link");
        
        onLink[i].addEventListener("click", (e)=>{
            classRemove(search, "active");          
                if(e.currentTarget.getAttribute("data-link") === "04"){
                    classAdd(linkColumn[3], "active");
                    classRemove(linkColumn[5], "active");
                  if(localStorage.getItem("onLinkRadar")){
                    getRecentLocation();
                     
                  }

                  else{
                    getGeolocation();
                  }
                }

                else if(e.currentTarget.getAttribute("data-link") === "04"){
                    classAdd(linkColumn[5], "active");
                    classRemove(linkColumn[3], "active");
                }

            else{
                classRemove(linkColumns, "active");
            }
        })
        
    }


function getGeolocation(){
    if(navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude;
         lat = position.coords.latitude;

         const apiOne = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&q=${lat}%2C%20${long}&toplevel=true`
         fetch(apiOne)
         .then(response=>{
             return response.json();
         })
         .then(geolocate=>{
             let country = geolocate.Country.LocalizedName;
             weatherRadar(country, lat, long);
            })
         
       }, () =>{
         
        alert("Please turn on Location")
       })
     }
     else{
       alert("please turn on Location")
     }
}


function getRecentLocation(){
  let recentLocation = localStorage.getItem("onLinkRadar");
  const apiCity = `http://dataservice.accuweather.com/locations/v1/${recentLocation}?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&details=true`;
fetch(apiCity)
.then(city =>{
    return city.json();
})
.then(cities =>{
let country = cities.Country.LocalizedName;
let lat = cities.GeoPosition.Latitude;
let long = cities.GeoPosition.Longitude;
weatherRadar(country, lat, long)
})
}


function newsColumn(){  
  getKeyword();  

}

function getKeyword() {
 let keyword;
 let timeNow = new Date();
let currentMonth = timeNow.getMonth();
if(currentMonth == 11 || currentMonth == 0 || currentMonth == 1){
 keyword = 'snow';
}
else if(currentMonth == 10 || currentMonth == 9 || currentMonth == 8){
 keyword = 'autumn';
}
else if(currentMonth == 5 || currentMonth == 6 || currentMonth == 7){
 keyword = 'summer';
}
else if(currentMonth == 2 || currentMonth == 3 || currentMonth == 4){
 keyword = 'spring'
}
console.log(keyword)
newsApi(keyword);
}

function newsApi(keyword){
    const newsColumnApi = `https://content.guardianapis.com/search?q=${keyword}&tag=environment/environment&api-key=bf2fde55-838e-4a37-a4f3-09f720dbec2d`;
    fetch(newsColumnApi)
    .then(response =>{
        return response.json();
    })
    .then(newsData=>{
     for(let i =0; i< weatherNewsDiv.length; i++){
    weatherNewsDiv[i].children[1].textContent = newsData.response.results[i].webTitle;
    weatherNewsDiv[i].children[0].textContent = newsData.response.results[i].sectionName;
    weatherNewsDiv[i].href = newsData.response.results[i].webUrl;
    let timePosted = newsData.response.results[i].webPublicationDate;
    let getSecondsPost = new Date(timePosted).getTime();
    let difference = Date.now() - getSecondsPost;
    let timeframe;
    let minutes;
    let hours;
    let day;
    let month;
    let varTime;
    let seconds;
    if(difference){
    seconds = difference/1000;
    timeframe = seconds.toFixed();
    varTime = (timeframe <=1) ? "second" : "seconds";
    if(seconds >= 60){
       minutes = seconds/60;
      timeframe = minutes.toFixed();
      varTime = (timeframe <=1) ? "minute" : "minutes";
      if(minutes >= 60){
        hours = minutes/60;
        timeframe = hours.toFixed();
        varTime =(timeframe <=1) ?"hour": "hours";
        if(hours >= 24){
          day = hours/24;
         timeframe = day.toFixed();
         varTime = (timeframe <=1) ? "day" : "days";
          if(day >=30){
             month = day/30;
            timeframe = month.toFixed();
            varTime = (timeframe <= 1) ? "month" : "months";
           
          }
        }
      }
    }
}

   weatherNewsDiv[i].children[2].textContent = `${timeframe} ${varTime} ago`;

     }
    })
}

