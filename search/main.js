const weatherColOne = document.querySelectorAll('.weather-col-one div');
const weatherColTwo = document.querySelectorAll('.weather-col-two div');
const storiesList = document.querySelectorAll('.stories-list li a');
const headings = document.querySelectorAll('.heading');
const linkSlide = document.querySelectorAll('.link-slide');
const linkAngle = document.querySelectorAll('.link-angle');
const dropNews = document.querySelectorAll(".drop-news");
const dropNewsPara = document.querySelectorAll(".dropnews-para");






let citiesColOne = ['Beijing', 'Buenos Aires', 'Cape Town', 'istanbul', 'Los Angeles',
'Mexico city', 'Mumbai', 'Paris', 'Singapore','Tokyo']
let citiesColTwo = ['Berlin', 'Cairo','Hong Kong', 'London', 'Madrid', 'Moscow', 'New York', 'Sao Paulo', 'Sydney', 'Toronto']

window.addEventListener('load', ()=>{
  addWeatherData(citiesColOne, weatherColOne);
  addWeatherData(citiesColTwo, weatherColTwo);

  addNews();



  


function addWeatherData(cities, weatherCol) {
  for(let i = 0; i < cities.length; i++){
    let cityCol= cities[i];
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityCol}&units=metric&appid=d42ebd3b4c60cb869471de00eb03f3e2`;
    fetch(api)
   .then(response => {
     return response.json();
   })
   .then(data=>{
     const {weather, main, name} = data;
       let weatherOne = weatherCol[i];
       weatherOne.childNodes[2].textContent = main.temp.toFixed() + '\u00B0';
       let iconCode = weather[0].icon;
       let url = ` http://openweathermap.org/img/wn/${iconCode}@2x.png`;
       weatherOne.childNodes[1].src = url;
       weatherOne.childNodes[0].textContent = name;

       const apiOne = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG&q=${cityCol}&offset=1`;
       fetch(apiOne)
       .then(responses=>{return responses.json()})
       .then(datum=>{
        let dataKey = datum[0].Key;
        weatherOne.setAttribute("data-colKey", dataKey);
        weatherOne.addEventListener('click', (e)=>{
         let Key = e.currentTarget.getAttribute("data-colkey");
        let dataKeyNumber = parseInt(Key, 10);
         sessionStorage.removeItem("data-link");
        sessionStorage.setItem("input", dataKeyNumber);
        window.location.href = "/Stack/acuu/link.html";
        })
        
       })
   })
  }
};
});

let timeNow = new Date();
let threeMonths = timeNow.getMonth() - 2;
let currentYear = timeNow.getFullYear();
let currentDate = timeNow.getDate();

function addNews() {
let threeMonthsDate;
if(threeMonths == 0 || Math.sign(threeMonths) == 1){
threeMonthsDate = threeMonths + 1;
}
else if(Math.sign(threeMonths) == -1){
  threeMonthsDate = 12 + parseInt(threeMonths, 10);
  currentYear= timeNow.getFullYear() - 1;
}
else{
  threeMonthsDate = threeMonths;
}

if(threeMonthsDate == 4 || threeMonthsDate == 6 || threeMonthsDate == 9 || threeMonthsDate == 11 ){
  if(currentDate > 30){
    currentDate = 30;
  }
}

if(threeMonthsDate == 2){
  currentDate = 28;
}

let currentMonth = timeNow.getMonth();
let keyword;
if(currentMonth == 11 || currentMonth == 0 || currentMonth == 1){
keyword = 'snow';
}
if(currentMonth == 10 || currentMonth == 9 || currentMonth == 8){
keyword = 'autumn';
}
if(currentMonth == 5 || currentMonth == 6 || currentMonth == 7){
keyword = 'summer';
}
if(currentMonth == 2 || currentMonth == 3 || currentMonth == 4){
keyword = 'spring'
}

url = `https://content.guardianapis.com/search?q=${keyword}&tag=environment/environment&from-date=${currentYear}-${threeMonthsDate}-${currentDate}&api-key=bf2fde55-838e-4a37-a4f3-09f720dbec2d`;

fetch(url)
  .then(b=>{
    return b.json();
  })
  .then(a =>{
  for(let j = 0; j < storiesList.length; j++){
    let dataLoop = a.response.results[j];
   
    let storiesListLoop = storiesList[j];
    let titleString;
    storiesListLoop.children[0].children[0].textContent = `${keyword} Weather`;
    if(dataLoop.webTitle.length > 70){
      let titleArray = dataLoop.webTitle.split(' ');
      let arraySlice = titleArray.slice(0, 10);
      arraySlice.splice(10, 0, "...");
      titleString = arraySlice.join(" ");
      storiesListLoop.children[0].children[1].textContent = titleString;
    }
    else{
    storiesListLoop.children[0].children[1].textContent = dataLoop.webTitle;
    }
    //storiesListLoop.children[1].src = dataLoop.image;
    storiesListLoop.href = dataLoop.webUrl;

    let timePosted = dataLoop.webPublicationDate;
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
  

   storiesListLoop.children[0].children[2].textContent = `${timeframe} ${varTime} ago`;
  
}
    
  
  }

  for(let j =0; j< dropNews.length; j++){
    let dataLoop = a.response.results[j];
    dropNews[j].href = dataLoop.webUrl;
    console.log(dropNews.href);
    dropNewsPara[j].textContent = dataLoop.webTitle;
    
  }

  
  
  })

};



for(let l = 0; l < headings.length; l++){
  let headingsList = headings[l];
  headingsList.addEventListener('click', (event)=>{
          let targets = event.currentTarget;
          for(let m = 0; m < linkSlide.length; m++){
          let linkSlides = linkSlide[m];
          let linkAngles = linkAngle[m];
          if(linkSlides.getAttribute('data-type') === targets.getAttribute('data-type')){         
            toggling(linkSlides, 'show');
            toggling(linkAngles, "rotate");    
              
           } else{
              classRemove(linkSlides, 'show');
              classRemove(linkAngles, "rotate");
           }
          }
      
  })
}




//68dbdbef74114b7aa8374a67132e9bc9-NEWS API KEY
//https://newsapi.org/v2/top-headlines?q=trump&apiKey=68dbdbef74114b7aa8374a67132e9bc9-query about a top

/*
const currentPos = document.querySelector('.pos');
const input = document.querySelector(".place");


input.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    e.preventDefault();
    let inputVal = input.value;
    if(input.value.length > 0){
    //const proxy = `https://cors-anywhere.herokuapp.com/`;
    const api = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=4&appid=d42ebd3b4c60cb869471de00eb03f3e2`;
    fetch(api)
    .then((response) =>{
      return response.json();
    })
    .then((data)=>{
      console.log(data);
      const {lat, lon}= data[0]; //use instead of data.properties
      const apitwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=d42ebd3b4c60cb869471de00eb03f3e2`;
      fetch(apitwo)
      .then (response =>{
        return response.json();
      })
      .then(i=>{
        console.log(i);
      })
      const mymap = L.map('maparea').setView([lat, lon], 13);
const attribution =  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> `;
const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);
    })
  
    }
  }
})*/


window.addEventListener('load', ()=> {

let long;
let lat;
 if(navigator.geolocation){ 
   navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    drawLocationMap(lat, long)
  }, () =>{
    drawWorldMap();
  })
}
else{
  drawWorldMap()
}

})

function drawWorldMap(){
    const mymap = L.map('maparea').setView([14.5994, 28.6731], 1);
    const attribution =  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> `;
    const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap); 
  
}

function drawLocationMap(lat, long){
    const mymap = L.map('maparea').setView([lat, long], 13);
    const attribution =  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> `;
    const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap);
  
}

/*const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=d42ebd3b4c60cb869471de00eb03f3e2`;
fetch(api)
.then((response) =>{
  return response.json();
}
)
.then((data)=>{
  console.log(data);
})


});
}

});






















/*ask.addEventListener('submit', ()=>{
  if(input.length > 0){
    console.log(input);
  //const api = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit={limit}&appid=d42ebd3b4c60cb869471de00eb03f3e2`;
  /*fetch(api)
  .then((response) =>{
    return response.json();
  })
  .then((data)=>{
    console.log(data);
  })
  }
  
})*/








