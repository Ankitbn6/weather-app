//to click using  enter key
var input=document.getElementById("name");
input.addEventListener("keyup",e=>{
    e.preventDefault();
    if(e.keyCode===13){
        getdata();
    }
})
function getdata(){
    let city=document.getElementById("name").value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f337acb28c77363db72fce11b01c1bbe`;
    fetch(url)
    .then(function(res){
        return res.json();
    }).then(function(res){
        append(res);
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
}

function append(data){
    // src="https://maps.google.com/maps?q=Patna&t=&z=13&ie=UTF8&iwloc=&output=embed"
    document.getElementById("info").innerHTML="";
    var city=document.createElement("p");
    city.innerText=data.name;
    city.setAttribute("id","cityname");
    var map=document.getElementById("gmap_canvas");
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    forecast(data.name);

    var temperature=document.createElement("div");
    temperature.setAttribute("id","temperature")
    var tempimg=document.createElement("img");
    tempimg.src="https://thumbs.dreamstime.com/b/temperature-icon-flat-style-good-weather-symbol-isolated-white-background-sun-termometer-black-hot-warm-climate-concept-182253012.jpg";
    tempimg.setAttribute("id","tempimg");

    var temp=document.createElement("p");
    temp.innerText=data.main.temp;


    var min=document.createElement("p");
    min.innerText="Min_temp: "+data.main.temp_min;
    min.setAttribute("class","varyTemp"); 
    
    var max=document.createElement("p");
    max.innerText="Max_Temp: "+data.main.temp_max;
    max.setAttribute("class","varyTemp"); 

    var feels=document.createElement("p");
    feels.innerText="feels like  "+data.main.feels_like;
    feels.setAttribute("id","feels");

    var winddetail=document.createElement("div");
    winddetail.setAttribute("id","winddetail")
    var windimg=document.createElement("img");
    windimg.src="https://img.freepik.com/premium-vector/wind-icon-logo-vector-illustration_598213-4157.jpg?w=2000";
    windimg.setAttribute("id","windimg");

    var wind=document.createElement("p");
    wind.innerText=data.wind.speed+"  "+data.wind.deg;


    temperature.append(tempimg,temp);
    winddetail.append(windimg,wind);
    document.getElementById("info").append(city,temperature,min,max,feels,winddetail);
}

navigator.geolocation.getCurrentPosition(success);
function success(pos) {
    let crd = pos.coords;
  
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    var map=document.getElementById("gmap_canvas");
    url=`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=f337acb28c77363db72fce11b01c1bbe`;

    fetch(url)
    .then(function(res){
        return res.json();
    }).then(function(res){
        console.log(res);
        append(res);
    })
    .catch(function(err){
        console.log(err);
    })
  }
 


  function forecast(city){
    const forecasturl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f337acb28c77363db72fce11b01c1bbe`
    fetch(forecasturl)
    .then(function(res){
        return res.json();
    }).then(function(res){
        console.log(res);
        forecastdetail(res);
    })
  }
  function forecastdetail(data){

    document.getElementById("forecast").innerHTML='';
    // data.list.map(function(ele){
    //     var dt = new Date(ele.dt_txt);
    //     console.log(ele.weather[0].main);
    //     console.log(dt.getDay());
    //     append12(ele);
    // })   
    for(let i=4;i<40;i=i+8){
        let ele=data.list[i];
        console.log(ele);
        let dt = new Date(ele.dt_txt);
        let date=dt.getDay();

        let day="";
        if(date==0)
        day="Sun";
        else if(date==1)
        day="Mon";
        else if(date==2)
        day="Tue";
        else if(date==3)
        day="Wed";
        else if(date==4)
        day="Thu";
        else if(date==5)
        day="Fri";
        else
        day="Sat";
        console.log(day);

        append12(ele,day);
        
    }
  }





  function append12(ele,day){

    let box=document.createElement("div");
    box.setAttribute("class","forBox");

    let Weday =document.createElement("p");
    Weday.setAttribute("class","day");
    Weday.innerText=day;

    console.log(ele.weather[0].main)
    let weimg=document.createElement("img");
    weimg.setAttribute("class","weimg");
    if(ele.weather[0].main=="Rain")
    weimg.src="https://cdn2.iconfinder.com/data/icons/weather-filled-outline-3/64/weather06-512.png";
    else if(ele.weather[0].main=="Clear")
    weimg.src="https://www.iconarchive.com/download/i43438/oxygen-icons.org/oxygen/Status-weather-clear.ico";
    else if(ele.weather[0].main=="Clouds")
    weimg.src="https://cdn.iconscout.com/icon/free/png-256/free-cloudy-weather-11-1147979.png";
    else 
    weimg.src="https://www.iconarchive.com/download/i43438/oxygen-icons.org/oxygen/Status-weather-clear.ico";

    let max_temp=document.createElement("p");
    max_temp.setAttribute("class","maxtemp");
    max_temp.textContent=ele.main.temp_max;

    let min_temp=document.createElement("p");
    min_temp.setAttribute("class","mintemp");
    min_temp.textContent=ele.main.temp_min;

    box.append(Weday,weimg,max_temp,min_temp);
    document.getElementById("forecast").append(box);
  }