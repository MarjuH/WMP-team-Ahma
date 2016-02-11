var map;
var infowindow;
var center;

$(document).ready(function() {
	onLoadData();
});

var markers = [];
var markerCluster = null;

function onLoadData(params) {
	var url = "https://asiointi.hel.fi/palautews/rest/v1/requests.json";
	
	clearMarkers();
	
	var params = resolveParameters();

	$.getJSON( url, params, function( json ) {
	    $.each( json, function( key, data ) {
			var latLng = new google.maps.LatLng(data.lat, data.long); 
			var image = null;
			if (this.status === 'open'){
				image = { 
					url : "../img/cancel.png",
				}
			}
			else if (this.status === 'closed'){
				image = { 
					url : "../img/check.png",
					scaledSize : new google.maps.Size(28, 28),
				}
			}
			var content = "<h4>" + getServiceCodeName(data.service_code) + 
				" osoitteessa: <br>" + data.address + "</h4>" +
				data.description;

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: image,
				title: getServiceCodeName(data.service_code)
			});
			markers.push(marker);
			marker.addListener('click', function() {
				infowindow.setContent(content);
				infowindow.open(map, this);
			});

		});
	})
	.done(function() {
		markerCluster = new MarkerClusterer(map, markers, {
			maxZoom : 16, 
			zoomOnClick: false,
			minimumClusterSize: 3
		});
		
		google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster){
			map.setCenter(cluster.getCenter());
			map.setZoom(map.getZoom()+1);
		});
	});
	
}

function onHelsinkiBtnClicked() {
	map.setZoom(center.zoom);
	map.panTo(center.latlng);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function clearMarkers() {
  setMapOnAll(null);
  markers = [];
  if (markerCluster !== null) {
	markerCluster.clearMarkers();
	markerCluster = [];
  }
}

function initialize() {

  // Create an array of styles.
  var styles = [
    {
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -25
            },
            {
                "hue": "#0091ff"
            }
        ]
    },
	{
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [
		{ "hue": "#44656A" },
		{ "saturation": -60 },
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text",
		"stylers": [
		{ "visibility": "simplified" },
		{ "lightness": 14 },
		]
	},
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": 15
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 31
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 50
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 25
            }
        ]
    }
];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Light Map"});

  center = {
	zoom: 12,
	latlng : (new google.maps.LatLng(60.211, 24.948))
  }

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: center.zoom,
    center: center.latlng,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
	  position: google.maps.ControlPosition.TOP_RIGHT
    }
  };
  
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  infowindow = new google.maps.InfoWindow();
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
  
}