// Paste your MapTiler API Key here
const apiKey = "MLhzlQNKBd5ZlmIO1aXM";

// Create Map
const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
    center: [78.4867, 17.3850], 
    zoom: 8 });

// Add Zoom Controls
map.addControl(new maplibregl.NavigationControl());

// Marker
let marker = new maplibregl.Marker();

navigator.geolocation.getCurrentPosition(function(position){

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    map.flyTo({
        center: [lng, lat],
        zoom: 12 });

    marker.setLngLat([lng, lat]).addTo(map);

});

async function searchLocation(){
    const place = document.getElementById("place").value;
    if(place===""){
        document.getElementById("map").innerHTML="Please enter a city or country";
        return;
    }
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json?key=${apiKey}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data.features.length===0){
            document.getElementById("map").innerHTML="Location not found";
            return;
        }
        const lng = data.features[0].center[0];
        const lat = data.features[0].center[1];
        map.flyTo({
            center:[lng,lat],
            zoom:9});
        marker.setLngLat([lng,lat]).addTo(map);
    }
    catch(Exception){
        document.getElementById("map").innerHTML="Something went wrong.";

    }

}