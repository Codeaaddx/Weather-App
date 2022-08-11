
const loc = document.getElementById("location");
const tempDesc = document.getElementById("temperature-description");
const tempValue = document.getElementById("temperature-degree");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const input = document.getElementById("input");
const icon = document.querySelector("img");

                
            btn1.addEventListener("click", fetchLocation = async() => {
            

                const getPosition = () => {
                    const promise = new Promise((resolve, reject) => {
                      navigator.geolocation.getCurrentPosition(
                        (success) => {
                          resolve(success);
                        },
                        (error) => {
                          reject(error);
                        }
                      );
                    });
                    return promise;
                }
                  

                try{
                    positionData = await getPosition();
                    let long = positionData.coords.longitude;
                    let lat = positionData.coords.latitude;


                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=77a4734d81bc7585d4cd58bd713b8058`;
                      
                
                const res = await fetch(api);
                const data = await res.json();

                console.log(data);


                tempValue.textContent = Math.round(data.main.temp - 273.15) + "°C";
                            tempDesc.textContent = data.weather[0].description;
                            loc.textContent = `${data.name} , ${data.sys.country}`;
                            var iconId = data.weather[0].id; 
                            console.log (iconId);
              


                            if (iconId == 800) {
                                icon.src = "clear.svg";
                            }else if(iconId >= 200 && iconId <= 232){
                               icon.src = "storm.svg";  
                           }else if(iconId >= 600 && iconId <= 622){
                               icon.src = "snow.svg";
                           }else if(iconId >= 701 && iconId <= 781){
                               icon.src = "haze.svg";
                           }else if(iconId >= 801 && iconId <= 804){
                               icon.src = "cloud.svg";
                           }else if((iconId >= 500 && iconId <= 531) || (iconId >= 300 && iconId <= 321)){
                               icon.src = "rain.svg";
                           }   
                         
                }
                
        catch (error) {
            console.log(error);
            loc.classList.add("error");
            loc.textContent= error.message;
            tempDesc.textContent = "";
            tempValue.textContent = "";
            icon.src="";
        
        }
    })
    
      
       
    btn.addEventListener('click', byCity = async(name) => {
        try {
        
        const api = 'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374'

        const res = await fetch(api);
        const data = await res.json();

        console.log(data);

          var iconId = data.weather[0].id; 
          var tempVal = Math.round(data.main.temp - 273.15) + "°C";
          var nameValue = data['name'];
          var countryValue = data.sys.country;
          var descValue = data.weather[0].description;

          if (iconId == 800) {
            icon.src = "clear.svg"
        }else if(iconId >= 200 && iconId <= 232){
           icon.src = "storm.svg";  
       }else if(iconId >= 600 && iconId <= 622){
           icon.src = "snow.svg";
       }else if(iconId >= 701 && iconId <= 781){
           icon.src = "haze.svg";
       }else if(iconId >= 801 && iconId <= 804){
           icon.src = "cloud.svg";
       }else if((iconId >= 500 && iconId <= 531) || (iconId >= 300 && iconId <= 321)){
           icon.src = "rain.svg";
       }
        
          loc.textContent = `${nameValue} , ${countryValue}` ;
          tempDesc.textContent = descValue;
          tempValue.textContent  = tempVal;
          input.value ="";
          console.log(data);
        
        }

    
        catch (error) {
            console.log(error);
            loc.classList.add("error");
            loc.textContent= "city not found.";
            tempDesc.textContent = "";
            tempValue.textContent = "";
            icon.src="";
        
        }
        
        
    })





