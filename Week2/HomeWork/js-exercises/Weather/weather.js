window.addEventListener('load', () =>{
    const  temperatureDagree = document.querySelector('.temperature-degree');
    const  temperatureDescription = document.querySelector('.temperature-description');
    const  section = document.querySelector('.dagree-section');
    const  span = document.querySelector('span');
    const  locationtimezone = document.querySelector('.location-timezone');
    const icon =document.querySelector('#icon2')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            const long =position.coords.longitude;
            const lat = position.coords.latitude;
            console.log(lat , long);
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const myApi =`${proxy}https://api.darksky.net/forecast/7d8b8c547b1d06031fee8d2cbbc1181b/${lat},${long}`

            fetch(myApi)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const {temperature , summary, precipType}= data.currently;

                //SET DOM ELEMENT FORM THE API
                temperatureDagree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationtimezone.textContent = data.timezone;


                // FORMUULA FOR CELSIUS
                const celsius = (temperature - 32 ) * (5/9);

                section.addEventListener('click', () => {
                    if(span.textContent === 'F' ){
                        span.textContent = 'C' ;
                        temperatureDagree.textContent = Math.floor(celsius);
                    }else {
                        span.textContent = 'F' ;
                        temperatureDagree.textContent = temperature;
                    }

                })
            })
        });
    };
    // small function for ICON
     var skycons = new Skycons({"color": "white"});
     skycons.add(icon, Skycons.RAIN);   
     skycons.play();
});
