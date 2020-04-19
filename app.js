//getting long and lat
window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDesc = document.querySelector(".temperatureDescription");
  let tempDeg = document.querySelector(".temperatureDegree");
  let locTimezone = document.querySelector(".location");
  let tempSpan = document.querySelector(".tempSpan");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // console.log(position.coords.accuracy);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          // console.log(data.dataseries[0]);
          const { temp2m, weather } = data.dataseries[0];
          // Round numbers to 2 dec
          let long2 = (Math.round(long * 100) / 100).toFixed(2);
          let lat2 = (Math.round(lat * 100) / 100).toFixed(2);
          // Set DOM elements from api
          tempSpan.textContent += temp2m;
          tempSpan.textContent += "°C";
          tempDesc.textContent = weather.slice(1);
          locTimezone.textContent = `Longitude: ${long2}`;
          locTimezone.innerHTML += ` <br> Latitude: ${lat2}`;
          // Formula for C
          let far = temp2m * 1.8 + 32;

          // Change temp to Celsius/F
          tempDeg.addEventListener("click", () => {
            if (
              tempSpan.textContent === "°C" ||
              tempSpan.textContent.includes("C")
            ) {
              tempSpan.textContent = `${Math.floor(far)} °F`;
            } else {
              tempSpan.textContent = `${temp2m} °C`;
            }
          });
        });
    });
  } else {
    alert("Location information not available :(");
  }
});
