
console.log("Im there");

let mymap = L.map("mapid").setView([20.745655723994357, 78.60259765364874], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibmFrdWwxMDEzIiwiYSI6ImNrb3ZraHJ4MDAyczIybnFrbjVyMDhmZWEifQ.q7tIsZgsx9ZeBLGxPfrGZA",
  }
).addTo(mymap);

const addMarker = (lat,long,location)=>{
    
    L.marker([lat,long]).addTo(mymap).bindPopup(`${location}`).openPopup();
    mymap.panTo([lat,long]);
}
//let input_ip = document.getElementById("IP").value;
const updateInfo = (ip,isp,timezone,location) =>{
    let info = document.querySelectorAll("#display-board h2")
    info[0].textContent=ip;
    info[1].textContent=location;
    info[2].textContent=timezone;
    info[3].textContent=isp;
}

const getData = () => {
  axios
    .get(
      `https://geo.ipify.org/api/v1?apiKey=at_lVbVwkKuXaK7E3Pw0npBcd1OJ5kOE&ipAddress=`
    )
    .then((response) => {
      let lat = response.data.location.lat;
      let long = response.data.location.lng;
      let ip = response.data.ip;
      let isp = response.data.isp;
      let timezone = `UTC ${response.data.location.timezone}`;
      let location = `${response.data.location.city} ${response.data.location.country} ${response.data.location.postalCode}`
      updateInfo(ip,isp,timezone,location);
      addMarker(lat,long,location);
      console.log(response)
    })
    .catch((err) => {
      console.log(err);
    });
};

updateInfo();
document.getElementById("icon").addEventListener('click',getData);
