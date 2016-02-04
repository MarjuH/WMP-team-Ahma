 /*
 var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([24.955494, 60.203579]),
          zoom: 12
        })
      });
*/

$(document).ready(function() {
	onLoadData();
});
	  
var vectorSource = new ol.source.Vector({
     // empty vector
});

//create the style
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/**@type {olx.style.IconOptions}*/({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: '../img/check.png'
     }))
});

// and apply a style to whole layer
var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
});	  
	  
var map = new ol.Map({
	target: 'map',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.XYZ({
			url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
			attributions: [new ol.Attribution({ html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'] })]
			})
		}),
		vectorLayer
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([24.955494, 60.18]),
		zoom: 13
	})     
});	 

function onLoadData() {
	var url = "https://asiointi.hel.fi/palautews/rest/v1/requests.json?start_date=2015-05-24T00:00:00Z&end_date=2015-06-24T00:00:00Z&status=open";
	//var url = "../data/feedback.json";
	
	$.getJSON( url, function( json ) {
	    $.each( json, function( key, data ) {
			var lonlat = [parseFloat(this.long), parseFloat(this.lat)];
			var feature = new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat(lonlat)),
				name: this.service_request_id,
				service_code: this.service_code,
				description: this.description,
				status: this.status,
				status_notes: this.status_notes,
				address: this.address
			});
			vectorSource.addFeature(feature);
		});
	})
}

	  
// Create a popup overlay which will be used to display feature info
var element = document.getElementById('popup');
var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);



// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
	var props = feature.getProperties();
	
	var info = "<h2>" + props.service_code + "</a></h2>";
		info += "<p><font color= #ffc61e> Kuvaus: </font>" + props.description + "</p>";
		info += "<p><font color=#ffc61e> Status: </font>" + props.status + "</p>";
	
	// Offset the popup so it points at the middle of the marker not the tip
	popup.setPosition(coord);
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': info
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

var cursorHoverStyle = "pointer";
var target = map.getTarget();
var jTarget = typeof target === "string" ? $("#"+target) : $(target);

// change mouse cursor when over marker
map.on('pointermove', function(e) {
	if (e.dragging) {
		$(element).popover('destroy');
		return;
	}
	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	if (hit) {
		jTarget.css("cursor", cursorHoverStyle);
	} else {
		jTarget.css("cursor", "");
	}
});


// get name for the popup window



