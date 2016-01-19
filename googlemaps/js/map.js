var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60.211, lng: 24.948},
    zoom: 12
  });
}