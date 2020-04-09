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

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;

      fetch(api).then(async (response) => {
        const data = await response.json();
        console.log(data[0].woeid);
        let woeid = data[0].woeid;
        const api2 = `https://www.metaweather.com/api/location/${woeid}/`;
        console.log(api2);
        const { title, distance } = data[0];

        //Set DOM elements from API
        tempDeg.textContent = null;
      });
    });
  } else {
    alert("Location information not available :(");
  }
});
