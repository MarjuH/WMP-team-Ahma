var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60.211, lng: 24.948},
    zoom: 12
  });
}

function onLoadData() {
	var url = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?start_date=2015-05-24T00:00:00Z&end_date=2015-06-24T00:00:00Z&status=open";

	$.getJSON( url, function( json ) {
	    $.each( json, function( key, data ) {
			var latLng = new google.maps.LatLng(data.lat, data.long); 
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: data.service_request_id
			});
		});
	})
	.done(function() {
		console.log("Loaded data!");
	});
}

function initialize() {

  // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});


  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(60.211, 24.948),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}