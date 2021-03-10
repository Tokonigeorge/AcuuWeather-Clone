const searchPlace = document.querySelector('.search');
const closeSearch = document.querySelector('.close-search');
const currentPos = document.querySelector('.current');
const askPanel = document.querySelector('.ask-panel');
const panelIcon = document.querySelector('.panel-icon');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const askDummy = document.querySelector('.ask-dummy');
const lists = document.querySelectorAll('.nav-list li');
const dropdownEl = document.querySelectorAll(".dropdown .drop");
const dropDown = document.querySelector('.dropdown');
const navAsk = document.querySelector('.nav-ask');
const addRecent = document.querySelector('.add-recent');
const close = document.querySelector('.close');
const hamburger = document.querySelector('.fa-bars');
const menuClose = document.querySelector('.menu-close');
const overlay = document.querySelector('.overlay');
const menuDrop = document.querySelectorAll('.menu .menu-list');
const menuAccordion = document.querySelectorAll('.slide');
const autoSearch = document.querySelectorAll('.auto-search div');
const autoSearchEl = document.querySelector('.auto-search');
const addRecentAuto = document.querySelectorAll('.current-loc div');
const ask = document.querySelector('.ask');
const locPlacements = document.querySelectorAll('.location-placement div');
const dropRecent = document.querySelectorAll('.drop-recentloc div');
const linked = document.querySelectorAll('.linked');
const menuAngle = document.querySelectorAll('.menu-angle');
const menuLinks = document.querySelectorAll('.menu-links');


searchPlace.addEventListener('focus', ()=>{
    classAdd(currentPos, 'show');
   
});

/*searchPlace.addEventListener('keypress', ()=>{
    classAdd(closeSearch, 'show');
});*/

closeSearch.addEventListener('click', ()=>{
    searchPlace.value = "";
    classRemove(closeSearch, 'show');
    autoCompleteHide(autoSearch);
});

searchPlace.addEventListener('input', (e)=>{
    let val = e.target.value;
    if(val.length === 0){
        classRemove(closeSearch, 'show');
    }
    else{
        classAdd(closeSearch, 'show');
    }
    searchPlace.addEventListener('keyup', (e)=>{
        if(e.keyCode === 13){
        if(val.length > 0){
             sessionStorage.setItem("input", val);
             sessionStorage.removeItem("data-link");
             window.location.href = "/Stack/acuu/data/index.html";
        }
    }
    })

    if(val.length >= 3){
        autoCompleteShow(val, autoSearch);
      
 }

  else if(val.length < 3){
      autoCompleteHide(autoSearch);
  }
   
})

ask.addEventListener('input', (e)=>{
    let val = e.target.value;
    
    ask.addEventListener('keyup', (e)=>{
        if(e.keyCode === 13){
            if(val.length > 0){
            sessionStorage.setItem("input", val);
            sessionStorage.removeItem("data-link");
            window.location.href = "/Stack/acuu/data/index.html";
            }
        }
    })
    if(val.length >=3){
        autoCompleteShow(val, addRecentAuto)
    }
    else if(val.length < 3){
        autoCompleteHide(addRecentAuto);
    }

})


function autoCompleteShow(val, elements){
    /*const cacheAutocomplete = localStorage.getItem(val);
    if(cacheAutocomplete){
        return Promise.resolve(JSON.parse(cacheAutocomplete));    
    }*/
    const api = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${val}&apikey=xXFm5YvntY5MrKCNLARz3tWUqVjoDozG`;
    fetch(api)
    .then(response=>{
        return response.json();
    })
    .then(autoComplete=>{
       /* localStorage.setItem(val, JSON.stringify(autoComplete));*/
       
      if(autoComplete.length >= 5){
      for(let i = 0; i < 5; i++){
          let complete = autoComplete[i];
          let localizedName = complete.LocalizedName;
          let country = complete.Country.ID;
          let area = complete.AdministrativeArea.LocalizedName;
          let text = `${localizedName} ${area}, ${country}`;
          let auto = elements[i];
          auto.style.display = 'block';
          auto.textContent = text;
          let key = complete.Key;
          auto.setAttribute("data-key", key);
          
         auto.addEventListener('click', (e)=>{
           let dataKey = e.target.getAttribute("data-key");
           let dataKeyNumber = parseInt(dataKey, 10);
            sessionStorage.setItem("input", dataKeyNumber);
            sessionStorage.removeItem("data-link");
           window.location.href = "/Stack/acuu/data/index.html";
      })
    }}

    else{
        for(let j = 0; j < autoComplete.length; j++){ 
            let list = autoComplete[j];
            let localizedName = list.LocalizedName;
          let country = list.Country.ID;
          let area = list.AdministrativeArea.LocalizedName;
          let text = `${localizedName} ${area}, ${country}`;
          let auto = elements[j];
          auto.style.display = 'block';
          auto.textContent = text;
          let key = list.Key;
           auto.setAttribute("data-key", key);
          auto.addEventListener('click', (e)=>{
            let dataKey = e.target.getAttribute("data-key");
            let dataKeyNumber = parseInt(dataKey, 10);
            sessionStorage.setItem("input", dataKeyNumber);
            sessionStorage.removeItem("data-link");
            window.location.href = "/Stack/acuu/data/index.html";
           
         })
        }
    }
})
}


function autoCompleteHide(elements){
    for(let k = 0; k < autoSearch.length; k++){
        let auto = elements[k];
        auto.style.display = "none";
    }
}

document.addEventListener('click', function(e) {
if(e.target !== askPanel && e.target !== searchPlace && e.target !== currentPos && e.target !==closeSearch && e.target !== panelIcon && e.target !== autoSearchEl){
  classRemove(currentPos, 'show');
  autoCompleteHide(autoSearch);
}
});

currentPos.addEventListener('click', ()=>{
    getPos();
});

function getPos(){
    let long;
    let lat;
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
        let dataKey = geolocate.Key;
        let dataKeyNumber = parseInt(dataKey, 10);
         sessionStorage.setItem("input", dataKeyNumber);
         sessionStorage.removeItem("data-link");
        window.location.href = "/Stack/acuu/data/index.html";
    })
}, ()=>{
    alert("please turn on location");
}) 
    }  
}


function link(element) {
    for(let i=0; i < element.length; i++){
        element[i].addEventListener('click', (e)=>{
            if(e.target.getAttribute("data-link") === "02"){
                getPos();
    
            }
    
            else{
                let link = e.currentTarget.getAttribute("data-link");
                sessionStorage.setItem("data-link", link);
                window.location.href = "/Stack/acuu/data/index.html";
            }
            
        })
    }
}

link(linked);
link(menuLinks);


function classAdd(element, name) {
    let arr;
    arr = element.className.split(" ");
    if(arr.indexOf(name) == -1) {
        element.className += " " + name;
    }
    }
    
    
function classRemove(element, name) {
        element.className = element.className.replace(name, "");
    }

function toggling(element, name) {
        let classCall = element.className.split(' ');
        let index = classCall.indexOf(name);
    
        if(index >= 0) classCall.splice(index, 1);
        else classCall.push(name);
        element.className = classCall.join(" ");
    }

window.addEventListener('load', ()=>{
 let change = Math.floor(Math.random() * 2);
 let width;

if(window.matchMedia("(max-width: 640px)").matches){
 width = "sm";
}
else if(window.matchMedia("(max-width: 1280px) and (min-width: 640px)").matches){
    width= "md";
}
else{
    width = "bg";
}

 header.style.backgroundImage = `url('/Stack/acuu/images/header-${change}-${width}.jpg')`;

 
},
scroll()
)


window.addEventListener('scroll', scroll);

function scroll() {
    if(document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        classAdd(nav, 'fixed');
        askDummy.style.visibility = "visible";
     
     }
     else{
         classRemove(nav, 'fixed');
         askDummy.style.visibility = "hidden";
     } 
     
}




for(let i = 0; i < lists.length; i++){
    let list = lists[i];
    list.addEventListener('mouseover', (e)=>{
    dropDown.style.display = 'block';
    askDummy.style.visibility ='visible';
    let target = e.target;
    for(let j =0; j < dropdownEl.length; j++){
            let drop = dropdownEl[j];
            if(drop.getAttribute('data-number') === target.getAttribute('data-number')){
                classAdd(drop, 'show');
                classAdd(nav, 'fixed');
                classRemove(addRecent, 'show');
                window.removeEventListener('scroll', scroll);
             } else{
                 classRemove(drop, 'show');
             }
        
        }
    })
}

header.addEventListener('mouseleave', ()=>{
    dropDown.style.display = "none";
    navAsk.style.display = "none";
    if(window.matchMedia("(max-width: 765px)").matches){
    }
    else{
    askDummy.style.visibility = 'hidden';
    scroll();
    window.addEventListener('scroll', scroll);
    }
})

askDummy.addEventListener('click', ()=>{
dropDown.style.display = 'block';
navAsk.style.display = "block";
classAdd(addRecent, 'show');

})


close.addEventListener('click', ()=>{
    navAsk.style.display = 'none';
    classRemove(addRecent, 'show');
    dropDown.style.display = 'none';
    if(window.matchMedia("(max-width: 765px)").matches){
       overlay.style.display = 'block';
    }

    else{
        scroll();
    }

})

hamburger.addEventListener('click', ()=>{
    askDummy.style.visibility ='visible';
    hamburger.style.display = 'none';
    menuClose.style.display = 'block';
    overlay.style.display = 'block';
    classAdd(nav, 'fixed');
    window.removeEventListener('scroll', scroll);
})

menuClose.addEventListener('click', ()=>{
   menuClose.style.display ='none';
   hamburger.style.display = 'block';
   askDummy.style.visibility = 'visible';
   overlay.style.display = 'none';
   scroll();
   window.addEventListener('scroll', scroll);
})

window.addEventListener('resize', ()=>{
    if(window.matchMedia("(max-width: 765px)").matches){
        hamburger.style.display = "block";
     }
     else{
        hamburger.style.display = "none";
     }
 
})


for(let k = 0; k < menuDrop.length; k++){
    let menuDrops = menuDrop[k];
    menuDrops.addEventListener('click', (e)=>{
    let target = e.currentTarget;
    for(let l = 0; l < menuAccordion.length; l++){
            let accordion = menuAccordion[l];
            let menuAngles = menuAngle[l];
            if(accordion.getAttribute('data-list') === target.getAttribute('data-list')){
                toggling(accordion, 'show');
                toggling(menuAngles, "rotate");
                
             } else{
                 classRemove(accordion, 'show');
                 classRemove(menuAngles, "rotate");
             }
        
            }
    })
}


let placementData = JSON.parse(localStorage.getItem('previousLocations'));
let placementKey = JSON.parse(localStorage.getItem('previousKeys'));
if(placementData.length < 4){
for(let i = 0; i < placementData.length; i++){
  locPlacements[i].setAttribute("data-keys", placementKey[i]);
    locPlacements[i].style.display = "block";
     locPlacements[i].children[0].textContent = placementData[i];
     locPlacements[i].addEventListener('click', (e)=>{
        let dataKey = e.currenTarget.getAttribute("data-keys");
        let dataKeyNumber = parseInt(dataKey, 10);
        sessionStorage.removeItem("data-link");
        sessionStorage.setItem("input", dataKeyNumber);
        window.location.href = "/Stack/acuu/data/index.html";
       
     })
}
}

else{
    for(let i = 0; i < locPlacements.length; i++){
        locPlacements[i].setAttribute("data-keys", placementKey[i]);
        locPlacements[i].style.display = "block";
         locPlacements[i].children[0].textContent = placementData[i];
         locPlacements[i].addEventListener('click', (e)=>{
            let dataKey = e.currentTarget.getAttribute("data-keys");
            let dataKeyNumber = parseInt(dataKey, 10);
            sessionStorage.removeItem("data-link");
            sessionStorage.setItem("input", dataKeyNumber);
            window.location.href = "/Stack/acuu/data/index.html";
           
         })
    }
}





for(let i = 0; i < 5; i++){
        dropRecent[i].setAttribute("data-keys", placementKey[i]);
        dropRecent[i].style.display = "block";
         dropRecent[i].children[0].textContent = placementData[i];
         dropRecent[i].addEventListener('click', (e)=>{
            let dataKey = e.currentTarget.getAttribute("data-keys");
            let dataKeyNumber = parseInt(dataKey, 10);
            sessionStorage.removeItem("data-link");
            sessionStorage.setItem("input", dataKeyNumber);
            window.location.href = "/Stack/acuu/data/index.html";
           
         })
}




