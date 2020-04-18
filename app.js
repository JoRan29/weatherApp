//getting long and lat
window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDesc = document.querySelector(".temperatureDescription");
  let tempDeg = document.querySelector(".temperatureDegree");
  let locTimezone = document.querySelector(".location");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position.coords.accuracy);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.dataseries[0]);
          const { temp2m, weather } = data.dataseries[0];
          // Set DOM elements from api
          tempDeg.textContent = temp2m;
          tempDesc.textContent = weather;
          locTimezone.textContent = `Longitude: ${long}`;
          locTimezone.innerHTML += ` <br> Latitude: ${lat}`;
        });
    });
  } else {
    alert("Location information not available :(");
  }
});
